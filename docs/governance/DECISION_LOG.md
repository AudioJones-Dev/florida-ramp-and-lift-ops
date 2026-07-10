# Decision Log

Status: Git Spec-ready draft
Scope: Durable decision log for the FRL operational intelligence repo
Runtime impact: None
Implementation status: Documentation only

## Purpose

This log records durable decisions that affect product scope, architecture, governance, delivery, or execution.

Use individual ADR files under `docs/governance/adr/` when a decision needs deeper rationale, alternatives, and consequences.

## Decision Format

| Date | Decision | Status | Rationale | Follow-up |
|---|---|---|---|---|

## Current Decisions

| Date | Decision | Status | Rationale | Follow-up |
|---|---|---|---|---|
| 2026-06-04 | Keep the repo documentation-first until implementation readiness gates are satisfied. | Active | Prevents premature app scaffolding, secret sprawl, Firebase drift, and live integration churn. | Maintain `docs/architecture/implementation-readiness-gate.md`. |
| 2026-06-04 | Preserve Florida Ramp & Lift operational control before client portal expansion. | Active | MVP value is internal visibility, review, and invoice readiness, not public SaaS. | Keep client portal out of MVP unless explicitly re-scoped. |
| 2026-06-04 | Michael Keegan is final MVP authority for client-facing invoice release. | Active | Prevents unsafe financial automation and preserves business authority. | Reflect in schemas, workflows, and future UI gates. |
| 2026-06-04 | No Firebase path is allowed. | Active | Avoids platform drift and recurring integration churn. | Keep dependency/config review in validation. |
| 2026-07-03 | Use the AJ Digital Tier 4 layer model as a coverage map without renaming the existing docs tree yet. | Active | Existing docs already contain project context; moving files first would create churn without improving truth. | Maintain `docs/DOCUMENTATION_INDEX.md` and add missing contextual docs. |
| 2026-07-07 | Apply behavioral UX psychology to FRL product planning with explicit dark-pattern guardrails. | Active | Contractor, admin, billing, client, and AI-assisted surfaces need smart defaults, real progress, factual risk visibility, contextual money framing, and human approval preservation. | Maintain `docs/product/ux/FLR_PLATFORM_UX_PSYCHOLOGY_INTEGRATION.md` and keep it aligned with readiness gates. |
| 2026-07-09 | Accept Phase 2 closure: the mock/manual MVP scaffold is the accepted baseline for Phase B. | Active | Operator accepted the Phase 2 closure statement in `docs/delivery/PHASE_2_CLOSURE_CHECKLIST.md`; the manual/mock baseline is coherent, documented, and validated. Does not authorize production auth config, deploys, persistence, storage, migrations, live integrations, real operational data, or client portal work. | Phase B (authenticated internal pilot) planning may begin; each Phase B action requires a separate operator `proceed`. |
| 2026-07-09 | Accept the Phase B gate ladder (G0): `docs/delivery/PHASE_B_INTERNAL_PILOT_CHECKLIST.md` is the accepted Phase B sequence. | Active | Operator accepted G0. The ladder sequences DNS/domain confirmation, Clerk production setup, Vercel project/link, env var writes, preview deploy, production pilot deploy, and rollback checks. Acceptance authorizes no provider action — each gate G1–G7 requires its own operator `proceed` at execution time. | Next decision is G1: DNS/domain ownership confirmation for `floridarampandliftops.com` (hard blocker; confirmation only, no records written). |
| 2026-07-10 | `floridarampandliftops.com` is the final live product / ops domain (Q2 answered). | Active | Operator confirmed domain finality in a live instruction; Clerk production keys are domain-bound, so finality unblocks downstream planning. `floridarampandlift.com` remains marketing-only. | G1 completes when Q1 (registrar identification + verified DNS edit access) is recorded in `docs/delivery/PHASE_B_G1_OPEN_QUESTIONS.md`. |
| 2026-07-10 | Delegate development to agents by default; minimize human gates to irreducible authority points. | Active | Operator delegated Claude/Codex to drive development toward full deployment by default, per `docs/governance/DELEGATION_AND_AUTONOMY.md`. Irreducible gates: DNS/account access, secrets/env values, paid provider actions, legal approval, production deploy approval, real customer data approval, financial/client-facing release authority. Operates under the governance kernel — merge-to-main and L5/L6 actions remain HUMAN_REQUIRED unless the human owner amends the kernel. | Maintain `DELEGATION_AND_AUTONOMY.md`; kernel amendment (if desired) is a human-owner action; agents may only draft proposals. |

## Open Decision Candidates

| Topic | Current posture | Needed decision |
|---|---|---|
| Numbered layer folders | Not adopted. Current domain folders remain. | Decide later whether to physically migrate to `00-STRATEGY` through `06-REFERENCE`. |
| Runtime persistence provider | Not approved. | Decide only after implementation readiness gate is accepted. |
| Storage provider for photos/PDFs | Not approved. | Decide after security/storage policy is accepted. |
| CRM integration timing | HubSpot is future boundary. | Decide after manual/mock FLR workflows exist. |
| Accounting integration timing | QuickBooks is future final ledger boundary. | Decide after invoice readiness and approval flows are validated manually. |
