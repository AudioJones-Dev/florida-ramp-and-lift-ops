import { ObjectPage } from "@/components/object-page";
import { mockCommunications } from "@/lib/mock-data";

export default function CommunicationsPage() {
  return (
    <ObjectPage
      title="Communications"
      description="First-class manual communication records before email, SMS, phone, or CRM integrations."
      rows={mockCommunications}
      fields={["sourceChannel", "contactName", "summary", "status", "relatedObjectType"]}
      detailPath="/communications"
      createLabel="New communication"
      createFields={[
        { name: "sourceChannel", label: "Source channel", options: ["Phone", "Email", "SMS", "Manual note"] },
        { name: "contactName", label: "Contact", placeholder: "Contact name" },
        { name: "summary", label: "Summary", placeholder: "Brief communication summary" },
        { name: "status", label: "Status", options: ["new", "received", "unanswered", "needs_review"] },
        { name: "relatedObjectType", label: "Related object", options: ["Customer", "Job", "Invoice"] }
      ]}
    />
  );
}
