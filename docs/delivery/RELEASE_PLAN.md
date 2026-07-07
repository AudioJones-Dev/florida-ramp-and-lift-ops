# Release Plan

Status: Git Spec-ready draft
Scope: Delivery path for FRL documentation, MVP scaffolding, and future runtime releases
Runtime impact: None
Implementation status: Documentation only

## Purpose

This plan defines safe release sequencing for the Florida Ramp & Lift platform.

## Current Release State

The repo is documentation-first. No production app release is authorized by this document.

## Release Phases

| Phase | Goal | Exit criteria |
|---|---|---|
| Phase 1 | Documentation foundation | Source docs, schemas, SOPs, workflows, governance, and readiness gates exist. |
| Phase 2 | Manual/mock MVP scaffold | Role-aware shell, manual records, queues, and review flows exist without live integrations. |
| Phase 3 | Controlled persistence | Approved auth/database/storage model, migrations, RLS, audit, and rollback plan. |
| Phase 4 | Controlled integrations | HubSpot, QuickBooks, email/SMS, PDF, storage, or AI added one at a time with human gates. |
| Phase 5 | Production hardening | Monitoring, incident response, backup, access review, and release checklist accepted. |

## Release Gates

Before any production release:

- Implementation readiness gate is satisfied.
- DoR, DoD, and DoS are satisfied.
- Security and failure modes are reviewed.
- Role and object permissions are validated.
- No secrets or customer-sensitive files are present.
- Rollback plan is documented.

## Does Not Authorize

This plan does not authorize deploys, live provider configuration, migrations, secrets, or production integrations.
