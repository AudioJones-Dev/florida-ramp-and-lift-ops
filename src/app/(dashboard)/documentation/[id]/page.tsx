import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DocumentationUploadPlaceholder } from "@/components/documentation-upload-placeholder";
import { RecordDetail } from "@/components/record-detail";
import { Button } from "@/components/ui/button";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function DocumentationDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const documentation = coreRecordLookups.documentation(id);

  return (
    <RecordDetail
      title="Documentation detail"
      description="Manual documentation artifact for proof-of-work, closeout, billing, and safety review."
      record={documentation}
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
    >
      {documentation ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <section className="rounded-md border bg-[var(--background)] p-4">
            <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
              Reviewer action
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
              Confirm the required proof exists, verify it matches the job scope, then approve,
              hold, or reject through the approval workflow. This page only reviews the mock record.
            </p>
            <Button className="mt-4" variant="secondary" asChild>
              <Link href={`/jobs/${documentation.relatedObjectId}`}>
                View related job
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </section>
          <DocumentationUploadPlaceholder label="Documentation evidence placeholder" />
        </div>
      ) : null}
    </RecordDetail>
  );
}
