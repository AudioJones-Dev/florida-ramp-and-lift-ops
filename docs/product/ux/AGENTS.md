# Product UX Docs Instructions

## Purpose

`docs/product/ux/` governs FRL platform UX requirements, interaction rules, behavioral psychology guardrails, and role-specific screen acceptance criteria.

## Ownership

- Owns UX behavior requirements for contractor, admin, client, platform/admin, billing, approval, onboarding, and AI-assisted surfaces.
- Does not own visual design assets, component implementation, provider setup, database schemas, live communications, or production automation.

## Local Contracts

- UX requirements must reduce cognitive load without hiding risk, permissions, money-impacting fields, approval state, or auditability.
- Smart defaults affecting money, compliance, permissions, schedules, customer communication, or operational records must be visible, editable by authorized roles, explainable, and auditable.
- Progress indicators must reflect real earned, inferred, or prerequisite progress. Fake progress is prohibited.
- Cost-of-inaction language must be factual and operational. Confirm-shaming, fabricated urgency, and manipulative loss framing are prohibited.
- AI-assisted UX must label AI-generated content, expose source context where useful, require human review for high-impact actions, and preserve audit trails.

## Work Guidance

- Keep contractor workflows mobile-first and field-friendly.
- Keep admin workflows queue-oriented, reviewable, and audit-friendly.
- Keep client-facing flows useful before commitment and clear about next steps.
- Do not use UX wording to authorize integrations, sends, storage, invoices, payouts, approvals, or AI execution before the relevant implementation gate is accepted.

## Verification

- For docs-only changes, run `npm run typecheck` and `npm run lint` unless blocked.
- Confirm links and DOX indexes after edits.

## Child DOX Index

- No child AGENTS.md files currently exist under `docs/product/ux/`.
