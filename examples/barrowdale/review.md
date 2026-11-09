# Barrowdale source and behavior review

Reviewed November 9, 2026. Source: [Barrowdale 0.4.0](source/pack.json). The machine-readable [verification record](verification.json) binds the source SHA-256 to the application revision used for the engine checks. It contains no private actor, project, campaign, account or release identifiers.

## Provenance

Barrowdale replaces the Emberwatch and Lantern Marsh examples. Both were invented settings whose names said nothing about an entry's mechanics. Barrowdale keeps every mechanic those sets exercised and gives it a recognizable owner: a goblin, a barrow wight, hill folk, a village guide, an amulet, a spear, mail, a potion, a watchman's feat and three hearth spells.

The twelve [Markdown templates](markdown) are the source. The [pack](source/pack.json) is their exact Import Markdown output, including each entry's `sourceData` provenance, and the [compiled snapshot](source/compiled-packs.json) is that pack compiled against the bundled SRD with no diagnostics. All content is original and MIT licensed. The SRD entries the pack references keep the SRD's identities and attribution.

Three things changed on purpose from the previous set. The goblin is a real CR 1/4 goblin, so its printed Stealth +6 is read as Expertise and its Shortbow adds a ranged attack with a long range. The Hill Folk choice offers two gifts instead of one. The Boar Spear is not Finesse, so a Strength weapon is covered where the previous whip covered Dexterity.

## Engine checks

The application repository imports these exact files in its tests at revision `b6829c32bae47a9bfe9e0cbc6fc4466b6de08199` ([pull request 1015](https://github.com/mattkauffman23/dm-harness/pull/1015)). The record lists each passing test. Together they cover:

- Clean import of all twelve templates with the clause states shown in the [README](README.md), and verbatim export of every one.
- The Goblin Raider's stat block, Expertise Stealth, two attacks with damage follow-ups and manual Nimble Escape, seeded onto a monster sheet.
- The Barrow Wight's two use counters, Recharge 5-6, Constitution save with a cone template, Grappled follow-up with escape DC 14, legendary action spend and legendary resistance, seeded onto a sheet with 90 HP.
- A Fighter created as Hill Folk and Dale Guide: Speed 30 ft., Darkvision 60 ft., 12 HP at level 1, Fire Bolt cast with the chosen Wisdom, Perception, Survival, Alert, Cartographer's Tools proficiency independent of the tools item, and Alert's proficiency bonus on Initiative exactly once.
- The Amulet of Warding through the authoritative action commit: blocked unequipped, unattuned or at zero charges without spending anything; one charge per use; 5 temporary HP that never stacks; dawn refills three while a Long Rest refills none.
- The Boar Spear, Barrow Mail and Healing Draught matching the SRD weapon, armor and potion shapes.
- The Keen Watcher's roll modifiers and bonus action, and a background granting it by name.
- The three spells in the SRD spell shape with slot and cantrip scaling, and a species granting the new cantrip.

These checks use the actual compiler, importer, character creation, action commit and lifecycle code. They are not a production installation or a browser run.

## Limits

- **No production rerun yet.** The November 8 production run recorded in [first-use verification](../../guides/first-use-verification.md) used the previous Reed Warden example on the JSON route. Barrowdale's Import Markdown route has been exercised in the application's isolated preview and tests only.
- **Table adjudication.** Hits, critical dice, damage application, Multiattack, Sunlight Sensitivity, Nimble Escape, Night Watch and the spells' rules text are manual.
- **Balance.** CR, rarity and costs are illustrative.

Recheck these boundaries against the installed application and base before claiming that a limitation is resolved.
