# Validator provenance

`rulesPublication.mjs` and `rulesPublicationBook.mjs` contain the passive publication parser and book validator adapted from Outset's application parser on 2026-09-24. TypeScript annotations and application-only helpers were removed; publication parsing and validation semantics were retained for wire format 0.0.1. They are distributed under this repository's MIT license.

The surrounding CLI validates a supplied compiled-pack snapshot and corpus-wide invariants. It deliberately does not include the application, rules compiler, authentication, campaign storage, or installation services.

When updating these files, compare behavior against the current Outset publication contract and extend the failure-case tests. Keep format versions explicit. Do not add a permissive parser workaround solely to make one source conversion pass. Changes here do not automatically update the application parser, and changes to the application parser do not update this copy.
