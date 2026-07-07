# Contractor Reputation Model

Status: Git Spec-ready draft
Scope: Derived contractor ranking and eligibility model for the FRL assignment engine
Runtime impact: None
Implementation status: Documentation only

## Purpose

This document defines the planned reputation model used to rank contractors, filter eligibility, and explain assignment recommendations.

The reputation model is a derived read model. It is not the only source of truth for contractor access, and it does not replace human review.

## Current Scope

The FRL platform already tracks or plans to track:

- Contractor onboarding status.
- Certifications and compliance records.
- Job assignment history.
- Completion evidence.
- Safety outcomes.
- Documentation completeness.
- Approval history.
- Rejected or incomplete work.

This model combines those signals into a ranking and eligibility layer for the job marketplace workflow.

## Source-Of-Truth Boundaries

| Signal type | Source of truth |
|---|---|
| Identity and role | `docs/schemas/canonical-data-schema.md`, `docs/schemas/role-permission-matrix.md` |
| Contractor onboarding | contractor portal onboarding docs and future profile records |
| Certifications and insurance | contractor compliance and documentation records |
| Assignment history | job and dispatch assignment records |
| Completion performance | job closeout and documentation review outcomes |
| Safety history | safety records, exceptions, and approvals |
| Customer feedback | approved feedback records only |

## In Scope

- Tenant-scoped contractor ranking.
- Job-type-specific eligibility checks.
- Hard compliance gates.
- Soft ranking signals.
- Human-readable reasons for rank or block status.
- Performance trends that update after completion and review.

## Out Of Scope

- Public contractor ratings.
- Cross-tenant reputation sharing.
- Social-style reviews.
- Hidden auto-ban decisions.
- Reputation data used to replace certifications or safety gates.
- Any field that would expose private contractor or client information to other contractors.

## Proposed Model Inputs

| Input | Type | Notes |
|---|---|---|
| Completion ratio | Derived metric | Completed jobs divided by accepted or assigned jobs. |
| On-time percentage | Derived metric | Jobs completed within expected timing window. |
| Documentation completeness | Derived metric | Percent of jobs closed with required evidence. |
| Safety history | Derived metric | Weighted signal from safety exceptions and unresolved incidents. |
| Response time | Derived metric | Time from notification to accept/decline response. |
| Cancellation/no-show rate | Derived metric | Negative signal for reliability. |
| Certification match | Hard gate | Required certs for a job type or client rule. |
| Insurance current | Hard gate | Must be current where required. |
| Workers' comp current | Hard gate | Must be current where required. |
| Workload state | Derived metric | Current capacity or overload risk. |
| Territory fit | Derived metric | Job-to-contractor geography or service area fit. |
| Specialty fit | Derived metric | VPL, lift, repair, or other specialty match. |

## Proposed Outputs

| Output | Meaning |
|---|---|
| Eligibility status | Whether the contractor can see or act on a job type. |
| Ranking score | Relative ordering for notification or invite sequence. |
| Reason codes | Human-readable explanation for ranking or blocking. |
| Risk flags | Special conditions that require admin review. |
| Assignment recommendation | Suggested contractor list for the job pool or invite set. |

## Hard Gates Versus Soft Signals

| Category | Effect |
|---|---|
| Hard gate | Blocks visibility or assignment eligibility until resolved or overridden by admin. |
| Soft signal | Changes ordering or recommendation strength but does not block eligibility by itself. |

## Proposed State

| State | Meaning |
|---|---|
| eligible | Contractor can be considered for notifications or assignment. |
| invited | Contractor is in the current job pool or invite set. |
| responded | Contractor accepted, declined, or bid. |
| assigned | Contractor won or received the job. |
| paused | Contractor is temporarily excluded from rank output pending review. |
| blocked | Contractor cannot be considered until a hard gate is resolved. |

## Human Approval Gates

- Admin can override a recommendation.
- Admin can bypass a soft signal with a documented reason.
- Admin can resolve or dismiss a blocked state only when the underlying requirement is satisfied.
- Any change to scoring weights should be reviewed before it affects future assignment ranking.

## Risks

- A derived score can look more authoritative than it is.
- Hidden ranking can create trust issues if reason codes are not exposed.
- Over-weighting performance can punish newer contractors unfairly.
- Under-weighting compliance can create safety or legal risk.

## Acceptance Criteria

- The model can explain why a contractor is eligible, ranked, or blocked.
- Hard gates remain separate from soft ranking signals.
- The model is tenant-scoped.
- The model can be used by the assignment engine without exposing private details to unauthorized users.
- Admin can review and override the model with audit notes.

## Implementation Sequence

1. Derive the reputation model from existing job, compliance, and approval records.
2. Attach reason codes to all rank and block outcomes.
3. Use the model in the job marketplace workflow as a read-only input.
4. Add admin controls for review and weight tuning only after human approval is accepted.

## Does Not Authorize

This document does not authorize public ratings, punitive automation, hidden black-box decisions, or cross-tenant reputation sharing.
