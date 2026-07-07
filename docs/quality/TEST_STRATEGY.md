# Test Strategy

Status: Git Spec-ready draft
Scope: Testing approach for documentation-first FRL work and future implementation
Runtime impact: None
Implementation status: Documentation only

## Purpose

This strategy defines how FRL repo changes should be validated before they are treated as complete.

## Documentation Validation

For documentation changes:

- Confirm docs are FRL-specific and not empty templates.
- Confirm runtime impact is stated.
- Confirm new docs are linked from `docs/DOCUMENTATION_INDEX.md` or nearest README.
- Confirm no live integration authorization was introduced by wording drift.
- Confirm no secrets or customer-sensitive files were added.

## Current Local Commands

Preferred checks:

```powershell
npm run typecheck
npm run lint
```

Optional policy check:

```powershell
python .codex/hooks/repo_policy.py --check
```

## Future Runtime Test Areas

| Area | Required test focus |
|---|---|
| Role routing | Users only reach permitted surfaces. |
| Object permissions | Contractors and clients see only scoped records. |
| State machine | Invalid transitions are blocked. |
| Invoice readiness | Client release requires approval. |
| Contractor payout | Payout and client invoice data remain separated. |
| Dispatch | External sends require human approval. |
| Safety | Missing PPE/docs block completion or invoice readiness where required. |
| Integrations | Retries, idempotency, skip behavior, and manual fallback. |

## Acceptance Test Rule

Every future implementation branch must add or identify acceptance tests that prove the human approval gate still exists.
