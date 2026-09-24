# Deliver SRD-based content

## Private personal compendiums

At `/compendium`, choose **Create or edit compendiums** (`/compendium/edit`) and copy the published **D&D SRD 5.2.1**. Outset retains the full base and adds a personal pack. Add homebrew there, keep the base identity and edition, validate, and **Save version**.

Full-system JSON import accepts a complete SRD-based source bundle or a supported `system-bundle` project document. The example `pack.json` alone is not a full-system import. The optional `prepare:example` helper appends it to a full source export; it never constructs replacement SRD definitions.

Saving creates an immutable personal version and normally adds it to your library. If that library step fails, add the saved source instead of saving a duplicate. Personal releases remain private and cannot be installed as campaign rules, used as global extension bases, or treated as public Marketplace products. Removing a library selection does not rewrite existing characters.

## Campaign homebrew

A campaign DM uses the campaign Rules workspace and creates an extension against its installed SRD. Keep the actual canonical base identity, edition, and supplied release provenance. Add your homebrew pack to that extension. Campaign imports require a supported `extension-bundle`, not the full personal SRD copy produced by the helper.

Validation, publication of a release, installation preview, and installation are separate steps. Use the current workspace's diagnostics and explicit installation flow. Existing sheets retain their adopted definitions; adding a pack does not silently grant new character options or rewrite actors.

## Reading editions

Optional `*.publication.md` files and `*.book.md` outlines format your source for reading. They currently ship as application-bundled content. Importing SRD-based source JSON does not install adjacent Markdown, and this repository does not provide a remote reading-edition installer.

Deliver reading files with their source pack, authoritative compiled snapshots, and a review note. The included snapshot contains only the original example pack compiled against the SRD. Obtain compiled SRD packs too when a document binds or references them. If your authorized export surface does not supply the required compiled packs, leave source-bound validation pending rather than inventing hashes.

## Sharing files

Keep attribution attached to each source. This repository's MIT license covers its tooling and original homebrew, not the underlying SRD. Preserve the base's notices when distributing material derived from it. Keep private source exports, account data, and local assembled bundles out of this public repository.
