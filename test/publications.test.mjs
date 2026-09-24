import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, mkdtemp, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readCorpus, validateCorpus } from '../scripts/validate-publications.mjs';
const example = fileURLToPath(new URL('../examples/lantern-marsh/', import.meta.url));
const files = await readCorpus(join(example, 'editions'));
const packs = JSON.parse(await readFile(join(example, 'source/compiled-packs.json'), 'utf8'));
const item = 'item-signal-lantern.publication.md';
const intro = 'introduction.publication.md';
const change = (file, before, after) => ({ ...files, [file]: files[file].replace(before, after) });

test('complete original corpus validates', () => {
  const result = validateCorpus(files, packs);
  assert.equal(result.documents, 4); assert.equal(result.books, 1);
});
test('stale entry and pack bindings fail', () => {
  assert.throws(() => validateCorpus(change(item, /entry-[0-9a-f]+/, 'entry-0000000000000000'), packs), /changed source/);
  assert.throws(() => validateCorpus(change(intro, /pack-[0-9a-f]+/, 'pack-0000000000000000'), packs), /changed source/);
});
test('reference documents need source packs and paired entry bindings', () => {
  assert.throws(() => validateCorpus(change(intro, /sourcePacks:\n[^\n]+\n/, ''), packs), /source pack binding/);
  assert.throws(() => validateCorpus(change(item, /sourceHash:[^\n]+\n/, ''), packs), /sourceHash/);
});
test('unknown reference fails', () => {
  assert.throws(() => validateCorpus(change(item, 'compendium:lantern-marsh-core:spell:marshlight', 'compendium:lantern-marsh-core:spell:missing'), packs), /Unresolved reference/);
});
test('duplicate documents and entry bindings fail', () => {
  assert.throws(() => validateCorpus({...files, 'copy.publication.md': files[item]}, packs), /Duplicate document/);
  assert.throws(() => validateCorpus({...files, 'copy.publication.md': files[item].replace('id: "lantern-marsh-item-signal-lantern"', 'id: "copy"')}, packs), /Duplicate entry binding/);
});
test('section IDs are globally unique', () => {
  assert.throws(() => validateCorpus(change(item, '{#lantern-marsh-lantern-use}', '{#lantern-marsh-introduction-notes}'), packs), /Duplicate section/);
});
test('HTML, images, unsafe links and generic code are rejected', () => {
  for (const content of ['<script>alert(1)</script>', '![image](https://example.com/image.png)', '[bad](javascript:alert)', '```js\nalert(1)\n```']) {
    assert.throws(() => validateCorpus({...files, [item]: files[item]+'\n'+content+'\n'}, packs), /Unsupported|HTTPS/);
  }
});
test('strict YAML rejects unknown fields, duplicates and aliases', () => {
  for (const addition of ['unknown: true\n', 'title: Duplicate\n', 'groups: &shared {}\nsourcePacks: *shared\n']) {
    assert.throws(() => validateCorpus(change(item, '\n---\n\n', '\n'+addition+'---\n\n'), packs));
  }
});
test('uneven table fails', () => {
  assert.throws(() => validateCorpus(change(item, '| Amber | Requests a meeting |', '| Amber |'), packs), /same number of cells/);
});
test('book membership rejects missing and repeated documents', () => {
  assert.throws(() => validateCorpus(change('lantern-marsh.book.md', '- lantern-marsh-introduction', '- absent'), packs), /Missing book document/);
  assert.throws(() => validateCorpus(change('lantern-marsh.book.md', '- lantern-marsh-spell-marshlight', '- lantern-marsh-introduction'), packs), /Repeated book document/);
});
test('spell grouping requires spell levels and final position', () => {
  const changed = structuredClone(packs);
  const spell = changed[0].entries.find(e => e.id === 'marshlight');
  delete spell.data.level; delete spell.structured.level;
  assert.throws(() => validateCorpus(files, changed), /known levels/);
  assert.throws(() => validateCorpus({...files, [intro]: files[intro]+'\nTrailing paragraph.\n'}, packs), /last block/);
});
test('ambiguous and raw source snapshots fail', () => {
  assert.throws(() => validateCorpus(files, {compendiumPacks:packs}), /array/);
  assert.throws(() => validateCorpus(files, [...packs, packs[0]]), /Duplicate snapshot pack/);
  const changed = structuredClone(packs); changed[0].entries.push(changed[0].entries[0]);
  assert.throws(() => validateCorpus(files, changed), /Duplicate snapshot entry/);
});
test('valid Markdown is not proof of semantic fidelity', () => {
  assert.equal(validateCorpus(change(item, '**3 charges**', '**300 charges**'), packs).status, 'passed');
});
test('reader rejects symlinks and non-edition files', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'outset-publications-test-'));
  try {
    await writeFile(join(dir,'notes.txt'), 'not a reading edition');
    await assert.rejects(readCorpus(dir), /Unexpected corpus file/);
    await rm(join(dir,'notes.txt'));
    await symlink(join(example,'editions',item), join(dir,item));
    await assert.rejects(readCorpus(dir), /Symlinks/);
  } finally { await rm(dir, {recursive:true,force:true}); }
});
