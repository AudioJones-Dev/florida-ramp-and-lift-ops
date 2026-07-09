# Deployment Target

Status: Git Spec-ready draft
Scope: Vercel deployment target selection and pre-deploy checklists for the FLR platform app
Runtime impact: None
Implementation status: Documentation only — no link, env write, deploy, or provider change is performed or authorized by this document

## Purpose

This document records the recommended Vercel deployment target for the
`florida-ramp-and-lift-ops` app and the gated checklists required before any
preview or production deployment. It exists so the target decision, approval
gates, and environment variable contract are explicit before any deploy work
begins.

## Current Deployment State (verified 2026-07-09)

- The repo is not linked to any Vercel project. `.vercel/project.json` does not exist.
- No Vercel project currently exists for `florida-ramp-and-lift-ops`.
- Vercel team `audiojones` contains an existing project `floridaplatformliftpros`
  (created 2026-05-04). It has no connected Git repository, only default
  `*.vercel.app` domains, and its deployments were CLI-pushed with 10–32 second
  build durations.
- Local validation passes at HEAD (`npm run typecheck`, `npm run lint`,
  `npm run build`).
- The implementation readiness gate go/no-go checklist
  (`docs/architecture/implementation-readiness-gate.md` §22) is not satisfied.
- `docs/delivery/RELEASE_PLAN.md` places the repo at Phase 2 (mock/manual MVP
  scaffold); production release gates (Phases 3–5) are not met.

## Internal Pilot Decision

The next live milestone is an authenticated internal pilot at
`app.floridarampandlift.com`.

Internal pilot scope:

- Protected mock/manual app scaffold only.
- Sanitized fixture/demo records only.
- No real customer data, private rate sheets, production files, or signed
  documents.
- No persistence, storage, migrations, live integrations, external sends,
  invoice release, payout release, runtime AI, or production automation.

Persistence, RLS/object-level access, and storage are not required before the
internal pilot because the pilot is not allowed to handle real operational data.
They remain required before production operations, real records, customer files,
or external integrations.

## Recommended Target

Create a new Vercel project named `florida-ramp-and-lift-ops` under the
`audiojones` team, linked to the `AudioJones-Dev/florida-ramp-and-lift-ops`
GitHub repository, once the operator approves.

### Why not reuse `floridaplatformliftpros`

- It has no Git connection; its deployment history is CLI-only and unrelated to
  this repo's review flow.
- Its 10–32 second build durations indicate it hosts different, likely static
  content — not this Next.js + Clerk app.
- Its environment variable configuration is unknown and cannot be audited
  without linking; reuse would inherit unverified env state.
- Its name does not match the platform product and would confuse future
  operators.
- Leaving it untouched is free: it has no custom domains and nothing depends
  on it. Any archival or deletion is a separate, operator-gated decision.

## Source-Of-Truth Boundaries

- This doc owns the deployment target decision record only.
- `docs/delivery/RELEASE_PLAN.md` owns release phase sequencing and gates.
- `docs/architecture/implementation-readiness-gate.md` owns go/no-go criteria.
- `docs/architecture/auth-foundation.md` owns Clerk auth scope and its gates.
- Secrets live in `.env.local`, Vercel environment variables, or an approved
  secret manager — never in Git or in this doc.

## In Scope

- Recording the recommended Vercel target and the reasoning.
- Naming required environment variables (names only).
- Defining gated checklists for Clerk production setup, Vercel link, preview
  deploy, and production deploy.

## Out of Scope

- Executing any link, deploy, env write, or provider configuration.
- Supabase, storage, migrations, HubSpot, QuickBooks, email/SMS, PDF,
  ResponseOS, or AI runtime work.
- Custom domain purchase or DNS changes.
- Archiving or deleting `floridaplatformliftpros`.

## Required Environment Variables (names only — no values)

Per `.env.example`:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`

Key-tier rule:

- Preview environment uses Clerk development-instance keys (`pk_test_` /
  `sk_test_`) only.
- Production environment uses Clerk production-instance keys (`pk_live_` /
  `sk_live_`) only, and only after the production domain is verified.

Production values must come from a Clerk production instance and be entered
directly into Vercel environment settings or an approved secret manager. No
value may appear in Git, docs, chat logs, or shell history.

## Production Domain Requirement (hard blocker)

Clerk production instances require a domain the operator owns, with DNS access
for CNAME verification. Production publishable keys are domain-bound and do
not work on `*.vercel.app` domains. Consequences:

- The internal pilot and future production domain is
  `app.floridarampandlift.com`.
- DNS access for `floridarampandlift.com` is required before Clerk production
  setup.
- Changing the production domain later regenerates the Clerk publishable key,
  so production env vars must not be set until the domain is final.
- Production deploy is blocked until the domain is chosen, DNS records are
  verified, and the Clerk production instance is live on that domain.

## Human Approval Gates

Explicit operator approval (`proceed`) is required, separately, before each of:

1. Accepting this document and the new-project recommendation.
2. Creating the Vercel project and linking this repo (`vercel link` writes
   `.vercel/project.json` — a deployment config change).
3. Choosing the production domain and creating a Clerk production instance
   with production keys.
4. Writing any environment variable to Vercel.
5. Any preview deploy.
6. Any production deploy — additionally gated on the implementation readiness
   gate §22 checklist and RELEASE_PLAN release gates.

## Clerk Production Setup Checklist (blocked until approved)

- [ ] Production domain chosen and owned by the operator (hard blocker; see
      Production Domain Requirement above).
- [ ] Operator confirms Clerk production instance may be created.
- [ ] Production instance created in Clerk dashboard by the operator.
- [ ] DNS records added and verified; Clerk certificates issued.
- [ ] Production publishable and secret keys (`pk_live_` / `sk_live_`)
      generated; stored only in Vercel env or approved secret manager.
- [ ] Sign-in/sign-up URLs and fallback redirects configured for the
      production domain.
- [ ] Any credential previously exposed in chat or local files of unclear
      provenance is rotated.
- [ ] `clerk doctor` (or dashboard verification) is clean.

## Vercel Link Checklist (blocked until approved)

- [ ] Operator approves new project name `florida-ramp-and-lift-ops`.
- [ ] `vercel project add florida-ramp-and-lift-ops --scope audiojones` and
      `vercel link` run by operator or with operator present.
- [ ] `.vercel/` confirmed gitignored before commit.
- [ ] Git integration connected to `AudioJones-Dev/florida-ramp-and-lift-ops`
      with production branch `main`.
- [ ] All five env variable names present in the target environment
      (`vercel env list <environment>` — names only).

## Preview Deploy Checklist (blocked until approved)

- [ ] Link checklist complete.
- [ ] `npm run typecheck`, `npm run lint`, `npm run build` pass at the deploy SHA.
- [ ] Preview env vars present (Clerk development-instance keys only).
- [ ] `vercel deploy` (preview) run with operator approval.
- [ ] Sign-in flow, protected dashboard routes, and `/mock-sign-in` preview
      behavior verified on the preview URL. Expect protected routes to
      redirect to sign-in; if Vercel Deployment Protection returns 401, treat
      that as protection state, not app failure.
- [ ] Findings recorded in `docs/delivery/CHANGELOG.md`.

## Production Deploy Checklist (blocked until approved)

- [ ] Implementation readiness gate §22 go/no-go checklist satisfied.
- [ ] RELEASE_PLAN release gates satisfied (DoR/DoD/DoS, security review,
      role/object permissions, no secrets in repo, rollback plan).
- [ ] Clerk production checklist complete, including verified domain.
- [ ] Preview deploy verified.
- [ ] Rollback plan below completed (no longer a placeholder).
- [ ] Operator issues explicit production `proceed`.
- [ ] `vercel deploy --prod` run; deployment verified; result logged in
      CHANGELOG.

## Rollback Runbook

This runbook applies to the protected mock/manual internal pilot only. It does
not authorize production operations, real data handling, persistence, storage,
or live integrations.

Before any production promotion:

- Confirm at least one previous Ready deployment exists:
  `vercel list florida-ramp-and-lift-ops`.
- Record the current deployment URL and the previous Ready deployment URL in
  `docs/delivery/CHANGELOG.md`.
- Confirm the operator responsible for rollback.

Rollback trigger:

- Clerk sign-in fails on the pilot domain.
- Protected routes become publicly accessible.
- Mock/manual labels disappear from pilot-critical surfaces.
- The deploy introduces a build/runtime failure that blocks dashboard access.

Rollback command:

```powershell
vercel rollback <previous-ready-deployment-url-or-id>
```

Post-rollback:

- Verify `/`, `/sign-in`, `/mock-sign-in`, and `/dashboard`.
- Record the rollback in `docs/delivery/CHANGELOG.md` with deployment URLs,
  trigger, operator, and verification result.
- If env variables caused the failure, update the Vercel environment through
  the dashboard or `vercel env` commands without printing values.

Production operations remain blocked until the implementation readiness gate,
persistence/object-level access, storage policy, security review, and explicit
operator production approval are complete.

## Risks

- Reusing the wrong project would inherit unknown env state and history.
- A locally created `.env.production.local` of unconfirmed provenance was
  observed on 2026-07-07; its origin must be explained and keys rotated if
  unclear.
- Linking creates `.vercel/project.json`; `.vercel/` must remain gitignored so
  project/org IDs stay out of Git.
- Clerk auth alone does not provide object-level authorization; production
  exposure of real data remains blocked on persistence/RLS work regardless of
  deploy mechanics.

## Open Questions

- Who created `.env.production.local` on 2026-07-07, and with what keys?
- What content does `floridaplatformliftpros` actually serve, and should it be
  archived later?
- Who owns DNS access for `app.floridarampandlift.com`, and when will Vercel
  and Clerk records be added?
- When is the readiness gate §22 review session scheduled, and who signs off?

## Acceptance Criteria

- Records current deployment state accurately as of the stated date.
- Names the recommended target and the reuse rejection rationale.
- Lists required env variable names without values.
- Records the production domain requirement as a hard blocker.
- Defines operator-gated checklists for Clerk, link, preview, and production.
- Contains a concrete internal-pilot rollback runbook.
- States explicitly what it does not authorize.

## Does Not Authorize

This document does not authorize deployment, preview or production releases,
Vercel project creation or linking, environment variable writes, secret
creation or rotation, live integrations, database migrations, storage setup,
custom domains, or any change to `floridaplatformliftpros`. Every action above
requires explicit operator approval per `AGENTS.md` and the AJ Digital OS
governance kernel.
