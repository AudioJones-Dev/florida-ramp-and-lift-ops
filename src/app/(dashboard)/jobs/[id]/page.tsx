import { RecordDetail } from "@/components/record-detail";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <RecordDetail
      title="Job detail"
      description="Manual job record aligned to the operational state machine."
      record={coreRecordLookups.jobs(id)}
      backHref="/jobs"
      fields={[
        "jobId",
        "jobNumber",
        "customerName",
        "jobType",
        "status",
        "siteAddress",
        "scheduledFor",
        "assignedTo",
        "documentationStatus",
        "invoiceReadiness",
        "notes"
      ]}
    />
  );
}
