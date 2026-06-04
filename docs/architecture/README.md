# Architecture Docs

This folder contains platform architecture decisions for the Florida Ramp & Lift Operational Intelligence Platform.

These documents are planning-level specifications. They do not implement app code, integrations, authentication, storage, deployments, or third-party services.

## Current Docs

- `ai-stack-and-cost-control.md` defines the AI, automation, communications, model routing, budget, and vendor-risk policy.
- `event-driven-architecture.md` defines how state transitions produce events consumed by dashboards, agents, alerts, approvals, audit logs, portals, and future automations.
- `hubspot-crm-integration-model.md` defines HubSpot as the CRM/intake layer while preserving FLR as operational source of truth and QuickBooks as accounting ledger.
- `saas-portal-access-model.md` defines the one-app portal architecture, stakeholder access model, recommended stack, MVP build order, and role-based access doctrine.
