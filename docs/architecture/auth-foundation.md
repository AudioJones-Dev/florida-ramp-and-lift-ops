# Auth Foundation

Status: Implementation note
Owner: AJ Digital LLC / Audio Jones
Scope: Florida Ramp & Lift Operational Intelligence Platform
Runtime impact: Clerk user-auth scaffold added
Implementation status: Code scaffolded; Clerk application link and real keys still required

## Purpose

This document records the first approved authentication implementation step for the FLR platform.

## Current scope

- Clerk is the selected user authentication provider.
- Supabase remains the planned data, storage, and RLS layer for later implementation.
- `@clerk/nextjs` provides the Next.js auth integration.
- Clerk components use lightweight local appearance variables to avoid adding a large theme dependency.
- `src/proxy.ts` loads Clerk request context.
- `src/app/(dashboard)/layout.tsx` protects internal dashboard routes close to the protected resource.
- `/sign-in` is the Clerk-managed sign-in-or-up route.
- `/mock-sign-in` preserves the local mock role picker for non-authenticated preview work.

## Source-of-truth boundaries

- Clerk owns identity, sessions, password reset, email update, and account management.
- FLR app code owns role-aware route surfaces and MVP workflow UI.
- Future database tables must still keep `users` / `profiles` separate from provider identity, as defined in `docs/architecture/persistence-design.md`.
- Real Clerk keys must live in `.env.local`, Vercel environment variables, or an approved secret manager, not in Git.

## In scope

- User authentication shell.
- Protected internal dashboard routes.
- Clerk sign-in-or-up page.
- Clerk account menu through `UserButton`.
- Placeholder-only `.env.example`.

## Out of scope

- Supabase setup.
- Database migrations.
- Storage buckets.
- Clerk organizations and invitations.
- User/profile persistence sync.
- Production deployment.
- Live customer/client/contractor data access enforcement.
- HubSpot, QuickBooks, email/SMS, PDF, ResponseOS, AI, or payment integrations.

## Human approval gates

Explicit operator approval is still required before:

- Creating or rotating real Clerk production keys.
- Linking or mutating a production Clerk application.
- Creating real users in Clerk on behalf of the operator.
- Enabling Clerk organizations, invitations, or production domain deployment.
- Adding Supabase, storage, database migrations, webhooks, or persistence sync.

## Risks

- The app will not complete real sign-in until `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are available.
- Clerk auth alone does not provide object-level authorization; Supabase RLS or equivalent policies remain required before live records.
- The mock role selector is only a preview tool and must not be treated as authorization.
- Any password previously pasted into chat should be rotated before use in Clerk.

## Acceptance criteria

- Clerk packages are installed.
- `ClerkProvider` wraps the app.
- Clerk proxy protects non-public routes.
- `/sign-in` renders Clerk's sign-in-or-up component flow.
- Dashboard shell exposes Clerk account management for signed-in users.
- Placeholder env requirements are documented without secrets.
- Typecheck, lint, and build pass.
- `clerk doctor` is clean after the operator logs in, links the Clerk app, and pulls env keys.

## Implementation sequence

1. Install Clerk skills and SDK packages.
2. Scaffold Clerk provider, proxy, and sign-in-or-up route.
3. Preserve mock role preview under `/mock-sign-in`.
4. Add placeholder env documentation.
5. Operator logs in to Clerk CLI or Dashboard.
6. Link the Clerk application and pull local env keys.
7. Create approved users and roles in Clerk.
8. Add Supabase persistence and object-level access in a later approved branch.
