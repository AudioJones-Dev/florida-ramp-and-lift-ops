import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  backHref
}: {
  title: string;
  description: string;
  backHref: string;
}) {
  return (
    <section className="grid min-h-[360px] place-items-center rounded-lg border bg-white p-8 text-center shadow-sm">
      <div className="max-w-md">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-md bg-[var(--muted)] text-[var(--muted-foreground)]">
          <SearchX className="h-5 w-5" />
        </div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{description}</p>
        <Button className="mt-6" variant="secondary" asChild>
          <Link href={backHref}>Back to list</Link>
        </Button>
      </div>
    </section>
  );
}
