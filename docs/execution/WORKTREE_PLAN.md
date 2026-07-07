# Worktree Plan

Status: Git Spec-ready draft
Scope: Branch and worktree rules for FRL documentation and future implementation
Runtime impact: None
Implementation status: Documentation only

## Purpose

This plan defines how work should be separated so documentation governance, app behavior, schema work, and production-sensitive changes do not collide.

## Branch Classes

| Branch prefix | Use |
|---|---|
| `docs/` | Governance, PRDs, architecture, protocols, roadmaps, indexes, planning. |
| `qa/` | Reviews, readiness checks, validation, audit reports. |
| `feat/` | App-facing behavior when implementation has been approved. |
| `chore/` | Repo hygiene that does not change product behavior. |

## Current Repo Posture

The repo is documentation-first. Documentation and governance branches may not change app runtime behavior.

Future implementation branches must cite:

- Source PRD or architecture doc.
- Canonical object and state model.
- Permission boundary.
- Human approval gate.
- Validation plan.

## Worktree Rules

- Check `git status --short --branch` before changes.
- Do not merge feature work into a governance-only branch.
- Do not delete branches or worktrees without explicit operator approval.
- Keep dirty local work isolated to the current task.
- If another agent is working in parallel, review current branch, open PRs, and uncommitted changes before editing.

## Squash/Merge Criteria

A branch can be proposed for squash merge only when:

- Validation passes or blockers are documented.
- Docs remain consistent with `PROJECT_SOURCE.md`, MVP definition, readiness gate, schema, and state machine.
- No secrets or sensitive client files are present.
- The PR description states runtime impact.
- Human approval gates are preserved.

## Cleanup Criteria

A stale branch or worktree can be pruned only after:

- Its PR is merged or closed.
- Its content is confirmed superseded or preserved.
- The operator approves cleanup.
- `git status` is clean for the affected worktree.
