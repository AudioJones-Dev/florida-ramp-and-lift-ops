# WILSCOT AUTOMATION SCOPE

## Purpose

Define deterministic ingestion and extraction scope for WillScot/Mobile Mini service reports.

## Current workflow priority

WillScot is the highest-priority operational workflow.

## Known recurring document patterns

- modular returns
- complex knockdowns
- ADA/IBC ramps
- aluminum decks
- dismantle and return workflows
- plans and liability items
- modular asset tracking

## Automation scope (phase 1)

1. Intake PDF source document.
2. Extract document metadata and identifiers.
3. Parse line items and quantities.
4. Capture dispatch-critical and safety-critical requirements.
5. Normalize into the canonical universal job object.
6. Store extraction output with audit trail.

## Guardrails

- Prefer deterministic parsing before heuristic fallback.
- Flag low-confidence fields for review.
- Require approval-gated destructive actions.
- Preserve source traceability for billing and audit purposes.
