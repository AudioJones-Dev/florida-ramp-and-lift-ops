# Open Questions

Status: Git Spec-ready draft
Scope: Unresolved decisions for FRL planning and future implementation
Runtime impact: None
Implementation status: Documentation only

## Purpose

This file tracks unresolved questions so agents do not fill gaps with assumptions.

## Product Questions

| Question | Current posture |
|---|---|
| Should client portal access remain out of MVP? | Yes, per current MVP docs, unless explicitly re-scoped. |
| Should the docs tree physically migrate to numbered Tier 4 folders? | Not yet. Current decision is to map layers without moving accepted docs. |
| Which users besides Michael can approve client-facing invoice release later? | Not decided. Michael remains final MVP authority. |
| Which contractor onboarding fields belong in this ops repo versus the contractor portal repo? | Needs cross-repo reconciliation before implementation. |

## Technical Questions

| Question | Current posture |
|---|---|
| Which auth/database provider should runtime use? | Not approved in this repo. |
| Which storage provider should hold production photos/PDFs? | Not approved. |
| How should root JSON Schemas be reconciled with canonical product objects? | Future schema PR required. |
| What event bus or workflow engine should be used? | Not approved. |
| What observability stack should be used? | Not approved. |

## Integration Questions

| Question | Current posture |
|---|---|
| When should HubSpot sync begin? | After manual/mock FLR workflows exist and boundary is approved. |
| When should QuickBooks sync begin? | After invoice readiness and approval workflows are validated manually. |
| When should SMS/email sends begin? | After communication schema, consent, provider config, and approval gates are accepted. |
| When should runtime AI be enabled? | After cost control, logging, fallback, and human review gates are accepted. |
