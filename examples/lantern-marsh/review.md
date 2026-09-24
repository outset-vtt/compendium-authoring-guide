# Lantern Marsh source review

Reviewed 2026-09-24 for this initial public example. The source prose is original Outset VTT material under the MIT license; no external rules book was converted.

## Frozen witnesses

- `source/bundle.json` SHA-256: `42e0fee34ebc98e0d54aa94d64317732880bda19a6e11b2d1b4a8d041df3be31`
- `source/compiled-packs.json` SHA-256: `512360a9fc778f6f12067660ccc12efa9526503d833c0f74d6420604f5377609`
- `source/introduction.md` SHA-256: `1576067eb59d751f7c74a7ca00d4501156140cc0ce56dd2aa07633a89138f800`

The source bundle successfully compiled with Outset's rules compiler before this snapshot was saved. The compiler-generated pack and entry hashes were copied into the reading bindings, not invented. The public repository does not include that compiler; its portable validator reads the frozen snapshot.

## Fact review

| Document | Facts retained |
| --- | --- |
| Reed Warden | Raised-path guardian; 4 Resolve; once per watch; safe path for 2 minutes; unavailable while submerged; exactly one lantern |
| Signal Lantern | Capacity 3; spend 1; Marshlight signal for 2 minutes; refill to 3 only after a night at a dry camp; free color change; broken lantern cannot signal; amber meeting and blue safe route |
| Marshlight | Level 1; one visible post; within 30 feet; blue safe-route light for 2 minutes; submersion ends it early; no damage |
| Introduction | Safe-path context; dry-camp rest; entry-specific limits; all three references; original example and prose-only automation boundary |

Presentation changes: added headings, emphasis, exact compendium links, a two-row signal table, and an explicit related-spell list. The table is derived from the lantern's two source color clauses; it is an editorial presentation choice, not a claim that the source contains a printed table. Added heading labels organize the prose without adding mechanics.

Source corrections: none. Unresolved source contradictions: none identified. The Warden's once-per-watch ability and the lantern's glowstone spending are separate source rules; the reading edition does not combine their limits.

## Verification limits

The public validator checks all four documents and the book against the snapshot. It cannot establish that prose preserves a rule; the inventory above records that review. Automated effects, sheet importers, application rendering, live installation, and paid MCP generation are outside this example. A readable `monster` or `spell` entry is not a fully wired actor or casting implementation.
