import { RecordDetail } from "@/components/record-detail";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <RecordDetail
      title="Customer detail"
      description="Manual customer record. HubSpot remains a future CRM boundary."
      record={coreRecordLookups.customers(id)}
      backHref="/customers"
      fields={[
        "customerId",
        "customerType",
        "displayName",
        "status",
        "primaryContactName",
        "primaryContactPhone",
        "primaryContactEmail",
        "source",
        "notes"
      ]}
    />
  );
}
