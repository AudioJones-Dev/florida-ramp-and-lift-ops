# Samples — WillScot

**Purpose:** Sanitized example data illustrating the WillScot intake → canonical entity flow. Used for testing the parser, validating schemas, and onboarding new contributors.

---

## What's here

- `extracted-job-sanitized-example.json` — a synthetic example of the output the WillScot PDF parser would produce. All fields are fictional. No real customer data.

## What's NOT here (and never will be)

- ❌ Real WillScot work order PDFs
- ❌ Real customer names, addresses, contacts, phone numbers, or emails
- ❌ Real signatures or signed completion forms
- ❌ Real billing data

**Standing constraint:** No real customer PDFs or sensitive client documents ever land in this repo. Sample data is sanitized; real data lives in private storage per `PROJECT_SOURCE.md` § 16.

---

## Sanitization rules

The example data follows these rules:

1. **Names** are obviously fictional (e.g., "Jane Doe", "Example Account").
2. **Addresses** use Example Street numbering and real Florida cities (for zone mapping realism) but no real street addresses.
3. **Phone numbers** use the reserved 555 prefix per ITU recommendation (e.g., `+1-305-555-0123`).
4. **Emails** use the `example.com` reserved domain.
5. **Work order numbers** and SAP order numbers use prefixes like `WO-`, `SAP-`, `UNIT-` followed by sequential digits.
6. **Quantities and line items** mirror real WillScot canonical line items but in fictional combinations.
7. **Dates** are example dates, may be in the past or future.

---

## How to use

The example file can be:

- Validated against the schemas (`schemas/work-order.schema.json`, `schemas/job.schema.json`, `schemas/scope-line-item.schema.json`) for schema correctness
- Used as the expected output when testing the WillScot PDF parser (Phase 2+)
- Used as a teaching example for new contractors / admins to see the structure

If you find a field in the sample that isn't in the schema (or vice versa), it's a gap to close in the schema or sample — not a defect of the canonical entity.
