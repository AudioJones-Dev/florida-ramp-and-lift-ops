import { RecordDetail } from "@/components/record-detail";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function AlertDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <RecordDetail
      title="Alert detail"
      description="Persisted mock alert record after a runtime threshold condition is crossed."
      record={coreRecordLookups.alerts(id)}
      backHref="/alerts"
      fields={[
        "alertId",
        "sourceObjectType",
        "sourceObjectId",
        "severity",
        "status",
        "owner",
        "summary",
        "thresholdRule"
      ]}
    />
  );
}
