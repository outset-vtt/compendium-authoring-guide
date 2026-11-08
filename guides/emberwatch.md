# Author with Emberwatch

Use the complete [Emberwatch pack](../examples/emberwatch/source/pack.json) with
an Outset SRD 5.2.1 project. The [example README](../examples/emberwatch/README.md)
covers import, required references and current manual boundaries.

## Source text and executable fields

`data.description` is the readable rule. It is not an instruction to the engine.
Species and background mechanics belong in `entry.structured`; item behavior
belongs in `structured.item`. Monster fields under `data` are a deliberate
exception consumed by the SRD monster importer.

For example, putting `speed: 35` in arbitrary species `data` does not configure
movement. Emberkin uses `structured.kind: "race"` and `structured.speed: 35`.
Likewise, an item description saying “requires attunement” does not gate its action.
The brooch declares its passive gate and activation requirement separately.

The SRD's own species keep source facts in `data.species` (`speed.walk`,
`darkvision.range`, `sizeOptions`), and Outset derives their `structured` fields
when it builds the SRD. It derives nothing for your species: one with only that
source shape compiles to `{ "kind": "race" }`, and characters get the default
Speed and no Darkvision. Rules Studio warns about exactly this case. Each
documented source value without its `structured` field (`speed`,
`darkvisionRangeFeet` or `sizeOptions`) gets a warning at that field, naming the
value to set. Selecting it in Diagnostics opens the field, or an Add control
when the field or Structured itself is missing. Warnings never block saving,
nothing is copied for you, and setting the field clears only its warning. A
typed value that differs from the source is kept as the mechanic. Prose and
other `data` keys are not checked.

Use the visual fields when available. Outset releases that include the
**Spellcasting abilities** control can author every Emberkin field visually; see
[author Emberkin visually](#author-emberkin-visually). When a nested field is not
exposed in your release's visual editor, edit that entry's Advanced JSON or the
project Source and validate it. This guide does not claim every supported field
has a visual control.

## Ashglass Sentinel: monster import and effects

`data` supplies `ac`, `hp.average`, `abilities`, proficiency ranks and bonuses.
The SRD importer creates the actual sheet; `hp.formula` records the printed dice
but import starts at the average, 39 HP. Printed `saves` and `skills` must agree
with their rank/bonus inputs; editing only their printed totals does not change
derived saves or skills.

`data.sheetAbilities` defines:

- **Ash Spear Attack:** `1d20 + {strengthMod} + {proficiency}`.
- **Ash Spear Damage:** `1d8 + {strengthMod}`, Piercing, `followUp: true`.
- **Cinder Guard:** a self-targeted `modifyResource` effect on `hp`, field
  `temporary`, operation `max`, constant value `5`.

`max` preserves higher Temporary HP and prevents stacking. The spear has no
outcome branches or target HP effect: resolve hits, critical hits and damage
application through table controls. See the [structured monster guide](structured-monster.md)
for the same importer/action pattern in the smaller Reed Warden example.

## Emberkin: species mechanics

The entry type and structured kind are both `race`, although the UI calls it a
species. Its fields are:

| Field under `structured` | Value and purpose |
| --- | --- |
| `speed` | `35`, feet |
| `sizeOptions` | `["Medium"]` |
| `darkvisionRangeFeet` | `60` |
| `hitPointMaximumBonus` | `{ "perCharacterLevel": 1, "label": "Banked Ember" }` |
| `choiceGroups[0].count` | `1` |
| `choiceGroups[0].spellcastingAbilities` | `["intelligence", "wisdom", "charisma"]` |
| `choiceGroups[0].options[0].grants.spells` | Fire Bolt reference with `characterLevel: 1` |

Even though Spark is the only option, the player must choose the spellcasting
ability. Fire Bolt's attack and save numbers use that choice rather than the
class's casting ability. With Wisdom 13 and proficiency +2, expect spell attack
+3 and save DC 11. This cantrip does not need a limited free-cast resource.

### Author Emberkin visually

In an Outset release with the **Spellcasting abilities** control, open the
entry's **Visual editor**, add **Structured** and set its kind to `race`. Then
use **Add setting** and the list buttons:

1. Set **Speed** to `35` and add `Medium` under **Size Options**.
2. Add **Darkvision (feet)** and enter `60`.
3. Add **Hit Points per level**: **Hit Points per character level** `1`, **Label**
   `Banked Ember`.
4. Add **Choice Groups**, then **Add Choice group**: ID `ember-gift`, Label
   `Ember Gift`, Count `1`.
5. In the group, open **Options** and **Add Option**: ID `spark`, Label `Spark`.
   Add **Grants** with Label `Ember Gift`, then **Spells** and **Add Spell grant**:
   Entry ID `fire-bolt`, Pack ID `dnd-srd-5-2-1-spells`, Character Level `1`.
6. Add **Spellcasting abilities** to the group and check Intelligence, Wisdom
   and Charisma. The checkboxes list the base's ability scores.

Validation names the exact field for an empty or repeated spellcasting-ability
list, an ID the base lacks, Hit Points per level below 1, or a negative
Darkvision range. In a personal compendium, **Save version** refuses those
errors. In a campaign extension, the **Publish** section's **Review changes** and
**Publish release** run the same checks, and **Install release** puts the
validated version into the campaign. A saved draft or personal version is not a
campaign installation.

The pack uses its own `ember-gift` and `spark` IDs. Do not borrow built-in Human
choice IDs to make custom species work. Current typed species grants also support
`skillProficiencies` and `feats` at `structured.grants` or an option's `grants`;
those are separate capabilities, not extra grants present in this Emberkin entry.
Custom species/background actions can use `structured.ability`; no such action is
included here, and a narrative trait does not create one automatically.

## Wayfinder: proficiency is not equipment

The background's `abilityScoreOptions` are the SRD labels Dexterity, Constitution
and Wisdom. `skillProficiencies` supplies Perception and Survival, and `feat`
references Alert. Creation must also resolve the player's ability-score allocation.

The executable tool grant is separate from `startingEquipment`:

```json
"toolProficiencies": [
  { "packId": "dnd-srd-5-2-1-equipment", "entryId": "cartographer-s-tools" }
]
```

Keep that inside `structured` alongside `kind: "background"`. The same reference
inside `startingEquipment.items`, with `quantity: 1`, supplies the inventory item.
Removing either one must leave the other intact. A tool grant adds no item and
an item adds no proficiency. The Stats tab lists held tool proficiencies once.

Alert attaches, but its initiative bonus remains an observed limitation:
Dexterity 16 and proficiency +2 should produce `1d20+5`; the reviewed build
produces `1d20+3`. Inspect the actual roll and add the missing bonus manually only
when absent. Do not encode an unconditional extra bonus that could double-count
a later fix. This example makes no claim about automatic initiative swapping.

## Brooch: passive effects and activation are independent

The complete item is under `structured.item`, with `category: "magicItem"`.
Three parts serve different purposes:

1. `equipPlacements: [{ "id": "neck", "label": "Neck", "slotIds": ["neck"] }]`
   gives the item a wearable location. An equip-dependent requirement without a
   placement warns because the player could never satisfy it.
2. `rulesEffects[0].appliesWhen: "equippedAndAttuned"` gates the passive +1
   `armorClass` effect. Attunement metadata alone does not apply that effect.
3. The Kindle Ward action's `pipeline.requirements` gates activation:

```json
"requirements": [
  { "kind": "itemState", "state": "equippedAndAttuned" }
]
```

The action also declares `costs: [{ "kind": "itemCharge", "amount": 1 }]` and a
self-targeted `modifyResource` effect: `hp`, field `temporary`, operation `max`,
value `{ "kind": "constant", "value": 5 }`. Its `charges` are
`{ "current": 3, "max": 3, "reset": "dawn" }`.

The requirement checks the item owning the action. It should block use when
unequipped or unattuned without spending charges or changing HP. Valid use spends
one charge even if the character already has more than 5 Temporary HP. A Long
Rest is a different lifecycle event from dawn and must not refill this item.

## Verify in a private campaign

Use a disposable private campaign/character, a validated campaign extension and
the campaign's installed SRD. Preserve existing characters and published versions;
editing source does not automatically migrate existing sheets.

1. **Validate and reopen.** Save a draft, run validation, save a version, reopen,
   and verify the typed fields remain. In a separate draft, try a missing spell,
   feat or tool reference and a negative Darkvision range. Expect field diagnostics
   and blocked publication; correct them before continuing.
2. **Create a character.** Choose Fighter, Emberkin/Spark/Wisdom and Wayfinder.
   Use STR 15, DEX 14, CON 13, INT 8, WIS 12, CHA 10, then background bonuses
   DEX +2/WIS +1. Choose the Fighter gold package if comparing this exact fixture.
   Expect DEX 16, WIS 13, 12 maximum HP, Speed 35 ft., Darkvision 60 ft., Fire Bolt,
   Alert, Perception/Survival, and Cartographer's Tools proficiency. Wayfinder adds
   10 GP independently of the class package. Its equipment is one tools item,
   one Traveler's Clothes, one Rope, and five Torches.
3. **Reload and edit.** Save/reload and check the same grants without duplicates.
   In disposable background variants, remove only the tool item, then only the
   proficiency grant. Verify independence. Change the background in guided
   pre-play editing and verify the old grant does not linger. A level-2 Fighter
   plan should include another +1 HP from Banked Ember.
4. **Check initiative.** Roll and inspect the actual bonus. Apply the Alert
   workaround above only if the proficiency bonus is missing.
5. **Import the monster.** Expect AC 15, HP 39/39, Constitution save +4,
   Perception +3, spear +5/1d8+3. Use Cinder Guard twice: Temporary HP stays 5.
   Start with 8 Temporary HP: using it leaves 8.
6. **Test the item.** Add the brooch to the QA character. Try neither state,
   equipped only, attuned only, then both. Only both should grant +1 AC and allow
   Kindle Ward. Execute until charges reach zero, verify the block, complete a
   Long Rest (still zero), then advance dawn (three). Reload and check canonical
   charge/HP values. Also try it while holding more than 5 Temporary HP.
7. **Check permissions and presentation.** Repeat affected character flows as an
   actual campaign Player, not only a DM. Check the tool list and item controls
   at desktop and narrow widths. Record the application revision, installed base,
   actions performed and observed values; a saved version alone is not a pass.

The [review record](../examples/emberwatch/review.md) distinguishes fresh engine
checks, earlier live evidence, and checks that remain manual or unresolved.
