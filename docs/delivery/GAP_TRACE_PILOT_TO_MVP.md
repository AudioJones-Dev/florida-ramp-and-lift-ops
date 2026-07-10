# Gap Trace — Pilot To Client-Deliverable MVP

Status: Git Spec-ready draft — pending operator review
Scope: Dependency-backed trace from the Phase B internal pilot through controlled persistence to the client-deliverable live MVP
Runtime impact: None
Implementation status: Documentation only

## Purpose

This trace uses the repository's semantic dependency graph to answer, with
edge evidence rather than assertion: **what actually stands between the Phase
B pilot and the client-deliverable live MVP** (gap-closure Phase E). It
complements [`LIVE_APP_GAP_CLOSURE_PLAN.md`](./LIVE_APP_GAP_CLOSURE_PLAN.md),
which owns the phase sequence.

## Evidence provenance

- Extracted 2026-07-10 from repository commit
  `b9cd3bb75b098fef84f2278726eb0c46057f3a96` (recorded as `built_at_commit`
  in `graphify-out/graph.json` and in `GRAPH_REPORT.md`).
- Tool: repository-local Graphify `0.9.12` (venv at `.graphify-venv/`,
  locally excluded). Semantic extraction — exact command (the repo's own
  Doppler binding is `florida-ramp-and-lift/dev`, so the key's
  project/config must be passed explicitly):

  ```powershell
  doppler run --project aj-digital-os --config dev -- .\.graphify-venv\Scripts\graphify.exe extract . --backend openai --out .
  ```

  The OpenAI API key is injected transiently and never persisted.
  `graphify update .` is the later structural refresh only (no API cost, per
  `GRAPH_REPORT.md`).
- Graph mode: **undirected** (`"directed": false` in `graph.json`); edge
  direction shown below follows the `references` relation's source→target as
  recorded per edge.
- Corpus and counts are **snapshot values at that commit**: 85 code files,
  138 documents; 1,665 nodes, 2,223 edges, 176 labeled communities.
  Diagnostics at extraction: zero duplicate, dangling, missing-endpoint, or
  self-loop edges. Graph outputs are local-only (`graphify-out/` excluded
  from Git); re-run the extraction to reproduce them.
- Articulation validation procedure (reproducible; executed 2026-07-10 at the
  snapshot commit): (1) load `graphify-out/graph.json` and build undirected
  adjacency over `links`; (2) select the pilot node set
  {`docs_delivery_phase_b_internal_pilot_checklist_md`,
  `docs_delivery_deployment_target`,
  `docs_delivery_g2_clerk_production_runbook`,
  `docs_delivery_g3_g4_vercel_env_runbook_md`,
  `docs_delivery_live_app_gap_closure_plan_md`} and the MVP node set
  {`docs_architecture_persistence_design`, `docs_architecture_mvp_definition`,
  `docs_architecture_saas_portal_access_model`,
  `docs_architecture_event_driven_architecture`}; (3) record baseline
  reachability with the graph intact — of the 20 selected pilot/MVP pairs
  (5 pilot × 4 MVP), **8 are connected** (all 4 pairs from
  `docs_delivery_deployment_target` and all 4 from
  `docs_delivery_g2_clerk_production_runbook`) and **12 are already
  disconnected** (the checklist, G3/G4 runbook, and gap-closure plan have no
  MVP-set path in the snapshot); (4) **remove
  `docs_architecture_implementation_readiness_gate` from the graph and
  re-check all 20 pairs — the 8 previously connected paths are eliminated,
  leaving 0 of 20 connected.** The gate is the sole bridge for the connected
  pairs in these node sets at this snapshot.

## Dependency spine (graph-evidenced)

`references` relations extracted from the graph, with canonical doc links:

- [Phase B Internal Pilot Checklist](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md) → [Live App Gap-Closure Plan](./LIVE_APP_GAP_CLOSURE_PLAN.md)
- [G2 Clerk Production Runbook](./G2_CLERK_PRODUCTION_RUNBOOK.md) → [Deployment Target](./DEPLOYMENT_TARGET.md)
- [G3/G4 Vercel And Environment Runbook](./G3_G4_VERCEL_ENV_RUNBOOK.md) → [Phase B Internal Pilot Checklist](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md)
- [Deployment Target](./DEPLOYMENT_TARGET.md) → [Implementation Readiness Gate](../architecture/implementation-readiness-gate.md)
- [Implementation Readiness Gate](../architecture/implementation-readiness-gate.md) → [Persistence Design](../architecture/persistence-design.md)
- [Implementation Readiness Gate](../architecture/implementation-readiness-gate.md) → [MVP Definition](../architecture/mvp-definition.md)
- [Implementation Readiness Gate](../architecture/implementation-readiness-gate.md) → [Event-Driven Architecture](../architecture/event-driven-architecture.md)
- [Implementation Readiness Gate](../architecture/implementation-readiness-gate.md) → [SaaS Portal Access Model](../architecture/saas-portal-access-model.md)
- [Implementation Readiness Gate](../architecture/implementation-readiness-gate.md) → [HubSpot CRM Integration Model](../architecture/hubspot-crm-integration-model.md)
- [Implementation Readiness Gate](../architecture/implementation-readiness-gate.md) → [Worksie Integration Strategy](../architecture/worksie-integration-strategy.md)
- [Persistence Readiness Review](../qa/persistence-readiness-review.md) → [Phase B Internal Pilot Checklist](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md)
- [Risk Register](../governance/RISK_REGISTER.md) → [Phase B Internal Pilot Checklist](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md)

Reading: the pilot-delivery chain (Phase B docs → Deployment Target) and the
MVP-architecture chain (Persistence Design, MVP Definition, access/event
models) connect through exactly one articulation point — the
**[Implementation Readiness Gate](../architecture/implementation-readiness-gate.md)**.
At the snapshot commit, no graph path from the pilot to the
client-deliverable MVP bypasses it (validation procedure above).

## What the trace implies

1. **The validated pilot chain is persistence-free.** Within the validated
   node set, no path reaches Persistence Design except through the readiness
   gate — and three of the five selected pilot docs have no MVP-set path at
   all in the snapshot. This is a claim about the selected node sets at the
   snapshot commit, **not** about every G1–G7 artifact; it is consistent with
   the design intent that the pilot ships on fixtures.
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
| T1 | [Persistence Design](../architecture/persistence-design.md) not yet accepted (blocks Phase C) | [Gate](../architecture/implementation-readiness-gate.md) → Persistence Design edge; [`persistence-design.md`](../architecture/persistence-design.md) §22 acceptance step | Operator acceptance + migration-spec branch charter |
| T2 | Object-level access rules not implemented (blocks Phase C/E) | [Gate](../architecture/implementation-readiness-gate.md) → [SaaS Portal Access Model](../architecture/saas-portal-access-model.md) edge; Clerk-alone-is-not-authz risk ([`auth-foundation.md`](../architecture/auth-foundation.md)) | Access-rule spec → migrations/policies in Phase C |
| T3 | Event/audit persistence absent (blocks Phase C/E) | [Gate](../architecture/implementation-readiness-gate.md) → [Event-Driven Architecture](../architecture/event-driven-architecture.md) edge; mock timelines only | `events`/`audit_logs` implementation per [design §12](../architecture/persistence-design.md) |
| T4 | Storage/security policy unaccepted (blocks Phase D) | MVP boundary: no real customer PDFs before storage policy ([`mvp-definition.md`](../architecture/mvp-definition.md)) | Storage policy + bucket/metadata design acceptance |
| T5 | Readiness-gate §22 go/no-go never convened (blocks G6 and Phase E) | Q7 unanswered in [`PHASE_B_G1_OPEN_QUESTIONS.md`](./PHASE_B_G1_OPEN_QUESTIONS.md) | Scheduled review session + recorded sign-off |
| T6 | Ops-domain Terms/Privacy unpublished (blocks pilot circulation and Phase E) | Gap plan → [Legal Doctrine](../legal/LEGAL_PRIVACY_DOCTRINE.md) edge; Q6 unanswered | Counsel/operator-approved legal copy + publication gate |
| T7 | Pilot execution gates G2–G7 unexecuted (block Phase B completion) | Runbooks exist; Q3 resolved 2026-07-10; no G2–G7 completion evidence | Operator `proceed` per gate; G2 Clerk configuration next |

Graph-quality note: the highest-degree nodes (`draft_job`, `draft_work_order`,
schema primitives like `null`/`string`) reflect schema-property normalization
noise, not delivery dependencies; they are excluded from this trace.

## Sequence consequence

The shortest dependency-consistent path to the client-deliverable MVP is
unchanged from the gap-closure plan, now with edge evidence:

1. Finish Phase B execution (T7, with Q3 first). During Phase B,
   **review and redlining of [Persistence Design](../architecture/persistence-design.md)
   may proceed** — it is documentation work with no runtime effect.
2. **Formal T1 acceptance and Phase C execution begin only after Phase B
   closes** — acceptance converts the design into an implementation mandate,
   and the phase order stays intact.
3. Then Phase C (T1–T3), Phase D (T4), and the Phase E gates (T5–T6).

No trace evidence supports skipping or reordering a phase.

## Does Not Authorize

This trace authorizes nothing. It is analysis over committed documentation and
code; every gap closure above retains its own gate and operator `proceed`.
