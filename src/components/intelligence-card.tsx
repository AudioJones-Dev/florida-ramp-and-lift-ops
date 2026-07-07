import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IntelligenceCard as IntelligenceCardModel } from "@/lib/dashboard-intelligence";

export function IntelligenceCard({ card }: { card: IntelligenceCardModel }) {
  const Icon = card.icon;

  return (
    <article className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--secondary)] text-[var(--secondary-foreground)]">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <StatusBadge value={card.severity} />
          <PriorityBadge priority={card.priority} />
        </div>
      </div>
      <div className="mt-5">
        <div className="text-sm font-medium text-[var(--muted-foreground)]">{card.title}</div>
        <div className="mt-2 text-3xl font-semibold">{card.value}</div>
        <p className="mt-2 min-h-12 text-sm leading-6 text-[var(--muted-foreground)]">
          {card.detail}
        </p>
      </div>
      <Button className="mt-5 w-full" variant="secondary" asChild>
        <Link href={card.href}>
          Open surface
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </article>
  );
}

function PriorityBadge({ priority }: { priority: IntelligenceCardModel["priority"] }) {
  const variant = priority === "urgent" ? "destructive" : priority === "monitor" ? "secondary" : "default";

  return <Badge variant={variant}>{priority.replace(/^\w/, (letter) => letter.toUpperCase())}</Badge>;
}
