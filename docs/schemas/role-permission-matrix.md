# Role Permission Matrix

Status: Draft
Owner: AJ Digital LLC / Audio Jones
Scope: Florida Ramp & Lift Operational Intelligence Platform

## Purpose

This document defines MVP role permissions for the platform. It prevents Executive OS, Operations OS, Financial OS, agents, and dashboard workflows from drifting into conflicting authority models.

Permissions are product-level planning rules, not implementation code.

## Permission Legend

| Permission | Meaning |
|---|---|
| Read | View records and dashboard summaries. |
| Write | Create or edit records in allowed areas. |
| Approve | Make explicit human approval decisions. |
| Escalate | Assign or raise alerts/tasks to higher authority. |
| Dispatch | Prepare or send dispatch-related operational decisions. |
| Invoice | Prepare, review, approve, or release invoice-related records. |
| Override | Change calculated fields, blocked states, rates, splits, zones, or review holds. |

## Roles

- Owner
- Executive
- Office Admin
- Dispatcher
- Installer
- Lead Installer
- Contractor
- Finance
- AI Agent

## MVP Permission Matrix

| Role | Read | Write | Approve | Escalate | Dispatch | Invoice | Override |
|---|---|---|---|---|---|---|---|
| Owner | All records | All records except raw secrets | All business approvals | All alerts/tasks | Approve/override | Final client invoice authority | Full audited override |
| Executive | Executive dashboards, reports, alerts | Executive notes/tasks | Strategic approvals if assigned | Yes | No direct dispatch by default | Read financial summaries | No unless assigned |
| Office Admin | Operations, customers, jobs, communications, docs | Intake, jobs, communications, tasks | Intake/completion if assigned | Yes | Prepare/approve if assigned | Prepare, not final client release | Limited audited override |
| Dispatcher | Jobs, dispatch, contractors, locations, safety flags | Dispatch drafts, crew assignments, job scheduling | Dispatch approval if assigned | Dispatch/safety alerts | Prepare and send after approval | No | Route/crew override with reason |
| Installer | Assigned jobs, dispatch, safety, documentation | Field notes, job submissions, documentation | No approval authority | Safety/job exceptions | View assigned dispatch | No | No |
| Lead Installer | Assigned crew jobs, dispatch, safety, documentation | Field notes, completion packages, crew notes | No financial approval | Safety/job exceptions | Confirm receipt/status | No | No |
| Contractor | Own jobs, own documentation, own payout summaries when released | Own submissions and notes | No approval authority | Own job exceptions | View assigned dispatch | View own approved payout info | No |
| Finance | Invoices, payouts, approved jobs, financial alerts | Invoice drafts, payout records, review notes | Contractor billing; client invoices only if delegated future role | Financial alerts | No | Prepare/review; Michael final MVP release | Financial override with reason |
| AI Agent | Records explicitly granted to agent role | Drafts, suggestions, flags, summaries | No final approval | Recommend escalation | Suggest only | Suggest/review only | No |

## Object-Level Permission Notes

| Object | Default Read | Default Write | Approval Authority |
|---|---|---|---|
| Customer | Owner, Executive, Office Admin | Office Admin | Owner/Admin for enterprise activation. |
| Location | Office Admin, Dispatcher | Office Admin, Dispatcher | Admin for zone/access overrides. |
| Communication | Owner, Office Admin, assigned roles | Office Admin; agents draft only | Human approval before external send. |
| Lead | Owner, Executive, Office Admin | Office Admin | Human approval before estimate send or job conversion. |
| Job | Operations roles | Office Admin, Dispatcher, assigned field users | Admin approval before approved/billing states. |
| WorkOrder | Operations/Admin/Finance | Office Admin | Admin acceptance and invoice readiness review. |
| Dispatch | Operations/field assigned roles | Dispatcher/Office Admin | Human approval before send. |
| Contractor | Owner, Office Admin, Finance | Office Admin; Finance for pay fields | Owner/Admin for role/status/pay changes. |
| Equipment | Operations roles | Office Admin | Human review for missing/damaged/retired. |
| Documentation | Operations/Finance where relevant | Field users submit; admins review | Human approval for completion/billing evidence. |
| Invoice | Owner, Finance | Finance drafts/reviews | Michael Keegan final MVP client release. |
| Payout | Owner, Finance | Finance drafts/reviews | Human approval before payout action. |
| Alert | Relevant owner/role | System/agents may draft; humans resolve | Human acknowledgement for critical alerts. |
| Task | Assigned users | Assigned users | Completion does not imply approval. |
| Approval | Relevant approvers | System creates requests; humans decide | Human only. |
| User | Owner/Admin | Owner/Admin | Owner/Admin. |
| Role | Owner/Admin | Owner/Admin | Owner/Admin. |

## AI Agent Permission Boundary

AI Agent is a restricted role class. Agents may:

- Read records granted to the agent.
- Prepare drafts, summaries, flags, tasks, and recommendations.
- Recommend state transitions.
- Recommend alerts and escalations.
- Generate approval packets for human review.

Agents may not:

- Approve records.
- Send external communications.
- Release invoices.
- Execute payouts.
- Override financial calculations.
- Override safety blocks.
- Delete records.
- Modify secrets or credentials.
- Write to live third-party systems without a separately approved integration and human gate.

## MVP Approval Authority Decisions

- Michael Keegan is final MVP approval authority for client-facing invoice release.
- Future phases may delegate approval to Office Admin, Finance Manager, or Operations Manager.
- All client-facing invoice release requires explicit human approval.
- Contractor payout approval requires human approval.
- Dispatch instructions require human approval before external send.
- Safety exceptions require human acknowledgement and resolution notes.
