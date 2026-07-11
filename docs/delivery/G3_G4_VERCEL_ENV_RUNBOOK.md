# G3/G4 Vercel And Environment Runbook

Status: Active — G3 complete 2026-07-11; G4 pending separate operator approval
Scope: Step-by-step operator playbook for gate G3 (Vercel project/link) and gate G4 (environment variable writes)
Runtime impact: None
Implementation status: Documentation only — no Vercel, env, DNS, or deploy action is performed or authorized by this document; every step is operator-executed under the relevant gate's `proceed`

## Purpose

This runbook converts the "Vercel Link Checklist" in
[`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md) and gate G4 of
[`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md)
into ordered, verifiable steps. Together with
[`G2_CLERK_PRODUCTION_RUNBOOK.md`](./G2_CLERK_PRODUCTION_RUNBOOK.md) it
completes the operator playbook set up to the G5 preview deploy gate.

## Preconditions

- **G3's only prerequisite is G0** (accepted 2026-07-09); G3 may run before or
  in parallel with G2, and G1 is not a G3 prerequisite. **G4 depends on G2
  (production keys exist) and G3 (project exists)** — preview-env writes need
  only G3 plus the Clerk development-instance keys.
- Operator has access to the Vercel `audiojones` team and the Clerk dashboard.
- Each gate still takes its own explicit operator `proceed` at execution time.
  This runbook is not that approval.

## ⚠ Gate-interaction rule — Git auto-deploy (accepted G3 default)

**Vercel's Git integration auto-deploys by default: every branch push gets a
preview deploy and every merge to `main` becomes a production deploy.**
Connecting it at G3 would let routine merges bypass the G5/G6 deploy gates.

**Accepted G3 default: the Git integration stays disconnected through G6.**
All Phase B deployments are gated CLI deployments only — the G5 preview deploy
and the G6 production pilot deploy run via explicit `vercel deploy` /
`vercel deploy --prod`, each under its own operator `proceed`. Connecting the
Git integration is a separate, later operator decision (at/after G6) and is
out of scope for this runbook.

## Gate G3 — Vercel project and link (operator)

1. Operator approves the project name `florida-ramp-and-lift-ops` under the
   `audiojones` team (new project — do **not** reuse `floridaplatformliftpros`,
   per the accepted `DEPLOYMENT_TARGET.md` rationale).
2. Run from the repo root, operator-present:
   `vercel link --yes --project florida-ramp-and-lift-ops --scope audiojones`
3. Confirm `.vercel/` is gitignored **before** any commit — already true at
   `.gitignore` line 3 (`.vercel/`); verify `git status` shows no `.vercel/`
   entries after linking.
4. Confirm the Git integration remains **disconnected through G6** (accepted
   G3 default; see the gate-interaction rule above) — all deploys are gated
   CLI deployments. Record the confirmation in `CHANGELOG.md`.
5. Record G3 completion: check the G3 boxes in
   [`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md)
   with dates.

G3 execution evidence: [`G3_EXECUTION_RECORD.md`](./G3_EXECUTION_RECORD.md).
The 2026-07-11 CLI link unexpectedly connected the detected GitHub remote; the
connection was immediately removed with `vercel git disconnect --yes`, and
the live project was verified to have zero deployments and no Git link.

## Gate G4 — Environment variable writes (operator)

Names contract (`.env.example`; names only, never values in Git/docs/chat):

| Name | Preview environment | Production environment |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_…` (Clerk development instance) | `pk_live_…` (only after G2 Step 4) |
| `CLERK_SECRET_KEY` | `sk_test_…` | `sk_live_…` (only after G2 Step 4) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | `/dashboard` | `/dashboard` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | `/dashboard` | `/dashboard` |

Steps:

1. Operator approves each environment's writes (preview and production are
   separate approvals; production values cannot exist before G2 completes).
2. Enter values in the Vercel dashboard env settings, or `vercel env add
   <NAME> <environment>` typed interactively — never echo values into shell
   history, scripts, or logs.
3. Key-tier rule (hard): preview uses Clerk development-instance keys only;
   production uses production-instance keys only, and only after the domain is
   verified (G2). Never cross the tiers.
4. Verify **by name only**: `vercel env ls <environment>` shows all five names
   in each target environment. Never print values.
5. Record G4 completion in the Phase B checklist and `CHANGELOG.md`.

## Abort / rollback

Before any deploy exists, the reversible abort steps are: remove the env vars
added under G4, and remove the local `.vercel/` link directory (delete it with
your platform's normal file-removal method; it is gitignored and local-only).

Deleting the Vercel **project** itself is a **destructive rollback action** —
it is not covered by the G3/G4 `proceed`s and requires its own separate,
explicit operator approval before execution (`AGENTS.md`: destructive
operations are always operator-gated).

## What G3/G4 authorize — and do not

With their respective `proceed`s: G3 covers project creation via the CLI link
and the recorded confirmation that the Git integration stays disconnected
through G6; G4 covers entering the five named env values into Vercel per the
key-tier rule. Neither covers: any deploy (G5/G6), Clerk configuration (G2),
DNS changes, custom domains on Vercel, real data, connecting the Git
integration (a separate at/after-G6 operator decision), or deleting the Vercel
project (a destructive action with its own approval).

## Does Not Authorize

This runbook authorizes nothing by itself. Each gate requires its own explicit
operator `proceed` at execution time. Secrets/env values and paid provider
actions remain irreducible operator-authority points per
[`../governance/DELEGATION_AND_AUTONOMY.md`](../governance/DELEGATION_AND_AUTONOMY.md).
