import { RecordDetail } from "@/components/record-detail";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function ContractorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <RecordDetail
      title="Contractor detail"
      description="Manual contractor roster record for dispatch, compliance, and payout visibility."
      record={coreRecordLookups.contractors(id)}
      backHref="/contractors"
      fields={[
        "contractorId",
        "fullName",
        "phone",
        "email",
        "role",
        "status",
        "payType",
        "defaultRateOrSplit",
        "serviceAreas",
        "skills",
        "vehicleAccess",
        "toolAccess",
        "ppeComplianceStatus",
        "safetyTrainingStatus",
        "notes"
      ]}
    />
  );
}
