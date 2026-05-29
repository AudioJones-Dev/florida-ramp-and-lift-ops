# BILLING EXTRACTION — SPEC

**Status:** Phase 1 specification. Implementation lands in Phase 2.
**Purpose:** Generate BOTH the contractor invoice(s) and the WillScot client invoice from a set of `approved` jobs, with separation between contractor-facing and client-facing financial data, and explicit admin review gates.

---

## 1. Two invoice classes (the load-bearing distinction)

| | Contractor invoice | Client invoice (e.g., WillScot) |
|---|---|---|
| Issuer | Florida Ramp & Lift (paying party) | Florida Ramp & Lift (issuing party) |
| Recipient | Contractor | Client (WillScot) |
| Pricing source | Contractor rate sheet + trip-charge engine + splits | Client contractual rate sheet (e.g., WillScot rate sheet) |
| Splits / payout calculations visible? | YES (this is the whole point) | **NO — never** |
| Trip charges visible? | YES (broken out per job) | Only if contractually billable to client |
| Generation trigger | Pay schedule (e.g., Florida Ramp Weekly Sunday 11:59 PM) | Admin per work order completion |
| Admin review required? | Configurable (default: review for new contractors, auto for established) | **ALWAYS — non-negotiable** |
| Delivery | Email + SMS secure link + portal | Email PDF attachment |
| PDF | Yes, branded | Yes, branded |
| Audit reference | Yes | Yes |

**The two invoices are NEVER combined and NEVER cross-leaked.** Schema separation + automation separation + delivery separation.

---

## 2. Contractor invoice generation

### 2.1 Input contract

| Input | Source |
|---|---|
| Set of `approved` jobs in the billing period | Job records with `status = approved` and `approved_at` within the period |
| Contractor pay schedule | `pay-schedule.schema.json` (Phase 2+) — defines billing period start/end + generation day |
| Contractor rate sheet | Admin-configured (Phase 2+) |
| Trip-charge engine | Zone pricing rules per `PROJECT_SOURCE.md` § 10 |
| Split configuration | Per-contractor and per-team-pair defaults |
| Adjustments | Approved adjustments (positive or negative) for the period |

### 2.2 Calculation steps

For each contractor on the pay schedule:

1. **Aggregate jobs.** Pull every `approved` job in the billing period where the contractor is a crew member.
2. **Compute line item shares.** For each job:
   - `contractor_line_share = job_line_items_total × contractor_split_pct`
3. **Compute trip charge share.** For each job:
   - `contractor_trip_share = job_trip_charge × contractor_split_pct`
4. **Sum across jobs.**
5. **Apply adjustments.** Approved positive / negative adjustments.
6. **Compute payout total.**
7. **Generate line-item invoice detail.** Per-job breakdown for the contractor's reference.

### 2.3 Output structure

Matches `schemas/invoice.schema.json` with `invoice_class: contractor`:

```json
{
  "contractor_invoice_id": "<uuid>",
  "invoice_class": "contractor",
  "contractor_id": "<ref>",
  "pay_period_start": "<iso-date>",
  "pay_period_end": "<iso-date>",
  "jobs_included": ["<job_id>", "..."],
  "line_items": [
    {
      "job_id": "<ref>",
      "job_description": "<short>",
      "line_items_share": "<decimal>",
      "trip_charge_share": "<decimal>",
      "adjustments_share": "<decimal>",
      "subtotal": "<decimal>"
    }
  ],
  "totals": {
    "line_items_total": "<decimal>",
    "trip_charges_total": "<decimal>",
    "adjustments_total": "<decimal>",
    "payout_total": "<decimal>"
  },
  "pdf_storage_url": "<ref>",
  "audit_reference": "<unique>",
  "delivery_channels": ["email", "sms_secure_link"],
  "delivered_to": "<contractor contact>",
  "delivery_status": "pending|sent|delivered|viewed",
  "admin_review_required": "<boolean>",
  "admin_reviewed_by": "<ref|null>",
  "admin_reviewed_at": "<datetime|null>",
  "admin_review_decision": "approved|rejected|held|null"
}
```

### 2.4 Delivery

- PDF generated with branded header/footer + invoice number + audit reference
- Delivered via email (PDF attachment)
- Delivered via SMS with secure link to invoice portal
- Delivery status tracked: sent / delivered / viewed

---

## 3. Client invoice generation (WillScot)

### 3.1 Input contract

| Input | Source |
|---|---|
| One or more completed work orders | Work order records with status `completed` (per WillScot job handling SOP) |
| WillScot contractual rate sheet | Admin-configured (Phase 2+; contract-sensitive, NOT in repo) |
| Billing rules | Tenant-specific WillScot rules (Phase 2+) |

### 3.2 Calculation steps

For each work order being billed:

1. **Pull line items + quantities.** From the work order + crew submission (with field adjustments).
2. **Apply WillScot rate sheet.** Each canonical line item maps to a WillScot-contractual unit rate. Quantities × WillScot rate.
3. **Apply any contractually billable trip charges or surcharges** per the WillScot contract (Florida Ramp's trip-charge engine is NOT applied here — that's contractor-side).
4. **Apply tenant-specific billing rules** (e.g., minimum invoice amount, line item bundling, billing format requirements).
5. **Strip ALL contractor data.** No `crew_members`, no `split_pct`, no contractor-side trip charge calculations, no internal fee structures.
6. **Sum the invoice.**

### 3.3 Output structure

Matches `schemas/invoice.schema.json` with `invoice_class: client`:

```json
{
  "client_invoice_id": "<uuid>",
  "invoice_class": "client",
  "issuer": "Florida Ramp & Lift",
  "recipient_client_id": "<ref>",
  "recipient_client_name": "WillScot",
  "work_orders_included": ["<work_order_id>", "..."],
  "line_items": [
    {
      "work_order_id": "<ref>",
      "line_item_name": "<canonical>",
      "quantity": "<decimal>",
      "client_unit_rate": "<decimal>",
      "line_total": "<decimal>"
    }
  ],
  "totals": {
    "subtotal": "<decimal>",
    "surcharges": "<decimal>",
    "taxes": "<decimal>",
    "invoice_total": "<decimal>"
  },
  "pdf_storage_url": "<ref>",
  "audit_reference": "<unique>",
  "delivery_channel": "email",
  "delivery_email": "<willscot AP email>",
  "delivery_status": "pending_review|approved|sent|delivered|paid",
  "admin_review_required": true,
  "admin_reviewed_by": "<ref|null>",
  "admin_reviewed_at": "<datetime|null>",
  "admin_review_decision": "approved|rejected|edited|held|null",
  "admin_review_notes": "<string|null>"
}
```

### 3.4 Admin review gate (mandatory)

Every client invoice — without exception — routes to admin review before delivery. Admin can:

- **Approve** → invoice delivers as PDF via email
- **Reject** → invoice returned to generation queue with notes; admin or system reissues
- **Edit** → admin makes corrections (e.g., line item adjustment with reason); reissues
- **Hold** → invoice held pending external decision (e.g., WillScot AP question)

The admin review decision and reason are recorded in the audit trail.

### 3.5 Delivery

- PDF generated with branded header/footer + WillScot-required invoice number format + audit reference
- Delivered via email (PDF attachment) to WillScot AP contact
- (Future: portal upload / AP system integration if WillScot supports it)
- Delivery status tracked

---

## 4. Separation guarantees (load-bearing)

The platform MUST enforce these separation guarantees at the schema, automation, and UI levels:

| Guarantee | Enforcement |
|---|---|
| Client invoice contains no contractor PII or payout data | `client_invoice` schema does NOT include contractor fields |
| Contractor invoice contains no client-side pricing data | `contractor_invoice` schema uses contractor rate sheet, not client rate sheet |
| Admin review gate cannot be bypassed for client invoices | Status enum requires `admin_review_decision = approved` before `delivered` |
| Audit log records every invoice creation, approval, edit, delivery | All state transitions logged with actor + reason |
| Role-based access: contractors see only their own invoices; clients see only their own | Authorization layer (Phase 2+) |

---

## 5. Pay schedule integration

Contractor invoices generate per the assigned pay schedule (per `PROJECT_SOURCE.md` § 12.3):

- Pay schedule defines the billing period boundaries + generation day + payout processing day
- Default: Florida Ramp Weekly (Mon–Sun, generation Sunday 23:59)
- Per-contractor override possible

Only `approved` jobs from within the billing period are aggregated. Jobs already invoiced cannot be duplicated. Jobs pending review are excluded until approved.

---

## 6. Adjustments

Adjustments are admin-applied corrections:

- Positive (additional billing) or negative (rebate / correction)
- Reason required (free-text + category enum: `pricing_correction`, `trip_charge_correction`, `customer_concession`, `damage_credit`, `other`)
- Audit-logged

Adjustments only affect the contractor invoice OR the client invoice — not both unless explicitly applied to each independently.

---

## 7. Reusable prompt

`prompts/billing/generate-invoice-draft.prompt.md` defines the LLM-assisted invoice draft generation. Used primarily for:

- Generating the line-item narrative summary
- Detecting and flagging anomalies (e.g., line item count looks off, unit rate is unusual)
- Pre-filling the audit-reference description

The actual financial calculations are deterministic (math, not LLM-driven). The LLM is only for narrative + anomaly detection.

---

## 8. Failure handling

| Failure | Behavior |
|---|---|
| Job referenced is not yet `approved` | Skip the job; do NOT include in invoice; alert admin |
| Job has no line items | Block invoice generation for that job; flag for admin |
| Contractor has no payout method on file | Generate invoice but block delivery; alert admin |
| Rate sheet has no entry for a line item | Block invoice generation; flag for admin (new line item must be admitted to the rate sheet first) |
| PDF rendering fails | Retry with backoff; on persistent failure, alert admin |
| Email delivery fails | Retry with backoff; on persistent failure, surface to admin to retry manually |

---

## 9. Audit trail (required)

Every invoice has an append-only audit log:

```
event, event_at, event_by, event_details
```

Events tracked:

- `created`
- `admin_review_requested`
- `admin_approved`
- `admin_rejected`
- `admin_edited`
- `admin_held`
- `pdf_generated`
- `delivery_attempted`
- `delivery_succeeded`
- `delivery_failed`
- `delivered`
- `viewed` (Phase 2+ — tracking pixel or portal access log)
- `paid`
- `voided` (rare; admin-only)

---

## 10. Out of scope

- ❌ Direct payment processing (ACH, card-on-file) — invoice delivery, not payment execution
- ❌ Source-of-truth accounting (QuickBooks / Xero) — platform exports; accounting is downstream
- ❌ Payroll runs — payout breakdown produced; payroll execution is downstream
- ❌ Tax calculation / withholding — out of scope for Phase 1–2; explicitly admin-handled

---

## 11. Open questions for Audio

1. Confirm WillScot's contractual rate sheet location + cadence — paper, digital file, expected refresh.
2. Confirm WillScot invoice number format requirements (e.g., contractually mandated prefix or sequence).
3. Confirm whether WillScot AP requires CSV / XML / EDI in addition to PDF.
4. Confirm contractor pay method capture point (Phase 1 admin-onboarded, Phase 2+ contractor self-serve?).
5. Confirm 1099 generation responsibility — platform produces, or accounting system handles?
6. Confirm whether platform handles sales tax or pass-through only.
