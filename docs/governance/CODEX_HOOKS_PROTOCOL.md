# Codex Hooks Protocol — florida-ramp-and-lift-ops

Codex hooks are an **enforcement** layer and are treated separately from documentation.

Canonical source: `02-OPERATING-SYSTEM/Protocols/CODEX_HOOKS_PROTOCOL_TEMPLATE.md` (AJ Digital vault)

| Field | Value |
| --- | --- |
| repo | `florida-ramp-and-lift-ops` |
| status | **configured / advisory** (non-destructive; blocking behavior not verified) |
| activation_level | L4 (human "proceed" required to go further) |
| hook script | `.codex/hooks/repo_policy.py` |
| owner | AJ Digital / Audio Jones |
| last_reconciled | 2026-06-13 |

## Current hook status

**Configured / advisory — not verified as blocking enforcement.** This repo has an installed, working Codex hook configuration:

- `.codex/hooks.json` — present
- `.codex/hooks/repo_policy.py` — present (dependency-free, **non-destructive**: it reports risks and returns a non-zero exit code to signal "stop and get approval"; it does not modify files)
- `.github/workflows/worktree-protocol.yml` — **not present** (no CI mirror)

> **Note (git state, 2026-06-13):** the `.codex/` directory is currently **untracked in git** (`?? .codex/`). The hook exists on disk but is not yet committed. Committing it is a separate, approval-gated step — this document does not commit or modify it.

This document records the hook **exactly as found**. It does not change behavior, rename scripts, add config, or enable blocking enforcement.

## What the installed hook does

Configured in `.codex/hooks.json`:

| Event | Command | Purpose |
| --- | --- | --- |
| `pre_edit` | `python .codex/hooks/repo_policy.py --check` | Scans the working tree for obvious repo policy violations before agent edits. |
| `pre_commit` | `python .codex/hooks/repo_policy.py --check --staged` | Scans staged files for secrets, forbidden runtime, dependency changes, and approval-gated runtime changes. |

`repo_policy.py` flags (reports issues and exits non-zero on findings; whether that blocks depends on whether the Codex runtime honors the exit code):

- **Secret markers:** `api_key=`, `apikey=`, `private_key`, `client_secret`, `access_token`, `refresh_token`, `hubspot_access_token`, `quickbooks_client_secret`.
- **Forbidden runtime** (in runtime paths): `firebase`, `firestore`, `firebaseauth`, `firebase storage`.
- **Approval-gated config/dependency files:** `package.json`, `package-lock.json`, `next.config.ts`, `eslint.config.mjs`.
- **Approval-gated runtime markers** (in runtime paths): `createClient(`, `supabase`, `clerk`, `hubspot`, `quickbooks`, `resend`, `twilio`, `pdf-lib`, `puppeteer`, `playwright`, `s3client`, `r2`.
- **Runtime path** = anything under `src/` or one of the approval-gated config files (Markdown files are excluded).

On finding issues, the script prints them and exits non-zero with: *"Stop and get operator approval if these changes were not explicitly authorized."* The script excludes itself from scanning.

## Actions hooks would be expected to prevent (when later approved as blocking)

- Edits to protected runtime paths (`src/**`) and approval-gated config files without an approved branch.
- Commits of secrets or `.env` values.
- Commits to `main` / a dirty worktree that bypass the worktree protocol.

## Where hook configuration lives

```text
.codex/hooks.json                      # present (untracked as of 2026-06-13)
.codex/hooks/repo_policy.py            # present (untracked as of 2026-06-13)
.github/workflows/worktree-protocol.yml # NOT present (CI mirror, if ever approved)
```

> **Naming note:** this repo's script is `repo_policy.py` (events `pre_edit` / `pre_commit`). Earlier AJ Digital repo copies reference `worktree_policy.py`. Canonical script-name reconciliation is tracked in the vault adoption matrix and is **not** changed here.

## Activation

Promoting this from **advisory → blocking**, adding a CI workflow, or changing the hook config/scripts is a **Level 4** change requiring explicit human approval ("proceed"). The default state is stop and report.

## Rollback (if hook behavior is ever changed/enabled further)

- Remove or revert the added `.codex/**` and/or `.github/workflows/**` files on an isolated branch.
- Do not delete unrelated files. Do not reset shared branches without approval.

---
*Docs-only backfill created 2026-06-13. Documents the existing advisory hook as-found. No hook config, scripts, workflows, package files, env files, or runtime code were modified.*
