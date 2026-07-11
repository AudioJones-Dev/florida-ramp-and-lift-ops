# G4 Preview Environment Execution Record

Status: Complete for Preview 2026-07-11; Production environment pending separate approval
Scope: Evidence record for the Preview portion of gate G4 (Vercel environment-variable writes)
Runtime impact: None until a separately approved Preview deployment consumes these values
Implementation status: Five approved names configured for Vercel Preview; no deployment performed

## Authorization

Operator instruction (live, 2026-07-11): write the five approved names to the
Vercel Preview environment using Clerk development-tier keys. Do not configure
DNS, custom domains, Git integration, Production values, or deploy. Verify by
name only and never print values.

## Source Validation

- The product-scoped Doppler `dev` configuration did not contain the Clerk
  development key pair. No new Doppler copy was created.
- The existing `.env.local` source is permitted by
  [`auth-foundation.md`](../architecture/auth-foundation.md), gitignored, never
  tracked, and contained all five contract names.
- Duplicate Clerk key entries were identical. Prefix-only checks confirmed
  `pk_test_` and `sk_test_`; redirect checks matched `/sign-in`, `/dashboard`,
  and `/dashboard`. No value was printed or recorded.

## Results

| Check | Evidence |
|---|---|
| Target | Preview only; all Preview branches |
| Names | `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` |
| Type | All five stored as Vercel sensitive environment variables |
| Contract | Five of five required names present; zero unexpected Preview names |
| Other environments | Zero Production targets and zero Development targets |
| Git integration | Verified disconnected after the writes |
| Deployments | Zero deployments |
| Domains and DNS | Only the automatic project `vercel.app` domain; no custom domain or DNS change |
| Repo state | Tracked working tree remained clean on `main` after the provider action |

## Tooling Note

Vercel CLI 52 agent mode incorrectly required a Preview Git branch even for
an all-Preview-branches add while Git integration was intentionally
disconnected. The documented project environment API was used instead. Values
were held in memory and sent through stdin; the API request set
`target=["preview"]` and `type="sensitive"` for each name.

## Does Not Authorize

This record closes only the Preview portion of G4. It does not authorize
Production environment values, a Preview or Production deployment (G5/G6),
custom-domain assignment, DNS changes, Git integration, secret rotation, or
project deletion.
