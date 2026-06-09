import { Badge } from "@/components/ui/badge";
import { sampleCalculations } from "@/lib/contractor-billing";

export default function ClientInvoicesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-semibold">Client Receivable Drafts</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
              Separate client invoice drafts generated from job submissions. Contractor payout data is intentionally excluded.
            </p>
          </div>
          <Badge variant="secondary">Admin pricing required</Badge>
        </div>
      </section>

      <section className="grid gap-4">
        {sampleCalculations.map((calculation) => (
          <article key={calculation.clientReceivable.id} className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
                  {calculation.clientReceivable.workOrderNumber}
                </div>
                <h2 className="mt-1 text-lg font-semibold">{calculation.clientReceivable.customerName}</h2>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {calculation.clientReceivable.client} - client rate sheet required before release.
                </p>
              </div>
              <Badge variant="secondary">{calculation.clientReceivable.status.replace(/_/g, " ")}</Badge>
            </div>
            <div className="mt-4 rounded-md border bg-[var(--background)] p-4 text-sm">
              <div className="font-semibold">Client receivable boundary</div>
              <p className="mt-2 leading-6 text-[var(--muted-foreground)]">
                This draft stores client, work order, customer, and review status only. Contractor line-item payout,
                split percentage, and assignment payout values stay on the payable track.
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
