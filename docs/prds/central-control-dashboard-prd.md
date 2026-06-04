# Centralized Control Dashboard PRD

Status: Placeholder

## Problem

Florida Ramp & Lift needs one control surface that connects executive visibility, operational execution, and financial review without collapsing the distinct responsibilities of each system.

## Desired Outcome

Define a Centralized Control Dashboard that rolls up FLR Executive OS, FLR Operations OS, and FLR Financial OS into one reviewable operating surface.

## Success Criteria

- Dashboard domains are defined.
- Required dashboard cards, tables, alerts, and drilldowns are identified.
- Source schemas are mapped.
- Human approval gates are visible.
- No live integrations are assumed.

## Scope

- Executive rollups
- Operational status
- Dispatch and job exceptions
- Invoice and billing review status
- Safety and documentation compliance

## Out of Scope

- Live app implementation
- CRM integration
- Email, SMS, or AI automation
- Automated approvals

## Constraints

- Docs-first architecture.
- No Firebase.
- No secrets.
- Existing Phase 1 scope, automation, SOP, and schema docs must be preserved.

## Existing Assets To Inspect

- `PROJECT_SOURCE.md`
- `docs/scope/UNIVERSAL_JOB_OBJECT.md`
- `docs/scope/DATA_DICTIONARY.md`
- `docs/automation/DISPATCH_SUMMARY_SPEC.md`
- `docs/automation/BILLING_EXTRACTION_SPEC.md`
- `schemas/job.schema.json`
- `schemas/invoice.schema.json`

## Open Questions

- What dashboard views are required for day-one operator use?
- Which metrics are executive-only, operations-only, or financial-only?
- What state changes require explicit human approval?
