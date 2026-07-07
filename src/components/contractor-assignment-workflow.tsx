"use client";

import {
  Check,
  CirclePause,
  ClipboardList,
  FileCheck2,
  MapPin,
  Repeat2,
  ShieldCheck,
  X
} from "lucide-react";
import { DocumentationUploadPlaceholder } from "@/components/documentation-upload-placeholder";
import { useMemo, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockContractorAssignments } from "@/lib/mock-data";
import type { ContractorAssignmentStatus } from "@/types/core";

type LocalAssignmentState = {
  status?: ContractorAssignmentStatus;
  completionNote?: string;
  documentationStatus?: string;
  transferReason?: string;
  remainingScope?: string;
  transferPacketSummary?: string;
};

export function ContractorAssignmentWorkflow() {
  const [localState, setLocalState] = useState<Record<string, LocalAssignmentState>>({});
  const assignments = useMemo(
    () =>
      mockContractorAssignments.map((assignment) => ({
        ...assignment,
        status: localState[assignment.id]?.status ?? assignment.status,
        documentationStatus:
          localState[assignment.id]?.documentationStatus ?? assignment.documentationStatus,
        completionNote: localState[assignment.id]?.completionNote ?? "",
        transferReason: localState[assignment.id]?.transferReason ?? assignment.transferReason,
        remainingScope: localState[assignment.id]?.remainingScope ?? assignment.remainingScope,
        transferPacketSummary:
          localState[assignment.id]?.transferPacketSummary ?? assignment.transferPacketSummary
      })),
    [localState]
  );

  function updateStatus(id: string, status: ContractorAssignmentStatus) {
    setLocalState((current) => ({
      ...current,
      [id]: {
        ...current[id],
        status
      }
    }));
  }

  function submitCompletion(id: string, completionNote: string) {
    setLocalState((current) => ({
      ...current,
      [id]: {
        ...current[id],
        status: "submitted",
        documentationStatus: "Submitted locally",
        completionNote
      }
    }));
  }

  function requestTransfer(id: string, reason: string) {
    setLocalState((current) => ({
      ...current,
      [id]: {
        ...current[id],
        status: "transfer_requested",
        documentationStatus: "Transfer packet pending dispatcher review",
        transferReason: reason,
        remainingScope: "Dispatcher must confirm remaining work before reassigning this job.",
        transferPacketSummary:
          "Local transfer request created. Original contractor context stays attached for dispatcher review."
      }
    }));
  }

  const openCount = assignments.filter((assignment) =>
    ["assigned", "accepted", "in_progress"].includes(assignment.status)
  ).length;
  const documentationNeeded = assignments.filter((assignment) =>
    assignment.documentationStatus.toLowerCase().includes("pending")
  ).length;
  const ppeIssues = assignments.filter((assignment) =>
    assignment.ppeStatus.toLowerCase().includes("review")
  ).length;
  const transferRequests = assignments.filter((assignment) =>
    ["transfer_requested", "partial_complete"].includes(assignment.status)
  ).length;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Contractor Assignment Workflow</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">
              Mobile-first mock workflow for assigned jobs, acceptance, rejection, documentation,
              PPE checks, safety requirements, and completion submission.
            </p>
          </div>
          <Badge variant="secondary">Local-only field workflow</Badge>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-4">
        <Metric label="Open assignments" value={openCount} />
        <Metric label="Documentation needed" value={documentationNeeded} />
        <Metric label="PPE review items" value={ppeIssues} />
        <Metric label="Transfer requests" value={transferRequests} />
      </section>

      <section className="grid gap-4">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            onStatus={updateStatus}
            onSubmitCompletion={submitCompletion}
            onRequestTransfer={requestTransfer}
          />
        ))}
      </section>
    </div>
  );
}

function AssignmentCard({
  assignment,
  onStatus,
  onSubmitCompletion,
  onRequestTransfer
}: {
  assignment: (typeof mockContractorAssignments)[number] & {
    completionNote: string;
  };
  onStatus: (id: string, status: ContractorAssignmentStatus) => void;
  onSubmitCompletion: (id: string, completionNote: string) => void;
  onRequestTransfer: (id: string, reason: string) => void;
}) {
  const [note, setNote] = useState("");
  const [transferReason, setTransferReason] = useState("");
  const isRejected = assignment.status === "rejected";
  const isSubmitted = assignment.status === "submitted";
  const isTransferRequested = assignment.status === "transfer_requested";
  const isClosedForAction = isRejected || isSubmitted || isTransferRequested || assignment.status === "transferred";

  return (
    <article className="rounded-lg border bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
            {assignment.jobNumber}
          </div>
          <h2 className="mt-1 text-lg font-semibold">{assignment.jobTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
            {assignment.scope}
          </p>
        </div>
        <StatusBadge value={assignment.status} />
      </div>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <InfoBlock icon={MapPin} label="Location" value={assignment.location} />
        <InfoBlock icon={ClipboardList} label="Schedule" value={assignment.scheduledWindow} />
        <InfoBlock icon={ShieldCheck} label="PPE status" value={assignment.ppeStatus} />
        <InfoBlock icon={FileCheck2} label="Documentation" value={assignment.documentationStatus} />
      </div>

      <section className="mt-4 grid gap-3 lg:grid-cols-3">
        <Checklist title="Required Equipment" items={assignment.requiredEquipment} />
        <Checklist title="Required Documentation" items={assignment.requiredDocumentation} />
        <Checklist title="Safety Requirements" items={assignment.safetyRequirements} />
      </section>

      <div className="mt-4 rounded-md border bg-[var(--background)] p-3">
        <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">
          Site contact and notes
        </div>
        <p className="mt-2 text-sm leading-6">
          {assignment.siteContact}. {assignment.notes}
        </p>
      </div>

      {assignment.transferPacketSummary ? (
        <div className="mt-4 rounded-md border bg-[var(--secondary)] p-3 text-sm text-[var(--secondary-foreground)]">
          <div className="flex items-center gap-2 font-semibold">
            <Repeat2 className="h-4 w-4" />
            Transfer packet
          </div>
          <p className="mt-2 leading-6">{assignment.transferPacketSummary}</p>
          {assignment.remainingScope ? (
            <p className="mt-2 leading-6">Remaining scope: {assignment.remainingScope}</p>
          ) : null}
          {assignment.transferReason ? (
            <p className="mt-2 leading-6">Reason: {assignment.transferReason}</p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4">
        <DocumentationUploadPlaceholder label="Field photo/document placeholder" />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Button
          disabled={isClosedForAction}
          onClick={() => onStatus(assignment.id, "accepted")}
        >
          <Check className="h-4 w-4" />
          Accept
        </Button>
        <Button
          disabled={isClosedForAction}
          variant="secondary"
          onClick={() => onStatus(assignment.id, "in_progress")}
        >
          <CirclePause className="h-4 w-4" />
          Start
        </Button>
        <Button
          disabled={isSubmitted || isTransferRequested}
          variant="destructive"
          onClick={() => onStatus(assignment.id, "rejected")}
        >
          <X className="h-4 w-4" />
          Reject
        </Button>
      </div>

      <form
        className="mt-4 rounded-md border bg-[var(--background)] p-3"
        onSubmit={(event) => {
          event.preventDefault();
          onRequestTransfer(
            assignment.id,
            transferReason || "Contractor requested transfer because remaining work cannot be completed."
          );
          setTransferReason("");
        }}
      >
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Repeat2 className="h-4 w-4 text-[var(--primary)]" />
          Request transfer
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
          Use when work is partial, blocked, or another contractor/team must finish the remaining scope.
        </p>
        <label className="mt-3 block text-sm font-medium">
          Transfer reason
          <textarea
            className="mt-2 min-h-20 w-full rounded-md border bg-white px-3 py-2 text-sm outline-none ring-[var(--ring)] focus:ring-2"
            disabled={isClosedForAction}
            onChange={(event) => setTransferReason(event.target.value)}
            placeholder="Example: customer access closed before after photos, needs lead installer to verify site condition."
            value={transferReason}
          />
        </label>
        <Button className="mt-3 w-full sm:w-auto" disabled={isClosedForAction} variant="secondary" type="submit">
          <Repeat2 className="h-4 w-4" />
          Request transfer mock
        </Button>
      </form>

      <form
        className="mt-4 space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitCompletion(assignment.id, note || "Completion submitted locally.");
          setNote("");
        }}
      >
        <label className="block text-sm font-medium">
          Completion note
          <textarea
            className="mt-2 min-h-24 w-full rounded-md border bg-white px-3 py-2 text-sm outline-none ring-[var(--ring)] focus:ring-2"
            disabled={isRejected || isTransferRequested}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Add completion notes, blockers, or documentation context."
            value={note}
          />
        </label>
        <Button className="w-full sm:w-auto" disabled={isRejected || isTransferRequested} type="submit">
          Submit completion mock
        </Button>
      </form>

      {assignment.completionNote ? (
        <div className="mt-4 rounded-md border bg-[var(--secondary)] p-3 text-sm text-[var(--secondary-foreground)]">
          Local completion note: {assignment.completionNote}
        </div>
      ) : null}
    </article>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="text-sm text-[var(--muted-foreground)]">{label}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
    </article>
  );
}

function InfoBlock({
  icon: Icon,
  label,
  value
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border bg-[var(--background)] p-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[var(--muted-foreground)]">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div className="mt-2 font-medium">{value}</div>
    </div>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border bg-[var(--background)] p-3">
      <div className="text-xs font-semibold uppercase text-[var(--muted-foreground)]">{title}</div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
