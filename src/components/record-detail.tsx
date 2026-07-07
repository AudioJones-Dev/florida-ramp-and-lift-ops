import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { MockEventTimeline } from "@/components/mock-event-timeline";
import { StatusBadge, formatStatus } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import type { ManualRecord } from "@/types/core";

export function RecordDetail({
  title,
  description,
  record,
  backHref,
  fields,
  children
}: {
  title: string;
  description: string;
  record: ManualRecord | undefined;
  backHref: string;
  fields: string[];
  children?: ReactNode;
}) {
  if (!record) {
    return (
      <EmptyState
        title={`${title} not found`}
        description="This mock scaffold only resolves records present in the local data collection."
        backHref={backHref}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href={backHref}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </Button>
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
              {description}
            </p>
          </div>
          {"status" in record ? <StatusBadge value={String(record.status)} /> : null}
        </div>
        <dl className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {fields.map((field) => (
            <div key={field} className="rounded-md border bg-[var(--background)] p-4">
              <dt className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
                {formatField(field)}
              </dt>
              <dd className="mt-2 text-sm font-medium">{formatValue(record[field])}</dd>
            </div>
          ))}
        </dl>
        {children}
        <MockEventTimeline recordId={record.id} />
      </section>
    </div>
  );
}

function formatField(field: string) {
  return field.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase());
}

function formatValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "string") {
    return value.includes("_") ? formatStatus(value) : value;
  }

  return String(value ?? "");
}
