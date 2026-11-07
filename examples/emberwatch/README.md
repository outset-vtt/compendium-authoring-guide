# Emberwatch: four integrated homebrew examples

Original content for Outset's **D&D SRD 5.2.1**. The [source pack](source/pack.json)
adds a monster, species, background and charged magic item without replacing the
base. Pack version **0.2.0** updates the October 24 audit example with typed tool
proficiency, an explicit item activation requirement, and a wearable placement.
Monster CR and item rarity are illustrative, not a balance certification.

## What this pack does

| Entry | Executable behavior in the reviewed build | Manual responsibility or limitation |
| --- | --- | --- |
| **Ashglass Sentinel** — monster | AC 15, HP 39, ability scores, Constitution save +4 and Perception +3; Ash Spear attack +5 and damage 1d8+3 Piercing; Cinder Guard grants 5 nonstacking Temporary HP | Confirm the hit, critical dice and target HP application. The spear uses separate roll buttons without hit-resolution branches. Cinder Guard has no usage limit; timing alone is not a once-per-turn restriction. |
| **Emberkin** — species | Medium size, Speed 35 ft., Darkvision 60 ft., +1 maximum HP per character level; Fire Bolt with a choice of Intelligence, Wisdom or Charisma | Uses the wire type `race`. Adding descriptions alone does not create new trait actions. This entry grants an existing SRD spell and does not demonstrate every species-grant capability. |
| **Emberwatch Wayfinder** — background | Dexterity/Constitution/Wisdom ability choices; Perception and Survival; Alert attached; Cartographer's Tools proficiency; equipment and 10 GP | Alert's proficiency bonus to initiative is missing in the reviewed build. Check and adjust the roll manually. Equipment and proficiency are separate grants. |
| **Cinderward Brooch** — magic item | Neck placement; +1 AC while equipped and attuned; activation requires both; spends 1 of 3 charges for 5 nonstacking Temporary HP; blocks at zero; dawn restores all charges | Equipping and attuning are deliberate player actions. Advance dawn through the supported lifecycle control; a Long Rest does not recharge this item. Confirm the resulting charge count. |

The [walkthrough](../../guides/emberwatch.md) identifies the fields behind each
behavior and gives a reproducible editor/gameplay checklist. The [review](review.md)
records tested revisions, expected results and remaining limitations. These are
scoped observations, not a promise that every later release behaves identically.

## Start from the complete SRD

For personal authoring, copy the published SRD through **Create or edit
compendiums**, then append this pack to `compendiumPacks` in the full source.
Preserve the system, actor profiles, modules, built-in packs and license notices.
This JSON is a pack, not a full-system import or a compiled snapshot.

To prepare a full-system import from your own authorized source export:

```sh
npm ci
mkdir -p output
npm run prepare:example -- /path/to/srd-source.json output/emberwatch.json examples/emberwatch/source/pack.json
```

The helper keeps the base and refuses duplicate pack IDs and existing output
files. It does not compile rules. Validate the resulting source in Outset before
**Save version**. Do not commit your base export or assembled output here.

For a campaign, create an extension against its installed SRD and add this pack
there. Preserve the extension's actual base revision and release provenance.
Saving a personal version is not a campaign installation. See [delivery](../../guides/delivery.md).

## Required base references

Keep the complete SRD base. These are the entries this pack references directly:

| Base pack ID | Entry IDs | Use |
| --- | --- | --- |
| `dnd-srd-5-2-1-spells` | `fire-bolt` | Ember Gift |
| `dnd-srd-5-2-1-character-options` | `alert` | Wayfinder origin feat |
| `dnd-srd-5-2-1-equipment` | `cartographer-s-tools`, `clothes-traveler-s`, `rope`, `torch` | Tool proficiency and starting equipment |

The pack also relies on the SRD character/monster profiles, `hp`, `armorClass`,
ability modifiers, proficiency, and the `neck` equipment slot. Do not copy these
fields into an unrelated system and assume the same IDs exist.

## Validation levels

1. **Portable repository checks:** `npm test` verifies import preparation without
   replacing the base; `npm run check:links` checks local Markdown links.
   `npm run check:reading-examples` validates Lantern Marsh's reading edition. Emberwatch
   has no reading edition, so that command does not validate its mechanics.
2. **Rules compilation:** Outset validates the complete source against its actual
   base, including typed fields and references. A saved draft is not a validated
   release. Resolve errors and review warnings before saving a version.
3. **Gameplay:** create fresh private QA sheets and exercise the
   [checklist](../../guides/emberwatch.md#verify-in-a-private-campaign), including
   blocked actions, resource changes and reload. Compilation alone cannot prove
   those results.

No private account data, SRD source export, artwork, campaign installation or
reading-edition snapshot is included. Original example content is MIT licensed;
referenced SRD material retains the notices supplied with your base.
