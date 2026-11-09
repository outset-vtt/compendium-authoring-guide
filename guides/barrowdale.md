# Author with Barrowdale

Barrowdale is twelve original entries for Outset's SRD 5.2.1 base: two monsters, a species, a background, five items, a feat and three spells. Each one is a [Markdown template](../examples/barrowdale/markdown) you can import as it is, and together they are the [source pack](../examples/barrowdale/source/pack.json). The [example README](../examples/barrowdale/README.md) summarizes what executes and what stays manual; this guide names the template line behind each behavior and ends with a gameplay checklist.

Read [Markdown templates](markdown-templates.md) first if the format is new to you. The rule throughout is simple: a `- Key: Value` line the template supports becomes rules data, and prose inside a section is a manual rule the table adjudicates.

## Goblin Raider: a stat block that imports

[goblin-raider.md](../examples/barrowdale/markdown/goblin-raider.md) is a complete SRD-style stat block. The root fields feed the monster importer, so the sheet starts with the printed values.

| Template line | Sheet result |
| --- | --- |
| `Armor Class: 15`, `Hit Points: 10 (3d6)`, `Speed: 30 feet` | AC 15, HP 10 of 10, Speed 30 ft. Import uses the average, not a roll |
| The `STR … CHA` table | Ability scores and derived modifiers; untrained saves are the bare modifiers |
| `Skills: Stealth +6` | Dexterity 14 and proficiency +2 derive +4, so the extra +2 is read as Expertise |
| `Senses: Darkvision 60 feet, Passive Perception 9` | Darkvision 60 ft. executes; the passive score is kept as text |
| `Challenge: 1/4 (50 XP)` | Proficiency bonus +2 |
| `## Action: Scimitar` with `Attack: Melee, +4 to hit, reach 5 feet, one target` and `Hit: 1d6 + 2 slashing damage` | **Scimitar Attack** `1d20 + 4` and **Scimitar Damage** `1d6 + 2` slashing as a follow-up |
| `## Action: Shortbow` with `Attack: Ranged, +4 to hit, range 80/320 feet, one target` | **Shortbow Attack** and **Shortbow Damage** with an 80-foot range and a 320-foot long range |
| `## Trait: Nimble Escape` and its sentence | A passive feature whose text is shown on the sheet; nothing executes |

A monster's attack numbers are written as totals, so the pipelines carry `1d20 + 4` rather than ability placeholders. Change the line and reimport to change the roll. Attack and damage are separate buttons: the table decides the hit, doubles critical dice and applies the damage.

## Barrow Wight: uses, saves, areas, conditions and legendary actions

[barrow-wight.md](../examples/barrowdale/markdown/barrow-wight.md) adds every monster mechanic the template supports beyond a plain attack.

| Template line | Sheet result |
| --- | --- |
| `Saving throws: Constitution +6, Wisdom +4` | Proficient saves; a printed total that differs from the derived one is kept exact |
| `Legendary actions: 2`, `Legendary resistance: 2/Day` | Legendary action and legendary resistance counters with the SRD's Restore and Succeed steps |
| `## Action: Grave Grasp` with `On hit: Grappled (escape DC 14)` | After the attack and damage, an **Apply Grappled** follow-up offers the condition to the target with escape DC 14 |
| `## Action: Grave Chill` with `Uses: Recharge 5-6`, `Save: Constitution 14, half damage on a success`, `Area: 15-foot cone`, `Hit: 6d6 cold damage` | A damage card with the save on it, a 15-foot cone template, a use counter, and **Recharge 5-6** and **Restore** steps |
| `## Bonus action: Grave Hunger` with `Uses: 1/Day`, `Target: Self`, `Effect: Regain 20 hit points` | A bonus action that spends its daily use and heals 20 |
| `## Legendary action: Shadow Step` | A legendary action that spends one legendary use; its movement text is manual |
| `## Action: Multiattack`, `## Trait: Sunlight Sensitivity` | Text on the sheet; the table applies them |

A monster has two use counters. A third `Uses` line keeps its limit as text with a warning, as SRD monsters with more limited abilities do.

## Hill Folk: species grants and a choice

[hill-folk.md](../examples/barrowdale/markdown/hill-folk.md) has `Type: Species`. Its root `Size`, `Speed` and `Darkvision` become the typed species fields the character builder reads, and `## Trait: Hardy` with `Hit point maximum: +1 per level` adds one HP per character level under that label.

`## Choice: Hearth Gift` with `Choose: 1` and `Spellcasting ability: Intelligence, Wisdom, or Charisma` creates a choice group. Each `### Option:` grants a spell by name: Hearthfire grants Fire Bolt and Hearthlight grants Light, both at character level 1. The player picks one option and one spellcasting ability, and the spell's attack bonus and save DC use that ability rather than the class's. With Wisdom 13 and proficiency +2, Fire Bolt attacks at +3.

The entry type and structured kind are both `race`, although the UI says species. The pack uses its own `hearth-gift`, `hearthfire` and `hearthlight` IDs; never borrow a built-in species' choice IDs.

## Dale Guide: a background whose grants stay independent

[dale-guide.md](../examples/barrowdale/markdown/dale-guide.md) lists `Ability scores`, `Skill proficiencies`, `Tool proficiency`, `Feat` and `Equipment`. Each name resolves against the SRD base: Alert in character options, Cartographer's Tools and the equipment in the equipment pack. `5 Torches` and `10 GP` are quantities and coins.

The tool proficiency and the tools item are separate grants. Removing one leaves the other. Alert attaches as a feat and adds the proficiency bonus to Initiative once; the application repository's tests check that it never doubles and disappears when the feat is removed.

## Amulet of Warding: a passive gate and a charged action

[amulet-of-warding.md](../examples/barrowdale/markdown/amulet-of-warding.md) is `Type: Magic item` with `Requires attunement: Yes`, `Equipment slot: Neck`, `Charges: 3` and `Recharge: All charges at dawn`.

Two sections do different jobs. `## Passive: Warding` with `Requires: Equipped and attuned` and `Effect: +1 Armor Class` is a rules effect gated on both states. `## Action: Invoke Ward` with the same `Requires` line, `Cost: 1 charge`, `Target: Self` and `Effect: Gain 5 temporary hit points` is an action whose activation requirement, charge cost and effect are separate: it is blocked while unequipped, unattuned or at zero charges, and a blocked use spends nothing. Temporary HP keeps the higher total and never stacks, so a character holding 8 already keeps 8 and still spends the charge. Dawn refills three charges; a Long Rest refills none.

## Boar Spear, Barrow Mail and Healing Draught: the SRD item shapes

- [boar-spear.md](../examples/barrowdale/markdown/boar-spear.md): `Type: Weapon`, `Weapon category: Martial`, `Damage: 1d8 piercing`, `Properties: Versatile (1d10)`. The wielder's Strength and proficiency fill the attack, and Versatile adds a two-handed damage step. A Finesse or ranged weapon would use Dexterity instead.
- [barrow-mail.md](../examples/barrowdale/markdown/barrow-mail.md): `Type: Armor`, `Armor category: Medium`, `Armor Class: 14 + Dex (max 2)`, `Stealth: Disadvantage`. The equipped AC effect, body placement and Stealth modifier match the SRD's scale mail.
- [healing-draught.md](../examples/barrowdale/markdown/healing-draught.md): `Type: Potion` with `## Bonus action: Drink` and `Effect: Regain 2d4 + 2 hit points`. Drinking rolls the healing and spends one potion.

## Keen Watcher: a feat with carried modifiers

[keen-watcher.md](../examples/barrowdale/markdown/keen-watcher.md) is `Type: Feat`, `Category: General`. `## Passive: Keen Eye` carries two roll modifiers the character always has: `+2 to ranged weapon attack rolls` and `Advantage on Perception checks`. `## Bonus action: Steady Nerves` is a step that grants 5 temporary HP. `Prerequisite` and `Ability score increase` are recorded and shown but applied by hand, and `## Trait: Night Watch` stays text. A background grants the feat by writing `- Feat: Keen Watcher`.

## Flame Dart, Winter's Breath and Hearth Blessing: one mechanic each

A spell template holds one mechanic at the root, and the result is the SRD spell shape, so spellcasting, slot spending, save DC and attack bonus apply unchanged.

- [flame-dart.md](../examples/barrowdale/markdown/flame-dart.md): `Attack: Ranged spell attack`, `Damage: 1d8 fire`, `Cantrip scaling: 2d8 at level 5, 3d8 at level 11, 4d8 at level 17`.
- [winters-breath.md](../examples/barrowdale/markdown/winters-breath.md): `Save: Constitution, half damage on a success`, `Area: 15-foot cone`, `Damage: 3d8 cold`, `Higher levels: +1d8 damage per slot level above 2`.
- [hearth-blessing.md](../examples/barrowdale/markdown/hearth-blessing.md): `Healing: 1d8 + spellcasting modifier`, `Higher levels: +1d8 healing per slot level above 1`, cast as a bonus action by touch.

`Classes` puts the spell on those classes' lists. The rules text stays manual, and conditions a spell applies are not yet expressible.

## Verify in a private campaign

Use a disposable private campaign and character, a validated campaign extension and the campaign's installed SRD. Editing source does not migrate existing sheets.

1. **Import and reopen.** Import the twelve templates, confirm every clause reads as the README's table says, add them, validate and publish. Reopen the entries and confirm the typed fields remain. In a separate draft, misspell a spell name and write `Speed: fast`; expect a needs-clarification line at each and a blocked import.
2. **Create a character.** Choose Fighter, Hill Folk with Hearthfire and Wisdom, and Dale Guide. Use STR 15, DEX 14, CON 13, INT 8, WIS 12, CHA 10, then background bonuses DEX +2 and WIS +1, and the Fighter gold package. Expect DEX 16, WIS 13, 12 HP, Speed 30 ft., Darkvision 60 ft., Fire Bolt at +3, Alert, Perception, Survival and Cartographer's Tools proficiency, with one tools item, Traveler's Clothes, Rope, five Torches and 10 GP.
3. **Roll Initiative.** Expect `1d20 + 5`: Dexterity +3 and the proficiency bonus from Alert, once.
4. **Reload and edit.** Reload and check the same grants without duplicates. Remove only the tools item, then only the proficiency; each survives the other. A level 2 Fighter plan adds another +1 HP from Hardy.
5. **Run the goblin.** Create a Goblin Raider from the installed entry. Expect AC 15, HP 10 and Stealth +6. Select a target within 5 feet and run Scimitar Attack, then Scimitar Damage; expect `1d20 + 4` and `1d6 + 2`.
6. **Run the wight.** Expect AC 16, HP 90 and two legendary actions. Use Grave Chill, confirm the cone template and the Constitution 14 save on the card, and that the action is spent until Recharge rolls 5 or 6. Hit with Grave Grasp and confirm the Apply Grappled follow-up with escape DC 14. Use Grave Hunger once and confirm it is spent for the day.
7. **Test the amulet.** Give the character the amulet. Try neither state, equipped only, attuned only, then both. Only both should grant +1 AC and allow Invoke Ward. Use it to zero charges and confirm the block, complete a Long Rest (still zero), then advance dawn (three). Also use it while holding 8 temporary HP: the charge is spent and 8 stays.
8. **Cast the spells.** Cast Flame Dart and confirm the attack uses the spell attack bonus; cast Winter's Breath at level 3 and confirm `4d8`; cast Hearth Blessing and confirm the healing adds the spellcasting modifier.
9. **Check as a Player and at narrow widths.** Repeat the character flows as an actual Player, not only a DM, and check the import review and item controls at desktop and phone widths. Record the application revision, installed base, actions performed and observed values.

The [review](../examples/barrowdale/review.md) records what the application repository's engine checks covered and what remains to be run on production.
