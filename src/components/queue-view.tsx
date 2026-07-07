import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardCard } from "@/components/dashboard-card";
import { EmptyState } from "@/components/empty-state";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { QueueDefinition } from "@/lib/queues";

export function QueueView({ queue }: { queue: QueueDefinition }) {
  const Icon = queue.icon;
  const blockedCount = queue.items.filter((item) =>
    ["missing", "needs_review", "held", "open", "unanswered", "requested"].includes(item.status)
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-2xl font-semibold">{queue.title}</h1>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
            {queue.description}
          </p>
        </div>
        <Badge variant="secondary">Mock queue</Badge>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <DashboardCard icon={Icon} label="Matching records" value={queue.items.length} detail="Filtered from local mock data" />
        <DashboardCard icon={Icon} label="Needs attention" value={blockedCount} detail="Open, requested, held, or review states" />
        <DashboardCard icon={Icon} label="Persistence" value="0" detail="No database writes in this queue" />
      </section>

      {queue.items.length === 0 ? (
        <EmptyState
          title={queue.emptyTitle}
          description={queue.emptyDescription}
          backHref="/queues"
        />
      ) : (
        <section className="overflow-hidden rounded-lg border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <thead className="bg-[var(--muted)] text-xs uppercase text-[var(--muted-foreground)]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Record</th>
                  <th className="px-4 py-3 font-semibold">Detail</th>
                  <th className="px-4 py-3 font-semibold">{queue.ownerLabel}</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Link</th>
                </tr>
              </thead>
              <tbody>
                {queue.items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-3 align-top font-medium">{item.title}</td>
                    <td className="px-4 py-3 align-top text-[var(--muted-foreground)]">
                      {item.detail}
                    </td>
                    <td className="px-4 py-3 align-top">{item.owner}</td>
                    <td className="px-4 py-3 align-top">
                      <StatusBadge value={item.status} />
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Button variant="ghost" asChild>
                        <Link href={item.href}>
                          View
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
