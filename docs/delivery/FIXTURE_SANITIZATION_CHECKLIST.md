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
| S1 | All `src/lib/*.ts` | Grep email/phone patterns + name-field review | Claude Code (agent) | 2026-07-10 | **Conditional — finding F1.** Fixture emails all `@example.com`; phones all fictional `(555)`; names initial-style fictional (`M. Reynolds`, `S. Patel`). But `src/lib/roles.ts` mock login accounts carry real-looking emails — see F1. |
| S2 | `mock-data.ts`, `dispatch-demo.ts` | Grep address/coordinate fields + manual review | Claude Code (agent) | 2026-07-10 | Pass — all site addresses generic (`"Residential site, Tampa area"` style); no street addresses; no coordinates (grep hits were false positives, e.g. "coordination"). |
| S3 | `mock-data.ts` contractor records | Manual review of names/contacts | Claude Code (agent) | 2026-07-10 | Pass — `Lead Installer A` / `Senior Lead B` / `Helper C`, `@example.com` emails, `(555)` phones; no emergency-contact PII. |
| S4 | `mock-data.ts`, `dispatch-demo.ts` | Grep money/rate fields + manual review | Claude Code (agent) | 2026-07-10 | Pass with note — rates are descriptive labels (`"Standard lead split"`, `"Helper hourly"`); amounts are round demo figures (`$2,450`, `$8,900`) tied to fictional parties. Operator note F2: confirm demo amounts do not mirror actual FRL contract pricing (only the operator can know). |
| S5 | All `src/lib/*.ts` | Grep file/image/upload references | Claude Code (agent) | 2026-07-10 | Pass — zero file, photo, or upload-path references in fixtures. |
| S6 | All `src/lib/*.ts` | Grep disability/medical/insurance terms | Claude Code (agent) | 2026-07-10 | Pass — no person-linked sensitive context; no disability/medical/insurance narratives. |
| S7 | All `src/lib/*.ts` | Grep key/token/secret/URL patterns | Claude Code (agent) | 2026-07-10 | Pass — zero secrets, tokens, keys, or http(s) URLs in fixtures. |
| S8 | `mock-data.ts`, `dispatch-demo.ts` | Grep ID conventions | Claude Code (agent) | 2026-07-10 | Pass — IDs are visibly non-production (`job_3001`, `lead_001`, `apq-1`). |
| S9 | Runtime surfaces | Pilot verification run, Section D | — | — | Deferred by design — verified at the G5/G6 run per [`PILOT_VERIFICATION_SCRIPT.md`](./PILOT_VERIFICATION_SCRIPT.md). |
| S10 | All `src/lib/*.ts` | Grep minor/child/age terms | Claude Code (agent) | 2026-07-10 | Pass — no minors' data (grep hits were false positives, e.g. "Facilities manager", "stage"). |

## Findings

| ID | Finding | Location | Recommended resolution | Status |
|---|---|---|---|---|
| F1 | Mock login preview accounts use real-looking emails: `dev@ajdigital.app`, `audiojones@ajdigital.app` (business identities), and `bookaudiojones@gmail.com` (**personal Gmail — real personal contact data in a bundle that will deploy publicly**). | `src/lib/roles.ts` (`mockLoginAccounts`) | Operator decision: (a) replace with fictional/alias addresses (e.g. `contractor.preview@example.com`) on an approved branch — a `src/lib` runtime-file edit, out of scope for this docs-only pass; or (b) explicitly accept the business `@ajdigital.app` identities and replace only the personal Gmail. | **Open — blocks S1, and therefore G5, until resolved.** |
| F2 | Demo invoice amounts (`$2,450` … `$12,400`) look generic but only the operator can confirm they do not mirror real FRL contract pricing. | `src/lib/mock-data.ts` invoices | One-line operator confirmation recorded here. | Open — confirmation requested (low risk). |

Agent-review caveat: the agent verified data is *fictional in form*; it cannot
know FRL's real customer roster. Operator spot-confirmation that no fixture
name coincides with a real customer/contractor closes that residual risk.

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
