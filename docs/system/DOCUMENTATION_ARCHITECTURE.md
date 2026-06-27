# Documentation Architecture

**Status:** Git Spec-ready governance draft  
**Scope:** Repo documentation structure and update rules  
**Runtime impact:** None  
**Implementation status:** Documentation only

## 1. Purpose

This document defines how documentation should be organized so agents do not create duplicate sources of truth or bury operational decisions in the wrong folder.

## 2. Source-Of-Truth Tiers

### Tier 1: Repo Operating Rules

- `AGENTS.md`
- Child `AGENTS.md` files
- `docs/system/`

These govern agent behavior and repo work loops.

### Tier 2: Product And Architecture Contracts

- `PROJECT_SOURCE.md`
- `README.md`
- `docs/architecture/`
- `docs/prds/`
- `docs/schemas/`

These define product scope, source-of-truth boundaries, implementation gates, and domain model contracts.

### Tier 3: Operational Workflow Contracts

- `docs/workflows/`
- `docs/sop/`
- `docs/guardrails/`
- `docs/agents/`
- `docs/automation/`
- `docs/training/`

These define how humans, future agents, and operational workflows behave.

### Tier 4: Machine-Readable Contracts

- `schemas/`
- `prompts/`
- `samples/`
- `src/types/`

These should mirror the approved docs and must not drift into independent architecture.

## 3. Placement Rules

Use `docs/architecture/` for durable platform decisions.

Use `docs/prds/` for product requirements and user-facing scope.

Use `docs/schemas/` for human-readable object/state/access modeling.

Use root `schemas/` for machine-readable JSON Schemas.

Use `docs/system/` for repo governance, agent loops, and documentation process.

Use `docs/qa/` for point-in-time reviews, readiness assessments, and go/no-go decisions.

## 4. Status Labels

Architecture and protocol docs should include:

```txt
Status:
Scope:
Runtime impact:
Implementation status:
```

Use plain status labels:

- Draft
- Git Spec-ready draft
- Accepted
- Superseded
- Deprecated

Do not mark a doc accepted unless the operator has accepted it or the branch objective explicitly says to establish it.

## 5. Change Rules

- Update existing docs instead of creating a parallel concept.
- When adding a new doc, link it from the nearest README when the doc becomes part of the navigational map.
- When runtime behavior changes, update docs in the same PR.
- When docs authorize future work, include a "Non-goals" or "Does not authorize" section.
- When docs reference private systems, avoid private paths and use placeholder examples.

## 6. Conflict Handling

If two docs conflict:

1. Quote or summarize both conflicting claims.
2. Identify which file is newer or closer to the affected area.
3. Do not silently choose.
4. Ask for operator decision or propose a narrow reconciliation doc change.
