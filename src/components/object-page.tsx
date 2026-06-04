import { Badge } from "@/components/ui/badge";

type ObjectRow = {
  id: string;
  [key: string]: string | number;
};

export function ObjectPage({
  title,
  description,
  rows,
  fields
}: {
  title: string;
  description: string;
  rows: ObjectRow[];
  fields: string[];
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
            {description}
          </p>
        </div>
        <Badge variant="secondary">Mock data only</Badge>
      </div>
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
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t">
                  {fields.map((field) => (
                    <td key={field} className="px-4 py-3 align-top">
                      {String(row[field] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function formatField(field: string) {
  return field.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase());
}
