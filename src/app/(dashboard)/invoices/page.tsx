import Link from "next/link";
import { ObjectPage } from "@/components/object-page";
import { Button } from "@/components/ui/button";
import { mockInvoices } from "@/lib/mock-data";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <h1 className="text-2xl font-semibold">Invoices</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
              Legacy mock invoice readiness plus new separated contractor payable and client receivable views.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="secondary" asChild>
              <Link href="/contractor-invoices">Contractor invoices</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/client-invoices">Client drafts</Link>
            </Button>
          </div>
        </div>
      </section>
      <ObjectPage
        title="Invoice Readiness Records"
        description="Existing invoice readiness placeholders. QuickBooks remains the future accounting ledger boundary."
        rows={mockInvoices}
        fields={["invoiceNumber", "customerName", "status", "amount", "approvalOwner"]}
        detailPath="/invoices"
      />
    </div>
  );
}
