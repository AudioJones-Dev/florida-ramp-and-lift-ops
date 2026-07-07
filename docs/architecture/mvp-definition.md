# MVP Definition

Status: Git Spec-Ready Draft
Owner: AJ Digital LLC / Audio Jones
Repo: `AudioJones-Dev/florida-ramp-and-lift-ops`
Scope: Florida Ramp & Lift Operational Intelligence Platform
Last updated: 2026-06-04

## 1. MVP Purpose

The MVP exists to prove internal operational control for Florida Ramp & Lift before live integrations, autonomous agents, client portal access, or advanced automation.

The MVP should answer:

```txt
What work is happening, who owns it, what is blocked, what needs review, and what is ready for invoice approval?
```

The MVP is not a public SaaS launch. It is an internal operational intelligence layer for Michael Keegan, Audio Jones / AJ Digital, office/admin users, dispatch users, and contractors/installers.

## 2. MVP User Personas

| Persona | Role | Primary Need |
|---|---|---|
| Michael Keegan | `owner` | Review executive dashboard, approve client-facing invoice release, see revenue/risk/follow-up blockers. |
| Audio Jones / AJ Digital | `support_admin` | Configure, observe, diagnose, QA workflows, review data quality, support system design. |
| Office/Admin | `office_admin` | Capture work, manage customers/jobs/communications, review documentation, prepare invoice readiness. |
| Dispatcher | `dispatcher` | Schedule/assign jobs, prepare dispatch view, manage crew/job blockers. |
| Finance | `finance` | Review invoice readiness, contractor payouts, and financial blockers. |
| Lead Installer | `lead_installer` | See assigned jobs, update field progress, submit documentation. |
| Contractor | `contractor` | See assigned jobs, upload proof, add notes, submit completion, view released payout status. |
| AI Agent | `ai_agent` | Future restricted role; MVP may include placeholders only, not autonomous runtime agents. |

Client portal users are not MVP personas.

## 3. MVP Product Boundaries

The MVP is:

- One role-aware web app.
- Internal command center first.
- Manual/mock workflow first.
- Operational source of truth for jobs, dispatch, documentation, alerts, approvals, invoice readiness, contractor payouts, and contractor portal data.
- Designed to integrate with HubSpot, QuickBooks, ResponseOS, and AI automation later.

The MVP is not:

- HubSpot replacement.
- QuickBooks replacement.
- Standalone Worksie OS.
- Client portal.
- Autonomous AI system.
- Production integration hub.

## 4. In-Scope Modules

MVP modules:

- Role-aware internal dashboard shell.
- Executive dashboard.
- Support admin view.
- Office/admin view.
- Dispatch view.
- Manual customer records.
- Manual location records.
- Manual communication records.
- Manual lead/job/work order records.
- Manual contractor records.
- Manual invoice readiness records.
- Manual contractor payout status records.
- Job management.
- Project/progress tracking.
- Documentation review.
- Invoice readiness queue.
- Approval queue.
- Alert center.
- Contractor portal MVP.
- Role-based and object-level access doctrine.

## 5. Out-Of-Scope Modules

MVP excludes:

- Live HubSpot sync.
- Live QuickBooks sync.
- Live ResponseOS integration.
- Autonomous AI agents.
- Automated invoice release.
- Client portal.
- Payment processing.
- Predictive dispatch.
- Advanced forecasting.
- Native mobile app.
- Firebase.
- Live SMS/email automation.
- n8n production workflows.
- Standalone Worksie OS.
- Production file ingestion from real customer PDFs before storage/security policy is approved.

## 6. MVP Portal Requirements

### Executive Portal

Primary user: Michael Keegan.

Must include:

- Executive dashboard.
- Approval queue.
- Invoice release approval queue.
- Open jobs summary.
- Jobs ready for invoice review.
- Outstanding invoice summary.
- Contractor payout pending summary.
- Missed follow-up summary.
- Critical alerts and escalations.

### Support Admin View

Primary user: Audio Jones / AJ Digital.

Must include:

- Data quality overview.
- Manual record inspection.
- Workflow state inspection.
- Alert/approval visibility.
- Configuration placeholders.
- Audit/diagnostic placeholders.

No production secrets or live integration controls in MVP.

### Office/Admin View

Must include:

- Customer entry/review.
- Location entry/review.
- Communication records.
- Lead/job intake.
- Work order reference records.
- Documentation review.
- Invoice readiness preparation.
- Follow-up queue.

### Dispatch View

Must include:

- Scheduled jobs.
- Assigned jobs.
- Dispatch readiness.
- Contractor/crew assignment.
- Location/access notes.
- Missing documentation/safety blockers.

### Contractor Portal MVP

Must include:

- Assigned job list.
- Job detail.
- Site/location details for assigned job only.
- Scope of work.
- Required equipment/PPE notes.
- Upload/documentation placeholder or manual artifact status.
- Notes.
- Submit completion.
- Released payout status only.

### Client Portal

Not MVP.

## 7. MVP Dashboard Requirements

Required dashboard cards/queues:

- Open jobs.
- Jobs scheduled today.
- Jobs completed this week.
- Jobs missing documentation.
- Jobs ready for invoice review.
- Invoice readiness queue.
- Outstanding invoices.
- Revenue this week.
- Contractor payouts pending.
- Missed calls / unanswered communications.
- Leads requiring follow-up.
- Safety or compliance exceptions.
- Critical alerts.
- Approval requests.

Dashboard rules:

- Dashboard reads canonical object state.
- Dashboard does not invent state.
- Draft/estimated financial totals must be labeled as draft or pending review.
- Contractor payout data must not leak to clients or unrelated contractors.
- Client-facing invoice release remains blocked until Michael approval.

## 8. MVP Core Objects

MVP should support manual/mock records for:

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
- DocumentationArtifact.
- Invoice.
- ContractorPayout.
- Alert.
- Task.
- Approval.
- AuditLog placeholder or manual audit trail.

Equipment may be minimal in MVP unless required for dispatch readiness.

## 9. MVP Workflows

Required MVP workflows:

1. Manual lead/customer intake.
2. Manual communication logging.
3. Manual job creation.
4. Manual work order reference.
5. Job scheduling.
6. Contractor assignment.
7. Job progress update.
8. Documentation submission/review.
9. Job approval.
10. Invoice readiness review.
11. Michael invoice release approval queue.
12. Contractor payout readiness status.
13. Alert creation/acknowledgement/resolution.
14. Task/follow-up queue.

All workflows must be manual or mock before live integrations.

## 10. MVP Approval Queues

Required approval queues:

- Client-facing invoice release.
- Job submitted -> approved.
- Documentation approval for billing/safety evidence.
- Contractor payout approval/release.
- Dispatch external send/release when implemented.
- Critical alert dismissal/resolution.
- Financial adjustment/rate/split/surcharge override.

Michael Keegan has MVP final authority for client-facing invoice release.

## 11. MVP Alert Center

MVP Alert Center must support:

- Manual Alert creation.
- Alert severity.
- Alert owner.
- Alert source object.
- Alert status.
- Acknowledgement.
- Escalation.
- Resolution.
- Dismissal reason.

MVP alert examples:

- Job missing required documentation.
- Communication requires follow-up.
- Job ready for invoice review.
- Invoice waiting for approval.
- Contractor payout blocked.
- Safety/compliance exception.
- Dispatch assignment missing contractor.

## 12. Contractor Portal MVP

Contractor portal MVP must be narrow.

Contractors can:

- View assigned jobs.
- View assigned job location/scope/PPE/equipment notes.
- Add job notes.
- Submit completion.
- Submit or reference documentation status.
- View own released payout status.

Contractors cannot:

- View company financials.
- View other contractors' payouts.
- View full customer database.
- View executive dashboard.
- View AI/system configuration.
- View client contractual rates.
- Approve invoices or payouts.
- Dispatch themselves to unassigned jobs.

## 13. Invoice Readiness MVP

MVP invoice readiness should determine whether a job is ready for financial review.

Readiness checks:

- Job completed/submitted.
- Required documentation present.
- Photos/proof submitted or manually marked.
- Scope confirmed.
- Contractor notes submitted.
- Customer/client info complete.
- WorkOrder reference complete where applicable.
- Pricing/rate sheet status manually confirmed.
- Approval complete.

Flow:

```txt
Job Approved
  -> Invoice Readiness Review
  -> Invoice Draft / Readiness Record
  -> Michael Approval Queue
  -> QuickBooks later
```

QuickBooks sync is not MVP.

## 14. HubSpot MVP Boundary

HubSpot is CRM intake and sales visibility.

MVP FLR app may include:

- Manual HubSpot reference fields.
- Manual source labels.
- Manual customer/lead import by operator.
- Future sync placeholders.

MVP excludes:

- Live HubSpot API sync.
- HubSpot custom objects.
- Automatic HubSpot-to-FLR job creation.
- HubSpot as dispatch engine.
- HubSpot as invoice truth.

## 15. QuickBooks MVP Boundary

QuickBooks is final accounting ledger.

MVP FLR app may include:

- Manual QuickBooks reference field.
- Manual invoice status note.
- Manual paid/unpaid reference field.
- Future sync placeholders.

MVP excludes:

- Live QuickBooks API sync.
- Automated invoice creation.
- Automated payment status sync.
- Payment processing.
- Accounting ledger replacement.

## 16. ResponseOS MVP Boundary

ResponseOS is a future intake/voice pilot boundary.

MVP may include:

- Manual ResponseOS source label.
- Manual communication summary.
- Future integration placeholder.

MVP excludes:

- Live ResponseOS integration.
- AI receptionist production workflow.
- Automated lead creation from ResponseOS.
- Automated client communication.
- ResponseOS as source of truth.

## 17. AI Automation MVP Boundary

MVP does not include autonomous AI agents.

MVP may include:

- Agent role placeholders.
- Agent registry references.
- Manual/mock agent output fields.
- Future AI workflow placeholders.

MVP excludes:

- Runtime AI API calls.
- Autonomous dispatch agent.
- Autonomous invoice agent.
- Autonomous communication sending.
- Autonomous alert resolution.
- AI approval authority.

## 18. Success Criteria

MVP is successful when:

- Michael can see what needs attention and approval.
- Office/Admin can manually enter and manage core operational records.
- Dispatcher can see scheduled/assigned/blocked jobs.
- Contractors can see assigned jobs and submit completion/proof status.
- Finance/Admin can see invoice readiness and payout blockers.
- Alerts and approvals make blockers visible.
- Manual/mock workflows prove the operating model before integrations.
- HubSpot and QuickBooks boundaries remain intact.
- No secrets, Firebase, live integrations, or autonomous AI are introduced.

## 19. Non-Goals

This document does not authorize:

- App code.
- Next.js scaffolding.
- Auth setup.
- Database migrations.
- HubSpot sync.
- QuickBooks sync.
- ResponseOS integration.
- Runtime AI automation.
- Twilio/Resend setup.
- n8n workflows.
- Payment processing.
- Client portal.
- Native mobile app.
- Predictive dispatch.
- Advanced forecasting.
- Firebase.
- Secrets in repo.
- Standalone Worksie OS.
- Automated financial, legal, safety, dispatch, or client-facing approvals.

## 20. Acceptance Criteria

This MVP definition is accepted when:

- It defines the exact MVP purpose and users.
- It defines product boundaries and source-of-truth boundaries.
- It identifies in-scope and out-of-scope modules.
- It defines portal, dashboard, core object, workflow, approval queue, alert center, contractor portal, and invoice readiness requirements.
- It explicitly excludes live HubSpot sync, live QuickBooks sync, live ResponseOS integration, autonomous AI, automated invoice release, client portal, payment processing, predictive dispatch, advanced forecasting, native mobile app, and Firebase.
- It preserves manual/mock-first workflow policy.
- It preserves Michael Keegan's MVP authority for client-facing invoice release.
- It does not introduce app code, integrations, secrets, Firebase, or runtime setup.
