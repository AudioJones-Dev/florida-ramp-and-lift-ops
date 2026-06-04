# Canonical Data Schema

Status: Draft Domain Model
Owner: AJ Digital LLC / Audio Jones
Repo: `AudioJones-Dev/florida-ramp-and-lift-ops`
Scope: Florida Ramp & Lift Operational Intelligence Platform

## Purpose

This document is the canonical domain model for the Florida Ramp & Lift Operational Intelligence Platform.

It defines the shared business objects used by FLR Executive OS, FLR Operations OS, FLR Financial OS, the Centralized Control Dashboard, future agents, workflows, and automations.

No app feature, workflow, dashboard, agent, or integration should define its own competing version of these objects. If a future workflow needs a new field, state, relationship, or approval rule, this document is the first planning surface to update before implementation.

## Doctrine

- One object definition per business concept.
- State transitions drive automation; button clicks do not define business truth.
- Financial, client-facing, contractor-facing, and internal-only records must remain separated.
- Human approval gates must be explicit before external communication, dispatch, invoice release, payout action, or safety exception dismissal.
- Agents may prepare, validate, summarize, and flag records; they may not silently approve or release sensitive actions.
- Root-level `schemas/*.schema.json` remain the current machine-readable contracts where they already exist.
- This document is product-level and planning-level. Schema implementation changes belong in separate future PRs.

## Existing Machine Schemas

Current root JSON Schemas:

- `schemas/client.schema.json`
- `schemas/invoice.schema.json`
- `schemas/job.schema.json`
- `schemas/safety.schema.json`
- `schemas/scope-line-item.schema.json`
- `schemas/work-order.schema.json`

Objects without root JSON Schemas are defined here for planning and future schema work.

## Domain Object Index

| Object | Domain | Current Machine Schema |
|---|---|---|
| Customer | Executive OS / Operations OS | `schemas/client.schema.json` maps part of this concept today. |
| Location | Operations OS | Not yet defined as root schema. |
| Communication | Executive OS / Operations OS | Not yet defined as root schema. |
| Lead | Executive OS / Operations OS | Not yet defined as root schema. |
| Job | Operations OS | `schemas/job.schema.json` |
| WorkOrder | Operations OS | `schemas/work-order.schema.json` |
| Dispatch | Operations OS | Not yet defined as root schema. |
| Contractor | Operations OS / Financial OS | Not yet defined as root schema. |
| Equipment | Operations OS | Not yet defined as root schema. |
| Documentation | Operations OS / Compliance | Not yet defined as root schema. |
| Invoice | Financial OS | `schemas/invoice.schema.json` |
| Payout | Financial OS | Not yet defined as root schema. |
| Alert | Cross-domain | Not yet defined as root schema. |
| Task | Cross-domain | Not yet defined as root schema. |
| Approval | Cross-domain | Not yet defined as root schema. |
| User | Cross-domain | Not yet defined as root schema. |
| Role | Cross-domain | Not yet defined as root schema. |

## Customer

| Attribute | Definition |
|---|---|
| Purpose | Represents the paying, requesting, or associated customer/client account, such as WillScot, Mobile Mini, a direct residential customer, or another client tenant. |
| Owner | Owner / Executive for account authority; Office Admin for operational maintenance. |
| Required Fields | `customer_id`, `customer_type`, `display_name`, `status`, `primary_contact_name`, `primary_contact_phone`, `primary_contact_email`, `billing_contact`, `created_at`, `updated_at`. |
| Relationships | Has many Locations, Leads, Jobs, WorkOrders, Communications, Invoices, Tasks, Alerts. |
| Lifecycle States | `prospect`, `active`, `on_hold`, `inactive`, `archived`. |
| Approval Rules | New enterprise/customer account activation requires Owner or assigned admin approval. Billing-contact changes require human review. |
| Agent Access Rules | Agents may summarize customer history, flag missing contact data, and prepare CRM-ready drafts. Agents may not create live customer records in third-party systems or send customer messages without approval. |

## Location

| Attribute | Definition |
|---|---|
| Purpose | Represents a physical job site, customer address, equipment yard, storage location, or service area used for dispatch, zone pricing, safety, and job history. |
| Owner | Operations Admin / Dispatcher. |
| Required Fields | `location_id`, `customer_id`, `location_type`, `site_name`, `street_address`, `city`, `state`, `zip`, `zone_id`, `access_notes`, `created_at`, `updated_at`. |
| Relationships | Belongs to Customer; has many Jobs, WorkOrders, Dispatch records, Communications, Documentation records, Alerts. |
| Lifecycle States | `unverified`, `verified`, `dispatch_ready`, `access_issue`, `inactive`, `archived`. |
| Approval Rules | A job cannot be dispatch-ready until the Location is verified or explicitly approved with unresolved access notes. Zone overrides require admin rationale. |
| Agent Access Rules | Agents may normalize address text, suggest zone classification, and flag access gaps. Agents may not override zones or mark access issues resolved without human approval. |

## Communication

| Attribute | Definition |
|---|---|
| Purpose | Represents any business-relevant communication, including calls, missed calls, voicemail, SMS, email, CRM notes, contractor messages, internal notes, and future AI-prepared drafts. |
| Owner | Office Admin for operations; Owner for executive/client-sensitive communication. |
| Required Fields | `communication_id`, `communication_type`, `direction`, `status`, `source_channel`, `related_object_type`, `related_object_id`, `participants`, `summary`, `created_at`, `updated_at`. |
| Relationships | May link to Customer, Lead, Job, WorkOrder, Dispatch, Contractor, Invoice, Alert, Task, Approval. |
| Lifecycle States | `new`, `needs_review`, `draft`, `approved_to_send`, `sent`, `received`, `unanswered`, `resolved`, `held`, `cancelled`. |
| Approval Rules | External messages require explicit human approval before send. Missed calls and unanswered customer communications should generate follow-up Tasks or Alerts after threshold. |
| Agent Access Rules | Agents may summarize communications, draft responses, detect follow-up needs, and link communications to records. Agents may not send messages or mark sensitive issues resolved without approval. |

## Lead

| Attribute | Definition |
|---|---|
| Purpose | Represents a potential job, customer opportunity, referral, call-in request, website inquiry, or inbound operational opportunity before it becomes a Job or WorkOrder. |
| Owner | Owner / Executive for sales priority; Office Admin for intake follow-up. |
| Required Fields | `lead_id`, `source`, `customer_name`, `contact_name`, `contact_phone`, `contact_email`, `location_id`, `lead_status`, `service_requested`, `priority`, `created_at`, `updated_at`. |
| Relationships | May create Customer, Location, Communication, Job, Task, Alert. |
| Lifecycle States | `new`, `contact_needed`, `qualified`, `estimate_needed`, `estimate_sent`, `approved`, `converted_to_job`, `lost`, `closed`. |
| Approval Rules | Converting a Lead to a Job requires human review. Pricing or estimate send requires human approval. |
| Agent Access Rules | Agents may triage lead source, summarize requested work, flag missing contact data, and recommend follow-up. Agents may not send estimates or convert to job without human approval. |

## Job

| Attribute | Definition |
|---|---|
| Purpose | Represents the atomic unit of field work executed by Florida Ramp & Lift. Every operational workflow flows through Job. |
| Owner | Operations Admin / Dispatcher; Owner for exception override. |
| Required Fields | Existing schema requires `job_id`, `client_id`, `job_type`, `status`, `site_address`, `site_city`, `crew_members`, `scope_line_items`, `safety_record_id`, `notes`, `created_at`, `version`. |
| Relationships | Belongs to Customer/Client and Location; may reference WorkOrder, Dispatch, Contractor, Equipment, Documentation, Invoice, Payout, Alert, Task, Approval. |
| Lifecycle States | `pending`, `scheduled`, `in_progress`, `submitted`, `approved`, `invoiced`, `paid`, `incomplete`, `return_needed`, `on_hold`, `cancelled`. |
| Approval Rules | Human approval required before submitted becomes approved. Human approval required before invoice review if required documentation or safety records are missing. |
| Agent Access Rules | Agents may validate fields, recommend state changes, detect missing documentation, and prepare summaries. Agents may not approve jobs, dispatch crews, or invoice jobs without approval. |

## WorkOrder

| Attribute | Definition |
|---|---|
| Purpose | Represents a client-issued authorization or scope document, such as a WillScot work order PDF. |
| Owner | Operations Admin for intake; Financial Reviewer for invoice readiness. |
| Required Fields | `work_order_id`, `customer_id`, `work_order_number`, `source`, `status`, `site_address`, `scope_line_items`, `received_at`, `created_at`, `updated_at`. |
| Relationships | Belongs to Customer and Location; may create one or more Jobs; links to Documentation, Communication, Invoice, Alert, Task, Approval. |
| Lifecycle States | `received`, `parsed`, `needs_review`, `accepted`, `scheduled`, `completed`, `invoice_ready`, `invoiced`, `closed`, `rejected`, `held`. |
| Approval Rules | Parsed WorkOrders require human review before acceptance. WorkOrders with missing fields or unmatched line items cannot become invoice_ready without review. |
| Agent Access Rules | Agents may extract, normalize, flag, and draft WorkOrder records. Agents may not accept WorkOrders or resolve parser blockers without approval. |

## Dispatch

| Attribute | Definition |
|---|---|
| Purpose | Represents a crew/date assignment package for scheduled Jobs, including sequence, route assumptions, safety advisories, materials, and communication status. |
| Owner | Dispatcher / Operations Admin. |
| Required Fields | `dispatch_id`, `scheduled_date`, `crew_members`, `jobs_in_sequence`, `dispatch_status`, `review_status`, `created_at`, `updated_at`. |
| Relationships | Has many Jobs; references Contractors, Locations, Equipment, Communications, Tasks, Alerts, Approvals. |
| Lifecycle States | `draft`, `needs_review`, `approved`, `sent`, `in_progress`, `completed`, `held`, `cancelled`, `revised`. |
| Approval Rules | Dispatch cannot be sent to crews without human approval. Route or crew override requires reason. |
| Agent Access Rules | Dispatch Agent may assign jobs in draft state, suggest routes, rebalance schedules in draft state, sequence jobs, and flag gaps. Agents may not send dispatch instructions or override safety blocks without approval. |

## Contractor

| Attribute | Definition |
|---|---|
| Purpose | Represents an installer, helper, lead, trainee, senior lead, subcontractor, or other field worker used for dispatch, documentation, compliance, and payout review. |
| Owner | Operations Admin for roster; Finance for pay fields; Owner for final authority. |
| Required Fields | `contractor_id`, `full_name`, `phone`, `email`, `role`, `status`, `pay_type`, `default_rate_or_split`, `service_areas`, `skills`, `vehicle_access`, `tool_access`, `ppe_compliance_status`, `safety_training_status`, `start_date`, `emergency_contact`, `notes`. |
| Relationships | Has many Jobs, Dispatch records, Documentation records, Payouts, Communications, Alerts, Tasks, Approvals. |
| Lifecycle States | `candidate`, `trainee`, `helper`, `lead_installer`, `senior_lead`, `inactive`. |
| Approval Rules | Pay type, default split, status promotion, and deactivation require human approval. Safety compliance gaps can block dispatch assignment. |
| Agent Access Rules | Agents may flag roster gaps, skill mismatches, compliance issues, and workload imbalance. Agents may not change pay fields, status, or compliance status without approval. |

## Equipment

| Attribute | Definition |
|---|---|
| Purpose | Represents installed, recovered, delivered, serviced, or assigned equipment such as ramps, stair lifts, VPLs, vehicle lifts, tools, parts, and reusable materials. |
| Owner | Operations Admin / Inventory owner. |
| Required Fields | `equipment_id`, `equipment_type`, `status`, `location_id`, `customer_id`, `job_id`, `serial_or_asset_id`, `condition`, `created_at`, `updated_at`. |
| Relationships | May link to Customer, Location, Job, WorkOrder, Dispatch, Documentation, Invoice, Alert, Task. |
| Lifecycle States | `available`, `assigned`, `installed`, `serviced`, `recovered`, `damaged`, `retired`, `missing`, `unknown`. |
| Approval Rules | Equipment condition changes, missing equipment, retirement, or billable damage require human review. |
| Agent Access Rules | Agents may summarize equipment history, flag missing serials, and detect condition conflicts. Agents may not mark equipment recovered, damaged, or retired without approval. |

## Documentation

| Attribute | Definition |
|---|---|
| Purpose | Represents required evidence and records: photos, signed forms, work order PDFs, voice notes, safety checklists, closeout notes, and supporting files. |
| Owner | Operations Admin / Safety reviewer. |
| Required Fields | `documentation_id`, `documentation_type`, `related_object_type`, `related_object_id`, `status`, `source`, `summary`, `created_at`, `updated_at`. |
| Relationships | May link to Job, WorkOrder, Dispatch, Contractor, Equipment, Invoice, Alert, Task, Approval. |
| Lifecycle States | `required`, `missing`, `submitted`, `needs_review`, `approved`, `rejected`, `held`, `archived`. |
| Approval Rules | Missing required documentation can block job approval and invoice review. Sensitive files must not be committed to the repo. |
| Agent Access Rules | Agents may check completeness, summarize files, and flag missing evidence. Agents may not approve incomplete documentation or expose sensitive records. |

## Invoice

| Attribute | Definition |
|---|---|
| Purpose | Represents a contractor invoice or client invoice with strict separation between payout-facing and client-facing financial data. |
| Owner | Financial Reviewer; Michael Keegan for MVP client-facing release authority. |
| Required Fields | Existing schema requires `invoice_id`, `invoice_class`, `totals`, `audit_reference`, `audit_log`, `created_at`. |
| Relationships | References Jobs, WorkOrders, Customer, Contractor, Payout, Communication, Alert, Task, Approval, Documentation. |
| Lifecycle States | `draft`, `needs_review`, `approved`, `rejected`, `edited`, `held`, `sent`, `delivered`, `paid`, `voided`. |
| Approval Rules | Client invoices require explicit human approval before release. Michael Keegan is final MVP approval authority. Contractor invoices require review when configured or flagged. |
| Agent Access Rules | Invoice Agent may validate readiness, flag missing documentation, and prepare drafts. Agents may not approve, send, finalize, or pay invoices. |

## Payout

| Attribute | Definition |
|---|---|
| Purpose | Represents contractor payout readiness, payout calculation, adjustment, approval, and downstream payment status. |
| Owner | Finance / Owner. |
| Required Fields | `payout_id`, `contractor_id`, `pay_period_start`, `pay_period_end`, `status`, `jobs_included`, `gross_amount`, `adjustments_total`, `net_amount`, `created_at`, `updated_at`. |
| Relationships | Belongs to Contractor; references Jobs, Invoice, Approval, Alert, Task, Communication. |
| Lifecycle States | `draft`, `needs_review`, `approved`, `held`, `rejected`, `paid`, `voided`. |
| Approval Rules | Payout approval requires human review. Adjustments require reason. Payment execution is out of scope until separately approved. |
| Agent Access Rules | Agents may calculate draft payout summaries and flag anomalies. Agents may not approve or execute payouts. |

## Alert

| Attribute | Definition |
|---|---|
| Purpose | Represents a threshold-crossing issue requiring attention, ownership, acknowledgement, resolution, or escalation. |
| Owner | Depends on source domain; unresolved critical alerts roll up to Owner / Executive. |
| Required Fields | `alert_id`, `source_object_type`, `source_object_id`, `severity`, `status`, `owner`, `created_at`, `acknowledged_at`, `resolved_at`, `escalation_status`, `resolution_notes`. |
| Relationships | May link to any domain object, especially Job, WorkOrder, Communication, Contractor, Invoice, Payout, Documentation, Safety, Task, Approval. |
| Lifecycle States | `open`, `acknowledged`, `assigned`, `escalated`, `resolved`, `dismissed`, `reopened`. |
| Approval Rules | Critical financial and safety alerts require human acknowledgement. Dismissals require reason. Agents cannot resolve alerts without approval. |
| Agent Access Rules | Agents may derive runtime alerts and recommend persisted alerts. Agents may not dismiss or resolve persisted alerts without approval. |

## Task

| Attribute | Definition |
|---|---|
| Purpose | Represents an assigned unit of follow-up work created by users, workflows, alerts, communications, or agent recommendations. |
| Owner | Assigned user or role. |
| Required Fields | `task_id`, `task_type`, `status`, `priority`, `owner`, `related_object_type`, `related_object_id`, `due_at`, `created_at`, `updated_at`. |
| Relationships | May link to Customer, Lead, Communication, Job, WorkOrder, Dispatch, Contractor, Invoice, Alert, Approval. |
| Lifecycle States | `open`, `assigned`, `in_progress`, `blocked`, `completed`, `cancelled`, `overdue`. |
| Approval Rules | Completing a task does not approve the underlying sensitive business action unless an Approval record exists. |
| Agent Access Rules | Agents may create draft task recommendations and flag overdue tasks. Agents may not complete approval-sensitive tasks without human confirmation. |

## Approval

| Attribute | Definition |
|---|---|
| Purpose | Represents explicit human approval, rejection, hold, override, or escalation decision tied to a business action. |
| Owner | Approver role for the relevant action. |
| Required Fields | `approval_id`, `approval_type`, `related_object_type`, `related_object_id`, `requested_by`, `approver`, `decision`, `decision_notes`, `decided_at`, `created_at`. |
| Relationships | Links to Job, WorkOrder, Dispatch, Communication, Invoice, Payout, Alert, Documentation, Contractor, Task. |
| Lifecycle States | `requested`, `approved`, `rejected`, `held`, `cancelled`, `expired`, `superseded`. |
| Approval Rules | Approvals must be auditable and tied to a specific object/action. Sensitive approvals cannot be inferred from comments or task completion. |
| Agent Access Rules | Agents may prepare approval packets and recommend decisions. Agents may not record final approvals as a human. |

## User

| Attribute | Definition |
|---|---|
| Purpose | Represents an authenticated human or system actor that reads, writes, reviews, approves, escalates, or audits records. |
| Owner | Owner / Admin. |
| Required Fields | `user_id`, `display_name`, `email`, `status`, `roles`, `created_at`, `updated_at`. |
| Relationships | Has Roles; owns Tasks, Approvals, Communications, Alerts, audit actions. |
| Lifecycle States | `invited`, `active`, `suspended`, `inactive`, `archived`. |
| Approval Rules | Role assignment, suspension, and permission escalation require admin approval. |
| Agent Access Rules | Agents may not impersonate users. Agent actions must identify the agent and the approving human when applicable. |

## Role

| Attribute | Definition |
|---|---|
| Purpose | Represents a named permission bundle for users and agents. |
| Owner | Owner / Admin. |
| Required Fields | `role_id`, `role_name`, `role_type`, `permissions`, `status`, `created_at`, `updated_at`. |
| Relationships | Assigned to Users and AI Agents; referenced by Approval and audit rules. |
| Lifecycle States | `draft`, `active`, `deprecated`, `archived`. |
| Approval Rules | Creating or changing roles requires Owner/Admin approval. Roles that approve invoices, payouts, or dispatch must be audited. |
| Agent Access Rules | AI Agent role permissions must be narrower than human roles and must preserve human approval gates. |

## Cross-Object Relationship Rules

- Customer owns Locations, Leads, Jobs, WorkOrders, Communications, Invoices, Tasks, and Alerts.
- Location anchors dispatch, zone pricing, safety context, and job history.
- Lead may convert to Job only after human review.
- Job is the operational hub for WorkOrder, Dispatch, Contractor, Documentation, Invoice, Payout, Alert, Task, and Approval records.
- Invoice and Payout are separate objects. Contractor payout logic must not leak into client invoices.
- Communication records should link to their source object and may create Tasks or Alerts.
- Approval records must reference the exact object and action approved.
- Alert records may be derived at runtime, but threshold-crossing alerts should persist for accountability.

## Recommended Next Schema PRs

1. Expand `docs/schemas/dashboard-schema.md`.
2. Expand `docs/schemas/communication-schema.md`.
3. Expand `docs/schemas/contractor-schema.md`.
4. Add an alert schema planning doc.
5. Add state transition tables to `docs/schemas/system-state-machine.md`.
6. Only after planning approval, propose root-level JSON Schemas for missing first-class objects.
