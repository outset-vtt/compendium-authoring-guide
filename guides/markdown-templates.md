# Write content as Markdown templates

Template Markdown is the plain-text way to author a monster, species, background,
item, feat or spell for Outset. You write headings, bullet fields and prose;
Rules Studio turns the fields into executable rules and shows you exactly what
will run before anything is added to your compendium. No JSON is involved.

The complete Barrowdale set is in [examples/barrowdale/markdown](../examples/barrowdale/markdown):
[Goblin Raider](../examples/barrowdale/markdown/goblin-raider.md) (stat block with melee and ranged attacks),
[Barrow Wight](../examples/barrowdale/markdown/barrow-wight.md) (legendary monster with a recharge cone, saves, a grapple and daily uses),
[Hill Folk](../examples/barrowdale/markdown/hill-folk.md) (species with a spell choice),
[Dale Guide](../examples/barrowdale/markdown/dale-guide.md) (background),
[Amulet of Warding](../examples/barrowdale/markdown/amulet-of-warding.md) (charged magic item),
[Boar Spear](../examples/barrowdale/markdown/boar-spear.md) (weapon),
[Barrow Mail](../examples/barrowdale/markdown/barrow-mail.md) (armor),
[Healing Draught](../examples/barrowdale/markdown/healing-draught.md) (potion),
[Keen Watcher](../examples/barrowdale/markdown/keen-watcher.md) (feat), and the spells
[Flame Dart](../examples/barrowdale/markdown/flame-dart.md) (attack cantrip),
[Winter's Breath](../examples/barrowdale/markdown/winters-breath.md) (save with an area) and
[Hearth Blessing](../examples/barrowdale/markdown/hearth-blessing.md) (healing).
Download one, change it, and import it. The [JSON pack](../examples/barrowdale/source/pack.json)
is the same content as Import Markdown produces it.

## Import in Rules Studio

1. Open your personal compendium editor (**Create or edit compendiums**) or a
   campaign's Rules workspace and choose the pack that should hold the entry.
2. Choose **Import Markdown**, then paste the text or choose a `.md` file.
3. Choose **Review mechanics**. Every entry shows its plan, its counts, and a
   mechanics summary with one line per clause:
   - **Automated**: the field became executable rules data. The summary says
     exactly what will run, such as "Spends 1 charge; with none left the action
     is blocked."
   - **Needs clarification**: the field is supported but its value cannot be
     used: an unknown unit, a name that matches nothing or two things, a choice
     with no options, an effect phrase the engine does not know. Each one names
     its line and section, such as `Invoke Ward → Cost`. Nothing is added until
     every marked line in the document is fixed.
   - **Manual**: prose inside a section, tables, and fields the entry type does
     not support. They are kept as text for the table to adjudicate and never
     execute. Unknown field names also raise a note so a typo is visible.
4. Choose **Add N entries**. The entries join the draft pack. Validate, then
   **Save version** (personal) or publish and install (campaign) as usual.
   Importing never changes a campaign or an existing character by itself.

Reimporting the same file changes nothing. A changed file updates the entry with
the same **Id**, even if you renamed the title or the file. If you also edited the
entry in Rules Studio since the last import, the review shows both sets of
changes and asks which version to keep; keeping the Studio version is the
default. **Export Markdown** on any entry downloads it as `<id>.md`.

## Document shape

```markdown
# Amulet of Warding

- Type: Magic item
- Id: amulet-of-warding
- Requires attunement: Yes
- Equipment slot: Neck
- Charges: 3
- Recharge: All charges at dawn

A silver disc stamped with an old warding rune.

## Passive: Warding

- Requires: Equipped and attuned
- Effect: +1 Armor Class

## Action: Invoke Ward

- Requires: Equipped and attuned
- Cost: 1 charge
- Target: Self
- Effect: Gain 5 temporary hit points
```

- `# Title` starts an entry; one file may hold several. Text before the first
  heading is an error.
- `- Type:` is required: `Monster`, `Species`, `Background`, `Magic item`,
  `Item`, `Weapon`, `Armor`, `Consumable`, `Potion`, `Feat` or `Spell`.
- `- Id:` is the stable identity. Keep it when you rename a title or a file.
  Without it the title's slug is used. `Source` and `Attribution` are recorded.
- `## Kind: Name` sections hold mechanics: `Action`, `Bonus action`, `Reaction`,
  `Legendary action` (monsters), `Trait`, `Passive` (items), `Choice` with
  `### Option: Name` children (species).
- Fields are `- Key: Value` bullets. Lists split on commas, `and` and `or`; a
  list containing semicolons splits only on them, so `Clothes, Traveler's`
  survives (or write `Traveler's Clothes`; inverted catalog names resolve).
- Prose at the top of an entry is flavor. Prose inside a section is a manual
  rule. Code fences and HTML-looking text stay text; nothing is fetched or run.

## Names and references

`Spell`, `Feat`, `Tool proficiency` and `Equipment` name entries by their
display name and resolve against your project and its SRD base. `Fire Bolt
(dnd-srd-5-2-1-spells)` or `dnd-srd-5-2-1-spells:fire-bolt` names the pack
explicitly when two entries share a name. A name that matches nothing fails
with the closest spellings. Equipment accepts `5 Torches` and coins such as
`10 GP`.

## Supported fields

| Type | Entry fields | Sections |
| --- | --- | --- |
| Monster | `Size`, `Creature type`, `Alignment`, `Armor Class`, `Hit Points` (`39 (6d8 + 12)`), `Speed`, six ability scores as fields or a `STR … CHA` table, `Saving throws` (`Constitution +4`), `Skills` (`Perception +3`), `Senses` (Darkvision, Blindsight, Tremorsense, Truesight ranges execute; passive scores are manual), `Languages` (manual), `Challenge`, `Proficiency bonus`, `Legendary actions: 2`, `Legendary resistance: 2/Day` | `Attack: Melee, +5 to hit, reach 5 feet, one target` with `Hit: 1d8 + 3 piercing damage` and optional `On hit: Grappled (escape DC 16)`; or `Save: Dexterity 15, half damage on a success` with `Hit` and optional `Area: 30-foot line, 5 feet wide`; or `Target` and `Effect`. `Uses: 2/Day`, `Uses: Recharge 5-6` or `Uses: Recharge after a Short or Long Rest` on up to two actions. `## Legendary action:` sections spend a legendary use. |
| Species | `Size`, `Speed`, `Darkvision`; `Spell`, `Skill proficiency`, `Feat` | `Trait` with `Hit point maximum: +1 per level` or grants; `Choice` with `Choose`, `Spellcasting ability` and `Option` children granting `Spell`, `Skill proficiency`, `Feat`, `Speed`, `Darkvision` |
| Background | `Ability scores`, `Skill proficiencies`, `Tool proficiencies`, `Feat`, `Equipment` | `Trait` (manual text) |
| Item | `Category` (plain items), `Rarity`, `Requires attunement`, `Equipment slot`, `Charges`, `Recharge` (`All charges at dawn`, `1d4 charges at dawn`, `Long rest`, `Short rest`, `Never`), `Weight`, `Cost` | `Passive` with `Requires: Carried / Equipped / Attuned / Equipped and attuned` and `Effect: +1 Armor Class`; `Action`, `Bonus action`, `Reaction` with `Requires`, `Cost: 1 charge`, `Target`, `Range`, `Effect`, or `Attack` and `Hit`; `Consumed: Yes` spends one of the item |
| Weapon | `Damage: 1d8 slashing`, `Properties` (Finesse, Versatile (1d10), Two-Handed, Ammunition, the rest as text), `Range: 80/320 feet`, `Weapon category: Simple / Martial`, `Weight`, `Cost` | None needed: attack and damage steps use the wielder's Strength, or Dexterity for ranged and Finesse weapons, plus proficiency; Versatile adds a two-handed damage step |
| Armor | `Armor Class: 16`, `14 + Dex (max 2)`, `11 + Dex`, or `+2` for a shield; `Armor category`, `Strength requirement`, `Stealth: Disadvantage`, `Weight`, `Cost` | None needed: the equipped AC effect, body or off-hand placement and Stealth modifier match the SRD armor |
| Feat | `Category: Origin / General / Fighting Style / Epic Boon`, `Prerequisite` (shown, never checked), `Repeatable`, `Ability score increase: +1 Wisdom or Constitution` (recorded; applied by hand when taken) | `Passive` with `Effect: +2 to ranged weapon attack rolls`, `+1d4 to weapon damage rolls`, `+1 to saving throws`, `Advantage on Perception checks` or `+1 Armor Class` (carried roll modifiers); action sections become the feature's steps; `Trait` stays text. Backgrounds and species grant it by name. |
| Spell | `Level: Cantrip / 1..9`, `School`, `Classes` (the system's spellcasting classes), `Casting time`, `Range: Self / Touch / 60 feet`, `Components: V, S, M (…)`, `Duration` (Concentration marks it), `Ritual` | One mechanic at the root: `Attack: Ranged spell attack` with `Damage: 1d8 fire`; or `Save: Dexterity, half damage on a success` with `Damage` and optional `Area: 15-foot cone`; or `Healing: 1d8 + spellcasting modifier`. `Target: Self / One creature / Up to 3 creatures / Each creature in the area`; `Higher levels: +1d8 damage per slot level above 2` (or healing, or targets); `Cantrip scaling: 2d8 at level 5, 3d8 at level 11, 4d8 at level 17`. The spell text stays manual; conditions a spell applies are not yet expressible. |
| Consumable / Potion | `Rarity`, `Weight`, `Cost` | `Action` or `Bonus action` with `Effect: Regain 2d4 + 2 hit points` (a healing roll that spends one of the item) or the other action fields |

Effect phrases: `Gain N temporary hit points` (keeps the higher total, never
stacks) and `Regain N hit points`. Anything else needs clarification; move it
into the section text to keep it as a manual rule.

A printed monster save or skill total that differs from the derived one is kept
exact. A stat block missing a required field is reported before import.

## Three different checks

1. **Syntax and translation** happen in the review: fields, references and
   the authoring boundary checks Outset runs before a release.
2. **Compilation** happens when you validate and save or publish. A clean
   review is not a saved version.
3. **Gameplay** happens at the table. Create fresh private test sheets and run
   the [Barrowdale checklist](barrowdale.md#verify-in-a-private-campaign).
   Compilation cannot prove those results, and manual clauses never execute.

## Boundaries

Templates cover the fields above. Reading editions and books stay a separate
format, and free-form prose is not interpreted: write the template, or move a
rule into section text to keep it manual. Conditions a spell applies and a third
limited monster ability are the known gaps; the review names each one.
