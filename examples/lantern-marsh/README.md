# Lantern Marsh: homebrew for the SRD

## Overview

Add this original monster, magic item and spell to Outset's **D&D SRD 5.2.1**. Start here for a first monster with working rolls or for Markdown reading editions. The pack extends the base rather than defining a new system. Creature statistics are illustrative, not a balance certification.

## Files

| Path | Purpose |
| --- | --- |
| [source/pack.json](source/pack.json) | Additive editable rules pack |
| [review.md](review.md) | Reviewed behavior, evidence and limitations |
| [source/compiled-packs.json](source/compiled-packs.json) | Homebrew-only compiled snapshot for reading checks; not importable source |
| [source/introduction.md](source/introduction.md) | Original reference-chapter source |
| [editions/monster-reed-warden.publication.md](editions/monster-reed-warden.publication.md) | Monster reading edition |
| [editions/item-signal-lantern.publication.md](editions/item-signal-lantern.publication.md) | Item reading edition |
| [editions/spell-marshlight.publication.md](editions/spell-marshlight.publication.md) | Spell reading edition |
| [editions/introduction.publication.md](editions/introduction.publication.md) | Introduction reading edition |
| [editions/lantern-marsh.book.md](editions/lantern-marsh.book.md) | Book chapter order |

This example records its evidence in prose in `review.md`; it has no machine-readable engine report. See the [example layout](../README.md#example-layout).

## Automated and manual behavior

| Entry | Executable behavior in the reviewed build | Manual responsibility or limitation |
| --- | --- | --- |
| **Reed Warden** — monster | AC 12, HP 9/9, ability scores; Staff Attack 1d20+2 and follow-up Staff Damage 1d6 Bludgeoning | Confirm hits, critical dice and target HP changes. Safe-path signal, its Long Rest limit, lighting and equipment attachment remain manual. |
| **Signal Lantern** — magic item | Descriptive item and linked reading edition | Action cost, 3 charges, spending a charge, dawn recovery, held/broken restrictions and signal effects are prose. Track them manually. |
| **Marshlight** — spell | Spell description and linked reading edition | Casting, duration, target, lighting and ending when submerged are prose. Resolve them manually. |

The [structured monster walkthrough](../../guides/structured-monster.md) explains the executable fields. Markdown descriptions and reading tables do not add mechanics.

## Requirements

Use the complete Outset **D&D SRD 5.2.1** base, including its system definitions, actor profiles, modules, compendium packs and license notices. The monster relies on its HP resource, ability modifiers, proficiency and action timing. Do not transplant those IDs into an unrelated system.

The supplied compiled snapshot includes only original homebrew. Reading documents that reference SRD entries also require the corresponding compiled base packs.

## Use in Outset

Follow the [Reed Warden quickstart](../../guides/quickstart.md) to create a campaign extension, add the pack, validate, publish, install and create a monster with Staff roll buttons.

For personal authoring, copy the SRD through **Create or edit compendiums** and append this pack to `compendiumPacks`. To assemble a full-system import from your own authorized source export, run from the repository root:

```sh
npm ci
mkdir -p output
npm run prepare:example -- /path/to/srd-source.json output/lantern-marsh.json examples/lantern-marsh/source/pack.json
```

The helper preserves the base, refuses duplicate pack IDs and existing output files, and does not compile rules. Validate in Outset before saving a version. A personal version is not a campaign installation; see [delivery](../../guides/delivery.md). A JSON import does not install the adjacent Markdown reading editions.

## Verification

From the repository root, run `npm test`, `npm run check:links` and `npm run check:reading-examples`. These check portable fixtures, local links and reading editions against the supplied snapshot. They do not run the Outset engine.

The [review](review.md) records earlier compiler/importer checks and source hashes. It does not record an exact application revision or a live browser run. This documentation release does not renew that evidence. Validate the complete source in Outset, then perform the [quickstart's gameplay check](../../guides/quickstart.md) in a private campaign and reload the sheet.

## License and provenance

Original prose and fixtures are [MIT licensed](../../LICENSE). No SRD system definitions, third-party rules prose or private campaign data are included. Preserve notices supplied with your SRD base; do not commit the base export or assembled output here.
