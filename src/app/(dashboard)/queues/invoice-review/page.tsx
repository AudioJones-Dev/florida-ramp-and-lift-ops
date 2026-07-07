import { EmptyState } from "@/components/empty-state";
import { QueueView } from "@/components/queue-view";
import { getQueueDefinition } from "@/lib/queues";

export default function InvoiceReviewQueuePage() {
  const queue = getQueueDefinition("invoice-review");

  if (!queue) {
    return <EmptyState title="Queue not found" description="The invoice review queue is not registered." backHref="/queues" />;
  }

  return <QueueView queue={queue} />;
}
