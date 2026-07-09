# Florida Ramp & Lift Operational Intelligence Docs

This folder is the documentation-first foundation for the Florida Ramp & Lift Operational Intelligence Platform.

The platform is organized around three product domains:

- FLR Executive OS
- FLR Operations OS
- FLR Financial OS

These domains roll up into one Centralized Control Dashboard.

## Current Status

This repo has a mock/manual Next.js MVP scaffold backed by documentation-first architecture. Firebase, cloud infrastructure, live CRM, live dispatch, billing, email, SMS, storage, database persistence, production deploys, and runtime AI integrations are not implemented in this phase.

## Documentation Map

| Folder | Purpose |
|---|---|
| `DOCUMENTATION_INDEX.md` | Tier 4 layer coverage map for the existing domain-oriented docs tree. |
| `00-STRATEGY/` through `06-REFERENCE/` | Canonical AJ Digital Tier 4 layer entrypoints. These point to source docs; they do not replace the domain folders. |
| `architecture/` | Platform architecture decisions, access model, and implementation direction. |
| `product/` | Product UX, interaction, and screen behavior requirements. |
| `product-roadmaps/` | Product sequencing for each FLR operating domain. |
| `prds/` | Product requirement documents for the domain systems and dashboard. |
| `schemas/` | Human-readable schema planning docs that complement root-level JSON Schemas. |
| `workflows/` | Operational workflow definitions and human review gates. |
| `sop/` | Standard operating procedures. Existing repo convention is singular `sop`. |
| `guardrails/` | Safety, financial, agent, and human-approval constraints. |
| `agents/` | Agent role specifications for future implementation. |
| `system/` | Repo operating protocols, agent-governance rules, and documentation architecture. |
| `governance/` | DoR, DoD, DoS, decision log, risk register, and agent/repo governance artifacts. |
| `quality/` | Security, observability, testing, and failure-mode planning. |
| `qa/` | Readiness reviews and implementation-vs-docs audits. |
| `delivery/` | Release, migration, and changelog planning. |
| `execution/` | Worktree planning and requirements traceability. |
| `reference/` | Glossary, dependency map, and open questions. |
| `scope/` | Existing Phase 1 scope and canonical operational object docs. |
| `automation/` | Existing automation specifications. Specs only; no live integrations. |
| `training/` | Existing crew onboarding and safety training docs. |

## Preservation Rule

Existing Phase 1 docs remain authoritative until explicitly replaced. New files in this folder are planning surfaces unless marked as approved implementation specs.
