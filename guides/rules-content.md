# Rules content

Outset separates a system's structured rules, compendium entries, and optional reading editions. Source bundle JSON is the portable input shown here. Authoritative compilation occurs in Outset's authoring workspace; this repository does not distribute the rules compiler.

## The complete-system example

[Lantern Marsh's bundle](../examples/lantern-marsh/source/bundle.json) contains:

- `system`: a schema-v3 system with its ID, name, edition, and actor definitions.
- `compendiumPacks`: packs with stable IDs, names, a system ID, and entries.
- Each entry: `id`, `type`, `name`, `source`, and `data` containing original prose and attribution.

An entry is addressed by `packId:type:entryId`. Names are display labels, not identities. Different entry types may share a name; a spell called Shield must not be mistaken for an item called Shield.

The example defines two simple actor profiles and readable monster, item, and spell entries. Those entries intentionally have no action pipelines or importer wiring. Their special abilities, lantern charges, and spell effects are handled manually. The `spell` type and `data.level` support categorization and reading references; they do not implement casting.

For automated behavior, use the target system's typed fields, valid actor profiles, resources, conditions, importers, and strict action-v2 pipelines. Inspect the editor's current schema and diagnostics rather than inventing fields or deriving executable behavior from prose. Validate edge cases such as conditional effects, empty resources, repeat saves, and spending charges without a damage roll.

## Match the authoring scope

Personal authoring accepts complete systems. Starting from an existing published system preserves its current schema and built-in rules; add your content in a separate pack. A private personal version is not a campaign-installable extension.

Campaign homebrew uses the campaign's supported extension workflow and canonical base-system identity and edition. Keep its source separate from a complete-system import. Internal release IDs are not publisher-owned edition numbers. Follow the current workspace's import and validation requirements.

Do not paste a compiled pack snapshot into a source editor as though it were a full bundle. Do not flatten preserved source metadata, replace names with guessed IDs, or advertise reading documents as installable rules.

## Source revisions

Freeze source files for each reviewed edition. Compiled entry and pack hashes identify the exact retained rules data. They are not signatures or proof of ownership. When a source changes, obtain its new authoritative compiled snapshot, compare the affected content, and re-review the reading edition before rebinding it.
