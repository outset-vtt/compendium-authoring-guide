# Make your first playable monster

Create a **Goblin Raider**, an original SRD-based monster, then roll its Scimitar attack and damage in Outset. Finish with **AC 15, HP 10/10, Speed 30 feet, Scimitar Attack +4 and Scimitar Damage 1d6 + 2**.

You need an [Outset account](https://app.outset-vtt.gg/) with DM access to a private test campaign using D&D SRD 5.2.1. This route uses the campaign editor; no agent or local command-line tools are required.

The quick path imports one Markdown file. The [JSON route](#alternative-add-the-json-pack) adds the same monster as structured JSON instead.

## 1. Create a campaign extension

Open your private test campaign. Use the top-left **Campaign** menu, choose **Manage campaign**, select **Rules**, then **Import into Rules Studio**. The built-in SRD initially opens read-only.

Choose **Create rules project** (the plus button beside Projects), name it **Barrowdale practice**, and select **Adopt the campaign's installed rules snapshot**. Choose **Create project**. Keep the supplied base identity, edition, revision and release provenance. Adopting a snapshot includes the existing packs, so the source can be large.

Use a fresh extension for this exercise. A personal compendium's **Save version** creates a different artifact and cannot substitute for campaign publication and installation.

## 2. Import the Goblin Raider

Open [goblin-raider.md](../examples/barrowdale/markdown/goblin-raider.md) and copy its text, or download the file.

In your extension, choose the pack that should hold the monster (create one if the extension has none), then **Import Markdown**. Paste the text or choose the file and pick **Review mechanics**. The review lists every line of the template:

- **Automated**: the stat block fields, Scimitar and Shortbow. The summary says what will run, such as "Attack `1d20 + 4`, then `1d6 + 2` slashing damage".
- **Manual**: Nimble Escape, the passive Perception score and the languages. They are kept as text on the sheet.
- **Needs clarification**: nothing, for the unchanged file. Change `Speed: 30 feet` to `Speed: fast` to see one; it names the line and blocks the import until fixed.

Choose **Add 1 entry**. The monster joins the draft pack with the stable ID `goblin-raider`. If the campaign already has it, use a fresh test campaign instead of adding a duplicate.

## 3. Validate, publish and install

1. Wait for **Saved** (or choose **Save now**), then choose **Validate on server** in Diagnostics. Resolve errors. Confirm the monster's Scimitar actions are present, not only its description.
2. Open **Publish**, enter a new **Semantic version** (`0.1.0` for a fresh project) and **Release notes**, choose **Review changes**, then **Publish release** once validation allows it.
3. Preview installing that release into your test campaign. Confirm the intended addition, then complete installation.

A saved draft or published release alone does not change the campaign. Install the pack before creating the monster. See [campaign delivery](delivery.md#campaign-homebrew) for these stages.

## 4. Create the Goblin Raider from the installed pack

Return to the campaign and open monster creation. Under **Compendium monster**, search for **Goblin Raider**, choose the Barrowdale entry, and complete creation. Start from the installed entry rather than an empty custom stat block.

Open the new sheet and check:

| Field | Expected value |
| --- | --- |
| Size / type | Small Fey |
| AC / HP / speed | 15 / 10 of 10 / 30 feet |
| Ability scores | STR 8, DEX 14, CON 10, INT 10, WIS 8, CHA 8 |
| Skills | Stealth +6 |
| Actions | Scimitar Attack, Scimitar Damage, Shortbow Attack, Shortbow Damage |
| Trait | Nimble Escape (manual) |

If the Goblin Raider is missing, confirm the release is installed in this campaign, then reload. If stats differ, inspect the template before continuing.

## 5. Roll and verify

Like the SRD's own monster attacks, Scimitar Attack needs a target. Select a disposable practice target within 5 feet first.

- Run **Scimitar Attack**. Its resolved roll should be `1d20 + 4`; the random total will vary.
- After deciding whether it hits, run **Scimitar Damage**. Expect `1d6 + 2` Slashing.
- Reload the campaign and reopen the monster. Saved stats and all four actions should remain available.

This example rolls dice. You still adjudicate hits, adjust critical-hit dice and apply damage through the table's controls, and Nimble Escape is yours to apply. Import does not generate artwork or place a token.

If a button is absent or a formula differs, the exercise has not passed merely because validation succeeded. Check the installed release and the monster's actions; the [field walkthrough](structured-monster.md) explains the source.

## Next steps

- [Change the monster's stats or actions](structured-monster.md).
- [Add the wight, the species, the background, the items, the feat and the spells](barrowdale.md).
- [Format a readable book](reading-editions.md).
- [Use a personal library instead of campaign rules](delivery.md#private-personal-compendiums).

## Alternative: add the JSON pack

The [Barrowdale pack](../examples/barrowdale/source/pack.json) is exactly what Import Markdown produces for all twelve templates. To use it instead, open it with GitHub's **Raw** view, copy the complete JSON object, and in your extension's **JSON source** section add it to the document's `compendiumPacks` array. Preserve the enclosing extension document, base reference, modules and existing packs; do not replace the complete document with the pack. Keep pack ID `barrowdale`. Then continue from step 3. The other eleven entries come along; their effects are described in the [walkthrough](barrowdale.md).

## Optional: prepare a personal full-system import locally

For personal authoring, obtain your complete authorized SRD source export. A compiled snapshot is not source. With Node.js 22+:

```sh
git clone --depth 1 https://github.com/outset-vtt/compendium-authoring-guide.git
cd compendium-authoring-guide
npm ci
mkdir -p output
npm run prepare:example -- /path/to/srd-source.json output/barrowdale.json
```

The helper preserves the full base and refuses collisions or existing output files; it does not compile mechanics. Import its output only through personal authoring, validate, then **Save version**. Do not import this full-system output into a campaign extension or commit your base export.

## Verification status

The November 8 production run in [first-use verification](first-use-verification.md) passed every stage of this route with the previous example, the Reed Warden, added as JSON. The Goblin Raider and the Import Markdown control were verified in the application repository's tests and its isolated preview at revision `b6829c32b`; this exact route has not yet been rerun on production.
