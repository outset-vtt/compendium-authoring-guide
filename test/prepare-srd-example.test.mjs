import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { appendSrdPack } from '../scripts/prepare-srd-example.mjs';
const pack = JSON.parse(await readFile(new URL('../examples/lantern-marsh/source/pack.json', import.meta.url),'utf8'));
// Structural test double only. This is not a distributable SRD source.
const base = {system:{schemaVersion:3,id:'dnd-srd-5-2-1',version:'5.2.1',actors:[{id:'existing'}]},modules:[{id:'existing-module'}],compendiumPacks:[{id:'existing-pack',entries:[{id:'retained'}]}],sourceData:{notice:'Keep the original notice.'}};
test('appending preserves the base and every existing pack, module, and source field',()=>{
  const before=structuredClone(base);const output=appendSrdPack(base,pack);
  assert.deepEqual(base,before);assert.deepEqual(output.system,base.system);assert.deepEqual(output.modules,base.modules);assert.deepEqual(output.sourceData,base.sourceData);
  assert.deepEqual(output.compendiumPacks,[...base.compendiumPacks,pack]);
  output.system.actors[0].id='changed';assert.equal(base.system.actors[0].id,'existing');
});
test('project documents retain their wrapper',()=>{
  const project={...base,kind:'system-bundle',schemaVersion:1,name:'My SRD copy'};
  assert.equal(appendSrdPack(project,pack).name,project.name);assert.equal(appendSrdPack(project,pack).kind,'system-bundle');
});
test('wrong systems, editions, wrappers and pack collisions are rejected',()=>{
  for(const input of [{...base,system:{...base.system,id:'custom'}},{...base,system:{...base.system,version:'other'}},{...base,kind:'extension-bundle'},{document:base},[base],{...base,compendiumPacks:[pack]}]) assert.throws(()=>appendSrdPack(input,pack));
  assert.throws(()=>appendSrdPack(base,{...pack,systemId:'custom'}));
});
test('CLI creates only a new output and never overwrites one',async()=>{
  const dir=await mkdtemp(join(tmpdir(),'outset-srd-source-'));
  try {
    const input=join(dir,'source.json'),output=join(dir,'out.json');await writeFile(input,JSON.stringify(base));
    const cli=fileURLToPath(new URL('../scripts/prepare-srd-example.mjs',import.meta.url));
    execFileSync(process.execPath,[cli,input,output]);const first=await readFile(output,'utf8');
    assert.equal(JSON.parse(first).compendiumPacks.at(-1).id,pack.id);
    assert.throws(()=>execFileSync(process.execPath,[cli,input,output],{stdio:'pipe'}));
    assert.equal(await readFile(output,'utf8'),first);
  } finally {await rm(dir,{recursive:true,force:true});}
});
