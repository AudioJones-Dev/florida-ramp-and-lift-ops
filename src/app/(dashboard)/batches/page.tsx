import { Badge } from "@/components/ui/badge";
import { calculateBatch, currency, getContractorName, sampleBatch } from "@/lib/contractor-billing";

export default function BatchesPage() {
  const calculations = calculateBatch(sampleBatch);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-semibold">Multi-Job Batch Review</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
              Same-day route batch model. Each job retains independent pricing, photos, notes, split, and approval status.
            </p>
          </div>
          <Badge variant="secondary">{sampleBatch.jobs.length} jobs in mock batch</Badge>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Metric label="Batch date" value={sampleBatch.batchDate} />
        <Metric label="Lead" value={getContractorName(sampleBatch.leadInstallerId)} />
        <Metric label="Assistant" value={sampleBatch.assistantInstallerId ? getContractorName(sampleBatch.assistantInstallerId) : "None"} />
        <Metric label="Route zone" value={sampleBatch.routeZone ?? "Mixed"} />
      </section>

      <section className="grid gap-4">
        {calculations.map((calculation) => (
          <article key={calculation.job.id} className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
                  {calculation.job.workOrderNumber}
                </div>
                <h2 className="mt-1 text-lg font-semibold">{calculation.job.customerName}</h2>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">{calculation.job.installAddress}</p>
              </div>
              <Badge variant="secondary">{calculation.contractorPayable.status.replace(/_/g, " ")}</Badge>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              <Metric label="Job type" value={calculation.job.jobType} />
              <Metric label="Zone charge" value={currency(calculation.contractorPayable.zoneCharge)} />
              <Metric label="Second trip" value={currency(calculation.contractorPayable.secondTripCharge)} />
              <Metric label="Total payable" value={currency(calculation.contractorPayable.totalContractorPayable)} />
            </div>
            <div className="mt-4 grid gap-2">
              {calculation.contractorPayable.reviewFlags.map((flag) => (
                <div key={flag.id} className="rounded-md border bg-[var(--background)] px-3 py-2 text-sm">
                  <span className="font-semibold">{flag.label}: </span>
                  <span className="text-[var(--muted-foreground)]">{flag.reason}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">{label}</div>
      <div className="mt-2 text-sm font-semibold">{value}</div>
    </div>
  );
}
