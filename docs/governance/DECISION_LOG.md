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
| 2026-07-09 | Accept Phase 2 closure: the mock/manual MVP scaffold is the accepted baseline for Phase B. | Superseded for runtime progression 2026-07-12 | The validated mock/manual baseline remains preserved as source evidence, but it no longer opens a Phase B implementation path in this repo. | Reconcile useful baseline concepts through the canonical platform inventory. |
| 2026-07-09 | Accept the Phase B gate ladder (G0): `docs/delivery/PHASE_B_INTERNAL_PILOT_CHECKLIST.md` is the accepted Phase B sequence. | Superseded 2026-07-12 | Operator accepted G0. The ladder sequenced a Clerk/Vercel pilot that is now frozen under `SOURCE_REPO_FREEZE.md`. | Retain as historical evidence; do not execute its gates. |
| 2026-07-10 | `floridarampandliftops.com` is the final live product / ops domain family (Q2 answered). | Active non-authorizing context | The domain-family decision remains relevant to the canonical platform; it grants this source repo no hostname, provider, DNS, or deployment authority. `floridarampandlift.com` remains marketing-only. | Manage live host decisions only through `FRL-CONTRACTOR-PORTAL` governance. |
| 2026-07-10 | Delegate development to agents by default; minimize human gates to irreducible authority points. | Superseded for this repo 2026-07-12 | Runtime development toward deployment is frozen here. Delegation remains subject to the canonical target repo's contracts. | Use this repo only for approved documentation reconciliation. |
| 2026-07-10 | G1 confirmed: DNS management for `floridarampandliftops.com` is confirmed and DNS edit access is available when needed (Q1, provider-free wording); domain final (Q2). | Historical 2026-07-12 | G1 recorded access context only. The former G2 Clerk/Vercel sequence is frozen and non-executable in this repo. | Preserve as historical evidence; no next provider gate exists here. |
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
