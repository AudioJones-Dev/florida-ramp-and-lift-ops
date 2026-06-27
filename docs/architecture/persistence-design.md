# Persistence Design

**Status:** Git Spec-Ready Draft  
**Scope:** Database, storage, event/audit, and access-control persistence design  
**Runtime impact:** None  
**Implementation status:** Design only

## 1. Executive Summary

This document defines the persistence design for the Florida Ramp & Lift Operational Intelligence Platform before implementing Supabase, Clerk, storage buckets, migrations, auth enforcement, or live integrations.

The MVP prototype is now ready for persistence design because the core workflow surfaces have stabilized:

- First-class Lead intake.
- Manual Customer, Job, Contractor, Communication, DocumentationArtifact, Invoice, Alert, and Approval records.
- ContractorAssignment workflow surface.
- Explicit invoice readiness flags.
- Approval decision notes.
- Mock audit/event timelines.
- Local-only documentation/photo upload placeholders.
- Role-aware navigation and portal assumptions.

The next implementation branch should not start until this persistence design is accepted.

## 2. Persistence Doctrine

Persistence must preserve the operating model rather than turn the app into generic CRUD.

Doctrine:

- The database becomes the runtime source of truth for live records.
- GitHub remains the specification/execution system.
- Obsidian remains the business memory and decision system.
- Dashboards read canonical state; they do not invent state.
- State transitions produce events and audit trails.
- Approvals are first-class records, not button-click side effects.
- Communications are first-class records before integrations.
- Documentation/photo metadata is stored in database tables; binary files live in object storage.
- Role-based permissions and object-level access both matter.
- Michael Keegan remains final MVP authority for client-facing invoice release.
- No Firebase is permitted.

## 3. Recommended Database Approach

Recommended approach: relational Postgres-first design.

The platform should use a normalized operational database with:

- UUID primary keys.
- Explicit tenant/organization scoping.
- Status columns backed by constrained enums or check constraints.
- Join tables for many-to-many relationships.
- Separate event and audit-log tables.
- Separate file metadata from file storage.
- Object-level access modeled through direct foreign keys and scoped access rules.

Supabase Postgres remains a reasonable future implementation target, but this document does not authorize Supabase setup, client installation, migrations, environment variables, or storage buckets.

## 4. Required Tables/Entities

Required MVP persistence entities:

- `organizations`
- `users`
- `profiles`
- `roles`
- `user_roles`
- `leads`
- `customers`
- `locations`
- `jobs`
- `work_orders`
- `contractors`
- `contractor_capabilities`
- `contractor_assignments`
- `communications`
- `documentation_artifacts`
- `invoices`
- `invoice_jobs`
- `contractor_payouts`
- `alerts`
- `approvals`
- `approval_decisions`
- `tasks`
- `events`
- `audit_logs`
- `files`
- `file_metadata`

Deferred but expected future entities:

- `equipment`
- `job_equipment`
- `rate_sheets`
- `invoice_line_items`
- `contractor_payout_items`
- `external_integrations`
- `external_object_links`

## 5. Table Naming Convention

Use snake_case plural table names.

Rules:

- Tables: `jobs`, `documentation_artifacts`, `audit_logs`.
- Columns: `organization_id`, `created_at`, `invoice_ready_for_review`.
- Enum/status values: snake_case strings, such as `needs_review`, `ready_for_review`, `client_invoice_release`.
- Join tables: `<left>_<right>`, such as `invoice_jobs` and `user_roles`.
- External IDs: `<provider>_<object>_id` or generic `external_object_links` when provider count grows.
- App type `ContractorAssignment` should map to database table `contractor_assignments` for MVP, with canonical documentation noting it represents `DispatchAssignment`.

## 6. Primary Key Strategy

Use UUID primary keys for all persisted first-class records.

Recommended pattern:

- Primary key column: `id uuid primary key`.
- Human-readable business identifiers stay separate:
  - `job_number`
  - `invoice_number`
  - `work_order_number`
  - `display_name`
- All mutable records include:
  - `organization_id`
  - `created_at`
  - `updated_at`
  - `created_by_user_id`
  - `updated_by_user_id`

Do not use hand-authored mock IDs such as `job_001` as production primary keys.

## 7. Tenant/Organization Model

The MVP may serve one organization, but persistence must include tenant boundaries from the start.

`organizations` is the root tenant table.

Every tenant-scoped table should include:

- `organization_id`
- row-level access policy design
- indexes beginning with `organization_id`

Single-tenant MVP does not remove the need for organization scoping because:

- Support Admin access must be auditable.
- Future reusable Worksie/ResponseOS patterns may need multiple organizations.
- Contractors and future clients need object-level constraints.

## 8. Core Table Designs

### `organizations`

Purpose: tenant/account boundary.

Required columns:

- `id`
- `name`
- `slug`
- `status`
- `timezone`
- `created_at`
- `updated_at`

Optional columns:

- `legal_name`
- `primary_contact_user_id`
- `support_notes`
- `metadata`

### `users` / `profiles`

Purpose: authenticated actor plus platform profile.

Design rule: keep auth provider identity separate from profile data.

`users` required columns:

- `id`
- `organization_id`
- `auth_provider`
- `auth_provider_user_id`
- `email`
- `status`
- `created_at`
- `updated_at`

`profiles` required columns:

- `id`
- `organization_id`
- `user_id`
- `display_name`
- `phone`
- `profile_type`
- `contractor_id`
- `customer_id`
- `default_portal`
- `created_at`
- `updated_at`

### `leads`

Purpose: intake/opportunity record before Job.

Required columns:

- `id`
- `organization_id`
- `customer_id`
- `communication_id`
- `lead_type`
- `status`
- `source`
- `owner_user_id`
- `contact_name`
- `contact_phone`
- `next_step`
- `created_at`
- `updated_at`

Optional columns:

- `contact_email`
- `location_id`
- `estimated_value`
- `priority`
- `lost_reason`
- `converted_job_id`
- `metadata`

### `customers`

Purpose: residential or commercial customer/account.

Required columns:

- `id`
- `organization_id`
- `customer_type`
- `display_name`
- `status`
- `primary_contact_name`
- `primary_contact_phone`
- `primary_contact_email`
- `source`
- `created_at`
- `updated_at`

Optional columns:

- `billing_contact_name`
- `billing_contact_email`
- `billing_address`
- `hubspot_contact_id`
- `hubspot_company_id`
- `notes`
- `metadata`

### `jobs`

Purpose: operational hub for field work.

Required columns:

- `id`
- `organization_id`
- `customer_id`
- `location_id`
- `lead_id`
- `work_order_id`
- `job_number`
- `job_type`
- `status`
- `scheduled_for`
- `assigned_owner_user_id`
- `documentation_status`
- `invoice_readiness_status`
- `invoice_ready_for_review`
- `scope_summary`
- `notes`
- `created_at`
- `updated_at`

Optional columns:

- `completed_at`
- `approved_at`
- `approved_by_user_id`
- `invoice_id`
- `metadata`

### `contractors`

Purpose: contractor/installer roster and compliance state.

Required columns:

- `id`
- `organization_id`
- `full_name`
- `phone`
- `email`
- `role`
- `status`
- `pay_type`
- `default_rate_or_split`
- `vehicle_access`
- `tool_access`
- `ppe_compliance_status`
- `safety_training_status`
- `start_date`
- `created_at`
- `updated_at`

Optional columns:

- `emergency_contact`
- `service_areas`
- `notes`
- `metadata`

### `contractor_assignments`

Purpose: MVP dispatch/contractor assignment package.

Canonical mapping: this table represents the MVP implementation of `DispatchAssignment`.

Required columns:

- `id`
- `organization_id`
- `job_id`
- `contractor_id`
- `status`
- `scheduled_window`
- `scope`
- `site_contact`
- `location_summary`
- `documentation_status`
- `ppe_status`
- `payout_status`
- `created_at`
- `updated_at`

Optional columns:

- `accepted_at`
- `rejected_at`
- `started_at`
- `submitted_at`
- `completion_note`
- `rejection_reason`
- `metadata`

### `communications`

Purpose: first-class communication history.

Required columns:

- `id`
- `organization_id`
- `communication_type`
- `direction`
- `status`
- `source_channel`
- `contact_name`
- `summary`
- `related_object_type`
- `related_object_id`
- `follow_up_owner_user_id`
- `created_at`
- `updated_at`

Optional columns:

- `subject`
- `thread_id`
- `external_message_id`
- `requires_follow_up`
- `follow_up_due_at`
- `sent_at`
- `received_at`
- `metadata`

### `documentation_artifacts`

Purpose: proof-of-work, billing evidence, safety evidence, and file-backed records.

Required columns:

- `id`
- `organization_id`
- `artifact_type`
- `related_object_type`
- `related_object_id`
- `job_id`
- `status`
- `source`
- `review_gate`
- `submitted_by_user_id`
- `reviewed_by_user_id`
- `created_at`
- `updated_at`

Optional columns:

- `reviewed_at`
- `rejection_reason`
- `sensitive_flag`
- `notes`
- `metadata`

### `invoices`

Purpose: invoice readiness/review record. QuickBooks remains final accounting ledger.

Required columns:

- `id`
- `organization_id`
- `customer_id`
- `invoice_number`
- `invoice_class`
- `status`
- `amount_cents`
- `currency`
- `approval_owner_user_id`
- `readiness_summary`
- `quickbooks_reference`
- `created_at`
- `updated_at`

Optional columns:

- `approved_at`
- `approved_by_user_id`
- `sent_at`
- `paid_at`
- `metadata`

### `alerts`

Purpose: runtime-derived and persisted alerts after business threshold.

Required columns:

- `id`
- `organization_id`
- `source_object_type`
- `source_object_id`
- `severity`
- `status`
- `owner_user_id`
- `summary`
- `threshold_rule`
- `created_at`
- `updated_at`

Optional columns:

- `acknowledged_at`
- `resolved_at`
- `escalated_at`
- `resolution_notes`
- `dismissal_reason`
- `metadata`

### `approvals`

Purpose: approval request and current approval lifecycle state.

Required columns:

- `id`
- `organization_id`
- `approval_category`
- `approval_type`
- `related_object_type`
- `related_object_id`
- `status`
- `requested_by_user_id`
- `approver_user_id`
- `risk`
- `target_transition`
- `evidence_summary`
- `blocking_rule`
- `created_at`
- `updated_at`

Optional columns:

- `expires_at`
- `superseded_by_approval_id`
- `metadata`

### `events`

Purpose: durable business facts for state transitions, dashboard updates, future agents, alerts, and automations.

Required columns:

- `id`
- `organization_id`
- `event_name`
- `event_family`
- `source_object_type`
- `source_object_id`
- `source_previous_state`
- `source_next_state`
- `actor_type`
- `actor_id`
- `occurred_at`
- `idempotency_key`
- `created_at`

Optional columns:

- `correlation_id`
- `causation_id`
- `approval_id`
- `alert_id`
- `payload`
- `metadata`

### `audit_logs`

Purpose: append-only accountability record.

Required columns:

- `id`
- `organization_id`
- `actor_type`
- `actor_id`
- `action`
- `related_object_type`
- `related_object_id`
- `occurred_at`
- `created_at`

Optional columns:

- `previous_state`
- `next_state`
- `field_changes`
- `reason`
- `approval_id`
- `alert_id`
- `event_id`
- `metadata`

### `files` / `file_metadata`

Purpose: metadata for object-storage files.

`files` required columns:

- `id`
- `organization_id`
- `bucket`
- `path`
- `mime_type`
- `file_size`
- `checksum`
- `uploaded_by_user_id`
- `uploaded_at`
- `created_at`

`file_metadata` required columns:

- `id`
- `organization_id`
- `file_id`
- `documentation_artifact_id`
- `related_object_type`
- `related_object_id`
- `review_status`
- `sensitive_flag`
- `retention_status`
- `created_at`
- `updated_at`

## 9. Relationships

Required relationships:

- `organizations` has many all tenant-scoped records.
- `users` belongs to `organizations`.
- `profiles` belongs to `users`.
- `user_roles` joins `users` and `roles`.
- `customers` has many `locations`, `leads`, `jobs`, `communications`, and `invoices`.
- `leads` may link to `customers`, `communications`, `locations`, and converted `jobs`.
- `jobs` belongs to `customers` and `locations`.
- `jobs` may link to `leads`, `work_orders`, `contractor_assignments`, `documentation_artifacts`, `invoices`, `alerts`, `approvals`, and `events`.
- `contractor_assignments` belongs to `jobs` and `contractors`.
- `documentation_artifacts` belongs to a source object and may have many `files`.
- `invoices` belongs to `customers` and joins to `jobs` through `invoice_jobs`.
- `alerts`, `approvals`, `events`, and `audit_logs` use source-object references and should still include direct foreign keys where practical for common objects.

## 10. State/Status Columns

Every lifecycle object needs a constrained `status` field.

Initial status sets should follow:

- Lead: `new`, `contacted`, `qualified`, `estimate_needed`, `estimate_sent`, `approved`, `converted`, `lost`.
- Customer: `prospect`, `active`, `on_hold`, `inactive`, `archived`.
- Job: `pending`, `scheduled`, `assigned`, `dispatch_ready`, `in_progress`, `submitted`, `documentation_review`, `approved`, `invoice_review`, `invoiced`, `paid`, `closed`, `incomplete`, `return_needed`, `on_hold`, `cancelled`.
- Contractor: `candidate`, `trainee`, `helper`, `lead_installer`, `senior_lead`, `inactive`.
- Communication: `new`, `needs_review`, `draft`, `approved_to_send`, `sent`, `received`, `unanswered`, `resolved`, `held`, `cancelled`.
- DocumentationArtifact: `required`, `missing`, `submitted`, `needs_review`, `approved`, `rejected`, `held`, `archived`.
- Invoice: `draft`, `needs_review`, `approved`, `edited`, `held`, `rejected`, `sent`, `delivered`, `paid`, `voided`.
- Alert: `runtime_only`, `open`, `acknowledged`, `assigned`, `escalated`, `resolved`, `dismissed`, `reopened`.
- Approval: `requested`, `approved`, `rejected`, `held`, `cancelled`, `expired`, `superseded`.
- ContractorAssignment: `assigned`, `accepted`, `rejected`, `in_progress`, `submitted`.

Before migration implementation, reconcile Lead `converted` with canonical `converted_to_job`.

## 11. Explicit Readiness Flags

Do not derive readiness from display strings.

Required readiness fields:

- `jobs.invoice_readiness_status`
- `jobs.invoice_ready_for_review`
- `jobs.documentation_status`
- `documentation_artifacts.review_gate`
- `invoices.status`
- `approvals.status`

Recommended future readiness fields:

- `jobs.dispatch_ready`
- `jobs.documentation_complete`
- `jobs.safety_review_required`
- `jobs.client_invoice_blocked`
- `invoices.requires_michael_approval`
- `contractor_assignments.documentation_required`
- `contractor_assignments.ppe_blocked`

## 12. Event/Audit Persistence Model

Use both `events` and `audit_logs`.

Events answer:

```txt
What business fact happened?
```

Audit logs answer:

```txt
Who or what did it, what changed, and why?
```

Rules:

- Every sensitive state transition creates an event and audit log.
- Approval decisions create an approval decision record, event, and audit log.
- Documentation upload/review creates event and audit log.
- Client-facing invoice release creates event and audit log.
- Contractor payout approval/release creates event and audit log.
- Future agent recommendations create events and/or audit logs when they influence workflow.
- Audit logs are append-only.
- Events must include idempotency keys.

## 13. Approval Decision Persistence

Use `approvals` for the request/current lifecycle and `approval_decisions` for decision history.

`approval_decisions` required columns:

- `id`
- `organization_id`
- `approval_id`
- `decision`
- `decision_notes`
- `decided_by_user_id`
- `decided_at`
- `created_at`

Rules:

- Decision notes are required for approve, hold, and reject.
- Client-facing invoice release requires Michael Keegan approval in MVP.
- AI Agent cannot create final approval decisions.
- Superseded approvals should preserve old decisions.
- Approval decision should link to event and audit log.

## 14. Documentation/Photo Storage Metadata

Object storage should hold files; database tables hold metadata and review state.

Required file categories:

- Before photos.
- After photos.
- Completion notes.
- Safety checklists.
- Work order PDFs.
- Invoice PDFs.
- Contractor field attachments.

Rules:

- Contractors can upload only for assigned jobs.
- Files are not visible to clients unless explicitly released in a future phase.
- Sensitive file access must be audited.
- Upload retry/offline support is future scope but metadata should support partial states.
- File deletion should be soft-delete or retention-state driven, not destructive by default.

## 15. Object-Level Access Model

Use role-based access plus object-level scope.

Role controls allowed action type. Object scope controls visible rows.

Examples:

- Owner can read all organization records and approve client invoice release.
- Support Admin can inspect non-secret operational records and configuration but cannot release client invoices unless delegated.
- Office Admin can manage customers, leads, jobs, communications, documentation, and tasks.
- Dispatcher can manage jobs, locations, contractors, and assignments within dispatch scope.
- Finance can manage invoices, payouts, and financial approvals.
- Contractor can read only assigned jobs, related documentation requirements, own submissions, and released payout status.
- Client is not MVP and should have no row access until future client portal/secure-link design.
- AI Agent can read/write only explicitly granted draft/recommendation records and cannot approve, release, send, delete, or override.

## 16. Role/Access Implications

Persistence design must prepare for future auth without implementing it.

Required tables:

- `users`
- `profiles`
- `roles`
- `user_roles`

Required policy concepts:

- `organization_id` scoping.
- assigned contractor job scope.
- financial record restrictions.
- approval authority checks.
- support admin auditability.
- future client release scopes.
- AI agent restricted role.

Do not implement Clerk or auth code in this branch.

## 17. Index/Search Requirements

Required indexes:

- `organization_id` on all tenant-scoped tables.
- `(organization_id, status)` on lifecycle tables.
- `(organization_id, created_at)` on operational tables.
- `(organization_id, updated_at)` on operational tables.
- `(organization_id, customer_id)` on leads, locations, jobs, invoices, communications.
- `(organization_id, job_id)` on contractor_assignments, documentation_artifacts, invoice_jobs.
- `(organization_id, contractor_id)` on contractor_assignments and contractor_payouts.
- `(organization_id, source_object_type, source_object_id)` on alerts, events, audit_logs.
- `(organization_id, related_object_type, related_object_id)` on communications, tasks, approvals.
- `(organization_id, approver_user_id, status)` on approvals.
- `(organization_id, owner_user_id, status, severity)` on alerts.
- `(organization_id, invoice_readiness_status, invoice_ready_for_review)` on jobs.

Search needs:

- customer name/contact search.
- job number and status search.
- contractor name/skill/status search.
- communication summary/contact/channel search.
- invoice number/customer/status search.
- alert/approval owner/status/severity search.

## 18. Seed Data Strategy

Seed data should support local development and demos without contaminating production.

Rules:

- Demo scenarios should be seedable in local/dev only.
- Seed records should use stable fixtures but production UUIDs should be generated by the database.
- Seed files should not contain real customer PII.
- Seed files should not contain secrets.
- Demo records should be visibly labeled as demo/mock.
- Seed scripts should be idempotent.
- Production data should never be seeded from mock scenario files.

Recommended seed groups:

- base organization.
- users/profiles/roles.
- customers/leads/jobs.
- contractors/assignments.
- communications/documentation/invoices.
- alerts/approvals/events/audit logs.
- demo scenarios.

## 19. Migration Strategy

Migration strategy should be deliberate and staged.

Recommended order:

1. Create organization, user/profile, role, and role assignment tables.
2. Create core operational tables: customers, locations, leads, jobs, contractors.
3. Create communication and documentation tables.
4. Create assignment and invoice tables.
5. Create alerts, approvals, approval decisions, tasks.
6. Create events and audit logs.
7. Create files and file metadata.
8. Add indexes and constraints.
9. Add seed data for local/dev only.
10. Add read-only app wiring after migrations are validated.

No migration files should be created until this design is accepted.

## 20. Non-Goals

This document does not authorize:

- Database implementation.
- Supabase setup.
- Supabase client install.
- Clerk setup.
- Auth code.
- Migration files.
- Storage buckets.
- Environment files.
- Secrets.
- HubSpot sync.
- QuickBooks sync.
- ResponseOS integration.
- AI automation.
- n8n production workflows.
- Twilio/Resend setup.
- Client portal.
- Payment processing.
- Firebase.

## 21. Acceptance Criteria

This persistence design is accepted when:

- It defines database approach and persistence doctrine.
- It defines required tables/entities.
- It defines naming, primary key, and organization-scoping rules.
- It defines core table designs for required MVP objects.
- It defines relationships and status/readiness columns.
- It separates events from audit logs.
- It defines approval decision persistence.
- It defines documentation/photo metadata requirements.
- It defines object-level access and role implications.
- It defines indexes/search needs.
- It defines seed and migration strategy.
- It explicitly excludes Supabase setup, Clerk, auth code, migrations, secrets, live integrations, AI automation, and Firebase.

## 22. Implementation Sequence

Recommended next implementation sequence after this design is accepted:

1. Create database schema design review branch.
2. Convert this document into migration specification.
3. Review enum/status reconciliation.
4. Review object-level access rules.
5. Review storage metadata and bucket policy.
6. Create migrations without app wiring.
7. Add local/dev seed data.
8. Add read-only data access layer.
9. Add write paths for manual records.
10. Add auth shell and role enforcement.
11. Add storage-backed documentation upload.
12. Add event/audit persistence.
13. Add HubSpot sync later.
14. Add QuickBooks sync later.
15. Add ResponseOS later.
16. Add AI automation later.
