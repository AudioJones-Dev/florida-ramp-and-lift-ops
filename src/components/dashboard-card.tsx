import type { LucideIcon } from "lucide-react";

export function DashboardCard({
  icon: Icon,
  label,
  value,
  detail
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  detail: string;
}) {
  return (
    <article className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-medium text-[var(--muted-foreground)]">{label}</div>
        <div className="grid h-9 w-9 place-items-center rounded-md bg-[var(--secondary)] text-[var(--secondary-foreground)]">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="text-3xl font-semibold">{value}</div>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">{detail}</p>
    </article>
  );
}
