"use client";

import Link from "next/link";
import { Check, CirclePause, FileCheck2, FileText, HardHat, ListChecks, X } from "lucide-react";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  approvalWorkflowItems,
  getApprovalWorkflowCounts,
  type ApprovalDecision,
  type ApprovalWorkflowItem
} from "@/lib/approval-workflows";
import type { ApprovalStatus } from "@/types/core";

const kindIcons = {
  "Invoice approval": FileText,
  "Documentation approval": FileCheck2,
  "Payout approval": HardHat,
  "Job completion approval": ListChecks
};

export function ApprovalWorkflowCenter() {
  const [localDecisions, setLocalDecisions] = useState<Record<string, ApprovalDecision>>({});
  const items = useMemo(
    () =>
      approvalWorkflowItems.map((item) => ({
        ...item,
        currentStatus: localDecisions[item.id] ?? item.status
      })),
    [localDecisions]
  );
  const counts = getApprovalWorkflowCounts(items);
  const openItems = items.filter((item) => ["requested", "held"].includes(item.currentStatus));

  function decide(id: string, decision: ApprovalDecision) {
    setLocalDecisions((current) => ({ ...current, [id]: decision }));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <h1 className="text-2xl font-semibold">Approval Workflow Center</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
              Human approval workflow for invoice release, documentation evidence, contractor payout review,
              and job completion review. Decisions here are local-only UI state and do not persist.
            </p>
          </div>
          <Badge variant="secondary">Mock decisions only</Badge>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {counts.map((count) => {
          const Icon = kindIcons[count.kind];

          return (
            <article key={count.kind} className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-medium text-[var(--muted-foreground)]">
                  {count.kind}
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-md bg-[var(--secondary)] text-[var(--secondary-foreground)]">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-3xl font-semibold">{count.open}</div>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                {count.count} total mock request(s)
              </p>
            </article>
          );
        })}
      </section>

      {openItems.length === 0 ? (
        <section className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold">No open approval requests</h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            All mock approval records are locally approved, rejected, or otherwise inactive.
          </p>
        </section>
      ) : (
        <section className="grid gap-4 xl:grid-cols-2">
          {items.map((item) => (
            <ApprovalPacket key={item.id} item={item} onDecide={decide} />
          ))}
        </section>
      )}
    </div>
  );
}

function ApprovalPacket({
  item,
  onDecide
}: {
  item: ApprovalWorkflowItem;
  onDecide: (id: string, decision: ApprovalDecision) => void;
}) {
  const localOnly = item.currentStatus !== item.status;

  return (
    <article className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-semibold">{item.approvalCategory}</h2>
            {localOnly ? <Badge variant="secondary">Local-only decision</Badge> : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{item.risk}</p>
        </div>
        <StatusBadge value={item.currentStatus} />
      </div>

      <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
        <Field label="Target transition" value={item.targetTransition} />
        <Field label="Approver" value={item.approver} />
        <Field label="Source object" value={`${item.relatedObjectType}: ${item.relatedObjectId}`} />
        <Field label="Requested by" value={item.requestedBy} />
      </dl>

      <div className="mt-4 rounded-md border bg-[var(--background)] p-4">
        <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
          Evidence summary
        </div>
        <p className="mt-2 text-sm leading-6">{item.evidenceSummary}</p>
      </div>

      <div className="mt-4 rounded-md border bg-[var(--background)] p-4">
        <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
          Blocking rule
        </div>
        <p className="mt-2 text-sm leading-6">{item.blockingRule}</p>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button onClick={() => onDecide(item.id, "approved")}>
          <Check className="h-4 w-4" />
          Approve mock
        </Button>
        <Button variant="secondary" onClick={() => onDecide(item.id, "held")}>
          <CirclePause className="h-4 w-4" />
          Hold mock
        </Button>
        <Button variant="destructive" onClick={() => onDecide(item.id, "rejected")}>
          <X className="h-4 w-4" />
          Reject mock
        </Button>
        <Button variant="ghost" asChild>
          <Link href={item.detailHref}>View approval record</Link>
        </Button>
      </div>
    </article>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-[var(--background)] p-3">
      <dt className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">{label}</dt>
      <dd className="mt-1 font-medium">{formatApprovalValue(value)}</dd>
    </div>
  );
}

function formatApprovalValue(value: string | ApprovalStatus) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
