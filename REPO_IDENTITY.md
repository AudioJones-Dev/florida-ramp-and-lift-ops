# Repo Identity

Status: Active identity contract
Scope: Canonical identity for this repository and anti-confusion guard
Runtime impact: None
Implementation status: Documentation only

## Canonical Identity

| Field | Value |
|---|---|
| Product | Florida Ramp & Lift Operational Intelligence Platform (ops platform) |
| Owner | AJ Digital LLC / Audio Jones |
| Canonical local path | `C:\dev\florida-ramp-and-lift-ops` |
| Canonical remote (`origin`) | `https://github.com/AudioJones-Dev/florida-ramp-and-lift-ops.git` |
| Production branch | `main` |
| Stack | Next.js + Clerk auth shell; mock/manual MVP scaffold |
| Posture | Documentation-first. No live persistence, storage, integrations, secrets, or production deploy is authorized. |

## What This Repo Is

- The internal **operational intelligence platform** (command center) for Florida
  Ramp & Lift — internal-first per `docs/architecture/mvp-definition.md`.
- A mock/manual MVP scaffold with a Clerk auth **shell** (no real keys) and a
  documentation-first architecture.
- Governed by the root `AGENTS.md` (DOX framework) and the AJ Digital OS
  governance kernel.

## What This Repo Is NOT

- **NOT** `FRL-CONTRACTOR-PORTAL`
  (`git@github.com:AudioJones-Dev/FRL-CONTRACTOR-PORTAL.git`, local
  `C:\dev\frl-contractor-portal`). That is a **separate product** with a different
  stack. Do **not** import its assumptions into this repo — no Supabase runtime,
  no migrations, no storage buckets, no API clients, no Render deploy, and no live
  domains exist here.
- **NOT** `floridaplatformliftpros`
  (`https://github.com/AudioJones-Dev/floridaplatformliftpros.git`, local
  `C:\dev\florida platform lift pros`).
- **NOT** a public SaaS, a client portal, a HubSpot/QuickBooks replacement, or a
  production integration hub (see `docs/architecture/mvp-definition.md`).

## Identity Verification (run before editing)

Confirm you are in the right repository before any edit:

```powershell
pwd
git remote -v
git rev-parse --show-toplevel
```

**STOP** if the `origin` remote is not
`…AudioJones-Dev/florida-ramp-and-lift-ops.git`. You are in the wrong repository —
do not edit; re-orient to the correct path.

## See Also

- Root `AGENTS.md` — binding work contract (DOX) + "Repo Identity / Anti-Confusion".
- `CLAUDE.md` — Claude Code session entry guard.
- `docs/system/REPO_BOUNDARY_MAP.md` — verified sibling-repo boundary table.
