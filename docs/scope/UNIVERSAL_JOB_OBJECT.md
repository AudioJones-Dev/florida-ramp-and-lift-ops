# UNIVERSAL JOB OBJECT

**Purpose:** Define the canonical Job entity that every workflow flows through. This is the operational hub of Florida Ramp & Lift's intelligence layer. Schema lives in `schemas/job.schema.json`; this doc explains the entity in plain English.

---

## Why this exists

Every workflow in the platform — PDF intake, dispatch, billing, safety, payout, CRM sync, reporting, AI extraction — operates on the same canonical Job entity. If three workflows model a Job three different ways, integration fails, billing fails, contractors get paid wrong, and the operational memory layer can't compound.

There is **one** canonical Job. Everything else references it.

---

## Definition

A **Job** is a single named unit of field work executed by Florida Ramp & Lift for a single Client at a single Site Address on a single calendar date (or a tightly bounded date range for multi-day installs). It has:

- A unique identifier
- A client reference
- A work order reference (if client-issued; e.g., WillScot)
- A type (Ramp Install, VPL Install, Stair Lift Install, etc.)
- One or more scope line items (what was installed / serviced / delivered)
- A crew (1–3 contractors with payout split percentages)
- A status lifecycle (Pending → Scheduled → In Progress → Submitted → Approved → Invoiced → Paid)
- A zone (for trip-charge calculation)
- A safety record (PPE check, hazard checklist, sign-off)
- Optional uploaded evidence (photos, signed completion forms, work order PDFs)
- Optional voice notes (Phase 2+)
- Optional notes (incomplete work, damage, client requests, return trips, OSHA notes)

The Job is the **atomic billable unit**. Trip charges and payouts are computed at job-completion time using the job's zone, line items, crew, and split configuration.

---

## Identity

| Field | Type | Notes |
|---|---|---|
| `job_id` | UUID v4 | System-generated. Never reused. |
| `client_job_number` | string | The client's reference (e.g., WillScot work order number). Optional but expected for WillScot work. |
| `florida_ramp_internal_number` | string | Optional internal reference; useful before client number is known. |

---

## Client + work order linkage

| Field | Type | Notes |
|---|---|---|
| `client_id` | UUID | Reference to `client.schema.json` |
| `work_order_id` | UUID | Reference to `work-order.schema.json` (one work order can have one or more jobs) |

---

## Job type

The `job_type` enum drives dynamic form rendering, validation rules, and required fields.

| `job_type` | Piece count required | Notes |
|---|---|---|
| `ramp_install` | yes | Ramp size, platforms, steps, switchback count, skirting, handrails, custom labor |
| `ramp_recovery` | yes | Pickup / knockdown / return of previously installed equipment |
| `ramp_modification` | yes | Field changes to an existing install |
| `ramp_touchup` | optional | Repairs / cosmetic / minor finishing |
| `vpl_install` | no | Vertical Platform Lift — type, install complexity, electrical notes |
| `vpl_service` | no | Service call on an existing VPL |
| `stair_lift_install` | no | Straight or curved; manufacturer/model/serial/rail configuration/power |
| `stair_lift_service` | no | Service call on an existing stair lift |
| `vehicle_lift_install` | no | Lift category, manufacturer, mounting type, electrical |
| `vehicle_lift_service` | no | Service call |
| `repair` | conditional | Type-driven |
| `delivery_only` | no | Drop-off without install |

---

## Status lifecycle

```
pending     → job exists, not yet scheduled
scheduled   → assigned to a crew + date
in_progress → crew has started work
submitted   → crew has submitted job report (with line items, photos, notes)
approved    → admin has reviewed and approved for billing
invoiced    → invoice generated (contractor + client)
paid        → contractor paid + client invoice paid
incomplete  → additional trip required; subset can re-enter scheduled
return_needed → future scheduling needed; subset can re-enter scheduled
on_hold     → admin paused for triage
cancelled   → job cancelled; no billing
```

Transitions are tracked in an append-only status history on the Job for audit.

---

## Crew + payout split

| Field | Type | Notes |
|---|---|---|
| `crew_size` | integer 1–3 | 2 is typical; 3 for complex work |
| `crew_members[]` | array of contractor refs | Each entry has contractor_id + split_pct |
| `crew_members[].contractor_id` | UUID | Reference to Contractor profile |
| `crew_members[].split_pct` | decimal 0.0–1.0 | Sum across the crew must equal 1.0 |
| `crew_members[].role` | enum | `lead` / `helper` / `apprentice` / `support` |

Default split percentages come from team-pair config; can be overridden per-job with admin approval.

---

## Zone + trip charge

| Field | Type | Notes |
|---|---|---|
| `site_address` | string | Full site address |
| `site_city` | string | Cached for fast zone lookup |
| `zone_id` | enum | `zone_1` / `zone_2` / `zone_3` / `zone_4` |
| `trip_charge_classification` | enum | `first_job_in_zone` / `additional_same_day_same_zone` / `none_applicable` |
| `trip_charge_amount` | decimal | Computed by the zone engine; not entered by contractor |

The trip charge classification is computed by the system based on other jobs the same crew submits the same day in the same zone — not entered by the contractor.

---

## Scope line items

Each line item references `scope-line-item.schema.json`. Line items are the atomic billable rows.

| Field | Type | Notes |
|---|---|---|
| `scope_line_items[]` | array of line item refs | One entry per billable scope row |
| `scope_line_items[].line_item_id` | UUID | |
| `scope_line_items[].name` | string | Canonical line item name (e.g., "ADA/IBC Switchback Ramp") |
| `scope_line_items[].quantity` | decimal | Field-customizable |
| `scope_line_items[].unit_rate` | decimal | From the active rate sheet; not entered by contractor |
| `scope_line_items[].line_total` | decimal | `quantity × unit_rate` |
| `scope_line_items[].rate_sheet_id` | UUID | Which rate sheet was applied |

Known WillScot line items (initial set; complete list in `docs/scope/WILSCOT_AUTOMATION_SCOPE.md`):

- Complex Return Haul
- Complex Knockdown
- Standard Complex Knockdown
- ADA/IBC Steps
- ADA/IBC Switchback Ramp
- Ramp Knockdown & Return
- Aluminum Deck – 5ft × 5ft
- Window/Door Security Bundle
- State Approved Building Plans
- Foundation / Tiedown Plans
- Ramp / Stair Plans
- Return to Standard
- Modification to Unit
- General Liability Insurance
- Loss Damage Waiver

---

## Safety

| Field | Type | Notes |
|---|---|---|
| `safety_record_id` | UUID | Reference to `safety.schema.json` |
| `ppe_checked` | boolean | Steel-toed boots + actual safety glasses + gloves verified |
| `job_specific_hazards[]` | array of strings | Surfaces hazards generated from job type + site context |
| `safety_signoff_by` | contractor ref | Who signed off on safety check |
| `safety_signoff_at` | datetime | |

Safety is **not optional**. PPE check + hazard review + sign-off are required before the job moves out of `pending` or `scheduled`.

---

## Uploads

| Field | Type | Notes |
|---|---|---|
| `uploads[]` | array | Photos, PDFs, work orders, signed completion forms |
| `uploads[].upload_id` | UUID | |
| `uploads[].kind` | enum | `photo` / `pdf` / `work_order` / `signed_completion` / `voice_note` / `video` |
| `uploads[].storage_url` | string | Storage reference (Cloudflare R2 / S3 — Phase 2+) |
| `uploads[].caption` | string | Optional caption (Phase 2+ auto-generated from voice transcript) |
| `uploads[].transcript` | string | Optional Whisper transcript (Phase 2+) |

**No real customer PDFs in this repo, ever.** Sample data in `samples/` is sanitized.

---

## Notes

| Field | Type | Notes |
|---|---|---|
| `notes` | string | Freeform contractor notes — incomplete work, damage, client requests, return trips, issues, OSHA / safety notes |

---

## Invoicing references

| Field | Type | Notes |
|---|---|---|
| `contractor_invoice_id` | UUID | Reference to contractor-side invoice (see `invoice.schema.json`) |
| `client_invoice_id` | UUID | Reference to client-side invoice (e.g., WillScot) |

Contractor and client invoices are separate records. Same job; two invoices. See `docs/automation/BILLING_EXTRACTION_SPEC.md`.

---

## Audit fields

| Field | Type | Notes |
|---|---|---|
| `created_at` | datetime | |
| `created_by` | user ref | |
| `updated_at` | datetime | |
| `updated_by` | user ref | |
| `submitted_at` | datetime | When contractor submitted |
| `approved_at` | datetime | When admin approved |
| `approved_by` | user ref | |
| `version` | integer | Increments on substantive edits after submission |

---

## Required-on-submission fields

When a contractor submits a job (moves from `in_progress` → `submitted`), these must be present and validated:

- `job_id`
- `client_id`
- `job_type`
- `site_address`, `site_city`
- `crew_members[]` (with valid split percentages summing to 1.0)
- `scope_line_items[]` (at least one)
- `safety_record_id` with `ppe_checked = true` and `safety_signoff_by` set
- `notes` (can be empty string but field must exist)

Admin review may add or correct: `unit_rate` on line items, `trip_charge_amount`, `zone_id` corrections, line item additions/removals with reason.

---

## Reference to other entities

- **Client:** `schemas/client.schema.json` — billable party (e.g., WillScot)
- **Work Order:** `schemas/work-order.schema.json` — client-issued document
- **Scope Line Item:** `schemas/scope-line-item.schema.json` — atomic billable row
- **Safety:** `schemas/safety.schema.json` — PPE + hazards + signoff
- **Invoice:** `schemas/invoice.schema.json` — contractor or client invoice
