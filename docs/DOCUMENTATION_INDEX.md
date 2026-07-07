# Documentation Index

Status: Git Spec-ready draft
Scope: Tier 4 documentation coverage map for the Florida Ramp & Lift Operational Intelligence Platform
Runtime impact: None
Implementation status: Documentation only

## Purpose

This index maps the existing domain-oriented docs tree to the AJ Digital Tier 4 documentation layers without moving accepted Phase 1 material into numbered folders.

The repo remains documentation-first. This index does not authorize app scaffolding, live integrations, secrets, customer file storage, SMS/email sending, HubSpot sync, QuickBooks sync, PDF generation, or runtime AI.

## Reconciliation Model

The repo now exposes the canonical layer order through navigation folders:

| Canonical layer folder | Role |
|---|---|
| `00-STRATEGY/` | Strategy entrypoint and source map. |
| `01-SPECIFICATION/` | Specification entrypoint and source map. |
| `02-QUALITY/` | Quality entrypoint and source map. |
| `03-DELIVERY/` | Delivery entrypoint and source map. |
| `04-GOVERNANCE/` | Governance entrypoint and source map. |
| `05-EXECUTION/` | Execution entrypoint and source map. |
| `06-REFERENCE/` | Reference entrypoint and source map. |

These folders are not duplicate sources of truth. They reconcile the AJ Digital OS layer model with the existing FRL domain folders. Detailed content remains in the mapped source docs below.

## Layer 0 Strategy

Defines why the project exists, who it serves, and what success means.

| Expected artifact | Current source |
|---|---|
| Layer entrypoint | `docs/00-STRATEGY/README.md` |
| Vision | `PROJECT_SOURCE.md`, `docs/architecture/mvp-definition.md` |
| PRD | `docs/prds/central-control-dashboard-prd.md`, domain PRDs in `docs/prds/` |
| Business case | `PROJECT_SOURCE.md` |
| Success metrics | `docs/prds/central-control-dashboard-prd.md`, `docs/architecture/mvp-definition.md` |
| Stakeholders | `PROJECT_SOURCE.md`, `docs/architecture/mvp-definition.md` |
| Assumptions | `PROJECT_SOURCE.md`, `docs/reference/OPEN_QUESTIONS.md` |

## Layer 1 Specification

Defines what will be built.

| Expected artifact | Current source |
|---|---|
| Layer entrypoint | `docs/01-SPECIFICATION/README.md` |
| Architecture | `docs/architecture/` |
| Data model | `docs/schemas/canonical-data-schema.md`, root `schemas/` |
| API/data contracts | `docs/automation/`, `prompts/`, root `schemas/` |
| Workflows | `docs/workflows/`, `docs/sop/`, `docs/workflows/job-marketplace-and-assignment-engine.md` |
| Agents | `docs/agents/`, `docs/guardrails/` |
| Business rules | `PROJECT_SOURCE.md`, `docs/schemas/operational-state-machine.md`, `docs/schemas/role-permission-matrix.md`, `docs/schemas/contractor-reputation-model.md` |
| Scoring/calibration | Not a first-class MVP requirement. Add only if future prioritization or risk scoring is approved. |
| Knowledge model | `docs/schemas/canonical-data-schema.md`, `docs/scope/UNIVERSAL_JOB_OBJECT.md` |

## Layer 2 Quality

Defines how the project is tested, secured, monitored, and stabilized.

| Expected artifact | Current source |
|---|---|
| Layer entrypoint | `docs/02-QUALITY/README.md` |
| Security | `docs/quality/SECURITY.md`, `docs/guardrails/` |
| Observability | `docs/quality/OBSERVABILITY.md` |
| Test strategy | `docs/quality/TEST_STRATEGY.md`, `docs/qa/` |
| Acceptance test plan | `docs/architecture/implementation-readiness-gate.md`, `docs/quality/TEST_STRATEGY.md` |
| Performance | Future implementation artifact; no runtime performance target is accepted yet. |
| Failure modes | `docs/quality/FAILURE_MODES.md` |
| Runbooks | `docs/sop/`, future `docs/quality/RUNBOOKS.md` if runtime operations begin. |

## Layer 3 Delivery

Defines how the project ships, evolves, and migrates.

| Expected artifact | Current source |
|---|---|
| Layer entrypoint | `docs/03-DELIVERY/README.md` |
| Deployment | `docs/delivery/RELEASE_PLAN.md`, `docs/architecture/implementation-readiness-gate.md` |
| Roadmap | `docs/product-roadmaps/` |
| Changelog | `docs/delivery/CHANGELOG.md` |
| Release plan | `docs/delivery/RELEASE_PLAN.md` |
| Migration plan | `docs/delivery/MIGRATION_PLAN.md` |

## Layer 4 Governance

Defines the rules for starting, completing, reviewing, and stabilizing work.

| Expected artifact | Current source |
|---|---|
| Layer entrypoint | `docs/04-GOVERNANCE/README.md` |
| Project constitution | `AGENTS.md`, `docs/AGENTS.md`, `docs/system/` |
| Definition of Ready | `docs/governance/DEFINITION_OF_READY.md` |
| Definition of Done | `docs/governance/DEFINITION_OF_DONE.md` |
| Definition of Stable | `docs/governance/DEFINITION_OF_STABLE.md` |
| ADRs | `docs/governance/DECISION_LOG.md`; create `docs/governance/adr/` when individual ADRs are needed. |
| Decision log | `docs/governance/DECISION_LOG.md` |
| Risk register | `docs/governance/RISK_REGISTER.md` |

## Layer 5 Execution

Converts specs into buildable tasks for Codex, Claude, or other agents.

| Expected artifact | Current source |
|---|---|
| Layer entrypoint | `docs/05-EXECUTION/README.md` |
| Codex build plan | `docs/architecture/implementation-readiness-gate.md`, future branch-specific plans |
| Claude build plan | Future branch-specific plan; Claude should remain docs/control-room oriented unless explicitly redirected. |
| Task breakdown | `docs/execution/REQUIREMENTS_TRACEABILITY_MATRIX.md` |
| Implementation sequence | `docs/architecture/implementation-readiness-gate.md`, `docs/execution/WORKTREE_PLAN.md` |
| Dependency graph | `docs/reference/DEPENDENCY_MAP.md` |
| Worktree plan | `docs/execution/WORKTREE_PLAN.md` |
| Traceability matrix | `docs/execution/REQUIREMENTS_TRACEABILITY_MATRIX.md` |

## Layer 6 Reference

Stores shared project knowledge, definitions, dependencies, and unresolved questions.

| Expected artifact | Current source |
|---|---|
| Layer entrypoint | `docs/06-REFERENCE/README.md` |
| Glossary | `docs/reference/GLOSSARY.md` |
| Dependency map | `docs/reference/DEPENDENCY_MAP.md` |
| Open questions | `docs/reference/OPEN_QUESTIONS.md` |
| Coding standards | `AGENTS.md`, `docs/AGENTS.md`, future implementation branch standards |
| Documentation index | This file |

## Maintenance Rule

When a new durable doc is added, update this index and the nearest README or AGENTS file if the navigation or local contract changes.
