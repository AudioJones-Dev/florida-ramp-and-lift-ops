# Canonical Data Schema

Status: Git Spec-Ready Draft
Owner: AJ Digital LLC / Audio Jones
Repo: `AudioJones-Dev/florida-ramp-and-lift-ops`
Scope: Florida Ramp & Lift Operational Intelligence Platform
Last updated: 2026-06-04

## 1. Canonical Doctrine

This document is the canonical domain model for the Florida Ramp & Lift Operational Intelligence Platform.

It defines the shared business objects used by:

- FLR Executive OS.
- FLR Operations OS.
- FLR Financial OS.
- Centralized Control Dashboard.
- Executive briefings.
- Communications records.
- Job intake.
- Dispatch.
- Contractor portal.
- Documentation review.
- Invoice approval.
- Contractor payouts.
- Compliance and safety.
- Runtime-derived and persisted alerts.

No PRD, workflow, agent, dashboard, portal, automation, or future app implementation should define a competing version of these objects.

### Canonical Rules

- One object definition per business concept.
- One app serves multiple portals through role-based access and object-level permissions.
- State transitions are business events and should drive workflows, agents, alerts, and dashboards.
- Communications are first-class records before live integrations.
- Alerts use a hybrid model: runtime-derived plus persisted first-class records after threshold.
- Financial, contractor-facing, client-facing, and internal-only records must remain separated.
- Client-facing invoice release requires explicit human approval. Michael Keegan has final MVP authority.
- Agents may prepare, validate, summarize, route, and flag records. Agents may not silently approve or release sensitive actions.
- GitHub is the execution/specification system.
- Obsidian is the business memory/decision system.
- This document is product-level and planning-level. Root JSON Schema implementation belongs in future schema PRs.

### Current Root Machine Schemas

The repo currently has root-level JSON Schemas for some objects:

- `schemas/client.schema.json`
- `schemas/invoice.schema.json`
- `schemas/job.schema.json`
- `schemas/safety.schema.json`
- `schemas/scope-line-item.schema.json`
- `schemas/work-order.schema.json`

Where naming differs, this document defines the canonical product object name. Existing root schemas remain preserved until a future migration PR explicitly reconciles naming.

## 2. Object Relationship Map

### Object Index

| Object | Primary Domain | Current Machine Schema Status |
|---|---|---|
| Organization | Cross-domain | Not yet defined as root schema. |
| User | Cross-domain | Not yet defined as root schema. |
| Role | Cross-domain | Not yet defined as root schema. |
| Customer | Executive OS / Operations OS | `schemas/client.schema.json` partially maps this concept. |
| Location | Operations OS | Not yet defined as root schema. |
| Communication | Cross-domain | Not yet defined as root schema. |
| Lead | Executive OS / Operations OS | Not yet defined as root schema. |
| Job | Operations OS | `schemas/job.schema.json` |
| WorkOrder | Operations OS | `schemas/work-order.schema.json` |
| DispatchAssignment | Operations OS | Not yet defined as root schema. |
| Contractor | Operations OS / Financial OS | Not yet defined as root schema. |
| Equipment | Operations OS | Not yet defined as root schema. |
| DocumentationArtifact | Operations OS / Compliance | Not yet defined as root schema. |
| Invoice | Financial OS | `schemas/invoice.schema.json` |
| ContractorPayout | Financial OS | Not yet defined as root schema. |
| Alert | Cross-domain | Not yet defined as root schema. |
| Task | Cross-domain | Not yet defined as root schema. |
| Approval | Cross-domain | Not yet defined as root schema. |
| AuditLog | Cross-domain | Not yet defined as root schema. |

### High-Level Relationship Graph

```txt
Organization
  -> Users
  -> Roles
  -> Customers
  -> Contractors
  -> Jobs
  -> Invoices
  -> Alerts

Customer
  -> Locations
  -> Communications
  -> Leads
  -> WorkOrders
  -> Jobs
  -> Invoices
  -> Alerts

Lead
  -> Communications
  -> Tasks
  -> Approvals
  -> Job

Job
  -> Customer
  -> Location
  -> WorkOrder
  -> DispatchAssignment
  -> Contractors
  -> Equipment
  -> DocumentationArtifacts
  -> Invoice
  -> ContractorPayout
  -> Alerts
  -> Tasks
  -> Approvals
  -> AuditLogs

Invoice
  -> Customer
  -> Jobs
  -> WorkOrders
  -> DocumentationArtifacts
  -> Approvals
  -> Alerts
  -> AuditLogs

ContractorPayout
  -> Contractor
  -> Jobs
  -> Invoice
  -> Approvals
  -> AuditLogs

Communication / Alert / Task / Approval / AuditLog
  -> may reference any first-class domain object
```

### Relationship Rules

- `Organization` is the tenant boundary for all platform records.
- `User` and `Role` define human and agent access.
- `Customer` represents the account/client/customer entity; existing `Client` schema maps into this object until reconciled.
- `Location` anchors dispatch, zone pricing, access notes, and job history.
- `Communication` may originate or support Leads, Jobs, WorkOrders, DispatchAssignments, Invoices, ContractorPayouts, Alerts, Tasks, and Approvals.
- `Lead` may convert to `Job` only after human review.
- `Job` is the operational hub.
- `WorkOrder` authorizes or describes work; one WorkOrder may create one or more Jobs.
- `DispatchAssignment` represents crew/date/job sequencing, not the Job itself.
- `Invoice` and `ContractorPayout` are separate objects. Contractor payout logic must not leak into client invoices.
- `Alert` may be runtime-derived; threshold-crossing alerts should persist.
- `Approval` is the only canonical record for sensitive human decisions.
- `AuditLog` records who or what changed state, viewed sensitive data, approved, overrode, sent, or escalated.

## 3. Domain Object Specs

### Organization

| Field | Definition |
|---|---|
| Purpose | Tenant/account boundary for the Florida Ramp & Lift platform and future multi-organization use. |
| Primary owner | Owner / Support Admin. |
| Required fields | `organization_id`, `name`, `slug`, `status`, `timezone`, `created_at`, `updated_at`. |
| Optional fields | `legal_name`, `billing_email`, `primary_contact_user_id`, `support_admin_user_ids`, `settings`, `metadata`. |
| Relationships | Has many Users, Roles, Customers, Locations, Contractors, Jobs, WorkOrders, DispatchAssignments, Invoices, ContractorPayouts, Alerts, Tasks, Approvals, AuditLogs. |
| Lifecycle states | `setup`, `active`, `on_hold`, `suspended`, `archived`. |
| Role access notes | Owner and Support Admin can manage. Office Admin may read. Contractors and clients only inherit scoped access through their records. |
| Agent access notes | AI Agent may read organization settings explicitly granted for workflow routing. Agents may not change tenant settings. |
| Dashboard usage | Filters all dashboard records; scopes executive rollups and portal routing. |
| Audit requirements | Log role changes, settings changes, support access, status changes, and billing/admin ownership changes. |

### User

| Field | Definition |
|---|---|
| Purpose | Authenticated human or system actor who can view, create, edit, review, approve, escalate, or audit records. |
| Primary owner | Owner / Support Admin. |
| Required fields | `user_id`, `organization_id`, `display_name`, `email`, `status`, `role_ids`, `created_at`, `updated_at`. |
| Optional fields | `phone`, `avatar_url`, `profile_type`, `contractor_id`, `customer_id`, `last_login_at`, `preferences`, `metadata`. |
| Relationships | Belongs to Organization; has Roles; may own Tasks, Approvals, Alerts, Communications, AuditLogs. May map to Contractor or Customer contact. |
| Lifecycle states | `invited`, `active`, `suspended`, `inactive`, `archived`. |
| Role access notes | Owner can manage all users. Support Admin can configure non-secret user settings. Office Admin can manage operational users if delegated. |
| Agent access notes | Agents may not impersonate Users. Agent activity must be attributed to `ai_agent` plus any approving human. |
| Dashboard usage | Powers portal routing, assignment filters, approval queues, and audit attribution. |
| Audit requirements | Log user creation, invitation, activation, suspension, role changes, profile-to-contractor/customer linkage, and sensitive record access. |

### Role

| Field | Definition |
|---|---|
| Purpose | Named permission bundle controlling portal access and permitted actions. |
| Primary owner | Owner / Support Admin. |
| Required fields | `role_id`, `organization_id`, `role_key`, `display_name`, `status`, `permissions`, `created_at`, `updated_at`. |
| Optional fields | `description`, `portal_default_path`, `object_scope_rules`, `approval_scope`, `metadata`. |
| Relationships | Assigned to Users and AI Agents; referenced by Approval and AuditLog records. |
| Lifecycle states | `draft`, `active`, `deprecated`, `archived`. |
| Role access notes | Canonical roles: `owner`, `support_admin`, `office_admin`, `dispatcher`, `finance`, `lead_installer`, `contractor`, `client`, `ai_agent`. |
| Agent access notes | AI Agent roles must be narrower than human roles and preserve human approval gates. |
| Dashboard usage | Determines visible navigation, available actions, default dashboards, and object-level filters. |
| Audit requirements | Log creation, permission changes, assignment/removal, deprecation, and any role with approval authority. |

### Customer

| Field | Definition |
|---|---|
| Purpose | Paying, requesting, or serviced account/customer, including WillScot, Mobile Mini, direct residential customers, or other client tenants. |
| Primary owner | Owner / Office Admin. |
| Required fields | `customer_id`, `organization_id`, `customer_type`, `display_name`, `status`, `primary_contact_name`, `primary_contact_phone`, `primary_contact_email`, `created_at`, `updated_at`. |
| Optional fields | `billing_contact_name`, `billing_contact_email`, `billing_address`, `account_number`, `crm_external_id`, `notes`, `tags`, `metadata`. |
| Relationships | Has Locations, Communications, Leads, WorkOrders, Jobs, Invoices, Alerts, Tasks, Approvals, AuditLogs. |
| Lifecycle states | `prospect`, `active`, `on_hold`, `inactive`, `archived`. |
| Role access notes | Owner, Support Admin, Office Admin, Dispatcher, and Finance may read based on work context. Contractors see only limited customer/site contact data for assigned Jobs. Clients see only their own customer records after client portal is enabled. |
| Agent access notes | Agents may summarize history, flag missing data, and prepare CRM-ready drafts. Agents may not send customer messages or create live third-party records without approval. |
| Dashboard usage | Executive rollups, customer/job history, lead follow-up, invoice aging, communication history, client portal scoping. |
| Audit requirements | Log creation, status change, billing contact changes, CRM linkage, sensitive communication access, and customer merge/de-duplication. |

### Location

| Field | Definition |
|---|---|
| Purpose | Physical site, customer address, equipment yard, storage location, or service area used for dispatch, zone pricing, safety, and job history. |
| Primary owner | Office Admin / Dispatcher. |
| Required fields | `location_id`, `organization_id`, `customer_id`, `location_type`, `street_address`, `city`, `state`, `zip`, `status`, `created_at`, `updated_at`. |
| Optional fields | `site_name`, `zone_id`, `access_notes`, `gate_code_reference`, `latitude`, `longitude`, `geocode_confidence`, `service_area`, `metadata`. |
| Relationships | Belongs to Customer; has Jobs, WorkOrders, DispatchAssignments, Communications, DocumentationArtifacts, Equipment, Alerts, Tasks. |
| Lifecycle states | `unverified`, `verified`, `dispatch_ready`, `access_issue`, `inactive`, `archived`. |
| Role access notes | Dispatcher and Office Admin can update dispatch details. Contractors see assigned-job location details only. Clients see their own service locations only after client access is enabled. |
| Agent access notes | Agents may normalize address text, suggest zone classification, flag access gaps, and recommend geocode review. Agents may not override zones or mark access issues resolved without human approval. |
| Dashboard usage | Dispatch maps, zone summaries, service-area reporting, access blockers, job history by location. |
| Audit requirements | Log address edits, geocode changes, zone overrides, access-note changes, and release of sensitive access details. |

### Communication

| Field | Definition |
|---|---|
| Purpose | First-class record for calls, missed calls, voicemail, SMS, email, CRM notes, contractor messages, internal notes, and AI-prepared drafts. |
| Primary owner | Office Admin for operations; Owner for executive/client-sensitive communication. |
| Required fields | `communication_id`, `organization_id`, `communication_type`, `direction`, `status`, `source_channel`, `related_object_type`, `related_object_id`, `participants`, `summary`, `created_at`, `updated_at`. |
| Optional fields | `raw_body_reference`, `subject`, `thread_id`, `external_message_id`, `sent_by_user_id`, `approved_by_user_id`, `requires_follow_up`, `follow_up_due_at`, `sent_at`, `received_at`, `metadata`. |
| Relationships | May link to Customer, Location, Lead, Job, WorkOrder, DispatchAssignment, Contractor, Invoice, ContractorPayout, Alert, Task, Approval, AuditLog. |
| Lifecycle states | `new`, `needs_review`, `draft`, `approved_to_send`, `sent`, `received`, `unanswered`, `resolved`, `held`, `cancelled`. |
| Role access notes | Owner, Support Admin, Office Admin, Dispatcher, Finance, and assigned users read based on related object. Contractors and clients see only communications explicitly released to their portal context. |
| Agent access notes | Agents may classify, summarize, draft, detect follow-up needs, and link records. Agents may not send external messages or mark sensitive issues resolved without approval. |
| Dashboard usage | Missed follow-ups, response-speed metrics, customer history, dispatch context, dispute resolution, executive briefing inputs. |
| Audit requirements | Log draft creation, approval, send, hold, cancellation, external ID linkage, sensitive content access, and follow-up resolution. |

### Lead

| Field | Definition |
|---|---|
| Purpose | Potential job, customer opportunity, referral, inbound call, website inquiry, or operational opportunity before it becomes a Job or WorkOrder. |
| Primary owner | Owner / Office Admin. |
| Required fields | `lead_id`, `organization_id`, `source`, `lead_status`, `customer_name`, `contact_name`, `contact_phone`, `service_requested`, `priority`, `created_at`, `updated_at`. |
| Optional fields | `contact_email`, `customer_id`, `location_id`, `communication_id`, `estimate_amount`, `estimate_sent_at`, `assigned_user_id`, `lost_reason`, `metadata`. |
| Relationships | May create or link Customer, Location, Communication, Job, Task, Alert, Approval, AuditLog. |
| Lifecycle states | `new`, `contact_needed`, `qualified`, `estimate_needed`, `estimate_sent`, `approved`, `converted_to_job`, `lost`, `closed`, `reopened`. |
| Role access notes | Owner, Office Admin, Support Admin, and assigned users can manage. Contractors do not see Leads. Clients do not see Leads in MVP. |
| Agent access notes | Agents may triage source, summarize requested work, flag missing contact data, recommend follow-up, and prepare CRM drafts. Agents may not send estimates or convert Leads to Jobs without approval. |
| Dashboard usage | Follow-up queue, missed-call conversion, executive pipeline, response-speed metrics, lead aging. |
| Audit requirements | Log source, status changes, follow-up assignment, estimate-related decisions, conversion to Job, lost reason, and reopen reason. |

### Job

| Field | Definition |
|---|---|
| Purpose | Atomic unit of field work executed by Florida Ramp & Lift. Job is the operational hub. |
| Primary owner | Office Admin / Dispatcher. |
| Required fields | `job_id`, `organization_id`, `customer_id`, `job_type`, `status`, `location_id`, `site_address`, `site_city`, `crew_members`, `scope_line_items`, `safety_record_id`, `notes`, `created_at`, `updated_at`, `version`. |
| Optional fields | `lead_id`, `work_order_id`, `scheduled_date`, `scheduled_window`, `zone_id`, `trip_charge_classification`, `trip_charge_amount`, `completion_submitted_at`, `approved_at`, `approved_by_user_id`, `transfer_status`, `transfer_reason`, `previous_assignee_id`, `remaining_scope`, `transfer_packet_summary`, `metadata`. |
| Relationships | Belongs to Customer and Location; may reference Lead, WorkOrder, DispatchAssignment, Contractors, Equipment, DocumentationArtifacts, Invoice, ContractorPayout, Communications, Alerts, Tasks, Approvals, AuditLogs. |
| Lifecycle states | `pending`, `scheduled`, `in_progress`, `submitted`, `approved`, `invoiced`, `paid`, `incomplete`, `transfer_review`, `return_needed`, `on_hold`, `cancelled`. |
| Role access notes | Owner and Office Admin can manage. Dispatcher can schedule/assign. Lead Installer/Contractor can view assigned jobs and submit completion evidence. Finance can read approved/billing-relevant jobs. Client can see released own-job data in future client access. |
| Agent access notes | Agents may validate fields, recommend state changes, detect missing documentation, generate summaries, and create alerts/tasks. Agents may not approve Jobs, dispatch crews externally, or invoice Jobs without approval. |
| Dashboard usage | Core status counts, open jobs, scheduled today, completed this week, missing documentation, transfer review, invoice readiness, dispatch queue, contractor portal job list. |
| Audit requirements | Log all status transitions, crew changes, transfer requests, remaining-scope changes, schedule changes, field submissions, approval decisions, invoice linkage, trip-charge overrides, and safety/documentation blockers. |

### WorkOrder

| Field | Definition |
|---|---|
| Purpose | Client-issued authorization or scope record, such as a WillScot work order PDF, used to create or validate Jobs and invoice readiness. |
| Primary owner | Office Admin for intake; Finance for invoice readiness. |
| Required fields | `work_order_id`, `organization_id`, `customer_id`, `source`, `status`, `work_order_number`, `received_at`, `created_at`, `updated_at`. |
| Optional fields | `location_id`, `job_ids`, `sap_order_number`, `product_unit_number`, `prepared_for`, `prepared_by`, `account`, `contact_name`, `contact_phone`, `contact_email`, `scope_line_items`, `source_document_id`, `parser_run_id`, `metadata`. |
| Relationships | Belongs to Customer and optionally Location; may create one or more Jobs; links to DocumentationArtifacts, Communications, Invoice, Alerts, Tasks, Approvals, AuditLogs. |
| Lifecycle states | `received`, `parsed`, `needs_review`, `accepted`, `scheduled`, `completed`, `invoice_ready`, `invoiced`, `closed`, `rejected`, `held`. |
| Role access notes | Office Admin manages intake and review. Dispatcher reads accepted/scheduled records. Finance reads invoice-ready records. Contractors see only assigned-job scope derived from WorkOrder. |
| Agent access notes | Agents may extract, normalize, flag, and draft WorkOrder records. Agents may not accept WorkOrders or resolve parser blockers without approval. |
| Dashboard usage | Intake queue, parser review, work-order blockers, invoice readiness, customer history, documentation requirements. |
| Audit requirements | Log source ingestion, parser output, field corrections, acceptance/rejection, link to Jobs, invoice-ready decision, and source document access. |

### DispatchAssignment

| Field | Definition |
|---|---|
| Purpose | Crew/date assignment package for one or more Jobs, including sequence, route assumptions, access notes, safety advisories, materials, and dispatch review. |
| Primary owner | Dispatcher / Office Admin. |
| Required fields | `dispatch_assignment_id`, `organization_id`, `scheduled_date`, `status`, `crew_member_ids`, `job_ids`, `review_status`, `created_at`, `updated_at`. |
| Optional fields | `sequence`, `route_notes`, `estimated_drive_time`, `materials_needed`, `tools_needed`, `ppe_requirements`, `weather_advisory`, `sent_at`, `approved_by_user_id`, `metadata`. |
| Relationships | Has Jobs; references Contractors, Locations, Equipment, Communications, Tasks, Alerts, Approvals, AuditLogs. |
| Lifecycle states | `draft`, `needs_review`, `approved`, `sent`, `in_progress`, `completed`, `held`, `cancelled`, `revised`. |
| Role access notes | Dispatcher and Office Admin manage. Owner can override. Contractors/Lead Installers see only assigned dispatch details after approval/release. |
| Agent access notes | Dispatch Agent may assign Jobs in draft state, suggest routes, rebalance schedules in draft state, sequence Jobs, and flag gaps. Agents may not send dispatch instructions or override safety blocks without approval. |
| Dashboard usage | Jobs scheduled today, crew day view, dispatch readiness, route/crew blockers, contractor portal assignments. |
| Audit requirements | Log crew assignment, sequence changes, route overrides, approval, send/release, revisions after approval, and dispatch blockers. |

### Contractor

| Field | Definition |
|---|---|
| Purpose | Installer, helper, lead, trainee, senior lead, subcontractor, or field worker used for dispatch, documentation, compliance, and payout review. |
| Primary owner | Office Admin for roster; Finance for pay fields; Owner for final authority. |
| Required fields | `contractor_id`, `organization_id`, `full_name`, `phone`, `email`, `role`, `status`, `pay_type`, `default_rate_or_split`, `service_areas`, `skills`, `vehicle_access`, `tool_access`, `ppe_compliance_status`, `safety_training_status`, `start_date`, `emergency_contact`, `created_at`, `updated_at`. |
| Optional fields | `user_id`, `notes`, `capability_tags`, `preferred_zones`, `insurance_status`, `documents`, `inactive_reason`, `metadata`. |
| Relationships | May map to User; has Jobs, DispatchAssignments, DocumentationArtifacts, ContractorPayouts, Communications, Alerts, Tasks, Approvals, AuditLogs. |
| Lifecycle states | `candidate`, `trainee`, `helper`, `lead_installer`, `senior_lead`, `inactive`. |
| Role access notes | Owner, Office Admin, Support Admin, Dispatcher, and Finance read based on need. Finance edits pay fields if delegated. Contractors see their own profile subset. |
| Agent access notes | Agents may flag roster gaps, skill mismatches, compliance issues, missing PPE, and workload imbalance. Agents may not change pay fields, status, or compliance status without approval. |
| Dashboard usage | Contractor roster, workload, assigned jobs, documentation status, safety/compliance status, payout readiness, contractor portal profile. |
| Audit requirements | Log status changes, pay field changes, compliance changes, capability changes, deactivation, emergency contact access, and payout visibility release. |

### Equipment

| Field | Definition |
|---|---|
| Purpose | Installed, recovered, delivered, serviced, assigned, or required equipment such as ramps, stair lifts, VPLs, vehicle lifts, tools, parts, and reusable materials. |
| Primary owner | Office Admin / Inventory owner. |
| Required fields | `equipment_id`, `organization_id`, `equipment_type`, `status`, `condition`, `created_at`, `updated_at`. |
| Optional fields | `customer_id`, `location_id`, `job_id`, `work_order_id`, `serial_or_asset_id`, `manufacturer`, `model`, `quantity`, `storage_location`, `notes`, `metadata`. |
| Relationships | May link to Customer, Location, Job, WorkOrder, DispatchAssignment, DocumentationArtifact, Invoice, Alert, Task, AuditLog. |
| Lifecycle states | `available`, `assigned`, `installed`, `serviced`, `recovered`, `damaged`, `retired`, `missing`, `unknown`. |
| Role access notes | Operations roles manage. Contractors see equipment required for assigned Jobs. Finance reads equipment only when billing-relevant. Clients see released equipment/service history in future portal. |
| Agent access notes | Agents may summarize equipment history, flag missing serials, detect condition conflicts, and suggest material lists. Agents may not mark equipment recovered, damaged, missing, or retired without approval. |
| Dashboard usage | Materials needed, equipment status, recovery tracking, service history, dispatch readiness, billing support. |
| Audit requirements | Log assignment, installation, recovery, service, condition change, missing/damaged status, retirement, and billable damage decisions. |

### DocumentationArtifact

| Field | Definition |
|---|---|
| Purpose | Required evidence and records: photos, signed forms, work order PDFs, voice notes, safety checklists, closeout notes, invoices, and supporting files. |
| Primary owner | Office Admin / Safety reviewer. |
| Required fields | `documentation_artifact_id`, `organization_id`, `artifact_type`, `related_object_type`, `related_object_id`, `status`, `source`, `created_at`, `updated_at`. |
| Optional fields | `storage_url`, `storage_provider`, `summary`, `uploaded_by_user_id`, `reviewed_by_user_id`, `reviewed_at`, `rejection_reason`, `sensitive_flag`, `metadata`. |
| Relationships | May link to Job, WorkOrder, DispatchAssignment, Contractor, Equipment, Invoice, ContractorPayout, Alert, Task, Approval, AuditLog. |
| Lifecycle states | `required`, `missing`, `submitted`, `needs_review`, `approved`, `rejected`, `held`, `archived`. |
| Role access notes | Contractors can submit assigned-job artifacts. Office Admin and Safety reviewer review. Finance reads billing-relevant approved artifacts. Clients see released artifacts only in future client portal/secure links. |
| Agent access notes | Agents may check completeness, summarize files, and flag missing evidence. Agents may not approve incomplete documentation or expose sensitive records. |
| Dashboard usage | Missing documentation queue, invoice readiness, safety compliance, contractor submission status, closeout review. |
| Audit requirements | Log upload, storage reference, review, approval/rejection, sensitive access, deletion/archive request, and release to external party. |

### Invoice

| Field | Definition |
|---|---|
| Purpose | Client invoice or contractor invoice record with strict separation between client-facing financial data and contractor payout/internal data. |
| Primary owner | Finance; Michael Keegan for MVP client-facing release authority. |
| Required fields | `invoice_id`, `organization_id`, `invoice_class`, `status`, `totals`, `audit_reference`, `created_at`, `updated_at`. |
| Optional fields | `invoice_number`, `customer_id`, `contractor_id`, `job_ids`, `work_order_ids`, `line_items`, `rate_sheet_id`, `pdf_artifact_id`, `approved_by_user_id`, `sent_at`, `paid_at`, `metadata`. |
| Relationships | References Customer, Contractor, Jobs, WorkOrders, DocumentationArtifacts, ContractorPayout, Communication, Alert, Task, Approval, AuditLog. |
| Lifecycle states | `draft`, `needs_review`, `approved`, `edited`, `held`, `rejected`, `sent`, `delivered`, `paid`, `voided`. |
| Role access notes | Owner and Finance can manage review. Michael approves MVP client-facing release. Contractors see only released contractor invoice/payout info. Clients see only released client invoice info in future access. |
| Agent access notes | Invoice Agent may validate readiness, flag missing documentation, prepare drafts, and detect anomalies. Agents may not approve, send, finalize, or mark paid. |
| Dashboard usage | Outstanding invoices, revenue this week, invoice review queue, jobs ready for invoice review, financial alerts, executive rollups. |
| Audit requirements | Log draft generation, line-item changes, rate/split-related references, approval, hold, rejection, release, delivery, payment status, voiding, and sensitive financial access. |

### ContractorPayout

| Field | Definition |
|---|---|
| Purpose | Contractor payout readiness, payout calculation, adjustment, approval, and downstream payment status. |
| Primary owner | Finance / Owner. |
| Required fields | `contractor_payout_id`, `organization_id`, `contractor_id`, `status`, `pay_period_start`, `pay_period_end`, `jobs_included`, `gross_amount`, `adjustments_total`, `net_amount`, `created_at`, `updated_at`. |
| Optional fields | `invoice_id`, `approval_id`, `adjustments`, `payout_method_reference`, `released_to_contractor_at`, `paid_at`, `notes`, `metadata`. |
| Relationships | Belongs to Contractor; references Jobs, Invoice, Approval, Alert, Task, Communication, AuditLog. |
| Lifecycle states | `draft`, `needs_review`, `approved`, `held`, `rejected`, `released`, `paid`, `voided`. |
| Role access notes | Finance and Owner manage. Contractor sees own released payout status only. Support Admin can inspect for system QA but cannot approve payout unless delegated. |
| Agent access notes | Agents may calculate draft summaries, flag anomalies, and prepare review packets. Agents may not approve, release, or execute payouts. |
| Dashboard usage | Contractor payouts pending, payout review queue, contractor portal payout status, financial exception rollups. |
| Audit requirements | Log calculations, adjustments, review decisions, release to contractor, payment status, and any pay-field dependency. |

### Alert

| Field | Definition |
|---|---|
| Purpose | Runtime-derived or persisted issue requiring attention, ownership, acknowledgement, resolution, or escalation. |
| Primary owner | Source domain owner; critical unresolved alerts roll up to Owner. |
| Required fields | `alert_id`, `organization_id`, `source_object_type`, `source_object_id`, `severity`, `status`, `owner_user_id`, `created_at`, `updated_at`. |
| Optional fields | `alert_type`, `threshold_rule`, `summary`, `recommended_action`, `acknowledged_at`, `resolved_at`, `escalation_status`, `resolution_notes`, `related_task_id`, `metadata`. |
| Relationships | May link to any domain object, especially Communication, Lead, Job, WorkOrder, DispatchAssignment, Contractor, DocumentationArtifact, Invoice, ContractorPayout, Task, Approval, AuditLog. |
| Lifecycle states | `runtime_only`, `open`, `acknowledged`, `assigned`, `escalated`, `resolved`, `dismissed`, `reopened`. |
| Role access notes | Relevant domain owners can view/action. Critical safety and financial alerts require human acknowledgement. Contractors/clients see only alerts explicitly exposed to their portal context. |
| Agent access notes | Agents may derive runtime alerts and recommend persisted alerts after thresholds. Agents may not dismiss or resolve persisted alerts without approval. |
| Dashboard usage | Central alert queue, executive risk view, missed follow-ups, documentation gaps, invoice blockers, safety/compliance exceptions. |
| Audit requirements | Log persistence from runtime condition, assignment, acknowledgement, escalation, resolution, dismissal reason, reopen, and agent recommendations. |

### Task

| Field | Definition |
|---|---|
| Purpose | Assigned follow-up work created by users, workflows, alerts, communications, approvals, or agent recommendations. |
| Primary owner | Assigned user or role. |
| Required fields | `task_id`, `organization_id`, `task_type`, `status`, `priority`, `owner_user_id`, `related_object_type`, `related_object_id`, `created_at`, `updated_at`. |
| Optional fields | `due_at`, `assigned_by_user_id`, `description`, `checklist`, `completed_at`, `blocked_reason`, `alert_id`, `approval_id`, `metadata`. |
| Relationships | May link to Customer, Location, Communication, Lead, Job, WorkOrder, DispatchAssignment, Contractor, Invoice, ContractorPayout, Alert, Approval, AuditLog. |
| Lifecycle states | `open`, `assigned`, `in_progress`, `blocked`, `completed`, `cancelled`, `overdue`. |
| Role access notes | Users see assigned tasks and tasks in their domain. Owner/Support Admin can review system-wide. Contractors see only assigned field tasks. Clients see no internal tasks in MVP. |
| Agent access notes | Agents may recommend tasks, draft task content, and flag overdue tasks. Agents may not complete approval-sensitive tasks without human confirmation. |
| Dashboard usage | Follow-up queue, missed communication tasks, approval packets, dispatch blockers, documentation review work. |
| Audit requirements | Log assignment, due date changes, completion, cancellation, blocked status, and task-to-approval relationships. |

### Approval

| Field | Definition |
|---|---|
| Purpose | Explicit human approval, rejection, hold, override, or escalation decision tied to a specific object/action. |
| Primary owner | Approver role for the relevant action. |
| Required fields | `approval_id`, `organization_id`, `approval_type`, `related_object_type`, `related_object_id`, `status`, `requested_by_user_id`, `created_at`, `updated_at`. |
| Optional fields | `approver_user_id`, `decision`, `decision_notes`, `decided_at`, `expires_at`, `superseded_by_approval_id`, `metadata`. |
| Relationships | Links to Job, WorkOrder, DispatchAssignment, Communication, Invoice, ContractorPayout, Alert, DocumentationArtifact, Contractor, Task, AuditLog. |
| Lifecycle states | `requested`, `approved`, `rejected`, `held`, `cancelled`, `expired`, `superseded`. |
| Role access notes | Only users with the relevant approval authority can decide. Michael Keegan is MVP final authority for client-facing invoice release. AI Agent cannot approve. |
| Agent access notes | Agents may prepare approval packets, summarize evidence, and recommend decisions. Agents may not record final approvals as a human. |
| Dashboard usage | Approval queue, executive actions, invoice release queue, dispatch approval, safety/compliance review, contractor payout approval. |
| Audit requirements | Log request, reviewer, decision, decision notes, supporting evidence, timestamps, expiration, supersession, and any override. |

### AuditLog

| Field | Definition |
|---|---|
| Purpose | Append-only record of significant reads, writes, transitions, approvals, releases, overrides, agent actions, and sensitive data access. |
| Primary owner | Support Admin / Owner. |
| Required fields | `audit_log_id`, `organization_id`, `actor_type`, `actor_id`, `action`, `related_object_type`, `related_object_id`, `occurred_at`, `created_at`. |
| Optional fields | `previous_state`, `next_state`, `field_changes`, `ip_address`, `user_agent`, `approval_id`, `alert_id`, `reason`, `metadata`. |
| Relationships | May reference any first-class object; often links User/AI Agent, Approval, Alert, Job, Invoice, ContractorPayout, Communication, DocumentationArtifact. |
| Lifecycle states | `recorded`, `retained`, `exported`, `archived`. |
| Role access notes | Owner and Support Admin can inspect. Finance may inspect financial audit logs. Office Admin may inspect operational audit logs if delegated. Contractors/clients do not see internal audit logs. |
| Agent access notes | Agents may generate audit entries for their own actions if implemented, but may not edit or delete AuditLogs. |
| Dashboard usage | Support Admin QA, compliance review, financial traceability, approval history, agent accountability, incident reconstruction. |
| Audit requirements | AuditLog itself must be append-only. Corrections should be represented as new AuditLog records, not edits to prior records. |

## 4. State Transition Principles

- Every lifecycle transition is a business event.
- Every transition should record previous state, next state, actor, timestamp, reason, and source object.
- Approval-sensitive transitions must reference an Approval record.
- Agent-recommended transitions must identify the agent and the approving human if accepted.
- State transitions should generate runtime alerts when required data is missing or thresholds are crossed.
- State transitions should not be inferred from UI button clicks alone.

### Approval-Sensitive Transition Examples

| Transition | Approval Requirement |
|---|---|
| Lead `approved` -> `converted_to_job` | Human review. |
| Job `submitted` -> `approved` | Office/Admin review. |
| DispatchAssignment `needs_review` -> `approved` | Dispatcher or Office/Admin approval. |
| DispatchAssignment `approved` -> `sent` | Human approval before external send. |
| DocumentationArtifact `needs_review` -> `approved` | Human review. |
| Invoice `needs_review` -> `approved` | Finance/Owner review; Michael for MVP client-facing release. |
| ContractorPayout `needs_review` -> `approved` | Finance/Owner review. |
| Alert `open` -> `dismissed` | Human reason required. |
| Approval `requested` -> `approved` | Authorized human only. |

## 5. Source-Of-Truth Rules

- GitHub is the execution/specification system for PRDs, schemas, workflow specs, SOPs, architecture, implementation docs, and code.
- Obsidian is the business memory system for decisions, reasoning, meeting notes, client intelligence, lessons learned, and doctrine.
- The application database is the future runtime source of truth for live records.
- n8n may orchestrate workflows but must not become the product backend.
- Storage providers hold photos, PDFs, and job documents; GitHub must not store sensitive customer files.
- Communications are first-class records even before Gmail/SMS/phone/CRM integrations exist.
- Approval records are the only canonical proof of sensitive human approval.
- AuditLog records are the canonical trace for who/what changed or accessed sensitive records.

## 6. Human Approval Boundaries

Human approval is required before:

- Client-facing invoice release.
- Contractor payout approval.
- Financial adjustment, rate override, split override, or surcharge change.
- Customer/client communication send.
- Dispatch instruction external send.
- Safety exception dismissal.
- Critical financial or safety alert dismissal.
- Lead conversion to Job when source data is incomplete or pricing/estimate commitment is involved.
- WorkOrder acceptance when parser confidence is low or required fields are missing.
- DocumentationArtifact approval when evidence is safety- or billing-critical.
- Live CRM/accounting writeback.
- Any action involving secrets, credentials, or sensitive documents.

MVP decision: Michael Keegan has final authority for client-facing invoice release.

## 7. Agent Interaction Boundaries

Agents may:

- Read records granted by role/object policy.
- Prepare summaries, drafts, classifications, flags, tasks, and recommendations.
- Recommend state transitions.
- Recommend runtime alerts and persisted alerts.
- Generate approval packets for human review.
- Draft communications for review.
- Perform low-risk extraction and cleanup if the workflow is approved.

Agents may not:

- Approve records.
- Send external communications.
- Release client-facing invoices.
- Approve or execute ContractorPayout records.
- Override financial calculations.
- Override safety blocks.
- Delete operational records.
- Modify secrets or credentials.
- Impersonate human Users.
- Write to live third-party systems before integration approval.

Agent actions must be attributable through AuditLog or an equivalent future runtime trace.

## 8. Dashboard Rollup Rules

The Centralized Control Dashboard should roll up from canonical objects, not from duplicated view-specific models.

### Executive Rollups

- Open jobs from Job status.
- Jobs scheduled today from Job + DispatchAssignment.
- Jobs completed this week from Job status transitions.
- Outstanding invoices from Invoice status.
- Revenue this week from approved/sent/paid Invoice totals.
- Contractor payouts pending from ContractorPayout status.
- Missed calls/unanswered communications from Communication status.
- Leads requiring follow-up from Lead + Task status.
- Jobs missing documentation from Job + DocumentationArtifact status.
- Jobs ready for invoice review from Job + WorkOrder + DocumentationArtifact + Invoice readiness.
- Safety/compliance exceptions from DocumentationArtifact, Alert, and existing safety schema records.

### Portal Rollups

- Executive portal reads across Organization.
- Support Admin portal reads system/config/QA and non-secret operational records.
- Office/Admin portal reads operational queues.
- Dispatch portal reads Job, Location, Contractor, DispatchAssignment, DocumentationArtifact, and Alerts relevant to scheduling.
- Contractor portal reads assigned Jobs, released DispatchAssignments, own DocumentationArtifacts, and own released ContractorPayout status.
- Client portal is not MVP; future client access reads only released Customer/Location/Job/Invoice/DocumentationArtifact records scoped to that client.

### Alert Rollups

- Runtime-derived alerts may appear immediately in dashboard logic.
- Persisted Alert records are required once a business threshold is crossed or human accountability is needed.
- Critical alerts must be visible in executive and domain-specific views until acknowledged/resolved/dismissed.

## 9. Data Quality Requirements

Canonical records should support:

- Stable IDs for every first-class object.
- `organization_id` on all tenant-scoped records.
- `created_at` and `updated_at` on all mutable records.
- Lifecycle `status` where state matters.
- Related object references for cross-domain traceability.
- Human-readable summary fields where operators need fast review.
- Audit-ready timestamps for approvals, sends, reviews, releases, and sensitive transitions.
- Explicit distinction between required fields and optional enrichment.
- No secrets or raw sensitive documents committed to GitHub.
- No fabricated rates, roster records, job history, customer records, or operational claims.
- Data quality flags should become Alerts or Tasks when they block workflow.

### Minimum Record Integrity Rules

- A Job cannot be dispatch-ready without Location, crew assignment, scope, and safety/documentation requirements.
- A WorkOrder cannot become accepted if required source fields are unresolved.
- A submitted Job cannot become approved without required DocumentationArtifacts or a documented exception.
- A client-facing Invoice cannot be released without explicit Approval.
- A ContractorPayout cannot be approved without linked Jobs and reviewable calculation basis.
- A Communication requiring follow-up should create or link to Task/Alert after threshold.
- A critical Alert cannot be dismissed without reason and actor.
- AuditLog records should not be edited in place.

## 10. Non-Goals

This document does not authorize:

- App code.
- Database migrations.
- Root JSON Schema changes.
- Live integrations.
- Auth setup.
- Storage provisioning.
- AI runtime calls.
- n8n workflow deployment.
- Twilio/Resend setup.
- CRM/accounting writeback.
- Firebase.
- Secrets in repo.
- Sensitive customer documents in repo.
- Automated financial, legal, safety, dispatch, or client-facing approvals.

## 11. Acceptance Criteria

This canonical domain model is accepted when:

- It defines the canonical doctrine for the platform.
- It includes the required objects: Organization, User, Role, Customer, Location, Communication, Lead, Job, WorkOrder, DispatchAssignment, Contractor, Equipment, DocumentationArtifact, Invoice, ContractorPayout, Alert, Task, Approval, and AuditLog.
- Each object defines purpose, primary owner, required fields, optional fields, relationships, lifecycle states, role access notes, agent access notes, dashboard usage, and audit requirements.
- It supports Executive OS, Operations OS, Financial OS, the Centralized Control Dashboard, contractor portal, communications, alerts, invoices, payouts, safety/compliance, and agent workflows.
- It preserves the decisions that Michael Keegan has MVP invoice-release authority, communications are first-class, alerts use a hybrid model, and one app serves multiple portals through role-based plus object-level access.
- It distinguishes planning-level canonical objects from existing root JSON Schemas.
- It does not modify machine schemas, add app code, create integrations, introduce secrets, or introduce Firebase.
- It can serve as the operating-system ontology for future schema, workflow, dashboard, UI/UX, and implementation PRs.
