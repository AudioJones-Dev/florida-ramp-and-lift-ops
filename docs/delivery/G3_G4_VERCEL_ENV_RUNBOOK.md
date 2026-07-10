# G3/G4 Vercel And Environment Runbook

Status: Git Spec-ready draft — pending operator review
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

- G0 accepted (2026-07-09) and G1 confirmed (2026-07-10). Per the gate summary,
  **G3 depends only on G0** and may run before or in parallel with G2; **G4
  depends on G2 (production keys exist) and G3 (project exists)** — preview-env
  writes need only G3 plus the Clerk development-instance keys.
- Operator has access to the Vercel `audiojones` team and the Clerk dashboard.
- Each gate still takes its own explicit operator `proceed` at execution time.
  This runbook is not that approval.

## ⚠ Gate-interaction warning — Git auto-deploy (decision point)

`DEPLOYMENT_TARGET.md`'s link checklist includes "Git integration connected …
production branch `main`." **Vercel's Git integration auto-deploys by default:
every branch push gets a preview deploy and every merge to `main` becomes a
production deploy.** Connecting it at G3 would let routine merges bypass the
G5/G6 deploy gates.

Safe default (recommended): at G3, create and link the project **CLI-only** —
do **not** connect the Git integration yet. Run the G5 preview deploy and G6
production pilot deploy via explicit `vercel deploy` / `vercel deploy --prod`
under their own gates. Connect the Git integration only when the operator
decides ongoing auto-deploys are acceptable (at/after G6), or connect it
earlier only with deployment protection/pause configured so no automatic
production deploy can occur.

The operator chooses at Step G3.4; the choice and rationale are recorded in
[`CHANGELOG.md`](./CHANGELOG.md).

## Gate G3 — Vercel project and link (operator)

1. Operator approves the project name `florida-ramp-and-lift-ops` under the
   `audiojones` team (new project — do **not** reuse `floridaplatformliftpros`,
   per the accepted `DEPLOYMENT_TARGET.md` rationale).
2. Run, operator-present:
   `vercel project add florida-ramp-and-lift-ops --scope audiojones`
   then `vercel link` from the repo root, selecting that project.
3. Confirm `.vercel/` is gitignored **before** any commit — already true at
   `.gitignore` line 3 (`.vercel/`); verify `git status` shows no `.vercel/`
   entries after linking.
4. **Git integration decision** (see warning above): defer (recommended) or
   connect with deployment protection/pause. Record the choice in
   `CHANGELOG.md`.
5. Record G3 completion: check the G3 boxes in
   [`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md)
   with dates.

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

Before any deploy exists, G3/G4 are fully reversible with no blast radius:
remove env vars, unlink (`rm -rf .vercel/` locally), and delete the Vercel
project from the dashboard. Nothing else references the project until G5.

## What G3/G4 authorize — and do not

With their respective `proceed`s: G3 covers project creation, repo link, and
the recorded Git-integration decision; G4 covers entering the five named env
values into Vercel per the key-tier rule. Neither covers: any deploy (G5/G6),
Clerk configuration (G2), DNS changes, custom domains on Vercel, real data, or
connecting auto-deploying Git integration without the recorded decision.

## Does Not Authorize

This runbook authorizes nothing by itself. Each gate requires its own explicit
operator `proceed` at execution time. Secrets/env values and paid provider
actions remain irreducible operator-authority points per
[`../governance/DELEGATION_AND_AUTONOMY.md`](../governance/DELEGATION_AND_AUTONOMY.md).
