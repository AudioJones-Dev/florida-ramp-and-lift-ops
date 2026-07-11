# G2 Clerk Production Runbook

Status: Active execution runbook — G2 `proceed` received; domain verified and Clerk paths applied 2026-07-11; OAuth and sibling-host reconciliation pending
Scope: Step-by-step operator playbook for gate G2 (Clerk production setup) on `floridarampandliftops.com`
Runtime impact: None
Implementation status: Documentation and execution guide — Clerk and DNS actions are recorded separately in `G2_EXECUTION_RECORD.md`; this document does not authorize additional provider actions, env writes, or deploys

## Purpose

This runbook converts the "Clerk Production Setup Checklist" in
[`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md) into ordered, verifiable steps
for gate **G2** of
[`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md).
It exists so that when the operator issues the G2 `proceed`, execution is a
checklist walk, not an improvisation. Agents may assist read-only (drafting,
verifying docs, recording results); **all provider actions are performed by the
operator or with the operator present**.

## Preconditions (all must hold before Step 1)

- [x] G1 confirmed (2026-07-10): domain final; DNS management confirmed and
      edit access available (Q1/Q2 in
      [`PHASE_B_G1_OPEN_QUESTIONS.md`](./PHASE_B_G1_OPEN_QUESTIONS.md)).
- [x] **Q3 resolved via Step 0 below (2026-07-10).**
- [x] Operator has access to the Clerk dashboard account that will own the
      production instance, and to DNS management for
      `floridarampandliftops.com`.
- [x] Operator issued the explicit **G2 `proceed`** at execution time
      (2026-07-10). This runbook was not itself the approval.

## Step 0 — Q3: credential provenance and rotation (REQUIRED first)

The 2026-07-07 `.env.production.local` file had unclear provenance
(`DEPLOYMENT_TARGET.md` open question; risk register: secrets are a standing
high risk). Before planned G2 configuration:

1. Operator states who created `.env.production.local` and with what keys
   (identity of keys only — never values).
2. If provenance is unclear or the Secret Key was ever exposed: **treat the
   Secret Key as compromised** — rotate it through Clerk CLI or the Clerk
   dashboard, then delete the local file. The Publishable Key is public and
   does not require rotation.
3. Verify the file was never committed:
   `git log --all --oneline -- .env.production.local` must return nothing.
4. Record the provenance statement + rotation confirmation as Q3's answer in
   [`PHASE_B_G1_OPEN_QUESTIONS.md`](./PHASE_B_G1_OPEN_QUESTIONS.md)
   (values never recorded anywhere).

Completed 2026-07-10: a names-only audit matched the file's production-tier
credentials to the existing, unused Production instance of `My Application`.
The old Secret Key was rotated through the Clerk CLI with immediate expiration;
the replacement was neither printed nor persisted; the Publishable Key was
unchanged; the local file was deleted; and Git history remained empty. Q3 is
recorded in `PHASE_B_G1_OPEN_QUESTIONS.md`.

## Step 1 — Verify and configure the existing Clerk production instance (operator)

1. Clerk Platform API inventory confirms `My Application` already has a
   Production instance. Verify it is the intended FLR application before
   configuration; do not create a duplicate instance.
2. Retain and configure that instance unless the operator separately approves
   deleting/replacing it. Instance deletion is destructive and is not covered
   by the G2 `proceed`.
3. Set the production domain: `floridarampandliftops.com` (final per G1/Q2 —
   changing it later regenerates the publishable key and voids downstream
   work).

## Step 2 — DNS records and verification (operator; the G2-authorized DNS work)

1. The Clerk dashboard displays the **exact** DNS records required for the
   instance (typically CNAMEs such as `clerk.<domain>` for the Frontend API
   and `accounts.<domain>`, plus mail/DKIM records if Clerk email is used).
   **The dashboard is authoritative — take record names/values from it, not
   from this runbook.**
2. Add exactly those records at the DNS host for `floridarampandliftops.com`.
3. Wait for Clerk to verify the records and issue certificates; dashboard
   shows green/verified status for each.

This is the DNS work that G1 explicitly did not authorize; it happens here,
under the G2 `proceed`, operator-executed.

## Step 3 — Configure auth paths and redirects (operator)

Match the repo's env-name contract (`.env.example`; names only):

- Sign-in URL: `/sign-in` (`NEXT_PUBLIC_CLERK_SIGN_IN_URL`)
- Sign-in fallback redirect: `/dashboard`
  (`NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`)
- Sign-up fallback redirect: `/dashboard`
  (`NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`)
- Allowed origins/redirects include the production domain (and preview domain
  only for the development-instance keys, per the key-tier rule).

## Step 4 — Establish production keys (operator; Q3 is recorded)

1. After the final production domain is configured, use its resulting
   `pk_live_` Publishable Key and create a new named `sk_live_` Secret Key for
   the deployment. Do not reuse the Q3 credential.
2. Storage rule at G2: **only** an approved secret manager. Never Git, docs,
   chat logs, shell history, screenshots, or loose local files. Entering
   values into Vercel environment settings is gate **G4** (see item 4).
3. Key-tier rule (from `DEPLOYMENT_TARGET.md`): preview environment uses
   development-instance `pk_test_`/`sk_test_` only; production uses
   `pk_live_`/`sk_live_` only.
4. Note the gate boundary: generating keys is G2; **writing them into Vercel
   env is gate G4** and takes its own operator `proceed` (may be the same
   session, but it is a separate acknowledgment).

## Step 5 — Verify and record (operator, agent may assist read-only)

- [ ] Clerk dashboard shows the production instance healthy: domain verified,
      certificates issued, paths configured (or `clerk doctor` clean, if used).
- [ ] No keys or record values appear in Git, docs, or chat.
- [ ] Completion recorded in [`CHANGELOG.md`](./CHANGELOG.md) with the date.
- [ ] G2 boxes checked in
      [`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md)
      with dates.

## Abort / rollback

If G2 is aborted mid-way: remove the DNS records added in Step 2 and revoke
any keys generated in Step 4. **Deleting the production instance — even an
unusable one — is a destructive action requiring its own separate operator
approval; it is not covered by the G2 `proceed` or by this abort path** (see
Step 1). Nothing downstream depends on G2 until G3 (Vercel link) begins, so a
clean abort has no blast radius beyond the Clerk dashboard and DNS records
themselves.

## What G2 authorizes — and does not

Once the operator issues the G2 `proceed`, this gate covers: the Clerk
production instance, its DNS records, path configuration, and key generation.
It does **not** cover: Vercel project creation or linking (G3), env var writes
(G4), preview or production deploys (G5/G6), Clerk organizations/invitations
(out of Phase B scope), real users beyond operator-created test accounts, or
any real data.

## Does Not Authorize

This runbook authorizes nothing by itself. It is the execution script for a
gate that still requires its own explicit operator `proceed` at execution
time, per [`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md)
and the AJ Digital OS governance kernel. Secrets and DNS remain irreducible
operator-authority points per
[`../governance/DELEGATION_AND_AUTONOMY.md`](../governance/DELEGATION_AND_AUTONOMY.md).
