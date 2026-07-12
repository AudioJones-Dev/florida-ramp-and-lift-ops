# Florida Legal And Privacy Doctrine

Status: Preserved planning doctrine; source-repo runtime/pilot frozen 2026-07-12
Scope: Florida-law legal/privacy source material for canonical-platform reconciliation
Runtime impact: None
Implementation status: Documentation only; not legal advice; attorney/operator review is required before public legal-policy publication or real data collection

> Current repository posture is controlled by
> [`../governance/SOURCE_REPO_FREEZE.md`](../governance/SOURCE_REPO_FREEZE.md).
> This repo has no live application hostname or upcoming pilot. Any useful legal
> doctrine must be reconciled and reviewed in the canonical platform repo before
> publication or use.

## Purpose

This document preserves legal and privacy source material prepared for the
former `florida-ramp-and-lift-ops` pilot path. It gives agents and operators a
conservative planning reference for company identity, domain boundaries,
privacy posture, Florida-law duties, and human approval gates. It does not
authorize runtime or delivery work in this repository.

This document does not create Terms of Service, a Privacy Policy, customer
notices, consent language, or a legal opinion. Those remain attorney-review
artifacts before publication.

## Current Scope

Facts:

- The legal operator is Florida Ramp and Lift LLC, listed by the Florida
  Division of Corporations as an active Florida limited liability company under
  document number `L21000045624`.
- This repository's internal-pilot path is frozen. It owns no live application
  hostname and has no next deployment milestone.
- The canonical Tier 4 runtime is `AudioJones-Dev/FRL-CONTRACTOR-PORTAL`; legal
  material from this doc requires reconciliation and attorney/operator review
  before use there.
- `floridarampandlift.com` remains the front-facing marketing site.
- The internal pilot is not approved to ingest real customer data, customer
  files, private rate sheets, signed documents, payment credentials, live
  integrations, persistent records, or production automation.

Inferences:

- Florida law is the default state-law frame for repo-local privacy/security
  doctrine because the legal operator is a Florida LLC and operates from
  Florida.
- The ops platform will eventually touch sensitive operational data because
  ramps, lifts, site access, accessibility needs, job photos, location details,
  invoices, and signatures can reveal personal, disability, medical-context,
  financial, or safety-sensitive information.

Assumptions to verify before publication:

- Counsel has not yet approved final Terms, Privacy Policy, consent language,
  data-retention rules, or breach-notification scripts for either domain.
- No attorney has determined whether future processing creates additional
  federal, Florida, contractor, insurer, Medicare/Medicaid, HIPAA, ADA, or
  local permitting obligations.

## Source-Of-Truth Boundaries

- This doc owns repo-local legal/privacy doctrine and gates.
- `docs/delivery/DEPLOYMENT_TARGET.md` owns deployment target, domain, env,
  preview, production, and rollback gates.
- `docs/architecture/implementation-readiness-gate.md` owns production
  readiness and go/no-go criteria.
- `docs/quality/SECURITY.md` owns security-planning posture.
- `docs/guardrails/` owns human approval constraints.
- Public Terms, Privacy Policy, cookie/analytics notice, consent copy, and
  customer-facing notices require a separate approved legal-copy branch.

## Domain And URL Doctrine

Legal identity:

- Use `Florida Ramp and Lift LLC` as the legal company name in doctrine and
  future public legal copy unless counsel specifies another exact style.
- Use `L21000045624` only as the public Florida Division of Corporations entity
  identifier when a document number is needed for disambiguation.
- Do not commit FEI/EIN, registered-agent address, principal address, private
  phone numbers, or private legal-contact details into repo docs unless the
  operator and counsel explicitly approve.

Domain boundary:

- `https://floridarampandlift.com` is the public marketing-site surface.
- `https://floridarampandliftops.com` is the internal operations and
  client-ops surface.
- The ops app must not point Terms/Privacy links to marketing-site legal pages
  unless the operator and counsel confirm those pages cover the ops platform's
  account, job, contractor, client, data-retention, and security posture.

Required future ops-app legal URLs:

- `https://floridarampandliftops.com/privacy`
- `https://floridarampandliftops.com/terms`

These URLs are doctrine requirements only. They do not imply routes or pages
exist yet.

## Florida Law Baseline

### FIPA Security And Breach Baseline

Florida Statutes section 501.171 defines a covered entity broadly as a
commercial entity that acquires, maintains, stores, or uses personal
information. Treat Florida Ramp and Lift LLC as needing a FIPA-ready security,
disposal, and breach-response baseline before any real personal information is
stored in the ops platform.

Doctrine:

- Take reasonable measures to protect electronic personal information.
- Do not collect real personal information in the pilot until storage,
  authorization, retention, deletion, and incident-response controls are
  accepted.
- If a breach affects 500 or more Florida individuals, prepare notice to the
  Florida Department of Legal Affairs within the statutory window.
- Notify affected individuals within the statutory window unless a lawful delay
  or waiver applies.
- Require third-party processors to notify Florida Ramp and Lift LLC promptly
  and no later than the statutory third-party-agent window after determining or
  having reason to believe a breach occurred.
- Dispose of customer records containing personal information by shredding,
  erasing, or otherwise making the information unreadable or undecipherable
  when the records no longer need to be retained.

Operational gate:

- No production personal-data storage until a breach-response owner, processor
  contact list, incident log, retention schedule, and disposal path are
  accepted.

### Florida Digital Bill Of Rights Alignment

Florida Statutes part V of chapter 501 includes privacy notice, consumer-rights,
data-protection-assessment, and sensitive-data rules. The statutory definition
of `controller` is thresholded and may not apply to Florida Ramp and Lift LLC
under the current project posture. Counsel must confirm applicability before
the company relies on a non-applicability position.

Voluntary operating standard:

- Maintain a clear privacy notice for the ops domain before real data is
  collected.
- Describe categories of data processed, purposes, sharing categories,
  third-party categories, request methods, and appeal/request-review flow.
- Offer a practical request path for access, correction, deletion, portability,
  and opt-out requests when real data exists, even if not strictly required by
  the thresholded statute.
- Do not sell personal data.
- Do not use ops-platform data for targeted advertising.
- Do not collect or process sensitive data, precise geolocation, voice/facial
  recognition data, biometric data, customer files, or medical-context records
  without explicit operator approval, security design, and counsel review.
- Conduct a documented data-protection assessment before any future feature
  uses sensitive data, profiling, sale, targeted advertising, or processing
  that creates heightened risk.

### Health, Disability, And Accessibility Context

Do not assume the company or ops platform is a HIPAA covered entity. Also do
not treat accessibility and health-context data casually just because HIPAA may
not apply. Accessibility needs, disability context, medical-device context,
photos of homes, signatures, precise locations, and installation notes can be
high-risk data.

Doctrine:

- Collect the minimum operational data needed for the job.
- Avoid medical diagnoses, medical-record uploads, insurance IDs, or detailed
  health narratives unless a future approved design and legal review requires
  them.
- Label disability, medical-context, precise-location, photo, signature, and
  billing data as sensitive operational data.
- Keep human review gates for invoice release, safety decisions, contractor
  access, and client-facing commitments.

## Data Classification Doctrine

| Class | Examples | Current pilot rule |
|---|---|---|
| Public business identity | Legal company name, public domains, public service categories | Allowed in docs when needed. |
| Account/contact data | Names, emails, phone numbers, login identifiers | Mock/manual only until auth, storage, retention, and privacy notice are accepted. |
| Operational job data | Addresses, site notes, schedules, contractor assignments | Sanitized fixtures only. |
| Sensitive operational data | Accessibility needs, disability/medical context, photos, signatures, precise geolocation, billing data | Blocked from real collection until legal/security/storage approval. |
| Credentials/secrets | Clerk/Vercel keys, service tokens, env values | Never in Git, docs, screenshots, or chat logs. |
| Children/minors data | Minor account or service-recipient data | Not targeted; avoid collection unless counsel approves a specific workflow. |

## Privacy And Terms Publication Gate

Before the ops app is circulated beyond the internal mock/manual pilot:

- [ ] Counsel/operator confirms legal identity wording.
- [ ] Counsel/operator confirms whether marketing-site legal pages and ops-app
      legal pages stay separate.
- [ ] Ops Privacy Policy draft covers data categories, purposes, request
      methods, third parties/processors, retention/disposal, security, breach
      response, sensitive data, children, and domain boundary.
- [ ] Ops Terms draft covers account access, internal/client-ops scope,
      acceptable use, no emergency/safety reliance, no unauthorized data
      upload, human approval gates, contractor/client responsibilities, and
      limitation/disclaimer language approved by counsel.
- [ ] No Terms/Privacy route links point to `floridarampandlift.com` unless
      counsel confirms those pages cover `floridarampandliftops.com`.
- [ ] Effective date and legal-contact method are approved.

## Third-Party Processor Doctrine

Current/future processors must be reviewed before real data is processed.

Currently planned or likely:

- Vercel for hosting.
- Clerk for authentication.
- Future database/storage provider only after persistence/storage design is
  accepted.
- Future email/SMS, accounting, CRM, PDF, payment, or automation providers only
  after separate implementation approval.

Processor gate:

- No processor receives real customer or contractor personal data until the
  operator has confirmed the processor purpose, data categories, environment,
  retention/deletion path, breach contact path, and whether a DPA or service
  agreement is required.

## Human Approval Gates

Explicit operator approval is required before:

- Publishing Terms, Privacy Policy, cookie/analytics notices, consent text, or
  customer-facing legal copy.
- Linking the ops app to live legal URLs.
- Ingesting real customer, contractor, client, billing, photo, signature,
  location, disability, medical-context, or child/minor data.
- Enabling file uploads, storage buckets, persistence, external sends, CRM,
  accounting, SMS/email, PDF generation, payment collection, runtime AI, or
  analytics/advertising tracking.
- Making breach, privacy-rights, regulatory, customer, contractor, insurer, or
  legal communications.

## Risks

- A single shared legal page across marketing and ops domains may miss
  ops-specific account, contractor, client, file, location, and job-processing
  details.
- Accessibility/home-modification workflows can collect sensitive context even
  when the user does not label it as medical data.
- Clerk authentication protects sessions but does not solve object-level access,
  retention, breach response, or privacy notice duties.
- Future persistence/storage can convert a safe mock/manual pilot into a real
  privacy/security system; that transition requires separate approval.

## Acceptance Criteria

- Records the Florida legal operator and public Sunbiz document number without
  committing EIN or street address.
- Distinguishes marketing-site and ops-domain legal/privacy posture.
- Establishes FIPA security, disposal, and breach response as the conservative
  real-data baseline.
- Treats Florida Digital Bill of Rights duties as counsel-review applicability
  plus voluntary alignment unless the thresholded statute applies.
- Blocks real sensitive operational data until legal, security, storage,
  retention, and operator gates are accepted.
- Defines required future ops-app Terms/Privacy URLs.
- States explicitly that this document does not authorize runtime, deploy,
  storage, integrations, production users, or public legal publication.

## Does Not Authorize

This document does not authorize public legal publication, deployment,
production operations, real customer data, persistent storage, auth production
users, file uploads, integrations, analytics/advertising, legal communications,
or replacement of attorney review.

## Primary Sources Reviewed

- Florida Division of Corporations, Sunbiz entity record for Florida Ramp and
  Lift LLC.
- Florida Statutes section 501.171, Security of confidential personal
  information.
- Florida Statutes part V of chapter 501, Florida Digital Bill of Rights,
  including sections 501.702, 501.703, 501.705, 501.711, 501.713, and 501.715.
