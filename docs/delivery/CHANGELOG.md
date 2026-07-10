# Changelog

Status: Git Spec-ready draft
Scope: Human-readable record of durable FRL repo changes
Runtime impact: None
Implementation status: Documentation only

## Purpose

This changelog tracks durable documentation, governance, architecture, and future implementation milestones.

Use Git history for exact diffs. Use this file for operator-readable milestone context.

## Unreleased

- Added the G3/G4 Vercel and environment runbook (`docs/delivery/G3_G4_VERCEL_ENV_RUNBOOK.md`): operator playbook for Vercel project creation/link (G3) and env var writes (G4), with a per-environment env-name table, key-tier rules, and a highlighted gate-interaction warning — Vercel Git integration auto-deploys pushes to `main`, which would bypass the G5/G6 deploy gates; recommended default is CLI-only linking at G3 with the Git-integration decision recorded explicitly. Documentation only; authorizes nothing by itself.
- Added the G2 Clerk production runbook (`docs/delivery/G2_CLERK_PRODUCTION_RUNBOOK.md`): ordered operator playbook for gate G2 — Step 0 Q3 credential provenance/rotation (required before any key generation), Clerk production instance creation, dashboard-authoritative DNS records, auth path configuration, key-tier rules, verification, and abort/rollback. Documentation only; every step operator-executed under the G2 `proceed`; authorizes nothing by itself.
- Recorded operator Q1 answer (2026-07-10, provider-free wording: DNS management confirmed, edit access available when needed) and closed gate **G1** of the Phase B ladder — Q1 + Q2 both answered; G1 header marked confirmed; G2's "G1 complete" precondition checked; decision log updated. G1 authorized no DNS change or provider action; G2 (Clerk production setup) requires its own operator `proceed`. Docs-only.
- Recorded operator F2 confirmation (2026-07-10): demo invoice/job amounts do not mirror real FRL pricing. S4 → Pass; F2 → Resolved. Fixture sanitization now complete except the S9 run record, which is produced at the G5/G6 pilot verification run by design. Docs-only.
- F1 cleanup (operator-directed): replaced the personal Gmail in `src/lib/roles.ts` mock login accounts with `contractor.preview@example.com`; business `@ajdigital.app` preview identities retained. Resolves sanitization finding F1 — S1 now passes; G5 sanitization preconditions reduce to F2 confirmation and the S9 pilot-run record. Fixture-only runtime change, no behavior change.
- Recorded fixture sanitization evidence (S1–S10) in `docs/delivery/FIXTURE_SANITIZATION_CHECKLIST.md`: 8 pass, S9 deferred to the pilot verification run, S1 conditional on finding F1 (real personal email `bookaudiojones@gmail.com` plus `@ajdigital.app` identities in `src/lib/roles.ts` mock login accounts — operator decision required before G5); F2 asks the operator to confirm demo invoice amounts do not mirror real pricing. Docs-only; no fixture or runtime file changed.
- Recorded domain finality (`floridarampandliftops.com` is the final live product/ops domain; Q2 answered 2026-07-10) and the operator's delegation decision (`docs/governance/DELEGATION_AND_AUTONOMY.md`): agents drive development toward deployment by default, with human gates minimized to irreducible authority points (DNS/account access, secrets/env values, paid provider actions, legal, production deploy, real customer data, financial/client-facing release). Operates under the governance kernel; merge-to-main remains SHA-pinned HUMAN_REQUIRED. Q1 (registrar/DNS access) remains pending.
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
