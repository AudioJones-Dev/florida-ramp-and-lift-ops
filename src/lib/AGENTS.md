# Library Instructions

This subtree contains local helpers, mock data, navigation, role assumptions, and dashboard intelligence.

## Data Rules

- `mock-data.ts` is fixture/demo data, not persistence.
- Do not add real customer data, private rates, secrets, signed PDFs, or production identifiers.
- Preserve stable mock IDs unless a scoped mock-data update requires otherwise.
- Do not create API clients, SDK wrappers, storage adapters, or email/SMS helpers without explicit approval.

## Logic Rules

- Prefer explicit state fields over display-text parsing.
- Keep role and navigation changes aligned with `docs/schemas/role-permission-matrix.md` and `docs/architecture/saas-portal-access-model.md`.
- Keep dashboard and queue logic aligned with `docs/schemas/operational-state-machine.md`.
- Any future data-access layer must wait for accepted persistence design and a dedicated implementation branch.
