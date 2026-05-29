# WILSCOT AUTOMATION SCOPE

**Purpose:** Define the end-to-end WillScot PDF intake → structured job → dispatch → billing workflow. This is the highest-leverage automation in the platform because WillScot is the largest recurring client and the work order format is stable enough to parse reliably.

---

## 1. Why WillScot first

- **Volume:** WillScot work orders are the most frequent recurring client document.
- **Structure:** The PDF format is consistent across work orders (same fields, same line item names, same signature block).
- **Bilateral leverage:** Florida Ramp & Lift bills WillScot using WillScot's contractual rate sheet; WillScot expects invoices in a predictable format. Both directions benefit from structured intake.
- **Cycle time:** Manual intake of a WillScot work order today takes 10–20 minutes per document. Automation reduces that to a 1–3 minute review of a pre-extracted record.

If this workflow works for WillScot, it generalizes to Mobile Mini and other modular-services clients with similar work-order discipline.

---

## 2. Workflow overview

```
WillScot PDF arrives
        ↓
Phase 1 — Intake parser extracts canonical fields
        ↓
Admin review: validate extraction
        ↓
Job + Work Order + Scope Line Items created in canonical schemas
        ↓
Phase 2 — Job scheduled / assigned to crew
        ↓
Crew executes; submits job report (line items, photos, signatures, notes)
        ↓
Admin review: approve completion
        ↓
Phase 3 — Billing extraction generates BOTH:
   • Contractor invoice(s) — per-contractor split, trip charges, payout
   • WillScot client invoice — WillScot rate sheet, no contractor data exposed
        ↓
Admin review: approve client invoice
        ↓
Delivery: contractor invoices auto-deliver; WillScot invoice released on admin approval
```

Each transition is a gate. No transition happens silently.

---

## 3. Canonical WillScot work order fields

Source documents observed in real WillScot work orders contain a stable set of fields. The parser MUST extract these. They map directly into `schemas/work-order.schema.json` and `schemas/job.schema.json`.

| WillScot field | Canonical field | Required |
|---|---|---|
| Work Order Number | `work_order_number` | yes |
| SAP Order Number | `sap_order_number` | yes |
| Product Unit Number | `product_unit_number` | yes |
| Owner | `owner` | yes |
| Prepared For | `prepared_for` | yes |
| Prepared By | `prepared_by` | yes |
| Account | `account` | yes |
| Contact | `contact_name` | yes |
| Contact Title | `contact_title` | recommended |
| Phone | `contact_phone` | yes |
| Email | `contact_email` | yes |
| Site Address | `site_address` | yes |
| Product Family | `product_family` | yes |
| Description | `description` | yes |
| Start Date | `start_date` | yes |
| End Date | `end_date` | yes |
| Parts/Material line items | `scope_line_items[]` (name + quantity) | yes (one or more) |
| Signed By | `signed_by` | yes (post-completion) |
| Signature Date | `signature_date` | yes (post-completion) |

If a required field is absent from a WillScot PDF, the parser flags it for human review **before** creating the canonical records — not after.

---

## 4. Recurring WillScot line items (canonical names)

The line items below appear repeatedly across WillScot work orders. The parser maps free-text PDF descriptions to these canonical names (and surfaces any that don't match for human review).

| Canonical name | Typical context |
|---|---|
| Complex Return Haul | Pickup/return of complex / modular equipment |
| Complex Knockdown | Disassembly of a complex install |
| Standard Complex Knockdown | Standardized complex tier knockdown |
| ADA/IBC Steps | Code-compliant steps |
| ADA/IBC Switchback Ramp | Code-compliant switchback ramp configuration |
| Ramp Knockdown & Return | Ramp removal + return to WillScot |
| Aluminum Deck – 5ft × 5ft | Decking line item, sized |
| Window/Door Security Bundle | Security retrofit bundle |
| State Approved Building Plans | Plan-set deliverable |
| Foundation / Tiedown Plans | Plan-set deliverable |
| Ramp / Stair Plans | Plan-set deliverable |
| Return to Standard | Restoration of unit to standard configuration |
| Modification to Unit | Field modification |
| General Liability Insurance | Insurance pass-through line |
| Loss Damage Waiver | LDW pass-through line |

The complete WillScot rate sheet (with unit rates) is **NOT** committed to this repo. The rate sheet is contract-sensitive; it lives in the admin pricing config (Phase 2+).

---

## 5. Parser scope (Phase 1 — spec only)

The parser is specified here; implementation lands in Phase 2.

- **Input:** A WillScot PDF (one work order per file).
- **Output:** A draft Job + Work Order + Scope Line Items record matching the canonical schemas, in `pending` status.
- **Review gate:** No record is promoted to `scheduled` without human review of the extracted fields.
- **Failure handling:** If any required field is missing or ambiguous, the parser produces a flagged record + a list of fields requiring human input. It does not silently default missing values.

Full spec in `docs/automation/PDF_INTAKE_PARSER_SPEC.md`. Reusable extraction prompt in `prompts/extraction/wilscot-pdf-extraction.prompt.md`.

---

## 6. WillScot client invoice (the second invoice)

When Florida Ramp & Lift completes WillScot work, the platform generates a **second invoice** for WillScot. This is distinct from the contractor invoice.

| Property | WillScot client invoice |
|---|---|
| Issuer | Florida Ramp & Lift |
| Recipient | WillScot |
| Pricing source | WillScot contractual rate sheet (admin-configured, not committed to repo) |
| Contractor splits visible? | **No** |
| Contractor payout calculations visible? | **No** |
| Internal fee structures visible? | **No** |
| Admin review required? | **Yes** — admin approves / rejects / edits / holds before send |
| Format | PDF with branded header/footer + invoice number + audit reference |
| Delivery | Email (PDF attachment) |
| Archival | Stored for compliance / reporting |

Contractor invoices are auto-generated and auto-delivered per the pay schedule; client invoices ALWAYS require admin review before release.

---

## 7. Dispatch summary (Phase 2 deliverable)

When jobs are scheduled for a day, the platform generates a per-crew dispatch summary:

- All scheduled jobs for the crew that day, in expected sequence
- Site address, contact, ETA window
- Scope per job (line items + quantities)
- PPE requirements + job-specific hazards
- Special access notes
- Sign-off requirements (who signs, what to capture)

The generation prompt is in `prompts/dispatch/generate-dispatch-summary.prompt.md`. Spec is in `docs/automation/DISPATCH_SUMMARY_SPEC.md`.

---

## 8. Phase 1 deliverables (this repo)

- ✅ Canonical work order fields documented (this file)
- ✅ Canonical line item names documented (this file)
- ✅ WillScot Job Handling SOP (`docs/sop/WILSCOT_JOB_HANDLING_SOP.md`)
- ✅ PDF intake parser spec (`docs/automation/PDF_INTAKE_PARSER_SPEC.md`)
- ✅ Dispatch summary spec (`docs/automation/DISPATCH_SUMMARY_SPEC.md`)
- ✅ Billing extraction spec (`docs/automation/BILLING_EXTRACTION_SPEC.md`)
- ✅ JSON schemas for job / work order / scope line item / client / invoice (`schemas/`)
- ✅ Reusable extraction prompt (`prompts/extraction/wilscot-pdf-extraction.prompt.md`)
- ✅ Sanitized sample extraction (`samples/wilscot/extracted-job-sanitized-example.json`)

---

## 9. Phase 2+ deliverables (out of scope for this repo)

- PDF intake parser implementation
- Admin web app for review/approval
- Crew mobile PWA for submission
- WillScot rate sheet config UI
- Client invoice templating + PDF rendering
- Email + SMS delivery + delivery status tracking
- CRM pipeline + automation triggers
- Multi-tenant tenant management

---

## 10. Open questions for Audio

1. Confirm the canonical line item list — are there WillScot line items not yet observed?
2. Confirm whether WillScot SAP order number is always present on work orders, or only on certain product families.
3. Confirm the WillScot rate sheet source — paper contract? digital? expected refresh cadence?
4. Confirm whether WillScot invoices need any specific invoice number format (e.g., contractually mandated prefix).
5. Confirm WillScot invoice delivery channel — direct email? client portal? AP portal upload? all of the above?
6. Confirm whether WillScot expects machine-readable invoice data (CSV / XML / EDI) in addition to PDF.
