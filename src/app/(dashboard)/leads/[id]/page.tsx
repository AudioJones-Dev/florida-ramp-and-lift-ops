import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RecordDetail } from "@/components/record-detail";
import { Button } from "@/components/ui/button";
import { coreRecordLookups } from "@/lib/mock-data";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = coreRecordLookups.leads(id);

  return (
    <RecordDetail
      title="Lead detail"
      description="Manual lead record for validating intake, qualification, estimate, and conversion states before HubSpot sync."
      record={lead}
      backHref="/leads"
      fields={[
        "leadId",
        "customerId",
        "contactName",
        "leadType",
        "status",
        "source",
        "owner",
        "nextStep",
        "relatedCommunicationId",
        "notes"
      ]}
    >
      {lead ? (
        <section className="mt-6 rounded-md border bg-[var(--background)] p-4">
          <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
            Intake handoff
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
            This lead can be reviewed as a CRM intake record today, then mapped to HubSpot later.
            Conversion should create or link a customer, job, and communication record before any
            operational workflow starts.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button variant="secondary" asChild>
              <Link href={`/customers/${lead.customerId}`}>
                View customer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href={`/communications/${lead.relatedCommunicationId}`}>
                View communication
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      ) : null}
    </RecordDetail>
  );
}
