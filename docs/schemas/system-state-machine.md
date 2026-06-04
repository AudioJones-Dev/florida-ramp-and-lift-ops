# System State Machine

Status: Draft
Owner: AJ Digital LLC / Audio Jones
Scope: Florida Ramp & Lift Operational Intelligence Platform

## Purpose

This document defines the operating-state model for the Florida Ramp & Lift platform.

The system should be driven by state transitions, not isolated CRUD actions. Agents, workflows, dashboard alerts, review gates, and future automations should react to records entering or leaving defined states.

## Doctrine

- State changes are business events.
- Sensitive state changes require explicit human approval.
- Agents may recommend transitions but may not execute approval-sensitive transitions.
- Each transition should record actor, timestamp, previous state, next state, reason, and related Approval when required.
- Runtime alerts may be derived from state; persisted alerts should record threshold-crossing issues.

## End-to-End Operating Flow

```txt
Lead
  -> Qualified
  -> Estimate Sent
  -> Approved
  -> Scheduled
  -> In Progress
  -> Documentation Review
  -> Invoice Review
  -> Invoice Sent
  -> Paid
  -> Closed
```

This is a conceptual flow. Actual records may move through Lead, Job, WorkOrder, Dispatch, Documentation, Invoice, Payout, Communication, Task, Alert, and Approval state machines.

## Lead State Machine

| State | Meaning | Allowed Next States | Approval Gate |
|---|---|---|---|
| `new` | Lead received but not reviewed. | `contact_needed`, `qualified`, `lost` | Human review before conversion. |
| `contact_needed` | Follow-up required. | `qualified`, `lost`, `closed` | Human or approved workflow. |
| `qualified` | Opportunity appears valid. | `estimate_needed`, `converted_to_job`, `lost` | Human review. |
| `estimate_needed` | Estimate must be prepared. | `estimate_sent`, `held`, `lost` | Estimate send requires approval. |
| `estimate_sent` | Estimate sent or prepared for send. | `approved`, `lost`, `held` | External send requires approval. |
| `approved` | Customer/client approved next step. | `converted_to_job`, `closed` | Human confirmation. |
| `converted_to_job` | Job created from Lead. | `closed` | Conversion requires review. |
| `lost` | Opportunity not proceeding. | `closed`, `reopened` | Reason required. |
| `closed` | Lead lifecycle complete. | `reopened` | Reopen requires reason. |

## Job State Machine

| State | Meaning | Allowed Next States | Approval Gate |
|---|---|---|---|
| `pending` | Job exists but is not scheduled. | `scheduled`, `on_hold`, `cancelled` | Intake review required. |
| `scheduled` | Job assigned to date/crew. | `in_progress`, `on_hold`, `cancelled`, `return_needed` | Dispatch review before crew send. |
| `in_progress` | Crew is executing work. | `submitted`, `incomplete`, `return_needed`, `on_hold` | Safety exceptions require review. |
| `submitted` | Crew submitted completion/evidence. | `approved`, `incomplete`, `return_needed`, `on_hold` | Completion review required. |
| `approved` | Admin approved for billing. | `invoiced`, `on_hold` | Invoice review before invoice action. |
| `invoiced` | Included in invoice. | `paid`, `on_hold` | Payment/reconciliation outside MVP. |
| `paid` | Financial lifecycle complete. | `closed_future` | Future closed state may be added. |
| `incomplete` | Work incomplete. | `scheduled`, `return_needed`, `on_hold`, `cancelled` | Human triage required. |
| `return_needed` | Future visit required. | `scheduled`, `on_hold`, `cancelled` | Human review. |
| `on_hold` | Paused for triage. | Any valid prior workflow state | Hold release requires reason. |
| `cancelled` | No further work. | `reopened_future` | Cancellation reason required. |

## WorkOrder State Machine

| State | Meaning | Allowed Next States | Approval Gate |
|---|---|---|---|
| `received` | Work order received. | `parsed`, `needs_review`, `rejected` | Human review for nonstandard source. |
| `parsed` | Parser or manual extraction created draft data. | `needs_review`, `accepted`, `rejected` | Acceptance requires review. |
| `needs_review` | Missing or ambiguous data. | `accepted`, `held`, `rejected` | Human resolution. |
| `accepted` | Work order is valid for operations. | `scheduled`, `completed`, `held` | Admin acceptance. |
| `scheduled` | Related jobs scheduled. | `completed`, `held` | Dispatch gates apply. |
| `completed` | Work completed. | `invoice_ready`, `held` | Documentation review. |
| `invoice_ready` | Ready for financial review. | `invoiced`, `held` | Financial review. |
| `invoiced` | Included in client invoice. | `closed`, `held` | Client invoice release approval. |
| `closed` | Work order lifecycle complete. | `reopened_future` | Reopen requires reason. |

## Dispatch State Machine

| State | Meaning | Allowed Next States | Approval Gate |
|---|---|---|---|
| `draft` | Dispatch package being prepared. | `needs_review`, `cancelled` | No external send. |
| `needs_review` | Missing data or ready for review. | `approved`, `held`, `revised` | Human review. |
| `approved` | Ready to send to crew. | `sent`, `revised`, `held` | Human approval required. |
| `sent` | Dispatch instructions sent. | `in_progress`, `revised` | Future integration only. |
| `in_progress` | Crew day active. | `completed`, `held`, `revised` | Exceptions require review. |
| `completed` | Dispatch day complete. | `closed_future` | Closeout review. |
| `held` | Paused. | `needs_review`, `cancelled` | Release reason required. |
| `revised` | Changed after prior draft/approval. | `needs_review`, `approved` | Re-approval may be required. |

## Documentation State Machine

| State | Meaning | Allowed Next States | Approval Gate |
|---|---|---|---|
| `required` | Evidence is required. | `missing`, `submitted` | None. |
| `missing` | Required evidence not present. | `submitted`, `held` | Blocks approval when required. |
| `submitted` | Evidence submitted. | `needs_review`, `approved`, `rejected` | Review required for billing/safety evidence. |
| `needs_review` | Evidence needs human decision. | `approved`, `rejected`, `held` | Human review. |
| `approved` | Evidence accepted. | `archived` | Approval record recommended. |
| `rejected` | Evidence not accepted. | `submitted`, `held` | Reason required. |
| `held` | Paused for exception. | `needs_review`, `approved`, `rejected` | Human review. |

## Invoice State Machine

| State | Meaning | Allowed Next States | Approval Gate |
|---|---|---|---|
| `draft` | Invoice draft exists. | `needs_review`, `voided` | No external send. |
| `needs_review` | Invoice requires reviewer decision. | `approved`, `edited`, `held`, `rejected` | Human review. |
| `approved` | Approved for release or downstream handling. | `sent`, `held`, `voided` | Michael Keegan for MVP client invoices. |
| `edited` | Reviewer changed invoice. | `needs_review`, `approved` | Re-review recommended. |
| `held` | Paused for issue. | `needs_review`, `approved`, `rejected` | Reason required. |
| `rejected` | Invoice not accepted. | `draft`, `voided` | Reason required. |
| `sent` | Client invoice sent or future contractor invoice delivered. | `delivered`, `paid`, `held` | Future integration only. |
| `delivered` | Delivery confirmed. | `paid`, `held` | Future integration only. |
| `paid` | Payment/reconciliation complete. | `closed_future` | Accounting reconciliation outside MVP. |
| `voided` | Invoice cancelled. | `draft_future` | Reason required. |

## Alert State Machine

| State | Meaning | Allowed Next States | Approval Gate |
|---|---|---|---|
| `open` | Alert exists and needs action. | `acknowledged`, `assigned`, `dismissed`, `resolved` | Critical alerts require human acknowledgement. |
| `acknowledged` | Human saw the alert. | `assigned`, `resolved`, `escalated` | Human action. |
| `assigned` | Owner is accountable. | `resolved`, `escalated`, `dismissed` | Dismissal reason required. |
| `escalated` | Higher-level attention required. | `resolved`, `assigned` | Owner/Executive review. |
| `resolved` | Issue handled. | `reopened` | Resolution notes required. |
| `dismissed` | Determined not actionable. | `reopened` | Reason required. |
| `reopened` | Alert returned to active state. | `assigned`, `resolved`, `escalated` | Reason required. |

## Transition Event Requirements

Every state transition should record:

- Source object type.
- Source object ID.
- Previous state.
- Next state.
- Actor type: human, agent, system.
- Actor ID.
- Timestamp.
- Reason or note.
- Related Approval ID when required.
- Related Alert ID when generated.

## Agent Reaction Rules

- Agents may react to state changes by preparing summaries, drafts, validation reports, tasks, and alerts.
- Agents may not execute approval-sensitive transitions.
- Agent recommendations should include source object references and confidence/uncertainty notes.
- Human decisions should be recorded as Approval records, not hidden in agent output.
