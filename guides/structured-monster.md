# Author a structured SRD monster

The [Goblin Raider](../examples/barrowdale/source/pack.json) in the Barrowdale pack is a reusable monster definition in a compendium pack. It inherits Outset's SRD 5.2.1 monster profile. Creating a campaign sheet or token is a later operation.

Its JSON is what **Import Markdown** produces from [goblin-raider.md](../examples/barrowdale/markdown/goblin-raider.md). You can write the template and let Rules Studio produce this shape, or edit the JSON directly in the entry's Advanced JSON; the fields are the same.

## 1. Supply the monster import fields

A `monster` entry's `data` holds the stat block. The example's `data` includes:

| Source fields | What the SRD importer uses |
| --- | --- |
| `size`, `creatureType`, `alignment`, `subtitle` | Creature identity and the sheet subtitle "Small Fey, Chaotic Neutral" |
| `ac`, `speed`, `speedFeet`, `challenge`, `proficiency` | AC 15, 30 feet, the challenge text and proficiency bonus +2 |
| `hp.average` | Starting and maximum HP, both 10; `hp.formula` records `3d6` but import does not roll it |
| `abilities` | All six ability scores; the base derives modifiers |
| `saves`, `skills` | The printed totals: untrained saves and Stealth +6 |
| `savingThrowProficiencyRanks`, `savingThrowBonuses` | Inputs used to derive saving throws; both empty here |
| `skillProficiencyRanks`, `skillBonuses` | `{ "stealth": 2 }` and `{}`: the printed +6 is a full proficiency bonus above the derived +4, so the importer records Expertise |
| `senses`, `languages` | Text on the sheet; the Darkvision range also lands in `structured.darkvisionRangeFeet` |
| `sheetAbilities` | Traits and executable sheet actions |

Printed `saves` and `skills` must agree with their rank and bonus inputs; editing only a printed total does not change the derived sheet. Import Markdown keeps them in agreement for you. The CR 1/4 and 50 XP are illustrative, not a balance assessment.

## 2. Declare the Scimitar

`data.sheetAbilities` contains **Scimitar**, with `timing: action` and two action-v2 pipelines:

| Step | Expression | Behavior |
| --- | --- | --- |
| Scimitar Attack | `1d20 + 4` | The attack roll |
| Scimitar Damage | `1d6 + 2` | Slashing damage; `followUp: true` avoids consuming another Action |

Monster attacks are written as totals, so these pipelines carry resolved numbers rather than `{strengthMod}` placeholders. Changing the goblin's Strength does not change the roll; change the `Attack` and `Hit` lines (or the expressions) instead. Both pipelines target one creature within 5 feet and require line of sight, as the SRD's monster attacks do, and declare melee-weapon tags and chat-card presentation. The damage roll declares `damageType: slashing`.

**Shortbow** has the same shape with `rangeType` ranged, `range: 80` and `longRange: 320` on its targeting, and piercing damage.

These are separate roll buttons. Confirm the target and the hit before using Scimitar Damage. The example has no outcome branches or resource effects: it does not decide hits, subtract target HP or double critical dice. Apply those results through the table's normal controls.

## 3. Retain manual traits honestly

**Nimble Escape** is a sheet ability with its full description and no executable actions. Apply its Disengage or Hide bonus action at the table. It does not add a fake resource or modify the SRD monster profile.

Importing this monster does not attach inventory, generate artwork or place a token. The [Barrow Wight](barrowdale.md#barrow-wight-uses-saves-areas-conditions-and-legendary-actions) shows the fields that do add use counters, saves, area templates, a condition follow-up and legendary actions.

## 4. Validate, then create a sheet

Add the pack to an SRD-based project using the [quickstart](quickstart.md). In the editor, validate the source and save a version. For campaign use, author and install a campaign extension against that campaign's SRD; personal versions cannot be installed there.

From the installed campaign pack, create a monster using the exact `packId` `barrowdale` and `entryId` `goblin-raider`. Expect:

- A Small Fey with AC 15, HP 10/10 and Speed 30 feet.
- STR 8, DEX 14, CON 10, INT 10, WIS 8, CHA 8, derived modifiers and saves, and Stealth +6.
- Scimitar Attack at +4, Scimitar Damage at 1d6 + 2, the Shortbow pair and the manual Nimble Escape trait.

Use the monster workflow to create persistent sheets or isolated token instances, and the scene workflow for placement. Compendium source edits do not rewrite existing instances.

The repository's portable tests check that the compiled snapshot preserves this data and that the reading edition's table agrees with it. The application repository seeds this monster onto a sheet in its tests; see the [review evidence](../examples/barrowdale/review.md). Revalidate against your installed base when authoring new behavior.
