# Component Instructions

This subtree contains shared UI and workflow components.

## Component Rules

- Prefer existing component patterns before creating new primitives.
- Keep components presentational unless a branch explicitly authorizes data or side-effect behavior.
- Do not hide human approval gates behind optimistic UI.
- Do not introduce nested card-heavy layouts that obscure operational scanning.
- Keep labels and statuses tied to canonical mock fields, not inferred from arbitrary prose.

## UI Constraints

- Operational screens should stay dense, readable, and work-focused.
- Use existing `src/components/ui/` primitives where possible.
- Use lucide icons when icons are needed and the dependency already exists.
- Avoid visual treatments that imply production connectivity when the app is still mock/manual.
