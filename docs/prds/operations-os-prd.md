# FLR Operations OS PRD

Status: Placeholder

## Problem

Field execution, job intake, dispatch, completion documentation, and safety records need a structured operating layer.

## Desired Outcome

Create the product requirements for an Operations OS that turns field activity into structured, reviewable operational records.

## Success Criteria

- Intake, dispatch, completion, and exception states are defined.
- Required fields map to canonical job and work order schemas.
- Human review gates are documented.
- No live dispatch or CRM integration is implemented yet.

## Scope

- Job intake
- Dispatch workflow
- Completion documentation
- Contractor documentation
- Safety checkpoints

## Out of Scope

- Live CRM sync
- SMS or email automation
- Mobile app implementation

## Constraints

- No Firebase.
- No secrets.
- No sensitive customer files.

## Open Questions

- Which job state transitions are mandatory?
- What data blocks job approval?
