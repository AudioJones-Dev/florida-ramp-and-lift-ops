# Migration Plan

Status: Git Spec-ready draft
Scope: Migration approach from documentation-first repo to future runtime implementation
Runtime impact: None
Implementation status: Documentation only

## Purpose

This plan defines how FRL specs should migrate into runtime systems without losing source-of-truth discipline.

## Migration Principles

- Migrate one boundary at a time.
- Preserve accepted docs until explicitly superseded.
- Do not convert mock fixture IDs into production IDs.
- Reconcile schema names before creating database tables or API contracts.
- Add rollback plans before migrations.
- Keep GitHub as execution/spec source and Obsidian as business memory/decision source.

## Future Migration Sequence

1. Reconcile canonical product objects with root JSON Schemas.
2. Create implementation branch for app scaffold only.
3. Add manual/mock records and role-aware dashboard shell.
4. Add approved persistence model.
5. Add auth and object-level access control.
6. Add storage only after storage/security policy approval.
7. Add integrations one provider at a time.

## Blocked Migrations

The following are blocked until separately approved:

- Live HubSpot sync.
- Live QuickBooks sync.
- SMS/email sending.
- Production PDF ingestion.
- Runtime AI agents.
- Client portal release.
- Payment or payout rails.

## Migration Evidence

Each migration must record:

- Source doc.
- Objects and states affected.
- Data transformation.
- Rollback.
- Validation.
- Human approval gate.
