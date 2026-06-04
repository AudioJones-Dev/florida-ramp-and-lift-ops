import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardCard } from "@/components/dashboard-card";
import { IntelligenceCard } from "@/components/intelligence-card";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  dashboardBusinessRules,
  dashboardIntelligenceCards,
  dashboardKpis,
  executiveSummary,
  operationalHealth,
  revenueReadiness
} from "@/lib/dashboard-intelligence";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div>
            <h1 className="text-2xl font-semibold">Central Control Dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
              MVP intelligence layer derived from mock records and operational queues. No AI,
              database, or integrations are used.
            </p>
          </div>
          <Badge variant="secondary">Deterministic rules only</Badge>
        </div>
        <div className="mt-6 rounded-lg border bg-[var(--background)] p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="text-sm font-semibold">Executive Summary</div>
              <p className="mt-2 text-lg font-semibold leading-7">{executiveSummary.headline}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                {executiveSummary.detail}
              </p>
            </div>
            <div className="shrink-0 rounded-lg border bg-white p-4 text-center">
              <div className="text-3xl font-semibold">{executiveSummary.attentionCount}</div>
              <div className="mt-1 text-xs font-medium uppercase text-[var(--muted-foreground)]">
                urgent categories
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Dashboard KPI Section</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Counts are derived from mock object states, not saved analytics.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardKpis.map((kpi) => (
            <DashboardCard
              key={kpi.label}
              icon={kpi.icon}
              label={kpi.label}
              value={kpi.value}
              detail={kpi.detail}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-lg font-semibold">Operational Health Section</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Attention indicators for blockers, reviews, follow-ups, and assignment issues.
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link href="/queues">
              Open queue center
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {operationalHealth.map((item) => (
            <article key={item.label} className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{item.label}</h3>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">{item.detail}</p>
                </div>
                <StatusBadge value={item.status.toLowerCase().replace(/\s+/g, "_")} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Revenue Readiness Section</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Deterministic invoice and approval signals before any QuickBooks integration.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {revenueReadiness.map((item) => (
            <article key={item.label} className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="text-sm font-medium text-[var(--muted-foreground)]">
                {item.label}
              </div>
              <div className="mt-2 text-3xl font-semibold">{item.value}</div>
              <p className="mt-2 min-h-12 text-sm leading-6 text-[var(--muted-foreground)]">
                {item.detail}
              </p>
              <Button className="mt-5 w-full" variant="secondary" asChild>
                <Link href={item.href}>
                  Review
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Attention Intelligence</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Cards answer what needs attention, what is blocked, what can be invoiced, and what is at risk.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dashboardIntelligenceCards.map((card) => (
            <IntelligenceCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold">Derived Business Rules</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--muted-foreground)] lg:grid-cols-2">
          {dashboardBusinessRules.map((rule) => (
            <li key={rule} className="rounded-md border bg-[var(--background)] p-3">
              {rule}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
