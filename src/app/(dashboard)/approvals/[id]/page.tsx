import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RecordDetail } from "@/components/record-detail";
import { Button } from "@/components/ui/button";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function ApprovalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const approval = coreRecordLookups.approvals(id);

  return (
    <RecordDetail
      title="Approval detail"
      description="Human approval record. AI and automation cannot grant final approval."
      record={approval}
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
    >
      {approval ? (
        <section className="mt-6 rounded-md border bg-[var(--background)] p-4">
          <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
            Decision requirement
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
            The approval center requires a local decision note before approve, hold, or reject.
            Future persistence must store the decision, note, actor, timestamp, and source object.
          </p>
          <Button className="mt-4" variant="secondary" asChild>
            <Link href="/approvals">
              Open approval center
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      ) : null}
    </RecordDetail>
  );
}
