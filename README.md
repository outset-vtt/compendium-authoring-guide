# Create custom content for Outset

Build playable monsters, items, species, backgrounds, feats and spells on Outset's **D&D SRD 5.2.1** base. This repository contains human-facing guides, original examples and local document checks.

[Open Outset](https://app.outset-vtt.gg/) · [Make your first playable monster](guides/quickstart.md) · [Set up an authoring agent](https://github.com/outset-vtt/agent-plugins)

## Choose what you want to make

| Your goal | Start here | Result |
| --- | --- | --- |
| Make a monster with working rolls | [Goblin Raider quickstart](guides/quickstart.md) | A campaign monster with HP, Scimitar Attack and Scimitar Damage |
| Write content as plain Markdown | [Markdown templates](guides/markdown-templates.md) | Import, review automated / needs clarification / manual mechanics, export |
| Make a charged magic item | [Amulet of Warding](guides/barrowdale.md#amulet-of-warding-a-passive-gate-and-a-charged-action) | Gated AC, activation requirements, charges and Temporary HP |
| Make a species, background, feat or spell | [Barrowdale walkthrough](guides/barrowdale.md) | Spell choices, Darkvision, HP per level, skills, tool proficiency, equipment, roll modifiers and spell scaling |
| Make a legendary monster | [Barrow Wight](guides/barrowdale.md#barrow-wight-uses-saves-areas-conditions-and-legendary-actions) | Recharge, saves with area templates, a grapple follow-up, daily uses and legendary actions |
| Format a readable compendium or book | [Reading editions](guides/reading-editions.md) | Linked Markdown documents and ordered chapters; currently application-bundled |
| Create content with an agent | [Outset Creator skills](https://github.com/outset-vtt/agent-plugins) | Guided authoring; live operations require a separate MCP connection |

The [first-use check](guides/first-use-verification.md) passed the quickstart route end to end on production on November 8 with the previous example. Barrowdale's own checks ran in the application repository; its production rerun is pending.

Start with a private test campaign for playable examples. For a personal character library instead, [personal authoring](guides/delivery.md#private-personal-compendiums) saves a private version; it does not install campaign rules.

## Pick an example

Browse the [example catalog and standard layout](examples/README.md).

| Example | Best for | What to expect |
| --- | --- | --- |
| [Barrowdale](examples/barrowdale/README.md) | Everything the templates support, in one village | Twelve entries a homebrewer recognizes: a goblin, a barrow wight, hill folk, a guide, an amulet, a spear, mail, a potion, a watchman's feat and three hearth spells. Each has a template, a capability row, a [gameplay checklist](guides/barrowdale.md#verify-in-a-private-campaign) and [review evidence](examples/barrowdale/review.md); four also have reading editions. |

The `source/pack.json` is an additive pack, **not** a complete system import. Follow the tutorial before importing it.

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
| `check:reading-examples` | Barrowdale's Markdown reading editions agree with their supplied snapshot |
| `npm test` | Portable tooling, template and example fixture regressions pass |
| `check:links` | Repository-relative Markdown file links resolve |

**None of these commands runs Outset's rules engine or proves live gameplay.** Validate rules in Outset, then exercise the gameplay checklist. See [validation levels and troubleshooting](guides/validation.md).

## Versions, contributions and reuse

This is the development guide on `main`, at tooling version **0.4.0** (unreleased), which replaces the Emberwatch and Lantern Marsh examples with Barrowdale. The latest tagged release is [0.3.1](https://github.com/outset-vtt/compendium-authoring-guide/releases/tag/v0.3.1), with the previous examples; download its **Source code (zip)** for that version's guide and checks. The guide targets SRD **5.2.1** and uses reading formats `dm-harness-publication` / `dm-harness-publication-book` **0.0.1**.

Preserve the SRD-first workflow and run the checks above before contributing. See [parser provenance](lib/README.md) before changing validation semantics.

Tooling and original examples are [MIT licensed](LICENSE). Preserve the separate notices supplied with the SRD base. Keep private source exports and account/campaign data out of commits.
