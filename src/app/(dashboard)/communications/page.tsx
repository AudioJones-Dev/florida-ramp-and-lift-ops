import { ObjectPage } from "@/components/object-page";
import { mockCommunications } from "@/lib/mock-data";

export default function CommunicationsPage() {
  return (
    <ObjectPage
      title="Communications"
      description="First-class manual communication records before email, SMS, phone, or CRM integrations."
      rows={mockCommunications}
      fields={["channel", "contact", "summary", "status", "relatedObject"]}
    />
  );
}
