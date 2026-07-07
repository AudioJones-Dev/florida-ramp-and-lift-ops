# Security

Status: Git Spec-ready draft
Scope: Security posture for FRL documentation-first planning and future implementation
Runtime impact: None
Implementation status: Documentation only

## Purpose

This document defines the security baseline for the Florida Ramp & Lift Operational Intelligence Platform.

## Current Scope

The repo is documentation-first. No production auth, database, storage, SMS/email, HubSpot, QuickBooks, PDF, or AI runtime integration is authorized by this document.

## Security Principles

- No secrets, credentials, tokens, customer PDFs, private rate sheets, or sensitive client files in Git.
- No Firebase packages, config, env names, or implementation path.
- Role-based access must be combined with object-level permissions.
- Contractor, client, internal, and financial data must remain separated.
- Human approval is required for invoice release, payout action, dispatch send, safety exception handling, and external communication.
- Future storage for photos/PDFs must use an approved storage policy before production files are ingested.

## Sensitive Data Categories

| Category | Repo rule |
|---|---|
| Secrets and tokens | Never committed. Use approved secret manager only after environment policy approval. |
| Customer PDFs/photos | Not stored in repo. Use sanitized samples only. |
| Private rate sheets | Do not commit unless sanitized and explicitly approved. |
| Contractor payout data | Treat as sensitive financial data. |
| Client invoice data | Separate from contractor payout logic. |
| Safety records | Preserve auditability and review gates. |

## Future Implementation Requirements

Before runtime implementation:

- Define auth provider and role model.
- Define RLS or equivalent object-level access controls.
- Define storage bucket policy for photos/PDFs.
- Define audit logging for sensitive views, approvals, overrides, and releases.
- Define incident response and rollback steps.

## Does Not Authorize

This document does not authorize creating secrets, env files, buckets, migrations, auth clients, production storage, or live integrations.
