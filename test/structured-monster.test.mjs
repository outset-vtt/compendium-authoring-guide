import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
const read = relative => readFile(new URL(relative, import.meta.url), 'utf8');
const pack = JSON.parse(await read('../examples/lantern-marsh/source/pack.json'));
const snapshots = JSON.parse(await read('../examples/lantern-marsh/source/compiled-packs.json'));
const monster = pack.entries.find(entry => entry.id === 'reed-warden');
const data = monster.data;

test('compiled example preserves authored monster mechanics without distributing SRD packs', () => {
  assert.deepEqual(snapshots.map(pack => pack.id), [pack.id]);
  const compiled = snapshots[0].entries.find(entry => entry.id === monster.id);
  assert.deepEqual(compiled.data, data);
  assert.ok(compiled.contentHash);
});

test('monster source stats agree with the reading table and saving-throw inputs', async () => {
  const edition = await read('../examples/lantern-marsh/editions/monster-reed-warden.publication.md');
  for (const [label, value] of [['Armor Class', data.ac], ['Hit Points', `${data.hp.average} (${data.hp.formula})`], ['Proficiency Bonus', `+${data.proficiency}`], ...Object.entries(data.abilities).map(([key,value]) => [key[0].toUpperCase()+key.slice(1),value])]) {
    assert.ok(edition.includes(`| ${label} | ${value} |`), `Reading table disagrees on ${label}`);
  }
  assert.deepEqual(data.savingThrowProficiencyRanks, {});
  assert.deepEqual(data.savingThrowBonuses, {});
  for (const [key, value] of Object.entries(data.abilities)) {
    assert.equal(data.saves[key], Math.floor((value - 10) / 2), `Untrained ${key} save`);
  }
});

test('Staff has separate primary and follow-up rolls and manual signal has no pretend automation', () => {
  const staff = data.sheetAbilities.find(ability => ability.id === 'reed-warden-staff');
  assert.equal(staff.timing, 'action');
  const [attack, damage] = staff.actions;
  assert.equal(attack.pipeline.schemaVersion, 2);
  assert.equal(attack.pipeline.rolls[0].expression, '1d20 + {strengthMod} + {proficiency}');
  assert.equal(attack.followUp ?? false, false);
  assert.equal(damage.pipeline.rolls[0].expression, '1d6 + {strengthMod}');
  assert.equal(damage.pipeline.rolls[0].damageType, 'bludgeoning');
  assert.equal(damage.followUp, true);
  for (const action of staff.actions) {
    assert.deepEqual(action.pipeline.targeting, {kind:'creature',minTargets:1,maxTargets:1,range:5});
    assert.deepEqual(action.pipeline.effects, []);
    assert.deepEqual(action.pipeline.outcomes, []);
    assert.deepEqual(action.pipeline.costs, []);
  }
  const signal = data.sheetAbilities.find(ability => ability.id === 'reed-warden-safe-path');
  assert.deepEqual(signal.actions, []);
  assert.match(signal.description, /Once per Long Rest/);
  assert.match(signal.description, /submerged/);
});
