import { RecordDetail } from "@/components/record-detail";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function ApprovalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <RecordDetail
      title="Approval detail"
      description="Human approval record. AI and automation cannot grant final approval."
      record={coreRecordLookups.approvals(id)}
      backHref="/approvals"
      fields={[
        "approvalId",
        "approvalCategory",
        "approvalType",
        "relatedObjectType",
        "relatedObjectId",
        "status",
        "requestedBy",
        "approver",
        "risk",
        "targetTransition",
        "evidenceSummary",
        "blockingRule",
        "decisionNotes"
      ]}
    />
  );
}
