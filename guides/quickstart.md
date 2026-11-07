# Make your first playable monster

Create **Reed Warden**, an original SRD-based monster, then roll its Staff attack and damage in Outset. Finish with **AC 12, HP 9/9, Speed 30 feet, Staff Attack +2 and Staff Damage 1d6**.

You need an [Outset account](https://app.outset-vtt.gg/) with DM access to a private test campaign using D&D SRD 5.2.1. This route uses the campaign editor; no agent or local command-line tools are required.

This tutorial adds structured JSON through the editor. To author with plain Markdown instead, see [Markdown templates](markdown-templates.md); free-form prose is still not interpreted.

## 1. Create a campaign extension

Open your private test campaign, then its **Rules** workspace. Create a new project against the campaign's installed SRD base and name it **Lantern Marsh practice**. Keep the supplied base identity, edition and release provenance.

Use a fresh extension for this exercise. A personal compendium's **Save version** creates a different artifact and cannot substitute for campaign publication and installation.

## 2. Add the example pack

Open the [Lantern Marsh source pack](../examples/lantern-marsh/source/pack.json) and use GitHub's **Raw** view to copy the complete JSON object.

In your extension's **Source** section, add that object to the document's `compendiumPacks` array. Preserve the enclosing extension document, base reference, modules and any existing packs. If the array is empty, its contents become the single copied pack object. Do not replace the complete document with the pack.

Keep pack ID `lantern-marsh-core` and monster entry ID `reed-warden` for this exercise. If the campaign already has this pack, use a fresh test campaign or review the existing extension instead of adding a duplicate.

The pack also includes Signal Lantern and Marshlight for the reading tutorial. Their effects remain manual; this exercise uses the monster's structured fields and Staff actions.

## 3. Validate, publish and install

1. Review the editor's diagnostics and resolve errors. Confirm the monster's Staff actions are present, not only its description.
2. Review the release changes, enter a version newer than the project's previous release and release notes, and choose **Publish release**.
3. Preview installing that release into your test campaign. Confirm the intended addition, then complete installation.

A saved draft or published release alone does not change the campaign. Install the pack before creating the monster. See [campaign delivery](delivery.md#campaign-homebrew) for these stages.

## 4. Create Reed Warden from the installed pack

Return to the campaign and open monster creation. Under **Compendium monster**, search for **Reed Warden**, choose the Lantern Marsh entry, and complete creation. Start from the installed entry rather than an empty custom stat block.

Open the new sheet and check:

| Field | Expected value |
| --- | --- |
| Size / type | Medium Humanoid |
| AC / HP / speed | 12 / 9 of 9 / 30 feet |
| Ability scores | STR 10, DEX 14, CON 10, INT 10, WIS 12, CHA 10 |
| Staff actions | Staff Attack and Staff Damage |
| Other feature | Safe-path signal (manual) |

If Reed Warden is missing, confirm the release is installed in this campaign, then reload. If stats differ, inspect the source before continuing.

## 5. Roll and verify

Use a disposable practice target within 5 feet if the action prompts for one.

- Run **Staff Attack**. Its resolved roll should be `1d20+2`; the random total will vary.
- After deciding whether it hits, run **Staff Damage**. Expect `1d6` Bludgeoning.
- Reload the campaign and reopen the monster. Saved stats and both Staff actions should remain available.

This example rolls dice. You still adjudicate hits, adjust critical-hit dice and apply damage through the table's controls. The signal's duration and usage limit are also manual. Import does not generate artwork or place a token.

If a button is absent or a formula differs, the exercise has not passed merely because validation succeeded. Check the installed release and `data.sheetAbilities`; the [field walkthrough](structured-monster.md) explains the source.

## Next steps

- [Change the monster's stats or actions](structured-monster.md).
- [Make an item with tracked charges, a species or a background](emberwatch.md).
- [Format a readable book](reading-editions.md).
- [Use a personal library instead of campaign rules](delivery.md#private-personal-compendiums).

## Optional: prepare a personal full-system import locally

For personal authoring, obtain your complete authorized SRD source export. A compiled snapshot is not source. With Node.js 22+:

```sh
git clone https://github.com/outset-vtt/compendium-authoring-guide.git
cd compendium-authoring-guide
npm ci
mkdir -p output
npm run prepare:example -- /path/to/srd-source.json output/lantern-marsh.json
```

To choose Emberwatch, add `examples/emberwatch/source/pack.json` as the third argument. The helper preserves the full base and refuses collisions or existing output files; it does not compile mechanics. Import its output only through personal authoring, validate, then **Save version**. Do not import this full-system output into a campaign extension or commit your base export.
