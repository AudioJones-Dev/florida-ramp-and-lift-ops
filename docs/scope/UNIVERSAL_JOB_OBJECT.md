# UNIVERSAL JOB OBJECT

## Canonical requirement

All current and future automations must derive from the canonical job schema at `schemas/job.schema.json`.

## Required top-level domains

- `client`
- `site`
- `work_order`
- `asset`
- `scope`
- `labor`
- `equipment`
- `safety`
- `billing`
- `completion`

## Design rules

- Explicit, typed fields
- Deterministic mapping from source documents
- Audit-friendly source references
- Operationally useful defaults without hidden behavior

## Safety baseline

Required PPE baseline currently includes:

- steel-toed boots
- safety glasses
- gloves

Schema and workflows must remain extensible for future checklists, hazards, onboarding, and readiness verification.
