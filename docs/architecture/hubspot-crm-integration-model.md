# HubSpot CRM Integration Model

Status: Git Spec-Ready Draft
Owner: AJ Digital LLC / Audio Jones
Repo: `AudioJones-Dev/florida-ramp-and-lift-ops`
Scope: Florida Ramp & Lift Operational Intelligence Platform
Last updated: 2026-06-04

## Purpose

This document defines HubSpot as the CRM intake and sales-visibility layer for Florida Ramp & Lift while preserving the FLR Operational Intelligence Platform as the operational source of truth.

HubSpot should not become the entire product. It should manage customer relationship context, lead pipeline visibility, sales follow-up, and communication history. The FLR platform should own operational intelligence: jobs, dispatch, contractor assignments, documentation, alerts, approvals, agents, and contractor portal workflows.

## Current And Planned Stack

### Existing Live Stack

- QuickBooks.
- Main business email.
- Main business phone number.
- Website.

### Planned Stack

- HubSpot CRM.
- ResponseOS pilot.
- FLR Operational Intelligence Platform.

## 1. HubSpot's Role

HubSpot should be the CRM and intake layer.

HubSpot should own:

- Contacts.
- Companies.
- Deals / opportunities.
- Lead pipeline visibility.
- Sales follow-up.
- Customer communication history.
- Basic tasks.
- Intake visibility.

HubSpot should answer:

```txt
Who is the customer, what do they want, where are they in sales/intake, and what follow-up is needed?
```

## 2. QuickBooks' Role

QuickBooks should remain the final accounting source of truth.

QuickBooks should own:

- Final accounting ledger.
- Paid/unpaid invoice truth.
- Tax/accounting reporting.
- Reconciliation.
- Accounting records required by the business/accountant.

QuickBooks should answer:

```txt
What is financially true for accounting?
```

The FLR platform may reference QuickBooks invoice/payment status in future phases, but it should not replace QuickBooks as the accounting ledger.

## 3. FLR Platform's Role

The FLR Operational Intelligence Platform should be the operational source of truth.

The FLR platform should own:

- Job lifecycle.
- Dispatch.
- Contractor assignments.
- Contractor portal.
- Documentation artifacts.
- Safety/compliance.
- Alerts.
- Approvals.
- Operational dashboard.
- Agent orchestration.
- Contractor payouts.
- Internal intelligence layer.

The FLR platform should answer:

```txt
What work is happening, who is responsible, what is blocked, what needs approval, and what must happen next?
```

## 4. Source-Of-Truth Boundaries

| Data Area | Source Of Truth | Notes |
|---|---|---|
| CRM contact/person | HubSpot | Synced or referenced by FLR when operational work begins. |
| Commercial account/company | HubSpot | HubSpot Company maps to FLR Customer for commercial accounts. |
| Lead/sales opportunity | HubSpot | Deal or Lead object depending on HubSpot account capabilities. |
| Service job / operational work | FLR platform | HubSpot Ticket may mirror intake/status, but FLR owns operations. |
| Dispatch assignment | FLR platform | Do not use HubSpot as dispatch engine. |
| Contractor roster/portal | FLR platform | HubSpot is not contractor operations system. |
| Documentation/photos/PDFs | FLR platform/storage | HubSpot may store links or summaries, not operational file truth. |
| Alerts/approvals/agents | FLR platform | HubSpot may receive summaries/tasks only. |
| Invoice operational readiness | FLR platform | FLR owns readiness/review workflow. |
| Final accounting ledger | QuickBooks | QuickBooks owns paid/unpaid financial truth. |
| Customer communication history | HubSpot + FLR Communication | HubSpot is CRM activity layer; FLR stores first-class operational Communication records. |

## 5. HubSpot Object Mapping

Use HubSpot standard objects first for MVP. Avoid custom objects unless Michael's HubSpot plan supports them and a later architecture decision approves the added complexity.

| FLR Domain Object | HubSpot MVP Object | Notes |
|---|---|---|
| Customer | Contact | Residential customer or individual decision-maker. |
| Commercial Client | Company | WillScot, facilities, commercial accounts, organizations. |
| Lead | Lead or Deal | Use Deal if the Lead object is unavailable or impractical in the account. |
| Estimate | Deal | Pipeline stage represents sales status. |
| Job / WorkOrder | Ticket | Best HubSpot standard-object fit for service/operation tracking. FLR remains operational truth. |
| Communication | Email, Call, Communication activity, Note | First-class in FLR schema; CRM activity in HubSpot. |
| Task | Task | Follow-up, callback, admin action. |
| Invoice | QuickBooks first; HubSpot reference only | Do not make HubSpot financial truth. |
| Contractor | FLR platform | HubSpot is not ideal for contractor ops. |
| DispatchAssignment | FLR platform | Not HubSpot. |
| DocumentationArtifact | FLR platform/storage | Store links or summaries in HubSpot only if useful. |
| Alert | FLR platform | HubSpot may receive follow-up Task or note, not alert truth. |
| Approval | FLR platform | Approval records stay in FLR. |
| AuditLog | FLR platform | Audit records stay in FLR. |

## 6. Recommended Pipelines

### Sales Pipeline

Use for Leads/Deals before operational work begins.

```txt
New Lead
  -> Contacted
  -> Qualified
  -> Estimate Needed
  -> Estimate Sent
  -> Approved / Won
  -> Lost
```

### Service / Job Ticket Pipeline

Use for service visibility in HubSpot while FLR owns operational truth.

```txt
New Request
  -> Work Order Needed
  -> Scheduled
  -> Assigned
  -> In Progress
  -> Documentation Review
  -> Ready for Invoice
  -> Closed
```

### Pipeline Boundary

HubSpot pipeline stages may mirror FLR state for visibility, but HubSpot stages must not become the operational source of truth for dispatch, contractor assignment, documentation approval, invoice release, or payout decisions.

## 7. Lead Intake Workflow

### Inputs

- Website form.
- Main business phone number.
- Main business email.
- ResponseOS pilot intake.
- Manual Office/Admin entry.
- HubSpot-created Contact/Company/Deal/Lead.

### Workflow

1. New inquiry enters HubSpot as Contact/Company plus Deal or Lead.
2. Communication activity is logged in HubSpot.
3. Follow-up Task is created in HubSpot if needed.
4. Office/Admin qualifies the lead.
5. Estimate status is tracked in HubSpot Sales Pipeline.
6. When approved/won, a handoff record is prepared for FLR platform Job intake.
7. FLR platform creates or links Customer, Location, Communication, Lead, Job, and WorkOrder as needed.

### Rules

- HubSpot owns sales visibility and follow-up until the work becomes operational.
- FLR owns operational state after Job/WorkOrder creation.
- Communications remain first-class in FLR if they affect operations, dispatch, documentation, invoice review, alerts, or approvals.

## 8. Job Handoff Workflow

### Trigger

HubSpot Deal reaches `Approved / Won` or Ticket reaches a stage requiring operational execution.

### Handoff Data

- HubSpot Contact ID.
- HubSpot Company ID when applicable.
- HubSpot Deal or Lead ID.
- HubSpot Ticket ID when applicable.
- Customer/contact details.
- Site/location details.
- Requested service.
- Estimate or approved scope summary.
- Communication history reference.
- Attachments/links if available.

### FLR Platform Action

FLR creates or links:

- Customer.
- Location.
- Communication.
- Lead.
- Job.
- WorkOrder when applicable.
- Task or Alert if required data is missing.

### Rules

- FLR validates operational readiness.
- HubSpot does not assign contractors.
- HubSpot does not dispatch jobs.
- HubSpot does not approve documentation.
- HubSpot does not approve invoices or payouts.

## 9. Invoice Handoff Workflow

### FLR To QuickBooks

FLR owns invoice readiness and approval workflow. QuickBooks owns final ledger truth.

Workflow:

1. Job reaches invoice review in FLR.
2. DocumentationArtifact and WorkOrder requirements are validated.
3. Invoice draft is created/reviewed in FLR.
4. Michael Keegan approves client-facing invoice release for MVP.
5. QuickBooks record is created or updated in a future approved integration/manual process.
6. QuickBooks paid/unpaid truth may sync back as status reference in future.

### HubSpot Reference

HubSpot may store:

- Invoice reference number.
- QuickBooks invoice link/reference.
- FLR invoice status summary.
- Customer-facing follow-up task.

HubSpot must not be the invoice source of truth.

## 10. Communication Sync Rules

Communications are first-class records in FLR and CRM activity records in HubSpot.

### HubSpot Should Capture

- Emails.
- Calls.
- Communications activity.
- Notes.
- Tasks.
- Sales follow-up.
- CRM timeline context.

### FLR Should Capture

- Communications that affect Job, WorkOrder, DispatchAssignment, DocumentationArtifact, Invoice, ContractorPayout, Alert, Task, or Approval.
- Operational summaries of communication history.
- Communication records needed for disputes, dispatch context, invoice review, alerts, or executive briefings.

### Sync Rules

- Do not duplicate every CRM activity into FLR if it has no operational relevance.
- Do sync or reference communications that affect operational state.
- External communications still require human approval where defined by the state/event architecture.
- ResponseOS communication outputs must be reviewed before client-facing action.

## 11. Contractor Data Boundary

Contractor operations belong in FLR, not HubSpot.

FLR owns:

- Contractor roster.
- Contractor status.
- Skills/capabilities.
- PPE compliance.
- Safety training.
- Vehicle/tool access.
- Job assignments.
- Contractor portal.
- Documentation submissions.
- Contractor payout visibility.

HubSpot should not be used as:

- Contractor operations system.
- Dispatch system.
- Contractor payout system.
- Contractor compliance system.

## 12. ResponseOS Pilot Integration Boundary

ResponseOS may assist with:

- AI receptionist pilot.
- Missed-call handling.
- Intake summary.
- Follow-up draft.
- Communication classification.
- Lead handoff support.

ResponseOS must not:

- Become the source of truth for CRM records.
- Become the source of truth for Job state.
- Approve invoices.
- Send final client-facing commitments without human review.
- Dispatch contractors.
- Modify QuickBooks.
- Override FLR alerts, approvals, or audit logs.

Recommended flow:

```txt
Phone / Website / Email
  -> ResponseOS pilot where applicable
  -> HubSpot CRM intake
  -> FLR operational handoff
  -> Dashboard / Agents / Workflows
  -> QuickBooks accounting truth
```

## 13. Non-Goals

This document does not authorize:

- HubSpot setup.
- HubSpot API integration.
- HubSpot custom objects.
- QuickBooks integration.
- ResponseOS integration.
- CRM data migration.
- App code.
- Database migrations.
- n8n workflows.
- Secrets or credentials.
- Firebase.
- Automated invoice release.
- Automated contractor dispatch.
- Automated client communication without human approval.
- Replacing QuickBooks as the accounting ledger.
- Replacing FLR operational source-of-truth records with HubSpot stages.

## 14. Acceptance Criteria

This integration model is accepted when:

- It defines HubSpot as the CRM intake and sales visibility layer.
- It defines QuickBooks as the final accounting ledger.
- It defines the FLR platform as the operational source of truth.
- It maps FLR domain objects to HubSpot MVP objects using standard objects first.
- It defines sales and service/job pipeline recommendations.
- It defines lead intake, job handoff, and invoice handoff workflows.
- It preserves communication sync rules and first-class FLR Communication records.
- It keeps contractor data, dispatch, documentation, alerts, approvals, agents, and contractor portal ownership inside FLR.
- It defines ResponseOS as a pilot/intake assistant boundary, not source of truth.
- It avoids HubSpot custom objects for MVP unless plan support and a later approval exist.
- It does not introduce code, integrations, secrets, Firebase, or live third-party changes.

## Official References Checked

- HubSpot object model overview: https://knowledge.hubspot.com/records/understand-objects
- HubSpot CRM object APIs and object type IDs: https://developers.hubspot.com/docs/api-reference/latest/crm/using-object-apis
