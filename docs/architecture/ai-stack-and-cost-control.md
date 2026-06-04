# AI Stack and Cost Control

Status: Draft Architecture Decision
Owner: AJ Digital LLC / Audio Jones
Scope: Florida Ramp & Lift Operational Intelligence Platform

## Purpose

This document defines the AI and automation cost-control policy for the Florida Ramp & Lift platform.

The platform should use AI deliberately, not everywhere. Subscriptions should be used for build work. APIs should be reserved for production runtime needs. Local models should absorb repetitive, low-risk work. Humans must approve anything financial, legal, safety-sensitive, or client-facing.

## Cost-Control Doctrine

```txt
Subscriptions build the system.
APIs run the system.
Local models absorb repetitive low-risk work.
Humans approve anything financial, legal, safety-sensitive, or client-facing.
```

## Tool Inventory

| Layer | Tool | Role | Cost Strategy |
|---|---|---|---|
| Builder / Development | Claude Code | Deep repo work, refactors, PRDs, architecture. | Use subscription first; avoid API unless required. |
| Builder / Development | Codex | GitHub/local repo execution, code review, implementation. | Use subscription/desktop workflow first. |
| Builder / Development | ChatGPT | Product strategy, PM, schemas, reviews. | Use subscription first. |
| Business Memory | Obsidian | Decisions, business memory, client intelligence. | No API cost. |
| Secrets | Doppler | Secrets and environment management. | Required infrastructure tool; no secrets in repo. |
| App Runtime | Next.js | Main app/dashboard. | Core app layer. |
| App Runtime | Vercel | Hosting/deployment. | Monitor usage once agents/webhooks run. |
| Edge/Security | Cloudflare | DNS, WAF, caching, edge protection. | Stable infrastructure; monitor edge usage. |
| Database | Supabase or Neon Postgres | Source-of-truth database. | Choose based on RLS/auth/storage needs and cost. |
| Storage | Supabase Storage / Cloudflare R2 | Photos, PDFs, job documents. | Keep customer files out of GitHub. |
| Automation | n8n self-hosted | Workflow automation, webhooks, integrations. | Use for internal ops/prototypes; not product backend. |
| Agent Runtime | Hermes | Personal/executive agent runtime. | Use carefully for Michael/AJ assistant workflows. |
| Local Agent Dev | OpenClaw | Local agent experimentation. | Dev/operator workflow only; not first production dependency. |
| Local Models | Ollama | Local model runtime. | Low-cost local execution. |
| Local Models | Qwen | Extraction, classification, structured summaries. | Cheap/high-volume low-risk tasks. |
| Local Models | Gemma | Lightweight summaries, tagging, internal assistant tasks. | Cheap/high-volume low-risk tasks. |
| Email | Resend | MVP transactional email. | Preferred lean MVP email provider. |
| SMS/Voice | Twilio | SMS/voice events. | Use only where needed; monitor per-segment costs. |
| AI Receptionist | ResponseOS | AI receptionist pilot. | Pilot separately from core product backend. |

## Build-Time vs Runtime Tools

### Build-Time Tools

Build-time tools are used by Audio Jones / AJ Digital to design, document, review, and implement the platform.

Build-time tools:

- Claude Code.
- Codex.
- ChatGPT.
- Obsidian.
- GitHub.

Policy:

- Prefer paid subscriptions and local/desktop workflows.
- Do not route routine build work through paid production APIs.
- Do not treat build-time agent output as production truth without review.
- Preserve decisions in Obsidian and executable specs in GitHub.

### Runtime Tools

Runtime tools operate the production or pilot platform.

Runtime tools:

- Next.js.
- Vercel.
- Cloudflare.
- Supabase or Neon Postgres.
- Supabase Storage or Cloudflare R2.
- Doppler.
- Resend.
- Twilio.
- n8n.
- Local model runtime.
- Paid model APIs when justified.

Policy:

- Runtime tools require explicit implementation approval.
- Runtime AI calls must have use case, model tier, budget guardrail, logging, and fallback path.
- n8n may orchestrate workflows, but the app database remains the source of truth.
- Secrets must be managed through Doppler or approved infrastructure, not committed to the repo.

## Subscription vs API Policy

Use subscriptions for:

- Product strategy.
- Architecture decisions.
- PRDs.
- Schema planning.
- Code review.
- Refactors.
- Local implementation support.
- Documentation synthesis.

Use APIs for:

- Production runtime tasks that must happen inside the app or automation layer.
- Scheduled or event-driven summaries.
- Structured extraction from production records.
- Alert generation.
- Customer or contractor communication preparation.
- Invoice readiness checks.

API use requires:

- Named workflow.
- Data input boundary.
- Model tier.
- Expected volume.
- Monthly budget estimate.
- Human approval gate where needed.
- Logging and usage monitoring.
- Fallback behavior when the API is unavailable or over budget.

## Model Routing Policy

### Tier A: Local / Open Source

Use for cheap, high-volume, low-risk tasks.

Recommended tools/models:

- Ollama.
- Qwen.
- Gemma.

Use cases:

- Classifying communications.
- Drafting internal job summaries.
- Tagging job types.
- Extracting fields from contractor notes.
- Low-risk internal summaries.
- Contractor note cleanup.
- Internal metadata generation.

Rules:

- No final client-facing output without human review.
- No financial approvals.
- No safety exception dismissal.
- No external sends.
- No secrets or sensitive customer files unless local data policy is approved.

### Tier B: Paid API Mini Models

Use for production tasks that need reliability but not frontier reasoning.

Use cases:

- Structured extraction.
- Alert generation.
- Communication summarization.
- Invoice readiness checks.
- Job documentation summaries.
- Follow-up queue summaries.

Rules:

- Use the lowest reliable model tier.
- Log usage by workflow.
- Keep prompts short and structured.
- Cache outputs when safe.
- Avoid long conversational loops.
- Require human approval before external or financial action.

### Tier C: Frontier Models

Use only when judgment matters.

Use cases:

- Executive briefing.
- Complex dispatch sequencing.
- Financial anomaly explanation.
- Customer dispute reasoning.
- Strategic recommendations.
- High-stakes exception review.

Rules:

- Use sparingly.
- Require explicit workflow justification.
- Summarize source records first with cheaper models where possible.
- Keep human approval mandatory.
- Track cost per run.

## Local Model Policy

Local models should absorb repetitive low-risk work before paid APIs are introduced.

Good local candidates:

- Inbound communication classification.
- Job type tagging.
- Contractor note cleanup.
- Draft internal summaries.
- Documentation completeness hints.
- Alert candidate detection before persistence.

Bad local candidates for MVP:

- Final invoice release.
- Final customer communication.
- Legal, safety, or financial decisions.
- Customer dispute final response.
- Anything requiring high-confidence judgment without review.

## Communications Cost Policy

### SMS / Voice

Twilio is reliable but should be used narrowly.

MVP SMS/voice use cases:

- Work-order confirmations.
- Contractor reminders.
- Customer confirmations.
- Missed-call follow-up.
- Critical operational notifications.

Do not use SMS for long AI conversations. SMS is billed per segment, carrier fees may apply, and costs become hard to reason about when long AI-generated messages are sent.

Policy:

- Keep SMS short.
- Prefer links to secure pages over long message bodies.
- Track messages by workflow.
- Set monthly SMS budget thresholds.
- Review carrier fees and number costs before production launch.

### Email

Use a dedicated transactional email provider for MVP.

Preferred MVP option:

- Resend.

Other acceptable options:

- Postmark.
- SendGrid.
- Mailgun.

Policy:

- Email is preferred over SMS for longer operational messages.
- Client-facing email drafts require human approval.
- Invoice release emails require Michael Keegan approval for MVP.

## Human Approval Gates

Human approval is required before:

- Client-facing invoice release.
- Contractor payout approval.
- Financial adjustment.
- Rate or split override.
- Customer/client communication send.
- Dispatch instructions external send.
- Safety exception dismissal.
- Alert dismissal for critical financial or safety alerts.
- Live CRM/accounting writeback.
- Any action involving secrets, credentials, or sensitive documents.

For MVP, Michael Keegan is the final approval authority for client-facing invoice release.

## Monthly Cost Monitoring

Each production AI or communications workflow should have:

- Owner.
- Purpose.
- Trigger.
- Model or vendor.
- Expected monthly volume.
- Expected monthly cost.
- Hard budget threshold where available.
- Soft warning threshold.
- Review cadence.
- Kill switch or disable path.

Minimum monthly review:

- OpenAI/Claude API spend.
- Twilio SMS/voice spend.
- Resend email volume.
- Vercel usage.
- Supabase/Neon database usage.
- Supabase Storage / Cloudflare R2 storage and bandwidth.
- n8n workflow executions.
- Cloudflare traffic/security events.

## Pricing Source Of Truth

Pricing is volatile and should not be hard-coded into product specs.

Operators should verify current pricing before implementation or launch:

- OpenAI API pricing: https://openai.com/api/pricing/
- OpenAI API usage and budget controls: OpenAI dashboard billing and usage settings.
- Twilio U.S. SMS pricing: https://www.twilio.com/en-us/sms/pricing/usa
- Resend pricing: provider pricing page at time of implementation.
- Vercel pricing: provider pricing page at time of implementation.
- Supabase/Neon pricing: provider pricing page at time of implementation.
- Cloudflare pricing: provider pricing page at time of implementation.

Notes checked on 2026-06-04:

- OpenAI states API usage is billed separately from ChatGPT subscriptions and recommends monitoring usage/budgets in the platform dashboard.
- Twilio U.S. SMS pricing is per segment, carrier fees may apply, and pricing may change without notice.

## Vendor Risk

| Vendor / Tool | Risk | Mitigation |
|---|---|---|
| OpenAI / Claude APIs | Cost spikes, model changes, latency, availability. | Tiered routing, budgets, fallback models, human approval. |
| Local models | Lower reliability, hardware limits, inconsistent reasoning. | Restrict to low-risk tasks, validate before action. |
| Twilio | Per-segment costs, carrier fees, compliance overhead. | Short messages, budget thresholds, use email/links for longer content. |
| n8n | Workflow sprawl, hidden backend logic. | Keep app database as source of truth; document workflows. |
| Vercel | Serverless/edge cost growth under webhook/agent load. | Monitor usage, cache, queue long jobs elsewhere. |
| Supabase/Neon | Database cost, RLS complexity, migration discipline. | Schema review, RLS tests, clear access model. |
| Storage providers | Media growth and bandwidth cost. | Retention policies, compression, offload heavy archives. |
| Doppler | Operational dependency for secrets. | Backup recovery plan and documented env ownership. |

## Non-Goals

This document does not authorize:

- API key creation.
- Runtime AI integration.
- n8n workflow deployment.
- Twilio number purchase.
- Resend setup.
- Vercel deployment.
- Supabase/Neon provisioning.
- Cloudflare configuration.
- App implementation.
- Firebase.
- Secrets in repo.
- Automated financial, legal, safety, or client-facing decisions.

