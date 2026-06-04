import { ObjectPage } from "@/components/object-page";
import { mockApprovals } from "@/lib/mock-data";

export default function ApprovalsPage() {
  return (
    <ObjectPage
      title="Approvals"
      description="Human approval queue placeholders. Client-facing invoice release is never automatic in MVP."
      rows={mockApprovals}
      fields={["request", "source", "status", "approver", "risk"]}
    />
  );
}
