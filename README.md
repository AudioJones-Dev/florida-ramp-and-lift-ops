# Florida Ramp & Lift Operations Intelligence System

Local-first, schema-driven operational intelligence for Florida Ramp & Lift field operations.

## Current focus

- Ingest WillScot/Mobile Mini service report PDFs
- Deterministically extract structured job data
- Normalize data into a canonical universal job object
- Support dispatch, safety, billing, and operational memory workflows

## Foundational documents

- `PROJECT_SOURCE.md`
- `docs/scope/WILSCOT_AUTOMATION_SCOPE.md`
- `docs/scope/UNIVERSAL_JOB_OBJECT.md`
- `docs/scope/DATA_DICTIONARY.md`
- `schemas/job.schema.json`

## Repository structure

- `docs/` operational scope, SOPs, automation, and training references
- `schemas/` canonical structured definitions
- `prompts/` extraction, dispatch, billing, and safety prompt libraries
- `samples/wilscot/` source document samples for parser iteration

## Principles

1. Documentation-first
2. Schema-first
3. Deterministic parsing where possible
4. Approval-gated destructive actions
5. Safety-forward workflows
6. Auditable operational records
