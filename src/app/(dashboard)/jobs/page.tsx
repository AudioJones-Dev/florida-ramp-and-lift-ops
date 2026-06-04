import { ObjectPage } from "@/components/object-page";
import { mockJobs } from "@/lib/mock-data";

export default function JobsPage() {
  return (
    <ObjectPage
      title="Jobs"
      description="Manual job and progress tracking records owned by the FLR Platform."
      rows={mockJobs}
      fields={["jobNumber", "customer", "status", "scheduledFor", "assignedTo"]}
    />
  );
}
