# Docs Instructions

Docs are the governing layer for this repo. Treat them as product and architecture contracts, not loose notes.

## Edit Rules

- Preserve existing Phase 1 and MVP docs unless the task explicitly authorizes replacement.
- New docs must state status, scope, runtime impact, and implementation status when they define architecture or protocols.
- Do not mark an implementation as ready unless its acceptance criteria and gates are satisfied.
- Cross-link related docs so future agents can find the source of truth.
- Do not introduce live integration authorization through wording drift. Planning docs may describe future systems; they must also state what they do not authorize.

## Required Sections For New Architecture Docs

- Purpose
- Current scope
- Source-of-truth boundaries
- In scope
- Out of scope
- Human approval gates
- Risks
- Acceptance criteria
- Implementation sequence or next branch, when applicable

## Directory Map

- `docs/DOCUMENTATION_INDEX.md`: AJ Digital Tier 4 layer coverage map over the current docs tree.
- `docs/00-STRATEGY/` through `docs/06-REFERENCE/`: canonical layer entrypoints that point to existing source docs. Do not duplicate detailed source-of-truth content there unless a future branch explicitly migrates the docs tree.
- `docs/architecture/`: platform architecture, source-of-truth boundaries, implementation gates.
- `docs/prds/`: product requirements.
- `docs/product/`: product UX, interaction, and screen behavior requirements.
- `docs/schemas/`: human-readable schema and state-machine planning.
- `docs/workflows/`: operational workflow definitions.
- `docs/sop/`: field and business operating procedures.
- `docs/guardrails/`: safety, financial, agent, and approval constraints.
- `docs/agents/`: future agent role specs.
- `docs/system/`: repo operating protocols for human/agent collaboration.
- `docs/governance/`: definitions of ready/done/stable, decision log, risk register, and repo governance artifacts.
- `docs/quality/`: security, observability, testing, and failure-mode planning.
- `docs/delivery/`: release, migration, and changelog planning.
- `docs/execution/`: worktree planning and requirements traceability.
- `docs/reference/`: glossary, dependency map, and open questions.

## Documentation Safety

Do not add private vault paths, client files, secrets, or internal credentials to docs. Obsidian references must describe sync/export rules generically or use placeholder examples.
