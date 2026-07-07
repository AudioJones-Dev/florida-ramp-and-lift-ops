# Dependency Map

Status: Git Spec-ready draft
Scope: Conceptual dependency map for FRL docs and future implementation
Runtime impact: None
Implementation status: Documentation only

## Purpose

This map identifies the main dependency relationships that future implementation must respect.

## Documentation Dependencies

| Dependent area | Depends on |
|---|---|
| MVP implementation | `docs/architecture/implementation-readiness-gate.md` |
| Dashboard views | `docs/prds/central-control-dashboard-prd.md`, canonical schema, state machine |
| Contractor portal | MVP definition, role matrix, job schema, documentation SOPs |
| Invoice readiness | Invoice schema, job state, work order evidence, approval rules |
| Contractor payout | Contractor records, job totals, split rules, finance review |
| Client invoice | Work order evidence, client rate rules, Michael approval |
| Agents | Agent registry, guardrails, event architecture, approval rules |

## External System Boundaries

| System | Boundary |
|---|---|
| HubSpot | Future CRM intake and sales visibility; not dispatch or accounting source of truth. |
| QuickBooks | Future final accounting ledger; not job-management source of truth. |
| ResponseOS | Future communication/lead intelligence boundary; not approved runtime dependency yet. |
| Storage provider | Future photos/PDFs; not GitHub and not approved yet. |
| Email/SMS provider | Future sends only after human approval gates and provider setup. |
| AI provider | Future drafting/summarization only after cost-control and logging policy. |

## Implementation Dependency Order

1. Documentation gates.
2. Canonical objects and state machine.
3. Role and object permission model.
4. Manual/mock app shell.
5. Persistence and audit.
6. Storage policy.
7. Provider integrations.
8. Runtime agents.
