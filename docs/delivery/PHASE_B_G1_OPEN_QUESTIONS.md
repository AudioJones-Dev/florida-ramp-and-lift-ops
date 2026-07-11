# Phase B G1 Open Questions

Status: Active — Q1–Q3 answered 2026-07-10; Q4–Q7 pending operator input
Scope: Operator-decision inventory blocking or informing Phase B gates G1–G6
Runtime impact: None
Implementation status: Documentation only

## Purpose

This is the planning-only open-questions inventory required by
[`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md).
It collects, in one place, every unanswered question from
[`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md) and the legal doctrine that an
operator must answer before the corresponding Phase B gate can execute. Each
answer is recorded here as a dated operator statement.

**Recording rule:** an answer written in this file is *data*, not approval.
Answers inform gate execution; each gate G1–G7 still requires its own live
operator `proceed` at execution time (governance kernel rule).

## Question Inventory

| ID | Question | Blocks | Owner | Evidence to record | Status |
|---|---|---|---|---|---|
| Q1 | Who owns the registrar account for `floridarampandliftops.com`, and is DNS edit access verified in-hand? | **G1** (hard blocker for everything downstream) | Operator | Confirmation of DNS management + edit-access availability (operator chose provider-free wording; registrar identity deliberately kept out of repo docs; no credentials in repo) | **Answered 2026-07-10** |
| Q2 | Is `floridarampandliftops.com` final as the pilot/production ops domain? (Changing it later regenerates the Clerk publishable key and voids env work.) | **G1** | Operator | Dated operator confirmation of finality | **Answered 2026-07-10** |
| Q3 | Who created `.env.production.local` on 2026-07-07, with what keys — and are those keys rotated if provenance is unclear? | **G2** (credential-rotation precondition) | Operator | Provenance statement + rotation confirmation (key values never recorded) | **Answered 2026-07-10** |
| Q4 | What does the existing Vercel project `floridaplatformliftpros` actually serve, and is it archived later or left untouched? | G3 (context only — new project is already the accepted recommendation) | Operator | Statement; any archival is a separate gated decision | Unanswered |
| Q5 | Who is on the internal reviewer list allowed to receive the pilot URL under the tightly-controlled-circulation rule? | **G5** | Operator | Named reviewer list (roles suffice; no personal contact details in repo) | Unanswered |
| Q6 | Who reviews and approves ops-domain Terms/Privacy copy (counsel and/or operator), and when? | **G5/G6** (legal publication gate) | Operator / counsel | Reviewer identity + target date per [`../legal/LEGAL_PRIVACY_DOCTRINE.md`](../legal/LEGAL_PRIVACY_DOCTRINE.md) publication gate | Unanswered |
| Q7 | When is the implementation-readiness-gate §22 review session, and who signs off? | **G6** | Operator | Session date + sign-off owner | Unanswered |

## Answers

Record answers here as they arrive, one dated entry per question:

```txt
Qn — YYYY-MM-DD — (operator statement, quoted)
```

- Q2 — 2026-07-10 — Operator: "`floridarampandliftops.com` is the final live
  product / ops domain." Recorded from a live operator instruction; also
  recorded in [`../governance/DECISION_LOG.md`](../governance/DECISION_LOG.md)
  (Current Decisions, 2026-07-10) and
  [`../governance/DELEGATION_AND_AUTONOMY.md`](../governance/DELEGATION_AND_AUTONOMY.md).
- Q1 — 2026-07-10 — Operator: "DNS management for `floridarampandliftops.com`
  is confirmed, and DNS edit access is available when needed." Recorded from a
  live operator instruction using deliberately provider-free wording (registrar
  identity kept out of repo docs; credentials never recorded). With Q1 + Q2
  both answered, **the G1 confirmation is complete** — see
  [`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md)
  G1 and [`../governance/DECISION_LOG.md`](../governance/DECISION_LOG.md).
- Q3 — 2026-07-10 — Provenance remained unclear. A names-only local audit
  found an untracked production-tier Clerk key pair in
  `.env.production.local`; the publishable key matched the existing, unused
  Production instance of `My Application`. Clerk Platform API usage reported
  zero MAU, MAO, and SMS activity. Under the operator's explicit rotation
  approval, the old Production Secret Key was rotated through the Clerk CLI
  with immediate expiration. The replacement Secret Key was neither printed
  nor persisted, the Publishable Key was unchanged, the local file was
  deleted, and Git history remained empty. **Q3 is resolved.**

## Sequencing Notes

- Q1 + Q2 together constitute the G1 confirmation; G1 is answered when both
  carry dated operator statements. G1 confirms the final domain and that DNS
  edit access is **available**; it does not authorize DNS changes — no DNS
  record is written at G1 (DNS work happens under G2, operator-executed).
  **Both are answered (2026-07-10): the G1 confirmation is complete.** G2 and
  every later gate still require their own operator `proceed`.
- Domain framing (operator, 2026-07-10): `floridarampandlift.com` is the
  public-facing marketing domain; `floridarampandliftops.com` is the live ops
  product domain (pseudo-intranet, multi-tenant operational ecosystem), and the
  internal pilot is its first deployment stage — not a temporary domain.
- Q3 was resolved 2026-07-10 before planned G2 configuration: the
  unclear-provenance Production Secret Key was rotated with immediate old-key
  expiration, no replacement was persisted, and the local file was deleted.
  G2 still requires its own operator `proceed`.
- Q5 and Q6 gate circulation, not deployment mechanics: a deploy can be
  verified by the operator alone before the reviewer list or legal copy exist,
  but the pilot URL must not circulate beyond tightly controlled internal
  review until they do.

## Does Not Authorize

This inventory does not authorize DNS changes, Clerk or Vercel configuration,
env var writes, deploys, credential rotation actions, legal publication, or any
provider action. It records questions and operator answers only.
