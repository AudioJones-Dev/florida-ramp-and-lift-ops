# DOX framework

- DOX is highly performant AGENTS.md hierarchy installed here
- Agent must follow DOX instructions across any edits

## Core Contract

- AGENTS.md files are binding work contracts for their subtrees
- Work products, source materials, instructions, records, assets, and durable docs must stay understandable from the nearest applicable AGENTS.md plus every parent AGENTS.md above it

## Read Before Editing

1. Read the root AGENTS.md
2. Identify every file or folder you expect to touch
3. Walk from the repository root to each target path
4. Read every AGENTS.md found along each route
5. If a parent AGENTS.md lists a child AGENTS.md whose scope contains the path, read that child and continue from there
6. Use the nearest AGENTS.md as the local contract and parent docs for repo-wide rules
7. If docs conflict, the closer doc controls local work details, but no child doc may weaken DOX

Do not rely on memory. Re-read the applicable DOX chain in the current session before editing.

## Update After Editing

Every meaningful change requires a DOX pass before the task is done.

Update the closest owning AGENTS.md when a change affects:

- purpose, scope, ownership, or responsibilities
- durable structure, contracts, workflows, or operating rules
- required inputs, outputs, permissions, constraints, side effects, or artifacts
- user preferences about behavior, communication, process, organization, or quality
- AGENTS.md creation, deletion, move, rename, or index contents

Update parent docs when parent-level structure, ownership, workflow, or child index changes. Update child docs when parent changes alter local rules. Remove stale or contradictory text immediately. Small edits that do not change behavior or contracts may leave docs unchanged, but the DOX pass still must happen.

## Hierarchy

- Root AGENTS.md is the DOX rail: project-wide instructions, global preferences, durable workflow rules, and the top-level Child DOX Index
- Child AGENTS.md files own domain-specific instructions and their own Child DOX Index
- Each parent explains what its direct children cover and what stays owned by the parent
- The closer a doc is to the work, the more specific and practical it must be

## Child Doc Shape

- Create a child AGENTS.md when a folder becomes a durable boundary with its own purpose, rules, responsibilities, workflow, materials, or quality standards
- Work Guidance must reflect the current standards of the project or user instructions; if there are no specific standards or instructions yet, leave it empty
- Verification must reflect an existing check; if no verification framework exists yet, leave it empty and update it when one exists

Default section order:
- Purpose
- Ownership
- Local Contracts
- Work Guidance
- Verification
- Child DOX Index

## Style

- Keep docs concise, current, and operational
- Document stable contracts, not diary entries
- Put broad rules in parent docs and concrete details in child docs
- Prefer direct bullets with explicit names
- Do not duplicate rules across many files unless each scope needs a local version
- Delete stale notes instead of explaining history
- Trim obvious statements, repeated rules, misplaced detail, and warnings for risks that no longer exist

## Closeout

1. Re-check changed paths against the DOX chain
2. Update nearest owning docs and any affected parents or children
3. Refresh every affected Child DOX Index
4. Remove stale or contradictory text
5. Run existing verification when relevant
6. Report any docs intentionally left unchanged and why

## User Preferences

- graphifyy v0.8.36+ must be installed before working on any repo: `uv tool install graphifyy` (preferred) or `pip install graphifyy`. Run `uv tool list | grep graphify` to verify. Used for /graphify codebase analysis and knowledge graph generation.

## Child DOX Index

- `docs/AGENTS.md` governs `docs/`, including architecture, PRDs, schemas, workflows, SOPs, guardrails, agents, system protocols, governance, quality, delivery, execution, and reference documentation.
- `schemas/AGENTS.md` governs root machine-readable schema contracts.
- `src/AGENTS.md` governs source code.
- `src/app/AGENTS.md` governs Next.js app routes and page-level behavior.
- `src/components/AGENTS.md` governs React components.
- `src/lib/AGENTS.md` governs shared library utilities and domain logic.

---

# Repo Operating System

This repo uses a DOX-style instruction hierarchy. Agents must read this root file first, then the nearest child `AGENTS.md` before editing files in a subtree.

## Mission

This repository is a preserved planning/reference source for Florida Ramp & Lift
operational intelligence work. It contains a mock/manual MVP scaffold and
documentation-first architecture, but it is not the canonical Tier 4 runtime.

Runtime development and deployment are frozen here. The canonical AJ Digital
FieldOps Platform application is `AudioJones-Dev/FRL-CONTRACTOR-PORTAL`, with
Florida Ramp & Lift as its first tenant. See
`docs/governance/SOURCE_REPO_FREEZE.md`.

## Repo Identity / Anti-Confusion

This repository is easy to confuse with similarly named siblings on this machine.
Confirm identity before editing; never carry another repo's assumptions into this one.

Canonical identity:

- Local path: `C:\dev\florida-ramp-and-lift-ops`
- Remote `origin`: `https://github.com/AudioJones-Dev/florida-ramp-and-lift-ops.git`
- Default/reference branch: `main`
- Product posture: preserved planning/reference source with a Next.js + Clerk
  mock/manual scaffold

Identity check (reinforces Required Work Pattern step 1) — run before editing:

```powershell
pwd
git remote -v
git rev-parse --show-toplevel
```

STOP if `origin` is not `…florida-ramp-and-lift-ops.git`.

Do not confuse with — and do not import assumptions from:

- `FRL-CONTRACTOR-PORTAL` (`git@github.com:AudioJones-Dev/FRL-CONTRACTOR-PORTAL.git`,
  `C:\dev\frl-contractor-portal`) — the **canonical Tier 4 AJ Digital FieldOps
  Platform application** (Supabase / Render, live migrations, storage, and
  deployed domains). This repo remains a non-runtime source for controlled
  reconciliation into that product.
- `floridaplatformliftpros` (`https://github.com/AudioJones-Dev/floridaplatformliftpros.git`,
  `C:\dev\florida platform lift pros`) — a separate repo.

Full boundary table: `docs/system/REPO_BOUNDARY_MAP.md`. Canonical identity card:
`REPO_IDENTITY.md`.

## Source Of Truth

- Repository posture and freeze: `docs/governance/SOURCE_REPO_FREEZE.md`
- Canonical live product: `AudioJones-Dev/FRL-CONTRACTOR-PORTAL`

- Historical/source product scope: `docs/architecture/mvp-definition.md`
- Implementation gate: `docs/architecture/implementation-readiness-gate.md`
- Auth foundation: `docs/architecture/auth-foundation.md`
- Persistence design: `docs/architecture/persistence-design.md`
- Canonical schema planning: `docs/schemas/canonical-data-schema.md`
- State machine: `docs/schemas/operational-state-machine.md`
- Agent registry: `docs/agents/agent-registry.md`
- Repo governance protocols: `docs/system/`

If these documents conflict, stop and report the contradiction before editing.

## Standing Constraints

- Documentation/governance branches may not change app runtime behavior.
- Do not begin or continue runtime feature work in this repository.
- Do not deploy this repository or assign a live application hostname to it.
- Treat Clerk/Vercel plans and execution records as historical source evidence,
  not current deployment authorization.
- No package installs or dependency changes unless the branch objective explicitly authorizes them.
- The Clerk auth shell is retained as historical mock-scaffold code; it is not
  the canonical platform auth path.
- No secrets, credentials, customer PDFs, private rate sheets, or sensitive client files.
- No Firebase packages, config, environment names, or implementation path.
- No live third-party writes or runtime integrations.
- No automated client-facing communication, invoice release, payout release, or safety-sensitive approval.
- Preserve Michael Keegan as MVP final authority for client-facing invoice release.
- Treat mock data as mock data. Do not convert hand-authored fixture IDs into production IDs without a persistence implementation plan.

## Required Work Pattern

1. Check `git status --short --branch`.
2. Read the nearest applicable `AGENTS.md`.
3. Inspect existing docs/code before proposing a new structure.
4. State facts, inferences, assumptions, and open questions separately when making strategy decisions.
5. Keep changes scoped to the stated branch objective.
6. Update relevant documentation after meaningful changes.
7. Run validation appropriate to the change. For repo-wide governance docs, run `npm run typecheck` and `npm run lint` unless the environment blocks them.
8. Report files changed, validation results, and working tree status.

## Approval Gates

Stop for explicit operator approval before:

- Deleting files.
- Overwriting accepted docs or public copy.
- Changing dependencies, package manager files, framework config, or deployment config.
- Adding auth, database, storage, email/SMS, HubSpot, QuickBooks, ResponseOS, PDF, or AI runtime code.
- Creating migrations, buckets, API clients, secrets, environment files, or production deploys.
- Making broad refactors or mass edits.

The operator approval keyword is `proceed`.

## Documentation Update Rule

Meaningful changes must leave documentation current:

- Architecture changes update `docs/architecture/`.
- Schema changes update `docs/schemas/` and, when machine-readable, root `schemas/`.
- Agent behavior changes update `docs/agents/` or `docs/system/`.
- Workflow changes update `docs/workflows/` or `docs/sop/`.
- Runtime mock UI changes should update the closest planning doc when they change product behavior.

## Branch Policy

Use branch names that identify intent:

- `docs/...` for governance, PRDs, architecture, protocols, and planning.
- `feat/...` for app-facing behavior.
- `qa/...` for review, readiness, or validation passes.
- `chore/...` for repo hygiene that does not change product behavior.

Do not merge feature work into a governance-only branch.
Runtime feature branches are frozen unless a later explicit operator decision
supersedes `docs/governance/SOURCE_REPO_FREEZE.md`.

## Validation Commands

Preferred local checks:

```powershell
npm run typecheck
npm run lint
```

Optional governance hook check:

```powershell
python .codex/hooks/repo_policy.py --check
```


