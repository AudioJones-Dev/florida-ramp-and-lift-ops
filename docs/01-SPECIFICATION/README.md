# Layer 1 Specification

Status: Git Spec-ready draft
Scope: Navigation layer for product, architecture, workflow, schema, and agent specifications
Runtime impact: None
Implementation status: Documentation only

## Purpose

This folder reconciles the AJ Digital Tier 4 specification layer with the existing FRL domain docs.

The detailed specifications remain in the current domain folders.

## FRL Specification Context

The platform centers on canonical operational objects, role-aware access, object-level permissions, state transitions, event readiness, manual/mock workflows, and human approval gates.

Contractors should report what happened on the job. The platform should compute or prepare downstream billing, payout, and review artifacts only after approved rules and human gates are satisfied.

## Canonical Sources

| Specification need | Source |
|---|---|
| Architecture | `../architecture/` |
| Data model | `../schemas/canonical-data-schema.md` and root `../../schemas/` |
| State model | `../schemas/operational-state-machine.md` |
| Role model | `../schemas/role-permission-matrix.md` |
| Workflows | `../workflows/` |
| SOPs | `../sop/` |
| Agents | `../agents/` and `../guardrails/` |
| Automation specs | `../automation/` and root `../../prompts/` |

## Does Not Authorize

This layer does not authorize runtime persistence, auth, third-party integrations, SMS/email, PDF generation, storage, or AI execution.
