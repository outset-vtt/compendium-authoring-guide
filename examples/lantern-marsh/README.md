# Lantern Marsh: homebrew for the SRD

Add this original content pack to an Outset **D&D SRD 5.2.1** project. It inherits the base rather than defining a new system.

| File | Purpose |
| --- | --- |
| [Source pack](source/pack.json) | Original monster, magic item, and spell; add to the SRD project's compendium packs |
| [Compiled homebrew snapshot](source/compiled-packs.json) | Only this pack, compiled in SRD context for reading validation |
| [Introduction source](source/introduction.md) | Original reference-chapter witness |
| [Reed Warden](editions/monster-reed-warden.publication.md) | Structured SRD monster with Staff rolls and an item reference |
| [Signal Lantern](editions/item-signal-lantern.publication.md) | Charges, action cost, dawn recharge, and signal table |
| [Marshlight](editions/spell-marshlight.publication.md) | Spell metadata, effect, and ending condition |
| [Introduction](editions/introduction.publication.md) | Pack binding and related spells |
| [Book](editions/lantern-marsh.book.md) | Chapter order |
| [Review](review.md) | Source-fidelity evidence and boundaries |

The source pack is not a full-system import. Start from an Outset SRD copy and add this pack, or use the [quickstart helper](../../guides/quickstart.md) with your complete SRD source export. No SRD system definitions or third-party rules prose are included here.

The [structured monster walkthrough](../../guides/structured-monster.md) explains the Reed Warden's importable stats, HP resource, and action-v2 Staff attack and damage rolls. Hit adjudication, damage application, critical-hit adjustments, the safe-path signal, lantern charges/recovery, equipment attachment, and spell effects remain manual. No encounter-balance claim is made for the example creature. Retain the inherited SRD actor profiles and use authoritative editor diagnostics for automation.

Run `npm run validate:examples` from the repository root. For links to SRD entries, include the corresponding compiled base packs as well. All original prose and fixtures here use the repository's MIT license; the underlying SRD retains its own notices.
