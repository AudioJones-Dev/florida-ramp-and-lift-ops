# Layer 5 Execution

Status: Git Spec-ready draft
Scope: Navigation layer for execution, worktree, and traceability docs
Runtime impact: None
Implementation status: Documentation only

## Purpose

This folder reconciles the AJ Digital Tier 4 execution layer with FRL task planning.

## FRL Execution Context

Execution must stay branch-scoped and traceable to source docs. Codex should handle repo inspection, code/doc edits, validation, and Git-aware execution. Claude should remain docs/control-room oriented unless a specific task redirects it.

Implementation branches must cite the PRD, architecture source, canonical objects, state transitions, permission boundaries, human gates, and validation plan.

## Canonical Sources

| Execution need | Source |
|---|---|
| Worktree plan | `../execution/WORKTREE_PLAN.md` |
| Requirements traceability | `../execution/REQUIREMENTS_TRACEABILITY_MATRIX.md` |
| Implementation readiness | `../architecture/implementation-readiness-gate.md` |
| Dependency map | `../reference/DEPENDENCY_MAP.md` |

## Does Not Authorize

This layer does not authorize broad refactors, branch deletion, worktree pruning, production deploys, or runtime integration work.
