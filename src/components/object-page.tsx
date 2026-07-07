"use client";

import Link from "next/link";
import { Plus, X } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { StatusBadge, formatStatus } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ManualRecord, RecordValue } from "@/types/core";

export type CreateField = {
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
};

export function ObjectPage<TRecord extends ManualRecord>({
  title,
  description,
  rows,
  fields,
  detailPath,
  createLabel,
  createFields = []
}: {
  title: string;
  description: string;
  rows: TRecord[];
  fields: string[];
  detailPath: string;
  createLabel?: string;
  createFields?: CreateField[];
}) {
  const [draftRows, setDraftRows] = useState<ManualRecord[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const allRows = useMemo(() => [...draftRows, ...rows], [draftRows, rows]);
  const canCreate = createFields.length > 0 && createLabel;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const now = Date.now();
    const draft: ManualRecord = {
      id: `local-draft-${now}`,
      localOnly: "Unsaved local draft"
    };

    createFields.forEach((field) => {
      draft[field.name] = String(formData.get(field.name) ?? "");
    });

    setDraftRows((current) => [draft, ...current]);
    event.currentTarget.reset();
    setFormOpen(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Mock data only</Badge>
          {canCreate ? (
            <Button onClick={() => setFormOpen((value) => !value)}>
              {formOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {formOpen ? "Close" : createLabel}
            </Button>
          ) : null}
        </div>
      </div>

      {formOpen && canCreate ? (
        <form onSubmit={handleSubmit} className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-sm font-semibold">{createLabel}</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Creates a local in-memory draft only. Refreshing the page clears it.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {createFields.map((field) => (
              <label key={field.name} className="space-y-2 text-sm font-medium">
                <span>{field.label}</span>
                {field.options ? (
                  <select
                    className="h-10 w-full rounded-md border bg-white px-3 text-sm outline-none ring-[var(--ring)] focus:ring-2"
                    name={field.name}
                    required
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {formatStatus(option)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="h-10 w-full rounded-md border bg-white px-3 text-sm outline-none ring-[var(--ring)] focus:ring-2"
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                  />
                )}
              </label>
            ))}
          </div>
          <div className="mt-5 flex justify-end">
            <Button type="submit">Create local draft</Button>
          </div>
        </form>
      ) : null}

      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-[var(--muted)] text-xs uppercase text-[var(--muted-foreground)]">
              <tr>
                {fields.map((field) => (
                  <th key={field} className="px-4 py-3 font-semibold">
                    {formatField(field)}
                  </th>
                ))}
                <th className="px-4 py-3 font-semibold">Record</th>
              </tr>
            </thead>
            <tbody>
              {allRows.map((row) => (
                <tr key={row.id} className="border-t">
                  {fields.map((field) => (
                    <td key={field} className="px-4 py-3 align-top">
                      {renderValue(field, row[field])}
                    </td>
                  ))}
                  <td className="px-4 py-3 align-top">
                    {"localOnly" in row ? (
                      <Badge variant="secondary">Local draft</Badge>
                    ) : (
                      <Link
                        className="text-sm font-semibold text-[var(--primary)] hover:underline"
                        href={`${detailPath}/${row.id}`}
                      >
                        View detail
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function renderValue(field: string, value: RecordValue | undefined) {
  if (field === "status" || field === "severity" || field.endsWith("Status")) {
    return value ? <StatusBadge value={String(value)} /> : "";
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return String(value ?? "");
}

function formatField(field: string) {
  return field.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase());
}
