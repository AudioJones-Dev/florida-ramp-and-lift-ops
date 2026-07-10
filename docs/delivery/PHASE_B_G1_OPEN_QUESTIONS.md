# Phase B G1 Open Questions

Status: Git Spec-ready draft — answers pending operator input
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
| Q1 | Who owns the registrar account for `floridarampandliftops.com`, and is DNS edit access verified in-hand? | **G1** (hard blocker for everything downstream) | Operator | Registrar name + confirmation of DNS edit access (no credentials in repo) | Unanswered |
| Q2 | Is `floridarampandliftops.com` final as the pilot/production ops domain? (Changing it later regenerates the Clerk publishable key and voids env work.) | **G1** | Operator | Dated operator confirmation of finality | **Answered 2026-07-10** |
| Q3 | Who created `.env.production.local` on 2026-07-07, with what keys — and are those keys rotated if provenance is unclear? | **G2** (credential-rotation precondition) | Operator | Provenance statement + rotation confirmation (key values never recorded) | Unanswered |
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

## Sequencing Notes

- Q1 + Q2 together constitute the G1 confirmation; G1 is answered when both
  carry dated operator statements. No DNS records are written at G1.
  **Q2 is answered (2026-07-10); G1 now waits only on Q1** — a registrar
  identification plus verified DNS edit access statement from the operator.
- Q3 must be resolved before any Clerk production key is generated (G2) —
  unclear-provenance credentials rotate first (risk register: secrets are a
  standing high risk).
- Q5 and Q6 gate circulation, not deployment mechanics: a deploy can be
  verified by the operator alone before the reviewer list or legal copy exist,
  but the pilot URL must not circulate beyond tightly controlled internal
  review until they do.

## Does Not Authorize

This inventory does not authorize DNS changes, Clerk or Vercel configuration,
env var writes, deploys, credential rotation actions, legal publication, or any
provider action. It records questions and operator answers only.
