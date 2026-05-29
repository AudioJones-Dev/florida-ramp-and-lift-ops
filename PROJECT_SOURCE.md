# PROJECT_SOURCE.md — Florida Ramp & Lift Operations Intelligence

**Owner:** AJ Digital LLC / Audio Jones
**Repo:** `AudioJones-Dev/florida-ramp-and-lift-ops`
**Internal system name:** **FLR Dynamic Contractor Billing Engine**
**Project type:** Internal Operations Platform
**Status:** Phase 1 — Documentation foundation. Do not deploy.
**Target platforms (Phase 2+):** mobile-first PWA, iOS/Android responsive, future native wrapper optional.

---

## 1. Business thesis

Florida Ramp & Lift is a field-operations company executing high-volume, geographically distributed accessibility installations and modular project support — primarily ramp installs, VPL installs, stair lifts, complex knockdowns/return hauls, modular building modifications, and recurring WillScot / Mobile Mini workflows across Florida.

The business runs on:

- Two-person field crews (occasionally three-person for complex work)
- Tightly scheduled multi-job days
- Per-zone trip pricing
- Variable team payout splits
- Sign-off-driven client documentation (especially WillScot work orders)
- Recurring, structured rate sheets with named line items

The current operational reality is that **the work is real and recurring, but the operational data is fragmented**: jobs are reported inconsistently, invoices are calculated manually, contractor payouts are computed by hand, and post-job documentation (photos, signatures, notes) lives in scattered phones and email chains. This produces:

- Manual invoice calculation overhead
- Billing delays
- Contractor payout confusion
- Missing operational records
- No searchable historical job database
- No structured field intelligence layer that AJ Digital can compound across engagements

This repo is the structural answer.

---

## 2. The operational problem (precise statement)

Three failure modes recur:

1. **Field-to-billing data loss.** Crews execute the work; the data required to bill that work (line items, quantities, signatures, photos, zone, trip charge eligibility) doesn't reliably reach the back office in a structured format.
2. **Manual billing arithmetic.** Trip charges, zone supplements, split-payout calculations, and rate-sheet lookups are recomputed by humans every cycle. Errors compound; cycle times slip.
3. **No operational memory.** Each job vanishes from working memory once paid. No searchable history of what was installed, when, by whom, with what materials, under what conditions. No compounding intelligence layer.

The platform must convert each completed job into structured, queryable, automation-ready operational data **without forcing the contractor to do billing math in the field**.

---

## 3. Core product principle

> Contractors should only answer: **"What happened on the job?"**

The system computes everything else:

- Pricing per line item via the active rate sheet
- Trip charges via the zone engine
- Split calculations via the team payout config
- Invoice totals
- Payout breakdowns
- CRM record updates

If the contractor has to do mental arithmetic to submit a job, the system has failed.

---

## 4. Priority workflow (highest leverage first)

In strict priority order, the highest-leverage workflows are:

### 4.1 WillScot PDF intake → structured job (Phase 1 + 2)

WillScot work orders arrive as PDFs. They follow a recurring structure with predictable fields (work order number, SAP order number, product unit number, owner, prepared-for/by, account, contact, contact title, phone, email, site address, product family, description, start date, end date, parts/material line items, quantities, signed by, signature date).

The PDF intake parser turns this into a canonical Job + Work Order + Scope Line Items record. This is the **highest leverage automation** because WillScot is the largest recurring client and the format is stable.

See `docs/automation/PDF_INTAKE_PARSER_SPEC.md` and `prompts/extraction/wilscot-pdf-extraction.prompt.md`.

### 4.2 Dispatch summary generation (Phase 2)

Once jobs are scheduled for a day, a dispatch summary is generated for each crew — jobs, addresses, ETAs, scope per job, PPE requirements, materials needed, sign-off requirements, special access notes.

See `docs/automation/DISPATCH_SUMMARY_SPEC.md`.

### 4.3 Billing extraction → contractor invoice + WillScot invoice (Phase 2)

Once jobs are completed and approved, the billing extraction produces:

- **Contractor invoices** (per-contractor, with split-payout calculations, trip charges, adjustments)
- **WillScot client invoices** (issued by Florida Ramp & Lift to WillScot, with WillScot's contractual rate sheet, no contractor split visible)

Both as PDF. Both with audit references. Admin review before client invoice release.

See `docs/automation/BILLING_EXTRACTION_SPEC.md`.

### 4.4 Safety checklist generation (Phase 1)

For each job, generate a job-specific safety checklist including PPE requirements (steel-toed boots, actual safety glasses not sunglasses or corrective lenses, gloves), task-specific hazards, and human review requirements.

See `prompts/safety/generate-job-safety-checklist.prompt.md` and `docs/sop/SAFETY_REQUIREMENTS_SOP.md`.

---

## 5. System boundaries

**In scope for this repo (Phase 1):**

- Canonical entity definitions and JSON Schemas
- Operational SOPs the crew can execute today, without any app
- Automation specs that define input contracts, output contracts, validation, review gates, failure handling
- Reusable AI prompts for the four canonical automations
- Sanitized sample data illustrating WillScot intake

**In scope for the broader system (Phase 2+, NOT built here):**

- Mobile-first PWA for contractors
- Admin web app for review / approval / pricing override
- CRM pipeline (job submissions become CRM records and trigger automations)
- File/media storage (Cloudflare R2 or S3-compatible)
- Multi-tenant invoice management (contractor vs WillScot invoice separation)
- Pay schedule engine (configurable weekly/bi-weekly/monthly cycles)
- AI voice transcription (Whisper) for field voice notes
- Automation layer (n8n / Temporal / Trigger.dev / webhooks)

**Out of scope for the AJ Digital engagement (handled by the client or downstream system):**

- Source-of-truth accounting (QuickBooks / Xero / etc.) — the platform exports to accounting, doesn't replace it
- Payroll runs — the platform produces payout breakdowns; payroll execution is downstream
- ACH / payment rails — invoice delivery, not payment processing
- Client-side WillScot software — Florida Ramp & Lift is the vendor to WillScot, not integrating with WillScot's internal systems

---

## 6. Core entities

The canonical operational ontology (mirrored in `schemas/` as JSON Schema 2020-12):

| Entity | Owner | Role |
|---|---|---|
| **Job** | Florida Ramp & Lift | The unit of field work. Every workflow flows through this entity. |
| **Client** | Florida Ramp & Lift | The party paying for the job (WillScot, Mobile Mini, end customer, etc.). |
| **Work Order** | Client | The client-issued document authorizing the job (e.g., WillScot work order PDF). |
| **Scope Line Item** | Client | A billable line on the work order (e.g., "ADA/IBC Switchback Ramp"). |
| **Safety Record** | Florida Ramp & Lift | The PPE check + job-specific hazard checklist + sign-off per job. |
| **Invoice** | Florida Ramp & Lift | Either a contractor invoice (with payout split) or a client invoice (e.g., to WillScot). |

Each entity has a canonical schema in `schemas/`. The Universal Job Object (`docs/scope/UNIVERSAL_JOB_OBJECT.md`) is the operational hub.

---

## 7. Tenancy model

The platform is **multi-tenant by design** even though Florida Ramp & Lift is the first tenant.

- **Florida Ramp & Lift** is the operating tenant.
- **WillScot** is the first major client tenant. The pricing, billing rules, invoice templates, and approval workflows are WillScot-specific.
- Future enterprise client tenants (Mobile Mini, others) follow the same pattern with their own rate sheets, billing rules, and templates.
- **Contractor-facing financial data is separated from client-facing financial data.** Contractors see their splits; clients see only the billable scope at client rates.

The schemas reflect this separation; the automation specs respect it; the SOPs enforce it.

---

## 8. Roles

| Role | Capabilities | Tier |
|---|---|---|
| **Contractor** | Log completed jobs, upload photos, upload work orders, submit notes, submit incomplete / return-needed jobs, review payout estimates | Field |
| **Admin / Operations** | Review submissions, override pricing, approve invoices, manage contractors, manage split structures, manage zones, export invoices, trigger CRM workflows | Internal |
| **Accounting (future)** | Read-only access to invoices, export to accounting system, reconcile payouts | Internal |

---

## 9. Team structure logic

Jobs are typically completed by **2-person teams**. The platform supports:

- Fixed team pairings (e.g., Audio + David)
- Variable team pairings
- Variable payout splits per pairing (60/40, 70/30, 50/50, etc.)
- Dynamically adding/removing team members per job
- Optional 3-person crews for complex work

Split percentages are configurable per team pairing and can be overridden per-job with admin approval.

---

## 10. Zone pricing engine

Trip charges are computed via a Zone Pricing Engine. Zones group geographies; first-job-in-zone is one charge, subsequent same-day same-zone jobs are a reduced charge.

| Zone | First job charge | Additional same-day / same-zone |
|---|---|---|
| Zone 1 | $75 | $50 |
| Zone 2 | $150 | $100 |
| Zone 3 | $200 | $150 |
| Zone 4 | TBD | TBD |

**Regional mapping (initial — to be validated against operational reality):**

- **East Coast Zone 2:** Port St. Lucie, Okeechobee, Jupiter, Vero, Fort Pierce, West Palm, Belle Glade
- **East Coast Zone 3:** Melbourne
- **West Coast Zone 2:** Fort Myers, Naples, Sanibel, Altamonte Springs
- **South Florida Zone 1:** Homestead, Miami, Fort Lauderdale, Pembroke Pines, South Bay
- **South Florida Zone 2:** Key Largo
- **South Florida Zone 3:** Marathon
- **South Florida Zone 4:** Key West

Detection rule: if N jobs are submitted by the same crew on the same date in the same zone, the first gets the first-job charge and subsequent jobs get the additional-same-day rate.

---

## 11. Invoice calculation formulas

### 11.1 Job total

```
Job Total = Σ (line item rate × quantity)
          + Trip Charges (per zone engine)
          + Approved Surcharges
          + Approved Add-ons
          + Approved Extras
```

### 11.2 Team split

```
Contractor A payout = Job Total × split_pct_A
Contractor B payout = Job Total × split_pct_B
(split_pct_A + split_pct_B = 1.0)
```

### 11.3 AJ Digital tracking split (operating overlay)

```
AJ Digital share  = Invoice Total × 0.40
Operating partner = Invoice Total × 0.60
```

This is a separate operating-side accounting overlay; it is not exposed to contractors or clients.

---

## 12. Multi-tenant invoice management (forward-looking, Phase 2+)

Two invoice classes:

### 12.1 Contractor invoices

- Auto-generated after invoice calculation
- Include job details, splits, fees, trip charges, adjustments, payout
- Delivered as PDF via email + SMS-linked secure portal
- Contractors access historical invoices through portal
- Delivery status tracked (sent / delivered / viewed)

### 12.2 WillScot client invoices

- Issued **by** Florida Ramp & Lift **to** WillScot
- Driven by WillScot's contractual rate sheet (separate from contractor pricing)
- **No contractor splits, payout calculations, or internal fee structures appear**
- Routed to admin review before release
- Admin approves / rejects / edits / holds prior to send
- Approved invoices delivered as PDF via email

### 12.3 Pay schedule engine (Phase 2+)

Configurable contractor pay schedules:

- Multiple pay schedules per tenant
- Weekly / bi-weekly / monthly / custom periods
- Admin-assigned per contractor or contractor group
- Configurable invoice generation days + payout processing days
- Override schedules as needed

**Florida Ramp default:**

| Schedule Name | Billing Period | Invoice Generation |
|---|---|---|
| Florida Ramp Weekly | Monday–Sunday | Sunday 11:59 PM |
| Contractor Weekly | Monday–Friday | Sunday |
| Custom Schedule | Admin Defined | Admin Defined |

Standard billable work week is Monday–Friday; Saturday work may be included if completed before cutoff. Only approved/submitted jobs are included; already-invoiced jobs cannot be duplicated.

---

## 13. AI voice transcription (Phase 2+ scope)

Field voice capture reduces typing friction:

- Record voice notes directly inside job submissions
- Whisper-transcribed → attached to job record
- Caption generation for uploaded photos/videos
- Voice-to-form parsing into structured submission fields (ramp size, platform count, step count, location, team, completion status)
- Searchable transcripts in CRM and reporting

Recommended stack (forward-looking, not provisioned in Phase 1):

| Feature | Service |
|---|---|
| Speech-to-Text | OpenAI Whisper API |
| Structured Parsing | GPT-4o / function calling |
| Caption Rendering | FFmpeg / Cloudinary |
| Media Processing | Trigger.dev / Temporal |
| Search Indexing | pgvector / embeddings |

---

## 14. Build philosophy

The platform functions as:

- **Operational memory** for Florida Ramp & Lift
- **Contractor reporting infrastructure**
- **Structured field intelligence**
- **Future automation backbone**
- **AI-ready operational database**

This is not just an invoice calculator. It is the foundation of a field operations intelligence system that compounds across every job executed.

---

## 15. Open questions (for Audio to resolve before Phase 2)

1. Confirm zone boundaries against actual job history — current zone mapping is initial; needs validation against real dispatch records.
2. Confirm contractor roster + canonical team pairings + default split percentages.
3. Confirm WillScot contractual rate sheet — current line-item list is from observed work orders; need WillScot-authorized rate sheet for client invoicing.
4. Confirm whether contractor invoice SMS delivery is acceptable (PII/secure-link considerations).
5. Confirm pay schedule defaults — Florida Ramp weekly Mon–Sun + Sunday 11:59 PM generation: acceptable starting position?
6. Confirm whether AI voice transcription is a Phase 2 deliverable or Phase 3+.
7. Confirm storage choice for media (Cloudflare R2 vs S3 vs other).
8. Confirm CRM target — what system are jobs piped into (HubSpot? a custom Florida Ramp CRM? n8n-orchestrated multi-CRM?).
9. Confirm whether the AJ Digital 40/60 operating split is a real internal accounting overlay or example only.
10. Confirm whether Mobile Mini is in scope as a near-term second client tenant.

These are the load-bearing decisions that shape Phase 2 implementation.

---

## 16. Standing constraints

- No real customer PDFs, signatures, or sensitive client documents in this repo, ever.
- No automated final approval of invoices, billing submission, or client communication without explicit human review gate.
- Treat all construction-site work as safety-sensitive — PPE checks and human review are non-negotiable.
- No Firebase. No cloud infra in Phase 1. No app framework in Phase 1.
- No fabricated operational claims — every zone, line item, and rate cited in this repo must be sourced from real observed work orders or marked clearly as TBD.
