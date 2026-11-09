# Authoring guide 0.4.0 (unreleased)

- Replace the Emberwatch and Lantern Marsh examples with Barrowdale, one traditionally themed set of twelve entries: a Goblin Raider, a legendary Barrow Wight, the Hill Folk species, the Dale Guide background, an Amulet of Warding, a Boar Spear, Barrow Mail, a Healing Draught, the Keen Watcher feat and the spells Flame Dart, Winter's Breath and Hearth Blessing. Every mechanic the previous sets exercised is still exercised, under names a homebrewer recognizes before reading a field.
- Make the Markdown templates the source: the JSON pack is their exact Import Markdown output, the compiled snapshot is that pack compiled, and the reading editions bind to it. A test checks each binding.
- Rewrite the quickstart around importing one Markdown file, with the JSON route as the alternative, and rewrite the walkthrough for all twelve entries with one gameplay checklist.
- Record the engine checks for the exact files at application revision `b6829c32b` and say plainly that Barrowdale has not yet been rerun on production. Remove the stale claim that the first-use check found an installation blocker; the November 8 rerun passed.

# Authoring guide 0.3.1

- Correct the quickstart's production navigation, project creation, snapshot adoption, JSON source, validation and publication instructions.
- Record the actual first-use results, including the production installation blocker. Saving, server validation and private publication passed; installation failed, so monster creation, rolls and reload checks remain blocked.
- Add a release workflow that validates the exact dispatch commit before publishing its version tag. Existing version tags are never replaced.
- Pin the optional local checkout to this guide version. Outset Creator 0.3.1 links to this matching guide tag.

See [the first-use verification record](https://github.com/outset-vtt/compendium-authoring-guide/blob/v0.3.1/guides/first-use-verification.md) for evidence and untested host/OAuth steps. Local checks do not establish live gameplay correctness.
