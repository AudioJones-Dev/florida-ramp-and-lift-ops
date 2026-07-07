import { EmptyState } from "@/components/empty-state";
import { QueueView } from "@/components/queue-view";
import { getQueueDefinition } from "@/lib/queues";

export default function FollowUpQueuePage() {
  const queue = getQueueDefinition("follow-up");

  if (!queue) {
    return <EmptyState title="Queue not found" description="The follow-up queue is not registered." backHref="/queues" />;
  }

  return <QueueView queue={queue} />;
}
