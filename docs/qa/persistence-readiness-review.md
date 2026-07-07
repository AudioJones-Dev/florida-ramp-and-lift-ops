# Persistence Readiness Review

**Status:** QA Review  
**Branch:** `qa/persistence-readiness-review`  
**Scope:** Persistence readiness after MVP UX/state cleanup  
**Runtime changes:** None

## 1. Executive Summary

The Florida Ramp & Lift MVP prototype is now ready to move into persistence design.

The previous pre-database blockers were materially reduced:

- Lead now has a first-class mock surface.
- Demo scenarios now have detail routes.
- Invoice readiness uses explicit mock state/boolean fields instead of executable text matching.
- Approval workflow decisions now require local-only decision notes.
- Detail pages now include mock audit/event timelines.
- Contractor and documentation workflows now include local-only upload placeholders.
- Job, documentation, invoice, approval, and scenario details are more workflow-specific.
- Dashboard copy now prioritizes Michael's next actions.

The prototype is not ready for direct Supabase/Clerk implementation yet. The next step should be a database design branch that translates the canonical domain model into a migration-ready persistence plan, including table boundaries, relationships, indexes, storage policy, audit/event strategy, and role/object access rules.

## 2. Go/No-Go Recommendation

**Recommendation: Go for persistence design. No-go for persistence implementation.**

Start the persistence design artifact now. Do not create Supabase tables, Clerk auth, storage buckets, live integrations, secrets, or production migrations until the persistence design is reviewed and accepted.

The correct next step is a spec/design branch, not infrastructure wiring.

## 3. Objects Ready For Persistence

These objects are stable enough for initial database modeling:

| Object | Readiness | Notes |
|---|---|---|
| Lead | Ready for design | First-class route and mock records now exist. Needs canonical status reconciliation before migration. |
| Customer | Ready for design | Stable MVP fields and relationships to Lead, Job, Communication, Invoice. |
| Job | Ready for design | Core operational object is stable enough, including explicit invoice readiness flags. |
| Contractor | Ready for design | Roster fields align with contractor portal and dispatch assumptions. |
| Communication | Ready for design | First-class records are stable enough for manual entry and future HubSpot/ResponseOS boundaries. |
| DocumentationArtifact | Ready for design | State and upload placeholder are sufficient to define metadata and storage relationships. |
| Invoice | Ready for design | Ready as invoice readiness/review record, not QuickBooks ledger replacement. |
| Alert | Ready for design | Source object references, severity, status, owner, and threshold rule are sufficient for persisted alerts. |
| Approval | Ready for design | Approval packet and decision-note model are ready for database design. |
| ContractorAssignment | Ready for design with refinement | Operationally useful, but status naming should be reconciled with canonical `DispatchAssignment`. |

## 4. Objects Needing Refinement

These should not block database design, but they must be addressed before migrations are implemented:

| Object | Refinement Needed |
|---|---|
| Organization | Needed for tenant boundary, even if MVP has one organization. |
| User | Needed for auth, ownership, approvals, and audit attribution. |
| Role | Needed for portal routing and object-level access. |
| Location | Current mock jobs use `siteAddress`; database design needs separate Location records. |
| WorkOrder | Required by canonical model and invoice readiness, but not yet first-class in app UI. |
| DispatchAssignment | Current app uses `ContractorAssignment`; persistence should use canonical naming or explicitly map it. |
| ContractorPayout | Present through approval/payout text, but needs its own table/entity before financial persistence. |
| Task | Follow-up behavior exists, but task records are not first-class yet. |
| AuditLog | Mock timeline exists; append-only persisted audit table still needs design. |
| Equipment | Not required for first persistence slice unless dispatch/equipment readiness is included. |

## 5. Required Database Tables/Entities

Initial persistence design should include:

- `organizations`
- `users`
- `roles`
- `user_roles`
- `customers`
- `locations`
- `leads`
- `communications`
- `jobs`
- `work_orders`
- `dispatch_assignments`
- `contractors`
- `contractor_capabilities`
- `documentation_artifacts`
- `invoices`
- `contractor_payouts`
- `alerts`
- `approvals`
- `tasks`
- `events`
- `audit_logs`

Recommended support tables:

- `attachments` or `storage_objects`
- `object_links` for polymorphic relationships if needed
- `state_transitions`
- `approval_decisions` if approval history may include multiple decisions or supersession
- `alert_events` if alert lifecycle history should be queryable separately from general events

## 6. Required Relationships

Minimum relationships for MVP persistence:

- Organization has many Users, Roles, Customers, Jobs, Contractors, Invoices, Alerts, Approvals, Events, AuditLogs.
- User has many role assignments, owned Tasks, owned Alerts, requested Approvals, decided Approvals, AuditLogs.
- Customer has many Locations, Leads, Communications, Jobs, Invoices.
- Lead belongs to Customer when known and links to Communication; Lead may convert to Job.
- Job belongs to Customer and Location; Job may reference Lead, WorkOrder, DispatchAssignment, Contractor, DocumentationArtifact, Invoice, Alert, Task, Approval.
- DispatchAssignment belongs to Job and Contractor.
- DocumentationArtifact belongs to a source object, usually Job, WorkOrder, DispatchAssignment, Contractor, or Invoice.
- Invoice belongs to Customer and may link to one or more Jobs and WorkOrders.
- ContractorPayout belongs to Contractor and links to Jobs and Approval.
- Alert references any first-class source object.
- Approval references any approval-sensitive source object.
- Event references a source object and may link to Approval, Alert, and AuditLog.
- AuditLog references actor, source object, optional event, optional approval, and optional alert.

## 7. Required Indexes/Search Needs

Recommended indexes:

- `organization_id` on every tenant-scoped table.
- `(organization_id, status)` on lifecycle objects.
- `(organization_id, created_at)` and `(organization_id, updated_at)` on operational objects.
- `(organization_id, customer_id)` on Leads, Locations, Jobs, Communications, Invoices.
- `(organization_id, job_id)` on DispatchAssignments, DocumentationArtifacts, Invoices, ContractorPayout links.
- `(organization_id, contractor_id)` on DispatchAssignments and ContractorPayouts.
- `(organization_id, source_object_type, source_object_id)` on Alerts, Events, AuditLogs.
- `(organization_id, related_object_type, related_object_id)` on Communications, Tasks, Approvals.
- `(organization_id, approver_user_id, status)` on Approvals.
- `(organization_id, owner_user_id, status, severity)` on Alerts.
- `(organization_id, invoice_readiness_status, invoice_ready_for_review)` on Jobs.
- `(organization_id, source_channel, status)` on Communications.

Search needs:

- Customer/contact search by display name, contact name, phone, and email.
- Job search by job number, customer name, job type, location, and status.
- Contractor search by full name, role, status, service area, and skills.
- Communication search by contact, channel, summary, and related object.
- Invoice search by invoice number, customer, status, and QuickBooks reference.
- Alert/approval search by source object, owner/approver, status, and severity.

## 8. Required Audit/Event Tables

Persistence design should separate business events from audit logs.

### `events`

Purpose: durable business facts consumed by dashboards, alerts, approvals, future agents, and future integrations.

Required fields:

- `event_id`
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
- `correlation_id`
- `causation_id`
- `approval_id`
- `alert_id`
- `payload`
- `metadata`

### `audit_logs`

Purpose: append-only accountability record for sensitive reads, writes, approvals, releases, overrides, agent recommendations, and state transitions.

Required fields:

- `audit_log_id`
- `organization_id`
- `actor_type`
- `actor_id`
- `action`
- `related_object_type`
- `related_object_id`
- `previous_state`
- `next_state`
- `field_changes`
- `reason`
- `approval_id`
- `alert_id`
- `event_id`
- `occurred_at`
- `created_at`

Rules:

- AuditLog should be append-only.
- Approval decisions must create audit logs.
- Client-facing invoice release must create audit logs.
- Documentation upload/review must create audit logs.
- Contractor payout approval/release must create audit logs.
- Future agent actions must be attributable to `ai_agent` plus approving human where applicable.

## 9. Storage Requirements For Documentation/Photos

Documentation upload placeholders are ready to become storage design requirements.

Storage design must support:

- Job photos.
- Before/after photos.
- Completion packets.
- Work order PDFs.
- Safety checklists.
- Contractor notes or field attachments.
- Invoice PDF references.
- Future voicemail/call recording references if approved.

Required storage metadata:

- `storage_object_id`
- `organization_id`
- `documentation_artifact_id`
- `related_object_type`
- `related_object_id`
- `bucket`
- `path`
- `mime_type`
- `file_size`
- `checksum`
- `uploaded_by_user_id`
- `uploaded_at`
- `review_status`
- `sensitive_flag`
- `retention_status`

Storage rules:

- Do not store sensitive files in GitHub.
- Contractors may upload only to assigned-job contexts.
- Clients should not see documentation unless explicitly released in a future client access phase.
- Finance can read billing-relevant approved documentation.
- Sensitive documents require audit logging on upload, review, download, and release.

## 10. Auth/Access Implications

Role and object access assumptions are clear enough for auth design, but not yet ready for implementation.

Required roles:

- `owner`
- `support_admin`
- `office_admin`
- `dispatcher`
- `finance`
- `lead_installer`
- `contractor`
- `client`
- `ai_agent`

Access model requirements:

- Role controls allowed actions.
- Object-level scope controls visible records.
- Contractors can read only assigned jobs, released dispatch information, their own documentation submissions, and released payout status.
- Clients are out of MVP; future access must be scoped to their own released customer/job/invoice/documentation records.
- Michael Keegan retains MVP final approval authority for client-facing invoice release.
- Support Admin can configure/review system behavior but should not release client-facing invoices unless explicitly delegated.
- AI Agent role cannot approve, release, send, delete, or override sensitive actions.

Auth design should happen after database design because permission rules depend on table relationships.

## 11. Risks Before Supabase/Clerk

Do not start Supabase/Clerk until these risks are resolved in design:

- Naming mismatch between `ContractorAssignment` app type and canonical `DispatchAssignment`.
- Missing first-class persistence design for Location, WorkOrder, ContractorPayout, Task, User, Role, Organization, and AuditLog.
- Need to choose relationship strategy for polymorphic source object references.
- Need to define state transition enforcement rules instead of only storing status fields.
- Need to define whether Events and AuditLogs are both persisted on every transition or only sensitive transitions.
- Need to define storage bucket/path policy before file uploads exist.
- Need to define object-level access policy before auth routes are hardened.
- Need to decide how demo/mock data will seed local development without contaminating production data.
- Need to define migrations and seed data standards before any database implementation.

## 12. Recommended Next Branch

Recommended next branch:

```txt
feat/persistence-design
```

Recommended next artifact:

```txt
docs/architecture/persistence-design.md
```

That document should define:

- Database provider decision boundary.
- Table/entity list.
- Field-level schema.
- Relationship model.
- Status enum model.
- Event/audit strategy.
- Storage object model.
- Role/object access strategy.
- Seed/mock data strategy.
- Migration acceptance criteria.
- Explicit non-goals for live integrations and secrets.

## 13. Acceptance Criteria For Starting Persistence Implementation

Persistence implementation may begin only after:

- `docs/architecture/persistence-design.md` exists and is accepted.
- Canonical app object names are reconciled with database table names.
- `ContractorAssignment` vs `DispatchAssignment` naming is resolved.
- Organization/User/Role tables are defined even if auth implementation waits.
- Location and WorkOrder relationships are defined for Job.
- ContractorPayout persistence boundary is defined.
- Event and AuditLog tables are defined with append-only rules.
- Approval decision persistence and note requirements are defined.
- Documentation storage metadata and access rules are defined.
- Object-level access rules are mapped to table relationships.
- Seed data strategy is defined for the existing demo scenarios.
- No secrets are added to the repo.
- Firebase remains explicitly prohibited.
- Supabase/Clerk setup is not started until the accepted design authorizes it.

## Findings Summary

The MVP UX/state cleanup did what it needed to do: it made the prototype coherent enough to model persistence without locking in the worst mock shortcuts.

The system is now strong enough to design tables around:

- First-class Lead intake.
- Operational Job state.
- Explicit invoice readiness.
- Human approval with decision notes.
- Documentation/storage requirements.
- Event/audit traceability.
- Queue-driven operational work.
- Role-aware portal assumptions.

The remaining gaps are database-design gaps, not prototype-blocking UX gaps.

## Final Recommendation

Proceed to persistence design on `feat/persistence-design`.

Do not proceed directly to Supabase, Clerk, migrations, storage buckets, auth enforcement, HubSpot, QuickBooks, ResponseOS, AI automation, secrets, or Firebase.
