# Changelog

Status: Git Spec-ready draft
Scope: Human-readable record of durable FRL repo changes
Runtime impact: None
Implementation status: Documentation only

## Purpose

This changelog tracks durable documentation, governance, architecture, and future implementation milestones.

Use Git history for exact diffs. Use this file for operator-readable milestone context.

## Unreleased

- Resolved Phase B Q3 credential provenance (2026-07-10): a names-only audit
  matched the untracked `.env.production.local` production-tier Clerk keys to
  the existing, unused Production instance of `My Application` (zero MAU, MAO,
  and SMS usage). Under explicit operator approval, the old Production Secret
  Key was rotated through Clerk CLI with immediate expiration; the replacement
  was neither printed nor persisted, the Publishable Key was unchanged, the
  local file was deleted, and Git history remained empty. G2 remains pending
  its own `proceed`; instance deletion/replacement remains separately gated.
- Added the G3/G4 Vercel and environment runbook (`docs/delivery/G3_G4_VERCEL_ENV_RUNBOOK.md`): operator playbook for Vercel project creation/link (G3) and env var writes (G4), with a per-environment env-name table, key-tier rules, and a gate-interaction rule — Vercel Git integration auto-deploys: branch pushes create preview deployments (bypassing G5) and merges to `main` create production deployments (bypassing G6); the accepted G3 default keeps the Git integration disconnected through G6, with gated CLI deployments only, reconciled across `DEPLOYMENT_TARGET.md` and the Phase B checklist G3 boxes. Vercel project deletion is marked as a destructive rollback action requiring separate approval. Documentation only; authorizes nothing by itself.
- Added a dependency-backed gap trace (`docs/delivery/GAP_TRACE_PILOT_TO_MVP.md`) from the Phase B pilot through controlled persistence to the client-deliverable MVP, built from the repository's semantic graph: the Implementation Readiness Gate is the single articulation point between the pilot chain and the MVP chain; gap register T1–T7 lists the artifacts still required. Analysis only; authorizes nothing.
- Added the G2 Clerk production runbook (`docs/delivery/G2_CLERK_PRODUCTION_RUNBOOK.md`): ordered operator playbook for gate G2 — Step 0 Q3 credential provenance/rotation, existing Production-instance verification/configuration, dashboard-authoritative DNS records, auth path configuration, key-tier rules, verification, and abort/rollback. Documentation only; every G2 step remains behind the G2 `proceed`; authorizes nothing by itself.
- Recorded operator Q1 answer (2026-07-10, provider-free wording: DNS management confirmed, edit access available when needed) and closed gate **G1** of the Phase B ladder — Q1 + Q2 both answered; G1 header marked confirmed; G2's "G1 complete" precondition checked; decision log updated. G1 authorized no DNS change or provider action; G2 (Clerk production setup) requires its own operator `proceed`. Docs-only.
- Recorded operator F2 confirmation (2026-07-10): demo invoice/job amounts do not mirror real FRL pricing. S4 → Pass; F2 → Resolved. Fixture sanitization now complete except the S9 run record, which is produced at the G5/G6 pilot verification run by design. Docs-only.
- F1 cleanup (operator-directed): replaced the personal Gmail in `src/lib/roles.ts` mock login accounts with `contractor.preview@example.com`; business `@ajdigital.app` preview identities retained. Resolves sanitization finding F1 — S1 now passes; G5 sanitization preconditions reduce to F2 confirmation and the S9 pilot-run record. Fixture-only runtime change, no behavior change.
- Recorded fixture sanitization evidence (S1–S10) in `docs/delivery/FIXTURE_SANITIZATION_CHECKLIST.md`: 8 pass, S9 deferred to the pilot verification run, S1 conditional on finding F1 (real personal email `bookaudiojones@gmail.com` plus `@ajdigital.app` identities in `src/lib/roles.ts` mock login accounts — operator decision required before G5); F2 asks the operator to confirm demo invoice amounts do not mirror real pricing. Docs-only; no fixture or runtime file changed.
- Recorded domain finality (`floridarampandliftops.com` is the final live product/ops domain; Q2 answered 2026-07-10) and the operator's delegation decision (`docs/governance/DELEGATION_AND_AUTONOMY.md`): agents drive development toward deployment by default, with human gates minimized to irreducible authority points (DNS/account access, secrets/env values, paid provider actions, legal, production deploy, real customer data, financial/client-facing release). Operates under the governance kernel; merge-to-main remains SHA-pinned HUMAN_REQUIRED. Q1 (registrar/DNS access) remained pending at the time of this entry; it was answered later the same day (see the Q1/G1 entry above).
- Added Phase B planning-prep artifacts: pilot verification script (`docs/delivery/PILOT_VERIFICATION_SCRIPT.md`, route-grounded G5/G6 verification steps), G1 open-questions inventory (`docs/delivery/PHASE_B_G1_OPEN_QUESTIONS.md`, seven operator decisions with recording protocol), and fixture sanitization checklist (`docs/delivery/FIXTURE_SANITIZATION_CHECKLIST.md`, S1–S10 evidence rows blocking G5). Docs-only; no provider action authorized.
- Added Phase B internal pilot planning checklist (`docs/delivery/PHASE_B_INTERNAL_PILOT_CHECKLIST.md`): a sequenced gate ladder (G0–G7) separating planning-only work from operator-gated DNS/domain confirmation, Clerk production setup, Vercel project/link, env var writes, preview deploy, production pilot deploy, and rollback/runbook checks. Planning-only; authorizes no provider action.
- Added Phase 2 closure checklist for Phase A of the live-app gap-closure plan, including operator acceptance language and Phase B handoff criteria.
- Updated the risk register and open questions to track the remaining ops-domain Terms/Privacy publication and support/legal contact gates.
- Added Florida-law legal/privacy doctrine for Florida Ramp and Lift LLC, including the `floridarampandliftops.com` ops-domain Terms/Privacy gate, FIPA baseline, Florida Digital Bill of Rights alignment, and sensitive operational data restrictions.
- Recorded the internal pilot deployment posture for `floridarampandliftops.com`, clarified the boundary from the `floridarampandlift.com` marketing site, clarified that persistence is not required for the protected mock/manual pilot, and replaced the deployment target rollback placeholder with an internal-pilot rollback runbook.
- Added deployment target decision record (`docs/delivery/DEPLOYMENT_TARGET.md`) recommending a new Git-linked Vercel project `florida-ramp-and-lift-ops`, with gated Clerk/link/preview/production checklists and a production-domain hard blocker; added `.vercel/` to `.gitignore`.
- Added Tier 4 documentation coverage map in `docs/DOCUMENTATION_INDEX.md`.
- Added governance artifacts for Definition of Ready, Definition of Done, Definition of Stable, decision log, and risk register.
- Added execution artifacts for worktree planning and requirements traceability.
- Added quality artifacts for security, observability, test strategy, and failure modes.
- Added delivery artifacts for release planning and migration planning.
- Added reference artifacts for glossary, dependency map, and open questions.

## Historical Baseline

- Repo established as documentation-first Florida Ramp & Lift Operational Intelligence Platform.
- MVP definition, implementation readiness gate, canonical schema, state machine, role matrix, SOPs, workflows, PRDs, and agent planning docs established as core source materials.
