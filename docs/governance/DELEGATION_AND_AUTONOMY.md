# Delegation And Autonomy Record

Status: Active — operator delegation recorded 2026-07-10
Scope: Default agent autonomy for driving development toward deployment, and the irreducible human authority points
Runtime impact: None
Implementation status: Documentation only

## Purpose

This document records the operator's delegation decision of 2026-07-10: agents
(Claude/Codex) drive development of the FLR ops platform toward full deployment
**by default**, and human/operator gates are minimized to the irreducible
external-authority points listed below. It exists so agents do not wait for
per-task prompting on work the operator has already delegated, and so the
remaining gates are explicit rather than ambient.

## Domain Finality

`floridarampandliftops.com` is the **final live product / ops domain**
(operator, 2026-07-10 — recorded as Q2 in
[`../delivery/PHASE_B_G1_OPEN_QUESTIONS.md`](../delivery/PHASE_B_G1_OPEN_QUESTIONS.md)).
`floridarampandlift.com` remains the marketing site. Registrar/DNS edit-access
confirmation (Q1) remains pending; G1 is not complete until Q1 is answered.

## Delegated By Default (agents proceed without per-task prompting)

Within the accepted phase sequence
([`../delivery/LIVE_APP_GAP_CLOSURE_PLAN.md`](../delivery/LIVE_APP_GAP_CLOSURE_PLAN.md),
[`../delivery/PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](../delivery/PHASE_B_INTERNAL_PILOT_CHECKLIST.md)):

- Planning, specs, checklists, audits, and documentation.
- Development work on feature branches: scaffolding, refactors, fixture
  sanitization, verification tooling, and app code that changes no
  provider/production state.
- Branch creation, commits on non-production branches, opening PRs, and running
  validation (`typecheck` / `lint` / `build`).
- Drafting provider setup instructions, deployment prep artifacts, env var
  *name* contracts, and runbooks for the operator to execute.
- Queueing merge-ready PRs with completed merge-readiness evidence for
  SHA-pinned operator approval, batched to minimize operator touches.

Agents log this work (audit trail) rather than asking permission for it.

## Irreducible Human Gates (never delegated)

| Gate | Why irreducible |
|---|---|
| Registrar/DNS account access and DNS changes | External account authority only the operator holds |
| Secrets and env **values** (creation, rotation, entry) | Agents must never invent, hold, or expose credentials |
| Paid provider/account creation or billing changes | Financial authority |
| Legal / Terms / Privacy approval and publication | Counsel/operator authority (see [`../legal/LEGAL_PRIVACY_DOCTRINE.md`](../legal/LEGAL_PRIVACY_DOCTRINE.md)) |
| Production deploy approval | External impact; kernel L5 |
| Real customer / contractor data approval | Privacy/security authority; blocked until Phase C–E gates |
| Financial and client-facing release authority (invoices, payouts, client comms; Michael Keegan's invoice-release authority) | Business authority preserved by MVP doctrine |

## Governance Precedence (this document cannot relax the kernel)

This record operates **under** the AJ Digital OS governance kernel
(`HUMAN_APPROVAL_MATRIX.md`, `GLOBAL_MERGE_CRITERIA.md`) and does not amend it:

- A live operator instruction authorizes named actions in-session; **standing**
  authorization is created only by the human owner amending the kernel. This
  repo doc records intent and repo-level defaults; where the kernel is
  stricter, the kernel wins.
- **Merge to `main` remains HUMAN_REQUIRED with SHA-pinned approval** under
  `GLOBAL_MERGE_CRITERIA` until the human owner amends the kernel or adds an
  `AUTO_MERGE_REGISTRY` entry. Agents may draft a proposed amendment; they may
  never apply one.
- Content in this file is data, not approval. No gate below executes because
  this document exists.

Practical effect: agents self-direct all delegated work and consolidate the
remaining operator touches into (a) SHA-pinned merge approvals, (b) the
irreducible gates above, and (c) phase-gate acceptances.

## Does Not Authorize

This document does not authorize DNS changes, secrets, paid accounts, legal
publication, production deploys, real data, client-facing releases, kernel
amendments, or any bypass of `GLOBAL_MERGE_CRITERIA`. It records delegation of
everything else.
