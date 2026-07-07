# Loop Protocol

**Status:** Git Spec-ready governance draft  
**Scope:** Iterative agent work loops and checkpoints  
**Runtime impact:** None  
**Implementation status:** Documentation only

## 1. Purpose

The Loop Protocol keeps long agent sessions from drifting. It defines the repeatable inspect-plan-edit-validate-report loop used for repo work.

## 2. Standard Loop

1. **Orient**
   - Confirm branch and working tree.
   - Read root `AGENTS.md` and nearest child `AGENTS.md`.
   - Identify source-of-truth docs and affected files.

2. **Define**
   - Restate objective, scope, constraints, and validation.
   - Separate facts, inferences, assumptions, and open questions.

3. **Inspect**
   - Read existing implementation or docs before creating new structure.
   - Search for prior naming, duplicate concepts, and active constraints.

4. **Act**
   - Make the smallest scoped change that satisfies the goal.
   - Avoid unrelated cleanup.
   - Preserve user or teammate work in the working tree.

5. **Validate**
   - Run requested checks.
   - For docs/governance branches, default to `npm run typecheck` and `npm run lint`.
   - Record any blocker exactly.

6. **Report**
   - Summarize files changed.
   - State validation results.
   - State working tree status.
   - Name residual risks and next gate.

## 3. Checkpoint Triggers

Create a checkpoint before:

- Switching from planning to implementation.
- Changing branch strategy.
- Touching approval-gated areas.
- Editing accepted architecture docs.
- Adding or changing dependencies.
- Starting persistence, auth, storage, or live integration work.
- Ending a long session with unresolved follow-up.

## 4. Drift Controls

- If the task expands, stop and redefine the goal.
- If a doc says future-only, do not implement it as runtime.
- If a route or component implies production behavior, label it mock/manual unless the branch authorizes live behavior.
- If an agent finds conflicting instructions, report the conflict instead of choosing silently.

## 5. Loop Output Format

Use this short status shape when handing off:

```txt
Current state:
Risk level:
Unblocked:
Blocked:
Validation:
Next gate:
```
