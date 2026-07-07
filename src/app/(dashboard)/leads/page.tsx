import { ObjectPage } from "@/components/object-page";
import { mockLeads } from "@/lib/mock-data";

export default function LeadsPage() {
  return (
    <ObjectPage
      title="Leads"
      description="Manual lead and estimate-intake surface. HubSpot remains a future CRM boundary; this mock page validates the canonical lead flow before sync."
      rows={mockLeads}
      fields={["contactName", "leadType", "status", "source", "owner", "nextStep"]}
      detailPath="/leads"
      createLabel="New lead"
      createFields={[
        { name: "contactName", label: "Contact name", placeholder: "Customer or site contact" },
        { name: "leadType", label: "Lead type", placeholder: "Ramp install, VPL install, service call" },
        {
          name: "status",
          label: "Status",
          options: ["new", "contacted", "qualified", "estimate_needed", "estimate_sent", "approved"]
        },
        { name: "source", label: "Source", placeholder: "Phone, website, manual note" },
        { name: "owner", label: "Owner", placeholder: "Office Admin" },
        { name: "nextStep", label: "Next step", placeholder: "Call back, schedule estimate, qualify" }
      ]}
    />
  );
}
