import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
const read = relative => readFile(new URL(relative, import.meta.url), 'utf8');
const pack = JSON.parse(await read('../examples/barrowdale/source/pack.json'));
const snapshots = JSON.parse(await read('../examples/barrowdale/source/compiled-packs.json'));
const monster = pack.entries.find(entry => entry.id === 'goblin-raider');
const data = monster.data;

test('compiled example preserves authored monster mechanics without distributing SRD packs', () => {
  assert.deepEqual(snapshots.map(pack => pack.id), [pack.id]);
  const compiled = snapshots[0].entries.find(entry => entry.id === monster.id);
  assert.deepEqual(compiled.data, data);
  assert.ok(compiled.contentHash);
});

test('monster source stats agree with the reading table and saving-throw inputs', async () => {
  const edition = await read('../examples/barrowdale/editions/monster-goblin-raider.publication.md');
  for (const [label, value] of [['Armor Class', data.ac], ['Hit Points', `${data.hp.average} (${data.hp.formula})`], ['Proficiency Bonus', `+${data.proficiency}`], ...Object.entries(data.abilities).map(([key,value]) => [key[0].toUpperCase()+key.slice(1),value])]) {
    assert.ok(edition.includes(`| ${label} | ${value} |`), `Reading table disagrees on ${label}`);
  }
  // The goblin has no proficient saves, so every save is the bare ability modifier.
  assert.deepEqual(data.savingThrowProficiencyRanks, {});
  assert.deepEqual(data.savingThrowBonuses, {});
  for (const [key, value] of Object.entries(data.abilities)) {
    assert.equal(data.saves[key], Math.floor((value - 10) / 2), `Untrained ${key} save`);
  }
  // Its printed Stealth +6 is a full proficiency bonus above the derived +4, so the importer records Expertise and no extra bonus.
  assert.deepEqual(data.skills, { stealth: 6 });
  assert.deepEqual(data.skillProficiencyRanks, { stealth: 2 });
  assert.deepEqual(data.skillBonuses, {});
  assert.ok(edition.includes('Stealth +6'));
});

test('Scimitar has separate primary and follow-up rolls and Nimble Escape has no pretend automation', () => {
  const scimitar = data.sheetAbilities.find(ability => ability.id === 'scimitar');
  assert.equal(scimitar.timing, 'action');
  const [attack, damage] = scimitar.actions;
  assert.equal(attack.label, 'Scimitar Attack');
  assert.equal(attack.pipeline.schemaVersion, 2);
  assert.equal(attack.pipeline.rolls[0].expression, '1d20 + 4');
  assert.equal(attack.followUp ?? false, false);
  assert.equal(damage.label, 'Scimitar Damage');
  assert.equal(damage.pipeline.rolls[0].expression, '1d6 + 2');
  assert.equal(damage.pipeline.rolls[0].damageType, 'slashing');
  assert.equal(damage.followUp, true);
  for (const action of scimitar.actions) {
    assert.deepEqual(action.pipeline.targeting, {kind:'creature',minTargets:1,maxTargets:1,range:5,requiresLineOfSight:true});
    assert.deepEqual(action.pipeline.effects, []);
    assert.deepEqual(action.pipeline.outcomes, []);
    assert.deepEqual(action.pipeline.costs, []);
  }
  const shortbow = data.sheetAbilities.find(ability => ability.id === 'shortbow');
  assert.equal(shortbow.actions[0].pipeline.targeting.range, 80);
  assert.equal(shortbow.actions[0].pipeline.targeting.longRange, 320);
  assert.equal(shortbow.actions[1].pipeline.rolls[0].damageType, 'piercing');
  const escape = data.sheetAbilities.find(ability => ability.id === 'nimble-escape');
  assert.deepEqual(escape.actions, []);
  assert.match(escape.description, /Disengage or Hide/);
});
