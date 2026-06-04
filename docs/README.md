# Florida Ramp & Lift Operational Intelligence Docs

This folder is the documentation-first foundation for the Florida Ramp & Lift Operational Intelligence Platform.

The platform is organized around three product domains:

- FLR Executive OS
- FLR Operations OS
- FLR Financial OS

These domains roll up into one Centralized Control Dashboard.

## Current Status

This repo remains documentation-first. No app framework, Firebase, cloud infrastructure, live CRM, dispatch, billing, email, SMS, or AI integration is implemented in this phase.

## Documentation Map

| Folder | Purpose |
|---|---|
| `product-roadmaps/` | Product sequencing for each FLR operating domain. |
| `prds/` | Product requirement documents for the domain systems and dashboard. |
| `schemas/` | Human-readable schema planning docs that complement root-level JSON Schemas. |
| `workflows/` | Operational workflow definitions and human review gates. |
| `sop/` | Standard operating procedures. Existing repo convention is singular `sop`. |
| `guardrails/` | Safety, financial, agent, and human-approval constraints. |
| `agents/` | Agent role specifications for future implementation. |
| `scope/` | Existing Phase 1 scope and canonical operational object docs. |
| `automation/` | Existing automation specifications. Specs only; no live integrations. |
| `training/` | Existing crew onboarding and safety training docs. |

## Preservation Rule

Existing Phase 1 docs remain authoritative until explicitly replaced. New files in this folder are placeholders or planning surfaces unless marked as approved implementation specs.
