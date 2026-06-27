# Machine Schema Instructions

Root `schemas/` contains machine-readable JSON Schemas that mirror the canonical operational entities.

## Edit Rules

- Keep schema changes aligned with `docs/schemas/canonical-data-schema.md`, `docs/schemas/operational-state-machine.md`, and `docs/architecture/persistence-design.md`.
- Do not rename fields casually; field names become integration contracts.
- Do not add production-only storage, auth, or third-party fields unless the relevant architecture doc authorizes them.
- Maintain JSON validity and prefer explicit enums for lifecycle fields.
- If a schema change affects prompts, workflows, or source types, update those docs in the same branch.

## Safety

Schemas may describe storage URLs, external IDs, or future integration references, but must not contain real values, credentials, customer documents, or private client data.
