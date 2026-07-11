# Phase B Internal Pilot Checklist

Status: Active — G0 accepted 2026-07-09; G1 confirmed 2026-07-10; G2 and G3 complete 2026-07-11; gates G4–G7 pending, each behind its own operator `proceed`
Scope: Phase B planning checklist for the authenticated internal pilot at `ops.floridarampandliftops.com`
Runtime impact: None
Implementation status: Documentation only — no Clerk, Vercel, DNS, env, or deploy action is performed or authorized by this document

## Purpose

This checklist is the Phase B execution artifact from
[`LIVE_APP_GAP_CLOSURE_PLAN.md`](./LIVE_APP_GAP_CLOSURE_PLAN.md). It converts the
Phase B section of that plan and the gated checklists in
[`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md) into one sequenced,
operator-approved gate ladder — so every provider action in Phase B happens in a
known order, against named evidence, behind an explicit `proceed`.

Phase B ships the **protected mock/manual scaffold live with real Clerk
authentication on the ops domain, using sanitized fixtures only**. It does not
add persistence, storage, real data, or integrations. Completing Phase B produces
a live internal pilot, not production operations.

## Current Scope

Phase B covers:

- Real Clerk authentication (production instance) replacing shell-only keys.
- A Vercel project linked to this repo, deploying the existing mock/manual app.
- `ops.floridarampandliftops.com` serving the protected pilot within the **live
  ops product domain family** (pseudo-intranet, multi-tenant
  operational ecosystem), and the pilot is its **first deployment stage**, not
  a temporary or provisional home (`floridarampandlift.com` remains the public
  marketing site). This repo's approved host is
  `ops.floridarampandliftops.com`; the existing Render-backed hosts remain
  assigned to the sibling product.
- Sanitized fixture/demo records only, visibly labeled mock/manual.
- Preview deploy first, then a production pilot deploy, each separately gated.

Phase B explicitly does **not** cover: persistence, migrations, RLS or
object-level authorization, storage buckets, API clients, real customer or
contractor data, live integrations, Clerk organizations/invitations, the client
portal, or production operations on real records.

## Source-Of-Truth Boundaries

- Phase sequencing: [`LIVE_APP_GAP_CLOSURE_PLAN.md`](./LIVE_APP_GAP_CLOSURE_PLAN.md)
- Deploy target, env contract, provider checklists, rollback runbook:
  [`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md) — the detailed checklists there
  remain the owning source; this document sequences and gates them.
- Clerk auth scope: [`../architecture/auth-foundation.md`](../architecture/auth-foundation.md)
- Legal/privacy doctrine and circulation gates:
  [`../legal/LEGAL_PRIVACY_DOCTRINE.md`](../legal/LEGAL_PRIVACY_DOCTRINE.md)
- Go/no-go criteria: [`../architecture/implementation-readiness-gate.md`](../architecture/implementation-readiness-gate.md)
- Accepted decisions and open candidates:
  [`../governance/DECISION_LOG.md`](../governance/DECISION_LOG.md) — Phase 2
  closure was accepted 2026-07-09; Phase B planning may begin, and each Phase B
  action still requires a separate operator `proceed`.
- Risk posture: [`../governance/RISK_REGISTER.md`](../governance/RISK_REGISTER.md)

If these documents conflict, stop and reconcile before executing any gate.

## Planning-Only Work (no new approval required)

Docs/analysis work that changes nothing outside the repo and may proceed under
standing constraints:

- [ ] Resolve `DEPLOYMENT_TARGET.md` open questions **as recorded answers** —
      inventoried with owners and recording protocol in
      [`PHASE_B_G1_OPEN_QUESTIONS.md`](./PHASE_B_G1_OPEN_QUESTIONS.md)
      (Q1–Q3 answered; Q4–Q7 pending).
- [x] Draft the pilot verification script as a docs artifact — drafted as
      [`PILOT_VERIFICATION_SCRIPT.md`](./PILOT_VERIFICATION_SCRIPT.md)
      (route-grounded, Sections A–E + results record).
- [ ] Confirm the internal reviewer list for the pilot — tracked as Q5 in
      [`PHASE_B_G1_OPEN_QUESTIONS.md`](./PHASE_B_G1_OPEN_QUESTIONS.md).
- [ ] Confirm fixture data is sanitized and labeled — evidence recorded
      2026-07-10 in
      [`FIXTURE_SANITIZATION_CHECKLIST.md`](./FIXTURE_SANITIZATION_CHECKLIST.md):
      **9 of 10 checks pass; F1 and F2 both resolved 2026-07-10** (F1 personal
      Gmail removed from `src/lib/roles.ts`; F2 demo-pricing confirmed by the
      operator). The only remaining evidence is the **S9 run record**, produced
      at the G5/G6 pilot verification run by design — this item closes then.
- [ ] Keep `npm run typecheck`, `npm run lint`, `npm run build` green.

None of this authorizes provider actions.

## Gate Ladder

Gates execute in order. Each requires its own explicit operator `proceed`, and
later gates assume the evidence of earlier ones. Provider actions are performed
by the operator or with the operator present, per `DEPLOYMENT_TARGET.md`.

### G0 — Accept this checklist — ✅ ACCEPTED 2026-07-09

- [x] Operator reviews and accepts this checklist as the Phase B sequence
      (operator acceptance, 2026-07-09).
- [x] Acceptance recorded in [`../governance/DECISION_LOG.md`](../governance/DECISION_LOG.md)
      (Current Decisions, 2026-07-09).

### G1 — DNS / domain ownership confirmation — ✅ CONFIRMED 2026-07-10

Clerk production keys are domain-bound; nothing downstream can start until this
is settled. Confirmed complete 2026-07-10 (Q1 + Q2 both answered).

- [x] Operator confirms `floridarampandliftops.com` is owned and controlled by
      the operator — answered 2026-07-10 (Q1, provider-free wording by operator
      choice): "DNS management for `floridarampandliftops.com` is confirmed,
      and DNS edit access is available when needed." Registrar identity is
      deliberately kept out of repo docs.
- [x] Operator confirms this domain is final for the pilot (changing it later
      regenerates the Clerk publishable key and voids downstream env work) —
      confirmed 2026-07-10 as the final live product/ops domain (Q2 in
      [`PHASE_B_G1_OPEN_QUESTIONS.md`](./PHASE_B_G1_OPEN_QUESTIONS.md)).
- [x] Domain boundary reaffirmed (operator, 2026-07-10):
      `floridarampandlift.com` is the public-facing marketing domain;
      `floridarampandliftops.com` is the live ops product domain family
      (pseudo-intranet, multi-tenant operational ecosystem), with the internal
      pilot as its first deployment stage; this does not assign the application
      origin to an existing sibling-owned host.
- [x] G1 confirms the final domain and that DNS edit access is available; it
      does **not** authorize DNS changes — no DNS records were written at this
      gate; DNS work happens under G2, operator-executed (rule acknowledged at
      G1 closure, 2026-07-10).

### G2 — Clerk production setup gate

Owning checklist: `DEPLOYMENT_TARGET.md` → "Clerk Production Setup Checklist".
Operator playbook: [`G2_CLERK_PRODUCTION_RUNBOOK.md`](./G2_CLERK_PRODUCTION_RUNBOOK.md)
(Step 0 = Q3 credential provenance/rotation, required before any key
generation).

- [x] G1 complete (confirmed 2026-07-10 — Q1 + Q2 answered).
- [x] Operator approves retaining/configuring the existing Clerk Production
      instance (G2 `proceed`, 2026-07-10, CLI-first staged execution);
      deleting/replacing it still requires separate explicit approval.
      Execution evidence: [`G2_EXECUTION_RECORD.md`](./G2_EXECUTION_RECORD.md).
- [x] Existing Production instance configured; five Clerk DNS records added
      unproxied and publicly resolving (2026-07-11).
- [x] Clerk dns/ssl/mail verification complete and certificates issued
      (2026-07-11; zero pending DNS records).
- [x] `pk_live_` / `sk_live_` keys generated and held **only** in an approved
      secret manager — never Git, docs, chat, or shell history. Entering them
      into Vercel env is gate **G4's separate `proceed`**. (Done 2026-07-10/11:
      new `sk_live` rotated and the current post-domain-change `pk_live`
      captured; both escrowed to the approved production secret-manager
      configuration as `CLERK_SECRET_KEY` and
      `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, verified present by name; values
      never printed or persisted.)
- [x] G2 Clerk path configuration complete (2026-07-11): `/sign-in` for
      sign-in/sign-up and `/dashboard` as home. G4 fallback env writes and G5
      live redirect verification remain separately gated.
- [x] Phase B auth scope reconciled (2026-07-11): email code plus required
      password enabled; Google OAuth deferred and disabled in both Clerk
      development and production instances.
- [x] Unclear-provenance 2026-07-07 Production Secret Key rotated with
      immediate old-key expiration; replacement not persisted; local
      `.env.production.local` deleted; Git history empty (Q3, 2026-07-10).
- [x] Clerk deployment status complete: DNS, SSL, mail, and OAuth checks green;
      no pending DNS records or OAuth providers.
- [x] Sibling-host ownership reconciled: this repo uses `ops`; existing apex,
      `www`, `admin`, `client`, `contractor`, and `platform` hosts are preserved.

### G3 — Vercel project / link gate

Owning checklist: `DEPLOYMENT_TARGET.md` → "Vercel Link Checklist".
Operator playbook: [`G3_G4_VERCEL_ENV_RUNBOOK.md`](./G3_G4_VERCEL_ENV_RUNBOOK.md)
— accepted G3 default: the Git integration stays **disconnected through G6**;
all Phase B deploys are gated CLI deployments only.

- [x] Operator approves creating project `florida-ramp-and-lift-ops` under the
      `audiojones` team (new project; do not reuse `floridaplatformliftpros`).
- [x] `vercel link --yes --project florida-ramp-and-lift-ops --scope audiojones`
      run by/with the operator; `.vercel/` confirmed gitignored and
      `git status` shows no `.vercel/` entries after linking.
- [x] Git integration remains disconnected through G6; Phase B preview and
      production deployments are executed only through their gated CLI
      commands.

Completed 2026-07-11. Evidence:
[`G3_EXECUTION_RECORD.md`](./G3_EXECUTION_RECORD.md). The CLI's unexpected
Git auto-connect was removed before any deployment was created.

### G4 — Environment variable write gate

Operator playbook: [`G3_G4_VERCEL_ENV_RUNBOOK.md`](./G3_G4_VERCEL_ENV_RUNBOOK.md)
(per-environment name table + key-tier rules).

- [ ] Operator approves each env write; values entered only in Vercel settings
      or an approved secret manager.
- [ ] All five names from `.env.example` present in the target environment
      (verified by name only — values never printed).
- [ ] Key-tier rule enforced: preview = `pk_test_`/`sk_test_` only;
      production = `pk_live_`/`sk_live_` only, and only after G1/G2 complete.

### G5 — Preview deploy gate

Owning checklist: `DEPLOYMENT_TARGET.md` → "Preview Deploy Checklist".

- [ ] G3 + G4 complete for the preview environment.
- [ ] Legal/privacy doctrine accepted for pilot circulation; no Terms/Privacy
      links point at `floridarampandlift.com` unless operator/counsel confirms
      coverage ([`../legal/LEGAL_PRIVACY_DOCTRINE.md`](../legal/LEGAL_PRIVACY_DOCTRINE.md)).
- [ ] `npm run typecheck`, `npm run lint`, `npm run build` pass at the deploy SHA.
- [ ] Operator approves; preview deploy runs; sign-in, protected routes, and
      `/mock-sign-in` verified on the preview URL (a Deployment Protection 401
      is protection state, not app failure).
- [ ] Findings recorded in [`CHANGELOG.md`](./CHANGELOG.md).

### G6 — Production pilot deploy gate

Owning checklist: `DEPLOYMENT_TARGET.md` → "Production Deploy Checklist".

- [ ] Implementation readiness gate §22 checklist satisfied for the **pilot
      scope** (protected mock/manual app, sanitized fixtures, no persistence).
- [ ] `RELEASE_PLAN.md` release gates satisfied as applicable to the pilot;
      DoR/DoD reviewed.
- [ ] Ops-domain Terms/Privacy plan accepted per the legal doctrine publication
      gate before the pilot circulates beyond tightly controlled internal review.
- [x] Exact application origin approved:
      `https://ops.floridarampandliftops.com`; sibling-host ownership reconciled.
- [ ] `ops` host DNS configured and verified without changing existing hosts.
- [x] G2 complete (2026-07-11).
- [ ] G5 verified.
- [ ] Rollback runbook complete and current (G7 pre-checks done).
- [ ] Operator issues explicit production `proceed`; deploy runs; result
      verified and logged in [`CHANGELOG.md`](./CHANGELOG.md).

### G7 — Rollback / runbook checks

Owning runbook: `DEPLOYMENT_TARGET.md` → "Rollback Runbook".

- [ ] Before promotion: at least one previous Ready deployment exists; current
      and previous deployment URLs recorded in `CHANGELOG.md`; rollback owner
      named.
- [ ] Rollback triggers reaffirmed: Clerk sign-in fails on the pilot domain;
      protected routes become public; mock/manual labels disappear; deploy
      blocks dashboard access.
- [ ] Post-rollback verification steps and logging requirements reviewed.
- [ ] A rollback rehearsal (or documented dry-run reasoning) is recorded before
      the pilot URL circulates.

## Gate Summary

| Gate | What it authorizes when passed | Owner | Blocked by |
|---|---|---|---|
| G0 | This sequence as the Phase B plan | Operator | — |
| G1 | Nothing external — confirms domain ownership/finality | Operator | G0 |
| G2 | Clerk production instance + DNS records + live keys | Operator | G1 |
| G3 | Vercel project creation + repo link | Operator | G0 |
| G4 | Env var writes (names verified, values never printed) | Operator | G2 (prod keys), G3 |
| G5 | One preview deploy + verification | Operator | G3, G4, legal circulation gate |
| G6 | One production pilot deploy | Operator | G1–G5, readiness §22, legal gate, G7 pre-checks |
| G7 | Nothing — verifies rollback readiness | Operator | G5 |

## Risks

From the risk register, legal doctrine, and deployment target:

- Treating the pilot as production: sanitized-fixture and mock/manual labeling
  rules must hold through every gate (risk register: mock data stays mock).
- Domain change after G2 regenerates Clerk keys and invalidates G4 work —
  G1 finality matters.
- Secrets exposure: env values in Git, docs, chat, or shell history is a
  standing high risk; every gate above handles values dashboard-side only.
- Circulating the pilot URL before the legal doctrine gate is accepted creates
  ops-domain legal exposure (Terms/Privacy publication gate is separate).
- Clerk protects sessions, not objects: the pilot must not be read as access
  control for real data — real data remains blocked until Phase C/D/E gates.
- Skipping ahead (e.g. bundling persistence into pilot setup) breaks the
  repository's gated sequencing.

## Does Not Authorize

This checklist does not authorize Clerk configuration, Clerk production
instances or keys, DNS changes, Vercel project creation or linking, environment
variable writes, secret creation or rotation, preview or production deploys,
persistence, storage, migrations, API clients, integrations, real data, or
client portal work. Each gate above requires its own explicit operator
`proceed` at execution time; checking a box in a document is never approval.

## Acceptance Criteria

This checklist is accepted when:

- The operator accepts the gate ladder (G0) and the acceptance is recorded in
  the decision log.
- Planning-only work items are either complete or explicitly deferred with an
  owner.
- Every provider action in Phase B is traceable to exactly one gate here and
  one owning checklist in `DEPLOYMENT_TARGET.md`.
- Validation is green on the branch that introduces this document.

## After Phase B

Phase B ends with a verified, protected, fixture-only pilot live on
`floridarampandliftops.com`, recorded in `CHANGELOG.md`. The next phase
(Phase C — controlled persistence foundation) starts from
[`LIVE_APP_GAP_CLOSURE_PLAN.md`](./LIVE_APP_GAP_CLOSURE_PLAN.md) Phase C and
requires acceptance of
[`../architecture/persistence-design.md`](../architecture/persistence-design.md)
plus a migration-spec branch — none of which is authorized by Phase B.
