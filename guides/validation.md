# Validate against your SRD base

```sh
npm run validate -- path/to/editions --snapshot path/to/compiled-packs.json
```

The editions directory contains only `*.publication.md` and `*.book.md` files (nested folders are supported). Keep notes and source witnesses outside it. The snapshot must be an array of compiled packs with unique pack IDs, entry identities, content hashes, and `data` objects. Supply the entire relevant catalog when checking cross-pack references.

The validator checks Markdown/YAML syntax, supported nodes, source bindings, document and entry uniqueness, globally unique section IDs, resolvable references, spell-level grouping, and book membership. It never fetches URLs, compiles action pipelines, rewrites files, changes hashes, or installs content.

Snapshot hashes are treated as authoritative input, not recomputed from arbitrary source JSON. A successful run means the documents agree with the supplied snapshot. It does not authenticate that snapshot, prove prose fidelity, or guarantee availability in a particular campaign. Only trust snapshots from the intended source revision.

| Failure | Resolution |
| --- | --- |
| Missing or changed source | Obtain the intended compiled snapshot; re-review changed source before updating bindings |
| Duplicate document or entry binding | Use distinct document IDs and one edition per exact entry identity |
| Repeated section ID | Prefix new section IDs with the document identity; preserve established IDs |
| Unresolved reference | Correct the exact pack/type/entry ID or provide the missing compiled pack |
| Spell grouping requires levels | Target actual spells with authoritative numeric level data |
| Missing book document | Use the frontmatter document ID, not a filename or title |
| Unsupported content | Replace raw HTML/images/general code fences with supported passive Markdown |
| Uneven table | Restore missing cells and check the original table layout |
| Snapshot rejected | Supply compiled pack objects, not a raw `system` bundle or release wrapper |

## Maintainer checks

`npm test` includes the valid corpus and intentionally broken variants: stale source, missing references, duplicate IDs, prohibited markup, wrong book membership, and malformed source snapshots. Structured-monster tests also compare source stats with the reading table, check action timing and explicit manual boundaries, and ensure the compiled snapshot retains the authored data. They do not run the rules engine. `npm run check:links` checks repository-relative Markdown links. CI runs all three checks.

The original homebrew pack was composed with Outset's SRD 5.2.1 base and checked with its rules compiler before saving the homebrew-only snapshot. That compiler is not bundled here. The portable checks do not reproduce full rules compilation, verify live MCP operations, or exercise application rendering. Read the [source review](../examples/lantern-marsh/review.md) for semantic evidence.

For source imports, run `npm run prepare:example -- <full-srd-source.json> <new-output.json>` only with your actual full SRD source. The helper checks base identity, edition, input shape, and pack collisions; Outset still performs authoritative mechanical validation. The reading validator cannot substitute for that step.
