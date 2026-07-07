# Risk Register

Status: Git Spec-ready draft
Scope: Tier 4 risk register for FRL planning and future implementation
Runtime impact: None
Implementation status: Documentation only

## Purpose

This register tracks the main risks that can destabilize the Florida Ramp & Lift operational intelligence platform.

## Risk Scale

- High: can cause financial, safety, privacy, production, or strategic failure.
- Medium: can cause rework, confusion, delayed delivery, or operational friction.
- Low: manageable documentation or workflow risk.

## Current Risks

| Risk | Level | Current control | Owner |
|---|---|---|---|
| Premature live integration before manual workflow validation. | High | Implementation readiness gate blocks live HubSpot, QuickBooks, SMS/email, storage, PDF, and AI runtime work. | AJ Digital / repo operator |
| Firebase drift from generated scaffolds or agent suggestions. | High | Root AGENTS and readiness gate prohibit Firebase packages, configs, env names, and implementation path. | Implementation agent |
| Contractor payout data leaking into client-facing invoice views. | High | Canonical schema and role matrix require financial separation. | Finance / implementation reviewer |
| Client-facing invoice release without Michael approval. | High | MVP docs require Michael Keegan final authority. | Owner / finance reviewer |
| Treating mock data as production truth. | High | Root AGENTS requires mock data remain mock. | All agents |
| Secrets or customer files committed to repo. | High | Docs and AGENTS prohibit secrets, credentials, customer PDFs, private rate sheets, and sensitive client files. | All contributors |
| Competing schemas for the same business object. | Medium | Canonical schema doc defines object names; readiness gate blocks competing meanings. | Architecture reviewer |
| Documentation layer sprawl. | Medium | Documentation index maps existing docs to Tier 4 layers. | Documentation owner |
| Wording drift that authorizes production behavior. | Medium | New docs must include runtime impact and "does not authorize" boundaries. | Documentation reviewer |
| Unclear branch/worktree ownership. | Medium | Worktree plan defines branch classes and cleanup expectations. | Repo operator |

## Review Cadence

Review this register before:

- Any implementation branch.
- Any live integration decision.
- Any migration toward production persistence.
- Any client-facing portal or invoice release work.
- Any broad documentation restructure.

## Escalation Rule

If a high risk becomes active or unmitigated, pause implementation and update the relevant architecture or governance doc before continuing.
