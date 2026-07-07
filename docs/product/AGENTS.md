# Product Docs Instructions

## Purpose

`docs/product/` governs product-level UX, interaction, and screen behavior requirements that sit below PRDs and architecture docs but above implementation tasks.

## Ownership

- Owns product-facing requirements for portals, dashboards, role-specific surfaces, and user workflows.
- Does not own runtime code, schemas, integrations, deployment, or provider configuration.

## Local Contracts

- Product docs are planning and specification artifacts unless a future branch explicitly marks them as accepted implementation specs.
- Requirements must preserve the repo's documentation-first posture and human approval gates.
- Product requirements must cross-link architecture, workflow, schema, guardrail, and PRD sources when they affect those surfaces.
- Product docs may describe future behavior, but must state that they do not authorize live persistence, auth, storage, email/SMS, PDF generation, CRM/accounting writes, runtime AI, or payment/payout execution.

## Work Guidance

- Keep requirements screen-level, role-aware, and acceptance-testable.
- Separate contractor, admin, client, platform/admin, and AI-assisted surfaces when their permissions or risks differ.
- Use factual risk language and avoid conversion patterns that reduce user agency.

## Verification

- For docs-only changes, run `npm run typecheck` and `npm run lint` unless the environment blocks them.
- Re-check this DOX chain after meaningful edits and update affected indexes.

## Child DOX Index

- `ux/AGENTS.md` governs product UX psychology, interaction rules, role-specific UX requirements, and dark-pattern guardrails under `docs/product/ux/`.
