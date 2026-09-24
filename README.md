# Author SRD-based compendiums for Outset

Start with Outset's built-in **D&D SRD 5.2.1** and add your own content in a separate compendium pack. Keep the SRD's system identity, actor profiles, attributes, conditions, and action conventions. This guide assumes that base throughout.

## Start in Outset

Open `/compendium`, choose **Create or edit compendiums**, and create a private copy of the published SRD. Outset retains the complete base and adds an empty personal pack. Author your monsters, items, spells, backgrounds, or species in that pack, validate the draft, and **Save version**.

For campaign homebrew, use the campaign Rules workspace and its extension workflow against the campaign's installed SRD. A private personal version and a campaign extension are different delivery paths; neither requires designing a replacement system.

## Guides

1. [Quickstart](guides/quickstart.md): extend an SRD copy with your first homebrew pack.
2. [Rules content](guides/rules-content.md): preserve the base, choose entry identities, and add supported mechanical data.
3. [Reading editions](guides/reading-editions.md): optional reviewed Markdown, tables, and references.
4. [Source fidelity](guides/source-fidelity.md): preserve rules and distinguish original homebrew from SRD-derived text.
5. [Delivery](guides/delivery.md): private versions, campaign extensions, and reading editions.
6. [Validation](guides/validation.md): compile in Outset and validate reading files locally.

## Example: Lantern Marsh

The [example pack](examples/lantern-marsh/README.md) adds an original monster, magic item, and spell to SRD 5.2.1. It contains no replacement system definitions or copied SRD rules text. It also demonstrates an optional reading edition and book outline.

`source/pack.json` is a pack to add to your existing SRD-based project, not a complete system import. For a local import file, [the quickstart](guides/quickstart.md) shows how to combine it with your own full SRD source export while preserving the base.

The [structured Reed Warden walkthrough](guides/structured-monster.md) shows SRD sheet import, HP, ability scores, and executable Staff attack and damage rolls. Its signal and the item/spell effects remain manual. Prose alone does not implement mechanics.

## Optional reading-edition tools

Requires Node.js 22 or newer and npm; link checking also uses Python 3.

```sh
npm ci
npm run validate:examples
npm test
npm run check:links
```

The included compiled snapshot contains only the original homebrew pack, compiled against Outset's SRD base. The reading validator checks syntax, references, book membership, and agreement with that snapshot. It does not compile game mechanics or install content. Reading editions currently have an application-bundled delivery path, separate from rules-source import.

Use [author-outset-compendium](https://github.com/outset-vtt/agent-plugins/tree/main/plugins/outset-creator/skills/author-outset-compendium) for agent-assisted authoring.

## Versions and reuse

Guide release **0.2.0** targets SRD **5.2.1**. The SRD edition is distinct from an Outset release ID or your homebrew version. Reading wire formats retain `dm-harness-publication` and `dm-harness-publication-book`, version **0.0.1**.

The tooling and original examples use the [MIT license](LICENSE). That license does not replace the SRD's own attribution or license notices. Preserve the notices supplied with your base when copying or distributing SRD-derived material. Keep private source exports outside this repository.

Contributions should preserve this SRD-first workflow and use original or properly attributed examples. Run the checks above; see [parser provenance](lib/README.md) before changing validation semantics.
