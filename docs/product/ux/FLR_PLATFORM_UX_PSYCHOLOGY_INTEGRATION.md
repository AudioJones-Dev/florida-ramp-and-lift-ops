# FLR Platform UX Psychology Integration

Status: Git Spec-ready draft
Scope: Product UX requirements for the Florida Ramp & Lift platform
Runtime impact: None
Implementation status: Documentation only

## Purpose

This document translates approved behavioral UX principles into build requirements for the Florida Ramp & Lift operational intelligence platform.

The platform remains a documentation-first, mock/manual MVP scaffold until implementation readiness gates are accepted. This document does not authorize live persistence, storage, auth changes, email/SMS delivery, PDF generation, CRM/accounting writes, runtime AI, invoice release, payout execution, production deployment, secrets, or Firebase.

## Current Scope

These requirements apply to future product design and implementation planning for:

- Contractor job intake and submission.
- Mobile-first field documentation.
- Billing review and payout visibility.
- Client invoice review and approval queues.
- Contractor onboarding and compliance states.
- Client estimate/intake flows.
- Platform navigation and role-specific access.
- AI-assisted documentation and draft preparation surfaces.

## Source-Of-Truth Boundaries

This document depends on and must not contradict:

- `docs/architecture/mvp-definition.md`
- `docs/architecture/implementation-readiness-gate.md`
- `docs/architecture/saas-portal-access-model.md`
- `docs/architecture/web-and-mobile-strategy.md`
- `docs/workflows/contractor-billing-workflow.md`
- `docs/workflows/invoice-approval-workflow.md`
- `docs/schemas/operational-state-machine.md`
- `docs/schemas/role-permission-matrix.md`
- `docs/agents/agent-registry.md`
- `docs/guardrails/financial-data-guardrails.md`

If a UX requirement conflicts with those sources, stop and resolve the source-of-truth conflict before implementation.

## UX Thesis

Florida Ramp & Lift users are not logging in to use software. They are trying to submit jobs quickly, avoid billing mistakes, get paid correctly, document field work, keep clients informed, reduce admin back-and-forth, approve invoices confidently, preserve proof of work, and move faster without losing control.

The product should feel like:

> The system already understands the job. I just need to review, confirm, and submit.

It should not feel like another blank operational form.

## Approved UX Principles

The following behavioral UX principles are approved for FRL product planning:

- Smart defaults.
- Progress momentum.
- Reciprocity before extraction.
- User investment and ownership.
- Cost-of-inaction visibility.
- Contextual framing and contrast.

These principles may improve completion, trust, onboarding, approval speed, pricing comprehension, and operational adoption. They must not be used to deceive, coerce, shame, fabricate urgency, hide risk, or manipulate users into actions against their interest.

## In Scope

- Screen-level UX requirements.
- Copy patterns and anti-patterns.
- Role-specific navigation expectations.
- Acceptance criteria for contractor, admin, client, and AI-assisted screens.
- Metrics that future implementation should measure.

## Out Of Scope

- Runtime code changes.
- Database, schema, migration, storage, auth, or provider setup.
- Live HubSpot, QuickBooks, email, SMS, PDF, payment, payout, or AI integrations.
- Public website copy changes.
- Production deployment.
- Any bypass of Michael Keegan's MVP final authority for client-facing invoice release.

## Human Approval Gates

Human approval remains required before:

- Client-facing invoice release.
- Contractor payout approval or release.
- Billing overrides, payout split changes, trip/zone charge overrides, or invoice adjustments.
- Customer-facing communications.
- Compliance status changes.
- AI-generated operational output used for high-impact decisions.
- Any live integration write or external send.

## Contractor Job Submission UX

Contractor job submission should avoid blank forms when safe defaults exist.

The system should pre-fill, when available and authorized:

- Contractor name from logged-in user.
- Contractor role from account profile.
- Tenant/company from account context.
- Job date as current date.
- Job type from selected workflow.
- Service category from intake source.
- Client/customer from assigned job.
- Job address from dispatch record.
- Zone from address logic.
- Trip charge from zone rules.
- Payout split from tenant default.
- Lead installer from assignment.
- Additional installers from job team.
- Invoice recipient from client configuration.
- Required media checklist from job type.

Approved copy:

- "Pre-filled from job assignment. Review before submitting."
- "Suggested by zone rules."
- "Tenant default split applied."

Guardrail:

Any default affecting payout, billing, zone charge, trip charge, or client invoice must be visible, editable by authorized roles, and logged.

## Contractor Submission Progress

Submission flows should count real progress when job data already exists.

Suggested flow:

1. Job confirmed.
2. Work details.
3. Photos/media.
4. Billing review.
5. Submit for approval.

Use:

- "20% complete - job assignment loaded."
- "60% complete - photos uploaded."
- "Continue job report" when any job data already exists.

Do not mark billing review complete until the contractor or admin has reviewed the billing summary.

## Mobile-First Field UX

Contractor-facing workflows must be thumb-friendly, low-friction, and field-appropriate.

Interface rules:

- One primary action per screen.
- Large tap targets.
- Clear section headers.
- Minimal typing.
- Photo upload entry from camera or file picker when storage is approved.
- Voice note capture only after media/storage and transcription boundaries are approved.
- GPS/address assist only after location permission and privacy rules are approved.
- Draft saving when persistence is approved; until then, mock/draft states must be labeled as local or demo-only.
- Plain-language labels.
- No dense tables for field users.
- Review screen before submission.

Every contractor-facing workflow should answer:

1. What job is this?
2. What do I need to submit?
3. What has already been completed?
4. What affects my payout?
5. What happens after I submit?

## Billing Review UX

Billing screens must show charges in context, not as isolated numbers.

For each job, show when applicable:

- Base labor amount.
- Trip/zone charge.
- Second-job same-zone discount.
- Additional installer split.
- Contractor payout.
- Company/client invoice amount.
- Adjustments.
- Admin overrides.
- Final payable amount.
- Approver.
- Approval timestamp.

Approved copy:

- "Zone charge applied from Naples/Fort Myers rule."
- "Second job in same zone - 50% zone charge applied."
- "Contractor payout calculated from 60/40 split."
- "Admin override added. Reason required."

Any billing calculation must expose:

- Rule source.
- Amount.
- Affected party.
- Override status.
- Approval state.
- Audit trail.

No hidden payout math is acceptable.

## Approval Inbox UX

Admin review surfaces should show the operational cost of delayed approvals using factual language.

Approval inbox should show:

- Invoices waiting for approval.
- Age of pending item.
- Missing information.
- Payout impact.
- Client invoice impact.
- Blocked delivery status.
- Required admin action.
- Risk level.

Approved factual labels:

- "Missing photos."
- "Billing rule conflict."
- "Zone charge needs review."
- "Contractor payout pending."
- "Client invoice not sent."
- "Work comp exemption missing."
- "Admin override requires reason."

Approved copy:

- "3 invoices are waiting for approval. Contractor payout is blocked until review."
- "Client invoice cannot be sent because required photos are missing."

Avoid:

- "Approve now or lose money."
- Any shame-based or fabricated urgency language.

## Contractor Compliance UX

Contractor onboarding and compliance screens should show clear completion state.

Required item types may include:

- Profile photo or company logo.
- Legal/business name.
- Phone/email.
- Service area.
- Role.
- Payment details.
- W-9 if required.
- Work comp exemption form.
- Insurance/license documents if required.
- Signed contractor acknowledgment.
- Emergency contact if required.

Approved copy:

- "80% complete - payment details and work comp exemption remaining."
- "Work comp exemption required before contractor can be marked active."

Allowed states:

- Draft.
- Submitted.
- Needs Review.
- Approved.
- Active.
- Suspended.
- Expired Document.

Do not present a contractor as fully active when required compliance documents are missing.

## Client Estimate And Intake UX

Client-facing intake should provide useful guidance before asking for commitment or unnecessary information.

Recommended flow:

1. Ask what accessibility help is needed.
2. Let the client choose wheelchair ramp, stair lift, vertical platform lift, vehicle lift, repair/service, or other approved service categories.
3. Ask location.
4. Provide preliminary guidance on likely service path, useful photos, next step, and expected response process.
5. Ask for contact details after context has been established.

Approved copy:

- "Based on your selection, we'll need 2-3 photos and a short description to prepare the next step."
- "You can start without an account."

Avoid making "Enter your email to continue" the first step unless a future security or privacy requirement justifies it.

## AI-Assisted UX

AI-assisted workflows must expose what the AI did, what it inferred, and what requires human approval.

AI may assist with future drafts or detection after the runtime AI gate is accepted:

- Voice note transcription.
- Job summary drafting.
- Photo/media labeling.
- Missing info detection.
- Invoice draft preparation.
- Client message drafts.
- CRM note drafts.
- Follow-up reminder suggestions.

AI must not silently finalize:

- Contractor payout.
- Client invoice.
- Admin approval.
- Legal/compliance status.
- Worker classification.
- Pricing override.
- Customer-facing commitment.

Approved copy:

- "AI drafted this job summary from your voice note. Review before submitting."
- "AI detected missing before/after photos."
- "Suggested invoice created. Admin approval required."

Every AI-generated operational output needs:

- Source data.
- Confidence state where useful.
- Edit option.
- Approval state.
- Audit trail.

## Contractor Ownership UX

Contractors should feel the portal belongs to their workflow, not like an external admin burden.

Approved personalization when it improves speed, trust, or accuracy:

- Profile photo.
- Company logo.
- Preferred contact method.
- Default service area.
- Default role.
- Saved crew members.
- Useful travel preferences.
- Preferred payout method.
- Recent jobs.
- My submitted jobs.
- My pending payouts.

Do not add cosmetic personalization that delays job submission.

## Platform Navigation

Navigation must be role-specific. Users must not see navigation for actions their role cannot perform. Hidden navigation does not replace backend authorization.

Contractor navigation:

- Today's Jobs.
- Submit Job.
- Drafts.
- My Payouts.
- Documents.
- Profile.
- Help.

Admin navigation:

- Approval Inbox.
- Jobs.
- Contractors.
- Client Invoices.
- Rate Rules.
- Zones.
- Payouts.
- Audit Log.
- Reports.
- Settings.

Platform/admin navigation:

- Tenants.
- Users.
- Roles.
- Billing Rules.
- Integrations.
- System Audit.
- AI Workflows.

## Metrics To Track

UX completion metrics:

- Job submission completion rate.
- Draft abandonment rate.
- Average time to submit job.
- Number of edited defaults.
- Number of billing overrides.
- Missing media rate.
- Onboarding completion rate.
- Approval cycle time.
- Invoice send time.
- Contractor payout delay.
- Client estimate request completion rate.

Trust metrics:

- Admin override frequency.
- Disputed payout count.
- Invoice correction count.
- Missing document count.
- AI draft edit rate.
- AI output approval rate.
- Rejected AI suggestions.

Business metrics:

- Lead response speed.
- Estimate close rate.
- Average install value.
- Repair conversion rate.
- Repeat customer rate.
- Review generation rate.
- Invoice approval speed.
- Contractor payout speed.

## Risks

- UX language could imply live integrations are approved before readiness gates are accepted.
- Smart defaults could become hidden high-impact decisions if not audited.
- Progress indicators could misrepresent state if not tied to real workflow completion.
- Cost-of-inaction language could drift into fake urgency or shame language.
- AI-assisted UI could create false trust if source data, editability, approval state, and audit trail are missing.
- Contractor-visible financial context could leak client rates or other contractors' payouts if access controls are weak.

## Anti-Patterns

The platform must avoid:

- Blank forms where safe defaults are knowable.
- Hidden high-impact defaults.
- Fake progress.
- Fake urgency.
- Hostage-gated reports or intake outputs.
- Manipulative loss framing.
- Confirm-shaming.
- Pricing without context.
- Excessive choice before trust is earned.
- Onboarding that starts at zero when prior progress exists.
- AI actions without approval state.
- Automation that hides business risk.
- UX patterns that optimize conversion while reducing user agency.

## Acceptance Criteria

Contractor screens are acceptable only when:

- The next action is obvious.
- The contractor can complete the task on mobile.
- Known data is pre-filled when safe and authorized.
- Money-impacting fields are visible.
- Required photos/documents are clear.
- Draft state is available when persistence permits it, or demo state is labeled honestly.
- Submission has a review step.
- Status after submission is clear.

Admin screens are acceptable only when:

- Pending work is prioritized.
- Risk is factual and visible.
- Approval state is clear.
- Billing math is explainable.
- Overrides require reasons.
- Audit trail is accessible.
- Client and contractor impact is visible.

AI-assisted screens are acceptable only when:

- AI-generated content is labeled.
- Source data is visible where useful.
- Human review is required for high-impact actions.
- Users can edit before approval.
- Action is logged.

Client-facing screens are acceptable only when:

- The user receives value before commitment.
- The flow avoids unnecessary friction.
- Service options are clear.
- Contact capture happens after context unless security requires otherwise.
- Trust signals are visible.
- Next step is clear.

## Implementation Sequence

1. Use this document as a UX requirements source during PRD, wireframe, and screen-spec work.
2. Map requirements into `docs/execution/REQUIREMENTS_TRACEABILITY_MATRIX.md` when a branch is approved for implementation.
3. Validate role visibility against `docs/schemas/role-permission-matrix.md` before building screens.
4. Validate state labels against `docs/schemas/operational-state-machine.md`.
5. Implement mock/manual UI only until the relevant readiness gates authorize live persistence, storage, communications, PDFs, integrations, payouts, or AI runtime.

## Summary

The Florida Ramp & Lift platform should use behavioral UX to make field operations faster, safer, and more trustworthy.

The system should pre-fill what it safely knows, show real progress, give value before asking, help contractors feel ownership, show factual operational risk, frame money in context, expose AI assistance clearly, preserve human approval, and log high-impact actions.
