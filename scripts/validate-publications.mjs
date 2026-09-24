#!/usr/bin/env node
import { readdir, readFile, lstat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseRulesPublication, publicationEntry, publicationEntryKey, publicationMatchesSource, publicationReferences, publicationSpellLevel } from '../lib/rulesPublication.mjs';
import { parseRulesPublicationBook, validatePublicationBooks } from '../lib/rulesPublicationBook.mjs';
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const identifier = value => typeof value === 'string' && /^[a-zA-Z0-9_-]+$/.test(value);
const label = value => typeof value === 'string' && value.trim().length > 0;

export function validateSnapshot(packs) {
  if (!Array.isArray(packs) || !packs.length) throw new Error('Snapshot must be a nonempty array of compiled compendium packs.');
  const packIds = new Set();
  for (const pack of packs) {
    if (!record(pack) || !identifier(pack.id) || !label(pack.name) || !/^pack-[0-9a-f]{16}$/.test(pack.contentHash ?? '') || !Array.isArray(pack.entries)) throw new Error('Invalid compiled pack: require id, name, contentHash, and entries.');
    if (packIds.has(pack.id)) throw new Error(`Duplicate snapshot pack: ${pack.id}`);
    packIds.add(pack.id);
    const entries = new Set();
    for (const entry of pack.entries) {
      if (!record(entry) || !identifier(entry.id) || !identifier(entry.type) || !label(entry.name) || !record(entry.data) || !/^entry-[0-9a-f]{16}$/.test(entry.contentHash ?? '')) throw new Error(`Invalid compiled entry in ${pack.id}.`);
      if (entry.structured !== undefined && (!record(entry.structured) || !label(entry.structured.kind))) throw new Error(`Invalid structured entry in ${pack.id}.`);
      const key = `${entry.type}:${entry.id}`;
      if (entries.has(key)) throw new Error(`Duplicate snapshot entry: ${pack.id}:${key}`);
      entries.add(key);
    }
  }
  return packs;
}
export function validateCorpus(files, packs) {
  validateSnapshot(packs);
  const ids = new Set(), bindings = new Set(), sections = new Set();
  const publications = [], books = [];
  for (const [path, markdown] of Object.entries(files).sort(([a], [b]) => a.localeCompare(b))) {
    try {
      if (path.endsWith('.book.md')) { books.push(parseRulesPublicationBook(markdown)); continue; }
      if (!path.endsWith('.publication.md')) throw new Error('Unexpected file; keep only reading editions and book outlines in this directory.');
      const publication = parseRulesPublication(markdown);
      if (ids.has(publication.id)) throw new Error(`Duplicate document: ${publication.id}`);
      ids.add(publication.id);
      if (publication.entry) {
        const key = publicationEntryKey(publication.entry);
        if (bindings.has(key)) throw new Error(`Duplicate entry binding: ${key}`);
        bindings.add(key);
      }
      if (!publicationMatchesSource(publication, packs)) throw new Error('Missing or changed source. Re-review the source before updating bindings.');
      for (const section of publication.sections) {
        if (sections.has(section.id)) throw new Error(`Duplicate section: ${section.id}`);
        sections.add(section.id);
        for (const reference of publicationReferences(section)) {
          if (!publicationEntry(packs, reference)) throw new Error(`Unresolved reference: ${publicationEntryKey(reference)}`);
        }
        if (section.groupLinksBy === 'spell-level' && section.links.some(reference => publicationSpellLevel(publicationEntry(packs, reference)) === undefined)) throw new Error('Spell grouping requires spells with known levels.');
      }
      publications.push(publication);
    } catch (error) { throw new Error(`${path}: ${error.message}`, { cause: error }); }
  }
  if (!publications.length) throw new Error('No publication documents found.');
  validatePublicationBooks(books, publications);
  return {status:'passed', documents:publications.length, books:books.length, sections:sections.size, scope:'reading syntax, supplied source bindings, references, and book membership; not rules compilation or semantic fidelity'};
}
export async function readCorpus(directory) {
  const files = {};
  async function walk(relative = '') {
    const current = join(directory, relative);
    if (!(await lstat(current)).isDirectory()) throw new Error(`Expected a real directory: ${current}`);
    for (const entry of await readdir(current, {withFileTypes:true})) {
      const path = relative ? `${relative}/${entry.name}` : entry.name;
      if (entry.isSymbolicLink()) throw new Error(`Symlinks are not supported: ${path}`);
      if (entry.isDirectory()) await walk(path);
      else if (entry.isFile()) {
        if (!path.endsWith('.publication.md') && !path.endsWith('.book.md')) throw new Error(`Unexpected corpus file: ${path}`);
        const limit = path.endsWith('.book.md') ? 256*1024 : 512*1024;
        if ((await lstat(join(directory,path))).size > limit) throw new Error(`File exceeds format size limit: ${path}`);
        files[path] = await readFile(join(directory,path),'utf8');
      } else throw new Error(`Unsupported corpus file: ${path}`);
    }
  }
  await walk();
  return files;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const [directory, flag, snapshot, ...extra] = process.argv.slice(2);
    if (!directory || flag !== '--snapshot' || !snapshot || extra.length) throw new Error('Usage: npm run validate -- <editions-directory> --snapshot <compiled-packs.json>');
    const packs = JSON.parse(await readFile(resolve(snapshot),'utf8'));
    console.log(JSON.stringify(validateCorpus(await readCorpus(resolve(directory)),packs),null,2));
  } catch (error) { console.error(error.message); process.exitCode=1; }
}
