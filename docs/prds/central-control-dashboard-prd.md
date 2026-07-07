# Centralized Control Dashboard PRD

Status: Draft PRD
Owner: AJ Digital LLC / Audio Jones
Repo: `AudioJones-Dev/florida-ramp-and-lift-ops`
Product: Florida Ramp & Lift Operational Intelligence Platform
Primary surface: Centralized Control Dashboard
Related domains: FLR Executive OS, FLR Operations OS, FLR Financial OS

## 1. Product Purpose

The Centralized Control Dashboard is the executive command center for Florida Ramp & Lift. It ties together operational execution, contractor coordination, safety compliance, communications review, invoice review, and executive reporting without collapsing those responsibilities into one unsafe automation layer.

The dashboard is not the source of truth by itself. It is the review and control surface that reads from approved operational records, highlights exceptions, routes work to human review, and prepares future automations for controlled execution.

The dashboard must answer five operator questions quickly:

1. What work is scheduled, active, submitted, blocked, approved, invoiced, or paid?
2. What needs human review before the business can move forward?
3. Where are jobs, invoices, documentation, safety records, or communications incomplete?
4. What should leadership know today about revenue, workload, risk, and exceptions?
5. Which future agent or automation may prepare work, while still requiring human approval before action?

## 2. Primary Users

| User | Role | Primary Needs |
|---|---|---|
| Owner / Executive | Leadership and final decision authority | See business health, revenue status, operational risk, blocked work, and review queues. |
| Operations Admin | Day-to-day operational controller | Review intake, dispatch readiness, job state, crew assignment, completion evidence, exceptions, and communication drafts. |
| Financial Reviewer | Invoice and payout control | Review contractor billing, client invoice readiness, financial exceptions, rate/split anomalies, and approval status. |
| Safety / Compliance Reviewer | Field safety and documentation control | Confirm PPE, job-specific hazards, required photos, signatures, safety exceptions, and missing records. |
| Contractor Manager | Crew and contractor coordination | Track contractor workload, submitted jobs, missing documentation, payout review status, and field performance signals. |

Contractors are not primary dashboard users in MVP. Contractor-facing portals, invoice views, SMS links, and mobile field submission surfaces are future surfaces.

## 3. Dashboard Doctrine

The dashboard follows these product rules:

- Docs-first: this PRD defines the product surface before app implementation.
- Review-first: the dashboard prepares decisions; it does not silently approve them.
- Human approval by default: billing, payout, client communication, dispatch, safety exceptions, and external messages require explicit human action.
- Separation of concerns: Executive OS, Operations OS, and Financial OS have distinct views, permissions, and data boundaries.
- Financial separation: contractor-visible, client-visible, and internal-only financial data must never cross-leak.
- Source-backed only: no fabricated metrics, fake roster, fake rates, fake zones, or invented operational claims.
- Exception-led design: the most important dashboard behavior is surfacing blocked work and review queues.
- No Firebase: Firebase must not be introduced.
- No live integrations in this phase: CRM, email, SMS, accounting, storage, AI, and dispatch integrations remain future work.
- No secrets: credentials, customer files, signed PDFs, sensitive records, and private rate sheets do not belong in the repo.

## 4. Core Dashboard Views

MVP should organize the dashboard into these top-level views:

| View | Domain | Purpose |
|---|---|---|
| Executive Summary | FLR Executive OS | Business health, workload, risk, revenue status, and decision queues. |
| Communications | Cross-domain | Drafts, reviewed messages, pending responses, and external communication gates. |
| Jobs and Dispatch | FLR Operations OS | Intake, scheduling, crew assignment, active jobs, submitted jobs, and dispatch readiness. |
| Contractors | FLR Operations OS + Financial OS | Contractor workload, documentation status, payout readiness, and exception history. |
| Invoice and Financial | FLR Financial OS | Contractor invoices, client invoices, review gates, audit references, and financial exceptions. |
| Compliance and Safety | FLR Operations OS | Safety records, PPE status, hazards, closeout documentation, and missing evidence. |
| Alerts and Escalations | Cross-domain | Unified exception queue with severity, owner, next action, and approval requirement. |

Each view should support drilldown from summary state to the underlying job, work order, invoice, safety record, contractor, or draft communication.

## 5. Executive Summary View

Purpose: give leadership a fast read on operational health and pending decisions.

### Required Cards

| Card | Meaning | Source |
|---|---|---|
| Open jobs | Count of active jobs that are not cancelled, paid, or fully closed. | `schemas/job.schema.json` |
| Jobs scheduled today | Jobs with today's scheduled date, crew assignment, and dispatch readiness state. | Job records + dispatch summary spec |
| Jobs completed this week | Jobs submitted, approved, invoiced, or paid during the current week. | Job status lifecycle |
| Outstanding invoices | Client and contractor invoices not yet paid, held, or resolved. | `schemas/invoice.schema.json` |
| Revenue this week | Approved or draft revenue for the current week, clearly labeled by approval state. | Invoice records |
| Contractor payouts pending | Contractor payout totals or invoice records pending review, approval, or payment action. | Invoice records |
| Missed calls / unanswered communications | Communication records requiring review or response. | Communication records |
| Leads requiring follow-up | Lead or opportunity records that need owner/admin response. | Future CRM/communication records |
| Jobs missing documentation | Jobs missing required photos, signatures, work orders, notes, or closeout evidence. | Job, work order, and safety records |
| Jobs ready for invoice review | Approved or completed jobs with enough evidence to enter invoice review. | Job + invoice records |
| Safety or compliance exceptions | Jobs with missing, flagged, or unresolved safety/compliance records. | `schemas/safety.schema.json` |

### Required Drilldowns

- Job list filtered by status.
- Dispatch day view by crew.
- Invoice review queue.
- Safety exception queue.
- Documentation gap queue.
- Alert detail with owner and next action.

### Display Rules

- Unapproved revenue must be labeled as draft, pending review, or estimated.
- Client invoice totals and contractor payout totals must be separated.
- Any metric based on incomplete data must show missing-data flags.

## 6. Communications View

Purpose: centralize future communication review without sending messages automatically.

The communications view is a review queue for message drafts, response needs, and communication history. It does not implement email, SMS, CRM, or AI messaging in MVP.

### Communication Types

| Type | Examples | Required Gate |
|---|---|---|
| Dispatch communication | Crew dispatch summary, schedule changes, access notes. | Human approval before send. |
| Client communication | Work order questions, completion notice, invoice follow-up. | Human approval before send. |
| Contractor communication | Missing documentation, payout question, job clarification. | Human approval before send. |
| Executive communication | Daily or weekly summary drafts. | Human approval before external or delegated send. |
| Billing communication | Invoice review request, approved invoice notice, held invoice explanation. | Human approval before send. |

### MVP Requirements

- Show communication drafts as internal records only.
- Show related job, contractor, invoice, or work order context.
- Track draft status: `draft`, `needs_review`, `approved_to_send`, `sent_future`, `held`, `cancelled`.
- Show reviewer, review timestamp, and review notes when available.
- Do not send messages.

### First-Class Communication Records

Communications must be modeled as first-class records before live integrations are implemented.

MVP may support manual, mock, or imported communication records. The schema should support future ingestion from:

- Email.
- SMS.
- Phone calls.
- Voicemail.
- CRM notes.
- Internal notes.
- Contractor messages.

This ensures executive review, dispatch decisions, follow-up tracking, and customer issue resolution can all reference communication history.

### Schema Recommendation

The existing repo has `docs/schemas/communication-schema.md` as a placeholder. Future implementation should define a machine-readable communication schema before any integration is built.

## 7. Jobs and Dispatch View

Purpose: give operations a working surface for intake, scheduling, dispatch readiness, active work, and completion review.

### Required Sections

| Section | Purpose |
|---|---|
| Intake queue | Draft or pending jobs created from work orders, manual entry, or future parser output. |
| Scheduling queue | Pending jobs needing scheduled date, crew, zone, or site validation. |
| Dispatch readiness | Scheduled jobs missing required dispatch fields. |
| Crew day view | Jobs grouped by date and crew. |
| Submitted jobs | Crew-submitted work needing admin review. |
| Blocked jobs | Jobs marked incomplete, return_needed, on_hold, or missing required evidence. |

### Required Job Fields

The dashboard should rely on the existing canonical Job model:

- `job_id`
- `client_job_number`
- `client_id`
- `work_order_id`
- `job_type`
- `status`
- `scheduled_date`
- `site_address`
- `site_city`
- `zone_id`
- `trip_charge_classification`
- `crew_members[]`
- `scope_line_items[]`
- `safety_record_id`
- `notes`

### Dispatch Readiness Rules

A job is not dispatch-ready until it has:

- Scheduled date.
- Site address and city.
- Crew assignment.
- Scope summary or scope line items.
- Safety record or safety checklist requirement.
- Known access notes or explicit confirmation that no access notes are available.
- Human review if parser confidence, address, scope, date, or safety fields are flagged.

### Existing Source References

- `docs/scope/UNIVERSAL_JOB_OBJECT.md`
- `docs/scope/DATA_DICTIONARY.md`
- `docs/automation/PDF_INTAKE_PARSER_SPEC.md`
- `docs/automation/DISPATCH_SUMMARY_SPEC.md`
- `schemas/job.schema.json`
- `schemas/work-order.schema.json`
- `schemas/scope-line-item.schema.json`

## 8. Contractor View

Purpose: help operations and finance track contractor workload, documentation, payout readiness, and exceptions.

### MVP Contractor Panels

| Panel | Purpose |
|---|---|
| Contractor roster | Active and inactive contractor records required for dispatch, billing, compliance, and accountability. |
| Workload by contractor | Jobs assigned, active, submitted, approved, and invoiced. |
| Documentation status | Missing photos, signatures, notes, or safety completion by contractor. |
| Payout readiness | Approved jobs ready for contractor billing review. |
| Exception history | Incomplete jobs, return-needed work, missing docs, or disputed records. |

### Contractor Roster MVP Fields

Required contractor fields:

- Contractor ID.
- Full name.
- Phone number.
- Email.
- Role.
- Status.
- Pay type.
- Default rate or split.
- Service areas.
- Skills / capabilities.
- Vehicle access.
- Tool access.
- PPE compliance status.
- Safety training status.
- Start date.
- Emergency contact.
- Notes.

Recommended contractor statuses:

- Candidate.
- Trainee.
- Helper.
- Lead Installer.
- Senior Lead.
- Inactive.

Recommended capability tags:

- Ramp install.
- Ramp takedown.
- Stair lift install.
- VPL install support.
- Vehicle lift install.
- Service / repair.
- WillScot work.

### Contractor Data Boundary

Contractor financial data is not client-facing. Client rates, internal splits, margin, and AJ Digital operating overlays must not be exposed to contractors unless explicitly approved in a future spec.

### Schema Recommendation

The repo does not currently have a root-level contractor JSON Schema. Future implementation should define one before contractor dashboards or billing automation are built. The planning placeholder is `docs/schemas/contractor-schema.md`.

## 9. Invoice and Financial View

Purpose: provide a controlled financial review surface for contractor invoices, client invoices, payout readiness, and billing exceptions.

### Required Sections

| Section | Purpose |
|---|---|
| Contractor invoice queue | Contractor invoices pending generation, review, approval, hold, or rejection. |
| Client invoice queue | Client invoices pending review, approval, edit, hold, send, delivery confirmation, or payment status. |
| Approved jobs not invoiced | Jobs that reached approved status but have not been included in an invoice. |
| Invoice exceptions | Missing documentation, conflicting totals, missing rate sheet, adjustment required, or review hold. |
| Audit references | Invoice audit IDs and links back to included jobs/work orders. |

### Financial Display Rules

- Contractor invoice data and client invoice data must be visibly separated.
- Contractor splits must never appear in client invoice views.
- Client contractual rates must not appear in contractor payout views unless explicitly approved.
- Draft totals must be labeled draft.
- Payment execution is out of scope.
- Accounting writeback is out of scope.

### Existing Source References

- `docs/automation/BILLING_EXTRACTION_SPEC.md`
- `schemas/invoice.schema.json`
- `schemas/job.schema.json`

## 10. Compliance and Safety View

Purpose: keep safety-sensitive field work visible, reviewed, and blocked when required evidence is missing.

### Required Sections

| Section | Purpose |
|---|---|
| Safety checklist status | Jobs with completed, missing, flagged, or held safety records. |
| PPE compliance | Required PPE confirmation and missing PPE flags. |
| Job hazards | Job-specific hazards from dispatch and safety specs. |
| Closeout evidence | Required completion photos, sign-offs, and work order completion records. |
| Safety escalations | Any issue that requires work pause, admin review, or incident handling. |

### Safety Review Rules

- Missing PPE or missing safety checklist should block approval.
- Safety exceptions must be visible in the Executive Summary and Alerts views.
- The dashboard must distinguish missing evidence from confirmed non-compliance.
- Safety-sensitive decisions require human review.

### Existing Source References

- `docs/sop/SAFETY_REQUIREMENTS_SOP.md`
- `docs/sop/safety-compliance-sop.md`
- `docs/training/TOOL_AND_PPE_CHECKLIST.md`
- `schemas/safety.schema.json`

## 11. Alerts and Escalation Model

Purpose: create one cross-domain exception model for decisions that need attention.

Alerts should use a hybrid model. The system may derive alerts at runtime from jobs, invoices, communications, contractors, and compliance records. Once an alert crosses a defined business threshold, it should be stored as a first-class Alert record.

Runtime alert examples:

- Job missing required photos.
- Invoice overdue.
- Lead not followed up.
- Contractor missing PPE compliance.
- Job ready for invoice review.
- Work order missing required fields.

### Alert Severity

| Severity | Meaning | Example |
|---|---|---|
| Info | Useful context, no immediate block. | Multi-page PDF detected; verify all pages. |
| Warning | Review recommended, but may not block workflow. | Contact phone invalid; dispatch still possible after review. |
| Blocker | Workflow cannot proceed without human resolution. | Required field missing, invoice review hold, missing safety record. |
| Critical | Time-sensitive or safety/financial/client-impacting issue. | Safety escalation, client invoice about to be sent with missing review, crew dispatched without required data. |

### Alert Fields

Future implementation should represent alerts with:

- Alert ID.
- Source object type.
- Source object ID.
- Severity.
- Domain: executive, operations, financial, safety, communication.
- Related record type and ID.
- Source field or rule.
- Summary.
- Required action.
- Owner.
- Status: open, acknowledged, resolved, dismissed.
- Created timestamp.
- Acknowledged timestamp.
- Resolved timestamp.
- Escalation status.
- Resolution notes.

### Escalation Rules

- Blockers remain visible until resolved or explicitly dismissed with reason.
- Critical alerts should appear at the top of the dashboard.
- Financial and safety critical alerts require explicit human acknowledgement.
- No agent may resolve an alert without a human approval record.

## 12. Review Gates

The dashboard must make review gates visible and actionable.

| Gate | Required Before | Owner |
|---|---|---|
| Intake review | Promoting parsed or manually entered job to accepted/pending operational work. | Operations Admin |
| Dispatch review | Sending crew dispatch instructions or treating a crew day as ready. | Operations Admin |
| Safety review | Approving job completion when safety record is missing or flagged. | Safety / Compliance Reviewer |
| Completion review | Moving submitted job to approved. | Operations Admin |
| Contractor billing review | Approving contractor invoice or payout-ready summary. | Financial Reviewer |
| Client invoice review | Sending or marking client invoice as approved. | Michael Keegan for MVP |
| Communication review | Sending external message, dispatch note, billing note, or client follow-up. | Human Reviewer |
| Executive approval | Any strategic, financial, client-impacting, or policy-level decision. | Owner / Executive |

## 13. Data Dependencies

MVP dashboard design depends on these records or planned records:

| Data Area | Existing Source | Current State |
|---|---|---|
| Jobs | `schemas/job.schema.json` | Existing root JSON Schema. |
| Clients | `schemas/client.schema.json` | Existing root JSON Schema. |
| Work orders | `schemas/work-order.schema.json` | Existing root JSON Schema. |
| Scope line items | `schemas/scope-line-item.schema.json` | Existing root JSON Schema. |
| Safety records | `schemas/safety.schema.json` | Existing root JSON Schema. |
| Invoices | `schemas/invoice.schema.json` | Existing root JSON Schema. |
| Contractors | `docs/schemas/contractor-schema.md` | Planning placeholder only. |
| Communications | `docs/schemas/communication-schema.md` | Planning placeholder only. |
| Dashboard state | `docs/schemas/dashboard-schema.md` | Planning placeholder only. |
| Alerts | Not yet defined as schema | Recommendation only. |
| Agents | `docs/agents/*.md` | Planning placeholders only. |

## 14. Source Schemas

The dashboard should treat the following as source contracts:

- `schemas/job.schema.json`
- `schemas/client.schema.json`
- `schemas/work-order.schema.json`
- `schemas/scope-line-item.schema.json`
- `schemas/safety.schema.json`
- `schemas/invoice.schema.json`

Planning documents that should guide future schema work:

- `docs/schemas/canonical-data-schema.md`
- `docs/schemas/dashboard-schema.md`
- `docs/schemas/contractor-schema.md`
- `docs/schemas/communication-schema.md`

No existing schema should be modified as part of this PRD. Any schema extensions should be proposed in a future schema PR.

## 15. Agent Interactions

Future agents may prepare work for review, but they must not execute sensitive actions.

| Agent | Allowed To Prepare | Not Allowed To Do |
|---|---|---|
| Executive Assistant Agent | Executive summaries, decision briefs, exception summaries. | Send comms, approve invoices, dispatch crews, make commitments. |
| Dispatch Agent | Dispatch draft, missing-data flags, route/sequence suggestions. | Contact crews, confirm schedule, override safety or admin review. |
| CRM Agent | Draft CRM-ready record payloads and follow-up task suggestions. | Write to live CRM or send follow-up without approved integration and human review. |
| Invoice Agent | Invoice draft checks, missing documentation flags, review queue summaries. | Approve, send, finalize, or pay invoices. |
| Contractor Billing Agent | Payout summary prep, split anomaly flags, missing documentation flags. | Approve payouts or expose client financial data. |
| Documentation Agent | Completeness checks, SOP links, missing evidence lists. | Rewrite authoritative SOPs or approve incomplete records. |

Agent outputs should appear as suggestions, drafts, flags, or summaries with a visible source trail and review status.

## 16. Human Approval Boundaries

Human approval is required before:

- Dispatch instructions are sent externally.
- Client or contractor communications are sent.
- A submitted job becomes approved.
- A safety exception is dismissed.
- Contractor invoice or payout summary is approved.
- Client invoice is approved, edited, sent, or marked final.
- Any financial rate, split, adjustment, or surcharge is changed.
- CRM, accounting, email, SMS, storage, or AI integration writes to a live third-party system.
- Any secret, credential, customer document, or private rate sheet is handled.

For MVP, Michael Keegan is the final approval authority for all client-facing invoice release. Future phases may introduce delegated approval roles such as Office Admin, Finance Manager, or Operations Manager, but all client-facing invoices require explicit human approval before release.

## 17. Resolved Product Decisions

### Invoice Approval Authority

For MVP, Michael Keegan is the final approval authority for all client-facing invoice release.

The system may prepare invoice drafts, validate required fields, flag missing documentation, and recommend readiness, but no client invoice should be sent without explicit human approval.

Future phases may introduce delegated approval roles such as Office Admin, Finance Manager, or Operations Manager.

### MVP Executive Metrics

The first dashboard metrics should prioritize operational control, cash visibility, and risk detection.

Required MVP metrics:

- Open jobs.
- Jobs scheduled today.
- Jobs completed this week.
- Outstanding invoices.
- Revenue this week.
- Contractor payouts pending.
- Missed calls / unanswered communications.
- Leads requiring follow-up.
- Jobs missing documentation.
- Jobs ready for invoice review.
- Safety or compliance exceptions.

### Communications as First-Class Records

Communications should be modeled as first-class records before live integrations are implemented.

The MVP may support manual, mock, or imported communication records. The schema should support future ingestion from:

- Email.
- SMS.
- Phone calls.
- Voicemail.
- CRM notes.
- Internal notes.
- Contractor messages.

This ensures that executive review, dispatch decisions, follow-up tracking, and customer issue resolution can all reference communication history.

### Contractor Roster MVP Fields

The contractor roster should include the minimum operational fields required for dispatch, billing, compliance, and accountability.

Required MVP fields:

- Contractor ID.
- Full name.
- Phone number.
- Email.
- Role.
- Status.
- Pay type.
- Default rate or split.
- Service areas.
- Skills / capabilities.
- Vehicle access.
- Tool access.
- PPE compliance status.
- Safety training status.
- Start date.
- Emergency contact.
- Notes.

Recommended contractor statuses:

- Candidate.
- Trainee.
- Helper.
- Lead Installer.
- Senior Lead.
- Inactive.

Recommended capability tags:

- Ramp install.
- Ramp takedown.
- Stair lift install.
- VPL install support.
- Vehicle lift install.
- Service / repair.
- WillScot work.

### Alert Persistence Model

Alerts should use a hybrid model.

The system may derive alerts at runtime from jobs, invoices, communications, contractors, and compliance records.

Examples of runtime alert conditions:

- Job missing required photos.
- Invoice overdue.
- Lead not followed up.
- Contractor missing PPE compliance.
- Job ready for invoice review.
- Work order missing required fields.

Once an alert crosses a defined business threshold, it should be stored as a first-class Alert record.

Stored alert records should include:

- Alert ID.
- Source object type.
- Source object ID.
- Severity.
- Status.
- Owner.
- Created timestamp.
- Acknowledged timestamp.
- Resolved timestamp.
- Escalation status.
- Resolution notes.

## 18. Non-Goals

This PRD does not authorize:

- App implementation.
- UI design implementation.
- Live CRM integration.
- Email or SMS sending.
- Accounting integration.
- Payment processing.
- Cloud storage provisioning.
- AI model integration.
- Firebase.
- Secret handling.
- Customer PDF ingestion into the repo.
- Schema modification.
- Automated dispatch, billing, communication, or approval.

## 19. MVP Scope

MVP should be a dashboard specification and later read-only/control-oriented implementation plan with:

- Top-level navigation for the core views.
- Job status summary and job drilldowns.
- Dispatch readiness queue.
- Submitted jobs review queue.
- Contractor workload and documentation status.
- Invoice review queues for contractor and client invoices.
- Safety/compliance exception queue.
- Communication draft review queue, internal-only.
- Alerts and escalation queue.
- Visible review gates.
- Source schema mapping.
- No live integrations.
- No external sends.
- No automated approvals.

## 20. Future Phases

| Phase | Scope |
|---|---|
| Phase 1 | Docs-first PRD, dashboard schema recommendations, view definitions, review gates, and acceptance criteria. |
| Phase 2 | Static or local prototype using sanitized sample data only. |
| Phase 3 | Internal app implementation with read-only seeded data and no live integrations. |
| Phase 4 | Controlled workflow actions with audit logs and human approvals. |
| Phase 5 | Approved integrations for CRM, storage, email/SMS, accounting export, and AI-assisted drafts. |
| Phase 6 | Role-based portals for contractors, admins, and leadership. |

Each phase requires separate approval before implementation.

## 21. Acceptance Criteria

This PRD is accepted when:

- It defines the dashboard purpose, users, doctrine, and core views.
- It maps the dashboard to FLR Executive OS, FLR Operations OS, and FLR Financial OS.
- It defines executive, communications, jobs/dispatch, contractor, invoice/financial, compliance/safety, and alerts views.
- It identifies review gates and human approval boundaries.
- It records Michael Keegan as MVP final approval authority for client-facing invoice release.
- It treats communications and threshold-crossing alerts as first-class records for future schema work.
- It defines the MVP contractor roster field set.
- It names existing source schemas and distinguishes schema recommendations from actual schema changes.
- It preserves the repo's docs-first, no-Firebase, no-secrets, no-live-integrations constraints.
- It does not modify app code or introduce implementation artifacts.
- It can be used as the anchor document for the next dashboard schema and prototype planning PRs.

## Recommendations For Next PRs

1. Expand `docs/schemas/dashboard-schema.md` into a dashboard data contract.
2. Expand `docs/schemas/communication-schema.md` before any communication workflow implementation.
3. Expand `docs/schemas/contractor-schema.md` before contractor dashboard or billing surfaces.
4. Create an alerts/escalation schema planning doc before implementing dashboard alert queues.
5. Create a sanitized dashboard sample dataset after schema planning is complete.
