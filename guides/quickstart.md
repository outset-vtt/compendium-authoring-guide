# Add your first pack to the SRD

## 1. Start from the published SRD

In Outset, open `/compendium` and choose **Create or edit compendiums**. Create a private copy of the built-in **D&D SRD 5.2.1**. Keep the copied system, modules, built-in packs, actor profiles, and preserved source data. Give your compendium a project name without renaming the base system or changing its edition.

Outset adds an empty personal pack. Use it for your additions so that homebrew has its own identities and attribution. If you are authoring for a campaign, use its Rules workspace to create an extension against its installed SRD instead; see [delivery](delivery.md).

## 2. Add one original entry

Open [the Lantern Marsh pack](../examples/lantern-marsh/source/pack.json) and find `signal-lantern`. Add it to your project's homebrew pack through the compendium editor or copy the complete example pack into the project's `compendiumPacks` array in Source. Preserve all existing packs. Use a new pack ID if that ID is already present.

The example pack uses `systemId: dnd-srd-5-2-1`. Its item has 3 charges, an action cost, and dawn recharge. Those are homebrew rules written using SRD conventions; this prose example does not create an automatic charge tracker.

## 3. Validate and save

Use the editor's compiler diagnostics. Check the entry's description, type, and references. For automated behavior, also author and test the required typed item, resource, and action fields against the inherited SRD profiles. **Save version** when the draft is valid. Saving a personal version does not install it in a campaign.

## Optional: prepare a full-system JSON import locally

Obtain the complete source JSON from your authorized SRD-based project or release. A compiled pack snapshot is not that source. The helper accepts a raw bundle with `system` or a `system-bundle` project document. It preserves the complete base and appends the original example pack:

```sh
git clone https://github.com/outset-vtt/compendium-authoring-guide.git
cd compendium-authoring-guide
npm ci
mkdir -p output
npm run prepare:example -- /path/to/srd-source.json output/lantern-marsh.json
```

Import the resulting full-system JSON through personal authoring. The helper refuses a different system/edition, a duplicate example pack, and an existing output file. It does not download the SRD, compile mechanics, create a campaign extension, or validate the authenticity of your source export. Do not commit that export or the assembled output here.

## Optional: format a reading edition

Run `npm run validate:examples` to check the four supplied reading documents and book. Compare [the item edition](../examples/lantern-marsh/editions/item-signal-lantern.publication.md) with its source entry. The edition keeps every cost, limit, and exception and links the exact Marshlight entry.

For a presentation-only experiment:

```sh
cp -R examples/lantern-marsh/editions output/my-editions
npm run validate -- output/my-editions --snapshot examples/lantern-marsh/source/compiled-packs.json
```

Preserve section IDs. If source facts change, obtain fresh compiled packs and re-review before rebinding hashes. Follow [reading editions](reading-editions.md) for chapter introductions and book ordering. These Markdown files do not travel through the full-system JSON import.
