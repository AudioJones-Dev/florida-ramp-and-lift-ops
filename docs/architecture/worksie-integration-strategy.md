# Worksie Integration Strategy

Status: Git Spec-Ready Draft
Owner: AJ Digital LLC / Audio Jones
Repo: `AudioJones-Dev/florida-ramp-and-lift-ops`
Scope: Florida Ramp & Lift Operational Intelligence Platform
Last updated: 2026-06-04

## Purpose

This document defines how Worksie-style operational capabilities should fit into the Florida Ramp & Lift architecture.

For Florida Ramp & Lift MVP, Worksie should not be implemented as a separate standalone operating system. Worksie concepts should be embedded as operational modules inside the FLR Operational Intelligence Platform.

The FLR Platform will integrate with HubSpot for CRM intake and QuickBooks for accounting truth. The platform will own job management, contractor/vendor management, project progress, documentation review, invoice readiness, approval workflows, alerts, and operational intelligence.

## 1. Product Decision

Build:

```txt
Integrated Operational Layer
```

Do not build:

```txt
Independent All-In-One OS
```

For this client, the correct architecture is:

```txt
Website / Phone / Email / ResponseOS
  -> HubSpot
  -> FLR Operational Intelligence Platform
  -> QuickBooks
```

Worksie becomes a set of embedded operational modules inside the FLR Platform, not a separate MVP product.

## 2. Why Not An Independent OS For MVP

An independent Worksie-style OS sounds clean, but it creates practical risk for Florida Ramp & Lift.

| Independent OS Risk | Why It Matters |
|---|---|
| Rebuilds CRM | HubSpot already handles contacts, companies, deals, tasks, pipeline, and CRM history. |
| Rebuilds accounting | QuickBooks already owns accounting truth. |
| Creates double entry | Michael/admin would update multiple systems. |
| Slows MVP | Too much infrastructure before proving workflow. |
| Higher support burden | AJ Digital becomes responsible for every workflow surface immediately. |
| More permissions complexity | Clients, contractors, admins, vendors, finance, owner, and agents all need different access. |

The goal is not to replace HubSpot and QuickBooks.

The goal is to make them intelligent and operationally useful.

## 3. HubSpot Boundary

HubSpot should own CRM intake and sales visibility.

HubSpot owns:

- Contacts.
- Companies.
- Deals.
- Sales pipeline.
- Lead follow-up.
- CRM notes.
- Customer relationship history.
- Basic tasks.
- Intake visibility.

HubSpot answers:

```txt
Who is the customer, what opportunity exists, and where are they in the sales process?
```

HubSpot should not own:

- Dispatch.
- Contractor/vendor operations.
- Contractor payouts.
- Job documentation review.
- Safety/compliance gates.
- Operational alerts/approvals.
- Final invoice truth.

## 4. QuickBooks Boundary

QuickBooks should own final accounting truth.

QuickBooks owns:

- Final invoice record.
- Payments.
- Accounting ledger.
- Revenue reports.
- Tax/accounting data.
- Customer financial history.

QuickBooks answers:

```txt
What money was billed, paid, outstanding, and recorded for accounting?
```

QuickBooks should not own:

- Job lifecycle.
- Dispatch.
- Contractor assignment.
- Documentation review.
- Invoice readiness.
- Agent triggers.
- Operational alert state.

## 5. FLR Platform Boundary

The FLR Operational Intelligence Platform should own operational intelligence.

FLR owns:

- Job operations.
- Vendor/contractor operations.
- Project progress.
- Documentation.
- Dispatch.
- Approvals.
- Alerts.
- Operational dashboard.
- Agent triggers.
- Invoice readiness.
- Contractor payouts.

FLR answers:

```txt
What is happening operationally, what needs review, who owns it, and what is blocking revenue?
```

## 6. Worksie Capability Modules

Worksie concepts should be represented as modules inside FLR:

```txt
FLR Operational Intelligence Platform
  -> CRM Mirror / HubSpot Sync
  -> Job Management
  -> Project Progress
  -> Contractor / Vendor Management
  -> Documentation Review
  -> Invoice Readiness
  -> Contractor Payouts
  -> Alerts / Approvals
  -> Executive Dashboard
```

These are not separate apps for MVP. They are operational modules within the same FLR platform and access model.

## 7. Invoice Management Module

The invoice management module should determine when a job is ready to invoice.

It should check:

- Job completed.
- Required photos uploaded.
- Scope confirmed.
- Contractor notes submitted.
- Customer/client info complete.
- Pricing/rate sheet applied.
- Required approvals complete.

Recommended flow:

```txt
Invoice Draft
  -> Invoice Review
  -> Michael Approval
  -> QuickBooks Invoice
  -> Sent / Paid Status
```

Rules:

- FLR owns invoice readiness.
- Michael Keegan has MVP final approval authority for client-facing invoice release.
- QuickBooks owns final accounting record and paid/unpaid truth.
- HubSpot may store invoice references or follow-up tasks but must not become invoice truth.

## 8. Vendor / Contractor Management Module

The vendor/contractor management module should track operational field capacity.

It should manage:

- Contractors.
- Vendors.
- Installer profiles.
- Skills/capabilities.
- Service areas.
- Safety/PPE status.
- Pay type.
- Rate/split.
- Availability.
- Assigned jobs.
- Payout status.
- Performance notes.

Rules:

- Do not force contractor operations into HubSpot unless only simple contact records are needed.
- FLR owns contractor status, compliance, assignments, and payout visibility.
- Contractor-facing records must be scoped to assigned work and released payout status only.

## 9. Job Management Module

The job management module is core.

It should manage:

- Job intake.
- Job type.
- Customer/site.
- Scope of work.
- Required equipment.
- Assigned contractor/crew.
- Status.
- Photos.
- Documentation.
- Completion.
- Review gates.
- Invoice readiness.

Rules:

- HubSpot can show that a job/request exists.
- HubSpot should not become the job operating system.
- FLR owns job lifecycle and state transitions.

## 10. Project / Progress Management Module

Project/progress management should be state-based.

Canonical progress flow:

```txt
New Request
  -> Qualified
  -> Estimate Needed
  -> Estimate Sent
  -> Approved
  -> Scheduled
  -> Assigned
  -> In Progress
  -> Documentation Review
  -> Invoice Review
  -> Invoice Sent
  -> Paid
  -> Closed
```

This is operational state tracking, not generic task management.

Rules:

- Dashboard status should come from FLR state, not HubSpot stages alone.
- HubSpot pipeline stages may mirror sales/service visibility.
- FLR state remains the operational source of truth.

## 11. Integration Model

Recommended integration model:

```txt
Website / Phone / Email / ResponseOS
  -> HubSpot CRM intake
  -> FLR operational handoff
  -> FLR operational modules
  -> QuickBooks accounting handoff
```

### HubSpot To FLR

HubSpot sends or exposes:

- Contact.
- Company.
- Deal or Lead.
- Ticket if used for service request.
- Communication references.
- Follow-up status.

FLR creates or links:

- Customer.
- Location.
- Communication.
- Lead.
- Job.
- WorkOrder.
- Task or Alert if required data is missing.

### FLR To HubSpot

FLR may send or expose:

- Operational status summary.
- Job reference.
- Follow-up task.
- Customer-visible status summary.
- Invoice reference.

### FLR To QuickBooks

FLR may send or expose after approval:

- Approved invoice data.
- Customer reference.
- Line items.
- Amounts.
- Approved release status.

QuickBooks returns or confirms:

- Invoice ID/reference.
- Sent status.
- Paid/unpaid status.
- Payment/reconciliation status.

No live integrations are implemented by this document.

## 12. Data Ownership

| Data Area | Owner |
|---|---|
| Contacts / customer relationship | HubSpot |
| Companies / commercial accounts | HubSpot |
| Leads / sales opportunities | HubSpot |
| CRM tasks / sales follow-up | HubSpot |
| Job lifecycle | FLR Platform |
| Dispatch assignments | FLR Platform |
| Contractor/vendor operations | FLR Platform |
| Documentation artifacts | FLR Platform / storage |
| Alerts and approvals | FLR Platform |
| Agent orchestration | FLR Platform |
| Invoice readiness | FLR Platform |
| Contractor payouts | FLR Platform |
| Final invoice ledger | QuickBooks |
| Paid/unpaid accounting truth | QuickBooks |

## 13. Human Approval Gates

Human approval is required before:

- Client-facing invoice release.
- Contractor payout approval/release.
- Dispatch instruction external send.
- Customer/client communication send.
- Financial adjustment, rate override, split override, or surcharge change.
- Documentation approval for billing/safety evidence.
- Safety exception dismissal.
- Critical alert dismissal/resolution.
- HubSpot-to-FLR handoff when required data is incomplete.
- FLR-to-QuickBooks invoice creation in MVP/manual phase.

MVP decision: Michael Keegan has final authority for client-facing invoice release.

## 14. Future Productization Path

Worksie may become a reusable product layer later, but not as the Florida Ramp & Lift MVP starting point.

Potential future path:

1. Prove FLR operational modules with Florida Ramp & Lift.
2. Identify repeatable module patterns across job/vendor/project/invoice workflows.
3. Extract reusable Worksie concepts into a product framework.
4. Define multi-tenant requirements.
5. Build standalone Worksie only after repeated cross-client demand exists.

Future Worksie productization should not compromise the FLR MVP architecture.

## 15. Non-Goals

This document does not authorize:

- A standalone Worksie OS build.
- App code.
- HubSpot integration.
- QuickBooks integration.
- ResponseOS integration.
- Database migrations.
- New repositories.
- Auth setup.
- Storage setup.
- n8n workflows.
- AI runtime calls.
- Secrets or credentials.
- Firebase.
- Automated invoice release.
- Automated contractor dispatch.
- Automated client communication without human approval.
- Replacing HubSpot as CRM.
- Replacing QuickBooks as accounting ledger.

## 16. Acceptance Criteria

This strategy is accepted when:

- It clearly rejects a standalone Worksie OS for Florida Ramp & Lift MVP.
- It defines Worksie concepts as embedded FLR operational modules.
- It preserves HubSpot as CRM intake and sales visibility layer.
- It preserves QuickBooks as final accounting ledger.
- It preserves FLR Platform as operational source of truth.
- It defines invoice management, vendor/contractor management, job management, and project/progress management modules.
- It defines integration model and data ownership boundaries.
- It preserves Michael Keegan's MVP invoice-release approval authority.
- It does not introduce app code, integrations, secrets, Firebase, or live third-party changes.
