import Link from "next/link";
import { ArrowLeft, ArrowRight, GitBranch } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { MockEventTimeline } from "@/components/mock-event-timeline";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { demoScenarios } from "@/lib/mock-data";

const journeySteps = [
  { key: "lead", label: "Lead" },
  { key: "job", label: "Job" },
  { key: "assignment", label: "Assignment" },
  { key: "documentation", label: "Documentation" },
  { key: "approval", label: "Approval" },
  { key: "invoiceReadiness", label: "Invoice Readiness" }
] as const;

export default async function DemoScenarioDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scenario = demoScenarios.find((item) => item.id === id);

  if (!scenario) {
    return (
      <EmptyState
        title="Scenario not found"
        description="This mock scaffold only resolves demo scenarios present in local mock data."
        backHref="/demo-scenarios"
      />
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/demo-scenarios">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </Button>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
              {scenario.id}
            </div>
            <h1 className="mt-1 text-2xl font-semibold">{scenario.title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
              {scenario.summary}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Mock journey</Badge>
            <StatusBadge value={scenario.stage.toLowerCase().replace(/\s+/g, "_")} />
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <TraceLink href={`/leads/${scenario.leadId}`} label="Lead" detail={scenario.validation.lead} />
        <TraceLink href={`/customers/${scenario.customerId}`} label="Customer" detail="Customer or commercial account record" />
        <TraceLink href={`/jobs/${scenario.jobId}`} label="Job" detail={scenario.validation.job} />
        <TraceLink href="/contractor" label="Assignment" detail={scenario.validation.assignment} />
        <TraceLink href={`/communications/${scenario.communicationId}`} label="Communication" detail="First-class manual communication record" />
        <TraceLink href={`/documentation/${scenario.documentationId}`} label="Documentation" detail={scenario.validation.documentation} />
        <TraceLink href={`/approvals/${scenario.approvalId}`} label="Approval" detail={scenario.validation.approval} />
        <TraceLink href={`/invoices/${scenario.invoiceId}`} label="Invoice" detail={scenario.validation.invoiceReadiness} />
      </section>

      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--secondary)] text-[var(--secondary-foreground)]">
            <GitBranch className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Workflow progression</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Scenario checkpoints from lead intake through invoice readiness.
            </p>
          </div>
        </div>
        <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {journeySteps.map((step) => (
            <li key={step.key} className="rounded-md border bg-[var(--background)] p-4">
              <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
                {step.label}
              </div>
              <p className="mt-2 text-sm leading-6">{scenario.validation[step.key]}</p>
            </li>
          ))}
        </ol>
      </section>

      <MockEventTimeline recordId={scenario.id} />
    </div>
  );
}

function TraceLink({ href, label, detail }: { href: string; label: string; detail: string }) {
  return (
    <article className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold">{label}</div>
      <p className="mt-2 min-h-12 text-sm leading-6 text-[var(--muted-foreground)]">{detail}</p>
      <Button className="mt-4 w-full justify-between" variant="secondary" asChild>
        <Link href={href}>
          Open
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </article>
  );
}
