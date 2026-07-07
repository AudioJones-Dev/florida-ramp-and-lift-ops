"use client";

import { Upload } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export function DocumentationUploadPlaceholder({
  label = "Mock documentation upload"
}: {
  label?: string;
}) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  return (
    <section className="rounded-md border bg-[var(--background)] p-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 text-[var(--muted-foreground)]" />
            <h2 className="text-sm font-semibold">{label}</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
            Select files to validate the field workflow. Files stay in browser state only and are
            not uploaded, stored, or sent to any service.
          </p>
        </div>
        <Badge variant="secondary">Local-only</Badge>
      </div>
      <label className="mt-4 block rounded-md border border-dashed bg-white p-4 text-sm">
        <span className="font-medium">Choose mock files</span>
        <input
          className="mt-3 block w-full text-sm"
          multiple
          onChange={(event) =>
            setFileNames(Array.from(event.target.files ?? []).map((file) => file.name))
          }
          type="file"
        />
      </label>
      {fileNames.length > 0 ? (
        <ul className="mt-3 space-y-2 text-sm">
          {fileNames.map((fileName) => (
            <li key={fileName} className="rounded-md border bg-white px-3 py-2">
              {fileName} - selected locally only
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
