# Definition Of Ready

Status: Git Spec-ready draft
Scope: Readiness rules for FRL documentation, planning, and future implementation work
Runtime impact: None
Implementation status: Documentation only

## Purpose

This document defines when a Florida Ramp & Lift task is ready to enter implementation planning or coding.

Ready does not mean approved for production. It means the work has enough context, boundaries, and evidence to be safely scoped.

## Ready For Documentation Work

A documentation task is ready when:

- The affected domain is known: strategy, architecture, schema, workflow, SOP, governance, delivery, execution, or reference.
- The nearest source of truth has been identified.
- The task states whether it updates accepted scope or creates a draft.
- The change does not silently authorize live integrations, secrets, external communication, invoice release, payout release, or runtime AI.
- The branch objective allows documentation changes.

## Ready For App Or Runtime Work

Runtime implementation is not ready until `docs/architecture/implementation-readiness-gate.md` is satisfied.

At minimum, future implementation work must identify:

- User persona and role from `docs/architecture/mvp-definition.md`.
- Canonical object from `docs/schemas/canonical-data-schema.md`.
- State transition from `docs/schemas/operational-state-machine.md`.
- Permission boundary from `docs/schemas/role-permission-matrix.md`.
- Human approval gate for safety, dispatch, billing, payout, client-facing communication, and client invoice release.
- Source-of-truth boundary for HubSpot, QuickBooks, Obsidian, GitHub, and future storage.

## Not Ready Conditions

Work is not ready if:

- It introduces Firebase.
- It requires secrets before the environment policy is approved.
- It depends on live HubSpot, QuickBooks, SMS, email, storage, PDF, or AI runtime behavior not authorized by a specific implementation branch.
- It treats mock data as production truth.
- It bypasses Michael Keegan final MVP authority for client-facing invoice release.
- It creates a competing object name or state model without schema reconciliation.
- It lacks rollback or manual fallback for operationally sensitive behavior.

## Required Human Approval

Operator approval is required before:

- Creating migrations, buckets, API clients, or environment files.
- Adding live auth, database, storage, email/SMS, HubSpot, QuickBooks, ResponseOS, PDF, or AI runtime code.
- Deleting files or overwriting accepted docs.
- Releasing any client-facing invoice, payout, dispatch, safety, or external communication automation.

## Acceptance Criteria

A task is ready only when the reviewer can answer:

1. What business problem does this solve for Florida Ramp & Lift?
2. Which current doc is the source of truth?
3. Which roles and objects does it touch?
4. What is explicitly out of scope?
5. What approval gate prevents unsafe production behavior?
