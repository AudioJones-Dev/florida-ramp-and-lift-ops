import { ObjectPage } from "@/components/object-page";
import { mockJobs } from "@/lib/mock-data";

export default function JobsPage() {
  return (
    <ObjectPage
      title="Jobs"
      description="Manual job and progress tracking records owned by the FLR Platform."
      rows={mockJobs}
      fields={[
        "jobNumber",
        "customerName",
        "jobType",
        "status",
        "invoiceReadinessStatus",
        "scheduledFor",
        "assignedTo"
      ]}
      detailPath="/jobs"
      createLabel="New job"
      createFields={[
        { name: "jobNumber", label: "Job number", placeholder: "FLR-####" },
        { name: "customerName", label: "Customer", placeholder: "Customer name" },
        { name: "jobType", label: "Job type", placeholder: "Ramp install" },
        { name: "status", label: "Status", options: ["pending", "scheduled", "assigned", "on_hold"] },
        { name: "scheduledFor", label: "Scheduled for", placeholder: "Today, tomorrow, date window" }
      ]}
    />
  );
}
