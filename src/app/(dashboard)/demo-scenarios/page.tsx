import Link from "next/link";
import { ArrowRight, GitBranch, Route } from "lucide-react";
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

export default function DemoScenariosPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <h1 className="text-2xl font-semibold">MVP Demo Scenarios</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
              End-to-end mock journeys that connect customers, jobs, contractor assignments,
              communications, documentation, invoices, alerts, approvals, queues, and dashboard intelligence.
            </p>
          </div>
          <Badge variant="secondary">Mock validation only</Badge>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {demoScenarios.map((scenario) => (
          <article key={scenario.id} className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
                  {scenario.id}
                </div>
                <h2 className="mt-1 text-lg font-semibold">{scenario.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                  {scenario.summary}
                </p>
              </div>
              <StatusBadge value={scenario.stage.toLowerCase().replace(/\s+/g, "_")} />
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <TraceLink href={`/demo-scenarios/${scenario.id}`} label="Scenario detail" />
              <TraceLink href={`/leads/${scenario.leadId}`} label="Lead" />
              <TraceLink href={`/customers/${scenario.customerId}`} label="Customer" />
              <TraceLink href={`/jobs/${scenario.jobId}`} label="Job" />
              <TraceLink href="/contractor" label="Contractor assignment" />
              <TraceLink href={`/communications/${scenario.communicationId}`} label="Communication" />
              <TraceLink href={`/documentation/${scenario.documentationId}`} label="Documentation" />
              <TraceLink href={`/invoices/${scenario.invoiceId}`} label="Invoice" />
              <TraceLink href={`/alerts/${scenario.alertId}`} label="Alert" />
              <TraceLink href={`/approvals/${scenario.approvalId}`} label="Approval" />
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--secondary)] text-[var(--secondary-foreground)]">
            <GitBranch className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Journey Validation Matrix</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Trace whether each scenario reaches the expected operating checkpoints.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead className="bg-[var(--muted)] text-xs uppercase text-[var(--muted-foreground)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Scenario</th>
                {journeySteps.map((step) => (
                  <th key={step.key} className="px-4 py-3 font-semibold">
                    {step.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {demoScenarios.map((scenario) => (
                <tr key={scenario.id} className="border-t">
                  <td className="px-4 py-3 align-top font-semibold">{scenario.title}</td>
                  {journeySteps.map((step) => (
                    <td key={step.key} className="px-4 py-3 align-top">
                      {scenario.validation[step.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <ScenarioSurface href="/dashboard" label="Dashboard" detail="Confirm derived counts and high-priority signals." />
        <ScenarioSurface href="/queues" label="Queues" detail="Confirm each scenario lands in the expected operational queue." />
        <ScenarioSurface href="/approvals" label="Approval Center" detail="Confirm approval packets explain evidence and blockers." />
      </section>
    </div>
  );
}

function TraceLink({ href, label }: { href: string; label: string }) {
  return (
    <Button className="justify-between" variant="secondary" asChild>
      <Link href={href}>
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  );
}

function ScenarioSurface({
  href,
  label,
  detail
}: {
  href: string;
  label: string;
  detail: string;
}) {
  return (
    <article className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--secondary)] text-[var(--secondary-foreground)]">
          <Route className="h-4 w-4" />
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
