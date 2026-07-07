# Dispatch Workflow

Status: Draft

## Purpose

Define how approved jobs are organized into dispatch-ready crew assignments, including transfer review when a job is partial, incomplete, or needs another contractor/team to finish the remaining scope.

## Existing Reference

- `docs/automation/DISPATCH_SUMMARY_SPEC.md`

## Review Gates

- Human review before crew dispatch.
- Human review for route, safety, access, or material exceptions.
- Human review before a partial or incomplete job is transferred to another contractor or team.
- Human review before invoice readiness resumes after transfer completion.

## Transfer Workflow

Use the transfer workflow when a job cannot be completed by the original contractor or crew.

Valid transfer triggers:

- Field work is partial or incomplete.
- Customer/site access blocked completion.
- Materials, equipment, or specialty skill changed.
- Safety or quality issue requires a different team.
- Contractor availability prevents closeout.
- Required documentation cannot be recovered without a return visit.

Required transfer packet:

- Original contractor or crew.
- Transfer reason.
- Completed work summary.
- Remaining scope.
- Required documentation still missing.
- Safety or access notes.
- Payout/invoice hold status.
- Suggested next contractor/team, if known.

Default handling:

1. Contractor or admin marks the assignment `transfer_requested` or the job `transfer_review`.
2. Dispatcher reviews the transfer packet.
3. Dispatcher selects or recommends a continuation contractor/team.
4. Human approver confirms the transfer reason and remaining scope.
5. Original assignment closes as `transferred` or `partial_complete`.
6. Replacement assignment is created only for the remaining scope.
7. Invoice readiness remains blocked until final completion evidence is approved.

The MVP mock UI may show this as local-only state on the job detail, contractor assignment workflow, and job transfer queue. This does not authorize live notification, payment release, or database persistence.

## Open Questions

- Which job states are dispatchable?
- What exceptions require admin review?
- Which transfer reasons require owner-level approval instead of dispatcher approval?
- How should partial contractor payout be reviewed when one job has multiple contractor assignments?
