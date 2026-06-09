import { Badge } from "@/components/ui/badge";
import { contractorDirectory } from "@/lib/contractor-billing";

export default function ContractorsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-semibold">Contractor Directory</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
              Preloaded installer roster used by job assignment, submission, pay split, and weekly invoice rollup flows.
            </p>
          </div>
          <Badge variant="secondary">Mock roster</Badge>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead className="bg-[var(--muted)] text-xs uppercase text-[var(--muted-foreground)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Contractor</th>
                <th className="px-4 py-3 font-semibold">Company</th>
                <th className="px-4 py-3 font-semibold">Default role</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Payment profile</th>
                <th className="px-4 py-3 font-semibold">HubSpot</th>
              </tr>
            </thead>
            <tbody>
              {contractorDirectory.map((contractor) => (
                <tr key={contractor.id} className="border-t">
                  <td className="px-4 py-3 align-top">
                    <div className="font-semibold">{contractor.name}</div>
                    <div className="mt-1 text-xs text-[var(--muted-foreground)]">{contractor.email}</div>
                    <div className="mt-1 text-xs text-[var(--muted-foreground)]">{contractor.phone}</div>
                  </td>
                  <td className="px-4 py-3 align-top">{contractor.companyName}</td>
                  <td className="px-4 py-3 align-top capitalize">{contractor.defaultRole}</td>
                  <td className="px-4 py-3 align-top">
                    <Badge variant="secondary">{contractor.activeStatus}</Badge>
                  </td>
                  <td className="px-4 py-3 align-top">{contractor.paymentProfileStatus ?? "not set"}</td>
                  <td className="px-4 py-3 align-top">{contractor.hubspotContactId ?? "not linked"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
