# DATA DICTIONARY

**Purpose:** Define every operational field used across Florida Ramp & Lift workflows in plain English. This is the single source of truth for field meaning. Schemas in `schemas/` reference these names; SOPs in `docs/sop/` use these names; automations in `docs/automation/` consume these names.

If a field appears in the system but not in this dictionary, **the dictionary is the gap to close** — not the field.

---

## 1. Job identity

| Field | Plain English |
|---|---|
| `job_id` | System-generated unique identifier for a single job. Never reused. |
| `client_job_number` | The client's own reference number (e.g., WillScot work order number). |
| `florida_ramp_internal_number` | Florida Ramp & Lift's optional internal reference, used before the client number is known. |
| `job_type` | What kind of work this job is (ramp install, VPL install, stair lift install, etc.). Drives form rendering and validation. |
| `status` | Where this job is in its lifecycle (pending, scheduled, in_progress, submitted, approved, invoiced, paid, incomplete, return_needed, on_hold, cancelled). |

## 2. Client + work order

| Field | Plain English |
|---|---|
| `client_id` | Which client this job is for (WillScot, Mobile Mini, direct customer, etc.). |
| `work_order_id` | The work order document that authorized this job. |
| `work_order_number` | The work order's own number, as printed on the source document. |
| `sap_order_number` | The client's SAP order number (WillScot specific). |
| `product_unit_number` | The unit number the work was performed on or for. |
| `owner` | Who owns the unit/asset (often the end customer). |
| `prepared_for` | The party the work order was prepared for. |
| `prepared_by` | Who prepared the work order. |
| `account` | The client account this work order belongs to. |
| `contact_name` | Site or account contact full name. |
| `contact_title` | Contact's title. |
| `contact_phone` | Contact's phone number. |
| `contact_email` | Contact's email address. |
| `product_family` | The product family the work order covers (e.g., Modular, Ramp, ADA). |
| `description` | Free-text description of the work order scope. |
| `start_date` | Work order start date. |
| `end_date` | Work order end date (or open-ended). |

## 3. Site

| Field | Plain English |
|---|---|
| `site_address` | The full street address where work happens. |
| `site_city` | City — cached for fast zone lookup. |
| `site_state` | State (typically FL). |
| `site_zip` | Zip code. |
| `site_access_notes` | Anything the crew needs to know to physically get to the site (gate codes, lock boxes, after-hours access). |

## 4. Zone + trip charge

| Field | Plain English |
|---|---|
| `zone_id` | Which trip-charge zone the site falls into (zone_1 through zone_4). |
| `trip_charge_classification` | Whether this job is the crew's first job in this zone today, an additional same-day same-zone job, or zone-trip-charge does not apply. |
| `trip_charge_amount` | The dollar amount of the trip charge, computed by the zone engine. |

## 5. Crew

| Field | Plain English |
|---|---|
| `crew_size` | How many people executed the job (1, 2, or 3). |
| `crew_members[]` | The contractors on the job and their payout percentages. |
| `crew_members[].contractor_id` | Which contractor. |
| `crew_members[].split_pct` | What share of the payout this contractor gets (0.0 to 1.0; all split_pcts must sum to 1.0). |
| `crew_members[].role` | The contractor's role on this job (lead, helper, apprentice, support). |

## 6. Scope line items

| Field | Plain English |
|---|---|
| `scope_line_items[]` | The billable rows for this job. |
| `scope_line_items[].line_item_id` | Identifier for this specific line item record. |
| `scope_line_items[].name` | Canonical name (e.g., "ADA/IBC Switchback Ramp"). |
| `scope_line_items[].quantity` | How many units (length, count, etc.) of this line item. |
| `scope_line_items[].unit_rate` | Dollar amount per unit, from the active rate sheet. |
| `scope_line_items[].line_total` | `quantity × unit_rate`. |
| `scope_line_items[].rate_sheet_id` | Which rate sheet was applied (different for contractor vs. WillScot client billing). |
| `scope_line_items[].notes` | Optional per-line notes. |

## 7. Safety

| Field | Plain English |
|---|---|
| `safety_record_id` | Identifier for the safety check record on this job. |
| `ppe_checked` | True/false: did the crew confirm steel-toed boots + actual safety glasses + gloves before starting? |
| `ppe_items_verified[]` | The specific PPE items confirmed (steel_toed_boots, safety_glasses, gloves, hard_hat_when_applicable, hi_vis_when_applicable). |
| `job_specific_hazards[]` | Hazards specific to this job (heights, electrical, hot weather, traffic, etc.). |
| `osha_notes` | Any OSHA-relevant observations or incidents. |
| `safety_signoff_by` | Contractor who signed off on the safety check. |
| `safety_signoff_at` | When sign-off happened. |

## 8. Uploads

| Field | Plain English |
|---|---|
| `uploads[]` | Files attached to this job. |
| `uploads[].upload_id` | Identifier for the upload. |
| `uploads[].kind` | What kind of file (photo, pdf, work_order, signed_completion, voice_note, video). |
| `uploads[].storage_url` | Where the file is stored. |
| `uploads[].original_filename` | The filename when uploaded. |
| `uploads[].mime_type` | File MIME type. |
| `uploads[].caption` | Optional caption. Phase 2+ may auto-generate from voice transcript. |
| `uploads[].transcript` | Optional Whisper transcript (Phase 2+). |

## 9. Notes

| Field | Plain English |
|---|---|
| `notes` | Freeform contractor notes — what happened, what's incomplete, what needs a return trip, what damage was found, what the client requested, what OSHA-relevant events occurred. |

## 10. Invoicing references

| Field | Plain English |
|---|---|
| `contractor_invoice_id` | The contractor-facing invoice that includes this job. |
| `client_invoice_id` | The client-facing invoice (e.g., WillScot) that includes this job. |
| `invoiced_at` | When the job was first included in an invoice. |
| `paid_at` | When the contractor was paid for this job. |
| `client_paid_at` | When the client invoice covering this job was paid. |

## 11. Audit

| Field | Plain English |
|---|---|
| `created_at` | When the job record was first created. |
| `created_by` | Who created the job record. |
| `updated_at` | When the job record was last updated. |
| `updated_by` | Who last updated. |
| `submitted_at` | When the contractor submitted the job report. |
| `approved_at` | When admin approved the job for billing. |
| `approved_by` | Who approved. |
| `version` | Increments on substantive edits after submission. |
| `status_history[]` | Append-only log of status transitions. |

## 12. Signature

| Field | Plain English |
|---|---|
| `signed_by` | The on-site party who signed off on completion (typically a client representative). |
| `signature_date` | When the sign-off happened. |
| `signature_capture_method` | How the signature was captured (in_person_paper, in_person_digital, photo_of_signed_form, phase_2_in_app_capture). |

## 13. Client invoice (WillScot example)

| Field | Plain English |
|---|---|
| `client_invoice_id` | Identifier for the WillScot-bound invoice. |
| `issuer` | Florida Ramp & Lift. |
| `recipient` | WillScot. |
| `client_rate_sheet_id` | Which WillScot rate sheet applies. |
| `client_invoice_total` | Total amount billed to WillScot. |
| `admin_review_status` | pending / approved / rejected / held / sent. |
| `admin_reviewed_by` | Who reviewed. |
| `admin_reviewed_at` | When. |
| `pdf_storage_url` | Where the rendered invoice PDF lives. |
| `delivered_at` | When the invoice was sent to WillScot. |
| `delivery_method` | email / portal_link / etc. |
| `audit_reference` | Unique reference for compliance audit. |

## 14. Contractor invoice

| Field | Plain English |
|---|---|
| `contractor_invoice_id` | Identifier for the contractor-bound invoice. |
| `contractor_id` | Which contractor this invoice is for. |
| `pay_period_start` | First day of the billing period. |
| `pay_period_end` | Last day of the billing period. |
| `jobs_included[]` | The jobs covered by this invoice. |
| `trip_charges_total` | Total trip charges this contractor's share. |
| `line_items_total` | Total of all line items this contractor's share. |
| `adjustments_total` | Approved adjustments (positive or negative). |
| `payout_total` | Net payout to this contractor. |
| `pdf_storage_url` | Where the rendered invoice PDF lives. |
| `delivered_at` | When delivered. |
| `delivery_method` | email / sms_secure_link / portal. |
| `delivery_status` | sent / delivered / viewed. |

## 15. Pay schedule

| Field | Plain English |
|---|---|
| `pay_schedule_id` | Identifier for the pay schedule. |
| `name` | Schedule name (e.g., "Florida Ramp Weekly"). |
| `billing_period_start_dow` | Day of week the billing period starts (e.g., Monday). |
| `billing_period_end_dow` | Day of week the billing period ends (e.g., Sunday). |
| `invoice_generation_dow` | Day of week invoices generate (e.g., Sunday). |
| `invoice_generation_time` | Time of day generation runs (e.g., 23:59). |
| `payout_processing_dow` | Day of week payouts process. |
| `assigned_contractor_ids[]` | Contractors on this schedule. |
| `assigned_contractor_groups[]` | Groups on this schedule. |

---

## 16. Conventions

- **All money** in USD, decimal, 2 fractional digits.
- **All dates/times** in ISO 8601 with timezone (America/New_York unless otherwise specified).
- **All identifiers** UUID v4 unless tied to an external system (then preserve the external format).
- **All enums** lowercase with underscores.
- **All field names** snake_case in the schema; `Title Case` or `Plain English` in this dictionary.

---

## 17. Glossary of operational terms

| Term | Meaning |
|---|---|
| **Work Order** | A client-issued document authorizing the job, with named line items, quantities, and signatures. |
| **Line Item** | An atomic billable row on a work order (e.g., "ADA/IBC Switchback Ramp"). |
| **Knockdown** | Disassembly / removal of previously installed equipment. |
| **Return Haul** | Pickup of equipment for return to client / vendor. |
| **Complex** | Higher complexity / labor / engineering tier of a standard service. |
| **Switchback Ramp** | A ramp configuration that doubles back, typically for spaces where a straight ramp doesn't fit. |
| **VPL** | Vertical Platform Lift. |
| **PPE** | Personal Protective Equipment. |
| **Zone** | A geographic grouping used for trip-charge calculation. |
| **Split** | The percentage of the job payout a contractor receives. |
| **Sign-off** | On-site verification by a client representative that the work is complete. |
| **Rate Sheet** | The pricing schedule that maps line items to dollar amounts. Contractor rate sheet and client rate sheet (e.g., WillScot) are separate. |
| **Trip Charge** | A flat fee per job for crew travel, with reduced rates for additional same-day same-zone jobs. |
