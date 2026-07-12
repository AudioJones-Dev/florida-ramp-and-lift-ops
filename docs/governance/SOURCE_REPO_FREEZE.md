# Source Repository Freeze

Status: Accepted by operator 2026-07-12
Scope: Repository purpose, runtime authority, deployment posture, and source-material reconciliation
Runtime impact: None
Implementation status: Documentation and governance only

## Purpose

Prevent `AudioJones-Dev/florida-ramp-and-lift-ops` from competing with the
canonical AJ Digital FieldOps Platform application in
`AudioJones-Dev/FRL-CONTRACTOR-PORTAL`.

## Current Scope

This repository is a preserved planning/reference source containing a Next.js
and Clerk mock scaffold, proposed schemas, workflows, SOPs, training material,
and historical delivery records.

Runtime development, deployment progression, provider configuration, and live
domain ownership are frozen here. Existing files and Git history remain intact
for evidence and controlled reconciliation.

## Source-of-Truth Boundaries

- Canonical Tier 4 application:
  `AudioJones-Dev/FRL-CONTRACTOR-PORTAL`.
- Canonical runtime providers: Render, Supabase Auth/Postgres/RLS/Storage, and
  the provider contracts accepted in that repository.
- Canonical production surfaces: the apex, `www`, `admin`, `contractor`,
  `client`, and `platform` hosts already verified through the canonical repo.
- This repository owns no production runtime, persistence model, provider
  configuration, or live application hostname.
- `ops.floridarampandliftops.com` has no DNS application record and is reserved
  pending a separate canonical-platform decision. It is not a deployment target
  for this repository.
- Source material becomes canonical only through the accepted consolidation
  audit, target-platform specification, and separately approved implementation
  in `FRL-CONTRACTOR-PORTAL`.

Canonical decision evidence:

- `AudioJones-Dev/FRL-CONTRACTOR-PORTAL` PR #41
- Merge commit `fb56861bf6e04064a1e964f638ff624031ba7cb1`
- Target documents:
  `docs/product/REPO_CONSOLIDATION_PRD.md` and
  `docs/governance/runtime-data-asset-inventory.md`

## In Scope

- Preserve source documents, mock UI, schemas, prompts, fixtures, and history.
- Review source assets as non-authoritative planning evidence.
- Correct identity, boundary, and navigation documents when they imply this
  repository is the live platform.
- Prepare documentation-only reconciliation proposals when explicitly approved.

## Out of Scope

- Runtime feature development in this repository.
- Clerk, Vercel, DNS, environment, secret, auth, database, storage, migration,
  email/SMS, PDF, AI runtime, or integration work.
- Preview or production deployment from this repository.
- Copying source schemas, role names, fixture IDs, or provider assumptions into
  the canonical platform as production truth.
- Closing PR #1, deleting files, removing Git history, making the repository
  read-only, or archiving it.

## Human Approval Gates

Separate explicit operator approval is required before:

- adapting or moving any source asset into the canonical platform;
- changing `ops.floridarampandliftops.com` or any other DNS record;
- closing PR #1 or changing another existing branch/PR;
- changing provider state or deleting the historical Vercel/Clerk setup;
- making this repository read-only or archived;
- superseding this freeze and restoring runtime development here.

## Risks

- Historical delivery documents can be mistaken for current authorization.
  Root identity documents and this contract control when a conflict exists.
- Useful operational concepts may be lost if the repo is archived prematurely.
  Preserve the repo until reconciliation rows have explicit dispositions.
- Direct code or schema copying could weaken tenant isolation or replace live
  Supabase authority with mock assumptions. Reconcile concepts through target
  specs instead.

## Acceptance Criteria

- Root identity and agent-entry documents identify this as a planning/reference
  source.
- The canonical Tier 4 runtime repository is named consistently.
- No current governing contract assigns `ops.floridarampandliftops.com` to this
  repo; historical delivery records are explicitly non-executable under the
  nearest delivery DOX contract.
- Historical deployment records remain available but are visibly superseded.
- No runtime, provider, DNS, secret, repository archive, or PR #1 state changes
  occur in the freeze change.

## Next Sequence

1. Review and merge this documentation-only freeze through normal PR gates.
2. Keep source runtime and deployment work paused.
3. Select one source capability at a time from the canonical consolidation
   inventory.
4. Create a target-platform specification and obtain separate approval before
   adapting it in `FRL-CONTRACTOR-PORTAL`.
5. Decide repository read-only/archive posture only after reconciliation closes.
