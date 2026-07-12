# Implementation Readiness Gate

Status: Historical source gate; runtime progression superseded 2026-07-12
Owner: AJ Digital LLC / Audio Jones
Repo: `AudioJones-Dev/florida-ramp-and-lift-ops`
Scope: Preserved mock-scaffold implementation-readiness source material
Runtime impact: None
Implementation status: Historical/non-executable under the source-repo freeze
Last updated: 2026-07-12

> Current repository posture is controlled by
> [`../governance/SOURCE_REPO_FREEZE.md`](../governance/SOURCE_REPO_FREEZE.md).
> Satisfying any gate below cannot authorize runtime work in this repository.
> Useful criteria must be reconciled into a separately approved specification in
> `AudioJones-Dev/FRL-CONTRACTOR-PORTAL`.

## 1. Purpose

This document preserves the checkpoint formerly intended to govern movement
from the mock/manual scaffold into a new implementation phase. That progression
is now frozen in this repository.

The repo currently has a mock/manual Next.js MVP scaffold and an approved Clerk user-auth shell recorded in `docs/architecture/auth-foundation.md`. This gate prevents premature persistence, live integrations, secret sprawl, Firebase drift, production auth configuration, and implementation work before the operating model is stable.

## 2. Implementation Readiness Doctrine

- Architecture must be stable before implementation starts.
- Manual/mock workflows must exist before live integrations.
- Source-of-truth boundaries must be explicit before sync logic.
- Role and object access must be defined before production auth configuration or live record access.
- State transitions and events must be defined before workflow automation.
- Human approval gates must be explicit before financial, dispatch, client-facing, or safety-sensitive workflows.
- Cost-control policy must exist before runtime AI/API usage.
- GitHub remains the execution/spec system.
- Obsidian remains the business memory/decision system.
- No new implementation phase is ready until the go/no-go checklist for that phase is satisfied.

## 3. Required Pre-Implementation Artifacts

These artifacts must exist and be reviewed before new implementation phases:

| Artifact | Path | Required Status |
|---|---|---|
| Central Control Dashboard PRD | `docs/prds/central-control-dashboard-prd.md` | Draft accepted for MVP scope. |
| SaaS portal/access model | `docs/architecture/saas-portal-access-model.md` | Defines one-app portal model. |
| AI stack/cost-control policy | `docs/architecture/ai-stack-and-cost-control.md` | Defines model/API/cost gates. |
| Canonical data schema | `docs/schemas/canonical-data-schema.md` | Defines operating ontology. |
| Operational state machine | `docs/schemas/operational-state-machine.md` | Defines object motion and gates. |
| Event-driven architecture | `docs/architecture/event-driven-architecture.md` | Defines event layer and consumers. |
| Role/permission matrix | `docs/schemas/role-permission-matrix.md` | Defines access model. |
| HubSpot CRM integration model | `docs/architecture/hubspot-crm-integration-model.md` | Defines CRM boundary. |
| Worksie integration strategy | `docs/architecture/worksie-integration-strategy.md` | Defines embedded module boundary. |

Implementation beyond the current mock/manual scaffold is blocked if any required artifact is missing, materially contradictory, or not reviewed.

## 4. Product Scope Gate

MVP implementation must serve:

- Michael Keegan.
- Audio Jones / AJ Digital as Support Admin.
- Office/Admin users.
- Dispatch users.
- Contractors/installers.

MVP must not optimize first for client portal access.

MVP product shape:

```txt
FLR Operational Intelligence Platform
  -> Internal Command Center
  -> Role-aware dashboard shell
  -> Manual core object entry
  -> Manual/mock workflows
  -> Contractor portal MVP
  -> Internal approval queues
```

Implementation is blocked if the MVP scope expands to full CRM replacement, full accounting replacement, standalone Worksie OS, client portal first, or production AI automation first.

## 5. Source-Of-Truth Boundary Gate

The following source-of-truth boundaries must be preserved:

| Area | Source Of Truth |
|---|---|
| CRM intake and sales visibility | HubSpot |
| Final accounting ledger | QuickBooks |
| Operational intelligence | FLR Platform |
| Business memory and rationale | Obsidian |
| Specs, architecture, workflows, code | GitHub |
| Photos/PDFs/job docs future runtime | Approved storage provider, not GitHub |

Implementation is blocked if the app design makes HubSpot the dispatch engine, QuickBooks the job-management system, or FLR the final accounting ledger.

## 6. Data Model Gate

The implementation must align to `docs/schemas/canonical-data-schema.md`.

Required canonical objects:

- Organization.
- User.
- Role.
- Customer.
- Location.
- Communication.
- Lead.
- Job.
- WorkOrder.
- DispatchAssignment.
- Contractor.
- Equipment.
- DocumentationArtifact.
- Invoice.
- ContractorPayout.
- Alert.
- Task.
- Approval.
- AuditLog.

Implementation is blocked if database tables, API routes, UI views, or integrations introduce competing names or duplicate meanings without an approved schema reconciliation.

## 7. State Machine Gate

The implementation must align to `docs/schemas/operational-state-machine.md`.

State transitions must drive:

- Dashboard queues.
- Agent triggers.
- Alerts.
- Approvals.
- Audit logs.
- Manual/mock workflows.
- Future integrations.

Implementation is blocked if workflows are modeled only as CRUD screens without state transitions, events, approval records, or audit trail.

## 8. Event Architecture Gate

The implementation must align to `docs/architecture/event-driven-architecture.md`.

Required event behavior:

- Business events use past-tense names.
- Events include source object, actor, timestamp, idempotency key, and relationship to approval/audit where needed.
- Agents listen to events; agents do not own final authority.
- Dashboard read models consume source state/events; dashboards do not invent state.
- Retry and failure behavior must be visible.

Implementation is blocked if live automation or agent workflows are introduced before event semantics and idempotency rules are respected.

## 9. Role And Access Gate

The implementation must align to `docs/schemas/role-permission-matrix.md` and `docs/architecture/saas-portal-access-model.md`.

Canonical MVP roles:

- `owner`
- `support_admin`
- `office_admin`
- `dispatcher`
- `finance`
- `lead_installer`
- `contractor`
- `client`
- `ai_agent`

Access model:

- Role controls permitted actions.
- Object ownership controls visible records.
- Contractor sees assigned Jobs and released payout status only.
- Client access is later and limited to released customer-facing records.
- AI Agent role is restricted and cannot approve sensitive actions.

Implementation is blocked if production auth configuration or live record access proceeds without role-aware routing and object-level access design. The current Clerk shell is an approved scaffold only; it is not production authorization.

## 10. HubSpot Boundary Gate

The implementation must align to `docs/architecture/hubspot-crm-integration-model.md`.

HubSpot owns:

- Contacts.
- Companies.
- Deals/opportunities.
- Lead pipeline visibility.
- Sales follow-up.
- CRM notes and communication history.
- Basic tasks.
- Intake visibility.

FLR may mirror/reference HubSpot data later, but manual/mock FLR workflows must exist first.

Implementation is blocked if live HubSpot sync is built before manual FLR object entry and handoff workflows exist.

## 11. QuickBooks Boundary Gate

QuickBooks owns:

- Final invoice record.
- Payments.
- Accounting ledger.
- Revenue reports.
- Tax/accounting data.
- Customer financial history.

FLR owns invoice readiness and approval workflow, not final accounting truth.

Implementation is blocked if QuickBooks integration is attempted before manual invoice readiness, approval queue, and Michael approval flow exist in FLR.

## 12. Worksie Module Boundary Gate

The implementation must align to `docs/architecture/worksie-integration-strategy.md`.

Worksie concepts are embedded FLR modules for MVP:

- Job Management.
- Project Progress.
- Contractor / Vendor Management.
- Documentation Review.
- Invoice Readiness.
- Contractor Payouts.
- Alerts / Approvals.
- Executive Dashboard.

Implementation is blocked if a separate Worksie OS, new repo, or standalone product shell is created for Florida Ramp & Lift MVP.

## 13. ResponseOS Pilot Boundary Gate

ResponseOS is a future intake/voice pilot boundary.

ResponseOS may later assist with:

- Missed-call handling.
- AI receptionist pilot.
- Intake summary.
- Follow-up draft.
- Communication classification.
- Lead handoff support.

ResponseOS must not:

- Become CRM source of truth.
- Become Job source of truth.
- Approve invoices.
- Dispatch contractors.
- Modify QuickBooks.
- Override FLR alerts, approvals, or audit logs.

Implementation is blocked if ResponseOS integration starts before manual/mock communication and lead intake workflows exist.

## 14. AI Stack And Cost-Control Gate

The implementation must align to `docs/architecture/ai-stack-and-cost-control.md`.

Policy:

- Subscriptions build the system.
- APIs run the system.
- Local models absorb repetitive low-risk work.
- Humans approve anything financial, legal, safety-sensitive, or client-facing.

Runtime AI/API workflows must define:

- Workflow owner.
- Trigger.
- Model tier.
- Expected volume.
- Budget threshold.
- Fallback.
- Human approval gate.
- Audit/logging plan.

Implementation is blocked if runtime AI calls are added before cost-control, logging, fallback, and approval gates are defined.

## 15. Secrets And Environment Policy Gate

No secrets may be committed to the repo.

Before implementation:

- Secrets owner must be defined.
- Environment policy must be documented.
- Doppler or approved secret manager path must be selected.
- `.env.example` may contain placeholder keys only.
- Local `.env*` files must be ignored.
- No API keys, tokens, customer files, private rate sheets, signed PDFs, or credentials may be committed.

Implementation is blocked if app scaffolding requires real secrets before the environment policy is approved.

## 16. No-Firebase Enforcement

Firebase is explicitly out of scope.

Do not introduce:

- Firebase SDKs.
- Firebase Auth.
- Firestore.
- Firebase Storage.
- Firebase Functions.
- Firebase config files.
- Firebase environment variables.

Implementation is blocked if Firebase appears in package dependencies, config, docs as an approved runtime, or generated app scaffolding.

## 17. Mock / Manual-First Workflow Requirement

Manual/mock workflows must exist before live integrations.

Required first:

- Manual Customer entry.
- Manual Location entry.
- Manual Communication record entry.
- Manual Lead entry.
- Manual Job entry.
- Manual WorkOrder entry/reference.
- Manual DispatchAssignment draft.
- Manual DocumentationArtifact status.
- Manual Invoice readiness record.
- Manual ContractorPayout draft/status.
- Manual Alert creation/status.
- Manual Approval request/decision.

Only after manual/mock workflows are validated should the team consider:

- HubSpot sync.
- QuickBooks sync.
- ResponseOS integration.
- Twilio/Resend events.
- AI automation.
- n8n workflows.

## 18. MVP Implementation Sequence

Approved implementation sequence:

1. App scaffold.
2. Auth shell.
3. Role-aware dashboard shell.
4. Manual data entry for core objects.
5. Manual/mock workflows.
6. Dashboard cards.
7. Contractor portal MVP.
8. Internal approval queues.
9. HubSpot sync later.
10. QuickBooks sync later.
11. ResponseOS pilot integration later.
12. AI automation later.

Do not skip manual/mock workflows to reach live integrations faster.

## 19. Human Approval Gates

Human approval is required before:

- Client-facing invoice release.
- Contractor payout approval/release.
- Dispatch instruction external send.
- Customer/client/contractor communication send.
- Job submitted -> approved.
- Documentation approval for billing/safety evidence.
- Safety exception dismissal.
- Financial adjustment, rate override, split override, or surcharge change.
- Critical Alert dismissal/resolution.
- HubSpot-to-FLR handoff when required data is incomplete.
- FLR-to-QuickBooks invoice creation in MVP/manual phase.
- Live CRM/accounting writeback.
- Any action involving secrets, credentials, or sensitive documents.

MVP decision: Michael Keegan has final approval authority for client-facing invoice release.

## 20. Non-Goals

This document does not authorize:

- New app code beyond the approved mock/manual MVP scaffold.
- Replacement Next.js scaffolding.
- Production auth setup.
- Clerk production configuration, organizations, invitations, real-user creation, or secret handling.
- Supabase/Neon setup.
- Database migrations.
- HubSpot integration.
- QuickBooks integration.
- ResponseOS integration.
- Twilio/Resend setup.
- n8n workflows.
- Runtime AI calls.
- Secret creation.
- Firebase.
- New repositories.
- Standalone Worksie OS.
- Client portal first.
- Live third-party automation before manual/mock workflows.

## 21. Acceptance Criteria

This readiness gate is accepted when:

- It defines pre-implementation artifacts.
- It defines product scope boundaries.
- It preserves HubSpot, QuickBooks, FLR, GitHub, and Obsidian source-of-truth boundaries.
- It requires canonical data model, state machine, event architecture, role/access, and cost-control alignment.
- It enforces no secrets in repo.
- It enforces no Firebase.
- It requires manual/mock workflows before live integrations.
- It defines the approved MVP implementation sequence.
- It preserves Michael Keegan's MVP invoice-release authority.
- It does not add app code, runtime setup, integrations, secrets, or Firebase.
- It recognizes the approved mock/manual scaffold and Clerk auth shell as the current baseline without authorizing production auth, persistence, integrations, secrets, or deploys.

## 22. Go / No-Go Checklist

Do not mark a new implementation phase ready unless every required item below is checked or explicitly scoped as already satisfied by the current mock/manual scaffold.

### Architecture

- [ ] Dashboard PRD reviewed.
- [ ] SaaS portal/access model reviewed.
- [ ] Canonical data schema reviewed.
- [ ] Operational state machine reviewed.
- [ ] Event-driven architecture reviewed.
- [ ] Role-permission matrix reviewed.
- [ ] HubSpot CRM integration model reviewed.
- [ ] QuickBooks boundary accepted.
- [ ] Worksie embedded-module strategy accepted.
- [ ] ResponseOS pilot boundary accepted.
- [ ] AI stack/cost-control policy reviewed.

### Product Scope

- [ ] MVP users confirmed: Michael, Support Admin, Office/Admin, Dispatcher, Contractors.
- [ ] Client portal deferred.
- [ ] Standalone Worksie OS rejected for MVP.
- [ ] HubSpot remains CRM layer.
- [ ] QuickBooks remains accounting ledger.
- [ ] FLR remains operational source of truth.

### Implementation Preconditions

- [ ] Manual/mock workflow plan approved.
- [ ] Auth roles mapped to role-permission matrix.
- [ ] Object-level access rules approved.
- [ ] Core manual-entry objects selected for first build.
- [ ] Approval queue requirements confirmed.
- [ ] Dashboard card MVP confirmed.
- [ ] Contractor portal MVP scope confirmed.

### Safety / Security

- [ ] No Firebase dependency or config planned.
- [ ] Secret-management approach approved.
- [ ] `.env.example` placeholder-only policy accepted.
- [ ] No real customer files in repo.
- [ ] No private rate sheets in repo.
- [ ] No live third-party integrations before manual/mock workflows.

### Current Baseline Reconciliation

- [x] Mock/manual Next.js MVP scaffold exists.
- [x] Clerk user-auth shell exists as an approved scaffold.
- [ ] Phase 2 closure criteria formally accepted.
- [ ] Production Clerk configuration approved.
- [ ] Object-level authorization approved.
- [ ] Persistence implementation approved.

### Go / No-Go Decision

- [ ] Go: all gates satisfied for the next explicitly scoped implementation phase.
- [ ] No-go: one or more gates unresolved; continue docs/spec work.
