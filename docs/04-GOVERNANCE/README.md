# Layer 4 Governance

Status: Git Spec-ready draft
Scope: Navigation layer for governance, decisions, risks, and stabilization docs
Runtime impact: None
Implementation status: Documentation only

## Purpose

This folder reconciles the AJ Digital Tier 4 governance layer with FRL repo governance.

## FRL Governance Context

Governance protects the repo from premature implementation, unsafe production automation, Firebase drift, secret exposure, schema conflicts, and human approval bypass.

The repo remains documentation-first until the implementation readiness gate is satisfied.

## Canonical Sources

| Governance need | Source |
|---|---|
| Agent/repo contract | `../../AGENTS.md` and `../AGENTS.md` |
| Documentation architecture | `../system/DOCUMENTATION_ARCHITECTURE.md` |
| Definition of Ready | `../governance/DEFINITION_OF_READY.md` |
| Definition of Done | `../governance/DEFINITION_OF_DONE.md` |
| Definition of Stable | `../governance/DEFINITION_OF_STABLE.md` |
| Decision log | `../governance/DECISION_LOG.md` |
| Risk register | `../governance/RISK_REGISTER.md` |
| Hooks protocol | `../governance/CODEX_HOOKS_PROTOCOL.md` |

## Does Not Authorize

This layer does not authorize changing accepted governance, deleting files, merging, deploying, or bypassing approval gates.
