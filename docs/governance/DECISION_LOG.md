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
| 2026-07-09 | Accept the Phase B gate ladder (G0): `docs/delivery/PHASE_B_INTERNAL_PILOT_CHECKLIST.md` is the accepted Phase B sequence. | Superseded 2026-07-12 | Operator accepted G0. The ladder sequenced a Clerk/Vercel pilot that is now frozen under `SOURCE_REPO_FREEZE.md`. | Retain as historical evidence; do not execute its gates. |
| 2026-07-10 | `floridarampandliftops.com` is the final live product / ops domain (Q2 answered). | Active | Operator confirmed domain finality in a live instruction; Clerk production keys are domain-bound, so finality unblocks downstream planning. `floridarampandlift.com` remains marketing-only. | G1 completes when Q1 (registrar identification + verified DNS edit access) is recorded in `docs/delivery/PHASE_B_G1_OPEN_QUESTIONS.md`. |
| 2026-07-10 | Delegate development to agents by default; minimize human gates to irreducible authority points. | Superseded for this repo 2026-07-12 | Runtime development toward deployment is frozen here. Delegation remains subject to the canonical target repo's contracts. | Use this repo only for approved documentation reconciliation. |
| 2026-07-10 | G1 confirmed: DNS management for `floridarampandliftops.com` is confirmed and DNS edit access is available when needed (Q1, provider-free wording); domain final (Q2). | Active | Operator answered Q1 and Q2 in live instructions; registrar identity deliberately kept out of repo docs. G1 confirmed the domain and access availability only — it authorized no DNS change, provider action, or deploy. | G2 (Clerk production setup) is the next gate; it requires its own operator `proceed`, with Q3 (`.env.production.local` provenance/rotation) resolved before any production key is generated. |
| 2026-07-11 | Assign `ops.floridarampandliftops.com` to this repo; preserve existing Render-backed hosts; use Clerk email/password for Phase B and defer Google OAuth. | Superseded 2026-07-12 | The source repo is frozen and no longer owns a live hostname. Existing Clerk/Vercel state remains historical provider evidence. | Do not create the `ops` application record or deploy this repo. |
| 2026-07-12 | Freeze `florida-ramp-and-lift-ops` as a planning/reference source and consolidate Tier 4 runtime authority in `FRL-CONTRACTOR-PORTAL`. | Active | Eliminates competing auth, provider, schema, domain, and deployment sources of truth while preserving source assets and Git history. Accepted canonical evidence: `FRL-CONTRACTOR-PORTAL` PR #41 / merge `fb56861`. | Keep PR #1, provider state, DNS, and repository archive state unchanged; reconcile one accepted source capability at a time in the canonical repo. |

## Open Decision Candidates

| Topic | Current posture | Needed decision |
|---|---|---|
| Numbered layer folders | Not adopted. Current domain folders remain. | Decide later whether to physically migrate to `00-STRATEGY` through `06-REFERENCE`. |
| Runtime persistence provider | Not approved. | Decide only after implementation readiness gate is accepted. |
| Storage provider for photos/PDFs | Not approved. | Decide after security/storage policy is accepted. |
| CRM integration timing | HubSpot is future boundary. | Decide after manual/mock FLR workflows exist. |
| Accounting integration timing | QuickBooks is future final ledger boundary. | Decide after invoice readiness and approval flows are validated manually. |
