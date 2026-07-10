# Fixture Sanitization Checklist

Status: Git Spec-ready draft — evidence pending
Scope: Evidence checklist proving fixture/demo data is sanitized before any Phase B deploy gate
Runtime impact: None
Implementation status: Documentation only

## Purpose

This is the planning-only sanitization-evidence artifact required by
[`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md).
The internal pilot may serve **sanitized fixture/demo records only**
([`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md) internal-pilot scope;
[`../legal/LEGAL_PRIVACY_DOCTRINE.md`](../legal/LEGAL_PRIVACY_DOCTRINE.md) data
classes). This checklist defines what "sanitized" means, where the fixture data
lives, and the evidence each check must produce. **G5 (preview deploy) is
blocked until every check row carries recorded evidence.**

## Fixture Source Inventory (from `src/lib/`, verified against the tree)

| File | Contents to review |
|---|---|
| `src/lib/mock-data.ts` | Core mock records: customers, leads, jobs, contractors, communications, documentation, invoices, alerts, approvals |
| `src/lib/mock-events.ts` | Mock event/audit timeline entries |
| `src/lib/dispatch-demo.ts` | Dispatch marketplace demo records |
| `src/lib/queues.ts` | Queue derivations over mock records |
| `src/lib/approval-workflows.ts` | Approval workflow definitions/records |
| `src/lib/dashboard-intelligence.ts` | Dashboard aggregations over mock records |
| `src/lib/roles.ts` | Role definitions (check for real personal names) |
| `src/lib/navigation.ts`, `src/lib/utils.ts` | Expected non-data; confirm |

Any new fixture file added later must be appended here before the next deploy
gate.

## Sanitization Checks

Each check states its rule and a suggested method. Evidence = command output or
a dated manual-review note in the Evidence Record below.

| ID | Rule | Suggested method |
|---|---|---|
| S1 | No real customer names, emails, or phone numbers — all person/contact data fictional | Grep fixtures for `@`/phone patterns; manual name review against known real customers |
| S2 | No real street addresses or precise geolocation — addresses fictional or generic | Manual review of all address fields; grep for coordinates |
| S3 | No real contractor identities (names, phones, emergency contacts) | Manual review of contractor records |
| S4 | No real rates, private rate sheets, or real invoice amounts tied to identifiable parties | Manual review of financial fields; confirm figures are obviously demo values |
| S5 | No photos, signatures, uploaded files, or file paths referencing real artifacts | Grep for file/image references; confirm upload placeholders are empty/local-only |
| S6 | No sensitive operational data: disability/medical context, accessibility details tied to a person, safety incidents naming real people | Manual review against the legal doctrine's sensitive-data class |
| S7 | No credentials, tokens, env values, or internal URLs in fixture data | Grep for `sk_`, `pk_`, `http`, `key`, `token`, `secret` |
| S8 | Fixture IDs remain visibly non-production (e.g. `job_001` style) and are never promoted to production IDs | Review ID conventions (root `AGENTS.md` mock-data constraint) |
| S9 | Mock/demo labeling is visible on pilot-critical surfaces at runtime | Covered by [`PILOT_VERIFICATION_SCRIPT.md`](./PILOT_VERIFICATION_SCRIPT.md) Section D — cross-reference the run record |
| S10 | No data about minors | Manual review (legal doctrine: minors' data not targeted) |

## Evidence Record

One row per check; all rows must be complete before G5.

| Check | File(s) reviewed | Method | Reviewer | Date | Result |
|---|---|---|---|---|---|
| S1 | | | | | Pending |
| S2 | | | | | Pending |
| S3 | | | | | Pending |
| S4 | | | | | Pending |
| S5 | | | | | Pending |
| S6 | | | | | Pending |
| S7 | | | | | Pending |
| S8 | | | | | Pending |
| S9 | | | | | Pending |
| S10 | | | | | Pending |

## Failure Rule

If any check fails: fix the fixture data on a docs/feat branch (fixture edits
are `src/lib` changes and count as app-facing — branch and validate
accordingly), re-run the check, and record the new evidence. Do not proceed to
G5 with a failing or unevidenced row.

## Does Not Authorize

This checklist does not authorize deploys, data collection, real records,
storage, or runtime changes. It defines evidence requirements only; completing
it satisfies a G5 precondition but never substitutes for the G5 operator
`proceed`.
