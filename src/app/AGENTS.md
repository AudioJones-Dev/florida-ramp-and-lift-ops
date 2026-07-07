# App Router Instructions

This subtree contains Next.js App Router routes and layouts.

## Route Rules

- Keep route changes aligned with `src/lib/navigation.ts` and the role-aware MVP surfaces.
- Do not add auth enforcement, middleware, server actions, API routes, database calls, or third-party clients without explicit implementation approval.
- Preserve the mock/manual nature of dashboard, queue, approval, contractor, lead, customer, job, invoice, communication, and documentation pages.
- Client-facing portal routes remain out of MVP scope unless a later approved branch changes that boundary.

## Page Behavior

- Pages may inspect local mock data and render local UI state.
- Pages must not perform live side effects.
- Financial, safety, contractor payout, and client-facing communication surfaces must keep human approval language visible when relevant.
