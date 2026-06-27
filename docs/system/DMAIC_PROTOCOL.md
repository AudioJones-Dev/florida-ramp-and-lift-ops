# DMAIC Protocol

**Status:** Git Spec-ready governance draft  
**Scope:** Diagnostic and improvement workflow for repo changes  
**Runtime impact:** None  
**Implementation status:** Documentation only

## 1. Purpose

DMAIC is the repo's diagnostic discipline for non-trivial fixes and improvements. It prevents agents from patching symptoms before they define the problem, measure the signal, and confirm the design or cause.

## 2. Phases

### Define

Capture:

- Problem or opportunity.
- Affected user, workflow, doc, or module.
- Desired outcome.
- Scope and out of scope.
- Acceptance criteria.

Exit gate: the problem and acceptance criteria are testable.

### Measure

For fixes, capture the baseline failure or current behavior.

For new work, capture the target signal or acceptance contract.

Exit gate: another agent can re-run or inspect the signal.

### Analyze

For fixes, identify the root cause with evidence.

For new work, compare design options and choose the smallest design that satisfies the acceptance criteria and repo constraints.

Exit gate: the chosen cause or design is evidence-backed, not guessed.

### Improve

Implement the scoped change using the Goal Protocol.

Exit gate: the Measure signal passes or the target contract is satisfied.

### Control

Lock the improvement in with tests, docs, hooks, checklists, or ownership.

Exit gate: the repo contains a durable guard against silent regression.

## 3. Required Charter For Substantial Work

Use a short charter in the PR, issue, or planning doc:

```txt
DMAIC Charter:
Define:
Measure:
Analyze:
Improve:
Control:
```

## 4. Florida Ramp & Lift Control Rules

- No feature work on ungoverned runtime surfaces.
- Persistence/auth/storage must pass design and implementation gates before code.
- Approval-sensitive workflows require explicit human authority in docs and UI.
- Source-of-truth boundaries must remain intact: HubSpot for CRM visibility, QuickBooks for accounting ledger, FLR for operational intelligence, GitHub for repo specs, Obsidian for business memory.

## 5. When DMAIC Can Be Skipped

DMAIC can be skipped for:

- Typo fixes.
- Formatting-only changes.
- Adding a clearly requested single documentation file with no architecture decision.

Even when skipped, run the standard Loop Protocol.
