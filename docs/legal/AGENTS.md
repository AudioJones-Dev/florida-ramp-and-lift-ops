# Legal Docs Instructions

## Purpose

`docs/legal/` owns repo-local legal, privacy, notice, data-rights, and legal-review doctrine for the Florida Ramp & Lift ops platform.

## Ownership

- Owns legal/privacy doctrine, public legal URL requirements, notice requirements, breach-response references, and attorney/operator review gates.
- Does not own runtime code, production deployment, customer-data handling, actual legal advice, or final public legal-policy approval.

## Local Contracts

- Legal doctrine must identify whether each rule is a statutory requirement, an inference from current project posture, or a voluntary operating standard.
- Public company identity may name Florida Ramp and Lift LLC and public entity status, but do not commit EIN, street address, private contact details, or customer/legal matter details unless the operator and counsel explicitly approve.
- Cite primary legal sources when a doc summarizes law.
- Mark any publication-ready Terms, Privacy Policy, consent text, or customer-facing legal copy as attorney-review required before use.
- Do not authorize real customer data, file uploads, storage, integrations, production users, or production operations through legal wording drift.

## Work Guidance

- Use Florida law as the default state-law frame unless a future approved doc expands jurisdiction.
- Separate `floridarampandlift.com` marketing-site legal posture from `floridarampandliftops.com` ops/client-ops legal posture.
- Treat accessibility, disability, medical-context, location, photo, signature, billing, and account data as sensitive operational data even when a specific privacy statute may not strictly apply.
- Prefer conservative data minimization and human review gates over broad collection rights.

## Verification

- For repo-wide legal/governance docs, run `npm run typecheck`, `npm run lint`, and the repo policy hook when the environment allows.

## Child DOX Index

- None yet.
