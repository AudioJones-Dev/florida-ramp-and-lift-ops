# Source Instructions

The `src/` tree contains the mock/manual Next.js MVP scaffold. It is not a live production runtime.

## Allowed Without New Approval

- Small UI or copy fixes that preserve existing mock behavior.
- Type-only corrections that keep the same product behavior.
- Refactors that stay inside the same component/module and do not introduce new runtime dependencies.

## Requires Explicit Approval

- Auth, database, storage, API routes, email/SMS, HubSpot, QuickBooks, ResponseOS, PDF generation, runtime AI, or production automation.
- New package imports that require dependency changes.
- Replacing mock data with live data access.
- Changing role authority, invoice approval authority, or contractor visibility rules.
- Broad app-shell, routing, or state-management refactors.

## Runtime Boundary

Use mock/manual records from `src/lib/` and typed contracts from `src/types/` unless a later implementation branch authorizes persistence. Dashboard state must come from explicit fields, not invented display text.

## Documentation Coupling

If source behavior changes a workflow, update the relevant docs in `docs/architecture/`, `docs/workflows/`, `docs/schemas/`, or `docs/agents/`.
