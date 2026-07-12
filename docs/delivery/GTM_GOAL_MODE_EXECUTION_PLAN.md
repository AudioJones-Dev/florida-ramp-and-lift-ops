# End-to-End GTM Goal-Mode Execution Plan

Status: Git Spec-ready draft pending operator review
Scope: Controlled delivery from the current Phase B preflight through internal adoption, real-data MVP acceptance, and post-pilot hardening
Runtime impact: None
Implementation status: Documentation only; no provider action, deploy, persistence work, or release is authorized

## Purpose

This plan converts the repository's release, readiness, and deployment contracts into an executable goal sequence for two cooperating agent harnesses. It is designed to keep work moving without repeatedly asking the operator to restate repository context, while preserving the approvals that require human authority.

For this product, go-to-market means controlled adoption by Florida Ramp & Lift personnel. It does not mean a public SaaS launch or an external client portal.

## Desired Outcomes

1. Deliver a fixture-only authenticated internal pilot without exposing real customer or contractor data.
2. Prove authentication, protected routes, operational screens, rollback, and reviewer workflows on the approved application host.
3. Build the persistence, object-access, storage, and audit foundations required for real operational data.
4. Complete a client-operational MVP acceptance cycle with named owners, evidence, support, and rollback.
5. Add integrations only after the core workflow is stable and each integration has its own approval and rollback boundary.

## Source-of-Truth Boundaries

This plan sequences work; it does not replace the owning specifications:

- Product boundary: `docs/architecture/mvp-definition.md`
- Implementation gate: `docs/architecture/implementation-readiness-gate.md`
- Authentication: `docs/architecture/auth-foundation.md`
- Persistence: `docs/architecture/persistence-design.md`
- Release sequence: `docs/delivery/RELEASE_PLAN.md`
- Phase B gates: `docs/delivery/PHASE_B_INTERNAL_PILOT_CHECKLIST.md`
- Deployment configuration: `docs/delivery/DEPLOYMENT_TARGET.md`
- Pilot checks: `docs/delivery/PILOT_VERIFICATION_SCRIPT.md`
- Fixture evidence: `docs/delivery/FIXTURE_SANITIZATION_CHECKLIST.md`
- Migration sequence: `docs/delivery/MIGRATION_PLAN.md`
- Readiness definitions: `docs/governance/DEFINITION_OF_READY.md`, `docs/governance/DEFINITION_OF_DONE.md`, and `docs/governance/DEFINITION_OF_STABLE.md`

If an owning document contradicts this plan, stop the affected work item and reconcile the documents before execution.

## Launch Milestones

### Milestone 1: Authenticated Internal Pilot

The Phase B pilot uses approved fictional fixtures only. It proves the application shell, Clerk email/password authentication, role surfaces, route protection, deployment controls, verification procedure, and rollback. It is not evidence that persistence, real-data authorization, document storage, integrations, or production automation are ready.

### Milestone 2: Client-Operational MVP

The client-operational MVP may use real operational data only after the persistence design, object-level access model, audit/event persistence, storage policy, legal requirements, and readiness review are accepted and implemented. This is the first milestone that can support real work as defined by `mvp-definition.md`.

## Current-State Snapshot

| Area | Current state | Next evidence |
|---|---|---|
| G0 gate ladder | Accepted | None |
| G1 domain and DNS access | Confirmed | None |
| G2 Clerk production configuration | Complete | Continue monitoring only |
| G3 Vercel project/link | Complete | Re-verify Git integration remains disconnected at G5 |
| G4 Preview environment names | Complete | Production values remain separately gated |
| Fixture sanitization | Pre-deploy evidence complete 2026-07-11 | Run S9 against the gated Preview before G5 closes |
| Legal/privacy circulation | Pending; does not block operator-only Preview verification | Q6 reviewer, target date, approved disposition, and approved public URLs before sharing |
| Internal reviewers | Pending; does not block operator-only Preview verification | Q5 reviewer roster and review window before sharing |
| G5 Preview deploy | Not authorized | Complete preflight, then receive explicit deploy approval |
| Persistence and real data | Design-only/blocked | Readiness review and accepted Phase C implementation plan |

This snapshot is informative and may drift. Every goal run must re-read the owning documents and current Git/provider state before acting.

## End-to-End Goal Sequence

### GTM-0: Verify the Accepted G5 Baseline

Entry:

- Current `main` and open pull requests are inspected.
- The fixture-sanitization evidence and accepted Phase B boundary are present on
  `main`.

Agent work:

- Re-run the fixture scans and confirm no real-company identity remains in
  runtime fixtures.
- Confirm S1-S8 and S10 remain complete and S9 remains a post-deploy G5
  acceptance check.
- Re-read the Phase B G5 and Deployment Target Preview checklists for drift.

Human gates:

- None unless refreshed evidence discovers a new fixture or identity finding.

Exit evidence:

- Sanitization checklist has no unresolved pre-deploy fixture finding.
- Runtime fixture scans are clean.
- The 2026-07-11 F4 names-only operator confirmation remains recorded without
  roster contents.

Rollback:

- Revert only a new evidence correction if it proves inaccurate. The accepted
  fixture reconciliation remains on `main`; no provider state is involved.

### GTM-1: Close G5 Preflight Blockers

Entry:

- GTM-0 complete.
- G2 through Preview G4 evidence is present on `main`.

Agent work:

- Re-run current-SHA typecheck, lint, and build.
- Verify Preview environment variable names only.
- Verify Git integration remains disconnected.
- Verify the fixture checklist has no pre-deploy blocker.
- Assemble the Preview-scoped gate evidence required by
  [`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md)
  G5 and [`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md) Preview: the accepted
  fixture-only implementation boundary, current-SHA security/build checks,
  protected-route and role-surface verification scope, operator-only
  non-circulation disposition, and action-specific human approval. The role
  boundary is owned by
  [`role-permission-matrix.md`](../schemas/role-permission-matrix.md) and
  [`saas-portal-access-model.md`](../architecture/saas-portal-access-model.md);
  the security baseline is owned by [`SECURITY.md`](../quality/SECURITY.md).
- Prepare the legal/privacy circulation evidence request.
- Prepare the internal reviewer list and test-account requirements.

Human gates:

- Create or authorize the Clerk development test users without sharing credentials in Git or chat.
- Approve the exact G5 Preview deployment at the current SHA.

Circulation gates, which do not block operator-only deployment and verification:

- Before sharing the Preview URL, name the authorized internal reviewers and
  review window (Q5).
- Before sharing the Preview URL, name the legal/privacy reviewer and record
  the target date and approved disposition satisfying the legal circulation
  gate (Q6).

Exit evidence:

- G5 preflight report explicitly records the accepted Preview-scoped evidence
  for implementation readiness, security, role/access, operator-only
  non-circulation, and human approval. Q5/Q6 remain visible as circulation
  blockers rather than deployment-mechanics blockers. Full readiness gate
  section 22 remains a G6 Production requirement, as defined by the owning
  checklists.
- The exact Preview deploy command is SHA-pinned and ready, but not yet run.

Rollback:

- Documentation-only corrections are reverted by pull request. No deployment exists yet.

### GTM-2: Deploy and Accept the Preview

Entry:

- GTM-1 complete.
- [`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md)
  G5 and [`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md) Preview record the
  accepted fixture-only implementation boundary, current-SHA security/build
  checks, protected-route and role-surface verification scope, legal
  circulation hold, and required human approvals. Full object-level access
  implementation is not claimed for this sanitized-fixture Preview. Q5/Q6 may
  remain open only while the Preview stays operator-only and non-circulated.
- Operator gives an explicit G5 Preview deploy approval for the current SHA.

Agent work:

- Run the approved CLI Preview deployment command.
- Record the immutable deployment URL and source SHA.
- Execute `PILOT_VERIFICATION_SCRIPT.md` across authentication and every role surface.
- Complete S9 as a post-deploy acceptance check.
- Capture defects with severity, route, expected result, actual result, and evidence.

Human gates:

- Use test-account credentials where interactive authentication is required.
- Accept or reject the Preview after reviewing the evidence.

Exit evidence:

- Required routes pass on the exact deployment.
- Mock/demo labels remain visible where required.
- No unresolved release-blocking defect remains.
- S9 is recorded for the deployed SHA.
- The Preview URL remains undisclosed unless Q5 reviewer authorization and Q6
  legal approval satisfying the circulation gate are both recorded.

Rollback:

- Remove access to or stop using the Preview deployment. Do not promote it.

### GTM-3: Prove Rollback and Operational Support

Entry:

- Preview acceptance completed.

Agent work:

- Execute the non-destructive rollback rehearsal defined by G7.
- Verify the previous known-good deployment can be identified and restored by the documented procedure.
- Prepare incident ownership, support intake, escalation, and evidence templates.

Human gates:

- Approve any action that changes live provider state.
- Confirm support owner and escalation contact.

Exit evidence:

- G7 rollback evidence is complete.
- Support and incident owners are named.
- Recovery steps are executable without relying on chat history.

Rollback:

- This phase is itself the rollback proof; destructive project deletion is never part of the generic rollback path.

### GTM-4: Prepare the Fixture-Only Production Pilot

Entry:

- Preview accepted and rollback proven.

Agent work:

- Prepare Production environment name/value transfer under the G4 Production gate, without exposing values.
- Verify `ops.floridarampandliftops.com` remains the approved application host and existing Render-backed hosts remain untouched.
- Verify legal/public URL requirements, monitoring, reviewer roster, and go/no-go agenda.
- Re-run current-SHA validation and production preflight.

Human gates:

- Approve Production environment writes.
- Approve any DNS/custom-domain action.
- Accept legal/public copy and public URLs.
- Convene the named readiness/go-no-go review.

Exit evidence:

- Production prerequisites are green and recorded.
- The production deploy command and rollback target are SHA-pinned.
- No real operational data is present.

Rollback:

- Remove newly written Production environment values if the gate is abandoned; preserve existing unrelated hosts and provider state.

### GTM-5: Run the Fixture-Only Production Pilot

Entry:

- GTM-4 complete.
- [`implementation-readiness-gate.md`](../architecture/implementation-readiness-gate.md)
  section 22 is satisfied for the pilot scope, and
  [`RELEASE_PLAN.md`](./RELEASE_PLAN.md) release gates record accepted
  DoR/DoD/DoS, security review, role/object-permission boundaries, secret
  hygiene, and rollback evidence, as required by
  [`PHASE_B_INTERNAL_PILOT_CHECKLIST.md`](./PHASE_B_INTERNAL_PILOT_CHECKLIST.md)
  G6 and the [`DEPLOYMENT_TARGET.md`](./DEPLOYMENT_TARGET.md) Production
  checklist.
- Legal/public URL disposition and all action-specific human approvals are
  recorded in the owning G6 evidence.
- Operator gives explicit G6 production deploy approval for the current SHA.

Agent work:

- Deploy through the approved CLI command only.
- Bind or verify the approved application host only under the separate DNS/custom-domain approval.
- Execute the production pilot verification script.
- Monitor authentication, route failures, build/runtime errors, and access boundaries.

Human gates:

- Production deploy approval.
- DNS/custom-domain approval if still required.
- Pilot go/no-go and reviewer acceptance.

Exit evidence:

- Authenticated internal reviewers can complete the fixture-only workflow.
- No real data, production automation, or deferred integration is active.
- Monitoring and rollback are proven on the live pilot.

Rollback:

- Restore the prior deployment or remove pilot access using the G7 procedure.

### GTM-6: Stabilize Internal Adoption

Entry:

- Fixture-only production pilot accepted.

Agent work:

- Consolidate reviewer findings into prioritized defects and workflow gaps.
- Track usability, route reliability, support demand, and repeated manual work.
- Update product and release documentation with accepted decisions.

Human gates:

- Prioritize workflow changes with the client owner.
- Approve any public/client-facing communication.

Exit evidence:

- No unresolved P1/P2 defect.
- Named reviewers complete the agreed scenarios.
- Support ownership and issue-response targets are operating.
- Phase C scope is based on observed pilot gaps rather than assumed needs.

Rollback:

- Keep the system fixture-only or suspend pilot access while defects are corrected.

### GTM-7: Build the Persistence and Access Foundation

Entry:

- Phase B closes.
- The implementation readiness review accepts the persistence design and Phase C scope.

Agent work:

- Implement the accepted persistence adapter and schema in small, reversible increments.
- Enforce object-level role and tenant access server-side.
- Persist audit/event evidence for governed actions.
- Add migration, backup, restore, and rollback evidence.

Human gates:

- Approve dependencies, migrations, database/provider creation, secrets, and environment writes.
- Approve the accepted data model and access matrix.

Exit evidence:

- Persistence, access-control, migration, and recovery tests pass.
- Cross-role and cross-tenant denial probes are recorded.
- No fixture fallback can silently masquerade as persisted production data.

Rollback:

- Follow the accepted migration rollback plan; destructive data operations require separate approval.

### GTM-8: Add Controlled Document Storage

Entry:

- Persistence and access foundation stable.
- Storage policy and retention requirements accepted.

Agent work:

- Implement approved upload, metadata, retrieval, and deletion boundaries.
- Add file-type, size, malware, authorization, retention, and audit checks.

Human gates:

- Approve storage provider, paid plan, retention policy, and any real file use.

Exit evidence:

- Storage authorization and failure-mode tests pass.
- Real files cannot cross tenant or role boundaries.

Rollback:

- Disable new uploads and preserve governed records according to the accepted retention policy.

### GTM-9: Accept the Real-Data Client-Operational MVP

Entry:

- Persistence, access, audit, storage, legal, and security gates complete.
- A controlled real-data migration/entry plan is approved.

Agent work:

- Run an inventory-first data import or controlled entry process.
- Execute end-to-end operational scenarios with authorized users.
- Verify decision authority, invoice-release boundaries, audit history, backup, and recovery.

Human gates:

- Approve real customer/client data use.
- Approve client-facing release and financial workflows.
- Preserve Michael Keegan as MVP final authority for client-facing invoice release.

Exit evidence:

- Named client users complete the agreed real-data scenarios.
- Security, legal, recovery, and operational acceptance are signed off.
- Definition of Done and Definition of Stable are satisfied.

Rollback:

- Stop new data entry, restore the accepted backup/known-good release, and preserve audit evidence.

### GTM-10: Add Integrations and Harden Operations

Entry:

- Client-operational MVP is stable.

Agent work:

- Add one approved integration at a time with contract tests, idempotency, observability, and rollback.
- Start with the highest-value verified workflow gap, not provider availability.
- Maintain manual approval for client-facing communication, invoice release, payout release, and safety-sensitive decisions.

Human gates:

- Approve each provider, paid plan, secret, external write, and production release.

Exit evidence:

- Each integration has an owner, monitored failure modes, replay/recovery, and documented removal path.
- Integration failures cannot corrupt the core operational record.

Rollback:

- Disable the integration and return to the stable manual/core workflow.

## Workstreams And Measures

| Workstream | Pilot measure | Client-operational measure |
|---|---|---|
| Release | 100% required route checks pass on the deployed SHA | Releases satisfy DoD/DoS and have a tested rollback target |
| Security | Protected routes and role surfaces deny unauthorized access | Object-level cross-role/cross-tenant probes pass |
| Data | Zero real customer/contractor data in fixture pilot | Authorized records persist with complete audit history |
| Legal | Reviewer, circulation, and disposition recorded | Approved public Terms/Privacy URLs and operating notices are live |
| Reliability | Zero unresolved P1/P2 defects; rollback rehearsal passes | Backup/restore and incident response meet accepted targets |
| Adoption | Named reviewers complete assigned scenarios | Named client users complete agreed operational workflows |
| Support | Owner, intake path, and escalation are named | Issues are triaged and resolved against agreed response targets |

Build success alone is not a GTM measure. A milestone is complete only when its user, security, operational, and rollback evidence is complete.

## Dual-Harness Operating Contract

### UltraCode/Claude Control-Room Lane

Owns:

- Decision register and open-question reconciliation.
- Legal/reviewer scheduling records and operator-ready asks.
- Status board, dependency map, gate evidence review, and documentation redlines.
- Cross-document contradiction checks.

Does not own:

- Runtime code, provider writes, deployment commands, secrets, migrations, or duplicate implementation work.

### Codex Goal-Execution Lane

Owns:

- Repository inspection, scoped implementation, tests, builds, CLI verification, Git branches, and pull requests.
- Provider operations only when a named gate explicitly authorizes that exact action.
- Evidence updates grounded in commands actually run.

Does not own:

- Legal acceptance, roster attestation, secret entry, real-data authorization, financial/client-facing release authority, or unapproved production deployment.

### Human/Operator Lane

Owns:

- Legal and public-copy acceptance.
- Private roster confirmation and real-data authorization.
- Credential entry/authentication when an agent cannot perform it safely.
- Paid-provider, DNS/custom-domain, production deploy, destructive, financial, and client-facing release approvals.

### Coordination Rules

- One work item has one active owner and one branch.
- The two harnesses must not edit the same branch or receive the same broad implementation prompt.
- The repository, current diff, provider readback, and validation output outrank chat summaries.
- Handoffs use a commit SHA, branch, evidence paths, validation results, blocker, and next eligible task.
- Secret values never enter prompts, Git, evidence docs, logs, or handoff records.

## Goal Run Contract

Every long-running harness goal must declare:

```text
Objective:
Eligible work item:
Owning harness:
Entry evidence:
Definition of done:
Permitted actions:
Prohibited actions:
Human gates:
Stop conditions:
Validation:
Checkpoint artifact:
Next eligible task:
```

Stop the goal when:

- A required human gate is reached.
- The source documents contradict each other.
- The current branch or SHA differs from the approved work item.
- A secret value, real customer data, destructive action, external write, or deployment falls outside the explicit approval.
- Validation fails and the smallest safe repair would exceed the work-item scope.

## Shared Checkpoint Format

Each completed or paused run should leave this state in its PR body or owning execution record:

```yaml
phase:
work_item:
owner:
branch:
head_sha:
base_sha:
files_changed:
evidence:
validation:
provider_state:
blocker:
human_action:
next_eligible_task:
rollback:
```

Do not put secret values, private roster contents, credentials, or client data in the checkpoint.

## Harness Start Prompts

### Codex Goal Mode

```text
Objective: Execute the next eligible Codex-owned work item from
docs/delivery/GTM_GOAL_MODE_EXECUTION_PLAN.md until its exit evidence is
complete or a named human gate is reached.

Repository: <repository-root>

Before acting, verify the repository identity, remote, branch, worktree, and
applicable AGENTS.md chain. Re-read the owning source documents and current
provider state. Use one codex/* branch for one work item. Make the smallest
scope-complete change, run the required validation, update durable evidence,
and open a PR when the work item changes the repository.

Do not expose or request secret values. Do not delete, migrate, deploy, change
DNS/custom domains, write production environment values, use real customer
data, publish legal copy, or make financial/client-facing releases unless the
current work item names that exact action and the operator has given its
required proceed. Do not perform the UltraCode/Claude control-room lane.

At every checkpoint report the shared checkpoint fields and the single next
best recommended task with exact operator or agent instructions.
```

### UltraCode/Claude Goal Mode

```text
Objective: Operate the GTM control room defined by
docs/delivery/GTM_GOAL_MODE_EXECUTION_PLAN.md. Keep the gate status, decisions,
open questions, reviewer/legal asks, dependency map, and acceptance evidence
current until the next named human gate or Codex execution task is ready.

Repository: <repository-root>

Verify repository identity and read the applicable AGENTS.md chain before
editing. Treat repository and provider evidence as authoritative over chat.
Use a docs-only branch for scoped reconciliation. Do not edit runtime code,
execute provider writes, deploy, handle secret values, create migrations, or
duplicate a Codex-owned task. Route executable repository work to Codex with
the exact eligible work item, constraints, evidence, and definition of done.

At every checkpoint report the shared checkpoint fields and the single next
best recommended task with exact operator or agent instructions.
```

These prompts are command-neutral. Start each harness's native long-running goal mode and use the matching objective; do not invent unsupported harness CLI flags.

## Human Approval Matrix

| Action | Agent may prepare | Explicit human approval required |
|---|---|---|
| Docs-only plan or evidence PR | Yes | Merge under repository policy |
| Runtime fixture/code repair | Yes | Merge; broader behavior changes require `proceed` |
| Test-user creation | Prepare instructions/readback | Yes |
| Secret or environment value write | Names-only plan/readback | Yes |
| Preview deploy | Preflight and exact command | Yes, G5 |
| Production deploy | Preflight and exact command | Yes, G6 |
| DNS/custom-domain change | Collision check and rollback | Yes |
| Migration/database/storage | Design, tests, dry-run | Yes |
| Legal/public copy | Draft and review packet | Yes |
| Real customer/client data | Inventory and controlled plan | Yes |
| Financial/client-facing release | Evidence and recommendation | Yes |
| Destructive action | Inventory, impact, and rollback | Yes, action-specific |

## Resume And Recovery

On a fresh task or after context loss:

1. Verify the current `<repository-root>`, canonical remote, current branch,
   worktree, and status.
2. Read the root and nearest `AGENTS.md` files.
3. Read this plan, the owning phase document, the latest execution record, and open PR state.
4. Confirm the last checkpoint against Git and provider readback.
5. Resume only the next eligible work item. Do not replay completed provider actions from chat history.

## Risks

- Treating the fixture-only pilot as a real-data MVP would bypass the largest security and operational gates.
- Giving both harnesses the same broad task creates duplicate branches, contradictory docs, and unclear ownership.
- Allowing Git integration before the accepted gate could bypass CLI-controlled deployment approvals.
- Recording secret values or private roster evidence in durable artifacts would turn safety evidence into exposure.
- Adding integrations before persistence and access controls stabilize would increase failure modes without proving the core workflow.
- Status tables can become stale; command and provider evidence must be refreshed before every gated action.

## Acceptance Criteria

This plan is accepted when:

- The operator confirms the two-milestone GTM definition.
- Phase sequence and human gates match the owning architecture and delivery docs.
- UltraCode/Claude and Codex have non-overlapping ownership and usable start prompts.
- Every phase defines entry, evidence, human gates, exit, and rollback.
- The plan does not authorize a provider action, deploy, persistence change, real-data use, or public release by itself.

## Does Not Authorize

This document does not authorize user creation, legal publication, DNS or custom-domain changes, secret/environment writes, provider setup, dependency changes, migrations, storage, integrations, real customer data, Preview or Production deployment, or financial/client-facing release. Each remains behind its owning gate and an action-specific operator approval.
