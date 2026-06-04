import { EmptyState } from "@/components/empty-state";
import { QueueView } from "@/components/queue-view";
import { getQueueDefinition } from "@/lib/queues";

export default function DocumentationQueuePage() {
  const queue = getQueueDefinition("documentation");

  if (!queue) {
    return <EmptyState title="Queue not found" description="The documentation queue is not registered." backHref="/queues" />;
  }

  return <QueueView queue={queue} />;
}
