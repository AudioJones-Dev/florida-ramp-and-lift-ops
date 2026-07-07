# Observability

Status: Git Spec-ready draft
Scope: Observability requirements for future FRL runtime implementation
Runtime impact: None
Implementation status: Documentation only

## Purpose

This document defines what the future platform must make visible once implementation begins.

## Current Scope

There is no live runtime observability in this documentation-first phase. Observability requirements are planning constraints for future implementation.

## Required Future Signals

| Area | Signal |
|---|---|
| Job lifecycle | Status changes, blockers, assignments, approvals, exceptions. |
| Invoice readiness | Draft totals, review status, holds, approval records, release status. |
| Contractor payout | Review state, release state, adjustment reasons, approval history. |
| Dispatch | Schedule changes, crew assignment, readiness, send/hold state. |
| Safety/compliance | PPE status, missing documentation, incident flags, exceptions. |
| Integrations | Sync status, retry state, skipped sends, provider errors. |
| Agents | Prompt/version, input scope, output, confidence/flags, human review result. |
| Security | Sensitive record access, role changes, overrides, failed auth attempts. |

## Dashboard Doctrine

Dashboards must read canonical object state and events. They must not invent state or hide missing data.

## Alert Rules

Alerts should be generated for:

- Missing documentation before invoice readiness.
- Safety exception without acknowledgement.
- Job completion submitted without required evidence.
- Invoice ready but missing required approval.
- Contractor payout anomaly or split mismatch.
- Integration retry exhaustion after live integrations are approved.

## Does Not Authorize

This document does not authorize adding telemetry providers, production logs, monitoring SaaS, runtime agents, or third-party writes.
