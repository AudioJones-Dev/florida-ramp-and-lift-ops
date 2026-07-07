# Job Marketplace And Assignment Engine

Status: Git Spec-ready draft
Scope: Controlled internal job pool, claim/bid, smart-offer, and assignment workflow for the FRL platform
Runtime impact: None
Implementation status: Documentation only

## Purpose

This workflow defines how approved jobs move from admin review into a controlled contractor pool, how eligible contractors are notified, how claim and bid responses are handled, and how final assignment is approved.

It extends the current dispatch model. It does not replace dispatch, billing, or the contractor portal.

## Current Scope

The FRL platform already has the conceptual pieces for this workflow:

- Admin review before work becomes actionable.
- Contractor portal access after onboarding gates are complete.
- Dispatch readiness and assignment state modeling.
- Contractor performance, documentation, and compliance tracking.
- Human approval gates for safety-sensitive and financial decisions.

This spec formalizes those concepts into a controlled marketplace-style assignment flow.

## Source-Of-Truth Boundaries

| Area | Source of truth |
|---|---|
| Job lifecycle | `docs/schemas/operational-state-machine.md` |
| Job object model | `docs/schemas/canonical-data-schema.md` |
| Dispatch and route review | `docs/workflows/dispatch-workflow.md`, `docs/automation/DISPATCH_SUMMARY_SPEC.md` |
| Contractor onboarding and access | `docs/architecture/saas-portal-access-model.md`, `docs/schemas/role-permission-matrix.md` |
| Contractor compliance and certification | `docs/schemas/canonical-data-schema.md`, `docs/sop/SAFETY_REQUIREMENTS_SOP.md`, `docs/sop/contractor-documentation-sop.md` |
| Performance and history signals | job history, completion records, documentation review results, safety review outcomes, approval records |
| Human approval rules | `docs/prds/central-control-dashboard-prd.md`, `docs/architecture/implementation-readiness-gate.md` |

## In Scope

- Admin reviews and approves a job before it enters the contractor pool.
- Approved jobs are published only to eligible contractors for the current tenant.
- Contractors can respond through a controlled claim flow or bid flow.
- Job types can use different assignment modes.
- Smart-offer ranking can prioritize eligible contractors by distance, performance, certification, availability, and response history.
- VPL and other high-complexity work can require invite-only bidding plus admin award approval.
- Job assignment updates contractor reputation and future eligibility signals.
- Admin can override assignment recommendations with a reason.
- Every decision is auditable.
- Transfer review for partial or incomplete work can reuse eligibility and ranking signals, but must preserve original assignment context and remaining scope.

## Out Of Scope

- Public open marketplace access.
- Consumer-style first-come public bidding.
- Automatic final assignment with no human review.
- Cross-tenant job visibility.
- Live dispatch notifications before approval of the messaging system.
- Payment collection or contractor payout execution inside the assignment flow.
- Geographic optimization that overrides safety, certification, or human review.
- Silent reassignment that hides the original contractor, partial work, missing documentation, or payout hold context.

## Human Approval Gates

- Admin approval before a job enters the pool.
- Admin approval before high-risk job invitation or award.
- Human review for exceptions where the smart-offer engine has insufficient confidence.
- Human review for qualification bypasses, certification exceptions, or safety overrides.
- Human review before any external dispatch send.

## Assignment Modes

| Mode | When it applies | Default behavior |
|---|---|---|
| First qualified acceptance | Standard ramp installs, simple repairs, routine field work | Notify eligible contractors; first acceptance wins if within admin-defined guardrails. |
| Invite-only bid | Large VPL installs, complex commercial jobs, high-value or high-risk work | Notify selected contractors; collect bids; admin awards the job. |
| Admin direct assign | Emergency work, municipal/government jobs, special client-controlled work | Admin assigns directly with documented reason. |
| Auto-ranked offer | Time-sensitive jobs that need speed but still require qualification | Rank eligible contractors by score, distance, and fit; notify top candidates in order. |

## Smart Offer Logic

The smart-offer engine ranks candidates using weighted signals.

Suggested ranking inputs:

- Distance or territory fit.
- Performance history.
- Completion reliability.
- Documentation completeness.
- Safety/compliance history.
- Response speed.
- Certification match.
- Current workload.
- VPL or specialty certification.
- Current insurance and workers' comp status.

### Hard Gates Versus Soft Signals

- Hard gates block eligibility entirely, such as missing onboarding, missing required certification, inactive insurance, or unresolved safety restrictions.
- Soft signals influence ordering, not eligibility, such as speed, historical quality, or recent workload.

## Admin UX Requirements

The admin console should support:

- A job approval queue.
- A job transfer queue for partial, incomplete, or return-needed work.
- A job pool view with eligibility status.
- A contractor ranking panel with reasons.
- A claim vs bid decision view.
- A high-risk job award panel.
- A contractor scorecard panel.
- A certification and compliance panel.
- An audit trail showing who approved, invited, claimed, bid, awarded, rejected, or overrode.

The UX should make the following obvious:

- Why a contractor is eligible or blocked.
- Why a job is in the pool or not.
- Whether the job is first-accept, bid, or admin-assign.
- Whether a recommendation is soft guidance or a hard rule.
- Whether a transfer is for a full reassignment or only the remaining scope.

## Transfer And Continuation Work

Transfer work is a controlled continuation path, not a new public marketplace listing.

When a job is incomplete, return-needed, or in transfer review:

- The original assignment stays visible.
- Completed work and remaining scope stay separated.
- Missing documentation and safety notes stay attached to the transfer packet.
- Invoice readiness and contractor payout remain blocked or held until human review.
- The replacement contractor receives only the approved remaining scope.

The assignment engine may recommend eligible continuation contractors using the same hard gates and soft ranking signals as normal assignment. Human review is still required before release.

## Mock Demo Surface

The `/dispatch` route and the `demo-scenarios` hub may expose a local-only client walkthrough for this workflow.

The mock demo should show:

- Ranked contractor suggestions from local performance and service-area signals.
- Route-fit explanations in friendly language.
- Invoice batch and stack suggestions based on travel, loading, offloading, evaluation, site communication, staging, installing, and grading.
- Local approval, request-change, and hold states for client review.

This surface is for walk-through and approval only. It does not authorize live dispatch, notifications, payments, or persistence.

## Contractor UX Requirements

Contractors should see:

- Only jobs they are eligible to see.
- Clear status for open, invited, claimed, pending review, assigned, or unavailable jobs.
- A simple response path for accept, decline, or bid where that mode is enabled.
- Eligibility reasons when they cannot see or act on a job.

Contractors should not see:

- Other contractors' private performance records.
- Tenant-wide financial data.
- Any job outside their permitted scope.

## Performance And Eligibility

Performance is a ranking and eligibility input, not a secret score that silently replaces human review.

Suggested performance inputs:

- Completion ratio.
- On-time percentage.
- Documentation completeness.
- Safety history.
- Customer feedback where approved.
- Response speed.
- Cancellation or no-show history.
- Specialty certification status.

The platform may use these signals to:

- Rank contractors for notification.
- Narrow the invite pool for high-risk jobs.
- Recommend who should be invited first.
- Flag contractor onboarding gaps.

The platform may not:

- Auto-ban a contractor purely from a score without a documented rule.
- Use performance scoring as a hidden approval bypass.
- Use performance data across tenants without explicit design approval.

## VPL And Special Jobs

Large VPL or complex commercial jobs should default to a tighter workflow:

- Invite a smaller qualified set.
- Prefer bid or explicit acceptance with admin review.
- Require certification and insurance validation.
- Keep final award under admin control.

## Risks

- A marketplace model can become too open if the approval gate is weak.
- Rank-based assignment can leak into hidden automation if reasons are not shown.
- Performance scoring can become punitive if it is not separated into hard gates and soft signals.
- A public bid style can slow down routine work if used everywhere.

## Acceptance Criteria

- An approved job can enter a controlled contractor pool.
- Eligible contractors can be notified using claim, bid, or ranked-offer modes.
- A partial or incomplete job can enter transfer review with remaining-scope context.
- High-risk jobs can require invite-only bidding and admin award.
- Contractor performance influences ranking and eligibility.
- Hard compliance gates block ineligible contractors.
- Admin can override any recommendation with audit notes.
- The workflow remains tenant-scoped and role-gated.

## Implementation Sequence

1. Reconcile the workflow with the existing dispatch workflow and state machine.
2. Add the contractor reputation model as a derived read model.
3. Define job-type assignment modes in the product requirements.
4. Add admin console views for job pool, scorecard, and award decisions.
5. Add contractor-facing claim/bid surfaces only after role access is approved.
6. Add live notifications only after messaging policy and provider setup are approved.

## Does Not Authorize

This document does not authorize live dispatch, SMS/email sending, public marketplace access, payments, or automatic final assignment.
