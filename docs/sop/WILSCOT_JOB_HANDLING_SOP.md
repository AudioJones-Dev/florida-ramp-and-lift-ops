# WILSCOT JOB HANDLING — SOP

**Audience:** Crews executing WillScot work; admins reviewing intake and approving billing.
**Purpose:** Make WillScot jobs predictable, billable, and well-documented end-to-end.

---

## 1. WillScot work order intake (admin / ops)

When a WillScot PDF arrives:

1. **Drop the PDF into the intake queue** (Phase 2: drag-drop into admin web app; Phase 1: route to the operations email and forward to processing).
2. **Run the PDF intake parser** (`docs/automation/PDF_INTAKE_PARSER_SPEC.md`).
3. **Review the extracted record.** The parser populates the Job + Work Order + Scope Line Items, but every field needs human verification — especially: work order number, SAP order number, product unit number, site address, contact info, scope line items + quantities.
4. **Resolve flagged fields.** If the parser flagged anything (missing required field, ambiguous line item name, unparseable address), resolve before promoting the record.
5. **Promote to `scheduled`** once verified and crew + date are assigned.

**Stop conditions for intake:**

- Required field missing AND not derivable from the PDF → flag for human input, do not promote.
- Line item name doesn't match the canonical list → flag for admin review (new line items must be admitted explicitly).
- Site address can't be geocoded → flag for human input, do not assign zone.

---

## 2. Pre-dispatch (admin / ops)

Before the job is dispatched to the crew:

1. **Confirm zone.** The zone engine auto-assigns from the site city; admin verifies for edge cases.
2. **Assign crew + date.** Pull from the contractor roster + their availability.
3. **Verify rate sheet.** Confirm the active rate sheet is the WillScot contractual one and applies to this job's line items.
4. **Generate dispatch summary.** Per `docs/automation/DISPATCH_SUMMARY_SPEC.md`. Includes safety + PPE + access notes.
5. **Notify the crew.** Crew receives dispatch summary by their preferred channel.

---

## 3. Crew execution (contractor)

When the crew arrives on-site:

1. **PPE check + site walkthrough + safety sign-off.** Per `SAFETY_REQUIREMENTS_SOP.md`.
2. **Confirm scope matches reality.** If the work order says one thing and the site shows another, document the discrepancy and call the lead. Do not silently change the scope.
3. **Execute the work.** Follow standard WillScot installation / knockdown procedures.
4. **Document as you go:**
   - Photo before
   - Photos during (critical steps)
   - Photo after
   - Voice notes for anything unusual (Phase 2+; in Phase 1, written notes)
   - Capture signed WillScot completion form (photo of paper is acceptable in Phase 1)
5. **Confirm signature.** Get the WillScot contact (or their on-site designee) to sign the completion form. Capture name, title, date.

---

## 4. Crew submission (contractor)

Once the work is done and the site is clean:

1. **Open the job in the platform** (Phase 1: standard job submission form; Phase 2: in-app PWA).
2. **Confirm scope line items.** The parser-extracted line items should match what was actually installed. Adjust quantities if field reality differed.
3. **Add any field-added scope.** If the crew added work not on the original work order (with admin approval), add as a new line item with a note explaining.
4. **Upload photos + signed completion form.**
5. **Add notes:** incomplete items, return-needed work, damage discovered, client requests, OSHA-relevant events.
6. **Submit.** Status moves from `in_progress` → `submitted`.

**Stop conditions for submission:**

- PPE check incomplete → cannot submit. Complete the safety record first.
- Site address mismatched (work was done at a different site than scheduled) → flag for admin; do not submit until resolved.
- Signed completion form absent AND no override note explaining why → flag and ask the lead.

---

## 5. Admin review of submission (admin)

For each submitted WillScot job:

1. **Review extracted vs. submitted line items.** Quantity adjustments are expected; major scope changes need explanation.
2. **Review photos.** Before + after + signed completion form must be present.
3. **Review safety record.** PPE check + sign-off must be present and the safety record must be complete.
4. **Review notes.** Any flagged items (incomplete, return-needed, OSHA, damage) get triaged here.
5. **Approve or request changes.**
   - Approve → status moves to `approved`; eligible for billing extraction.
   - Request changes → status moves back to `in_progress` or `pending_review` with comments.

**Do not approve a job with an incomplete safety record. Ever.**

---

## 6. Billing extraction (admin + automation)

Once approved:

1. **Contractor invoice generation** runs per the pay schedule (Florida Ramp Weekly: Sunday 11:59 PM by default). Includes line items at contractor rates, trip charges, splits, payouts. Auto-generated PDF; auto-delivered to contractor.
2. **WillScot client invoice generation** runs when admin triggers it. Includes line items at WillScot contractual rates, NO contractor data, NO splits. PDF rendered with branded header/footer + invoice number + audit reference. **Routed to admin review.** Admin approves / rejects / edits / holds.
3. **Admin approves the WillScot client invoice.** Approved invoices deliver as PDF via email to WillScot AP.

Full spec: `docs/automation/BILLING_EXTRACTION_SPEC.md`.

---

## 7. Closeout (admin)

Once both invoices are out:

1. **Update the Job status to `invoiced`.**
2. **Track delivery status.** Sent / delivered / viewed (Phase 2+ tracked automatically).
3. **Wait for contractor payment processing** per the pay schedule.
4. **Wait for WillScot payment** per their AP cycle.
5. **Once both are paid**, status moves to `paid`.

---

## 8. Handling exceptions

### 8.1 Incomplete jobs

Job submitted as `incomplete` (e.g., return trip needed for materials, weather, customer not present):

- Job stays `incomplete` until the return trip is completed.
- A return-trip job is created (new job, references the original via a `parent_job_id` field — to be added in schema if not present in current draft).
- Original job's line items remain associated with the original; new line items go on the return job.
- Trip charge: the return trip is charged independently per the zone engine.

### 8.2 Damage discovered on-site

If damage to existing customer property is discovered during the job:

- **Document immediately:** photos, written description, time.
- **Call the lead before continuing.** Do not negotiate with the customer.
- **Continue the job only if it's safe and the damage is isolated.**
- Damage is logged on the job's safety/notes record and reviewed by admin during approval.

### 8.3 Scope creep (customer requests additional work)

If the on-site customer requests work beyond the WillScot work order:

- **Do not perform unauthorized scope.**
- Note the request in the job notes.
- The customer must request additional scope through WillScot, not through the crew.
- If the lead approves field-added scope (rare), document the approval and add as a new line item with the approval reference.

### 8.4 Field conditions don't match the work order

If the work order says "ADA/IBC Switchback Ramp" but the site requires a straight ramp (or vice versa):

- **Do not silently change the scope.** Call the lead.
- The lead consults with WillScot if needed.
- The work order may be amended (new PDF arrives, intake reruns) OR a field-modification approval is documented.
- Update the Job's scope line items only after the lead approves.

---

## 9. Schema references

This SOP references fields defined in:

- `schemas/job.schema.json` — Job entity
- `schemas/work-order.schema.json` — Work Order entity (WillScot work order)
- `schemas/scope-line-item.schema.json` — Line items
- `schemas/client.schema.json` — Client (WillScot)
- `schemas/safety.schema.json` — Safety record
- `schemas/invoice.schema.json` — Both contractor and client invoices

---

## 10. Open questions for Audio

1. Confirm WillScot's AP delivery preference (direct email vs portal vs AP system upload).
2. Confirm the field-modification approval workflow (who approves on-site changes — lead? Florida Ramp admin? WillScot directly?).
3. Confirm whether incomplete jobs trigger any WillScot notification or just internal scheduling.
4. Confirm whether damage findings need to be reported to WillScot in addition to internal logging.
5. Confirm what happens to a job if the WillScot signature can't be obtained (e.g., contact not present; no designee on-site).
