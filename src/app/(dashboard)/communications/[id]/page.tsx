import { RecordDetail } from "@/components/record-detail";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function CommunicationDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RecordDetail
      title="Communication detail"
      description="First-class manual communication record before live email, SMS, phone, or CRM ingestion."
      record={coreRecordLookups.communications(id)}
      backHref="/communications"
      fields={[
        "communicationId",
        "communicationType",
        "direction",
        "status",
        "sourceChannel",
        "contactName",
        "relatedObjectType",
        "relatedObjectId",
        "summary",
        "followUpOwner"
      ]}
    />
  );
}
