# Phase 2 Closure Checklist

Status: Git Spec-ready draft — pending operator review
Scope: Phase A closure gate for the mock/manual MVP scaffold
Runtime impact: None
Implementation status: Documentation only

## Purpose

This checklist is the Phase A execution artifact from
[`LIVE_APP_GAP_CLOSURE_PLAN.md`](./LIVE_APP_GAP_CLOSURE_PLAN.md). It defines the
specific evidence required to close Phase 2 — the manual/mock MVP scaffold — before
the repo proceeds to the authenticated internal pilot or any persistence planning.

Closing Phase 2 means the current mock/manual baseline is coherent, documented,
and accepted as the reference point for the next delivery phase. It does **not**
mean the app is production-ready.

## Current Scope

Phase 2 covers:

- Next.js mock/manual MVP scaffold.
- Clerk auth shell, without production keys or real user provisioning.
- Role-aware dashboard shell.
- Manual/mock records, queues, approval flows, contractor surfaces, and demo
  scenarios.
- Sanitized fixture/demo data only.
- Documentation-first readiness and delivery gates.

## Source-Of-Truth Boundaries

- Product scope: [`../architecture/mvp-definition.md`](../architecture/mvp-definition.md)
- Readiness gate: [`../architecture/implementation-readiness-gate.md`](../architecture/implementation-readiness-gate.md)
- Readiness audit: [`../qa/build-docs-readiness-audit.md`](../qa/build-docs-readiness-audit.md)
- Live-app sequence: [`LIVE_APP_GAP_CLOSURE_PLAN.md`](./LIVE_APP_GAP_CLOSURE_PLAN.md)
- Release phases: [`RELEASE_PLAN.md`](./RELEASE_PLAN.md)
- Deployment target: [`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md)
- Definitions of ready/done/stable:
  [`../governance/DEFINITION_OF_READY.md`](../governance/DEFINITION_OF_READY.md),
  [`../governance/DEFINITION_OF_DONE.md`](../governance/DEFINITION_OF_DONE.md),
  [`../governance/DEFINITION_OF_STABLE.md`](../governance/DEFINITION_OF_STABLE.md)

If these documents conflict, do not close Phase 2. Reconcile the contradiction
first.

## In Scope

- Phase 2 closure evidence.
- Operator acceptance checklist.
- Mock/demo data isolation confirmation.
- Handoff criteria for Phase B: authenticated internal pilot.

## Out Of Scope

- Runtime code changes.
- Production Clerk configuration or real user provisioning.
- Vercel project linking, environment writes, DNS, preview deploy, or production
  deploy.
- Supabase, Neon, database migrations, RLS, object-level authorization, storage
  buckets, API clients, or persistence.
- HubSpot, QuickBooks, ResponseOS, email/SMS, PDF generation, runtime AI, or
  third-party writes.
- External client portal.
- Customer files, private rate sheets, signed documents, or real operational data.

## Does Not Authorize

This checklist does not authorize implementation. It is an acceptance gate for the
existing mock/manual scaffold only. Every future action listed in
[`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md) and
[`LIVE_APP_GAP_CLOSURE_PLAN.md`](./LIVE_APP_GAP_CLOSURE_PLAN.md) still requires a
separate operator `proceed`.

## Closure Checklist

Use this table for operator review. "Evidence" should be updated only with links
to committed docs, PRs, or validation output.

| Area | Required closure condition | Current evidence | Status |
|---|---|---|---|
| Repo identity | Agents can distinguish this ops repo from the contractor portal and site repos. | `REPO_IDENTITY.md`, `CLAUDE.md`, `../system/REPO_BOUNDARY_MAP.md` | Ready for operator review |
| Build-doc audit | Current implementation is compared against the governing build docs. | `../qa/build-docs-readiness-audit.md` | Ready for operator review |
| Stale language reconciliation | Known stale readiness/status language is reconciled without authorizing runtime work. | `../architecture/implementation-readiness-gate.md`, `RELEASE_PLAN.md`, `../README.md` | Ready for operator review |
| Role-aware shell | Dashboard shell and role surfaces exist for internal MVP review. | `../qa/build-docs-readiness-audit.md` MVP comparison | Ready for operator review |
| Mock/manual records | Manual/mock customer, communication, lead, job, contractor, invoice, alert, and approval surfaces exist. | `../qa/build-docs-readiness-audit.md` MVP comparison | Ready for operator review |
| Contractor MVP surface | Contractor workflow exists as a mock/manual surface only. | `../qa/build-docs-readiness-audit.md` MVP comparison | Ready for operator review |
| Mock/demo data labels | Fixture/demo data remains clearly non-production and must not become production truth. | This checklist; root `AGENTS.md` mock-data constraint | Needs operator confirmation |
| Auth shell boundary | Clerk shell is recognized as scaffold only; production auth config and object-level authorization remain blocked. | `../architecture/auth-foundation.md`, `../architecture/implementation-readiness-gate.md` | Ready for operator review |
| No live persistence | No database, migration, RLS, storage, or API client is authorized by Phase 2 closure. | `../qa/build-docs-readiness-audit.md`, `../architecture/persistence-design.md` | Ready for operator review |
| No live integrations | No HubSpot, QuickBooks, ResponseOS, email/SMS, PDF, AI, or third-party writes are authorized. | `RELEASE_PLAN.md`, `../architecture/mvp-definition.md` | Ready for operator review |
| Legal/domain gates | Ops-domain legal/privacy and deployment gates remain separate Phase B approvals. | `DEPLOYMENT_TARGET.md`, `../legal/LEGAL_PRIVACY_DOCTRINE.md` | Not closed by Phase 2 |
| Validation | Local checks are green for the closure branch. | To be filled by PR validation | Pending |
| Decision log | Phase 2 closure acceptance is recorded only after operator approval. | `../governance/DECISION_LOG.md` open candidate | Pending operator decision |

## Required Operator Decision

Phase 2 is closed only when the operator explicitly accepts this statement:

```txt
I accept Phase 2 closure for florida-ramp-and-lift-ops.
The current mock/manual MVP scaffold is the baseline for Phase B.
This does not authorize production auth configuration, deploys, persistence,
storage, migrations, live integrations, real operational data, or client portal work.
```

After that statement, update `../governance/DECISION_LOG.md` from an open
candidate to an active decision.

## Phase B Handoff Criteria

Do not begin Phase B until all of these are true:

- This checklist is reviewed and operator-accepted.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass on the closure PR.
- The decision log records Phase 2 closure.
- The operator separately approves the first Phase B action from
  [`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md).

Phase B starts with planning and approval for the authenticated internal pilot. It
does not start with real data, persistence, integrations, or production operations.

## Risks

- Closing Phase 2 without an explicit mock-data boundary could let fixture records
  become accidental production truth.
- Treating the Clerk shell as production authorization could expose role surfaces
  before object-level access exists.
- Starting deployment tasks before domain/legal gates are accepted could create
  public-facing operational risk.
- Combining Phase B deployment setup with Phase C persistence would skip the
  repository's gated sequencing.

## Acceptance Criteria

This checklist is accepted when:

- The operator explicitly accepts Phase 2 closure using the statement above or an
  equivalent written approval.
- The decision log records the accepted closure.
- Validation is green.
- No runtime code, dependency, provider, migration, storage, secret, or deploy
  configuration change is bundled with closure.

## Next Branch

After Phase 2 closure is accepted, the next branch should be:

```txt
docs/phase-b-authenticated-internal-pilot
```

Purpose: convert the Phase B section of
[`LIVE_APP_GAP_CLOSURE_PLAN.md`](./LIVE_APP_GAP_CLOSURE_PLAN.md) and
[`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md) into an operator-approved
checklist before any provider setup or deploy action.
