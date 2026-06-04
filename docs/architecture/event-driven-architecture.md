# Event-Driven Architecture

Status: Git Spec-Ready Draft
Owner: AJ Digital LLC / Audio Jones
Repo: `AudioJones-Dev/florida-ramp-and-lift-ops`
Scope: Florida Ramp & Lift Operational Intelligence Platform
Last updated: 2026-06-04

## 1. Event Doctrine

The Florida Ramp & Lift platform should react to business events, not table changes or dashboard button clicks.

Events connect:

- Domain state transitions.
- Dashboard updates.
- Agent triggers.
- Alerts.
- Approvals.
- Audit logs.
- Future automations.
- Portal notifications.

Events are the connective tissue between the canonical data model and the operational state machine.

## 2. Why Events Matter

Events make the system coherent.

Without events:

- Dashboards infer status inconsistently.
- Agents poll tables or duplicate business logic.
- Alerts become ad hoc queries.
- Automations fire from fragile UI actions.
- Audit trails lose the reason a business state changed.

With events:

- State changes become observable.
- Agents listen to defined triggers.
- Dashboards update from canonical business facts.
- Alerts can be derived, persisted, assigned, acknowledged, escalated, and resolved.
- Human approval boundaries are enforceable.
- Future n8n/webhook/integration work can subscribe to a stable architecture without becoming the product backend.

## 3. Event Naming Convention

Event names must be past-tense business facts.

Use:

```txt
<Object><PastTenseAction>
```

Examples:

- `LeadCreated`
- `LeadQualified`
- `CommunicationReceived`
- `CommunicationRequiresFollowUp`
- `JobCreated`
- `JobScheduled`
- `JobAssigned`
- `ContractorAcceptedAssignment`
- `ContractorRejectedAssignment`
- `JobStarted`
- `JobCompleted`
- `DocumentationSubmitted`
- `DocumentationApproved`
- `DocumentationRejected`
- `InvoiceDraftCreated`
- `InvoiceReadyForReview`
- `InvoiceApproved`
- `InvoiceSent`
- `PaymentReceived`
- `ContractorPayoutCalculated`
- `ContractorPayoutApproved`
- `AlertCreated`
- `AlertAcknowledged`
- `AlertEscalated`
- `AlertResolved`
- `ApprovalRequested`
- `ApprovalGranted`
- `ApprovalRejected`

Do not name events after UI actions, buttons, implementation methods, or vendor webhooks unless they are wrapped into a business event.

Bad examples:

- `ClickedApproveButton`
- `UpdatedRow`
- `WebhookReceived`
- `CronRan`

Good examples:

- `InvoiceApproved`
- `JobAssigned`
- `CommunicationRequiresFollowUp`
- `DocumentationRejected`

## 4. Event Record Schema

Future implementation should use a durable event record shape similar to:

```json
{
  "event_id": "uuid",
  "organization_id": "uuid",
  "event_name": "JobScheduled",
  "event_family": "job",
  "source_object_type": "Job",
  "source_object_id": "uuid",
  "source_previous_state": "pending",
  "source_next_state": "scheduled",
  "actor_type": "human",
  "actor_id": "uuid",
  "occurred_at": "iso-8601-datetime",
  "idempotency_key": "Job:uuid:pending:scheduled:timestamp-or-version",
  "correlation_id": "uuid",
  "causation_id": "uuid",
  "approval_id": "uuid-or-null",
  "alert_id": "uuid-or-null",
  "audit_log_id": "uuid-or-null",
  "payload": {},
  "metadata": {}
}
```

### Required Event Fields

- `event_id`
- `organization_id`
- `event_name`
- `event_family`
- `source_object_type`
- `source_object_id`
- `actor_type`
- `actor_id`
- `occurred_at`
- `idempotency_key`

### Recommended Event Fields

- `source_previous_state`
- `source_next_state`
- `correlation_id`
- `causation_id`
- `approval_id`
- `alert_id`
- `audit_log_id`
- `payload`
- `metadata`

## 5. Event Sources

Events may be produced by:

| Source | Examples | Rule |
|---|---|---|
| Human users | Office Admin schedules Job; Michael approves Invoice. | Must respect role and object permissions. |
| AI agents | Agent recommends alert or draft approval packet. | May recommend or draft; may not approve sensitive actions. |
| System workflows | Task overdue threshold; alert threshold crossed. | Must log actor as system. |
| Future integrations | Email received, SMS delivery event, payment update. | Must be normalized into business events. |
| Future n8n workflows | Follow-up reminder, webhook orchestration. | n8n may orchestrate but not own source-of-truth state. |

## 6. Event Consumers

Events may be consumed by:

| Consumer | Use |
|---|---|
| Centralized Control Dashboard | Update counts, queues, drilldowns, and alert surfaces. |
| Executive Portal | Surface approvals, risk, revenue, follow-ups, and briefings. |
| Support Admin Portal | Monitor data quality, agent behavior, workflow QA, and system configuration. |
| Office/Admin Portal | Manage intake, scheduling, documentation review, and follow-up. |
| Dispatch Portal | Track schedule readiness, assignments, and blockers. |
| Contractor Portal | Show assigned Jobs, dispatch release, documentation requests, and payout status when released. |
| Future Client Portal | Show released estimates, invoices, job status, and documents. |
| Agents | React to state changes with summaries, drafts, flags, and recommendations. |
| Alert engine | Derive runtime alerts and persist threshold-crossing alerts. |
| Approval engine | Request, route, and resolve human approvals. |
| AuditLog | Record sensitive transitions, access, approvals, releases, overrides, and agent actions. |
| Future automation layer | n8n/webhooks/email/SMS/CRM/accounting integrations after approval. |

## 7. State Transition Events

State transition events are emitted when a canonical object changes lifecycle state.

| Event | Trigger Condition | Source Object | Actor | Consumer | Dashboard Effect | Agent Effect | Audit Requirement | Human Approval Requirement |
|---|---|---|---|---|---|---|---|---|
| `LeadCreated` | Lead enters `new`. | Lead | human/system/integration future | Dashboard, CRM Agent | Adds to lead intake/follow-up queue. | CRM Agent summarizes and checks missing fields. | Audit source and actor. | No. |
| `LeadQualified` | Lead moves to `qualified`. | Lead | human | Dashboard, Executive Assistant, CRM Agent | Moves lead into opportunity/action queue. | Executive Assistant may summarize value/risk. | Audit qualification. | Yes, human review. |
| `JobCreated` | Job enters `pending`. | Job | human/system | Dashboard, Dispatch Agent, Documentation Agent | Adds to open jobs. | Dispatch readiness check begins. | Audit creation and source. | Intake review required before scheduling if source incomplete. |
| `JobScheduled` | Job moves to `scheduled`. | Job | dispatcher/office_admin | Dashboard, Dispatch Agent | Adds to jobs scheduled today/future. | Dispatch Agent suggests crew/route readiness. | Audit schedule date/window. | Human scheduling review. |
| `JobAssigned` | Job moves to `assigned`. | Job / DispatchAssignment | dispatcher | Dashboard, Contractor Portal future | Shows crew assignment and dispatch status. | Skill/PPE match checks run. | Audit crew assignment. | Human review required before external dispatch release. |
| `JobStarted` | Job or DispatchAssignment moves to `in_progress`. | Job / DispatchAssignment | contractor/lead_installer | Dashboard, Documentation Agent | Shows active work. | Documentation checklist starts. | Audit start actor/time. | Safety exceptions require review. |
| `JobCompleted` | Job work is marked complete before evidence review. | Job | contractor/lead_installer | Dashboard, Documentation Agent | Moves toward documentation review. | Documentation completeness check. | Audit completion claim. | No final approval yet. |

## 8. Dashboard Update Events

Dashboard update events may be direct state events or derived read-model updates.

| Event | Trigger Condition | Source Object | Actor | Consumer | Dashboard Effect | Agent Effect | Audit Requirement | Human Approval Requirement |
|---|---|---|---|---|---|---|---|---|
| `DashboardMetricUpdated` | Derived dashboard metric changes. | Any source object | system | Dashboard | Updates cards/counts. | None by default. | Not required unless sensitive. | No. |
| `ExecutiveBriefingReady` | Scheduled briefing or critical threshold reached. | Alert/Invoice/Job/Communication | system/agent | Executive Portal | Shows briefing item. | Executive Assistant prepares summary. | Audit if agent-generated. | Human review before external action. |
| `ApprovalQueueUpdated` | Approval requested/resolved. | Approval | system | Dashboard/Executive Portal | Updates approval queue. | Agents may summarize evidence. | Audit approval state. | Approval decision requires authorized human. |
| `ContractorPortalUpdated` | Assignment/documentation/payout state released to contractor. | DispatchAssignment/Job/ContractorPayout | system/human | Contractor Portal | Shows assigned work or released payout status. | None by default. | Audit release. | Human release gate where sensitive. |

## 9. Agent Trigger Events

Agents listen to business events and produce drafts, recommendations, alerts, tasks, or approval packets.

| Event | Trigger Condition | Source Object | Actor | Consumer | Dashboard Effect | Agent Effect | Audit Requirement | Human Approval Requirement |
|---|---|---|---|---|---|---|---|---|
| `CommunicationReceived` | Inbound communication recorded. | Communication | human/system/integration future | CRM Agent, Executive Assistant | Adds to communication history. | Classify, summarize, detect follow-up need. | Audit source. | No, unless response is sent. |
| `CommunicationRequiresFollowUp` | Communication remains unanswered beyond threshold or is marked follow-up required. | Communication | system/human/agent recommendation | CRM Agent, Alert Agent, Dashboard | Adds to missed follow-up queue. | Draft follow-up task or response. | Audit threshold and owner. | Human approval before send. |
| `InvoiceReadyForReview` | Invoice enters `needs_review` or Job/WorkOrder becomes invoice-ready. | Invoice/Job/WorkOrder | system/finance | Invoice Agent, Finance Dashboard | Adds to invoice review queue. | Prepare readiness packet and missing-doc flags. | Audit source records. | Human review required. |
| `AlertCreated` | Alert persists after threshold. | Alert | system/human/agent recommendation | Alert Agent, Dashboard | Adds to alert queue. | Recommend owner/severity/action. | Audit creation and source. | Critical alert acknowledgement required. |
| `ApprovalRequested` | Sensitive transition needs human decision. | Approval | system/human/agent recommendation | Executive Assistant, relevant domain agent | Adds to approval queue. | Prepare context packet. | Audit request. | Authorized human must decide. |

## 10. Alert Generation Events

Alert events are generated from missing, stale, blocked, high-risk, or threshold-crossing states.

| Event | Trigger Condition | Source Object | Actor | Consumer | Dashboard Effect | Agent Effect | Audit Requirement | Human Approval Requirement |
|---|---|---|---|---|---|---|---|---|
| `AlertCreated` | Runtime condition crosses persistence threshold. | Any object | system/agent recommendation/human | Dashboard, Alert Agent | Adds to central alert queue. | Suggest severity/owner. | Audit source rule. | Critical alerts need acknowledgement. |
| `AlertAcknowledged` | Human acknowledges alert. | Alert | human | Dashboard, AuditLog | Moves alert out of unacknowledged state. | May suggest next task. | Audit actor/time. | Required for critical alerts. |
| `AlertEscalated` | Alert requires higher authority. | Alert | human/system by threshold | Dashboard, Executive Assistant | Shows in executive risk view. | Prepare escalation brief. | Audit reason/escalation path. | Human review for critical escalations. |
| `AlertResolved` | Alert issue handled. | Alert | human | Dashboard, AuditLog | Clears active blocker. | Agent may summarize resolution. | Audit resolution notes. | Human required for critical safety/financial alerts. |

## 11. Approval Events

Approval events govern sensitive transitions.

| Event | Trigger Condition | Source Object | Actor | Consumer | Dashboard Effect | Agent Effect | Audit Requirement | Human Approval Requirement |
|---|---|---|---|---|---|---|---|---|
| `ApprovalRequested` | Sensitive action needs approval. | Approval | human/system/agent recommendation | Dashboard, approver portal | Adds to approval queue. | Agent prepares evidence packet. | Audit request. | Pending. |
| `ApprovalGranted` | Authorized human approves. | Approval | human | Source workflow, Dashboard | Enables target transition. | Agent may proceed with draft next step only if allowed. | Audit approver/time/notes. | Required and satisfied. |
| `ApprovalRejected` | Authorized human rejects. | Approval | human | Source workflow, Dashboard | Blocks target transition. | Agent may recommend correction task. | Audit rejection reason. | Required and denied. |
| `ApprovalHeld` | Approver pauses decision. | Approval | human | Dashboard | Shows blocked approval. | Agent may summarize missing info. | Audit hold reason. | Still required. |

## 12. Financial Events

Financial events require strict separation between client-facing invoices, contractor-facing payouts, and internal financial data.

| Event | Trigger Condition | Source Object | Actor | Consumer | Dashboard Effect | Agent Effect | Audit Requirement | Human Approval Requirement |
|---|---|---|---|---|---|---|---|---|
| `InvoiceDraftCreated` | Invoice draft created. | Invoice | finance/system future | Finance Dashboard, Invoice Agent | Adds draft invoice. | Validate readiness. | Audit draft source. | No external send. |
| `InvoiceReadyForReview` | Invoice enters `needs_review`. | Invoice | finance/system | Finance Dashboard, Invoice Agent | Adds to invoice review queue. | Missing-doc/rate anomaly checks. | Audit readiness source. | Human review required. |
| `InvoiceApproved` | Invoice approved. | Invoice/Approval | human | Dashboard, AuditLog | Moves to approved/release queue. | Agent may prepare release packet. | Audit approval. | Michael Keegan for MVP client-facing release. |
| `InvoiceSent` | Invoice released externally. | Invoice/Communication | human/system after approval future | Dashboard, AuditLog, Communication | Updates outstanding invoices. | Follow-up timer may start. | Audit release and approval link. | Client-facing release requires prior approval. |
| `PaymentReceived` | Payment recorded/reconciled. | Invoice | finance/system future | Dashboard | Updates revenue/paid status. | Executive summary update. | Audit source. | Reconciliation rules outside MVP. |
| `ContractorPayoutCalculated` | Payout draft calculated. | ContractorPayout | finance/system | Finance Dashboard, Contractor Billing Agent | Adds payout draft. | Split/anomaly check. | Audit calculation basis. | No release. |
| `ContractorPayoutApproved` | Payout approved. | ContractorPayout/Approval | human | Finance Dashboard, Contractor Portal future | Moves to release/payment queue. | Agent stops approval prompts. | Audit approver. | Human approval required. |

## 13. Contractor Portal Events

Contractor portal events expose only assigned or released contractor-scoped information.

| Event | Trigger Condition | Source Object | Actor | Consumer | Dashboard Effect | Agent Effect | Audit Requirement | Human Approval Requirement |
|---|---|---|---|---|---|---|---|---|
| `JobAssigned` | Contractor assigned to Job. | Job/DispatchAssignment | dispatcher | Contractor Portal, Dispatch Dashboard | Shows assigned job after release rules. | Dispatch Agent watches acceptance. | Audit assignment. | Dispatch release requires approval. |
| `ContractorAcceptedAssignment` | Contractor accepts assignment. | DispatchAssignment | contractor | Dispatch Dashboard | Shows accepted assignment. | Dispatch Agent clears acceptance blocker. | Audit contractor action. | No. |
| `ContractorRejectedAssignment` | Contractor rejects/declines assignment. | DispatchAssignment | contractor | Dispatch Dashboard, Alert Agent | Shows staffing blocker. | Dispatch Agent recommends replacement/escalation. | Audit rejection reason. | Human dispatch review required. |
| `JobStarted` | Contractor starts job. | Job | contractor/lead_installer | Dashboard | Shows active job. | Documentation Agent begins checklist. | Audit start. | Safety exceptions still require review. |
| `JobCompleted` | Contractor marks work complete. | Job | contractor/lead_installer | Dashboard, Documentation Agent | Moves toward documentation review. | Completeness check. | Audit completion claim. | No final approval yet. |

## 14. Communication Events

Communications are first-class records before live integrations.

| Event | Trigger Condition | Source Object | Actor | Consumer | Dashboard Effect | Agent Effect | Audit Requirement | Human Approval Requirement |
|---|---|---|---|---|---|---|---|---|
| `CommunicationReceived` | Manual/mock/future integrated communication recorded. | Communication | human/system/integration future | Dashboard, CRM Agent | Adds to communication history. | Summarize/classify. | Audit source. | No. |
| `CommunicationRequiresFollowUp` | Communication marked follow-up or exceeds response threshold. | Communication | human/system/agent recommendation | Dashboard, CRM Agent, Alert Agent | Adds to missed follow-up queue. | Draft task/response. | Audit threshold. | Human approval before send. |
| `CommunicationDraftCreated` | Draft response created. | Communication | human/agent | Office/Admin Portal | Adds to review queue. | Agent may draft. | Audit draft actor. | Human approval before external send. |
| `CommunicationSent` | Approved communication sent. | Communication | human/system after approval future | Dashboard, AuditLog | Starts response/delivery follow-up. | Agent may monitor response. | Audit approval/send link. | Required for external send. |

## 15. Documentation Events

Documentation events drive closeout, invoice readiness, safety/compliance, and contractor portal flow.

| Event | Trigger Condition | Source Object | Actor | Consumer | Dashboard Effect | Agent Effect | Audit Requirement | Human Approval Requirement |
|---|---|---|---|---|---|---|---|---|
| `DocumentationSubmitted` | Contractor/admin submits required artifact. | DocumentationArtifact | contractor/lead_installer/office_admin | Dashboard, Documentation Agent | Adds to documentation review. | Completeness check. | Audit upload/source. | Review required for billing/safety evidence. |
| `DocumentationApproved` | Artifact accepted. | DocumentationArtifact/Approval | human | Dashboard, Invoice Agent | Clears missing-doc blocker. | Invoice Agent rechecks readiness. | Audit approver/time. | Required for critical evidence. |
| `DocumentationRejected` | Artifact rejected. | DocumentationArtifact | human | Dashboard, Contractor Portal future | Creates correction need. | Documentation Agent recommends task. | Audit rejection reason. | Human review required. |
| `PhotosUploaded` | Photo artifact submitted. | DocumentationArtifact | contractor/lead_installer | Dashboard, Documentation Agent | Updates proof-of-work status. | Photo completeness rules may run. | Audit upload metadata. | Review required before job approval if required. |

## 16. Audit Log Relationship

Events and AuditLog are related but not identical.

| Record | Purpose |
|---|---|
| Event | Announces that a business fact occurred and can be consumed by dashboards, agents, alerts, approvals, and automations. |
| AuditLog | Preserves accountability for sensitive or important actions. |

Rules:

- Sensitive events must link to AuditLog.
- Approval events must link to AuditLog.
- Financial events must link to AuditLog.
- External communication events must link to AuditLog.
- Agent-generated recommendations should be auditable when they influence workflow.
- AuditLog should be append-only.

## 17. Human Approval Boundaries

Events may signal readiness, but readiness is not approval.

Human approval remains required before:

- Client-facing invoice release.
- Contractor payout approval/release.
- Financial adjustment, rate override, split override, or surcharge change.
- External customer/client/contractor communication send.
- Dispatch instruction external send.
- Job submitted -> approved.
- Documentation approval for billing/safety evidence.
- Safety exception dismissal.
- Critical Alert dismissal/resolution.
- Live CRM/accounting writeback.
- Any action involving secrets, credentials, or sensitive documents.

MVP decision: Michael Keegan has final authority for client-facing invoice release.

## 18. Idempotency Rules

Events must be safe to process more than once.

Rules:

- Every event must have an `idempotency_key`.
- Consumers must ignore duplicate events with the same `idempotency_key`.
- State transition events should include previous and next state.
- Event handlers should verify the source object is still in the expected state before mutating anything.
- Approval events must not grant duplicate approvals.
- Invoice and payout events must not duplicate financial records.
- Communication send events must not send duplicate external messages.
- Alert creation should update or reuse an active alert when the same source/rule is already open.

Recommended idempotency key pattern:

```txt
<source_object_type>:<source_object_id>:<event_name>:<source_version_or_transition_id>
```

## 19. Retry And Failure Rules

Events should support controlled retry without hiding failures.

Rules:

- Transient failures may retry with backoff.
- Permanent failures should create Alert and Task records.
- Failed external sends should not mark Communication as `sent`.
- Failed invoice release should not mark Invoice as `sent`.
- Failed dashboard read-model updates should not change source-of-truth state.
- Failed agent runs should not block human operators from continuing manually.
- Failed automations must be visible to Support Admin.
- n8n/workflow failure should never corrupt canonical source records.

Failure event examples:

- `EventProcessingFailed`
- `AgentRunFailed`
- `CommunicationSendFailed`
- `InvoiceSendFailed`
- `DashboardProjectionFailed`
- `AutomationWorkflowFailed`

## 20. Non-Goals

This document does not authorize:

- Event bus implementation.
- App code.
- Database migrations.
- n8n workflows.
- Webhook integrations.
- AI runtime calls.
- Twilio/Resend setup.
- Supabase/Neon setup.
- Clerk setup.
- Vercel deployment.
- Firebase.
- Secrets in repo.
- Automated financial, legal, safety, dispatch, or client-facing approvals.

## 21. Acceptance Criteria

This event-driven architecture is accepted when:

- It defines event doctrine and why events matter.
- It defines event naming conventions and event record schema.
- It identifies event sources and consumers.
- It covers state transition, dashboard, agent, alert, approval, financial, contractor portal, communication, and documentation event families.
- It includes all required event examples.
- Each event family defines trigger condition, source object, actor, consumer, dashboard effect, agent effect, audit requirement, and human approval requirement.
- It ties sensitive events to AuditLog and Approval where required.
- It defines idempotency, retry, and failure rules.
- It preserves Michael Keegan's MVP invoice-release authority.
- It treats communications as first-class records and alerts as hybrid runtime/persisted records.
- It does not introduce app code, integrations, secrets, Firebase, or runtime setup.
