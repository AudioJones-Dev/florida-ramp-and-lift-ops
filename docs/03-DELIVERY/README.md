# Layer 3 Delivery

Status: Git Spec-ready draft
Scope: Navigation layer for delivery, release, migration, and roadmap docs
Runtime impact: None
Implementation status: Documentation only

## Purpose

This folder reconciles the AJ Digital Tier 4 delivery layer with FRL delivery planning.

## FRL Delivery Context

Delivery must proceed from documentation foundation to manual/mock MVP, then to controlled persistence, then to one approved integration at a time.

No delivery step should skip the implementation readiness gate, security review, role/access review, or human approval gates.

## Canonical Sources

| Delivery need | Source |
|---|---|
| Release plan | `../delivery/RELEASE_PLAN.md` |
| Live app gap-closure plan | `../delivery/LIVE_APP_GAP_CLOSURE_PLAN.md` |
| Phase 2 closure checklist | `../delivery/PHASE_2_CLOSURE_CHECKLIST.md` |
| Phase B internal pilot checklist | `../delivery/PHASE_B_INTERNAL_PILOT_CHECKLIST.md` |
| Migration plan | `../delivery/MIGRATION_PLAN.md` |
| Changelog | `../delivery/CHANGELOG.md` |
| Product roadmaps | `../product-roadmaps/` |
| Implementation readiness | `../architecture/implementation-readiness-gate.md` |

## Does Not Authorize

This layer does not authorize deploys, environment changes, migrations, provider setup, or production releases.
