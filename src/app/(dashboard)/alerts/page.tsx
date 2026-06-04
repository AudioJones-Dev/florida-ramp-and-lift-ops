import { ObjectPage } from "@/components/object-page";
import { mockAlerts } from "@/lib/mock-data";

export default function AlertsPage() {
  return (
    <ObjectPage
      title="Alerts"
      description="Hybrid alert placeholders representing persisted records after runtime thresholds are crossed."
      rows={mockAlerts}
      fields={["severity", "source", "status", "owner", "summary"]}
    />
  );
}
