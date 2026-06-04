import { ObjectPage } from "@/components/object-page";
import { mockDocumentation } from "@/lib/mock-data";

export default function DocumentationPage() {
  return (
    <ObjectPage
      title="Documentation"
      description="Mock documentation review queue for job photos, notes, and completion evidence."
      rows={mockDocumentation}
      fields={["artifact", "job", "submittedBy", "status", "reviewGate"]}
    />
  );
}
