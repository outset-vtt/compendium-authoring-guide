# Authoring examples

Read the example's capability table, then follow its **Use in Outset** section. The example extends Outset's complete D&D SRD 5.2.1 base; its `source/pack.json` is not a complete system import.

| Example | Contents | Start here |
| --- | --- | --- |
| [Barrowdale](barrowdale/README.md) | A goblin, a legendary barrow wight, a species, a background, a charged amulet, a weapon, armor, a potion, a feat and three spells as Markdown templates and a JSON pack, with reading editions for four of them | [First playable monster](../guides/quickstart.md), then the [walkthrough](../guides/barrowdale.md) |

## Example layout

The example uses these paths:

```text
<example>/
  README.md          # Overview, files, behavior, requirements, use, verification, license
  review.md          # Evidence, provenance and remaining limitations
  source/
    pack.json        # Editable additive rules pack
```

Optional files are included when the example supplies them; Barrowdale supplies all of them:

| Path | Purpose |
| --- | --- |
| `markdown/*.md` | Template Markdown for each entry, importable through Rules Studio; the source of the JSON pack |
| `source/compiled-packs.json` | Snapshot for document validation, not editable source |
| `source/*.md` | Original reference-chapter source |
| `editions/*.publication.md` | Markdown reading editions, not executable mechanics |
| `editions/*.book.md` | Book order and document references |
| `verification.json` | Recorded engine results with revision, source hash and scope |

Keep editable JSON under `source/`; keep reading editions under `editions/`. The README uses a fixed section order so readers can find capabilities, prerequisites and verification without learning a new layout. Preserve stable pack and entry IDs when reorganizing files.

## What a release proves

[Tagged releases](https://github.com/outset-vtt/compendium-authoring-guide/releases) provide fixed source snapshots. Download the release's **Source code (zip)**, extract it and open the selected example's README. Run local commands from the repository root after `npm ci`; the archive includes the scripts and guides they need.

Portable tests and reading checks do not establish production acceptance. Historical evidence remains tied to its recorded revision and source; missing evidence is not a pass. Follow [validation](../guides/validation.md) and test a private campaign before relying on mechanics. Keep full SRD exports, assembled imports and private test data outside version control.
