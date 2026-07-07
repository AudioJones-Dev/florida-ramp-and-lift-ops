import { Clock3 } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { getMockTimelineForRecord } from "@/lib/mock-events";

export function MockEventTimeline({ recordId }: { recordId: string }) {
  const events = getMockTimelineForRecord(recordId);

  return (
    <section className="mt-6 rounded-md border bg-[var(--background)] p-4">
      <div className="flex items-center gap-2">
        <Clock3 className="h-4 w-4 text-[var(--muted-foreground)]" />
        <h2 className="text-sm font-semibold">Mock audit/event timeline</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
        Local-only event trail for validating state transitions, dashboard triggers, approval gates,
        and future audit persistence. No events are saved.
      </p>
      <ol className="mt-4 space-y-3">
        {events.map((event) => (
          <li key={event.id} className="rounded-md border bg-white p-3">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <div className="text-sm font-semibold">{event.label}</div>
                <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">
                  {event.detail}
                </p>
              </div>
              <StatusBadge value={event.status} />
            </div>
            <div className="mt-2 text-xs font-medium uppercase text-[var(--muted-foreground)]">
              {event.timestamp} by {event.actor}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
