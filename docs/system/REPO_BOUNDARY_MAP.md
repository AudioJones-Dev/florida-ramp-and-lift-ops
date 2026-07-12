# Repo Boundary Map

Status: Active reference
Scope: Sibling-repo boundaries and anti-confusion rules for local AJ Digital repos
Runtime impact: None
Implementation status: Documentation only

## Purpose

Several locally cloned repos have similar names and overlapping product language.
This map records the **verified** boundaries so agents and operators do not mix
them. Repository and domain state was re-verified on 2026-07-12.

## Boundary Table

| Local folder | Remote (`origin`) | Product / meaning | Relationship |
|---|---|---|---|
| `C:\dev\florida-ramp-and-lift-ops` | `…/AudioJones-Dev/florida-ramp-and-lift-ops.git` | **This repo.** Preserved planning/reference source with a Next.js + Clerk mock scaffold. | Runtime/deployment frozen; default `main`. |
| `C:\dev\florida-ramp-and-lift-ops-contractor-billing-mvp` | `…/AudioJones-Dev/florida-ramp-and-lift-ops.git` | Same repo, branch `feat/invoice-contractor-management-mvp`. | Worktree/clone of **this** repo — same product, different branch. |
| `C:\dev\frl-contractor-portal` | `git@github.com:AudioJones-Dev/FRL-CONTRACTOR-PORTAL.git` | **Canonical Tier 4 product.** AJ Digital FieldOps Platform with FRL as first tenant (Supabase / Render). | Production source of truth. |
| `C:\dev\frl-contractor-portal-pr29` | `git@github.com:AudioJones-Dev/FRL-CONTRACTOR-PORTAL.git` | Contractor-portal PR / detached worktree. | Worktree of the contractor portal — do not mix. |
| `C:\dev\florida platform lift pros` | `…/AudioJones-Dev/floridaplatformliftpros.git` | Separate site / business repo. | Different repo. |

## Three product families

1. **Planning/reference source** — `florida-ramp-and-lift-ops.git` (this repo
   **and** its worktrees). Next.js + Clerk mock scaffold; runtime and deployment
   frozen.
2. **Canonical Tier 4 platform** — `FRL-CONTRACTOR-PORTAL.git`
   (`frl-contractor-portal` and its worktrees). AJ Digital FieldOps Platform,
   with Florida Ramp & Lift as the first tenant and the contractor portal as its
   first production module.
3. **Site** — `floridaplatformliftpros.git`. Separate again.

## Anti-confusion rules

- Verify `git remote -v` before editing (see `REPO_IDENTITY.md`). Same-named
  folders are **not** the same repo; a different remote means a different product.
- Do **not** copy the canonical runtime into this repo. Source concepts flow in
  the opposite direction only after reconciliation and explicit approval in
  `FRL-CONTRACTOR-PORTAL`.
- A **shared** remote (e.g. the `…-contractor-billing-mvp` worktree) is the **same**
  product on a different branch — coordinate via branches/PRs, not by treating it as
  a different product.

## Domain boundary

- Operator decision (2026-07-12): this repo owns no live application hostname.
- Existing Render-backed apex, `www`, `admin`, `client`, `contractor`, and
  `platform` hosts belong to the canonical platform and must not be altered by
  this repo.
- Clerk's five supporting CNAMEs remain shared domain infrastructure and are
  already verified historical provider state; they do not authorize an app
  deployment from this repo.
- `ops.floridarampandliftops.com` currently has no application DNS record. It is
  reserved pending a separate canonical-platform decision and is not a
  deployment target for this repo.

## See Also

- `REPO_IDENTITY.md` — canonical identity card.
- Root `AGENTS.md` — "Repo Identity / Anti-Confusion".
- `CLAUDE.md` — Claude Code session entry guard.
- `docs/governance/SOURCE_REPO_FREEZE.md` — controlling source-repo freeze.
