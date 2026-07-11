# Live App Gap-Closure Plan

Status: Git Spec-ready draft — sequenced delivery plan, pending operator review
Scope: The path from the current mock/manual MVP scaffold to a live, client-deliverable internal app
Runtime impact: None
Implementation status: Documentation only

## Purpose

This plan defines the safe, sequenced path from the repository's **current
mock/manual Next.js MVP scaffold with a Clerk auth shell** to a **live,
client-deliverable app**. It is a delivery lens over the existing phase model in
[`RELEASE_PLAN.md`](./RELEASE_PLAN.md); it does not replace it, and it does not
authorize any runtime, persistence, integration, secret, or deploy work.

**"Client-deliverable" here means deliverable to the Florida Ramp & Lift
business** — Michael Keegan and the internal operators (office/admin, dispatch,
finance, contractors) — as a live internal operational tool. Per
[`../architecture/mvp-definition.md`](../architecture/mvp-definition.md), the
external **Client Portal is out of scope** and is **not** built by any phase in
this plan.

Grounded in and cross-linked with:

- Readiness audit: [`../qa/build-docs-readiness-audit.md`](../qa/build-docs-readiness-audit.md)
- Release phases + gates: [`RELEASE_PLAN.md`](./RELEASE_PLAN.md)
- Deployment target + gated checklists: [`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md)
- Product scope: [`../architecture/mvp-definition.md`](../architecture/mvp-definition.md)
- Go/no-go gate: [`../architecture/implementation-readiness-gate.md`](../architecture/implementation-readiness-gate.md)
- Auth scope: [`../architecture/auth-foundation.md`](../architecture/auth-foundation.md)
- Persistence design: [`../architecture/persistence-design.md`](../architecture/persistence-design.md)
- Migration planning: [`MIGRATION_PLAN.md`](./MIGRATION_PLAN.md)
- Quality gates: [`../governance/DEFINITION_OF_READY.md`](../governance/DEFINITION_OF_READY.md),
  [`../governance/DEFINITION_OF_DONE.md`](../governance/DEFINITION_OF_DONE.md),
  [`../governance/DEFINITION_OF_STABLE.md`](../governance/DEFINITION_OF_STABLE.md)
- Risk register: [`../governance/RISK_REGISTER.md`](../governance/RISK_REGISTER.md)
- Legal/privacy doctrine: [`../legal/LEGAL_PRIVACY_DOCTRINE.md`](../legal/LEGAL_PRIVACY_DOCTRINE.md)
- Repo identity: [`../../REPO_IDENTITY.md`](../../REPO_IDENTITY.md),
  [`../system/REPO_BOUNDARY_MAP.md`](../system/REPO_BOUNDARY_MAP.md)

**Governance precedence.** Every "approval gate" below is an explicit human stop
per [`../../AGENTS.md`](../../AGENTS.md) (operator keyword `proceed`) and the AJ
Digital OS governance kernel. This document is a plan, not an authorization.

## Current scope (baseline)

Per the readiness audit and `RELEASE_PLAN.md`, the repo is at **Phase 2:
manual/mock MVP scaffold**:

- Next.js app with a role-aware dashboard shell and a Clerk auth **shell** (no
  real keys); mock role preview at `/mock-sign-in`; protected dashboard routes.
- UI reads local mock/fixture records from `src/lib/`; mock event/audit
  timelines; documentation upload is a **local placeholder only**.
- **No** database, migrations, storage buckets, API clients, HubSpot/QuickBooks/
  ResponseOS, email/SMS, PDF generation, runtime AI, Firebase, or production
  deploy config exist in this repo.
- No production deploy is authorized; the repo is not linked to any Vercel project.

Phase 1 (documentation foundation) is largely complete and the readiness-gate
language has been reconciled with the Clerk scaffold. Phase 3 (persistence) is
design-ready but not implementation-ready.

## Phase map (this plan ↔ `RELEASE_PLAN.md`)

| This plan | RELEASE_PLAN phase | One-line intent |
|---|---|---|
| **A — Phase 2 closure** | Phase 2 (close) | Formally close the mock/manual MVP; accept reconciled gates. |
| **B — Authenticated internal pilot** | Phase 2 (deploy) | Ship the protected mock scaffold live on the ops domain — sanitized fixtures, no real data. |
| **C — Controlled persistence foundation** | Phase 3 | Accept persistence design; migrations, DB, object-level access — no app writes yet. |
| **D — Documentation artifacts & storage** | Phase 3 (storage) | Storage buckets + file/artifact metadata + contractor-scoped upload. |
| **E — Client-deliverable live MVP** | Phase 3 → live | Internal command center live on **real** persisted data, access enforced. |
| **F — Controlled integrations + hardening** | Phases 4–5 | HubSpot/QuickBooks/comms/PDF/AI one at a time, gated; monitoring/backup/IR. |

Sequencing rule: each phase depends on the prior. B can ship on mock data before
C exists (the pilot handles no real data). C must precede D and E. Real customer
data is not allowed until C + D + E gates are met.

---

## Phase A — Phase 2 closure

**Goal.** Formally close the manual/mock MVP scaffold as a coherent, accepted
baseline so persistence and deploy work can begin against a fixed reference. Ships
no new product surface.

**User-facing outcome.** None for end users. Operators get an accepted Phase 2
baseline, a reconciled readiness gate, and a Phase 2 closure checklist they can
sign off against.

**Required implementation work.** (Docs/governance only.)
- Adopt the readiness audit ([`../qa/build-docs-readiness-audit.md`](../qa/build-docs-readiness-audit.md))
  as the Phase 2 reference and record acceptance in `DECISION_LOG.md`.
- Produce a **Phase 2 closure checklist** (the audit's recommended next gate):
  role-aware shell present, mock records/queues/approval flows present, mock/demo
  data visibly labeled, no live integrations, `/mock-sign-in` clearly not
  authorization.
- Confirm the reconciled `implementation-readiness-gate.md` baseline (§20/§22) and
  `README.md`/`RELEASE_PLAN.md` status language are accepted.
- Confirm mock/fixture-data isolation rules (mock is mock; no fixture ID becomes a
  production ID without a persistence plan).

**Approval gates.**
- Accepting/overwriting governance docs → operator `proceed` (`AGENTS.md`:
  overwriting accepted docs).
- No runtime, migration, secret, or deploy action in this phase.

**Out of scope.** Any app/runtime change; persistence; deploy; auth production
config; removing the mock scaffold.

**Acceptance criteria.**
- Phase 2 closure checklist exists and is operator-accepted.
- Readiness gate + status docs have no known contradictions (audit "contradictory
  language" items resolved).
- Decision log records Phase 2 closure and the go-forward gate.

**Validation required.**
- `npm run typecheck`, `npm run lint`, `npm run build` green (docs-only, but keep
  the tree green).
- Operator review/sign-off of the closure checklist.

**Risks.**
- Closing Phase 2 while stale language remains → re-litigation later. Mitigate:
  resolve the audit's reconciliation items first.
- Treating mock demo data as real. Mitigate: explicit isolation rule + labels.

---

## Phase B — Authenticated internal pilot

**Goal.** Make the app **live for the first time** — the protected mock/manual
scaffold, authenticated with real Clerk, deployed to the ops domain — **on
sanitized fixtures only, with no persistence and no real data**. This is the
`DEPLOYMENT_TARGET.md` "next live milestone," not the client-deliverable MVP.

**User-facing outcome.** Internal reviewers sign in with real Clerk auth at an
approved host in the `floridarampandliftops.com` domain family, land in their
role dashboards, and navigate the mock surfaces on a real URL. No real
operational data is present.

**Required implementation work.** (Operator-gated; per `DEPLOYMENT_TARGET.md`.)
- Choose and confirm the production domain `floridarampandliftops.com` and DNS
  access — a **hard blocker** for Clerk production keys (domain-bound).
- Verify and configure the existing Clerk Production instance; configure
  sign-in/up + redirect URLs; establish `pk_live_`/`sk_live_` credentials stored
  only in Vercel env / approved secret manager (never in Git).
- Create the Vercel project `florida-ramp-and-lift-ops` (audiojones team), link the
  repo (`.vercel/` gitignored), set the five env var names.
- Accept legal/privacy doctrine coverage before circulating the ops domain
  ([`../legal/LEGAL_PRIVACY_DOCTRINE.md`](../legal/LEGAL_PRIVACY_DOCTRINE.md)).
- Preview deploy → verify auth + protected routes + `/mock-sign-in` → production
  pilot deploy; record in `CHANGELOG.md`. Keep the rollback runbook current.

**Approval gates.** Each of these is a separate `proceed` per `DEPLOYMENT_TARGET.md`
§Human Approval Gates: accept the target doc; create/link the Vercel project;
configure the existing Clerk Production instance for the confirmed domain;
write any env var; preview deploy; publish/link Terms/Privacy; production pilot
deploy. The unclear-provenance `.env.production.local` Secret Key was rotated
and Q3 closed 2026-07-10; deleting/replacing the existing instance remains a
separate destructive approval.

**Out of scope.**
- Any persistence, storage, migrations, real records, or live integrations.
- Real customer data, private rate sheets, production files, or signed documents.
- Clerk organizations/invitations; object-level authorization (Clerk alone is not
  object-level authz).
- The external client portal.

**Acceptance criteria.**
- Real Clerk sign-in works on the approved application host in the
  `floridarampandliftops.com` domain family; protected routes redirect
  unauthenticated users; `/mock-sign-in` remains a labeled preview, not authz.
- Only sanitized fixture/demo data is present; mock/manual labels visible.
- Env vars present by name in the target environment; no secret in Git/docs/logs.
- Rollback runbook validated (a previous Ready deployment exists).

**Validation required.**
- `npm run typecheck`, `npm run lint`, `npm run build` green at the deploy SHA.
- `clerk doctor` (or dashboard verification) clean after the operator links Clerk.
- Manual verification of `/`, `/sign-in`, `/mock-sign-in`, `/dashboard` on the
  preview then pilot URL; findings recorded in `CHANGELOG.md`.

**Risks.**
- Changing the domain later regenerates the Clerk publishable key → set production
  env only after the domain is final.
- Deployment Protection 401 on protected routes is protection state, not app
  failure — do not misread it.
- Pilot mistaken for production ops. Mitigate: sanitized data only + explicit labels
  + no persistence.

---

## Phase C — Controlled persistence foundation

**Goal.** Turn the accepted persistence **design** into a real data foundation —
database, schema, object-level access — **without app write paths yet**, per
[`../architecture/persistence-design.md`](../architecture/persistence-design.md)
§22. This is the substrate the client-deliverable MVP requires.

**User-facing outcome.** None directly at first. It is the foundation that lets
records become real, tenant-scoped, and access-controlled instead of local mock
fixtures.

**Required implementation work.** (Backend-first; each step operator-gated.)
- Accept `persistence-design.md`; open a **migration-spec branch** (design →
  migration specification) before any SQL. Reconcile enum/status sets (e.g. Lead
  `converted` vs `converted_to_job`).
- Choose the DB provider (Postgres-first; Supabase is the recommended-but-not-yet-
  authorized target). Create migrations in the staged order (§19): org/user/role →
  core operational → communications/documentation → assignments/invoices →
  alerts/approvals/decisions/tasks → events/audit → files/metadata → indexes.
- Enforce `organization_id` tenant scoping, UUID PKs, separate `events` vs
  `audit_logs`, first-class `approvals` + `approval_decisions`.
- Model role + **object-level** access (§15): owner/support_admin/office_admin/
  dispatcher/finance/contractor scopes; AI agent restricted; client no row access.
- Local/dev-only seed strategy (§18): idempotent, labeled demo, DB-generated UUIDs,
  no PII/secrets, never seed production from mock scenario files.
- Add a read-only data-access layer after migrations validate (no write paths in
  this phase).

**Approval gates.** Per `AGENTS.md` + `persistence-design.md` §20: creating
migrations, buckets, API clients, secrets, env files, or a DB provider; adding
database/auth-enforcement runtime code. Each migration applied to a live DB is
operator-gated. No Firebase.

**Out of scope.**
- Storage buckets/file binaries (Phase D).
- App write paths, live integrations, AI automation (later phases).
- Client portal row access.
- Converting existing mock fixture IDs into production IDs.

**Acceptance criteria.**
- Migrations create the required entities with `organization_id` scoping, UUID PKs,
  constrained status enums, and the required indexes.
- Object-level access rules are defined and enforced at the data layer; cross-tenant
  and cross-role access is denied in tests.
- Read-only access layer returns canonical state; dashboards read state, do not
  invent it.
- Seed runs in dev only, idempotent, labeled, no PII/secrets.

**Validation required.**
- `npm run typecheck`, `npm run lint`, `npm run build` green.
- Migrations applied to a branch/staging DB first; RLS/object-scope tests
  (cross-tenant + cross-role denied) pass before any prod apply.
- Enum/status reconciliation reviewed against `operational-state-machine.md`.

**Risks.**
- Implementing before the design is accepted → churn. Mitigate: acceptance gate
  first, migration-spec branch second.
- Object-level authz gaps (Clerk identity ≠ row scope). Mitigate: explicit
  per-object scope rules + tests before any real data.
- Money-sensitive records (invoices, payouts) — treat every transition as
  event+audit per design §12.

---

## Phase D — Documentation artifacts & storage

**Goal.** Replace the local upload placeholder with a real **object-storage +
metadata** pipeline for proof-of-work, billing, and safety evidence — file binaries
in storage, metadata/review state in the database — with contractor-scoped upload
and audited sensitive access (`persistence-design.md` §14).

**User-facing outcome.** Field/office users upload before/after photos, completion
notes, safety checklists, and attachments that are durably stored, attributed, and
visible in review queues. Contractors can upload only for their assigned jobs.

**Required implementation work.**
- Create the storage bucket(s) and the `files` / `file_metadata` + `documentation_artifacts`
  tables/relationships (metadata separate from binaries).
- Enforce: contractors upload only for assigned jobs; files not client-visible unless
  a future explicit release; sensitive-file access audited; soft-delete/retention,
  not destructive delete.
- Upload validation (type/size), partial-state support for future retry/offline,
  and review-gate state on artifacts.
- Wire documentation upload/review to events + audit logs.

**Approval gates.** Per `AGENTS.md`: creating storage buckets; adding storage runtime
code; any change to what is client-visible. Sensitive-file handling reviewed against
`SECURITY.md` and the financial/documentation guardrails.

**Out of scope.**
- Client-facing file release/visibility (future phase).
- PDF generation, real customer-PDF ingestion before storage/security policy is
  accepted, and any live integration.
- WC/legal-document handling beyond what the MVP evidence set requires.

**Acceptance criteria.**
- Every stored file resolves to an uploader + related object + artifact record;
  binaries live in storage, metadata in the DB.
- Contractor upload is scoped to assigned jobs; unauthorized upload/read denied.
- Sensitive access is audit-logged; deletion is soft/retention-driven.
- Client projection exposes no internal evidence.

**Validation required.**
- `npm run typecheck`, `npm run lint`, `npm run build` green.
- Manual + automated: upload/read as contractor (assigned vs unassigned), office,
  finance; verify scoping, audit entries, retention behavior.
- Negative tests: cross-job and client-side access denied.

**Risks.**
- Evidence attribution depends on Phase C records — do not start D before C's
  identity/assignment tables land.
- Storage access policy errors leak sensitive files. Mitigate: scoped policies +
  audit + review before real files.
- Retention/orphaned-file drift. Mitigate: soft-delete + retention state, tested.

---

## Phase E — Client-deliverable live MVP

**Goal.** Reach the milestone where the **internal command center is live on real
persisted data with object-level access enforced** — usable by Michael and the
internal team to answer "what work is happening, who owns it, what is blocked, what
needs review, what is ready for invoice approval." This is the client-deliverable
milestone (deliverable to the FLR business), **not** the external client portal.

**User-facing outcome.** Real office/admin, dispatch, finance, and contractor users
capture and manage real records; the executive dashboard shows real state; approvals
and invoice-readiness queues work on real data; Michael holds final authority on
client-facing invoice release.

**Required implementation work.**
- Add app **write paths** for manual records on top of Phase C/D (create/update jobs,
  customers, communications, assignments, documentation, approvals, invoice
  readiness), with role + object-level enforcement.
- Enforce readiness flags from data (not display strings): job documentation/invoice
  readiness, approval status, Michael-approval gate on client-facing invoice release.
- Promote from the Phase B pilot to production ops on `floridarampandliftops.com`
  with real data enabled — behind the full gate set.
- Satisfy the go/no-go gate (`implementation-readiness-gate.md` §22) and
  `RELEASE_PLAN.md` release gates: DoR/DoD/Definition of Stable, security + failure
  modes reviewed, role/object permissions validated, no secrets in repo, rollback
  plan complete. Accept ops-domain Terms/Privacy per the legal doctrine.

**Approval gates.** Production operations with real data → operator `proceed`,
additionally gated on the readiness gate §22 and release gates. Client-facing invoice
release → **Michael Keegan** authority (MVP invariant). Publishing Terms/Privacy →
operator/counsel per `LEGAL_PRIVACY_DOCTRINE.md`. Handling real customer data →
requires C + D complete.

**Out of scope.**
- The external **client portal** (excluded by `mvp-definition.md`).
- Automated invoice release, automated payout release, automated customer comms.
- Live HubSpot/QuickBooks/ResponseOS sync and runtime AI (Phase F).
- Native mobile, predictive dispatch, forecasting, payment processing.

**Acceptance criteria.**
- Real users complete the core workflows (intake → job → dispatch/assignment →
  documentation → approval → invoice readiness → Michael release queue) on real data.
- No cross-role or cross-tenant leak; contractor payout data never leaks to clients
  or unrelated contractors.
- Draft/estimated financials labeled; client-facing invoice release blocked without
  Michael approval.
- Readiness gate §22 + release gates satisfied and recorded; rollback plan complete.

**Validation required.**
- `npm run typecheck`, `npm run lint`, `npm run build` green; deploy verified and
  logged in `CHANGELOG.md`.
- End-to-end workflow test with real accounts across roles.
- Cross-role/cross-tenant leak audit executed and recorded.
- Security + failure-mode review (`SECURITY.md`, `FAILURE_MODES.md`) signed off.

**Risks.**
- Declaring "deliverable" while a leak path or unmet gate remains. The §22 + release
  gates are the bar, not a sense of doneness.
- Legal exposure if Terms/Privacy publish before counsel/operator sign-off — hard
  gate.
- Scope creep into the excluded client portal or into automated release. Hold both
  lines.

---

## Phase F — Controlled integrations + production hardening

**Goal.** Add external integrations **one at a time behind human gates**, and
complete production hardening — monitoring, incident response, backup, access review
— per `RELEASE_PLAN.md` Phases 4–5. Automation may draft; humans release.

**User-facing outcome.** Where enabled and approved, operators get integration-backed
convenience (e.g. HubSpot/QuickBooks reference sync, templated comms, PDF export) and
the platform runs with monitoring, backups, and a release/rollback discipline.

**Required implementation work.**
- Integrations one at a time, each its own gated branch: HubSpot, QuickBooks,
  ResponseOS, email/SMS, PDF generation, runtime AI — respecting each MVP boundary
  (reference/manual first; no integration as source of truth; QuickBooks stays the
  accounting ledger; ResponseOS not autonomous).
- Keep invoice release and payout release **human-gated**; keep AI non-authoritative
  (no approve/release/send/delete/override).
- Production hardening (Phase 5): observability/monitoring, incident response,
  backup/restore, periodic access review, release checklist accepted.
- Audit-log every outbound customer-facing action.

**Approval gates.** Per `AGENTS.md` + `mvp-definition.md`: adding any integration,
provider secret, or runtime AI; sending any email/SMS/customer communication;
releasing any invoice or payout. Each is a separate `proceed`; first real
customer-facing send is operator go/no-go, not a config default. No Firebase.

**Out of scope.**
- Automated invoice/payout release; autonomous AI agents; bulk/ungated messaging;
  payment processing; the client portal; standalone Worksie OS.

**Acceptance criteria.**
- Each integration is off by default and active only after design acceptance + gated
  branch + operator approval; none is a source of truth.
- Every outbound customer-facing action is audit-logged and attributable.
- No invoice/payout releases without a human action; AI cannot approve/release/send.
- Monitoring, backup/restore, incident response, and access review are in place and
  exercised.

**Validation required.**
- `npm run typecheck`, `npm run lint`, `npm run build` green; deploy verified/logged.
- Controlled test sends/syncs to internal recipients before any real send.
- Backup/restore and rollback rehearsed; monitoring alerts verified.
- Gate rehearsal: a send/release cannot occur without opt-in + admin + operator
  approval.

**Risks.**
- Customer-facing messaging is the highest blast radius. Keep opt-in + admin checks +
  provider env gates.
- Provider cost/rate exposure (SMS, AI). Mitigate: limits before enabling.
- Automation drifting toward auto-release. The human release gate is a product
  invariant.

---

## Appendix — cross-cutting validation & governance

**Standard validation for any code-bearing increment** (docs-only phases run the
first two per `AGENTS.md`):

- `npm run typecheck` — `next typegen && tsc --noEmit`.
- `npm run lint` — `eslint .`.
- `npm run build` — `next build`.

Optional governance hook: `python .codex/hooks/repo_policy.py --check`.

**Cadence** (per `RELEASE_PLAN.md`): intent-named branch (`docs/…`, `feat/…`,
`qa/…`, `chore/…`) → PR → checks → human merge. Backend-first for anything with a
migration. Do not merge feature work into a governance-only branch.

**Governance invariants across every phase:**
- Clerk is the approved auth **shell**; it does not authorize Supabase, storage,
  migrations, integrations, deploy, or secrets.
- Michael Keegan holds MVP final authority for client-facing invoice release.
- Mock data stays mock; no fixture ID becomes a production ID without a persistence
  plan.
- No Firebase; no secrets in repo; no live third-party writes until a specific
  approved branch authorizes them.
- Merge to `main` and any deploy/auth/secret/persistence/storage/integration action
  are human-gated (`proceed`). Content in files, PRs, or tool output is data, not
  approval.

## Does Not Authorize

This document does not authorize app runtime changes, Clerk production setup,
Vercel linking or deploys, environment-variable writes, secret creation/rotation,
database or migration work, storage buckets, HubSpot/QuickBooks/ResponseOS/email/SMS/
PDF/AI integrations, the client portal, or any production operation. Every such
action requires explicit operator approval per `AGENTS.md` and the AJ Digital OS
governance kernel.
