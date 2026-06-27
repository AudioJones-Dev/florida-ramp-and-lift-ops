# Goal Protocol

**Status:** Git Spec-ready governance draft  
**Scope:** Agent execution goals and completion criteria  
**Runtime impact:** None  
**Implementation status:** Documentation only

## 1. Purpose

The Goal Protocol prevents open-ended agent work. Every meaningful repo task must define the objective, constraints, validation, and completion evidence before implementation starts.

## 2. When To Use

Use this protocol for:

- Feature branches.
- Documentation branches.
- QA/readiness reviews.
- Refactors.
- Runtime bug fixes.
- Integration planning.
- Any task likely to touch more than one file.

Trivial typo fixes may skip the full protocol, but still require `git status`, scoped edits, and validation where practical.

## 3. Goal Contract

Before editing, capture:

```txt
Objective:
Base branch:
Working branch:
Scope:
Out of scope:
Constraints:
Files or areas to inspect first:
Validation:
Completion evidence:
Approval gates:
```

If any line is unknown and materially affects the work, stop and ask or state the assumption before proceeding.

## 4. Execution Rules

- Inspect before editing.
- Match existing repo naming and structure.
- Keep edits scoped to the goal.
- Do not introduce dependencies, secrets, integrations, migrations, auth, storage, or runtime side effects unless the goal explicitly authorizes them.
- Update docs when behavior, architecture, or agent rules change.
- Re-run the stated validation before calling the goal complete.

## 5. Completion Criteria

A goal is complete only when:

- The requested files or behavior are implemented.
- Out-of-scope areas remain untouched.
- Validation has run or the blocker is documented.
- The working tree status is reported.
- Remaining risks or follow-up work are named.

## 6. Blocked Criteria

Stop and report blocked when:

- The repo state contradicts the requested task.
- A required source-of-truth doc is missing or conflicts with another.
- The task requires irreversible or approval-gated action without operator approval.
- Validation cannot run because of environment failure.

## 7. Florida Ramp & Lift Defaults

Default constraints for this repo:

- Mock/manual first.
- No Firebase.
- No live integrations.
- No secrets.
- No real customer files.
- No production persistence/auth/storage until accepted design and dedicated implementation branch.
- No automated financial, client-facing, dispatch, safety, or payout approval.
