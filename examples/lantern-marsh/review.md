# Lantern Marsh SRD-base review

Reviewed 2026-09-24 for guide 0.2.0. This revision deliberately replaces the old standalone mini-system example with an additive homebrew pack for Outset's D&D SRD 5.2.1. Earlier example content remains in Git history; these changes are authored homebrew revisions, not formatting-only corrections.

## Source and compilation

- `source/pack.json` SHA-256: `9b445d811d5dd5a7157e6eb91174030576bfcd6d27c048f1c6066922bc929028`
- `source/compiled-packs.json` SHA-256: `8e280c30ef0a55c05508a7eb19da1235142297b718d64460cae8049ec9f6026c`
- `source/introduction.md` SHA-256: `cb67ecb65d42da26efc38f4b9ce3426cef376e90a1e508237abcc65ab6472b4f`

The pack targets canonical system `dnd-srd-5-2-1`. It was composed with Outset's built-in SRD 5.2.1 and compiled successfully. The saved snapshot contains only the compiled original homebrew pack; it omits SRD source and built-in packs. Reading bindings use the compiler's returned hashes. The portable validator consumes that snapshot and does not include the compiler.

## Reviewed changes and facts

| Entry | Facts preserved in its reading edition |
| --- | --- |
| Reed Warden | Medium Humanoid; raised-path guardian; AC 12; HP 9; Speed 30 feet; STR 10, DEX 14, CON 10, INT 10, WIS 12, CHA 10; Staff +2, reach 5 feet, one target, 3 (1d6) Bludgeoning; once per Long Rest action to signal for 2 minutes; cannot signal submerged; one lantern |
| Signal Lantern | Wondrous item; 3 charges; held item and action required; expend 1 charge; Marshlight signal for 1 minute; regain all charges at dawn; free color change; broken item cannot signal; amber meeting and blue safe route |
| Marshlight | Level 1 Illusion; Action casting; 30-foot range; V and S; 1-minute duration; one visible post within range; blue safe-route light; ends early if submerged; no damage |
| Introduction | SRD base and all three entries; separate Long Rest/dawn limits; original homebrew; manually resolved effects; no replacement system |

Intentional rules revisions: removed the custom Resolve attribute and watch-based use limit; gave the creature SRD-style statistics and a Staff attack; changed lantern glowstones to charges with dawn recovery; added spell casting metadata and aligned the lantern signal with the spell's 1-minute duration. These are original design choices, not quoted SRD rules or balance-certified statistics.

Formatting changes: headings, emphasis, exact entry links, and fact tables. Every table cell was compared with the new original source prose. Existing document IDs and section IDs were preserved. The introduction binds the homebrew source pack; it does not claim to reproduce SRD text.

## Limits

No copied third-party rules prose is included. The repository's MIT license covers the original additions and tools, not the SRD base. Preserve the notices attached to any actual SRD source you use.

The entries demonstrate readable content, not automated action pipelines, resource recovery, or sheet importers. No live campaign installation, browser rendering, encounter-balance assessment, or paid generation was performed. Local assembly and validation do not make a personal version campaign-installable.
