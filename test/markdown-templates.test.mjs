import assert from 'node:assert/strict';
import test from 'node:test';
import { readdir, readFile } from 'node:fs/promises';

const directory = new URL('../examples/emberwatch/markdown/', import.meta.url);

test('every Emberwatch Markdown template starts with a title, a Type line and a stable Id', async () => {
  const files = (await readdir(directory)).filter((file) => file.endsWith('.md')).sort();
  assert.deepEqual(files, ['ashglass-sentinel.md', 'cinderward-brooch.md', 'emberkin.md', 'emberwatch-wayfinder.md']);
  for (const file of files) {
    const text = await readFile(new URL(file, directory), 'utf8');
    assert.match(text, /^# .+\n/, `${file}: starts with a "# Title" heading`);
    assert.match(text, /^- Type: (Monster|Species|Background|Magic item)$/m, `${file}: declares a supported Type`);
    const id = /^- Id: ([a-z0-9-]+)$/m.exec(text);
    assert.ok(id, `${file}: declares an Id`);
    assert.equal(`${id[1]}.md`, file, `${file}: the file is named after its Id`);
    assert.doesNotMatch(text, /—/, `${file}: no em dashes`);
  }
});

test('the Markdown templates describe the same entries as the JSON pack', async () => {
  const pack = JSON.parse(await readFile(new URL('../examples/emberwatch/source/pack.json', import.meta.url), 'utf8'));
  const files = (await readdir(directory)).filter((file) => file.endsWith('.md'));
  assert.deepEqual(files.map((file) => file.replace(/\.md$/, '')).sort(), pack.entries.map((entry) => entry.id).sort());
});
