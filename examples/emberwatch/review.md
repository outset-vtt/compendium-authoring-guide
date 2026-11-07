# Emberwatch source and behavior review

Reviewed November 7, 2026. Source: [Emberwatch 0.2.0](source/pack.json).
The machine-readable [verification record](verification.json) binds the source
SHA-256 to the application revision used for isolated checks. It contains no
private actor, project, campaign, account or release identifiers.

## Source fidelity

The original October 24 pack supplied the four entries and their homebrew rules.
Names, numeric rules, costs, limits, equipment, references and descriptions are
preserved except for these explicit corrections:

- Wayfinder now encodes Cartographer's Tools proficiency under
  `structured.toolProficiencies`. Removed the obsolete parenthetical saying the
  authoring contract has no grant field. Starting equipment remains separate.
- Kindle Ward now explicitly requires `itemState: equippedAndAttuned`, matching
  its existing written restriction and separate passive AC gate.
- The brooch now declares a Neck equip placement so a player can satisfy that
  requirement. It does not start equipped or attuned.
- Pack version and original-content source labels move from 0.1.0 to 0.2.0.

The old audit fixture and private QA variants are not shipped. No copied SRD
rules text or complete system export is bundled. Existing source references keep
the SRD's identities and attribution. Creature CR and item rarity are provisional.

## Fresh compiler and engine verification

The exact public pack was checked against application revision
`258a4a4d73b362ef4b9d3da887a91d16e51b5d70` and its bundled SRD 5.2.1:

- Full SRD plus this pack compiled with zero diagnostics.
- Monster importer produced AC 15, HP 39, Strength modifier +3, Constitution
  save +4 and Perception +3. A d20 value of 10 gave attack 15; a d8 value of 4
  gave damage 7. Cinder Guard produced 5 Temporary HP, did not stack, and kept 8.
- Brooch AC was 12 at DEX 14 unless both equipped and attuned, when it was 13.
  All three invalid activation states were disabled. Valid use spent one charge
  and granted 5 Temporary HP; zero charges blocked use. Dawn restored three,
  while a Long Rest restored none.
- Character creation produced DEX 16, WIS 13, HP 12, Speed 35 ft. (including
  the numeric speed), Medium size, Darkvision 60 ft., both skills, Alert and
  Wisdom-based Fire Bolt (+3 attack / DC 11). Level 2 included another species
  HP bonus. The equipment quantities and background currency contribution passed.
- Cartographer's Tools proficiency survived JSON round-trip and normalization.
  Grant-only and equipment-only variants retained their independent behavior.

These checks used the actual application compiler, importer, creation model,
action/effect patch application and resource lifecycle. They did not merely
inspect JSON keys. The application engine is not distributed in this public repo;
creators can reproduce the supported user flow through the
[private-campaign checklist](../../guides/emberwatch.md#verify-in-a-private-campaign).
Portable repository tests do not substitute for that engine or gameplay review.

## Earlier live evidence and its limits

Private production acceptance on October 29 verified the same authored Brooch
state requirement in inventory and action-picker UI, valid charge spending,
nonstacking Temporary HP, zero-charge blocks, dawn recovery and passive AC gating.
The tested application revision was
`b4e94fb2d622e00ff7c602128fce89dcef3eeb51`. Isolated server preparation/commit checks
also rejected invalid canonical states and stale choices; no forged production
requests were sent.

October 27 character acceptance verified Emberkin's creation values, spell choice
and saved state. November 7 Player acceptance verified typed background tool
proficiency, independence from equipment, guided background replacement and reload
on `44d28e4af54b3fed6bc8004eaf549a0cda57f8da`. Those tests used private QA variants;
they are prior behavior evidence, not a new installation of this exact 0.2.0 pack.
This publication does not claim a fresh production test, deployment, or complete
visual-editor coverage.

## Remaining limitations

- **Alert initiative:** the fresh engine check yielded `1d20+3`, not the expected
  `1d20+5`. The feat is present; its proficiency bonus is not included. Inspect
  and correct the roll manually until verified fixed. Automatic initiative
  swapping was not tested.
- **Mixed class tool display:** an explicit Lute/Flute initial choice alongside
  a fixed class tool can leave “Choose one musical instrument” in the tool list.
  The November 7 Player check reproduced this; a correction was prepared but was
  not deployed/signoff evidence for this review. It does not prevent Wayfinder's
  typed grant. The public pack does not introduce that custom class.
- **Dawn receipt wording:** prior live checks saw an empty/no-change recovery
  message while the canonical charges correctly changed from zero to three.
  Verify the charge counter rather than relying only on receipt wording.
- **Source and UI:** arbitrary `data` keys do not become mechanics, and not every
  typed species field is guaranteed a visual control. Use validated Advanced
  JSON/Source for fields not exposed by the installed editor.
- **Table adjudication:** spear hits, critical dice and target damage application
  remain manual. No balance certification or full-system regression is claimed.

Recheck these boundaries against the installed application/base before claiming
that a limitation is resolved. The guide PR does not close application defects.
