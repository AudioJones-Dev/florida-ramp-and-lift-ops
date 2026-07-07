# Schema Planning Docs

This folder contains human-readable schema planning docs for the Operational Intelligence Platform.

Root-level `schemas/` contains machine-readable JSON Schemas and remains preserved. Files here should explain product-level schema intent, cross-domain relationships, and dashboard data requirements.

## Planning Docs

- `canonical-data-schema.md` defines the platform-wide domain objects.
- `operational-state-machine.md` defines the canonical operating states, transition events, human gates, dashboard effects, and agent triggers.
- `system-state-machine.md` defines state-driven workflow behavior.
- `role-permission-matrix.md` defines product-level authority boundaries.
- `contractor-reputation-model.md` defines the derived contractor ranking and eligibility model used by the assignment engine.
