# Delivery Docs Instructions

## Purpose

`docs/delivery/` preserves historical release, migration, Clerk, Vercel, pilot,
verification, and deployment planning from the former mock-scaffold path.

## Ownership

- Owns historical evidence of decisions, completed provider setup, checklists,
  runbooks, and proposed delivery sequences created before the source-repo
  freeze.
- Does not own current runtime, deployment, provider, domain, environment,
  release, or production authority.
- Current repository posture is owned by
  `docs/governance/SOURCE_REPO_FREEZE.md`.
- Current Tier 4 delivery authority belongs to
  `AudioJones-Dev/FRL-CONTRACTOR-PORTAL` under that repository's contracts.

## Local Contracts

- Every existing delivery document in this subtree is historical/reference
  material unless a later operator-approved document explicitly supersedes the
  source-repo freeze.
- Instructions, checklists, gate sequences, `proceed` language, commands,
  hostname assignments, provider targets, and next-step statements in these
  files are non-executable under the current posture.
- `ops.floridarampandliftops.com` is not assigned to this repository and has no
  application DNS record. Do not create, repoint, or deploy it from this repo.
- Preserve delivery files and execution evidence; do not delete or rewrite
  history merely because its former plan is superseded.
- Do not modify Clerk, Vercel, DNS, environment variables, secrets, GitHub
  integration, deployments, or provider state from this subtree.
- Do not close or modify PR #1 through delivery-document reconciliation.

## Work Guidance

- Add a file-level supersession notice when materially editing an individual
  historical document.
- Prefer the smallest clarification necessary; retain dates, evidence, and
  former decisions for auditability.
- Route useful source concepts through the canonical consolidation inventory
  before drafting any target-platform implementation plan.

## Verification

- Run `npm run typecheck`, `npm run lint`, and
  `python .codex/hooks/repo_policy.py --check` for repo-wide delivery/governance
  changes when the environment allows.
- Confirm documentation-only diffs do not include runtime, config, provider,
  environment, or secret files.

## Child DOX Index

- None.
