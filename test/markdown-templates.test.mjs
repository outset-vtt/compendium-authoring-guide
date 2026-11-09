import assert from 'node:assert/strict';
import test from 'node:test';
import { readdir, readFile } from 'node:fs/promises';

const directory = new URL('../examples/barrowdale/markdown/', import.meta.url);

test('every Barrowdale Markdown template starts with a title, a Type line and a stable Id', async () => {
  const files = (await readdir(directory)).filter((file) => file.endsWith('.md')).sort();
  assert.deepEqual(files, ['amulet-of-warding.md', 'barrow-mail.md', 'barrow-wight.md', 'boar-spear.md', 'dale-guide.md', 'flame-dart.md', 'goblin-raider.md', 'healing-draught.md', 'hearth-blessing.md', 'hill-folk.md', 'keen-watcher.md', 'winters-breath.md']);
  for (const file of files) {
    const text = await readFile(new URL(file, directory), 'utf8');
    assert.match(text, /^# .+\n/, `${file}: starts with a "# Title" heading`);
    assert.match(text, /^- Type: (Monster|Species|Background|Magic item|Item|Weapon|Armor|Consumable|Potion|Feat|Spell)$/m, `${file}: declares a supported Type`);
    const id = /^- Id: ([a-z0-9-]+)$/m.exec(text);
    assert.ok(id, `${file}: declares an Id`);
    assert.equal(`${id[1]}.md`, file, `${file}: the file is named after its Id`);
    assert.doesNotMatch(text, /—/, `${file}: no em dashes`);
  }
});

test('every entry of the JSON pack has a Markdown template, and the pack carries that template as its provenance', async () => {
  const pack = JSON.parse(await readFile(new URL('../examples/barrowdale/source/pack.json', import.meta.url), 'utf8'));
  const files = (await readdir(directory)).filter((file) => file.endsWith('.md')).map((file) => file.replace(/\.md$/, ''));
  assert.equal(pack.entries.length, files.length);
  for (const entry of pack.entries) {
    assert.ok(files.includes(entry.id), `${entry.id} has a template`);
    const template = await readFile(new URL(`${entry.id}.md`, directory), 'utf8');
    assert.equal(entry.sourceData.markdown, template, `${entry.id}: pack.json was produced from this exact template`);
  }
});
