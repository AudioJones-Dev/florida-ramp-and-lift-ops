import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardCard } from "@/components/dashboard-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { queueDefinitions } from "@/lib/queues";

export default function QueuesPage() {
  const totalItems = queueDefinitions.reduce((total, queue) => total + queue.items.length, 0);
  const largestQueue = queueDefinitions.reduce(
    (largest, queue) => (queue.items.length > largest.items.length ? queue : largest),
    queueDefinitions[0]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Operational Queues</h1>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
          MVP workflow surfaces derived from mock/manual records. These queues do not write to a database or call integrations.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <DashboardCard icon={largestQueue.icon} label="Total queue items" value={totalItems} detail="Across all MVP queues" />
        <DashboardCard icon={largestQueue.icon} label="Largest queue" value={largestQueue.items.length} detail={largestQueue.title} />
        <DashboardCard icon={largestQueue.icon} label="Live integrations" value="0" detail="Manual/mock only" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {queueDefinitions.map((queue) => {
          const Icon = queue.icon;
          const firstStatus = queue.items[0]?.status ?? "empty";

          return (
            <article key={queue.key} className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--secondary)] text-[var(--secondary-foreground)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{queue.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
                      {queue.description}
                    </p>
                  </div>
                </div>
                <StatusBadge value={firstStatus} />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-[var(--muted-foreground)]">
                  {queue.items.length} matching records
                </span>
                <Button variant="secondary" asChild>
                  <Link href={queue.href}>
                    Open queue
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
