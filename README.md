# Florida Ramp & Lift — Operations Intelligence Repo

**Owner:** AJ Digital LLC / Audio Jones
**Repo:** `AudioJones-Dev/florida-ramp-and-lift-ops`
**Status:** Frozen planning/reference source — no runtime development or deployment
**Internal system name:** **FLR Dynamic Contractor Billing Engine**

---

## Purpose

This repo preserves the operational-intelligence planning foundation and
mock/manual scaffold created for Florida Ramp & Lift. It is a source of reviewed
concepts, workflows, SOPs, schemas, prompts, fixtures, and historical delivery
evidence.

The canonical Tier 4 application is now
`AudioJones-Dev/FRL-CONTRACTOR-PORTAL`, the AJ Digital FieldOps Platform with
Florida Ramp & Lift as its first tenant. See
[`docs/governance/SOURCE_REPO_FREEZE.md`](docs/governance/SOURCE_REPO_FREEZE.md).

Phase 1 began as a documentation-first foundation. The current repo now includes an initial mock/manual Next.js scaffold for the MVP shell while keeping live integrations, production data, secrets, and database connections out of scope.

The documentation foundation includes:

- Canonical scope and entity definitions (`docs/scope/`)
- Field-ready SOPs (`docs/sop/`)
- Specs for the highest-leverage automations (`docs/automation/`)
- Crew onboarding + safety training docs (`docs/training/`)
- JSON Schemas for the canonical operational entities (`schemas/`)
- Reusable AI prompts for extraction, dispatch, billing, and safety (`prompts/`)
- Sanitized sample data illustrating the WillScot intake (`samples/`)

No further runtime build proceeds in this repository. Useful source concepts
must be reconciled and implemented through separately approved specifications in
the canonical platform repository.

## Deployment freeze

- This repository owns no production runtime or live application hostname.
- `ops.floridarampandliftops.com` has no application DNS record and is reserved
  pending a separate canonical-platform decision.
- Historical Clerk/Vercel setup and delivery records are retained as evidence,
  but no preview or production deployment is authorized here.
- Existing apex, `www`, `admin`, `contractor`, `client`, and `platform` hosts
  remain owned by the canonical Render-backed platform.
- No files, Git history, provider state, or existing PRs are removed by the
  freeze.

---

## Phase 1 scope (this commit)

- Define the **Universal Job Object** — the canonical entity every workflow flows through.
- Capture the **Data Dictionary** — every operational field in plain English.
- Lock the **WillScot automation scope** — PDF intake parser + dispatch + billing.
- Establish **safety, WillScot job handling, and completion-closeout SOPs** crews can actually use on-site.
- Specify the **PDF intake parser, dispatch summary generator, and billing extraction** automations (input → output → validation → review gates → failure handling).
- Onboard apprentices and crews with explicit role expectations + PPE checklists.
- Ratify **JSON Schemas** for job / client / work-order / scope line item / safety / invoice.
- Stage **AI prompts** for the four canonical automations.

---

## Non-goals (explicitly out of scope for Phase 1 and production operations)

- ❌ No Firebase
- ❌ No cloud infrastructure provisioning
- No production application behavior beyond the mock/manual Next.js scaffold.
- No real customer PDFs or sensitive client documents committed.
- No invented operational claims, live operational metrics, fake zones, or fake roster.
- No automated final approval of invoices, billing submission, or client communication without human review.
- No ungated production operations deployment.
- No live third-party writes, persistence, storage, customer file ingestion, CRM/accounting sync, email/SMS sending, PDF generation, or runtime AI.

---

## Historical Phase 2+ planning (not built here)

These concepts remain preserved in `docs/scope/` and `PROJECT_SOURCE.md` as
source material. They are not a roadmap for runtime work in this repository.

| Phase | Focus |
|---|---|
| 2 | Contractor profiles, job intake PWA, dynamic billing engine, invoice calculator, admin review |
| 3 | CRM integration, automation triggers, payout exports, analytics dashboard, multi-tenant billing |
| 4 | AI voice transcription (Whisper), AI operational review, dispatch optimization, predictive billing |
| 5 | Full operations OS — scheduling, inventory, installer scoring, payroll integrations |

---

## Repo structure

```
.
├── README.md                       ← this file
├── PROJECT_SOURCE.md               ← business thesis + system boundaries
├── docs/
│   ├── scope/
│   │   ├── WILSCOT_AUTOMATION_SCOPE.md
│   │   ├── UNIVERSAL_JOB_OBJECT.md
│   │   └── DATA_DICTIONARY.md
│   ├── sop/
│   │   ├── SAFETY_REQUIREMENTS_SOP.md
│   │   ├── WILSCOT_JOB_HANDLING_SOP.md
│   │   └── COMPLETION_CLOSEOUT_SOP.md
│   ├── automation/
│   │   ├── PDF_INTAKE_PARSER_SPEC.md
│   │   ├── DISPATCH_SUMMARY_SPEC.md
│   │   └── BILLING_EXTRACTION_SPEC.md
│   └── training/
│       ├── APPRENTICE_ONBOARDING.md
│       ├── CREW_ROLE_EXPECTATIONS.md
│       └── TOOL_AND_PPE_CHECKLIST.md
├── schemas/
│   ├── job.schema.json
│   ├── client.schema.json
│   ├── work-order.schema.json
│   ├── scope-line-item.schema.json
│   ├── safety.schema.json
│   └── invoice.schema.json
├── prompts/
│   ├── extraction/wilscot-pdf-extraction.prompt.md
│   ├── dispatch/generate-dispatch-summary.prompt.md
│   ├── billing/generate-invoice-draft.prompt.md
│   └── safety/generate-job-safety-checklist.prompt.md
└── samples/
    └── wilscot/
        ├── README.md
        └── extracted-job-sanitized-example.json
```

---

## How to read this repo

1. **Start with `PROJECT_SOURCE.md`** — the thesis, the operational problem, the system boundaries.
2. **Then `docs/scope/UNIVERSAL_JOB_OBJECT.md`** — every workflow flows through this entity.
3. **Then `docs/scope/WILSCOT_AUTOMATION_SCOPE.md`** — the highest-value workflow.
4. **Then `docs/sop/*`** — practical, checklist-oriented, field-friendly.
5. **Then `docs/automation/*` and `schemas/*`** — input/output/validation contracts for each automation.
6. **Then `prompts/*`** — reusable AI prompts that consume the schemas.

---

## Doctrine alignment

This repo is governed by the AJ Digital canonical doctrine layer (business
memory lives outside this repo). Repo-local operating rules live in `AGENTS.md`,
child `AGENTS.md` files, and `docs/system/`. Feature, integration, and deployment
work does not resume here unless the operator explicitly supersedes the
source-repo freeze.

---

## Standing constraints (do not violate)

- No real customer PDFs or sensitive documents in this repo, ever.
- No automated final approval of billing, invoicing, or client communication without explicit human review gate.
- Treat all construction-site work as safety-sensitive — PPE checks and human review are non-negotiable.
- No Firebase, cloud infrastructure provisioning, provider setup, preview or
  production deployment, or production behavior from this repository.
