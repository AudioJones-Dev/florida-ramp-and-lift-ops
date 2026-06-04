import { ObjectPage } from "@/components/object-page";
import { mockContractors } from "@/lib/mock-data";

export default function ContractorsPage() {
  return (
    <ObjectPage
      title="Contractors"
      description="Contractor roster placeholders for skills, service areas, compliance, and payout status."
      rows={mockContractors}
      fields={["fullName", "role", "status", "skills", "ppeComplianceStatus"]}
      detailPath="/contractors"
      createLabel="New contractor"
      createFields={[
        { name: "fullName", label: "Full name", placeholder: "Installer name" },
        { name: "phone", label: "Phone", placeholder: "(555) 000-0000" },
        { name: "email", label: "Email", placeholder: "contractor@example.com" },
        {
          name: "status",
          label: "Status",
          options: ["candidate", "trainee", "helper", "lead_installer", "senior_lead", "inactive"]
        },
        { name: "ppeComplianceStatus", label: "PPE status", placeholder: "Compliant / review needed" }
      ]}
    />
  );
}
