# Reading-edition format 0.0.1

Reading editions are passive Markdown companions. Their historical wire identifiers remain unchanged.

## Entry documents

A `*.publication.md` file starts with strict YAML frontmatter:

```yaml
---
format: dm-harness-publication
version: 0.0.1
id: my-book-item-lantern
title: Lantern
entry: my-pack:item:lantern
sourceHash: entry-COPY_FROM_COMPILED_SOURCE
source: My original rules, first edition
attribution: Your actual attribution and license
---
```

The hash above is illustrative, not a usable value. Use the [working example](../examples/lantern-marsh/editions/item-signal-lantern.publication.md) for a real binding.

Required fields are `format`, `version`, `id`, `title`, `source`, and `attribution`. Entry documents additionally require both `entry` and `sourceHash`. Optional `groups` maps section IDs to contents labels. Optional `sourcePacks` maps pack IDs to exact compiled hashes for other packs whose data was copied or used to derive the edition. A cross-reference alone does not require a source-pack dependency.

## Reference documents

An introduction or rules chapter without a root entity omits both `entry` and `sourceHash` and includes a nonempty `sourcePacks` map. Never invent an executable entry to satisfy a reading format. See the [introduction example](../examples/lantern-marsh/editions/introduction.publication.md).

## Body and sections

The body must begin with an H2. Every H2 needs an explicit, stable section ID, unique across the reading corpus:

```markdown
## Using the Lantern {#my-book-lantern-use}

Keep the complete rule here, including its exceptions.
```

H3 through H6 nest inside a section. The frontmatter title replaces H1. Supported content includes paragraphs, emphasis, strikethrough, inline code, lists, blockquotes, thematic breaks, GFM tables, and links. Table rows must retain every cell, including empty progression cells; preserve spanning-header meaning when flattening source tables.

Ordinary links must use HTTPS. Compendium links use exact installed identities:

```markdown
[Marshlight](compendium:lantern-marsh-core:spell:marshlight)
```

A section may end with one special related-entry fence:

````markdown
```compendium-links
groupBy: spell-level
entries:
  - lantern-marsh-core:spell:marshlight
```
````

`groupBy` is optional; `spell-level` requires spell entries with known levels. The fence must be last in that section. Duplicate references within the fence are rejected.

Raw HTML, images, scripts, general code fences, reference-style links, uneven tables, unknown frontmatter fields, duplicate YAML keys, YAML aliases/anchors/tags, and ambiguous sections are rejected. Documents are limited to 512 KiB. A book outline is limited to 256 KiB.

## Books

A `*.book.md` file contains only YAML frontmatter, with `format: dm-harness-publication-book`, `version: 0.0.1`, `id`, `title`, and `chapters`. Each chapter has an ID, title, and ordered document IDs. See the [complete outline](../examples/lantern-marsh/editions/lantern-marsh.book.md).

Document membership is explicit. Missing documents, repeated placement, duplicate book IDs, and duplicate chapter IDs within a book fail validation. Book order never bypasses a document's source bindings.

## Source admission

The root entry hash and all declared source-pack hashes must match the supplied compiled packs. Outset can fall back to raw entry text when a reading edition is stale or unavailable. A corrected reading edition does not repair the underlying rules source. Preserve complete text; do not shorten the edition for hover cards.
