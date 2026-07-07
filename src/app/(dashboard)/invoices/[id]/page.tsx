import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RecordDetail } from "@/components/record-detail";
import { Button } from "@/components/ui/button";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const invoice = coreRecordLookups.invoices(id);

  return (
    <RecordDetail
      title="Invoice detail"
      description="Manual invoice readiness record. QuickBooks remains the future accounting ledger boundary."
      record={invoice}
      backHref="/invoices"
      fields={[
        "invoiceId",
        "invoiceNumber",
        "invoiceClass",
        "customerName",
        "status",
        "amount",
        "approvalOwner",
        "quickBooksReference",
        "readinessSummary"
      ]}
    >
      {invoice ? (
        <section className="mt-6 rounded-md border bg-[var(--background)] p-4">
          <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
            Invoice release boundary
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
            Client-facing invoice release remains a human approval action. For MVP, Michael
            Keegan is the final release authority. QuickBooks is not connected in this prototype.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button variant="secondary" asChild>
              <Link href="/queues/invoice-review">
                Review invoice queue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/queues/approvals">
                Open approvals
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      ) : null}
    </RecordDetail>
  );
}
