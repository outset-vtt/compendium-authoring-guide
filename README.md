# Create custom content for Outset

Build playable monsters, items, species and backgrounds on Outset's **D&D SRD 5.2.1** base. This repository contains human-facing guides, original examples and local document checks.

[Open Outset](https://app.outset-vtt.gg/) · [Make your first playable monster](guides/quickstart.md) · [Set up an authoring agent](https://github.com/outset-vtt/agent-plugins)

## Choose what you want to make

| Your goal | Start here | Result |
| --- | --- | --- |
| Make a monster with working rolls | [Reed Warden quickstart](guides/quickstart.md) | A campaign monster with HP, Staff Attack and Staff Damage |
| Make a charged magic item | [Cinderward Brooch](guides/emberwatch.md) | Gated AC, activation requirements, charges and Temporary HP |
| Make a species or background | [Emberwatch walkthrough](guides/emberwatch.md) | Spell choices, Darkvision, HP per level, skills, tool proficiency and equipment |
| Format a readable compendium or book | [Reading editions](guides/reading-editions.md) | Linked Markdown documents and ordered chapters; currently application-bundled |
| Create content with an agent | [Outset Creator skills](https://github.com/outset-vtt/agent-plugins) | Guided authoring; live operations require a separate MCP connection |

Start with a private test campaign for playable examples. For a personal character library instead, [personal authoring](guides/delivery.md#private-personal-compendiums) saves a private version; it does not install campaign rules.

## Pick an example

| Example | Best for | What to expect |
| --- | --- | --- |
| [Lantern Marsh](examples/lantern-marsh/README.md) | First monster and readable books | Reed Warden has executable Staff rolls. Signal Lantern and Marshlight demonstrate prose and reading editions; their effects remain manual. |
| [Emberwatch](examples/emberwatch/README.md) | Character options and item mechanics | Four integrated entries with a capability table, [gameplay checklist](guides/emberwatch.md#verify-in-a-private-campaign) and [review evidence](examples/emberwatch/review.md). Alert's initiative bonus remains a documented limitation in the reviewed build. |

A `source/pack.json` is an additive pack, **not** a complete system import. Follow the selected tutorial before importing it.

## Understand the formats

- **Rules source** defines executable behavior through supported typed fields. Validate in Outset, save or publish, and explicitly install campaign releases.
- **Reading editions** format descriptions and references in Markdown. They do not implement mechanics, and a JSON import does not install adjacent Markdown.
- **Compiled snapshots** support document checks against a particular rules revision. They are not editable source bundles.

[Rules content](guides/rules-content.md) · [Delivery paths](guides/delivery.md) · [Source fidelity](guides/source-fidelity.md)

## Run the local checks

Requires Node.js 22+ and Python 3. From this repository:

```sh
npm ci
npm run check:reading-examples
npm test
npm run check:links
```

| Check | What it proves |
| --- | --- |
| `check:reading-examples` | Lantern Marsh's Markdown reading editions agree with their supplied snapshot |
| `npm test` | Portable tooling and example fixture regressions pass |
| `check:links` | Repository-relative Markdown file links resolve |

**None of these commands runs Outset's rules engine or proves live gameplay.** Emberwatch has no reading edition. Validate rules in Outset, then exercise the selected example's gameplay checklist. See [validation levels and troubleshooting](guides/validation.md).

## Versions, contributions and reuse

This is the development guide on `main`. Use [tagged releases](https://github.com/outset-vtt/compendium-authoring-guide/releases) for fixed snapshots; newer examples on `main` may not be in the latest tag. The tooling package is version **0.2.0**, targets SRD **5.2.1**, and uses reading formats `dm-harness-publication` / `dm-harness-publication-book` **0.0.1**.

Preserve the SRD-first workflow and run the checks above before contributing. See [parser provenance](lib/README.md) before changing validation semantics.

Tooling and original examples are [MIT licensed](LICENSE). Preserve the separate notices supplied with the SRD base. Keep private source exports and account/campaign data out of commits.
