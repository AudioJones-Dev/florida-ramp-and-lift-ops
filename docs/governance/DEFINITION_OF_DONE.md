# Definition Of Done

Status: Git Spec-ready draft
Scope: Completion rules for FRL repo work
Runtime impact: None
Implementation status: Documentation only

## Purpose

This document defines when a change is complete enough to close a task in this documentation-first repo.

Done means the repo is more consistent, traceable, and ready for the next safe step. It does not mean the platform is production-ready.

## Done For Documentation Changes

A documentation change is done when:

- The content is specific to Florida Ramp & Lift, AJ Digital, and the current repo posture.
- The doc states status, scope, runtime impact, and implementation status when it defines architecture, governance, quality, delivery, or execution.
- Related docs are cross-linked.
- The change does not conflict with `PROJECT_SOURCE.md`, `docs/architecture/mvp-definition.md`, `docs/architecture/implementation-readiness-gate.md`, canonical schemas, or state machines.
- The nearest README, documentation index, or AGENTS map is updated if navigation changed.
- Stale or contradictory text is removed or flagged.

## Done For Future Runtime Changes

Runtime work is done only when:

- It aligns to the canonical data schema and state machine.
- Role and object-level permissions are preserved.
- Financial, contractor, client, and internal-only records remain separated.
- Sensitive operations have explicit human approval gates.
- Validation commands pass or blockers are documented.
- Docs are updated in the same change.

## Validation Expectations

For repo-wide governance or docs work, run:

```powershell
npm run typecheck
npm run lint
```

Optional policy check when available:

```powershell
python .codex/hooks/repo_policy.py --check
```

If the environment blocks validation, document the command, failure, and risk.

## Not Done Conditions

A task is not done if:

- It creates a generic template without FRL context.
- It marks a draft as accepted without operator approval.
- It adds future integration language without a "does not authorize" boundary.
- It changes docs but leaves indexes stale.
- It creates untracked sensitive files.
- It claims deployment, persistence, auth, or integration readiness without evidence.

## Completion Report

Closeout should report:

- Files changed.
- Validation commands and results.
- Any intentionally unchanged docs.
- Remaining risks or open questions.
- Current `git status --short --branch`.
