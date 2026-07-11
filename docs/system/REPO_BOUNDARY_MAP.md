# Repo Boundary Map

Status: Active reference
Scope: Sibling-repo boundaries and anti-confusion rules for local AJ Digital repos
Runtime impact: None
Implementation status: Documentation only

## Purpose

Several locally cloned repos have similar names and overlapping product language.
This map records the **verified** boundaries so agents and operators do not mix
them. Facts below were verified from local Git remotes/branches on 2026-07-09.

## Boundary Table

| Local folder | Remote (`origin`) | Product / meaning | Relationship |
|---|---|---|---|
| `C:\dev\florida-ramp-and-lift-ops` | `…/AudioJones-Dev/florida-ramp-and-lift-ops.git` | **This repo.** FRL operational intelligence platform; Next.js + Clerk mock/manual MVP scaffold. | Canonical `main`. |
| `C:\dev\florida-ramp-and-lift-ops-contractor-billing-mvp` | `…/AudioJones-Dev/florida-ramp-and-lift-ops.git` | Same repo, branch `feat/invoice-contractor-management-mvp`. | Worktree/clone of **this** repo — same product, different branch. |
| `C:\dev\frl-contractor-portal` | `git@github.com:AudioJones-Dev/FRL-CONTRACTOR-PORTAL.git` | **Separate product.** Contractor portal (different stack: Supabase / Render). | Different repo — do not mix. |
| `C:\dev\frl-contractor-portal-pr29` | `git@github.com:AudioJones-Dev/FRL-CONTRACTOR-PORTAL.git` | Contractor-portal PR / detached worktree. | Worktree of the contractor portal — do not mix. |
| `C:\dev\florida platform lift pros` | `…/AudioJones-Dev/floridaplatformliftpros.git` | Separate site / business repo. | Different repo. |

## Three product families

1. **Ops platform** — `florida-ramp-and-lift-ops.git` (this repo **and** its
   `…-contractor-billing-mvp` worktree). Next.js + Clerk mock scaffold; no live
   persistence, storage, integrations, or deploy authorized here.
2. **Contractor portal** — `FRL-CONTRACTOR-PORTAL.git` (`frl-contractor-portal`
   and `…-pr29`). A **separate** product with its own stack, docs, and deploy path.
3. **Site** — `floridaplatformliftpros.git`. Separate again.

## Anti-confusion rules

- Verify `git remote -v` before editing (see `REPO_IDENTITY.md`). Same-named
  folders are **not** the same repo; a different remote means a different product.
- Do **not** copy architecture, stack, or deploy assumptions from
  `FRL-CONTRACTOR-PORTAL` into this repo. This repo has no Supabase runtime, no
  migrations, no storage buckets, no API clients, and no production deploy config.
- A **shared** remote (e.g. the `…-contractor-billing-mvp` worktree) is the **same**
  product on a different branch — coordinate via branches/PRs, not by treating it as
  a different product.

## Open questions (operator to reconcile)

- Domain-name overlap across siblings remains unresolved for deployment. This
  repo names `floridarampandliftops.com` as the internal-pilot ops domain, while
  live DNS currently routes the apex, `www`, `admin`, `client`, `contractor`,
  and `platform` hosts to Render-backed sibling-product surfaces. The five
  Clerk CNAMEs added in G2 are non-overlapping and verified, but G3/G6 must not
  attach or replace any existing host until the operator assigns host ownership
  explicitly. Do not infer ownership from sibling repos.

## See Also

- `REPO_IDENTITY.md` — canonical identity card.
- Root `AGENTS.md` — "Repo Identity / Anti-Confusion".
- `CLAUDE.md` — Claude Code session entry guard.
