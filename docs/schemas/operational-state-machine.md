# Operational State Machine

Status: Git Spec-Ready Draft
Owner: AJ Digital LLC / Audio Jones
Repo: `AudioJones-Dev/florida-ramp-and-lift-ops`
Scope: Florida Ramp & Lift Operational Intelligence Platform
Last updated: 2026-06-04

## 1. Purpose

This document defines how Florida Ramp & Lift operational objects move through the system.

The canonical data schema defines what each object is. This operational state machine defines how those objects move, who can move them, which events fire, which dashboards update, which agents react, and where human approval is required.

The platform should be driven by state transitions, not isolated CRUD actions.

## 2. State Machine Doctrine

- State changes are business events.
- Every important transition should create an event and audit trail.
- Dashboards read state. They do not invent state.
- Agents react to state changes. They do not own final authority.
- Humans approve sensitive state transitions.
- Alerts are derived from missing, stale, blocked, high-risk, or threshold-crossing states.
- Approval records are the canonical proof that a human authorized a sensitive transition.
- AuditLog records are the canonical trace of who or what changed state.
- n8n, agents, and future integrations may orchestrate workflow, but the app database remains the source of truth.

## 3. Canonical End-To-End Flow

```txt
Lead
  -> Qualified
  -> Estimate Requested
  -> Estimate Sent
  -> Estimate Approved
  -> Scheduled
  -> Assigned
  -> In Progress
  -> Documentation Review
  -> Invoice Review
  -> Invoice Approved
  -> Invoice Sent
  -> Paid
  -> Closed
```

This flow spans multiple objects:

| Flow Step | Primary Object | Supporting Objects |
|---|---|---|
| Lead | Lead | Customer, Communication, Task |
| Qualified | Lead | Customer, Location, Communication |
| Estimate Requested | Lead | Task, Approval, Communication |
| Estimate Sent | Lead / Communication | Approval, AuditLog |
| Estimate Approved | Lead | Approval, Communication |
| Scheduled | Job | WorkOrder, Location, Contractor |
| Assigned | DispatchAssignment | Job, Contractor, Location |
| In Progress | Job / DispatchAssignment | Contractor, DocumentationArtifact |
| Documentation Review | DocumentationArtifact / Job | Approval, Alert |
| Invoice Review | Invoice | Job, WorkOrder, DocumentationArtifact |
| Invoice Approved | Invoice / Approval | Michael Keegan for MVP client invoice release |
| Invoice Sent | Invoice / Communication | AuditLog |
| Paid | Invoice / ContractorPayout | AuditLog |
| Closed | Job / WorkOrder / Invoice | AuditLog |

## 4. Transition Record Requirements

Every state transition should record:

- `transition_id`
- `organization_id`
- `object_type`
- `object_id`
- `previous_state`
- `next_state`
- `transition_event`
- `actor_type`: `human`, `ai_agent`, `system`, `integration`
- `actor_id`
- `occurred_at`
- `reason`
- `approval_id` when required
- `alert_id` when generated or resolved
- `audit_log_id`

Approval-sensitive transitions must not be represented only by a status field update.

## 5. Event Naming Convention

Events should use past-tense business names:

- `LeadCreated`
- `LeadQualified`
- `EstimateRequested`
- `EstimateSent`
- `EstimateApproved`
- `JobCreated`
- `JobScheduled`
- `JobAssigned`
- `DispatchApproved`
- `DispatchSent`
- `JobStarted`
- `JobTransferRequested`
- `JobTransferApproved`
- `JobTransferred`
- `PhotosUploaded`
- `DocumentationSubmitted`
- `DocumentationApproved`
- `JobApproved`
- `InvoiceGenerated`
- `InvoiceApproved`
- `InvoiceSent`
- `PaymentReceived`
- `ContractorPayoutApproved`
- `AlertCreated`
- `AlertAcknowledged`
- `AlertResolved`
- `ApprovalRequested`
- `ApprovalGranted`
- `ApprovalRejected`

Event naming should describe what happened, not the button clicked.

## 6. Lead State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `new` | Lead exists but has not been reviewed. | `contact_needed`, `qualified`, `lost`, `closed` | `LeadCreated` | Office Admin | No | CRM Agent summarizes and flags missing contact fields. |
| `contact_needed` | Human follow-up is required. | `qualified`, `lost`, `closed` | `LeadFollowUpNeeded` | Office Admin | No | CRM Agent creates follow-up task recommendation. |
| `qualified` | Lead appears valid and actionable. | `estimate_requested`, `converted_to_job`, `lost` | `LeadQualified` | Office Admin / Owner | Human review | Executive Assistant may summarize value/risk. |
| `estimate_requested` | Estimate or pricing review is needed. | `estimate_sent`, `held`, `lost` | `EstimateRequested` | Office Admin / Owner | Human review | AI may prepare estimate packet, not send. |
| `estimate_sent` | Estimate has been approved and sent. | `estimate_approved`, `lost`, `held` | `EstimateSent` | Owner / Office Admin | Approval before send | Communication draft agent watches for response. |
| `estimate_approved` | Customer approved the work. | `converted_to_job`, `closed` | `EstimateApproved` | Owner / Office Admin | Human confirmation | CRM Agent recommends Job creation. |
| `converted_to_job` | Lead produced a Job. | `closed` | `LeadConvertedToJob` | Office Admin | Required | Dashboard removes from active lead queue. |
| `lost` | Lead is not proceeding. | `closed`, `reopened` | `LeadLost` | Office Admin | Reason required | Agent may summarize lost reason. |
| `held` | Lead is paused for missing info or decision. | `contact_needed`, `qualified`, `lost` | `LeadHeld` | Office Admin | Reason required | Alert may be created after threshold. |
| `closed` | Lead lifecycle complete. | `reopened` | `LeadClosed` | Office Admin | Reason for reopen | No active trigger. |

## 7. Communication State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `new` | Communication record created. | `needs_review`, `received`, `resolved`, `unanswered` | `CommunicationCreated` | Office Admin | No | Communication classifier runs. |
| `received` | Inbound message/call/note received. | `needs_review`, `unanswered`, `resolved` | `CommunicationReceived` | Office Admin | No | Follow-up detection runs. |
| `unanswered` | Response is needed and not yet sent. | `draft`, `resolved`, `held` | `CommunicationUnanswered` | Office Admin | No | Alert after threshold. |
| `draft` | Response draft exists. | `needs_review`, `approved_to_send`, `cancelled` | `CommunicationDrafted` | Office Admin | Approval before external send | Drafting agent may prepare text. |
| `needs_review` | Human must review before action. | `approved_to_send`, `held`, `cancelled`, `resolved` | `CommunicationReviewRequested` | Office Admin / Owner | Required for external send | Executive Assistant may summarize context. |
| `approved_to_send` | Human approved message send. | `sent`, `cancelled` | `CommunicationApprovedToSend` | Approver | Required | Future integration may send if enabled. |
| `sent` | External message sent. | `resolved`, `unanswered`, `held` | `CommunicationSent` | Office Admin | Approval already required | Audit and response timer starts. |
| `resolved` | Communication no longer needs action. | `reopened` | `CommunicationResolved` | Office Admin | Reason for sensitive issues | Dashboard clears follow-up. |
| `held` | Paused due to risk, missing info, or decision. | `needs_review`, `draft`, `resolved`, `cancelled` | `CommunicationHeld` | Office Admin / Owner | Reason required | Alert may escalate. |
| `cancelled` | Draft or action cancelled. | `reopened` | `CommunicationCancelled` | Office Admin | Reason required | No active trigger. |

## 8. WorkOrder State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `received` | Work order received. | `parsed`, `needs_review`, `rejected` | `WorkOrderReceived` | Office Admin | No | Parser/extraction may run. |
| `parsed` | Draft data extracted. | `needs_review`, `accepted`, `rejected` | `WorkOrderParsed` | Office Admin | Acceptance requires review | Documentation Agent flags missing fields. |
| `needs_review` | Missing or ambiguous work order data. | `accepted`, `held`, `rejected` | `WorkOrderReviewRequested` | Office Admin | Required | Alert if blocker persists. |
| `accepted` | Work order accepted for operations. | `scheduled`, `completed`, `held` | `WorkOrderAccepted` | Office Admin | Required | Job creation/check runs. |
| `scheduled` | Related work is scheduled. | `completed`, `held` | `WorkOrderScheduled` | Dispatcher | Dispatch gate applies | Dispatch Agent watches related Jobs. |
| `completed` | Work described by work order completed. | `invoice_ready`, `held` | `WorkOrderCompleted` | Office Admin | Documentation review | Invoice Agent checks readiness. |
| `invoice_ready` | Ready for invoice review. | `invoiced`, `held` | `WorkOrderInvoiceReady` | Finance | Financial review | Invoice Agent prepares packet. |
| `invoiced` | Included in client invoice. | `closed`, `held` | `WorkOrderInvoiced` | Finance | Client invoice gate applies | Dashboard updates revenue queue. |
| `held` | Paused due to blocker. | `needs_review`, `accepted`, `invoice_ready`, `rejected` | `WorkOrderHeld` | Office Admin / Finance | Reason required | Alert remains visible. |
| `rejected` | Work order unusable or invalid. | `received`, `closed` | `WorkOrderRejected` | Office Admin | Reason required | Audit only. |
| `closed` | Work order complete. | `reopened` | `WorkOrderClosed` | Office Admin / Finance | Reason for reopen | Audit only. |

## 9. Job State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `pending` | Job exists but is not scheduled. | `scheduled`, `on_hold`, `cancelled` | `JobCreated` | Office Admin | Intake review | Dispatch readiness check. |
| `scheduled` | Job has scheduled date/window. | `assigned`, `on_hold`, `cancelled`, `return_needed` | `JobScheduled` | Dispatcher | Schedule review | Dispatch Agent suggests crew. |
| `assigned` | Contractor/crew assigned. | `dispatch_ready`, `on_hold`, `cancelled` | `JobAssigned` | Dispatcher | Crew assignment review | Skill/PPE match check. |
| `dispatch_ready` | Required dispatch data is present. | `in_progress`, `on_hold`, `cancelled` | `JobDispatchReady` | Dispatcher | Dispatch send approval | Dispatch package prepared. |
| `in_progress` | Crew is executing work. | `submitted`, `incomplete`, `transfer_review`, `return_needed`, `on_hold` | `JobStarted` | Lead Installer / Contractor | Safety exceptions require review | Documentation checklist starts. |
| `submitted` | Crew submitted completion package. | `documentation_review`, `incomplete`, `transfer_review`, `return_needed`, `on_hold` | `JobSubmitted` | Contractor / Lead Installer | No final approval yet | Documentation Agent checks completeness. |
| `documentation_review` | Evidence is under review. | `approved`, `incomplete`, `transfer_review`, `return_needed`, `on_hold` | `JobDocumentationReviewStarted` | Office Admin | Required | Missing evidence alerts. |
| `approved` | Job approved for billing. | `invoice_review`, `on_hold` | `JobApproved` | Office Admin | Required | Invoice Agent checks readiness. |
| `invoice_review` | Job is being reviewed for invoice inclusion. | `invoiced`, `on_hold` | `JobInvoiceReviewStarted` | Finance | Required | Financial checks. |
| `invoiced` | Job included in Invoice. | `paid`, `on_hold` | `JobInvoiced` | Finance | Invoice approval gates apply | Dashboard updates outstanding invoices. |
| `paid` | Financial lifecycle complete. | `closed` | `JobPaid` | Finance | Reconciliation outside MVP | Executive rollup updates. |
| `closed` | Job lifecycle complete. | `reopened` | `JobClosed` | Office Admin / Finance | Reason for reopen | Audit only. |
| `incomplete` | Work incomplete. | `scheduled`, `transfer_review`, `return_needed`, `on_hold`, `cancelled` | `JobIncomplete` | Office Admin | Triage required | Alert created. |
| `transfer_review` | Work is partial or blocked and another contractor/team may need to finish the remaining scope. | `scheduled`, `assigned`, `return_needed`, `on_hold`, `cancelled` | `JobTransferRequested` | Dispatcher / Office Admin | Required | Dispatch Agent prepares continuation recommendations. |
| `return_needed` | Future visit needed. | `scheduled`, `on_hold`, `cancelled` | `JobReturnNeeded` | Office Admin / Dispatcher | Review required | Dispatch Agent watches. |
| `on_hold` | Paused for triage. | Any valid prior or next operational state | `JobHeld` | Office Admin / Owner | Reason required | Alert remains active. |
| `cancelled` | Job cancelled. | `reopened` | `JobCancelled` | Office Admin / Owner | Reason required | Audit only. |

## 10. DispatchAssignment State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `draft` | Assignment package is being prepared. | `needs_review`, `cancelled` | `DispatchDraftCreated` | Dispatcher | No external send | Dispatch Agent may draft/rebalance. |
| `needs_review` | Ready or blocked for human review. | `approved`, `held`, `revised` | `DispatchReviewRequested` | Dispatcher | Required | Missing data alerts. |
| `approved` | Approved for contractor release. | `sent`, `revised`, `held` | `DispatchApproved` | Dispatcher / Office Admin | Required | Future send workflow can queue. |
| `sent` | Dispatch instructions released. | `in_progress`, `revised` | `DispatchSent` | Dispatcher | Approval already required | Contractor portal updates. |
| `in_progress` | Crew day active. | `completed`, `held`, `revised` | `DispatchStarted` | Dispatcher / Lead Installer | Exceptions require review | Job status monitoring. |
| `completed` | Dispatch assignment complete. | `closed` | `DispatchCompleted` | Dispatcher | Closeout review | Dashboard clears active dispatch. |
| `partial_complete` | Some work was finished, but remaining scope must be transferred or rescheduled. | `transfer_requested`, `held`, `closed` | `DispatchPartiallyCompleted` | Contractor / Lead Installer | Reason required | Transfer packet is prepared. |
| `transfer_requested` | Contractor/admin requested another contractor or team to finish the remaining scope. | `needs_review`, `held`, `cancelled` | `JobTransferRequested` | Contractor / Office Admin | Dispatcher review required | Dispatch Agent suggests eligible continuation contractors. |
| `transfer_approved` | Human approved the transfer packet and remaining scope. | `transferred`, `revised`, `held` | `JobTransferApproved` | Dispatcher / Office Admin | Required | Contractor portal can show replacement assignment after release. |
| `transferred` | Original assignment is closed as transferred and a replacement assignment may be created. | `closed` | `JobTransferred` | Dispatcher | Required before replacement release | Dashboard clears original assignment but keeps audit context. |
| `revised` | Assignment changed. | `needs_review`, `approved` | `DispatchRevised` | Dispatcher | Re-approval if after approval/sent | Audit and alerts update. |
| `held` | Paused due to blocker. | `needs_review`, `cancelled` | `DispatchHeld` | Dispatcher / Office Admin | Reason required | Alert remains visible. |
| `cancelled` | Dispatch assignment cancelled. | `draft` | `DispatchCancelled` | Dispatcher | Reason required | Audit only. |
| `closed` | Assignment lifecycle complete. | `reopened` | `DispatchClosed` | Dispatcher | Reason for reopen | Audit only. |

## 11. DocumentationArtifact State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `required` | Evidence is required. | `missing`, `submitted` | `DocumentationRequired` | Office Admin | No | Documentation Agent tracks. |
| `missing` | Required evidence absent. | `submitted`, `held` | `DocumentationMissing` | Contractor / Office Admin | Blocks approval when required | Alert after threshold. |
| `submitted` | Evidence uploaded/submitted. | `needs_review`, `approved`, `rejected` | `DocumentationSubmitted` | Contractor / Lead Installer | Review for critical evidence | Completeness check runs. |
| `needs_review` | Human evidence review required. | `approved`, `rejected`, `held` | `DocumentationReviewRequested` | Office Admin / Safety reviewer | Required | Agent summarizes. |
| `approved` | Evidence accepted. | `archived` | `DocumentationApproved` | Office Admin / Safety reviewer | Required for critical evidence | Job readiness updates. |
| `rejected` | Evidence not accepted. | `submitted`, `held` | `DocumentationRejected` | Office Admin / Safety reviewer | Reason required | Contractor task generated. |
| `held` | Paused due to exception. | `needs_review`, `approved`, `rejected` | `DocumentationHeld` | Office Admin / Safety reviewer | Reason required | Alert remains visible. |
| `archived` | Evidence retained but inactive. | `reopened` | `DocumentationArchived` | Office Admin | Reason for reopen | Audit only. |

## 12. Invoice State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `draft` | Invoice draft exists. | `needs_review`, `voided` | `InvoiceGenerated` | Finance | No external send | Invoice Agent validates. |
| `needs_review` | Invoice requires reviewer decision. | `approved`, `edited`, `held`, `rejected` | `InvoiceReviewRequested` | Finance | Required | Missing docs/rate anomalies flagged. |
| `edited` | Reviewer changed invoice. | `needs_review`, `approved` | `InvoiceEdited` | Finance | Re-review recommended | Audit diff required. |
| `approved` | Approved for release/downstream handling. | `sent`, `held`, `voided` | `InvoiceApproved` | Finance / Michael for MVP client invoices | Required | Release queue updates. |
| `sent` | Invoice sent/released. | `delivered`, `paid`, `held` | `InvoiceSent` | Finance | Michael approval for MVP client invoices | Communication record created. |
| `delivered` | Delivery confirmed. | `paid`, `held` | `InvoiceDelivered` | Finance | Future integration only | Aging timer starts. |
| `paid` | Payment/reconciliation complete. | `closed` | `PaymentReceived` | Finance | Reconciliation outside MVP | Executive revenue updates. |
| `held` | Paused for issue. | `needs_review`, `approved`, `rejected` | `InvoiceHeld` | Finance / Owner | Reason required | Financial alert active. |
| `rejected` | Invoice rejected. | `draft`, `voided` | `InvoiceRejected` | Finance / Owner | Reason required | Review task generated. |
| `voided` | Invoice cancelled. | `draft` | `InvoiceVoided` | Finance / Owner | Reason required | Audit only. |
| `closed` | Invoice lifecycle complete. | `reopened` | `InvoiceClosed` | Finance | Reason for reopen | Audit only. |

## 13. ContractorPayout State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `draft` | Payout draft exists. | `needs_review`, `voided` | `ContractorPayoutGenerated` | Finance | No release | Contractor Billing Agent validates. |
| `needs_review` | Payout requires review. | `approved`, `held`, `rejected` | `ContractorPayoutReviewRequested` | Finance | Required | Split/doc anomalies flagged. |
| `approved` | Approved for contractor release or downstream payment. | `released`, `held`, `voided` | `ContractorPayoutApproved` | Finance / Owner | Required | Contractor portal can show released status after release. |
| `released` | Contractor can view payout status. | `paid`, `held` | `ContractorPayoutReleased` | Finance | Approval already required | Contractor portal updates. |
| `paid` | Payout paid/reconciled. | `closed` | `ContractorPayoutPaid` | Finance | Payment execution outside MVP | Executive rollup updates. |
| `held` | Payout paused for issue. | `needs_review`, `approved`, `rejected` | `ContractorPayoutHeld` | Finance / Owner | Reason required | Alert active. |
| `rejected` | Payout not approved. | `draft`, `voided` | `ContractorPayoutRejected` | Finance / Owner | Reason required | Review task generated. |
| `voided` | Payout cancelled. | `draft` | `ContractorPayoutVoided` | Finance / Owner | Reason required | Audit only. |
| `closed` | Payout lifecycle complete. | `reopened` | `ContractorPayoutClosed` | Finance | Reason for reopen | Audit only. |

## 14. Alert State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `runtime_only` | Derived condition exists but not persisted. | `open`, `dismissed` | `RuntimeAlertDerived` | Source domain owner | Persistence threshold decision | Alert Agent evaluates. |
| `open` | Persisted alert exists. | `acknowledged`, `assigned`, `escalated`, `resolved`, `dismissed` | `AlertCreated` | Source domain owner | Critical alerts require acknowledgement | Dashboard displays. |
| `acknowledged` | Human saw alert. | `assigned`, `escalated`, `resolved`, `dismissed` | `AlertAcknowledged` | Assigned owner | Required for critical | Agent may suggest next action. |
| `assigned` | Owner is accountable. | `escalated`, `resolved`, `dismissed` | `AlertAssigned` | Assigned owner | No, unless critical | Task may be created. |
| `escalated` | Higher authority needed. | `assigned`, `resolved` | `AlertEscalated` | Owner / Executive | Required | Executive dashboard highlights. |
| `resolved` | Issue handled. | `reopened` | `AlertResolved` | Assigned owner | Resolution notes required | Dashboard clears active blocker. |
| `dismissed` | Determined not actionable. | `reopened` | `AlertDismissed` | Assigned owner / Owner | Reason required | Audit only. |
| `reopened` | Alert active again. | `assigned`, `escalated`, `resolved` | `AlertReopened` | Assigned owner | Reason required | Dashboard restores blocker. |

## 15. Task State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `open` | Task exists and needs assignment/action. | `assigned`, `cancelled`, `blocked` | `TaskCreated` | Source domain owner | No | Agents may recommend. |
| `assigned` | Owner assigned. | `in_progress`, `blocked`, `completed`, `cancelled` | `TaskAssigned` | Assigned user | No | Dashboard queue updates. |
| `in_progress` | Work started. | `blocked`, `completed`, `cancelled` | `TaskStarted` | Assigned user | No | None. |
| `blocked` | Task cannot proceed. | `assigned`, `in_progress`, `cancelled` | `TaskBlocked` | Assigned user | Reason required | Alert may be created. |
| `completed` | Task finished. | `reopened` | `TaskCompleted` | Assigned user | Does not imply approval | Linked approval still required if sensitive. |
| `cancelled` | Task cancelled. | `reopened` | `TaskCancelled` | Assigned user / owner | Reason required | Audit only. |
| `overdue` | Task is past due. | `in_progress`, `completed`, `cancelled`, `escalated_future` | `TaskOverdue` | Assigned user | Escalation by threshold | Alert may be created. |

## 16. Approval State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `requested` | Approval requested. | `approved`, `rejected`, `held`, `cancelled`, `expired` | `ApprovalRequested` | Requesting user/workflow | Authorized human decision required | Agent may prepare packet. |
| `approved` | Human approved action. | `superseded` | `ApprovalGranted` | Approver | Human only | Target transition may proceed. |
| `rejected` | Human rejected action. | `superseded` | `ApprovalRejected` | Approver | Human only | Alert/task may update. |
| `held` | Decision paused. | `approved`, `rejected`, `cancelled`, `expired` | `ApprovalHeld` | Approver | Reason required | Dashboard shows blocked approval. |
| `cancelled` | Request cancelled. | `requested` | `ApprovalCancelled` | Requester/approver | Reason required | Audit only. |
| `expired` | Request expired. | `requested` | `ApprovalExpired` | System | No | Alert/task may generate. |
| `superseded` | Newer approval replaces it. | None | `ApprovalSuperseded` | System/human | Reason required | Audit only. |

## 17. Contractor State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `candidate` | Potential contractor. | `trainee`, `inactive` | `ContractorCreated` | Office Admin | Human review | Roster completeness check. |
| `trainee` | In onboarding/training. | `helper`, `inactive` | `ContractorTraineeActivated` | Office Admin | Training review | Safety status checked. |
| `helper` | Can support assigned work. | `lead_installer`, `inactive` | `ContractorHelperActivated` | Office Admin | Status approval | Dispatch Agent may include in crew suggestions. |
| `lead_installer` | Can lead jobs. | `senior_lead`, `inactive` | `ContractorLeadActivated` | Office Admin / Owner | Status approval | Crew assignment recommendations. |
| `senior_lead` | Senior lead role. | `inactive`, `lead_installer` | `ContractorSeniorLeadActivated` | Owner | Status approval | Higher-complexity work suggestions. |
| `inactive` | Not assignable. | `candidate`, `trainee`, `helper`, `lead_installer` | `ContractorInactive` | Office Admin / Owner | Reason required | Dispatch Agent excludes. |

## 18. Equipment State Machine

| State | Meaning | Allowed Next States | Event | Primary Owner | Human Gate | Agent Trigger |
|---|---|---|---|---|---|---|
| `available` | Ready for assignment/use. | `assigned`, `retired`, `missing` | `EquipmentAvailable` | Office Admin | No | Dispatch material suggestions. |
| `assigned` | Assigned to Job/Dispatch. | `installed`, `serviced`, `recovered`, `missing` | `EquipmentAssigned` | Office Admin / Dispatcher | Review for billable assets | Dispatch Agent tracks. |
| `installed` | Installed at Location/Job. | `serviced`, `recovered`, `damaged` | `EquipmentInstalled` | Office Admin | Documentation required | Documentation requirement generated. |
| `serviced` | Service performed. | `installed`, `recovered`, `damaged` | `EquipmentServiced` | Office Admin | Documentation review | Invoice readiness check. |
| `recovered` | Retrieved from site. | `available`, `damaged`, `retired` | `EquipmentRecovered` | Office Admin | Human review | Inventory update. |
| `damaged` | Damage reported. | `serviced`, `retired`, `held_future` | `EquipmentDamaged` | Office Admin / Owner | Reason/review required | Alert created. |
| `missing` | Not accounted for. | `available`, `recovered`, `retired` | `EquipmentMissing` | Office Admin / Owner | Critical review | Alert escalates. |
| `retired` | No longer usable. | None | `EquipmentRetired` | Owner / Office Admin | Reason required | Audit only. |

## 19. Dashboard State Effects

| State Condition | Dashboard Effect |
|---|---|
| Lead `contact_needed` or Communication `unanswered` | Missed follow-up queue. |
| Lead `estimate_requested` | Executive/Office estimate action queue. |
| Job `scheduled`, `assigned`, `dispatch_ready` | Jobs scheduled today and dispatch queue. |
| Job `incomplete`, `transfer_review`, or `return_needed` | Job transfer queue and dispatch triage. |
| DispatchAssignment `needs_review` or `held` | Dispatch blockers. |
| Job `submitted` or `documentation_review` | Documentation review queue. |
| DocumentationArtifact `missing`, `needs_review`, `rejected`, `held` | Jobs missing documentation. |
| Job `approved` or `invoice_review` | Jobs ready for invoice review. |
| Invoice `needs_review`, `held`, `approved` | Invoice approval/release queue. |
| ContractorPayout `needs_review` or `held` | Contractor payouts pending. |
| Alert `open`, `acknowledged`, `assigned`, `escalated` | Central alert queue and executive risk view. |
| Approval `requested` or `held` | Approval queue. |

## 20. Agent Trigger Map

| Agent | Trigger | Input | Decision/Recommendation | Output | Escalation |
|---|---|---|---|---|---|
| Executive Assistant Agent | Critical Alert, Invoice needs approval, missed follow-up threshold, weekly briefing schedule. | Jobs, Invoices, Communications, Alerts, Tasks. | What needs Michael's attention. | Executive brief, task/alert recommendations. | Owner/Executive. |
| Dispatch Agent | Job enters `scheduled`, `assigned`, or DispatchAssignment `draft`. | Job, Contractor, Location, Equipment, Documentation requirements. | Crew/route/readiness recommendation. | Draft DispatchAssignment, missing-data alerts. | No qualified contractor, missing access data, safety blocker. |
| CRM Agent | Lead `new`, Communication `unanswered`, Lead follow-up threshold. | Lead, Customer, Communication, Task. | Follow-up priority and draft. | Task recommendation, communication draft. | High-priority lead, missed call, unresolved customer issue. |
| Invoice Agent | Job `approved`, WorkOrder `invoice_ready`, Invoice `draft` or `needs_review`. | Job, WorkOrder, DocumentationArtifact, Invoice. | Invoice readiness and anomalies. | Review packet, missing-doc alerts. | Missing required doc, conflicting totals, release approval needed. |
| Contractor Billing Agent | Job `approved`, ContractorPayout `draft` or `needs_review`. | Contractor, Job, Invoice, DocumentationArtifact. | Payout readiness and split anomalies. | Payout review packet. | Split conflict, missing evidence, payout hold. |
| Documentation Agent | DocumentationArtifact `required`, `submitted`, `needs_review`, Job `submitted`. | Job, WorkOrder, Contractor, DocumentationArtifact. | Completeness and acceptance recommendation. | Missing-evidence tasks/alerts. | Safety or billing-critical missing evidence. |
| Alert Agent | Runtime alert condition detected. | Any source object. | Persist, assign, escalate, or ignore. | Alert draft/persisted alert recommendation. | Critical financial, safety, or client-impacting issue. |

## 21. Human Approval Gates

Human approval is required for:

- Estimate send.
- Lead conversion to Job when pricing or incomplete data is involved.
- WorkOrder acceptance after parser/extraction.
- DispatchAssignment approval and external dispatch send.
- Job transfer or reassignment after partial/incomplete work.
- Job submitted -> approved.
- DocumentationArtifact approval for billing/safety evidence.
- Invoice approval and client-facing release.
- ContractorPayout approval/release.
- Financial adjustment, rate, split, surcharge, or override.
- Safety exception dismissal.
- Critical Alert dismissal/resolution.
- External Communication send.

MVP decision: Michael Keegan is the final approval authority for client-facing invoice release.

## 22. Audit Requirements

Every state transition should produce or link to an AuditLog entry when:

- The state affects dispatch, billing, payout, safety, client communication, or customer-visible output.
- A human approval is requested or granted.
- An AI Agent recommends or drafts a sensitive action.
- A financial field changes.
- A safety blocker is dismissed.
- A critical alert is acknowledged, resolved, dismissed, or escalated.
- A record is reopened after closure.

Audit entries should include actor, object, prior state, next state, event, timestamp, reason, and related Approval/Alert where applicable.

## 23. Non-Goals

This document does not authorize:

- App code.
- Database migrations.
- Root JSON Schema changes.
- Event bus implementation.
- n8n workflow deployment.
- AI runtime calls.
- Auth setup.
- Supabase/Neon setup.
- Clerk setup.
- Twilio/Resend setup.
- Vercel deployment.
- Firebase.
- Secrets in repo.
- Automated financial, legal, safety, dispatch, or client-facing approvals.

## 24. Acceptance Criteria

This operational state machine is accepted when:

- It defines end-to-end object movement from Lead through Closed.
- It defines state tables for Lead, Communication, WorkOrder, Job, DispatchAssignment, DocumentationArtifact, Invoice, ContractorPayout, Alert, Task, Approval, Contractor, and Equipment.
- It maps states to events, owners, human gates, dashboard effects, and agent triggers.
- It preserves Michael Keegan's MVP invoice-release authority.
- It treats agents as state-change reactors, not final approvers.
- It supports runtime-derived and persisted alerts.
- It does not introduce app code, integrations, secrets, Firebase, or root schema changes.
