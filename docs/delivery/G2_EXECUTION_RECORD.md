# G2 Execution Record

Status: Complete 2026-07-11 — G2 executed under the operator's CLI-first `proceed`; Clerk production verification complete, email/password scope aligned, and `ops` host ownership resolved
Scope: Evidence record for gate G2 (Clerk production configuration) staged execution
Runtime impact: None (provider configuration only; no repo runtime change)
Implementation status: Documentation of executed provider actions; names/status only — no secret values recorded anywhere

## Authorization

Operator instruction (live, 2026-07-10): "Proceed G2 using CLI-first staged
execution" — update CLI, read-only preflight, configure the instance for
`floridarampandliftops.com`, apply the exact required DNS records via the
authenticated DNS provider, create a new named Production Secret Key escrowed
directly to the approved secret manager, no Vercel writes (G4), no deploy, no
instance deletion.

## Stage results

| Stage | Result |
|---|---|
| CLI update | ✅ `clerk` 1.5.0 → **2.1.0** (npm global; standalone binary could not self-update) |
| Preflight — identity | ✅ App `My Application` (`app_3GAtPAgKRaANp6yoMSsSZhnHkQK`); production instance `ins_3GCGrhhTi0oMb6yFxrNmsmfzj2U` confirmed at platform level (local link metadata omits it — cosmetic). Second app `AJ DIGITAL LLC` identified and left untouched. |
| Preflight — domain state | ✅ Production instance was on the Clerk placeholder `evident.rattler-5.lcl.dev` — never configured with a real domain (explains the Q3 publishable-key decode anomaly). DNS/SSL/mail all pending; usage zero (per Q3 Platform API check). |
| Configure domain | ✅ `POST /instance/change_domain` → home URL `https://floridarampandliftops.com` (dry-run first). Live Clerk status confirms the domain with dns/ssl/mail complete. |
| Required DNS records | ✅ Identified and applied without overlap with the six existing Render hosts. Host ownership is now explicit: this repo uses `ops.floridarampandliftops.com`; existing apex, `www`, `admin`, `client`, `contractor`, and `platform` routes remain untouched. The `ops` DNS record itself waits for its separately gated deployment step. |
| Apply DNS records | ✅ 2026-07-11: a newly validated Cloudflare token was promoted to the canonical production config without printing its value. A full preflight classified all five records as missing with zero conflicts; all five were created **unproxied**. Public DNS resolution through `1.1.1.1` confirmed every CNAME target. |
| Production Secret Key | ✅ Rotated via Platform API `rotate_secret_keys` (dry-run first; supersedes the unpersisted Q3 replacement, which nothing consumed). New `sk_live` **escrowed directly to the approved production secret-manager configuration as `CLERK_SECRET_KEY`** — value never printed, logged, or written to disk (in-memory pipe; redacted-shape output only). |
| Production Publishable Key | ✅ Current post-domain-change `pk_live` fetched fresh and **escrowed as `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`** in the same approved configuration (same no-print, no-persist pipe). Both required key names verified present by name. |
| Auth paths (runbook Step 3) | ✅ Clerk provider paths set and read back: `home=/dashboard`, `sign_in=/sign-in`, and `sign_up=/sign-in`. G4 fallback env writes and G5 live redirect verification remain separate gates. |
| Authentication scope | ✅ Operator approved Clerk email/password for Phase B and deferred Google OAuth. Email code plus required password remain enabled in development and production; Google OAuth is disabled in both. |
| Verification (runbook Step 5) | ✅ Clerk reports aggregate state `complete`: dns/ssl/mail/OAuth complete, zero pending DNS records, and zero pending OAuth providers. |

## Required DNS records

Five CNAME records are required (frontend API, accounts portal, and three
mail/DKIM records). **Record hosts and values are read live from
`clerk deploy status` or the Clerk dashboard at application time — they are
deliberately not committed here** (runbook rule: live Clerk status is the
authoritative source for record values). All five are additive subdomains with
no overlap with the zone's existing live records, and all must be applied
**DNS-only (unproxied)** — proxying breaks Clerk certificate issuance.

## Downstream work

1. G3/G6 may configure `ops.floridarampandliftops.com` only; existing Render
   hosts must remain unchanged.
2. G4 writes fallback redirect environment values, and G5 verifies live
   sign-in and redirect behavior on the deployed URL.

## Standing rules honored

- No Vercel writes (G4), no deploy, no instance deletion/replacement.
- Secret values: never printed, never persisted outside the approved secret
  manager.
- Secret hygiene follow-up: remove deprecated duplicate Cloudflare entries only
  after the canonical production credential and every registered consumer are
  verified; this cleanup is not a G2 blocker.

## Tooling notes (for future agents)

- Git Bash mangles leading-slash `clerk api` paths via MSYS path conversion —
  set `MSYS_NO_PATHCONV=1` (this caused false `clerk_key_invalid`/404 errors).
- Bodiless `clerk api` POSTs omit Content-Type; pass `-d '{}'`.
- Windows `subprocess` needs the full `clerk.cmd` shim path.

## Does Not Authorize

This record documents executed, operator-approved G2 actions. It authorizes
nothing further: `ops` DNS, G3 (Vercel link), G4 (Vercel env), G5/G6
(deploys), runtime integrations, and instance deletion remain separately gated.
