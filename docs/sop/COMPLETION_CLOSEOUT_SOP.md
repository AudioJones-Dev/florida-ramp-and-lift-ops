# COMPLETION CLOSEOUT — SOP

**Audience:** Crews + admins.
**Purpose:** Standardize what "done" means for every Florida Ramp & Lift job — the field closeout, the submission closeout, and the billing closeout. Without explicit closeout discipline, jobs linger in indeterminate states and operational memory degrades.

---

## 1. Three closeout stages

Every job has three closeout points:

| Stage | Who | What |
|---|---|---|
| **Field closeout** | Crew on-site | Work physically complete, site cleaned, signature captured, photos taken |
| **Submission closeout** | Crew (post-site, may be same day) | Job report submitted in platform with all required fields populated |
| **Billing closeout** | Admin | Invoices generated, approved, delivered, statuses tracked to paid |

Each stage has its own checklist.

---

## 2. Field closeout (crew on-site)

Before the truck leaves the site, the crew lead confirms:

### 2.1 Work physically complete

- [ ] All scope line items per the work order are installed / serviced / delivered as scoped
- [ ] All field-added scope (with admin approval) is complete and documented
- [ ] Equipment is operational (test the ramp / lift / stair lift)
- [ ] Code-compliance items confirmed (ADA / IBC requirements where applicable)

### 2.2 Site cleaned

- [ ] All tools accounted for and stowed
- [ ] All hardware accounted for; no loose screws / staples / blades on site
- [ ] All packaging / debris removed
- [ ] Work area swept / vacuumed where applicable
- [ ] No trip hazards left for the customer

### 2.3 Customer briefed

- [ ] Customer / occupant briefed on safe use of installed equipment
- [ ] Maintenance / care instructions provided where applicable (especially VPL, stair lift)
- [ ] Customer aware of who to contact for warranty / service

### 2.4 Signature captured

- [ ] WillScot completion form signed (for WillScot jobs)
- [ ] Signature: name + title + date captured
- [ ] Photo of signed paper form OR digital signature captured

### 2.5 Photos captured

- [ ] Before photos (at least 2 angles)
- [ ] During photos for critical steps (at least 1)
- [ ] After photos (at least 2 angles)
- [ ] Photo of any incomplete / return-needed items if applicable
- [ ] Photo of any damage / OSHA notes if applicable

### 2.6 Stop-condition check

If any of these is true, the job is NOT field-closed:

- [ ] Work is incomplete (return trip needed)
- [ ] Safety record incomplete
- [ ] Signature not captured AND no admin override + reason
- [ ] Photos missing AND no admin override + reason
- [ ] Damage discovered, not yet documented

If any is true, the job moves to `incomplete` or `on_hold` and the lead is notified.

---

## 3. Submission closeout (crew, post-site)

Once back from the site (or while still on-site if connectivity allows), the crew submits the job report in the platform.

### 3.1 Required fields (cannot submit without)

- [ ] Job type
- [ ] Site address
- [ ] Crew members + split percentages (sum to 1.0)
- [ ] At least one scope line item
- [ ] Safety record with PPE check + sign-off
- [ ] Notes field (can be empty string; field must exist)

### 3.2 Recommended fields (should be present)

- [ ] Photos uploaded
- [ ] Signed completion form uploaded
- [ ] Voice notes (Phase 2+; in Phase 1, written notes in the notes field)
- [ ] Any damage / incomplete items flagged

### 3.3 Submission status

- Status moves from `in_progress` → `submitted`
- Submission timestamp is recorded
- Submitter (contractor) is recorded
- Submission goes to admin review

---

## 4. Admin review of submission (admin)

For each `submitted` job:

### 4.1 Review checklist

- [ ] Scope line items match work order (or field adjustments are documented)
- [ ] Photos present (before / after / signed form)
- [ ] Safety record complete (PPE check + sign-off + hazard review)
- [ ] Notes reviewed for incomplete / return-needed / damage / OSHA items
- [ ] Crew + split percentages valid
- [ ] Zone + trip charge classification looks correct

### 4.2 Decision

- **Approve** → status moves to `approved`; eligible for billing extraction.
- **Request changes** → status moves back to `in_progress` with admin comments; crew resubmits.
- **Hold** → status moves to `on_hold` with reason; admin follows up.

### 4.3 Stop conditions for admin approval

Do NOT approve a job if:

- Safety record is incomplete
- Required field is missing
- Photos are missing AND no documented override reason
- Scope line items can't be reconciled with the work order
- Damage or OSHA notes haven't been triaged

---

## 5. Billing closeout (admin + automation)

### 5.1 Contractor invoice generation

Triggered by the pay schedule (Florida Ramp Weekly: Sunday 11:59 PM by default):

- [ ] All `approved` jobs from the billing period are aggregated per contractor
- [ ] Trip charges, line items, splits computed
- [ ] Adjustments applied
- [ ] PDF generated with branded header/footer + invoice number + audit reference
- [ ] Delivered to contractor (email + SMS-linked secure portal)
- [ ] Delivery status tracked

### 5.2 WillScot client invoice generation

Triggered by admin per work order completion:

- [ ] WillScot contractual rate sheet applied (NOT contractor rate sheet)
- [ ] Contractor splits, payout calculations, internal fees stripped
- [ ] Line items + quantities + WillScot rates
- [ ] PDF generated with branded header/footer + invoice number + audit reference
- [ ] **Routed to admin review** — admin approves / rejects / edits / holds
- [ ] On approval: delivered to WillScot AP via email

### 5.3 Invoice closeout

- [ ] Contractor invoice marked delivered
- [ ] WillScot invoice marked delivered
- [ ] Job status moves to `invoiced`
- [ ] CRM record updated with invoice references

---

## 6. Payment closeout

### 6.1 Contractor payout

- [ ] Per pay schedule, contractor payouts process on the scheduled day
- [ ] Payout amount matches the contractor invoice
- [ ] Payout confirmation recorded
- [ ] Job's `paid_at` is set for the contractor side

### 6.2 WillScot payment

- [ ] WillScot processes the client invoice per their AP cycle
- [ ] Payment received and reconciled
- [ ] Job's `client_paid_at` is set
- [ ] Job status moves to `paid`

---

## 7. Exception handling at closeout

### 7.1 Job submitted but unresolved field issues

If the crew submits a job but admin review surfaces unresolved field issues (missing signature, missing photos, line item mismatch):

- Status moves back to `in_progress` with admin comments
- Crew has 48 hours to resolve (return trip if needed, additional documentation, admin escalation)
- If not resolved in 48 hours, job moves to `on_hold` and Florida Ramp & Lift admin owns triage

### 7.2 WillScot invoice rejected / disputed

If WillScot rejects or disputes an invoice:

- Admin pulls the original work order + crew submission + photos + signed form
- Admin engages WillScot AP / project contact to resolve
- If a line item is contested, document the resolution + final agreed amount
- Reissue the invoice if needed; track the reissue with a reference to the original
- Do NOT pay the contractor based on the disputed amount until resolution

### 7.3 Contractor payment dispute

If a contractor disputes their invoice / payout:

- Admin pulls the source data (jobs, line items, splits, trip charges)
- Walk through the calculation with the contractor
- If a real error is found, correct and reissue
- If no error, document the explanation
- All adjustments are tracked in an audit log

---

## 8. Closeout audit trail

Every closeout step is recorded in the Job's status history (append-only):

```
status, status_at, status_by, status_reason
```

Examples:

```
in_progress → submitted, 2026-05-28T14:30:00-04:00, contractor:audio, "Field work complete"
submitted → approved, 2026-05-28T16:15:00-04:00, admin:ops, "Reviewed, all clear"
approved → invoiced, 2026-06-01T00:00:00-04:00, system:weekly_invoice_generation
invoiced → paid, 2026-06-04T10:00:00-04:00, system:payment_confirmation
```

The status history is the operational memory of the job. It is never deleted, never edited in place.

---

## 9. Schema references

This SOP touches:

- `schemas/job.schema.json` — Job status + closeout fields
- `schemas/safety.schema.json` — Safety record (required for submission closeout)
- `schemas/invoice.schema.json` — Contractor + client invoices
- `schemas/work-order.schema.json` — Original work order (referenced during admin review)
