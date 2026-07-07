# Layer 2 Quality

Status: Git Spec-ready draft
Scope: Navigation layer for quality, security, testing, observability, and failure-mode docs
Runtime impact: None
Implementation status: Documentation only

## Purpose

This folder reconciles the AJ Digital Tier 4 quality layer with FRL quality planning.

## FRL Quality Context

Quality for this repo means preserving safety, financial separation, approval gates, source-of-truth discipline, and manual fallback before runtime automation.

The highest-risk quality failures are premature integrations, leaked contractor/client financial data, missing human approval, secrets in Git, and fabricated operational state.

## Canonical Sources

| Quality need | Source |
|---|---|
| Security | `../quality/SECURITY.md` |
| Observability | `../quality/OBSERVABILITY.md` |
| Test strategy | `../quality/TEST_STRATEGY.md` |
| Failure modes | `../quality/FAILURE_MODES.md` |
| Point-in-time QA reviews | `../qa/` |
| Guardrails | `../guardrails/` |

## Does Not Authorize

This layer does not authorize production monitoring tools, secrets, providers, runtime telemetry, or external writes.
