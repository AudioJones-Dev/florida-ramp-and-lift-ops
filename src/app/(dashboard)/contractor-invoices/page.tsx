import { Badge } from "@/components/ui/badge";
import { currency, sampleWeeklyInvoices } from "@/lib/contractor-billing";

export default function ContractorInvoicesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-semibold">Weekly Contractor Invoices</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
              Mock Monday-through-Friday pay period rollup grouped per contractor by assignment payout line.
            </p>
          </div>
          <Badge variant="secondary">No cron or PDF generation</Badge>
        </div>
      </section>

      <section className="grid gap-4">
        {sampleWeeklyInvoices.map((invoice) => (
          <article key={invoice.contractorId} className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-lg font-semibold">{invoice.contractorName}</h2>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                  {invoice.payPeriodStart} to {invoice.payPeriodEnd} - pay date {invoice.payDate}
                </p>
              </div>
              <div className="text-2xl font-semibold">{currency(invoice.totalWeeklyPayout)}</div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-[var(--muted)] text-xs uppercase text-[var(--muted-foreground)]">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Work order</th>
                    <th className="px-3 py-2 font-semibold">Job date</th>
                    <th className="px-3 py-2 font-semibold">Role</th>
                    <th className="px-3 py-2 font-semibold">Job payout</th>
                    <th className="px-3 py-2 font-semibold">Split</th>
                    <th className="px-3 py-2 font-semibold">Contractor payout</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.lines.map((line) => (
                    <tr key={`${line.workOrderNumber}-${line.role}`} className="border-t">
                      <td className="px-3 py-2">{line.workOrderNumber}</td>
                      <td className="px-3 py-2">{line.jobDate}</td>
                      <td className="px-3 py-2 capitalize">{line.role}</td>
                      <td className="px-3 py-2">{currency(line.totalJobPayout)}</td>
                      <td className="px-3 py-2">{line.splitPercentage}%</td>
                      <td className="px-3 py-2 font-semibold">{currency(line.contractorPayoutAmount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
