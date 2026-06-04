import { RecordDetail } from "@/components/record-detail";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function DocumentationDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RecordDetail
      title="Documentation detail"
      description="Manual documentation artifact for proof-of-work, closeout, billing, and safety review."
      record={coreRecordLookups.documentation(id)}
      backHref="/documentation"
      fields={[
        "documentationArtifactId",
        "artifactType",
        "relatedObjectType",
        "relatedObjectId",
        "jobNumber",
        "submittedBy",
        "status",
        "source",
        "reviewGate",
        "notes"
      ]}
    />
  );
}
