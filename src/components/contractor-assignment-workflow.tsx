"use client";

import { Check, CirclePause, ClipboardList, FileCheck2, MapPin, ShieldCheck, X } from "lucide-react";
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
        completionNote: localState[assignment.id]?.completionNote ?? ""
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

  const openCount = assignments.filter((assignment) =>
    ["assigned", "accepted", "in_progress"].includes(assignment.status)
  ).length;
  const documentationNeeded = assignments.filter((assignment) =>
    assignment.documentationStatus.toLowerCase().includes("pending")
  ).length;
  const ppeIssues = assignments.filter((assignment) =>
    assignment.ppeStatus.toLowerCase().includes("review")
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

      <section className="grid gap-3 sm:grid-cols-3">
        <Metric label="Open assignments" value={openCount} />
        <Metric label="Documentation needed" value={documentationNeeded} />
        <Metric label="PPE review items" value={ppeIssues} />
      </section>

      <section className="grid gap-4">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            onStatus={updateStatus}
            onSubmitCompletion={submitCompletion}
          />
        ))}
      </section>
    </div>
  );
}

function AssignmentCard({
  assignment,
  onStatus,
  onSubmitCompletion
}: {
  assignment: (typeof mockContractorAssignments)[number] & {
    completionNote: string;
  };
  onStatus: (id: string, status: ContractorAssignmentStatus) => void;
  onSubmitCompletion: (id: string, completionNote: string) => void;
}) {
  const [note, setNote] = useState("");
  const isRejected = assignment.status === "rejected";
  const isSubmitted = assignment.status === "submitted";

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

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Button
          disabled={isRejected || isSubmitted}
          onClick={() => onStatus(assignment.id, "accepted")}
        >
          <Check className="h-4 w-4" />
          Accept
        </Button>
        <Button
          disabled={isRejected || isSubmitted}
          variant="secondary"
          onClick={() => onStatus(assignment.id, "in_progress")}
        >
          <CirclePause className="h-4 w-4" />
          Start
        </Button>
        <Button
          disabled={isSubmitted}
          variant="destructive"
          onClick={() => onStatus(assignment.id, "rejected")}
        >
          <X className="h-4 w-4" />
          Reject
        </Button>
      </div>

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
            disabled={isRejected}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Add completion notes, blockers, or documentation context."
            value={note}
          />
        </label>
        <Button className="w-full sm:w-auto" disabled={isRejected} type="submit">
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
