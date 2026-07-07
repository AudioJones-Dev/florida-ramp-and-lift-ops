"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  HandCoins,
  MapPinned,
  MessageSquareText,
  Route,
  Sparkles,
  Truck,
  UsersRound,
  type LucideIcon
} from "lucide-react";
import { DashboardCard } from "@/components/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  dispatchDemoJobs,
  dispatchFactorFields,
  dispatchInvoiceBatches,
  type DispatchDemoJob,
  type DispatchMode,
  type StackGrade
} from "@/lib/dispatch-demo";

type ApprovalDecision = "pending" | "approved" | "changes_requested" | "held";

export function DispatchMarketplaceDemo() {
  const [selectedJobId, setSelectedJobId] = useState(dispatchDemoJobs[0]?.id ?? "");
  const [selectedContractorName, setSelectedContractorName] = useState(
    dispatchDemoJobs[0]?.recommendations[0]?.contractor ?? ""
  );
  const [decision, setDecision] = useState<ApprovalDecision>("pending");
  const [decisionNote, setDecisionNote] = useState("");

  const selectedJob = dispatchDemoJobs.find((job) => job.id === selectedJobId) ?? dispatchDemoJobs[0];

  const selectedRecommendation =
    selectedJob.recommendations.find((recommendation) => recommendation.contractor === selectedContractorName) ??
    selectedJob.recommendations[0];

  const currentBatch =
    dispatchInvoiceBatches.find((batch) => batch.jobNumbers.includes(selectedJob.jobNumber)) ??
    dispatchInvoiceBatches[0];

  const summaryCards = [
    {
      icon: Route,
      label: "Demo routes",
      value: dispatchDemoJobs.length,
      detail: "Local-only mock jobs with guided selection"
    },
    {
      icon: UsersRound,
      label: "Recommended vendor",
      value: selectedRecommendation.contractor,
      detail: `${selectedRecommendation.score}/100 fit for ${selectedJob.jobNumber}`
    },
    {
      icon: HandCoins,
      label: "Invoice stack batches",
      value: dispatchInvoiceBatches.length,
      detail: "Route and packet suggestions for client review"
    }
  ];

  function recordDecision(nextDecision: ApprovalDecision) {
    setDecision(nextDecision);
  }

  function selectJob(jobId: string) {
    const nextJob = dispatchDemoJobs.find((job) => job.id === jobId) ?? dispatchDemoJobs[0];
    setSelectedJobId(nextJob.id);
    setSelectedContractorName(nextJob.recommendations[0]?.contractor ?? "");
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="bg-[var(--secondary)] text-[var(--secondary-foreground)]">
                Local demo only
              </Badge>
              <Badge variant="secondary" className="bg-[var(--background)] text-[var(--foreground)]">
                Human approval visible
              </Badge>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Dispatch planning demo</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
                Walk the client through how FRL ranks contractors, explains the fit, and groups jobs into
                logical invoice stacks. This is a mock walkthrough only and does not send dispatches.
              </p>
            </div>
          </div>
          <Button variant="secondary" asChild>
            <Link href="/demo-scenarios">
              Back to demo hub
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <DashboardCard
            key={card.label}
            icon={card.icon}
            label={card.label}
            value={card.value}
            detail={card.detail}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                Job walkthrough
              </div>
              <h2 className="mt-1 text-lg font-semibold">{selectedJob.jobNumber}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                {selectedJob.title} · {selectedJob.location}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{formatLabel(selectedJob.dispatchMode)}</Badge>
              <Badge variant={gradeVariant(selectedJob.stackGrade)}>{selectedJob.stackGrade}</Badge>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <InfoTile label="Customer" value={selectedJob.customer} />
            <InfoTile label="Invoice batch" value={selectedJob.invoiceBatch} />
            <InfoTile label="Route objective" value={selectedJob.objective} />
            <InfoTile label="Selection mode" value={formatLabel(selectedJob.dispatchMode)} />
          </div>

          <div className="mt-5 rounded-md border bg-[var(--background)] p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--primary)]" />
              <div className="text-sm font-semibold">Why this stack is graded this way</div>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
              {selectedJob.stackSummary}
            </p>
          </div>

          <div className="mt-5 rounded-md border bg-[var(--background)] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Truck className="h-4 w-4 text-[var(--primary)]" />
              <div className="text-sm font-semibold">Batch suggestion</div>
              <Badge variant={gradeVariant(currentBatch.grade)}>{currentBatch.grade}</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{currentBatch.summary}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{currentBatch.reasons[0]}</p>
          </div>

          <div className="mt-5">
            <div className="mb-3 text-sm font-semibold">Carry-out variables</div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {dispatchFactorFields.map((factor) => (
                <FactorTile key={factor.key} label={factor.label} value={selectedJob.factors[factor.key]} />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-3 text-sm font-semibold">Choose another job</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {dispatchDemoJobs.map((job) => {
                const active = job.id === selectedJob.id;

                return (
                  <button
                    key={job.id}
                    className={cn(
                      "rounded-lg border p-3 text-left transition hover:border-[var(--primary)] hover:bg-[var(--background)]",
                      active && "border-[var(--primary)] bg-[var(--secondary)]"
                    )}
                    onClick={() => selectJob(job.id)}
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
                          {job.jobNumber}
                        </div>
                        <div className="mt-1 font-medium">{job.title}</div>
                      </div>
                      <Badge variant={gradeVariant(job.stackGrade)}>{job.stackGrade}</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{job.location}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </article>

        <article className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                Guided vendor selection
              </div>
              <h2 className="mt-1 text-lg font-semibold">Friendly recommendations</h2>
            </div>
            <Badge variant="secondary">Mock scoring</Badge>
          </div>

          <div className="mt-4 space-y-3">
            {selectedJob.recommendations.map((recommendation) => {
              const active = recommendation.contractor === selectedRecommendation.contractor;

              return (
                <button
                  key={recommendation.contractor}
                  className={cn(
                    "w-full rounded-lg border p-4 text-left transition hover:border-[var(--primary)] hover:bg-[var(--background)]",
                    active && "border-[var(--primary)] bg-[var(--secondary)]"
                  )}
                  onClick={() => setSelectedContractorName(recommendation.contractor)}
                  type="button"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="font-semibold">{recommendation.contractor}</div>
                        <Badge variant={positionVariant(recommendation.position)}>{recommendation.position}</Badge>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                        {recommendation.summary}
                      </p>
                    </div>
                    <div className="rounded-md border bg-[var(--background)] px-3 py-2 text-sm font-semibold">
                      {recommendation.score}/100
                    </div>
                  </div>

                  <ul className="mt-3 space-y-2 text-sm text-[var(--muted-foreground)]">
                    {recommendation.reasons.map((reason) => (
                      <li key={reason} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-md border bg-[var(--background)] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <MapPinned className="h-4 w-4 text-[var(--primary)]" />
              <div className="text-sm font-semibold">Selected demo vendor</div>
              <Badge variant="secondary">{selectedRecommendation.score}/100 fit</Badge>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
              {selectedRecommendation.contractor} is the current recommendation for {selectedJob.jobNumber}. The
              dispatch plan stays local until a human approves the route.
            </p>
          </div>

          <div className="mt-5 rounded-lg border bg-[var(--background)] p-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-[var(--primary)]" />
              <div className="text-sm font-semibold">Client walkthrough approval</div>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
              Record whether the client wants to approve this demo route, ask for changes, or hold it for a
              human review step. No dispatch or invoice action is sent.
            </p>

            <label className="mt-4 block text-sm font-medium">
              Approval note
              <textarea
                className="mt-2 min-h-24 w-full rounded-md border bg-white px-3 py-2 text-sm outline-none ring-[var(--ring)] focus:ring-2"
                onChange={(event) => setDecisionNote(event.target.value)}
                placeholder="Example: Approved for the demo because the route is short and the recommendations are easy to explain."
                value={decisionNote}
              />
            </label>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button disabled={!decisionNote.trim()} onClick={() => recordDecision("approved")}>
                Approve demo route
              </Button>
              <Button
                disabled={!decisionNote.trim()}
                variant="secondary"
                onClick={() => recordDecision("changes_requested")}
              >
                Request changes
              </Button>
              <Button
                disabled={!decisionNote.trim()}
                variant="ghost"
                onClick={() => recordDecision("held")}
              >
                Hold for human review
              </Button>
            </div>

            {decision !== "pending" ? (
              <div className="mt-4 rounded-md border bg-white p-3 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={decisionVariant(decision)}>{formatDecision(decision)}</Badge>
                  <span className="text-[var(--muted-foreground)]">Local-only decision recorded</span>
                </div>
                <p className="mt-2 leading-6 text-[var(--muted-foreground)]">{decisionNote}</p>
              </div>
            ) : null}
          </div>
        </article>
      </section>

      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
              Invoice stack mapping
            </div>
            <h2 className="mt-1 text-lg font-semibold">Which jobs are logistically viable to stack?</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
              The batch map below uses travel, loading, offloading, evaluation, site communication, staging,
              installing, and grading to explain whether the job belongs in a feasible, conditional, or less
              likely invoice stack.
            </p>
          </div>
          <Badge variant="secondary">Client review only</Badge>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {dispatchInvoiceBatches.map((batch) => (
            <article key={batch.title} className="rounded-lg border bg-[var(--background)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold">{batch.title}</h3>
                <Badge variant={gradeVariant(batch.grade)}>{batch.grade}</Badge>
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{batch.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {batch.jobNumbers.map((jobNumber) => (
                  <Badge key={jobNumber} variant="secondary">
                    {jobNumber}
                  </Badge>
                ))}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-[var(--muted-foreground)]">
                {batch.reasons.map((reason) => (
                  <li key={reason} className="flex gap-2">
                    <Truck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
            <thead className="bg-[var(--muted)] text-xs uppercase text-[var(--muted-foreground)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Job</th>
                {dispatchFactorFields.map((factor) => (
                  <th key={factor.key} className="px-4 py-3 font-semibold">
                    {factor.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-semibold">Stack grade</th>
                <th className="px-4 py-3 font-semibold">Invoice batch</th>
                <th className="px-4 py-3 font-semibold">Primary recommendation</th>
              </tr>
            </thead>
            <tbody>
              {dispatchDemoJobs.map((job) => {
                const topRecommendation = job.recommendations[0];

                return (
                    <tr key={job.id} className={cn("border-t", job.id === selectedJob.id && "bg-[var(--secondary)]")}>
                    <td className="px-4 py-3 align-top">
                      <div className="font-semibold">{job.jobNumber}</div>
                      <div className="mt-1 text-xs text-[var(--muted-foreground)]">{job.location}</div>
                    </td>
                    {dispatchFactorFields.map((factor) => (
                      <td key={factor.key} className="px-4 py-3 align-top">
                        <span className="inline-flex min-w-12 items-center justify-center rounded-md border bg-white px-2 py-1 font-medium">
                          {job.factors[factor.key]}/5
                        </span>
                      </td>
                    ))}
                    <td className="px-4 py-3 align-top">
                      <Badge variant={gradeVariant(job.stackGrade)}>{job.stackGrade}</Badge>
                    </td>
                    <td className="px-4 py-3 align-top">{job.invoiceBatch}</td>
                    <td className="px-4 py-3 align-top">
                      <div className="font-medium">{topRecommendation.contractor}</div>
                      <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                        {topRecommendation.score}/100 · {formatLabel(job.dispatchMode)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <SurfaceLink
          href="/demo-scenarios"
          icon={Sparkles}
          label="Demo hub"
          detail="Review the full set of mock journeys before or after the dispatch walkthrough."
        />
        <SurfaceLink
          href="/approvals"
          icon={ClipboardList}
          label="Approval center"
          detail="Check the human approval workflow that stays visible around invoice and documentation gates."
        />
        <SurfaceLink
          href="/queues"
          icon={MessageSquareText}
          label="Queues"
          detail="See how work lands in the review queues after the mock route is approved."
        />
      </section>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-[var(--background)] p-3">
      <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}

function FactorTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border bg-[var(--background)] p-3">
      <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">{label}</div>
      <div className="mt-1 flex items-center gap-2">
        <div className="text-lg font-semibold">{value}/5</div>
        <div className="h-2 flex-1 rounded-full bg-[var(--muted)]">
          <div
            className="h-2 rounded-full bg-[var(--primary)]"
            style={{ width: `${(value / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function SurfaceLink({
  href,
  icon: Icon,
  label,
  detail
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  detail: string;
}) {
  return (
    <article className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--secondary)] text-[var(--secondary-foreground)]">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="font-semibold">{label}</h2>
      </div>
      <p className="mt-3 min-h-12 text-sm leading-6 text-[var(--muted-foreground)]">{detail}</p>
      <Button className="mt-4 w-full" variant="secondary" asChild>
        <Link href={href}>
          Open
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </article>
  );
}

function gradeVariant(grade: StackGrade): "default" | "secondary" | "destructive" {
  if (grade === "Feasible") {
    return "default";
  }

  if (grade === "Conditional") {
    return "secondary";
  }

  return "destructive";
}

function positionVariant(position: DispatchDemoJob["recommendations"][number]["position"]) {
  if (position === "Recommended") {
    return "default";
  }

  if (position === "Strong alternate") {
    return "secondary";
  }

  return "destructive";
}

function decisionVariant(decision: ApprovalDecision) {
  if (decision === "approved") {
    return "default";
  }

  if (decision === "changes_requested") {
    return "secondary";
  }

  return "destructive";
}

function formatDecision(decision: ApprovalDecision) {
  return decision
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatLabel(value: string | DispatchMode) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
