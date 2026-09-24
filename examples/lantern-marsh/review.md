# Lantern Marsh SRD-base review

Reviewed 2026-09-24; structured monster update follows guide 0.2.0. This revision deliberately replaces the old standalone mini-system example with an additive homebrew pack for Outset's D&D SRD 5.2.1. Earlier example content remains in Git history; these changes are authored homebrew revisions, not formatting-only corrections.

## Source and compilation

- `source/pack.json` SHA-256: `b71c5c1852df9a749885a47503ac5fcfd3bb8c9a9f78e519271c53addcc3a6bc`
- `source/compiled-packs.json` SHA-256: `87acd454ecfa0eb0962bc7f848ebd09e555f521c18a6fefb44d89a78a62f5394`
- `source/introduction.md` SHA-256: `f4abdc6161cde59b8c129fd2fed5c47858b0602d43611b1e3c368ad433c0799b`

The pack targets canonical system `dnd-srd-5-2-1`. It was composed with Outset's built-in SRD 5.2.1 and compiled successfully. The saved snapshot contains only the compiled original homebrew pack; it omits SRD source and built-in packs. Reading bindings use the compiler's returned hashes. The portable validator consumes that snapshot and does not include the compiler.

## Reviewed changes and facts

| Entry | Facts preserved in its reading edition |
| --- | --- |
| Reed Warden | Medium Humanoid; Neutral; CR 1/8 (25 XP); proficiency +2; raised-path guardian; AC 12; HP 9 (2d8); Speed 30 feet; STR 10, DEX 14, CON 10, INT 10, WIS 12, CHA 10; Staff +2, reach 5 feet, one target, 3 (1d6) Bludgeoning; once per Long Rest action to signal for 2 minutes; cannot signal submerged; one lantern |
| Signal Lantern | Wondrous item; 3 charges; held item and action required; expend 1 charge; Marshlight signal for 1 minute; regain all charges at dawn; free color change; broken item cannot signal; amber meeting and blue safe route |
| Marshlight | Level 1 Illusion; Action casting; 30-foot range; V and S; 1-minute duration; one visible post within range; blue safe-route light; ends early if submerged; no damage |
| Introduction | SRD base and all three entries; separate Long Rest/dawn limits; original homebrew; structured Staff rolls and explicit manual effects; no replacement system |

Intentional rules revisions: removed the custom Resolve attribute and watch-based use limit; gave the creature SRD-style statistics and a Staff attack; changed lantern glowstones to charges with dawn recovery; added spell casting metadata and aligned the lantern signal with the spell's 1-minute duration. These are original design choices, not quoted SRD rules or balance-certified statistics.

Formatting changes: headings, emphasis, exact entry links, and fact tables. Every table cell was compared with the new original source prose. Existing document IDs and section IDs were preserved. The introduction binds the homebrew source pack; it does not claim to reproduce SRD text.

## Limits

No copied third-party rules prose is included. The repository's MIT license covers the original additions and tools, not the SRD base. Preserve the notices attached to any actual SRD source you use.

The Reed Warden now supplies every field required by the inherited SRD monster importer, with typed ability scores, AC, HP, save/skill inputs, and `sheetAbilities`. Staff has explicit action-v2 attack and damage pipelines; damage is a follow-up. Neutral alignment, CR 1/8 (25 XP), proficiency +2, and the 2d8 HP formula are authored additions. Existing attack and signal rules are preserved.

Checked against the actual SRD compiler and sheet importer: the entry produces a monster with AC 12, HP 9/9, and both abilities. Derived Strength modifier 0 and proficiency 2 yield an attack total of 12 for a d20 result of 10; damage is 4 for a d6 result of 4. Attack consumes Action timing; damage has no additional timing. Removing required HP data rejects the import. The resulting sheet passes the runtime schema.

Portable tests preserve structured source/snapshot agreement, compare the reading table with source statistics, and check the primary/follow-up and manual-trait boundaries. These checks are not a bundled rules compiler. Hit adjudication, HP damage application, critical-hit adjustments, safe-path use/recovery/light, item charge recovery, and spell effects remain manual. Equipment is not automatically attached. No live campaign installation, browser rendering, encounter-balance assessment, or paid generation was performed. Local assembly and validation do not make a personal version campaign-installable.
