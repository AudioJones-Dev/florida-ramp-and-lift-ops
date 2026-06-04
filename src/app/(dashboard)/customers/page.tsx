import { ObjectPage } from "@/components/object-page";
import { mockCustomers } from "@/lib/mock-data";

export default function CustomersPage() {
  return (
    <ObjectPage
      title="Customers"
      description="Manual customer records. HubSpot sync is excluded from this scaffold."
      rows={mockCustomers}
      fields={["displayName", "customerType", "primaryContactPhone", "primaryContactEmail", "status"]}
      detailPath="/customers"
      createLabel="New customer"
      createFields={[
        { name: "displayName", label: "Customer name", placeholder: "Customer or account name" },
        { name: "customerType", label: "Customer type", options: ["residential", "commercial"] },
        { name: "primaryContactPhone", label: "Phone", placeholder: "(555) 000-0000" },
        { name: "primaryContactEmail", label: "Email", placeholder: "customer@example.com" },
        { name: "status", label: "Status", options: ["prospect", "active", "on_hold"] }
      ]}
    />
  );
}
