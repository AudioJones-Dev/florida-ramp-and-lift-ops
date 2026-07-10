# Gap Trace — Pilot To Client-Deliverable MVP

Status: Git Spec-ready draft — pending operator review
Scope: Dependency-backed trace from the Phase B internal pilot through controlled persistence to the client-deliverable live MVP
Runtime impact: None
Implementation status: Documentation only

## Purpose

This trace uses the repository's semantic dependency graph (Graphify 0.9.12;
1,665 nodes / 2,223 edges over 85 code files and 138 documents; graph outputs
are local-only and not committed) to answer, with edge evidence rather than
assertion: **what actually stands between the Phase B pilot and the
client-deliverable live MVP** (gap-closure Phase E). It complements
[`LIVE_APP_GAP_CLOSURE_PLAN.md`](./LIVE_APP_GAP_CLOSURE_PLAN.md), which owns
the phase sequence.

## Dependency spine (graph-evidenced)

Edges below are `references` relations extracted from the graph:

```txt
Phase B Internal Pilot Checklist ──> Live App Gap-Closure Plan
G2 Clerk Production Runbook      ──> Deployment Target
G3/G4 Vercel And Env Runbook     ──> Phase B Internal Pilot Checklist
Deployment Target                ──> Implementation Readiness Gate
Implementation Readiness Gate    ──> Persistence Design
Implementation Readiness Gate    ──> MVP Definition
Implementation Readiness Gate    ──> Event-Driven Architecture
Implementation Readiness Gate    ──> SaaS Portal Access Model
Implementation Readiness Gate    ──> HubSpot CRM Integration Model
Implementation Readiness Gate    ──> Worksie Integration Strategy
Persistence Readiness Review     ──> Phase B Internal Pilot Checklist
Risk Register                    ──> Phase B Internal Pilot Checklist
```

Reading: the pilot-delivery chain (Phase B docs → Deployment Target) and the
MVP-architecture chain (Persistence Design, MVP Definition, access/event
models) connect through exactly one articulation point — the
**Implementation Readiness Gate**. There is no graph path from the pilot to
the client-deliverable MVP that bypasses it.

## What the trace implies

1. **Phase B (pilot) is deliberately persistence-free.** No edge requires
   Persistence Design for any G1–G7 artifact; the pilot chain terminates at
   Deployment Target. The pilot can ship on fixtures without touching the MVP
   chain — as designed.
2. **Everything MVP-ward funnels through the readiness gate.** The
   client-deliverable live MVP (gap-closure Phase E) is blocked by the
   readiness-gate requirements that reference Persistence Design, the SaaS
   Portal Access Model (object-level access), and Event-Driven Architecture
   (events/audit). These are the Phase C/D prerequisites.
3. **Integration models are gate-referenced but not MVP-blocking.** HubSpot
   and Worksie edges exist on the gate for boundary enforcement, not as Phase
   C–E dependencies — consistent with the plan's Phase F placement.

## Gap register — what has no closing artifact yet

| # | Gap (blocks) | Evidence | Closing artifact required |
|---|---|---|---|
| T1 | Persistence design not yet accepted (blocks Phase C) | Gate → Persistence Design edge; `persistence-design.md` §22 acceptance step | Operator acceptance + migration-spec branch charter |
| T2 | Object-level access rules not implemented (blocks Phase C/E) | Gate → SaaS Portal Access Model edge; Clerk-alone-is-not-authz risk | Access-rule spec → migrations/policies in Phase C |
| T3 | Event/audit persistence absent (blocks Phase C/E) | Gate → Event-Driven Architecture edge; mock timelines only | `events`/`audit_logs` implementation per design §12 |
| T4 | Storage/security policy unaccepted (blocks Phase D) | MVP boundary: no real customer PDFs before storage policy | Storage policy + bucket/metadata design acceptance |
| T5 | Readiness-gate §22 go/no-go never convened (blocks G6 and Phase E) | Q7 unanswered in [`PHASE_B_G1_OPEN_QUESTIONS.md`](./PHASE_B_G1_OPEN_QUESTIONS.md) | Scheduled review session + recorded sign-off |
| T6 | Ops-domain Terms/Privacy unpublished (blocks pilot circulation and Phase E) | Gap plan → Legal Doctrine edge; Q6 unanswered | Counsel/operator-approved legal copy + publication gate |
| T7 | Pilot execution gates G2–G7 unexecuted (block Phase B completion) | Runbooks exist; Q3 unanswered; no provider state | Operator `proceed` per gate; Q3 provenance/rotation first |

Graph-quality note: the highest-degree nodes (`draft_job`, `draft_work_order`,
schema primitives like `null`/`string`) reflect schema-property normalization
noise, not delivery dependencies; they are excluded from this trace.

## Sequence consequence

The shortest dependency-consistent path to the client-deliverable MVP is
unchanged from the gap-closure plan, now with edge evidence: finish Phase B
execution (T7, with Q3 first) in parallel with T1 acceptance work; then Phase
C (T1–T3), Phase D (T4), and the Phase E gates (T5–T6). No trace evidence
supports skipping or reordering a phase.

## Does Not Authorize

This trace authorizes nothing. It is analysis over committed documentation and
code; every gap closure above retains its own gate and operator `proceed`.
