# Extend the SRD with your content

The assumed base is Outset's **D&D SRD 5.2.1**, with canonical system ID `dnd-srd-5-2-1`. Begin with an actual published SRD source or the campaign's installed SRD context. Reuse its actor profiles, ability scores, hit points, armor class, speeds, conditions, resources, and action-v2 conventions.

## Preserve the base

For personal authoring, the project remains a complete `system-bundle` copied from the SRD. Keep its `system`, modules, built-in packs, and source metadata. Add your content in a separate pack rather than replacing the base or inventing a minimal substitute system. The project name and your pack name can be custom; the underlying system identity and edition stay SRD-owned.

For campaign authoring, use an `extension-bundle` created from the campaign's installed SRD. Preserve the editor's actual `baseSystem` ID, edition, revision, and release provenance. Do not manufacture a release ID or paste the personal full-system example into a campaign extension import.

## Add a pack

[Lantern Marsh's `pack.json`](../examples/lantern-marsh/source/pack.json) contains `id`, `name`, `systemId`, and `entries`. Each entry has a stable `id`, a `type`, a display `name`, source information, and `data`.

An entry is addressed by `packId:type:entryId`, for example `lantern-marsh-core:item:signal-lantern`. Names are not identities. New homebrew should use its own pack and entry IDs; preserve the IDs of content you have already released. Treat changes to an existing SRD entry as explicit overrides through the supported editor, not accidental collisions.

The example is an additive content pack. It does not define actor profiles or replace SRD rules. Its original monster has ordinary ability scores, AC, HP, Speed, and an attack; its magic item uses charges; its spell declares a level, school, casting time, range, components, and duration.

## Distinguish prose from automation

The [Reed Warden](structured-monster.md) includes the fields required by the inherited monster importer and `data.sheetAbilities` with action-v2 Staff rolls. Its HP becomes a sheet resource. The signal, lantern charges/recovery, and spell effects remain manual. Setting `type: monster` or `type: spell` alone does not wire a creature sheet or casting action.

Use the current typed compendium editors and inherited SRD actor profiles to implement supported mechanics. Copy field IDs from that base or authoring context, not labels guessed from a printed stat block. Use strict action-v2 pipelines and actual installed resources and conditions. Check action costs, targeting, zero-resource cases, recovery timing, and conditional effects in the editor's validation and test tools.

Additional entries such as backgrounds and species should use the existing SRD-compatible typed forms. Selecting or installing a new option is separate from granting it to a character.

## Link the intended source

Link SRD references only to IDs observed in the selected compiled SRD packs. A trait called Darkvision is not automatically a reference to the spell. A reading edition may link both your homebrew and the base; supply the relevant compiled packs for validation. The small included snapshot contains only Lantern Marsh, so SRD links need an additional authoritative SRD snapshot.

Keep the SRD edition, your homebrew version, and Outset's internal release identities separate. Source changes require new compilation and review; changing a reading hash does not update executable rules.
