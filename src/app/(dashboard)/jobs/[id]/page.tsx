import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RecordDetail } from "@/components/record-detail";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = coreRecordLookups.jobs(id);

  return (
    <RecordDetail
      title="Job detail"
      description="Manual job record aligned to the operational state machine."
      record={job}
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
        "invoiceReadinessStatus",
        "invoiceReadyForReview",
        "invoiceReadiness",
        "notes"
      ]}
    >
      {job ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <section className="rounded-md border bg-[var(--background)] p-4">
            <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
              Next action
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
              {getJobNextAction(job.status, job.invoiceReadyForReview)}
            </p>
          </section>
          <section className="rounded-md border bg-[var(--background)] p-4">
            <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
              Invoice readiness
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge value={job.invoiceReadinessStatus} />
              <span className="text-sm font-medium">
                {job.invoiceReadyForReview ? "Ready for finance review" : "Not ready for finance review"}
              </span>
            </div>
          </section>
          <section className="rounded-md border bg-[var(--background)] p-4">
            <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
              Operational links
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <Button variant="secondary" asChild>
                <Link href="/queues/documentation">
                  Documentation queue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/queues/invoice-review">
                  Invoice review queue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      ) : null}
    </RecordDetail>
  );
}

function getJobNextAction(status: string, invoiceReadyForReview: boolean) {
  if (invoiceReadyForReview) {
    return "Finance should review the invoice packet. Michael approval is still required before any client-facing release.";
  }

  if (status === "documentation_review") {
    return "Office/Admin should verify required proof-of-work and either approve or request missing documentation.";
  }

  if (status === "assigned" || status === "scheduled") {
    return "Dispatcher should confirm contractor acceptance, schedule window, PPE, equipment, and site readiness.";
  }

  return "Review current state, owner, and related queue to determine the next human action.";
}
