# Glossary

Status: Git Spec-ready draft
Scope: Shared terminology for the FRL operational intelligence repo
Runtime impact: None
Implementation status: Documentation only

## Core Terms

| Term | Meaning |
|---|---|
| FRL | Florida Ramp & Lift, the operating business and first implementation target. |
| AJ Digital | Platform strategy, support, and implementation partner. |
| Operational Intelligence Platform | Internal command and review layer for jobs, dispatch, documentation, invoice readiness, payouts, alerts, and approvals. |
| MVP | Manual/mock internal operational control layer; not a public SaaS launch. |
| Job | Unit of field work and the central operational object. |
| Work Order | Client-issued authorization or description of work, especially WillScot PDFs. |
| Scope Line Item | Billable work item from a work order or rate sheet. |
| Dispatch Assignment | Crew/date/job sequencing record. |
| Documentation Artifact | Photo, signature, PDF, note, or evidence needed for review. |
| Invoice Readiness | State where a job has enough reviewed evidence to prepare invoice records. |
| Contractor Payout | Contractor-facing financial record separate from client invoice. |
| Client Invoice | Client-facing invoice record that must not expose contractor payout logic. |
| Approval | Explicit human decision record for sensitive actions. |
| AuditLog | Record of sensitive view, change, approval, override, send, or escalation. |
| AI Agent | Future restricted role that can prepare work but cannot approve sensitive actions. |

## Source-Of-Truth Terms

| Term | Meaning |
|---|---|
| GitHub | Execution, specifications, docs, workflows, code, and schemas. |
| Obsidian | Business memory and decision rationale. |
| HubSpot | Future CRM source of truth for sales and customer relationship visibility. |
| QuickBooks | Future final accounting ledger; not replaced by this platform. |
| Approved storage provider | Future storage for production photos/PDFs after policy approval. |
