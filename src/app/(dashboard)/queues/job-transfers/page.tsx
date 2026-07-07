import { EmptyState } from "@/components/empty-state";
import { QueueView } from "@/components/queue-view";
import { getQueueDefinition } from "@/lib/queues";

export default function JobTransfersQueuePage() {
  const queue = getQueueDefinition("job-transfers");

  if (!queue) {
    return <EmptyState title="Queue not found" description="The job transfers queue is not registered." backHref="/queues" />;
  }

  return <QueueView queue={queue} />;
}
