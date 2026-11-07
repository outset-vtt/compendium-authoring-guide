# First-use verification: November 7, 2026

This record covers the 0.3.1 guide and skill release candidate. It is **not a complete end-to-end pass**. Testing used a fresh private production campaign and an existing authenticated account; it did not repeat account registration or OAuth consent.

## Results

| Stage | Result | Evidence and limit |
| --- | --- | --- |
| Package the plugin and four individual skills | Passed | Archive integration checks cover contents, references, licenses, checksums, repeatability, stale-output removal and preservation of previous output after a failed build |
| Discover extracted skills in Codex | Passed | All four individual ZIPs were extracted into a temporary project's `.agents/skills`; Codex app-server `skills/list` reported all four enabled with repo scope on `codex-cli 0.167.0-alpha.3.2` |
| Claude/Cowork upload; Codex plugin bundle installation | Not run | Archive inspection is not a host installation test |
| Read authenticated Outset campaigns and roles | Passed | Existing MCP connection returned accessible campaigns, including the new private campaign with DM membership |
| Fresh account and fresh OAuth authorization | Not run | Existing authorized sessions were reused |
| Add source, save and validate | Passed | The exact public Lantern Marsh pack was added to a fresh extension's `compendiumPacks`; server validation reported no issues |
| Publish a private release | Passed | Version 0.1.0 was published within the test campaign |
| Install the release | Failed | Confirmation returned “Installed rules do not match the pinned revision.” A fresh preview and one retry produced the same error |
| Create Reed Warden, run Staff rolls and reload | Blocked | Not attempted because installation did not succeed |

Codex discovery did not invoke a model or execute a skill. None of these checks establishes Claude host compatibility or fresh OAuth success.

## Production reproduction

Both production web and realtime images identified revision `64851f79fb72ab29f91a05f63306ea8bbb02fd7e`; web reported 2/2 ready and realtime 3/3 ready when checked.

Follow the [quickstart](quickstart.md) through publication. The test created a rules project using **Adopt the campaign's installed rules snapshot**, preserved its base provenance and existing packs, and added the original [Lantern Marsh pack](../examples/lantern-marsh/source/pack.json). The adopted source was large because it included the existing SRD packs.

The source pack SHA-256 was `b71c5c1852df9a749885a47503ac5fcfd3bb8c9a9f78e519271c53addcc3a6bc`.

The install preview allowed confirmation and returned no warnings or diagnostics, but installation failed. A fresh read-only preview still returned `canInstall: true`. Both its current and target revisions were `rules-109bb5ab008999e8`. The cause has not been established; the preview's success must not be treated as proof that the release installed.

## What remains

Fix the production installation failure, then repeat installation in a private campaign and verify Reed Warden's AC 12, HP 9/9, Speed 30 feet, Staff Attack `1d20+2`, Staff Damage `1d6` Bludgeoning, and persistence after reload. Separately exercise fresh OAuth and each advertised host installation flow before claiming full onboarding coverage.

The private reproduction campaign was retained. No original releases or existing campaign/character data were changed, and no paid generation was started. Private campaign identifiers and screenshots are deliberately excluded from this public record.
