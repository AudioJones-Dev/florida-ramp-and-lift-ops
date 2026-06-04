import { DashboardCard } from "@/components/dashboard-card";
import { mockDashboardMetrics } from "@/lib/mock-data";
import { CircleDollarSign, ClipboardList, MessageSquareWarning, ShieldAlert } from "lucide-react";

export default function ExecutivePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Executive View</h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Michael Keegan reviews approvals, escalations, invoice release readiness, and operating risk.
        </p>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard icon={CircleDollarSign} label="Invoice review" value={4} detail="Final release remains human-approved" />
        <DashboardCard icon={ClipboardList} label="Ready jobs" value={mockDashboardMetrics.jobsReadyForInvoiceReview} detail="Awaiting invoice readiness review" />
        <DashboardCard icon={MessageSquareWarning} label="Follow-ups" value={mockDashboardMetrics.leadsRequiringFollowUp} detail="Missed or unanswered communications" />
        <DashboardCard icon={ShieldAlert} label="Risk exceptions" value={mockDashboardMetrics.safetyExceptions} detail="Safety or compliance review needed" />
      </section>
    </div>
  );
}
