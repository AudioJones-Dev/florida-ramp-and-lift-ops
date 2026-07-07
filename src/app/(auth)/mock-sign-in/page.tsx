import Link from "next/link";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { mockLoginAccounts, mockRoles } from "@/lib/roles";
import { Button } from "@/components/ui/button";

export default function MockSignInPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-10">
      <section className="w-full max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-[var(--primary)] text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-normal">
              FLR Operational Intelligence
            </h1>
            <p className="text-sm text-[var(--muted-foreground)]">
              Mock role shell. Select a local preview account without real authentication.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mockLoginAccounts.map((account) => {
            const role = mockRoles.find((item) => item.id === account.roleId);

            return (
              <Link
                key={account.id}
                href={`/dashboard?role=${account.roleId}&account=${account.id}`}
                className="rounded-lg border bg-white p-5 shadow-sm transition hover:border-[var(--primary)]"
              >
                <div className="mb-3 text-sm font-semibold">{account.label}</div>
                <div className="flex min-w-0 items-center gap-2 rounded-md border bg-[var(--background)] px-3 py-2 text-sm">
                  <Mail className="h-4 w-4 shrink-0 text-[var(--muted-foreground)]" />
                  <span className="truncate font-medium">{account.email}</span>
                </div>
                <p className="min-h-12 text-sm leading-6 text-[var(--muted-foreground)]">
                  {account.description}
                </p>
                <div className="mt-3 text-xs font-medium uppercase text-[var(--muted-foreground)]">
                  {account.tenantLabel} / {role?.label ?? account.roleId}
                </div>
                <Button className="mt-5 w-full" variant="secondary">
                  Open mock view
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
