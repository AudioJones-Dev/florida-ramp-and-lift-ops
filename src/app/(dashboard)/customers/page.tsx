import { ObjectPage } from "@/components/object-page";
import { mockCustomers } from "@/lib/mock-data";

export default function CustomersPage() {
  return (
    <ObjectPage
      title="Customers"
      description="Manual customer records. HubSpot sync is excluded from this scaffold."
      rows={mockCustomers}
      fields={["name", "type", "phone", "email", "status"]}
    />
  );
}
