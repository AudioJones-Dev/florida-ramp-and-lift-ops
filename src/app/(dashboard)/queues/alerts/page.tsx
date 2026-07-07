import { EmptyState } from "@/components/empty-state";
import { QueueView } from "@/components/queue-view";
import { getQueueDefinition } from "@/lib/queues";

export default function AlertsQueuePage() {
  const queue = getQueueDefinition("alerts");

  if (!queue) {
    return <EmptyState title="Queue not found" description="The alerts queue is not registered." backHref="/queues" />;
  }

  return <QueueView queue={queue} />;
}
