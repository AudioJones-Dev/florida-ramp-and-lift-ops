import { Badge } from "@/components/ui/badge";
import { currency, sampleCalculations } from "@/lib/contractor-billing";

export default function PricingPage() {
  const lineItems = sampleCalculations.flatMap((calculation) => calculation.contractorPayable.lineItems);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-semibold">Mock Contractor Pricing Engine</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
              Deterministic static contractor rates for MVP workflow testing. Private production rate sheets are not committed.
            </p>
          </div>
          <Badge variant="secondary">Static mock rates</Badge>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-[var(--muted)] text-xs uppercase text-[var(--muted-foreground)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Item code</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Qty</th>
                <th className="px-4 py-3 font-semibold">Unit rate</th>
                <th className="px-4 py-3 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, index) => (
                <tr key={`${item.id}-${index}`} className="border-t">
                  <td className="px-4 py-3 font-semibold">{item.itemCode}</td>
                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3">{item.category.replace(/_/g, " ")}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">{currency(item.unitRate)}</td>
                  <td className="px-4 py-3">{currency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
