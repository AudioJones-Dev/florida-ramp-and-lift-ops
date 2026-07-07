import { ObjectPage } from "@/components/object-page";
import { mockInvoices } from "@/lib/mock-data";

export default function InvoicesPage() {
  return (
    <ObjectPage
      title="Invoices"
      description="Invoice readiness placeholders. QuickBooks remains the future accounting ledger boundary."
      rows={mockInvoices}
      fields={["invoiceNumber", "customerName", "status", "amount", "approvalOwner"]}
      detailPath="/invoices"
    />
  );
}
