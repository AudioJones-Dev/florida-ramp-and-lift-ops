import Link from "next/link";
import { ArrowRight, Repeat2 } from "lucide-react";
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
        "transferStatus",
        "remainingScope",
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
              <Button variant="secondary" asChild>
                <Link href="/queues/job-transfers">
                  Transfer queue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      ) : null}
      {job && shouldShowTransferPanel(job.status, job.transferStatus) ? (
        <section className="mt-4 rounded-md border bg-[var(--background)] p-4">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[var(--muted-foreground)]">
                <Repeat2 className="h-4 w-4" />
                Transfer workflow
              </div>
              <h2 className="mt-2 text-lg font-semibold">Continuation packet required</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
                {job.transferPacketSummary ??
                  "This job needs dispatcher review before another contractor or team finishes the remaining work."}
              </p>
            </div>
            <StatusBadge value={job.transferStatus ?? job.status} />
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <TransferInfo label="Previous assignee" value={job.previousAssignee ?? job.assignedTo} />
            <TransferInfo label="Suggested next team" value={job.transferTarget ?? "Dispatcher review required"} />
            <TransferInfo label="Transfer reason" value={job.transferReason ?? "Reason must be recorded before transfer."} />
            <TransferInfo label="Invoice state" value={job.invoiceReadiness} />
          </div>

          <div className="mt-4 rounded-md border bg-white p-3">
            <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
              Remaining scope
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
              {job.remainingScope ?? "Dispatcher must define the exact remaining work before reassignment."}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button variant="secondary" asChild>
              <Link href="/queues/job-transfers">
                Review transfer queue
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/dispatch">
                Compare contractor fit
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      ) : null}
    </RecordDetail>
  );
}

function getJobNextAction(status: string, invoiceReadyForReview: boolean) {
  if (invoiceReadyForReview) {
    return "Finance should review the invoice packet. Michael approval is still required before any client-facing release.";
  }

  if (["incomplete", "transfer_review", "return_needed"].includes(status)) {
    return "Dispatcher should review the transfer packet, preserve the original contractor context, and assign only the remaining work.";
  }

  if (status === "documentation_review") {
    return "Office/Admin should verify required proof-of-work and either approve or request missing documentation.";
  }

  if (status === "assigned" || status === "scheduled") {
    return "Dispatcher should confirm contractor acceptance, schedule window, PPE, equipment, and site readiness.";
  }

  return "Review current state, owner, and related queue to determine the next human action.";
}

function shouldShowTransferPanel(status: string, transferStatus?: string) {
  return Boolean(transferStatus) || ["incomplete", "transfer_review", "return_needed", "on_hold"].includes(status);
}

function TransferInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-white p-3">
      <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">{label}</div>
      <div className="mt-2 text-sm font-medium leading-6">{value}</div>
    </div>
  );
}
