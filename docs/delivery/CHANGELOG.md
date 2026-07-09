# Changelog

Status: Git Spec-ready draft
Scope: Human-readable record of durable FRL repo changes
Runtime impact: None
Implementation status: Documentation only

## Purpose

This changelog tracks durable documentation, governance, architecture, and future implementation milestones.

Use Git history for exact diffs. Use this file for operator-readable milestone context.

## Unreleased

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
