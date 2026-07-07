# FLR Financial OS PRD

Status: Placeholder

## Problem

Invoice review, contractor billing, payout logic, and client-facing financial records require consistent controls and visibility.

## Desired Outcome

Create requirements for a Financial OS that supports invoice preparation, contractor billing, payout review, and audit-ready financial reporting.

## Success Criteria

- Contractor-visible, client-visible, and internal-only financial data are separated.
- Approval gates are documented.
- Invoice and payout schema requirements are identified.
- No payment rails or accounting writeback are implemented.

## Scope

- Invoice review
- Contractor billing
- Payout summaries
- Financial guardrails
- Dashboard financial metrics

## Out of Scope

- Payment processing
- Automated invoice sending
- Accounting platform integration

## Constraints

- No final financial action without human approval.
- No secrets.
- No Firebase.

## Open Questions

- Which financial events require audit logging?
- Which fields should never be shown to contractors or clients?
