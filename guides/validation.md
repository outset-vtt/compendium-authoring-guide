# Check documents, rules and gameplay separately

A successful document check does not prove that a monster can attack or an item can spend charges. Use the check for the artifact you are changing.

| Level | Where to check | Success means |
| --- | --- | --- |
| Reading edition | `npm run check:reading -- <editions-directory> --snapshot <compiled-packs.json>` | Supported Markdown, bindings, references and book membership agree with the supplied snapshot |
| Portable repository checks | `npm test` and `npm run check:links` | Tooling/fixture regressions pass and relative Markdown file links resolve |
| Executable rules | Outset editor diagnostics and release validation against the actual base | Supported typed fields and references validate; publication remains separate |
| Gameplay | Private campaign with the intended release installed | The specific sheet/action behavior works, including failed preconditions and reload |

## Run the supplied reading example

Requires Node.js 22+ and Python 3, from the repository root:

```sh
npm ci
npm run check:reading-examples
npm test
npm run check:links
```

`check:reading-examples` checks only Lantern Marsh's four reading documents and book. Emberwatch has no reading edition. The old names `validate` and `validate:examples` have been replaced by `check:reading` and `check:reading-examples` to make their scope explicit.

For a presentation-only experiment, use a fresh output directory:

```sh
mkdir -p output
cp -R examples/lantern-marsh/editions output/my-editions
npm run check:reading -- output/my-editions --snapshot examples/lantern-marsh/source/compiled-packs.json
```

Preserve section IDs and complete rules text. If source facts change, obtain a fresh authoritative snapshot and re-review the edition before updating its bindings.

## What the reading validator checks

The editions directory contains only `*.publication.md` and `*.book.md` files; nested folders are supported. Keep notes outside it. Supply compiled packs with unique identities, content hashes and `data` objects, including relevant SRD packs for cross-pack references.

The validator checks syntax, supported nodes, source bindings, unique documents/entries/sections, references, spell-level grouping and book membership. It does not fetch URLs, compile action pipelines, install content or test the application.

Snapshot hashes are trusted inputs, not recomputed from arbitrary source JSON. Agreement with a snapshot does not authenticate that snapshot or prove prose fidelity.

| Failure | Resolution |
| --- | --- |
| Missing or changed source | Obtain the intended snapshot and re-review before updating bindings |
| Duplicate document or entry binding | Use distinct IDs and one edition per exact entry identity |
| Repeated section ID | Prefix new IDs with document identity; preserve existing IDs |
| Unresolved reference | Correct the pack/type/entry ID or supply the missing compiled pack |
| Spell grouping requires levels | Supply spell entries with authoritative numeric level data |
| Missing book document | Use the frontmatter document ID, not filename or title |
| Unsupported content | Remove raw HTML/images/general code fences from reading editions |
| Uneven table | Restore missing cells and check the source table |
| Snapshot rejected | Supply compiled pack objects, not a source bundle or release wrapper |

## Check executable content

Use the editor's actual SRD base and authoritative diagnostics before saving a personal version or publishing a campaign release. `prepare:example` only assembles source and checks input shape; it does not compile rules.

Then follow the [Reed Warden roll checks](quickstart.md#5-roll-and-verify) or [Emberwatch gameplay checklist](emberwatch.md#verify-in-a-private-campaign). Record the installed release, observed behavior and manual steps. A draft save, passing CI or successful compilation is not a gameplay result.

## Maintainer checks

CI runs reading-example validation, the Node suite and local-link checks. Tests cover malformed publications, import preparation, fixture consistency and source-bound evidence. They do not execute Outset's rules engine, which is not bundled here.

See [Lantern Marsh's review](../examples/lantern-marsh/review.md), [Emberwatch's review](../examples/emberwatch/review.md) and [parser provenance](../lib/README.md) for evidence scope and origin.
