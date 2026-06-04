# SaaS Portal Access Model

Status: Draft Architecture Decision
Owner: AJ Digital LLC / Audio Jones
Scope: Florida Ramp & Lift Operational Intelligence Platform

## Purpose

The Florida Ramp & Lift platform should be designed as a bespoke internal SaaS product with role-based access and object-level permissions.

The product should not become a generic dashboard. It should be one operational web app with distinct portals for owners, support admins, internal admins, dispatchers, contractors, and eventually clients.

## Core SaaS Model

```txt
Florida Ramp & Lift Platform
  -> Owner / Executive: Michael Keegan
  -> Support Admin: Audio Jones / AJ Digital
  -> Internal Admin: Michael's office/admin team
  -> Dispatchers
  -> Contractors / Installers
  -> Clients / Customers
```

## Recommended Tech Stack

Future implementation should use:

- Next.js + TypeScript.
- Supabase Postgres.
- Supabase Storage.
- Clerk Auth.
- Vercel Deployments.
- Tailwind CSS + shadcn/ui.

## Stack Rationale

Next.js provides a full-stack React framework with App Router, Server Components, Suspense, Server Actions, and strong Vercel deployment support.

Supabase provides Postgres, Row Level Security, and storage primitives suitable for granular data access and operational records.

Clerk provides authentication, organizations, user profiles, and role-based session context without building auth from scratch.

Tailwind and shadcn/ui provide a practical component layer for a role-based internal operations product.

## Stakeholder Access Map

| Stakeholder | Portal Needed | Dashboard Needed | Profile Needed | Access Level |
|---|---|---|---|---|
| Michael Keegan | Yes | Executive Dashboard | Yes | Owner / final approval |
| Audio Jones / AJ Digital | Yes | Admin + Builder Dashboard | Yes | Support Admin |
| Office Admin | Yes | Operations Dashboard | Yes | Internal Admin |
| Dispatcher | Yes | Dispatch Dashboard | Yes | Jobs / scheduling |
| Contractor | Yes | Contractor Portal | Yes | Assigned jobs only |
| Client | Later | Client Portal | Yes | Their jobs/invoices only |

## One-App Architecture

The platform should be one app, not multiple apps.

Suggested route structure:

```txt
/app
  /dashboard
  /executive
  /admin
  /dispatch
  /contractor
  /client
  /settings
```

Users should land in the correct area based on role and object access.

## Portal Architecture

### Executive Portal

Primary user: Michael Keegan.

Needs:

- Executive command center.
- Revenue visibility.
- Open jobs.
- Approval queue.
- Invoice release approvals.
- Contractor issues.
- Missed follow-ups.
- Escalations.
- Daily briefing.

UX model:

```txt
Review -> Approve -> Escalate -> Delegate
```

Michael should not have to live inside operational weeds.

### Support Admin Portal

Primary user: Audio Jones / AJ Digital.

Needs:

- System configuration.
- Agent logs.
- Workflow review.
- Dashboard QA.
- Data cleanup.
- Schema/admin views.
- Automation monitoring.
- Prompt and agent versioning.

UX model:

```txt
Observe -> Diagnose -> Improve -> Configure
```

Support Admin is the system operator, not just a standard user.

### Office/Admin Portal

Primary users: Michael's internal office/admin team.

Needs:

- Job intake.
- Customer records.
- Scheduling.
- Work order updates.
- Documentation review.
- Invoice draft review.
- Follow-up queue.

UX model:

```txt
Capture -> Assign -> Review -> Close
```

### Dispatch Portal

Primary users: dispatchers and approved operations users.

Needs:

- Job scheduling.
- Crew assignment.
- Route/sequence review.
- Dispatch readiness.
- Missing access/material/safety flags.
- Dispatch approval queue.

Dispatch instructions require human approval before external send.

### Contractor Portal

Primary users: installers and field workers.

Contractors should see only:

- Assigned jobs.
- Job location.
- Customer/site contact required for the assigned job.
- Scope of work.
- Required equipment.
- PPE/site requirements.
- Photo upload.
- Notes.
- Completion submission.
- Payout status when released.

UX model:

```txt
See job -> Do job -> Upload proof -> Submit
```

Contractors should not see:

- Company financials.
- Other contractors' payouts.
- Full customer database.
- Executive dashboard.
- AI/system configuration.
- Client contractual rates unless explicitly approved.

### Client Portal

Client portal is not MVP.

Client portal should be Phase 2 or Phase 3 after internal operations are stable.

Future clients may see:

- Estimate.
- Scheduled service.
- Invoice.
- Payment status.
- Documents/photos.
- Service history.

For MVP, client access should be handled through secure links instead of full login.

## Access Control Model

The platform should use role-based access plus object-level permissions.

Role controls what type of actions a user can perform.

Object ownership controls which records they can see.

Examples:

- Contractor can read only jobs assigned to them.
- Client can read only their own jobs and invoices.
- Michael can read and approve everything.
- Audio Jones / AJ Digital can configure the system but should not release client invoices unless delegated.
- AI agents can prepare drafts, summaries, alerts, and recommendations but cannot approve sensitive actions.

## Recommended Roles

- `owner`
- `support_admin`
- `office_admin`
- `dispatcher`
- `finance`
- `lead_installer`
- `contractor`
- `client`
- `ai_agent`

Optional or future roles may include `executive` and `installer` if the implementation needs narrower access bands.

## MVP Build Order

### Phase 1: Internal Command Center

Build first:

- Auth.
- Organizations/accounts.
- User profiles.
- Role permissions.
- Dashboard shell.
- Job records.
- Contractor records.
- Invoice records.
- Alert records.
- Manual communication records.

### Phase 2: Contractor Portal

Then build:

- Contractor login.
- Assigned job list.
- Job detail page.
- Photo upload.
- Completion submission.
- Payout status.

### Phase 3: Agent Layer

Then add:

- Executive Assistant AI.
- Dispatch Agent.
- Invoice Agent.
- Documentation Agent.
- Alert Agent.

### Phase 4: Client Access

Last:

- Secure estimate links.
- Secure invoice links.
- Client portal.
- Payment status.
- Service history.

## MVP Product Decision

MVP should serve:

- Michael Keegan.
- Audio Jones / AJ Digital.
- Office/Admin.
- Contractors.

Do not optimize for clients first.

The first product win is internal operational control, not customer-facing SaaS.

Client portal should come after internal operations are clean.

## Non-Goals

This architecture decision does not authorize:

- App scaffolding.
- Auth implementation.
- Database migrations.
- Supabase setup.
- Clerk setup.
- Vercel deployment.
- Client portal buildout.
- Live integrations.
- Payment rails.
- Firebase.
- Secrets or credentials.

