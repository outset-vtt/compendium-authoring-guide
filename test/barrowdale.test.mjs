import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

test('published Barrowdale engine evidence belongs to the distributed source', async () => {
  const source = await readFile(new URL('../examples/barrowdale/source/pack.json', import.meta.url));
  const evidence = JSON.parse(await readFile(new URL('../examples/barrowdale/verification.json', import.meta.url), 'utf8'));
  assert.equal(createHash('sha256').update(source).digest('hex'), evidence.packSha256,
    'Source changed: rerun the engine checks and review capability claims before replacing the evidence.');
});

test('the compiled snapshot is the distributed pack compiled, entry for entry', async () => {
  const pack = JSON.parse(await readFile(new URL('../examples/barrowdale/source/pack.json', import.meta.url), 'utf8'));
  const [snapshot] = JSON.parse(await readFile(new URL('../examples/barrowdale/source/compiled-packs.json', import.meta.url), 'utf8'));
  assert.equal(snapshot.id, pack.id);
  assert.deepEqual(snapshot.entries.map(entry => entry.id), pack.entries.map(entry => entry.id));
  for (const entry of pack.entries) {
    const compiled = snapshot.entries.find(candidate => candidate.id === entry.id);
    assert.deepEqual(compiled.data, entry.data, `${entry.id}: compiled data is the source data`);
    assert.match(compiled.contentHash, /^entry-[0-9a-f]{16}$/);
  }
});
