# Job Schema

Status: Placeholder

## Purpose

Document product-level requirements for the job data model.

## Existing Reference

- `schemas/job.schema.json`
- `docs/scope/UNIVERSAL_JOB_OBJECT.md`

## Open Questions

- Which job states are required for the Operations OS?
- Which job fields are required before billing review?
- Which transfer statuses should be first-class database fields versus derived from DispatchAssignment history?
- Which roles can approve transfer from partial/incomplete work to a new contractor or team?

## Transfer Fields

When a job is incomplete, return-needed, or in transfer review, the job model should preserve a transfer packet instead of only changing the assignee.

Planned fields:

- `transfer_status`: `transfer_requested`, `transfer_review`, `transfer_approved`, `transferred`, or `partial_complete`.
- `transfer_reason`: why the original contractor/team cannot finish.
- `previous_assignee`: original contractor or crew.
- `transfer_target`: suggested replacement contractor/team, if known.
- `remaining_scope`: exact work still required.
- `transfer_packet_summary`: human-readable summary for dispatcher review.

Transfer fields do not approve invoice readiness, contractor payout, or external dispatch. Those remain separate human-reviewed workflows.
