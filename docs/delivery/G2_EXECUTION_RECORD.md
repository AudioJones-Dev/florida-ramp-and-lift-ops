# G2 Execution Record

Status: Active — G2 partially executed 2026-07-10/11 under the operator's CLI-first `proceed`; DNS application blocked on operator token action
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
| Configure domain | ✅ `POST /instance/change_domain` → home URL `https://floridarampandliftops.com` (dry-run first). `clerk deploy status` confirms `domain: floridarampandliftops.com`, state `domain_pending`. |
| Required DNS records | ✅ Identified (Clerk-authoritative, 5 CNAMEs — see below). **Additive only**: no overlap with the six live `floridarampandliftops.com` records serving the contractor-portal product. |
| Apply DNS records | ⛔ **BLOCKED — operator action.** Every `CLOUDFLARE_API_TOKEN` in Doppler is stale (401: `aj-digital-os/dev`, `audiojones-com/dev|stg|prd`) — casualties of the 2026-07-06 token rotation, never refreshed in Doppler. Wrangler OAuth lacks DNS-edit scope. A collision-checking, **unproxied** application script is prepared and runs the moment a valid token lands. |
| Production Secret Key | ✅ Rotated via Platform API `rotate_secret_keys` (dry-run first; supersedes the unpersisted Q3 replacement, which nothing consumed). New `sk_live` **escrowed directly to Doppler `florida-ramp-and-lift/prd` as `CLERK_SECRET_KEY`** — value never printed, logged, or written to disk (in-memory pipe; redacted-shape output only). |
| Auth paths (runbook Step 3) | ⏳ Not yet performed — sequenced after DNS/certificates. |
| Verification (runbook Step 5) | ⏳ Pending DNS: `domainStatus` dns/ssl/mail all `pending`; OAuth `google` pending (production instances need dedicated Google credentials — operator/console task before any Google sign-in use). |

## Required DNS records (public configuration data; Clerk-authoritative)

All CNAME, all **DNS-only (unproxied)** — proxying breaks Clerk certificate issuance:

| Host | Value |
|---|---|
| `clerk.floridarampandliftops.com` | `frontend-api.clerk.services` |
| `accounts.floridarampandliftops.com` | `accounts.clerk.services` |
| `clkmail.floridarampandliftops.com` | `mail.u2xs1p5jpkiv.clerk.services` |
| `clk._domainkey.floridarampandliftops.com` | `dkim1.u2xs1p5jpkiv.clerk.services` |
| `clk2._domainkey.floridarampandliftops.com` | `dkim2.u2xs1p5jpkiv.clerk.services` |

## Operator action required to unblock DNS

Either:

1. Create a new scoped Cloudflare token (Zone → DNS → Edit, limited to the
   `floridarampandliftops.com` zone), update `CLOUDFLARE_API_TOKEN` in Doppler
   (`aj-digital-os/dev`), and say so — the prepared script applies the five
   records (collision-checked, unproxied) and triggers verification; **or**
2. Add the five records manually in the Cloudflare dashboard (DNS-only /
   grey-cloud), then request verification via `clerk deploy status`.

## Standing rules honored

- No Vercel writes (G4), no deploy, no instance deletion/replacement.
- Secret values: never printed, never persisted outside Doppler.
- Stale-token finding: the four dead Doppler Cloudflare tokens should be
  removed or replaced (secret hygiene; operator-gated).

## Tooling notes (for future agents)

- Git Bash mangles leading-slash `clerk api` paths via MSYS path conversion —
  set `MSYS_NO_PATHCONV=1` (this caused false `clerk_key_invalid`/404 errors).
- Bodiless `clerk api` POSTs omit Content-Type; pass `-d '{}'`.
- Windows `subprocess` needs the full `clerk.cmd` shim path.

## Does Not Authorize

This record documents executed, operator-approved G2 actions. It authorizes
nothing further: DNS writes await the operator token/manual action; G4 (Vercel
env), G5/G6 (deploys), and instance deletion remain separately gated.
