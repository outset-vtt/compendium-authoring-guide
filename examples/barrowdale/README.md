# Barrowdale: twelve homebrew examples

## Overview

Original content for Outset's **D&D SRD 5.2.1**. Barrowdale is an upland village below an old barrow. Its goblins, its wight, its hill folk and its hearth magic are the kind of content most homebrewers write, so each example teaches a template field rather than a setting. The [source pack](source/pack.json) adds twelve entries without replacing the base. Monster CR and item rarity are illustrative, not a balance certification.

## Files

| Path | Purpose |
| --- | --- |
| [markdown/](markdown) | One template Markdown file per entry; import any of them through **Import Markdown** |
| [source/pack.json](source/pack.json) | The same twelve entries as an additive JSON pack, exactly as Import Markdown produces them |
| [source/compiled-packs.json](source/compiled-packs.json) | Homebrew-only compiled snapshot for reading checks; not importable source |
| [source/introduction.md](source/introduction.md) | Original reference-chapter source |
| [editions/](editions) | Reading editions for the goblin, the amulet, the cantrip and the introduction, with a book outline |
| [review.md](review.md) | Reviewed behavior, evidence and limitations |
| [verification.json](verification.json) | Recorded engine results and source hash, scoped to the application revision it names |

See the [example layout](../README.md#example-layout) for what each file kind proves.

## Automated and manual behavior

Import Markdown shows every clause of a template as automated, needs clarification or manual before anything is added. This is what the twelve files produce. Manual text is kept on the entry and shown to the table; it never executes.

| Entry | Executes | Manual |
| --- | --- | --- |
| **Goblin Raider** (monster, CR 1/4) | AC 15, HP 10, Speed 30 ft., Stealth +6 as Expertise, Darkvision 60 ft.; Scimitar Attack `1d20 + 4` and Scimitar Damage `1d6 + 2` slashing; Shortbow Attack and Damage at range 80/320 ft. | Nimble Escape, Passive Perception, languages |
| **Barrow Wight** (legendary monster, CR 5) | AC 16, HP 90, Constitution and Wisdom saves, Perception +4; Barrow Blade `1d20 + 7` and `1d8 + 4`; Grave Grasp `2d6 + 4` necrotic with an Apply Grappled follow-up (escape DC 14); Grave Chill on Recharge 5-6 with a Constitution 14 save, a 15-foot cone template and `6d6` cold; Grave Hunger once per day regains 20 HP; Shadow Step spends a legendary action; two legendary actions and two legendary resistances | Multiattack, Sunlight Sensitivity, languages |
| **Hill Folk** (species) | Medium, Speed 30 ft., Darkvision 60 ft., +1 HP per level (Hardy); Hearth Gift choice of Fire Bolt or Light with a chosen spellcasting ability | Nothing |
| **Dale Guide** (background) | Dexterity, Constitution or Wisdom bonuses; Perception and Survival; Cartographer's Tools proficiency; Alert; starting equipment and 10 GP | Nothing |
| **Amulet of Warding** (magic item) | Neck slot; +1 AC while equipped and attuned; Invoke Ward requires both, spends 1 of 3 charges for 5 nonstacking temporary HP, is blocked at zero and refills at dawn | Nothing |
| **Boar Spear** (weapon) | Martial, `1d8` piercing with Strength, Versatile `1d10` two-handed step | Nothing |
| **Barrow Mail** (armor) | Medium armor, AC 14 + Dex (max 2) while equipped, Stealth disadvantage | Nothing |
| **Healing Draught** (potion) | Drink as a bonus action: regain `2d4 + 2` HP and spend the potion | Nothing |
| **Keen Watcher** (feat) | +2 to ranged weapon attack rolls, advantage on Perception checks; Steady Nerves grants 5 temporary HP as a bonus action | Prerequisite, ability score increase, Night Watch |
| **Flame Dart** (cantrip) | Ranged spell attack, `1d8` fire, scaling to `4d8` at level 17 | Its rules text |
| **Winter's Breath** (level 2 spell) | Constitution save, 15-foot cone, `3d8` cold, +1d8 per slot above 2 | Its rules text |
| **Hearth Blessing** (level 1 spell) | Touch healing `1d8` + spellcasting modifier as a bonus action, +1d8 per slot above 1 | Its rules text |

Attack rolls, saves and damage rolls are separate buttons. The table decides hits, applies damage and adjudicates the manual text. The [walkthrough](../../guides/barrowdale.md) names the template line behind each behavior and gives a gameplay checklist.

## Requirements

Keep the complete SRD base. These are the base entries the pack references:

| Base pack ID | Entry IDs | Used by |
| --- | --- | --- |
| `dnd-srd-5-2-1-spells` | `fire-bolt`, `light` | Hill Folk Hearth Gift options |
| `dnd-srd-5-2-1-character-options` | `alert` | Dale Guide feat |
| `dnd-srd-5-2-1-equipment` | `cartographer-s-tools`, `clothes-traveler-s`, `rope`, `torch` | Dale Guide tool proficiency and equipment |

The pack also relies on the SRD character and monster profiles, `hp`, `armorClass`, ability modifiers, proficiency, the Grappled condition and the `neck` equipment slot. Do not copy these fields into an unrelated system and assume the same IDs exist.

## Use in Outset

The quickest path is Markdown. Open **Import Markdown** on a pack in your personal compendium or campaign extension, paste one of the [templates](markdown) or choose the file, review the mechanics and add it. The [quickstart](../../guides/quickstart.md) does this with the Goblin Raider; [Markdown templates](../../guides/markdown-templates.md) explains the format.

To add the whole set at once, paste the [pack](source/pack.json) into your extension's `compendiumPacks` instead. For a personal full-system import, append it to your own authorized SRD source export:

```sh
npm ci
mkdir -p output
npm run prepare:example -- /path/to/srd-source.json output/barrowdale.json
```

The helper keeps the base and refuses duplicate pack IDs and existing output files. It does not compile rules. Validate in Outset before **Save version**. A personal version is not a campaign installation; see [delivery](../../guides/delivery.md). Do not commit your base export or the assembled output here.

## Verification

1. **Portable repository checks:** `npm test` checks the templates, the pack and the evidence binding; `npm run check:reading-examples` checks the reading editions against the supplied snapshot; `npm run check:links` checks local links. None of them runs Outset's rules engine.
2. **Engine checks:** the [verification record](verification.json) lists the application tests that import these exact files, create the character, seed the monsters, run the amulet through the authoritative action commit and round-trip every template through export. They ran at the application revision the record names.
3. **Gameplay:** create fresh private test sheets and run the [checklist](../../guides/barrowdale.md#verify-in-a-private-campaign). The November 8 production run in [first-use verification](../../guides/first-use-verification.md) used the previous example on the JSON route; Barrowdale has not yet been rerun on production.

## License and provenance

No private account data, SRD source export, artwork or campaign installation is included. Original example content is [MIT licensed](../../LICENSE); referenced SRD material retains the notices supplied with your base.
