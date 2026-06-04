import { ObjectPage } from "@/components/object-page";
import { mockContractors } from "@/lib/mock-data";

export default function ContractorsPage() {
  return (
    <ObjectPage
      title="Contractors"
      description="Contractor roster placeholders for skills, service areas, compliance, and payout status."
      rows={mockContractors}
      fields={["name", "role", "status", "skills", "ppeStatus"]}
    />
  );
}
