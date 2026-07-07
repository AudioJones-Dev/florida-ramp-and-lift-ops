# Failure Modes

Status: Git Spec-ready draft
Scope: Known failure modes for FRL planning and future implementation
Runtime impact: None
Implementation status: Documentation only

## Purpose

This document lists likely failure modes so design and implementation work can build manual fallback and review gates first.

## Product Failure Modes

| Failure mode | Risk | Control |
|---|---|---|
| Contractor submits incomplete job evidence. | Billing delay or bad invoice. | Documentation review and invoice readiness queue. |
| Zone or trip charge is wrong. | Incorrect invoice or payout. | Admin review and override with audit reason. |
| Contractor split is wrong. | Payout dispute. | Finance review before payout action. |
| Client invoice includes contractor-only information. | Data leak and trust loss. | Separate invoice and payout objects. |
| Dashboard shows fake certainty. | Bad executive decisions. | Mark incomplete data and draft totals. |
| AI prepares unsafe recommendation. | Unapproved action risk. | Agents cannot approve, send, release, or override. |

## Technical Failure Modes

| Failure mode | Risk | Control |
|---|---|---|
| Live integration fails or retries duplicate action. | Duplicate messages, records, or invoices. | Idempotency keys and manual review before live sends. |
| Storage accepts private files before policy. | Sensitive file exposure. | No production file ingestion before storage policy. |
| Auth exists without object-level permissions. | Cross-role data exposure. | Role matrix and object ownership gate. |
| Generated scaffold introduces Firebase. | Platform drift. | Dependency/config review. |
| Secrets are written to repo. | Credential exposure. | Secret grep and approved secret manager only. |

## Manual Fallback Rule

Every future runtime feature must define how a human can continue the workflow if automation fails.
