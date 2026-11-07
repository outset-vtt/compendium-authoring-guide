import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

test('published Emberwatch engine evidence belongs to the distributed source', async () => {
  const source = await readFile(new URL('../examples/emberwatch/source/pack.json', import.meta.url));
  const evidence = JSON.parse(await readFile(new URL('../examples/emberwatch/verification.json', import.meta.url), 'utf8'));
  assert.equal(createHash('sha256').update(source).digest('hex'), evidence.packSha256,
    'Source changed: rerun the engine checks and review capability claims before replacing the evidence.');
});
