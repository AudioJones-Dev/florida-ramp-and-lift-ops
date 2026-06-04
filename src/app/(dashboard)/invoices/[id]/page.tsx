import { RecordDetail } from "@/components/record-detail";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <RecordDetail
      title="Invoice detail"
      description="Manual invoice readiness record. QuickBooks remains the future accounting ledger boundary."
      record={coreRecordLookups.invoices(id)}
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
    />
  );
}
