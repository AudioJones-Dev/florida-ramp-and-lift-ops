import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { mockRoles } from "@/lib/roles";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
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
              Auth placeholder shell. Select a mock role to preview access.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mockRoles.map((role) => (
            <Link
              key={role.id}
              href={`/dashboard?role=${role.id}`}
              className="rounded-lg border bg-white p-5 shadow-sm transition hover:border-[var(--primary)]"
            >
              <div className="mb-3 text-sm font-semibold">{role.label}</div>
              <p className="min-h-12 text-sm leading-6 text-[var(--muted-foreground)]">
                {role.description}
              </p>
              <Button className="mt-5 w-full" variant="secondary">
                Open mock view
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
