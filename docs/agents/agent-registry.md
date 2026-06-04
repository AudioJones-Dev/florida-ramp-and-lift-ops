# Agent Registry

Status: Draft
Owner: AJ Digital LLC / Audio Jones
Scope: Florida Ramp & Lift Operational Intelligence Platform

## Purpose

This document defines the future agent registry for the platform. It describes what each agent may prepare, what it may not do, where it must escalate, and which human approval gates protect the business.

These are planning definitions only. No live AI agent, CRM integration, dispatch integration, billing integration, email, SMS, or third-party automation is implemented by this document.

## Registry Doctrine

- Agents respond to state changes and review queues.
- Agents prepare work; humans approve sensitive actions.
- Agents must cite source records in recommendations.
- Agents must preserve financial, contractor, client, and internal data boundaries.
- Agents must not introduce Firebase, secrets, live third-party writes, or silent external communication.

## Executive Assistant Agent

| Field | Definition |
|---|---|
| Purpose | Prepare executive summaries, risk briefs, review queues, and follow-up recommendations. |
| Inputs | Jobs, invoices, communications, alerts, tasks, approvals, safety exceptions, documentation gaps. |
| Outputs | Daily/weekly summaries, exception briefs, decision packets, follow-up task recommendations. |
| Allowed Actions | Summarize, prioritize, draft internal notes, flag missing data, recommend escalation. |
| Restricted Actions | Send communications, approve invoices, approve dispatch, approve payouts, change job states, make commitments. |
| Escalation Rules | Escalate critical safety, financial, client-impacting, or unanswered communication issues to Owner/Executive. |
| Human Approval Gates | Any external message, financial decision, policy decision, or client-facing action. |

## Dispatch Agent

| Field | Definition |
|---|---|
| Purpose | Prepare dispatch drafts, route/sequence suggestions, missing-data checks, and schedule exception flags. |
| Inputs | Scheduled jobs, locations, contractors, equipment, safety records, documentation requirements, communications. |
| Outputs | Dispatch draft, crew/day sequence, route suggestions, missing-data alerts, materials/PPE checklist prompts. |
| Allowed Actions | Assign jobs in draft state, suggest routes, rebalance schedules in draft state, flag access/safety/material gaps, recommend schedule changes. |
| Restricted Actions | Send dispatch instructions, override safety flags, release invoices, modify payouts, delete jobs. |
| Escalation Rules | Escalate missing address, missing crew, PPE gap, site access risk, or route conflict to Dispatcher/Office Admin. |
| Human Approval Gates | Dispatch send, crew assignment finalization, safety exception dismissal, route override. |

## CRM Agent

| Field | Definition |
|---|---|
| Purpose | Prepare CRM-ready records, lead summaries, follow-up tasks, and communication history summaries. |
| Inputs | Leads, customers, communications, jobs, tasks, alerts. |
| Outputs | CRM draft payloads, lead qualification summaries, follow-up task recommendations, missing contact flags. |
| Allowed Actions | Draft CRM updates, recommend follow-up, identify unanswered communications, flag stale leads. |
| Restricted Actions | Write to live CRM, send follow-up, change lead status to converted, create customer commitments. |
| Escalation Rules | Escalate hot leads, missed calls, unanswered messages, and customer complaints to Office Admin/Owner. |
| Human Approval Gates | Live CRM write, estimate send, lead-to-job conversion, external follow-up. |

## Invoice Agent

| Field | Definition |
|---|---|
| Purpose | Prepare invoice draft checks, readiness summaries, missing-evidence flags, and financial review packets. |
| Inputs | Approved jobs, work orders, invoices, documentation, contractor data, alerts, approvals. |
| Outputs | Invoice readiness report, draft invoice validation, missing documentation list, anomaly flags. |
| Allowed Actions | Validate required fields, prepare draft summaries, flag missing docs, identify split/rate inconsistencies. |
| Restricted Actions | Approve invoices, send invoices, finalize invoices, execute payment, change rate sheets, modify payouts. |
| Escalation Rules | Escalate missing documentation, conflicting totals, missing rate sheet, client invoice readiness, and overdue invoices to Finance/Owner. |
| Human Approval Gates | Michael Keegan approval for MVP client-facing invoice release; Finance/Owner approval for payout-sensitive action. |

## Contractor Billing Agent

| Field | Definition |
|---|---|
| Purpose | Prepare contractor payout summaries, split checks, documentation gaps, and payout-review queues. |
| Inputs | Contractor records, jobs, invoices, payouts, documentation, approvals, alerts. |
| Outputs | Contractor payout draft summary, split anomaly flags, missing evidence list, payout readiness report. |
| Allowed Actions | Calculate draft summaries, flag anomalies, prepare review packets, recommend hold reasons. |
| Restricted Actions | Approve payouts, execute payouts, expose client rates to contractors, modify contractor pay fields. |
| Escalation Rules | Escalate split conflicts, missing documentation, safety blockers, adjustment requests, and payout holds to Finance/Owner. |
| Human Approval Gates | Payout approval, pay field changes, adjustment approval, contractor-facing release. |

## Documentation Agent

| Field | Definition |
|---|---|
| Purpose | Check documentation completeness, map evidence to SOP requirements, and flag missing records. |
| Inputs | Jobs, work orders, safety records, documentation records, contractor submissions, SOPs, tasks. |
| Outputs | Completeness report, missing-documentation alerts, SOP reference list, closeout review packet. |
| Allowed Actions | Validate completeness, summarize evidence, flag missing signatures/photos/notes, recommend documentation tasks. |
| Restricted Actions | Approve incomplete documentation, rewrite authoritative SOPs, dismiss safety exceptions, expose sensitive files. |
| Escalation Rules | Escalate missing safety evidence, missing completion photos, missing signatures, and disputed documentation to Operations/Safety reviewer. |
| Human Approval Gates | Documentation approval, safety exception resolution, billing-ready evidence acceptance. |

## Alert Agent

| Field | Definition |
|---|---|
| Purpose | Detect runtime alert conditions and recommend persisted alerts when thresholds are crossed. |
| Inputs | Jobs, invoices, communications, contractors, documentation, safety records, tasks, approvals. |
| Outputs | Runtime alert recommendations, persisted-alert draft records, severity suggestions, escalation recommendations. |
| Allowed Actions | Derive alerts, assign suggested severity, recommend owner, recommend escalation. |
| Restricted Actions | Resolve alerts, dismiss alerts, silently escalate external issues, override owners without review. |
| Escalation Rules | Critical financial and safety alerts escalate to Owner/Executive. Operational blockers escalate to Office Admin/Dispatcher. |
| Human Approval Gates | Alert dismissal, critical alert resolution, owner override, escalation closure. |

## Agent Event Triggers

Agents may react to:

- Lead created or unanswered.
- Job scheduled, submitted, approved, held, incomplete, or return_needed.
- Dispatch draft created or missing required fields.
- Documentation missing, submitted, rejected, or held.
- Invoice enters needs_review, held, approved, sent, or overdue.
- Contractor compliance or payout issue detected.
- Communication unanswered after threshold.
- Alert crosses persistence threshold.
- Approval requested, approved, rejected, or held.

## Global Restrictions

No agent may:

- Release client-facing invoices.
- Send SMS, email, CRM messages, or external communications without approval.
- Execute payment or payout.
- Delete operational records.
- Modify secrets or credentials.
- Introduce Firebase.
- Write to live third-party systems before integration approval.
- Override human review gates.
