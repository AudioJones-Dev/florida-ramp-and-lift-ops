# Architecture Docs

This folder contains platform architecture decisions for the Florida Ramp & Lift Operational Intelligence Platform.

These documents are planning-level specifications unless explicitly marked as an implementation note. `auth-foundation.md` records the approved Clerk auth scaffold; it does not authorize database, storage, deployment, or third-party workflow integrations.

## Current Docs

- `auth-foundation.md` records the approved Clerk user-auth scaffold, current runtime boundary, required env keys, and remaining setup gates.
- `ai-stack-and-cost-control.md` defines the AI, automation, communications, model routing, budget, and vendor-risk policy.
- `event-driven-architecture.md` defines how state transitions produce events consumed by dashboards, agents, alerts, approvals, audit logs, portals, and future automations.
- `hubspot-crm-integration-model.md` defines HubSpot as the CRM/intake layer while preserving FLR as operational source of truth and QuickBooks as accounting ledger.
- `implementation-readiness-gate.md` defines the required checkpoint before moving from docs/spec-first architecture into app scaffolding or implementation.
- `mvp-definition.md` defines the exact MVP scope, in/out boundaries, portals, workflows, approval queues, and exclusions before app scaffolding begins.
- `saas-portal-access-model.md` defines the one-app portal architecture, stakeholder access model, recommended stack, MVP build order, and role-based access doctrine.
- `web-and-mobile-strategy.md` defines responsive web as the MVP delivery model, contractor mobile-first UX requirements, and the future native mobile boundary.
- `worksie-integration-strategy.md` defines Worksie-style capabilities as embedded FLR operational modules for MVP, not a standalone OS.
