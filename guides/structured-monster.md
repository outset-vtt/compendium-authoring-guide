# Author a structured SRD monster

The [Reed Warden source](../examples/lantern-marsh/source/pack.json) illustrates a reusable monster definition authored entirely in a compendium pack. It inherits Outset's SRD 5.2.1 monster profile. Creating a campaign sheet or token is a later operation.

## 1. Supply the monster import fields

Create a `monster` entry in your homebrew pack. The example's `data` includes:

| Source fields | What the SRD importer uses |
| --- | --- |
| `size`, `creatureType`, `alignment` | Creature identity and size |
| `ac`, `speed`, `challenge`, `proficiency` | AC, movement, challenge text, and proficiency bonus |
| `hp.average` | Starting and maximum HP, both 9 |
| `abilities` | All six ability scores; the base derives modifiers |
| `saves`, `skills` | Complete source saving throws and skill information |
| `savingThrowProficiencyRanks`, `savingThrowBonuses` | Inputs used to derive saving throws |
| `skillProficiencyRanks`, `skillBonuses` | Inputs used to derive skills |
| `sheetAbilities` | Traits and executable sheet actions |

The example has no proficient saves or skills, so its proficiency-rank and bonus maps are empty. `saves` records the corresponding unmodified totals; changing a printed total alone does not change the derived sheet. For a proficient save or skill, author its matching rank/bonus inputs too.

`hp.formula` records `2d8`; importing uses the average, not a random HP roll. The authored CR 1/8 and 25 XP are illustrative, not a balance assessment. Keep the base profile and importer unchanged.

## 2. Declare the Staff ability

`data.sheetAbilities` contains **Staff**, with `timing: action` and two explicit action-v2 pipelines:

| Step | Expression | Behavior |
| --- | --- | --- |
| Staff Attack | `1d20 + {strengthMod} + {proficiency}` | Rolls at +2 for STR 10 and proficiency +2 |
| Staff Damage | `1d6 + {strengthMod}` | Rolls 1d6 Bludgeoning; `followUp: true` avoids consuming another Action |

Both pipelines declare one creature target at range 5 feet, semantic melee-weapon tags, and chat-card presentation. The damage roll declares `damageType: bludgeoning`. The source uses inherited calculated tokens, so changing Strength changes the roll bonus without editing the expression.

These are separate roll buttons. Confirm the target, reach, and hit before using Staff Damage. The example has no outcome branches or resource effects: it does not automatically decide hits, subtract target HP, or double critical-hit dice. Apply those results and critical adjustments through the table's normal controls. Action timing records economy; it is not an enforcement gate.

## 3. Retain manual traits honestly

**Safe-path signal (manual)** is a sheet ability with its full description and no executable actions. Track its once-per-Long-Rest limit, 2-minute duration, submersion restriction, and lighting manually. It does not add a fake resource or modify every SRD monster profile.

The carried Signal Lantern is an equipment reference in the prose. Importing this monster does not attach an inventory item, create a charge tracker, generate artwork, or place a token. The lantern and spell entries remain prose examples.

## 4. Validate, then create a sheet

Add the pack to an SRD-based project using the [quickstart](quickstart.md). In the editor, validate the source and save a version. For campaign use, author and install a campaign extension against that campaign's SRD; personal versions currently cannot be installed there.

From the installed campaign pack, create a monster using the exact `packId` `lantern-marsh-core` and `entryId` `reed-warden`. Expect:

- A Medium Humanoid with AC 12, HP 9/9, and Speed 30 feet.
- STR 10, DEX 14, CON 10, INT 10, WIS 12, CHA 10, and derived modifiers/saves.
- Staff Attack at +2, Staff Damage at 1d6, and the manual signal trait.

Use the monster workflow to create persistent sheets or isolated token instances, and the scene workflow for placement. Compendium source edits do not rewrite existing instances.

The repository's portable tests check fixture consistency and snapshot preservation. Maintainers additionally compiled this example against Outset's SRD, imported its sheet, and executed deterministic attack/damage checks; see the [review evidence](../examples/lantern-marsh/review.md). Revalidate against your installed base when authoring new behavior.
