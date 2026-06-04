import { AlertTriangle, CalendarDays, ClipboardCheck, DollarSign } from "lucide-react";
import { DashboardCard } from "@/components/dashboard-card";
import { mockDashboardMetrics, mockQueues } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Central Control Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Mock executive command center for cash, jobs, risk, and response speed.
        </p>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          icon={ClipboardCheck}
          label="Open jobs"
          value={mockDashboardMetrics.openJobs}
          detail={`${mockDashboardMetrics.jobsCompletedThisWeek} completed this week`}
        />
        <DashboardCard
          icon={CalendarDays}
          label="Scheduled today"
          value={mockDashboardMetrics.jobsScheduledToday}
          detail="Dispatch-ready work only"
        />
        <DashboardCard
          icon={DollarSign}
          label="Outstanding invoices"
          value={mockDashboardMetrics.outstandingInvoices}
          detail={`$${mockDashboardMetrics.revenueThisWeek.toLocaleString()} revenue this week`}
        />
        <DashboardCard
          icon={AlertTriangle}
          label="Safety exceptions"
          value={mockDashboardMetrics.safetyExceptions}
          detail="Requires human review"
        />
      </section>
      <section className="grid gap-4 lg:grid-cols-3">
        {mockQueues.map((queue) => (
          <div key={queue.title} className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">{queue.title}</h2>
              <span className="rounded-md bg-[var(--secondary)] px-2 py-1 text-xs font-medium text-[var(--secondary-foreground)]">
                {queue.items.length}
              </span>
            </div>
            <div className="space-y-3">
              {queue.items.map((item) => (
                <div key={item.id} className="rounded-md border bg-[var(--background)] p-3">
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
