# Outset compendium authoring guide

Create original compendium entries and readable reference books for Outset VTT. Start with a small, working example, then adapt it to your own rules and source material.

## Choose what to author

| Output | Purpose | Current delivery |
| --- | --- | --- |
| Rules source JSON | System definitions, compendium entries, and explicit mechanical data | Import and validate in the appropriate Outset authoring workspace |
| Reading editions (`*.publication.md`) | Reviewed headings, tables, prose, and exact cross-references | Application-bundled reading content; no remote installation workflow supplied here |
| Book outline (`*.book.md`) | Chapter order and document navigation | Travels with its reading editions |

A reading edition does not grant abilities, create automated actions, or install rules. A valid entry with prose is also not proof that its mechanics are automated.

## Start here

1. [Quickstart](guides/quickstart.md): run the validator and inspect a complete original example.
2. [Rules content](guides/rules-content.md): source bundles, entry identity, and authoring scope.
3. [Reading editions](guides/reading-editions.md): exact format, source bindings, sections, tables, and references.
4. [Source fidelity](guides/source-fidelity.md): convert material without losing facts or changing rules.
5. [Delivery](guides/delivery.md): drafts, private versions, campaign rules, and reading-edition boundaries.
6. [Validation and troubleshooting](guides/validation.md): what checks establish and how to fix failures.

The [Lantern Marsh example](examples/lantern-marsh/README.md) includes a monster, item, spell, reference introduction, chapter outline, source bundle, compiled pack snapshot, and review record. All example prose is original and reusable under the [MIT license](LICENSE).

For an agent-assisted workflow, use [Outset Creator's author-outset-compendium skill](https://github.com/outset-vtt/agent-plugins/tree/main/plugins/outset-creator/skills/author-outset-compendium).

## Run the checks

Requires Node.js 22 or newer and npm. The link check additionally uses Python 3.

```sh
npm ci
npm run validate:examples
npm test
npm run check:links
```

Validate your own reading corpus against an authoritative compiled pack snapshot:

```sh
npm run validate -- path/to/editions --snapshot path/to/compiled-packs.json
```

The snapshot is a JSON array of compiled compendium packs, not a raw source bundle. The validator performs no network requests and does not need an Outset account. It checks reading syntax, identity, source bindings, references, and book membership. It does not compile rules or certify the truth of a snapshot. See [validation](guides/validation.md).

## Compatibility and contributions

This guide release is **0.1.0**. Reading wire formats retain their existing `dm-harness-publication` and `dm-harness-publication-book` names and version **0.0.1**. `dm-harness` is a historical protocol identifier, not a requirement to access a private repository.

Prefer small original examples, concrete source review, and documented capability boundaries. Keep source text separate from reading editions. Run the checks above when changing examples or the validator. See [validator provenance](lib/README.md) before changing parser semantics. Do not commit private campaigns, credentials, signed URLs, or unlicensed source books.
