# Repo Identity

Status: Active identity contract
Scope: Canonical identity for this repository and anti-confusion guard
Runtime impact: None
Implementation status: Documentation only

## Canonical Identity

| Field | Value |
|---|---|
| Product posture | Preserved Florida Ramp & Lift planning/reference source |
| Owner | AJ Digital LLC / Audio Jones |
| Canonical local path | `C:\dev\florida-ramp-and-lift-ops` |
| Canonical remote (`origin`) | `https://github.com/AudioJones-Dev/florida-ramp-and-lift-ops.git` |
| Default/reference branch | `main` |
| Preserved stack | Next.js + Clerk auth shell; mock/manual MVP scaffold |
| Canonical runtime | `AudioJones-Dev/FRL-CONTRACTOR-PORTAL` (AJ Digital FieldOps Platform) |
| Posture | Runtime development and deployment frozen; no live hostname or production authority. |

## What This Repo Is

- A preserved planning/reference source for Florida Ramp & Lift operational
  intelligence concepts.
- A historical mock/manual MVP scaffold with a Clerk auth shell and a
  documentation-first architecture.
- Governed by the root `AGENTS.md` (DOX framework) and the AJ Digital OS
  governance kernel.
- Frozen under `docs/governance/SOURCE_REPO_FREEZE.md`.

## What This Repo Is NOT

- **NOT** the canonical Tier 4 runtime. That authority belongs to
  `FRL-CONTRACTOR-PORTAL`
  (`git@github.com:AudioJones-Dev/FRL-CONTRACTOR-PORTAL.git`, local
  `C:\dev\frl-contractor-portal`). Do not import its runtime into this repo;
  reconcile useful source concepts into that platform through approved target
  specs.
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
- `docs/governance/SOURCE_REPO_FREEZE.md` — controlling freeze decision.
