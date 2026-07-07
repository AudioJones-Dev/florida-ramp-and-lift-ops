import { EmptyState } from "@/components/empty-state";
import { QueueView } from "@/components/queue-view";
import { getQueueDefinition } from "@/lib/queues";

export default function ApprovalsQueuePage() {
  const queue = getQueueDefinition("approvals");

  if (!queue) {
    return <EmptyState title="Queue not found" description="The approvals queue is not registered." backHref="/queues" />;
  }

  return <QueueView queue={queue} />;
}
