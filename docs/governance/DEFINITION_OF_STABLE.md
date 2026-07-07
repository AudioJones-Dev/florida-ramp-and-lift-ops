# Definition Of Stable

Status: Git Spec-ready draft
Scope: Stability standard for FRL platform specs and future runtime releases
Runtime impact: None
Implementation status: Documentation only

## Purpose

This document defines what "stable" means for the Florida Ramp & Lift repo.

Stable means the system can be trusted as a source of truth for the next decision. It does not imply production automation is live.

## Documentation Stability

Documentation is stable when:

- Source-of-truth boundaries are explicit.
- Accepted docs do not contradict each other.
- Draft docs are labeled as draft.
- Placeholder or planning docs are clearly identified.
- Layer coverage is visible in `docs/DOCUMENTATION_INDEX.md`.
- Future work is traceable to current PRDs, architecture, schemas, workflows, or SOPs.

## Product Stability

The MVP product definition is stable when:

- Michael Keegan remains final MVP authority for client-facing invoice release.
- AJ Digital support/admin authority is separated from client and contractor authority.
- Client-facing, contractor-facing, internal, and financial data boundaries are explicit.
- Dashboard metrics come from canonical object state and do not invent state.
- Manual/mock workflows exist before live integrations.

## Technical Stability

Future implementation is stable only when:

- Auth, persistence, storage, eventing, and integrations align to accepted docs.
- No Firebase packages, config, env names, or implementation path exists.
- Secrets are never committed.
- Runtime actions are auditable.
- Failure modes have manual fallback.
- Deployment rollback is defined before go-live.

## Unstable Conditions

The repo is unstable if:

- A feature branch changes runtime behavior without matching docs.
- A doc introduces production automation by wording drift.
- Multiple docs define competing object names, states, roles, or approval authority.
- Mock data is treated as operational fact.
- A live integration is added before the implementation readiness gate is satisfied.

## Stabilization Requirements

Before any future production milestone:

1. Re-run documentation layer review.
2. Confirm DoR, DoD, and DoS are satisfied.
3. Check risk register and open questions.
4. Confirm branch/worktree plan.
5. Validate build/lint/typecheck where applicable.
6. Confirm no secrets or private customer records are present.
