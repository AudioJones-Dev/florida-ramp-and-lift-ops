# PDF INTAKE PARSER — SPEC

**Status:** Phase 1 specification. Implementation lands in Phase 2.
**Purpose:** Extract canonical Job + Work Order + Scope Line Items from a WillScot work order PDF, with explicit validation, review gates, and failure handling.

---

## 1. Input contract

| Property | Value |
|---|---|
| Input type | PDF file |
| Expected content | A single WillScot work order |
| Source | WillScot operations email, admin upload, or future direct integration |
| Expected size | Typically < 5 MB |
| Expected pages | 1–10 (varies by line item count + plan-set attachments) |
| Languages | English |
| Required fields in source | See `docs/scope/WILSCOT_AUTOMATION_SCOPE.md` § 3 |

If the input is not a PDF, or is a multi-work-order document, or is a different client's format, the parser rejects with an explicit error code (see § 6 Failure handling).

---

## 2. Output contract

The parser produces a draft Job + Work Order + Scope Line Items record matching the canonical schemas in `schemas/`.

Top-level output structure:

```json
{
  "parser_run_id": "<uuid>",
  "parser_version": "0.1.0",
  "input_pdf_storage_url": "<ref>",
  "parsed_at": "<iso-8601-datetime>",
  "extraction_confidence": "<high|medium|low>",
  "draft_work_order": { /* matches schemas/work-order.schema.json */ },
  "draft_job": { /* matches schemas/job.schema.json, status: pending */ },
  "draft_scope_line_items": [ /* matches schemas/scope-line-item.schema.json */ ],
  "flags": [ /* see § 5 */ ],
  "human_review_required": true
}
```

- **`extraction_confidence`** is high/medium/low based on how many required fields were extracted cleanly without ambiguity. `low` always requires human review; `medium` strongly recommends; `high` still requires review but should be a fast scan.
- **`human_review_required`** is always `true` for Phase 1 — no record is promoted without admin review.
- **`flags`** is a list of explicit issues the parser surfaces for human attention.

---

## 3. Required field extraction

Per `docs/scope/WILSCOT_AUTOMATION_SCOPE.md` § 3, the parser MUST extract:

- `work_order_number`
- `sap_order_number`
- `product_unit_number`
- `owner`
- `prepared_for`
- `prepared_by`
- `account`
- `contact_name`
- `contact_phone`
- `contact_email`
- `site_address`
- `product_family`
- `description`
- `start_date`
- `end_date`
- `scope_line_items[]` (one or more, each with `name` + `quantity`)
- `contact_title` (recommended)

If any of the above is missing or ambiguous, the parser flags it.

---

## 4. Line item normalization

The parser maps free-text PDF line descriptions to canonical line item names (per `docs/scope/WILSCOT_AUTOMATION_SCOPE.md` § 4).

Mapping rules:

1. **Exact match** to a canonical name → use the canonical name.
2. **Near match** (case difference, whitespace variation, punctuation) → use the canonical name + log the mapping.
3. **Synonym / variant** (e.g., "ADA Switchback" → "ADA/IBC Switchback Ramp") → use the canonical name only if a maintained synonym table approves; otherwise flag.
4. **No match** → preserve the original free-text in a `raw_name` field, set canonical name to `null`, and flag.

The synonym table is itself a Phase 2 artifact (admin-maintained). For Phase 1, the parser only does exact + near match.

---

## 5. Flag taxonomy

The parser produces flags as structured objects:

```json
{
  "flag_id": "<uuid>",
  "severity": "blocker|warning|info",
  "field": "<canonical field name>",
  "raw_value": "<what the parser found>",
  "issue": "<short description>",
  "suggested_action": "<short admin action>"
}
```

Standard flag types:

| Flag | Severity | Description |
|---|---|---|
| `required_field_missing` | blocker | A required field was not found in the source |
| `required_field_ambiguous` | blocker | A required field was found but the value is ambiguous (e.g., two possible matches) |
| `line_item_no_canonical_match` | blocker | A line item description doesn't map to any canonical line item |
| `address_not_geocodable` | blocker | The site address can't be resolved to a city / zone |
| `date_format_unparseable` | blocker | A date field is in an unrecognized format |
| `contact_email_invalid` | warning | Contact email failed format validation |
| `contact_phone_invalid` | warning | Contact phone failed format validation |
| `extraction_confidence_low` | warning | Overall confidence is low; review every field |
| `signature_block_missing_on_pdf` | info | The signature block is absent — expected for new work orders (pre-completion); flagged for awareness |
| `multi_page_pdf` | info | Multi-page PDF — verify all pages were considered |

Blocker flags prevent promotion to `scheduled` until resolved. Warning flags are surfaced but allow promotion. Info flags are notes.

---

## 6. Failure handling

### 6.1 Input rejection (not a parseable WillScot work order)

- Not a PDF → reject with `error: input_not_pdf`
- PDF parseable but no WillScot-recognizable fields → reject with `error: input_not_willscot_work_order`
- Multi-work-order PDF → reject with `error: input_multi_work_order` (admin must split)
- Encrypted / password-protected PDF → reject with `error: input_encrypted`
- Empty / corrupt PDF → reject with `error: input_unreadable`

Rejected inputs are stored with the error code and a reason; admin gets a notification to triage.

### 6.2 Partial extraction

If the parser extracts SOME fields but blocker flags exist, the parser:

- Still produces the draft record
- Marks `human_review_required = true`
- Lists all blocker flags
- Does NOT auto-promote
- Returns to admin queue

The platform does NOT silently default missing values. If `start_date` can't be parsed, the parser does not pick "today" — it flags.

### 6.3 Confidence thresholds

- **High confidence:** All required fields extracted unambiguously; all line items mapped to canonical names; address geocodes cleanly; dates parse. Fast review.
- **Medium confidence:** All required fields extracted but one or more line items required near-match mapping, OR a warning-severity flag is present. Slower review.
- **Low confidence:** Any blocker flag, OR multiple warnings, OR overall extraction noisy. Full review.

---

## 7. Review gates

Phase 1 review gate (single): Admin reviews every parsed record before promoting from `pending` to `scheduled`.

Phase 2+ review gates:

- Auto-promote on high-confidence + zero flags → optional, admin-configurable per tenant
- Auto-flag-and-route on medium-confidence → standard
- Full review on low-confidence → always

**No phase ever auto-promotes a job without admin review for the first 90 days of platform operation.** This is a doctrine, not a config.

---

## 8. Reusable extraction prompt

The parser's LLM extraction is driven by `prompts/extraction/wilscot-pdf-extraction.prompt.md`. The prompt:

- Names the canonical field set
- Names the canonical line item list
- Specifies the output JSON structure
- Specifies confidence calibration rules
- Specifies what to flag vs what to extract silently

The prompt is the contract between the human reviewer and the LLM. Changes to the prompt require admin approval and are versioned.

---

## 9. Validation

After the LLM produces draft output, the parser validates against the JSON schemas:

- `schemas/work-order.schema.json`
- `schemas/job.schema.json`
- `schemas/scope-line-item.schema.json`

Schema validation failures become blocker flags. The LLM extraction is the upstream; schema validation is the downstream gate.

---

## 10. Telemetry

The parser logs per-run:

- Parser version
- Prompt version
- Input PDF storage URL
- Confidence score
- Flag count + severity distribution
- Admin review outcome (approved as-is / approved with edits / rejected)
- Time-to-review

These become the parser performance metrics that drive Phase 3+ accuracy improvements.

---

## 11. Out of scope (NOT in this parser)

- ❌ Other clients' work order formats (Mobile Mini etc.) — separate parser per client format
- ❌ Free-text job intake (email / SMS) — different intake mode
- ❌ Multi-work-order PDFs — admin splits manually
- ❌ Signature verification — out of scope; the parser extracts the signature field but doesn't verify the signature
- ❌ Auto-correction of extracted values — the parser flags; humans correct

---

## 12. Open questions for Audio

1. Confirm the synonym table approach for line items — admin-maintained list, or canonical list locked?
2. Confirm whether multi-work-order PDFs are common (some WillScot accounts batch multiple WOs per file).
3. Confirm confidence threshold defaults — auto-promote threshold for Phase 2+?
4. Confirm parser provider — pure LLM (Claude / GPT-4o) or hybrid OCR + LLM (better on scanned PDFs)?
5. Confirm storage for source PDFs — Cloudflare R2? S3? Local-only for Phase 1?
