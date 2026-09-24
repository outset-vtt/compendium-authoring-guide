#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);

export function appendSrdPack(base, pack) {
  if (!record(base) || (base.kind !== undefined && base.kind !== 'system-bundle') || !record(base.system)) throw new Error('Supply a full SRD source bundle or system-bundle project, not an extension or compiled snapshot.');
  if (base.system.id !== 'dnd-srd-5-2-1' || base.system.version !== '5.2.1' || base.system.schemaVersion !== 3) throw new Error('This example requires the actual Outset SRD 5.2.1 source.');
  if (!Array.isArray(base.compendiumPacks) || (base.modules !== undefined && !Array.isArray(base.modules))) throw new Error('Source must contain compendiumPacks and, when present, a modules array.');
  if (!record(pack) || typeof pack.id !== 'string' || !pack.id || pack.systemId !== base.system.id || !Array.isArray(pack.entries)) throw new Error('The example pack must target the same SRD base.');
  if (base.compendiumPacks.some(existing => !record(existing) || existing.id === pack.id)) throw new Error('Invalid existing pack or duplicate pack ID; preserve and reconcile existing content.');
  const result = structuredClone(base);
  result.compendiumPacks.push(structuredClone(pack));
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const [input, output, ...extra] = process.argv.slice(2);
    if (!input || !output || extra.length) throw new Error('Usage: npm run prepare:example -- <full-srd-source.json> <new-output.json>');
    const base = JSON.parse(await readFile(resolve(input), 'utf8'));
    const pack = JSON.parse(await readFile(new URL('../examples/lantern-marsh/source/pack.json', import.meta.url), 'utf8'));
    await writeFile(resolve(output), JSON.stringify(appendSrdPack(base, pack), null, 2) + '\n', { flag: 'wx' });
    console.log('Prepared the full SRD source with the example pack. Validate and import it in Outset personal authoring.');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
