# Fixture Sanitization Checklist

Status: Active — pre-deploy fixture evidence complete 2026-07-11; S9 is post-deploy acceptance
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
lives, and the evidence each check must produce. **G5 preview creation is
blocked until S1-S8 and S10 plus their findings are resolved. S9 is verified
against the resulting Preview URL and must pass before G5 closes; it is not a
precondition for creating that Preview deployment.**

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
| S9 | Post-deploy acceptance: mock/demo labeling is visible on pilot-critical surfaces at runtime | Run [`PILOT_VERIFICATION_SCRIPT.md`](./PILOT_VERIFICATION_SCRIPT.md) Section D against the gated Preview URL and cross-reference the run record before G5 closes |
| S10 | No data about minors | Manual review (legal doctrine: minors' data not targeted) |

## Evidence Record

One row per check. S1-S8 and S10 are pre-deploy evidence. S9 is post-deploy
acceptance evidence and must pass before G5 is marked complete.

| Check | File(s) reviewed | Method | Reviewer | Date | Result |
|---|---|---|---|---|---|
| S1 | All `src/lib/*.ts` | Grep email/phone patterns + name-field review; private operator roster spot-check | Codex (agent) + operator | 2026-07-11 | **Pass (F4 confirmed 2026-07-11).** All known real vendor identity references were replaced with the explicitly fictional `Example Modular Services`; fixture phones use `(555)` and non-business emails use `@example.com`. Personal Gmail remains removed. The operator confirmed that `M. Reynolds`, `S. Patel`, and the retained `@ajdigital.app` business preview identities do not match any real FRL customer or contractor roster entry. No roster data was recorded. |
| S2 | `mock-data.ts`, `dispatch-demo.ts` | Grep address/coordinate fields + manual review | Claude Code (agent) | 2026-07-10 | Pass — all site addresses generic (`"Residential site, Tampa area"` style); no street addresses; no coordinates (grep hits were false positives, e.g. "coordination"). |
| S3 | `mock-data.ts` contractor records | Manual review of names/contacts | Claude Code (agent) | 2026-07-10 | Pass — `Lead Installer A` / `Senior Lead B` / `Helper C`, `@example.com` emails, `(555)` phones; no emergency-contact PII. |
| S4 | `mock-data.ts`, `dispatch-demo.ts` | Grep money/rate fields + manual review | Claude Code (agent) | 2026-07-10 | **Pass (F2 confirmed 2026-07-10).** Rates are descriptive labels (`"Standard lead split"`, `"Helper hourly"`); amounts are round demo figures (`$2,450`, `$8,900`) tied to fictional parties; operator confirmed demo amounts do not mirror real FRL pricing (F2). |
| S5 | All `src/lib/*.ts` | Grep file/image/upload references | Codex (agent) | 2026-07-11 | Pass — fixtures contain workflow text about required or missing photos, but no actual files, upload paths, URLs, signatures, image payloads, or real artifacts. |
| S6 | All `src/lib/*.ts` | Grep disability/medical/insurance terms | Claude Code (agent) | 2026-07-10 | Pass — no person-linked sensitive context; no disability/medical/insurance narratives. |
| S7 | All `src/lib/*.ts` | Grep key/token/secret/URL patterns | Claude Code (agent) | 2026-07-10 | Pass — zero secrets, tokens, keys, or http(s) URLs in fixtures. |
| S8 | `mock-data.ts`, `dispatch-demo.ts` | Grep ID conventions | Claude Code (agent) | 2026-07-10 | Pass — IDs are visibly non-production (`job_3001`, `lead_001`, `apq-1`). |
| S9 | Runtime surfaces | Post-deploy Preview verification, Section D | — | — | Pending post-deploy acceptance — run after the gated Preview exists and before G5 closes; not a pre-deploy prerequisite. |
| S10 | All `src/lib/*.ts` | Grep minor/child/age terms | Claude Code (agent) | 2026-07-10 | Pass — no minors' data (grep hits were false positives, e.g. "Facilities manager", "stage"). |

## Findings

| ID | Finding | Location | Recommended resolution | Status |
|---|---|---|---|---|
| F1 | Mock login preview accounts used real-looking emails: `dev@ajdigital.app`, `audiojones@ajdigital.app` (business identities), and `bookaudiojones@gmail.com` (**personal Gmail — real personal contact data in a bundle that will deploy publicly**). | `src/lib/roles.ts` (`mockLoginAccounts`) | Resolution taken (operator-directed 2026-07-10, option b): personal Gmail replaced with `contractor.preview@example.com`; business `@ajdigital.app` preview identities retained. | **Resolved 2026-07-10.** Retained business identities are covered by the F4 roster confirmation. |
| F2 | Demo invoice amounts (`$2,450` … `$12,400`) look generic but only the operator can confirm they do not mirror real FRL contract pricing. | `src/lib/mock-data.ts` invoices | Operator confirmation recorded 2026-07-10: "Demo invoice/job amounts do not mirror real FRL pricing; confirmed." | **Resolved 2026-07-10.** |
| F3 | Current fixture data used `WilScot`/`WillScot`, a real-company identity, across customer, job, contact, dispatch, invoice, assignment, and scenario text. | `src/lib/mock-data.ts`, `src/lib/dispatch-demo.ts` | Replace every spelling variant with the explicitly fictional `Example Modular Services` identity or generic modular-site wording. | **Resolved 2026-07-11.** Case-insensitive repository scan returns zero `wil+scot` occurrences in `src/lib`. |
| F4 | Agent review cannot prove that initial-style names (`M. Reynolds`, `S. Patel`) or retained `@ajdigital.app` business identities do not coincide with the real FRL customer/contractor roster. | `src/lib/mock-data.ts`, `src/lib/roles.ts` | Operator performed a names-only roster spot-check and confirmed the listed demo identities do not match any real FRL customer or contractor roster entry; no roster data entered Git, docs, or chat. | **Resolved 2026-07-11.** |

Agent-review caveat: automated evidence verifies fictional form, not the real
FRL roster. F4 records the operator's names-only confirmation without placing
any roster data in the repository.

## Failure Rule

If S1-S8 or S10 fails: fix the fixture data on a feature branch (fixture edits
are `src/lib` changes and count as app-facing), re-run the check, and record
the evidence. Do not create the G5 Preview with a failing pre-deploy check or
open finding. If S9 fails after deployment, G5 remains incomplete and the
Preview must not be circulated until labeling is fixed and re-verified.

## Does Not Authorize

This checklist does not authorize deploys, data collection, real records,
storage, or runtime changes. It defines evidence requirements only; completing
it satisfies a G5 precondition but never substitutes for the G5 operator
`proceed`.
