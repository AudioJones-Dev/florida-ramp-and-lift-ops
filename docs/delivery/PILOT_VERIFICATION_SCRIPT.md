# Pilot Verification Script

Status: Git Spec-ready draft — pending operator review
Scope: Manual verification steps for the Phase B preview deploy (G5) and production pilot deploy (G6)
Runtime impact: None
Implementation status: Documentation only — running this script requires a gated deploy to already exist; it performs no deploy, provider, or runtime action itself

## Purpose

This is the planning-only verification artifact required by
[`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md).
It defines exactly what a reviewer checks after each gated deploy, so G5/G6
verification is repeatable evidence, not ad-hoc clicking. Route names below are
taken from the actual app tree (`src/app`), not assumed.

## Preconditions

- A gated deploy exists: preview (G5) or production pilot (G6), each behind its
  own operator `proceed` per [`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md).
- The reviewer has: the deploy URL, the deploy SHA, a Clerk test account
  created by the operator (G2), and — for preview — awareness that Vercel
  Deployment Protection may return 401 (protection state, not app failure).
- Results are recorded in the table at the end and summarized in
  [`CHANGELOG.md`](./CHANGELOG.md) with URL + SHA + date + reviewer.

## Section A — Public and unauthenticated behavior

| # | Step | Expected result |
|---|---|---|
| A1 | Open `/` | Landing page renders; no secrets, no real data |
| A2 | Open `/sign-in` | Clerk sign-in-or-up component renders |
| A3 | Open `/dashboard` while signed out | Redirect to sign-in (or Deployment Protection 401 on preview) — never a rendered dashboard |
| A4 | Open a deep protected route while signed out (e.g. `/invoices`, `/queues/approvals`) | Same redirect behavior as A3 — no protected content leaks |
| A5 | View page source / network tab on `/` and `/sign-in` | No env values, keys, or internal URLs exposed |

## Section B — Authentication (real Clerk)

| # | Step | Expected result |
|---|---|---|
| B1 | Sign in with the operator-created Clerk test account | Lands on the protected dashboard shell |
| B2 | Account menu (`UserButton`) | Renders; account management opens |
| B3 | Sign out | Session ends; protected routes redirect again (re-run A3) |
| B4 | Wrong-password attempt | Clerk rejects; no app error page |

## Section C — Mock role preview boundary

| # | Step | Expected result |
|---|---|---|
| C1 | Open `/mock-sign-in` | Loads; clearly presented as a preview tool |
| C2 | Confirm labeling | Mock role selection is visibly not real authorization (auth-foundation rule) |

## Section D — Role-surface walk (signed in)

Verify each surface loads, shows mock/manual data only, and carries visible
mock/demo labeling where applicable. One list page + one `[id]` detail
spot-check per object family.

| # | Surface | Routes |
|---|---|---|
| D1 | Dashboard shell | `/dashboard` |
| D2 | Executive | `/executive` |
| D3 | Office/Admin | `/admin` |
| D4 | Support admin | `/support` |
| D5 | Dispatch | `/dispatch` |
| D6 | Contractor portal | `/contractor` |
| D7 | Leads | `/leads` + one `/leads/[id]` |
| D8 | Customers | `/customers` + one `/customers/[id]` |
| D9 | Jobs | `/jobs` + one `/jobs/[id]` |
| D10 | Communications | `/communications` + one `/communications/[id]` |
| D11 | Contractors | `/contractors` + one `/contractors/[id]` |
| D12 | Documentation | `/documentation` + one `/documentation/[id]` |
| D13 | Invoices | `/invoices` + one `/invoices/[id]` |
| D14 | Alerts | `/alerts` + one `/alerts/[id]` |
| D15 | Approvals | `/approvals` + one `/approvals/[id]` |
| D16 | Queues hub + sub-queues | `/queues`, `/queues/alerts`, `/queues/approvals`, `/queues/contractor-assignments`, `/queues/documentation`, `/queues/follow-up`, `/queues/invoice-review`, `/queues/job-transfers` |
| D17 | Demo scenarios | `/demo-scenarios` + one `/demo-scenarios/[id]` |

Shared checks for every D-step:

- No real customer, contractor, address, rate, or financial data appears
  (cross-check [`FIXTURE_SANITIZATION_CHECKLIST.md`](./FIXTURE_SANITIZATION_CHECKLIST.md)).
- Draft/estimated financial figures are labeled draft/pending review.
- No console errors that block the surface.

## Section E — Rollback-trigger sweep (ties to G7)

Any of these results triggers the rollback runbook in
[`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md):

- Clerk sign-in fails on the pilot domain (Section B fails).
- Any protected route renders content while signed out (Section A fails).
- Mock/manual labels missing from pilot-critical surfaces (Section D fails).
- Build/runtime failure blocks dashboard access.

## Results Record

Copy this table per run; file the completed copy with the CHANGELOG entry.

| Field | Value |
|---|---|
| Deploy type | preview / production pilot |
| Deploy URL | |
| Deploy SHA | |
| Date / reviewer | |
| Section A | pass / fail + notes |
| Section B | pass / fail + notes |
| Section C | pass / fail + notes |
| Section D | pass / fail + notes (list any failing route) |
| Rollback triggered? | yes / no |

## Does Not Authorize

This script does not authorize deploys, Clerk or Vercel configuration, env var
writes, DNS changes, or runtime changes. It is executed only after the relevant
gate's operator `proceed`, against a deploy that gate authorized.
