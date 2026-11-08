# Authoring examples

Choose an example, read its capability table, then follow its **Use in Outset** section. Both examples extend Outset's complete D&D SRD 5.2.1 base. Neither `source/pack.json` is a complete system import.

| Example | Contents | Start here |
| --- | --- | --- |
| [Lantern Marsh](lantern-marsh/README.md) | Monster with Staff rolls; descriptive item and spell; Markdown reading editions | [First playable monster](../guides/quickstart.md) |
| [Emberwatch](emberwatch/README.md) | Monster, species, background and charged wearable item | [Integrated mechanics walkthrough](../guides/emberwatch.md) |

## Example layout

Every example uses these paths:

```text
<example>/
  README.md          # Overview, files, behavior, requirements, use, verification, license
  review.md          # Evidence, provenance and remaining limitations
  source/
    pack.json        # Editable additive rules pack
```

Optional files are included only when the example supplies them:

| Path | Purpose | Supplied by |
| --- | --- | --- |
| `source/compiled-packs.json` | Snapshot for document validation, not editable source | Lantern Marsh |
| `source/*.md` | Original reference-chapter source | Lantern Marsh |
| `editions/*.publication.md` | Markdown reading editions, not executable mechanics | Lantern Marsh |
| `editions/*.book.md` | Book order and document references | Lantern Marsh |
| `verification.json` | Recorded engine results with revision, source hash and scope | Emberwatch |
| `markdown/*.md` | Template Markdown for each entry, importable through Rules Studio | Emberwatch |

Keep editable JSON under `source/`; keep reading editions under `editions/`. Each README uses the same section order so readers can find capabilities, prerequisites and verification without learning a new layout. Preserve stable pack and entry IDs when reorganizing files.

## What a release proves

[Tagged releases](https://github.com/outset-vtt/compendium-authoring-guide/releases) provide fixed source snapshots. Download the release's **Source code (zip)**, extract it and open the selected example's README. Run local commands from the repository root after `npm ci`; the archive includes the scripts and guides they need.

Portable tests and reading checks do not establish production acceptance. Historical evidence remains tied to its recorded revision and source; missing evidence is not a pass. Follow [validation](../guides/validation.md) and test a private campaign before relying on mechanics. Keep full SRD exports, assembled imports and private test data outside version control.
