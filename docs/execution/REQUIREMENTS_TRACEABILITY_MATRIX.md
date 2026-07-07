# Requirements Traceability Matrix

Status: Git Spec-ready draft
Scope: Traceability from FRL business needs to docs, future implementation, and validation
Runtime impact: None
Implementation status: Documentation only

## Purpose

This matrix connects core Florida Ramp & Lift requirements to source docs and future validation paths.

## Matrix

| Requirement | Source doc | Future implementation surface | Validation evidence |
|---|---|---|---|
| Contractors report what happened on the job without doing billing math. | `PROJECT_SOURCE.md` | Contractor portal, job completion flow | Contractor can submit job facts; system calculates only after approved rules. |
| WillScot PDF intake becomes structured operational data. | `PROJECT_SOURCE.md`, `docs/automation/PDF_INTAKE_PARSER_SPEC.md` | Intake parser, admin review queue | Extracted work order fields match canonical schema and require review. |
| Dashboard shows operational health without inventing state. | `docs/prds/central-control-dashboard-prd.md` | Central control dashboard | Every card traces to canonical object state. |
| Client-facing invoice release requires Michael approval. | `docs/architecture/mvp-definition.md`, `docs/schemas/role-permission-matrix.md` | Invoice readiness and approval queue | Release action is blocked without explicit approval record. |
| Contractor payouts stay separate from client invoices. | `docs/schemas/canonical-data-schema.md` | Invoice and payout modules | Contractor payout fields never appear on client invoice output. |
| Manual/mock workflows exist before live integrations. | `docs/architecture/implementation-readiness-gate.md` | MVP app shell and admin workflows | Live HubSpot, QuickBooks, SMS/email, storage, PDF, and AI paths remain disabled until approved. |
| Role and object-level permissions control access. | `docs/schemas/role-permission-matrix.md` | Auth and route guards | Contractor sees assigned jobs only; client sees released records only. |
| Safety and PPE expectations are visible before field completion. | `docs/sop/SAFETY_REQUIREMENTS_SOP.md`, `prompts/safety/generate-job-safety-checklist.prompt.md` | Dispatch and safety checklist views | Safety checklist exists before completion submission. |
| No Firebase implementation path exists. | `AGENTS.md`, `docs/architecture/implementation-readiness-gate.md` | Dependency/config review | No Firebase package, config, env name, or runtime path is present. |
| Future agents prepare work but do not approve sensitive actions. | `docs/agents/agent-registry.md`, `docs/schemas/role-permission-matrix.md` | Agent event consumers, draft queues | Agent outputs require human approval for sensitive actions. |

## Maintenance Rule

When a new PRD requirement or implementation branch is added, add a row here before coding begins.
