# Resend Transactional Email Plan

Status: Proposed Phase 4 implementation plan - docs-only; provider and runtime work not authorized
Scope: Transactional application email for the Florida Ramp & Lift operations platform
Runtime impact: None
Implementation status: Design-only; no Resend account, DNS record, secret, dependency, webhook, runtime integration, or email send is created by this plan

## Purpose

Define the domain, sender, security, rollout, and verification contract for a
future Resend integration without expanding the current Phase B pilot or
bypassing the controlled-integration gate in
[`RELEASE_PLAN.md`](./RELEASE_PLAN.md).

## Canonical Operations Domain

The canonical Florida Ramp & Lift operations-platform domain is:

`floridarampandliftops.com`

This spelling is authoritative and must be used consistently in DNS, sender
identities, environment variables, application URLs, webhook configuration,
deployment documentation, and production-secret scoping.

The variant `floridarampandliftsops.com` is invalid and must not be used.

## Source-of-Truth Boundaries

- Clerk owns authentication, verification, password recovery, and other
  identity-related email.
- Resend will own application-generated transactional email only after a
  separately approved Phase 4 implementation.
- Cloudflare remains authoritative for DNS.
- Application email is not a system of record. Canonical workflow, invoice,
  payout, approval, and audit state stays in the application data model.
- Human release gates in
  [`ai-stack-and-cost-control.md`](../architecture/ai-stack-and-cost-control.md)
  remain controlling. In particular, invoice release email requires Michael
  Keegan approval for the MVP.

## Domain Contract

| Purpose | Approved hostname | Rule |
|---|---|---|
| Public marketing website | `floridarampandlift.com` | Not used for operations-platform transactional sending. |
| Operations platform domain family | `floridarampandliftops.com` | Registered operations domain; application-host ownership remains governed by `REPO_BOUNDARY_MAP.md`. |
| Resend sending domain | `mail.floridarampandliftops.com` | Reserved exclusively for transactional sending. It is not an application frontend or mailbox host. |

The spelling `floridarampandliftsops.com` is not approved. The extra `s` after
`lift` must not appear in DNS, Resend, links, sender identities, or environment
configuration.

The canonical application origin remains unresolved while existing sibling
products occupy the apex and role subdomains. `NEXT_PUBLIC_APP_URL` must use the
actual approved application origin after that ownership decision; it must not be
guessed from the email-sending hostname.

## Approved Sender Identities

Initial sender identities:

```txt
Florida Ramp & Lift Ops <notifications@mail.floridarampandliftops.com>
Florida Ramp & Lift Ops Billing <billing@mail.floridarampandliftops.com>
Florida Ramp & Lift Ops Operations <operations@mail.floridarampandliftops.com>
```

Reserved future local parts:

```txt
invoices@mail.floridarampandliftops.com
payouts@mail.floridarampandliftops.com
alerts@mail.floridarampandliftops.com
```

These are application sender identities, not conventional or monitored
mailboxes. Product copy, templates, and support flows must not promise that a
reply will be read until inbound email handling is separately designed and
implemented.

## Proposed Environment Contract

Names only; values are never committed or recorded in documentation:

```env
RESEND_API_KEY=
RESEND_WEBHOOK_SECRET=
EMAIL_FROM_NOTIFICATIONS="Florida Ramp & Lift Ops <notifications@mail.floridarampandliftops.com>"
EMAIL_FROM_BILLING="Florida Ramp & Lift Ops Billing <billing@mail.floridarampandliftops.com>"
EMAIL_FROM_OPERATIONS="Florida Ramp & Lift Ops Operations <operations@mail.floridarampandliftops.com>"
NEXT_PUBLIC_APP_URL=
```

The repository's product/environment secret-manager boundary supplies workload
specificity. Do not rename or combine Cloudflare, Clerk, and Resend credentials
into a generic credential variable. Do not add these names to `.env.example`
until the runtime implementation branch is separately approved.

## In Scope For Future Implementation

- Add and verify `mail.floridarampandliftops.com` in Resend.
- Apply only the exact provider-generated DKIM, SPF, return-path, and ownership
  records required by Resend.
- Keep email-authentication records DNS-only unless Resend explicitly requires
  otherwise.
- Create a restricted production API key and store it in the approved secret
  manager.
- Implement a narrow outbound email adapter after persistence and audit
  prerequisites are accepted.
- Verify webhook signatures and record delivery, bounce, and complaint events.
- Send one controlled production verification message after explicit approval.
- Document domain verification, authenticated delivery, and webhook receipt.

## Out of Scope

- Resend provider setup or Cloudflare DNS writes in this planning branch.
- Dependencies, API clients, routes, environment files, secrets, or deploys.
- Google Workspace or a conventional mailbox provider.
- Inbound email, reply handling, shared inboxes, or support-ticket ingestion.
- Marketing campaigns, newsletters, bulk outreach, or automated sales email.
- Automatic invoice release, payout release, approval, or client-facing send.
- Reusing `mail.floridarampandliftops.com` as an application or API hostname.

## Implementation Sequence

### E0 - Plan Acceptance

- Approve this domain and sender contract.
- Resolve the canonical application hostname separately.
- Confirm the first transactional use cases and their human approval owners.
- Keep all provider and runtime work blocked until Phase 4 is authorized.

### E1 - Resend And DNS Preflight

- Add `mail.floridarampandliftops.com` to Resend without sending email.
- Read the required records live from Resend; do not copy values from this plan.
- Inventory the Cloudflare zone before mutation.
- Classify every proposed record as missing, exact, or conflicting.
- Stop with zero writes on any conflict or unexpected zone/domain result.

### E2 - DNS Apply And Domain Verification

- Require a dedicated operator `proceed` for the production DNS mutation.
- After approval and immediately before any write, re-read the Cloudflare zone
  and reclassify every proposed record. Abort with zero writes if the zone,
  domain, existing records, or conflict state differs from the approved E1
  preflight.
- Create only missing records and keep applicable records unproxied.
- Track IDs created in the invocation and roll them back on partial failure.
- Preserve unrelated Clerk, Render, marketing, and sibling-product records.
- Wait for Resend to report the sending domain verified.
- Publish a documented DMARC policy at the correct domain label for the sending
  design; do not invent or copy a policy value without reviewing existing
  organizational-domain policy and alignment requirements.

### E3 - Credentials And Runtime Implementation

- Create a restricted production Resend key.
- Escrow key and webhook secret directly to the approved production secret
  manager without printing or local persistence.
- Implement the smallest outbound adapter and signed webhook receiver on a
  dedicated feature branch.
- Require idempotency, auditable send intent, provider message ID storage,
  retry limits, and delivery-event reconciliation.
- Require webhook replay protection: enforce unique provider event IDs, define
  a bounded replay window from the provider's supported timestamp semantics,
  and make event persistence and reconciliation idempotent.
- Keep every customer-facing send behind its applicable human release gate.

### E4 - Controlled Verification

- Verify sender, recipient, subject, and non-sensitive body before release.
- Send one operator-approved production test to an approved recipient.
- Confirm delivery plus DKIM, SPF, and DMARC alignment/authentication.
- Confirm webhook signature validation, duplicate-event rejection, replay-window
  enforcement, and idempotent event persistence.
- Exercise bounce/complaint handling without using real customer data.
- Record evidence without message bodies, addresses, or secret values.

## Failure And Rollback Rules

- DNS conflict: write nothing and report the complete classification.
- Preflight drift: abort with zero writes and require a new reviewed preflight.
- Partial DNS failure: remove only records created by that invocation.
- Domain verification failure: disable sending; do not weaken DNS validation.
- Credential exposure: revoke and rotate immediately, then audit Git and logs.
- Webhook verification failure: reject the event and alert; never accept an
  unsigned or unverifiable payload.
- Delivery failure: retain the application record and failure evidence; do not
  treat provider acceptance as business completion.
- Wrong-recipient or unauthorized-send risk: stop outbound processing and
  invoke the release rollback procedure.

## Human Approval Gates

Separate `proceed` approvals are required before:

1. Creating or modifying the Resend production domain.
2. Writing production Cloudflare DNS records.
3. Creating or rotating Resend credentials.
4. Adding runtime dependencies, API clients, routes, or webhooks.
5. Writing production environment values.
6. Sending the first production verification message.
7. Enabling any recurring or customer-facing email workflow.

Invoice release and other financially sensitive communication retain their
existing named human authority regardless of technical readiness.

## Acceptance Criteria

- Resend verifies `mail.floridarampandliftops.com`.
- Provider-required DNS records match exactly and are not incorrectly proxied.
- A reviewed DMARC policy is published for the sending design, and controlled
  delivery evidence reports `dmarc=pass`.
- Clerk remains responsible for identity-related email.
- All application email uses an approved sender identity.
- Sender identities are not represented as monitored inboxes.
- The application origin is distinct from the sending hostname.
- Production credentials exist only in the approved secret manager and deploy
  environment authorized for their use.
- Outbound sends are human-gated where required, idempotent, and auditable.
- Delivery, bounce, and complaint webhooks are signature-verified, protected by
  unique provider event IDs and a bounded replay window, and reconciled
  idempotently.
- A controlled test proves delivery plus DKIM/SPF/DMARC authentication.
- No Google Workspace dependency is introduced.

## Next Executable Artifact

After Phase 3 persistence and audit prerequisites are accepted, create a
Phase 4 Resend implementation spec covering the data model, adapter interface,
webhook route, RLS/access rules, idempotency contract, templates, tests, and
rollback evidence. This plan alone does not authorize that work.
