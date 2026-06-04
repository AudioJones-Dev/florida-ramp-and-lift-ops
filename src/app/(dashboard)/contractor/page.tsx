import { mockContractorAssignments } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function ContractorPortalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Contractor Portal MVP</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Narrow mock portal for assigned jobs, scope, site requirements, documentation upload status, and payout visibility.
        </p>
      </div>
      <section className="grid gap-4 lg:grid-cols-2">
        {mockContractorAssignments.map((assignment) => (
          <article key={assignment.id} className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold">{assignment.job}</h2>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">{assignment.location}</p>
              </div>
              <Badge>{assignment.status}</Badge>
            </div>
            <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-[var(--muted-foreground)]">Scope</dt>
                <dd className="font-medium">{assignment.scope}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted-foreground)]">Documentation</dt>
                <dd className="font-medium">{assignment.documentationStatus}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted-foreground)]">PPE</dt>
                <dd className="font-medium">{assignment.ppe}</dd>
              </div>
              <div>
                <dt className="text-[var(--muted-foreground)]">Payout</dt>
                <dd className="font-medium">{assignment.payout}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </div>
  );
}
