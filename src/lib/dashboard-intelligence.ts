import {
  AlertTriangle,
  BellRing,
  CheckSquare,
  ClipboardCheck,
  FileCheck2,
  FileText,
  HardHat,
  MessageSquareWarning,
  ShieldAlert,
  Timer
} from "lucide-react";
import { mockAlerts, mockApprovals, mockInvoices, mockJobs } from "@/lib/mock-data";
import { getQueueDefinition, queueDefinitions } from "@/lib/queues";

export type IntelligenceSeverity = "low" | "medium" | "high" | "critical";
export type IntelligencePriority = "monitor" | "normal" | "priority" | "urgent";

export type IntelligenceCard = {
  title: string;
  value: number | string;
  detail: string;
  severity: IntelligenceSeverity;
  priority: IntelligencePriority;
  href: string;
  icon: typeof ClipboardCheck;
};

const documentationQueue = getQueueDefinition("documentation");
const invoiceReviewQueue = getQueueDefinition("invoice-review");
const approvalsQueue = getQueueDefinition("approvals");
const alertsQueue = getQueueDefinition("alerts");
const contractorQueue = getQueueDefinition("contractor-assignments");
const followUpQueue = getQueueDefinition("follow-up");

const documentationBlockers = documentationQueue?.items.length ?? 0;
const invoiceReviewReady = invoiceReviewQueue?.items.length ?? 0;
const openApprovals = approvalsQueue?.items.length ?? 0;
const activeAlerts = alertsQueue?.items.length ?? 0;
const contractorAssignmentIssues =
  contractorQueue?.items.filter((item) =>
    ["assigned", "rejected", "held"].includes(item.status)
  ).length ?? 0;
const followUpsRequired = followUpQueue?.items.length ?? 0;

export const dashboardKpis = [
  {
    label: "Jobs requiring attention",
    value: mockJobs.filter((job) =>
      ["documentation_review", "invoice_review", "on_hold", "incomplete", "transfer_review", "return_needed"].includes(
        job.status
      )
    ).length,
    detail: "Documentation, invoice, hold, return, or incomplete states",
    icon: ClipboardCheck
  },
  {
    label: "Open queues",
    value: queueDefinitions.filter((queue) => queue.items.length > 0).length,
    detail: "Queues with at least one matching record",
    icon: BellRing
  },
  {
    label: "High priority items",
    value: getHighPriorityCount(),
    detail: "High alerts, client invoice approvals, and blockers",
    icon: ShieldAlert
  },
  {
    label: "Invoice backlog",
    value: getInvoiceBacklogCount(),
    detail: "Draft, review, approved, or held invoices not sent/paid",
    icon: FileText
  }
];

export const dashboardIntelligenceCards: IntelligenceCard[] = [
  {
    title: "Jobs Requiring Attention",
    value: dashboardKpis[0].value,
    detail: "Jobs in review, hold, incomplete, or return-needed states.",
    severity: dashboardKpis[0].value > 0 ? "medium" : "low",
    priority: dashboardKpis[0].value > 0 ? "priority" : "monitor",
    href: "/jobs",
    icon: ClipboardCheck
  },
  {
    title: "Jobs Missing Documentation",
    value: documentationBlockers,
    detail: "Jobs with required, missing, submitted, held, rejected, or review-needed documentation.",
    severity: documentationBlockers > 0 ? "high" : "low",
    priority: documentationBlockers > 0 ? "urgent" : "monitor",
    href: "/queues/documentation",
    icon: FileCheck2
  },
  {
    title: "Jobs Ready For Invoice Review",
    value: invoiceReviewReady,
    detail: "Jobs with explicit invoice-ready flags. Finance reviews first; Michael approves client release.",
    severity: invoiceReviewReady > 0 ? "medium" : "low",
    priority: invoiceReviewReady > 0 ? "priority" : "monitor",
    href: "/queues/invoice-review",
    icon: FileText
  },
  {
    title: "Open Approvals",
    value: openApprovals,
    detail: "Approval records waiting for a human decision and decision note.",
    severity: openApprovals > 0 ? "high" : "low",
    priority: openApprovals > 0 ? "urgent" : "monitor",
    href: "/queues/approvals",
    icon: CheckSquare
  },
  {
    title: "Active Alerts",
    value: activeAlerts,
    detail: "Persisted alerts that are not resolved or dismissed.",
    severity: activeAlerts > 0 ? "high" : "low",
    priority: activeAlerts > 0 ? "urgent" : "monitor",
    href: "/queues/alerts",
    icon: AlertTriangle
  },
  {
    title: "Contractor Assignment Issues",
    value: contractorAssignmentIssues,
    detail: "Assignments needing dispatch review for acceptance, PPE, safety, or field documentation.",
    severity: contractorAssignmentIssues > 0 ? "medium" : "low",
    priority: contractorAssignmentIssues > 0 ? "priority" : "monitor",
    href: "/queues/contractor-assignments",
    icon: HardHat
  },
  {
    title: "Follow-Ups Required",
    value: followUpsRequired,
    detail: "Communications where an owner must respond or review before work stalls.",
    severity: followUpsRequired > 0 ? "high" : "low",
    priority: followUpsRequired > 0 ? "urgent" : "monitor",
    href: "/queues/follow-up",
    icon: MessageSquareWarning
  },
  {
    title: "Invoice Backlog",
    value: getInvoiceBacklogCount(),
    detail: "Invoices not yet sent, delivered, paid, rejected, or voided.",
    severity: getInvoiceBacklogCount() > 0 ? "medium" : "low",
    priority: getInvoiceBacklogCount() > 0 ? "priority" : "monitor",
    href: "/invoices",
    icon: FileText
  },
  {
    title: "High Priority Items",
    value: getHighPriorityCount(),
    detail: "High-risk alerts, client invoice approvals, blocked documentation, and unanswered follow-ups.",
    severity: getHighPriorityCount() > 0 ? "critical" : "low",
    priority: getHighPriorityCount() > 0 ? "urgent" : "monitor",
    href: "/queues",
    icon: ShieldAlert
  }
];

export const operationalHealth = [
  {
    label: "Documentation health",
    status: documentationBlockers > 0 ? "Needs attention" : "Clear",
    detail: `${documentationBlockers} documentation queue item(s)`
  },
  {
    label: "Approval health",
    status: openApprovals > 0 ? "Human review required" : "Clear",
    detail: `${openApprovals} open approval(s)`
  },
  {
    label: "Response health",
    status: followUpsRequired > 0 ? "Follow-up required" : "Clear",
    detail: `${followUpsRequired} communication follow-up(s)`
  },
  {
    label: "Contractor health",
    status: contractorAssignmentIssues > 0 ? "Dispatch review" : "Clear",
    detail: `${contractorAssignmentIssues} assignment issue(s)`
  }
];

export const revenueReadiness = [
  {
    label: "Invoice review ready",
    value: invoiceReviewReady,
    detail: "Jobs with explicit invoice readiness flags ready for finance packet review.",
    href: "/queues/invoice-review"
  },
  {
    label: "Invoice backlog",
    value: getInvoiceBacklogCount(),
    detail: "Invoices still requiring review, approval, or release.",
    href: "/invoices"
  },
  {
    label: "Client invoice approvals",
    value: mockApprovals.filter(
      (approval) =>
        approval.approvalType === "client_invoice_release" &&
        ["requested", "held"].includes(approval.status)
    ).length,
    detail: "Michael approval remains required before release.",
    href: "/queues/approvals"
  }
];

export const executiveSummary = {
  headline: getExecutiveSummaryHeadline(),
  attentionCount: dashboardIntelligenceCards.filter((card) => card.priority === "urgent").length,
  detail:
    "Deterministic summary derived from mock jobs, invoices, approvals, alerts, communications, and queue definitions."
};

export const michaelsNextActions = [
  {
    label: "Approve or hold client invoices",
    value: mockApprovals.filter(
      (approval) =>
        approval.approvalType === "client_invoice_release" &&
        ["requested", "held"].includes(approval.status)
    ).length,
    detail: "Michael reviews client-facing invoice release requests before anything is sent.",
    href: "/queues/approvals"
  },
  {
    label: "Clear invoice-ready jobs",
    value: invoiceReviewReady,
    detail: "Finance should prepare packets so Michael only reviews complete invoice candidates.",
    href: "/queues/invoice-review"
  },
  {
    label: "Resolve high-priority blockers",
    value: getHighPriorityCount(),
    detail: "High alerts, blocked documentation, and unanswered follow-ups should be assigned or escalated.",
    href: "/queues"
  }
];

function getInvoiceBacklogCount() {
  return mockInvoices.filter((invoice) =>
    ["draft", "needs_review", "approved", "edited", "held"].includes(invoice.status)
  ).length;
}

function getHighPriorityCount() {
  const highAlerts = mockAlerts.filter((alert) =>
    ["high", "critical"].includes(alert.severity)
  ).length;
  const clientInvoiceApprovals = mockApprovals.filter(
    (approval) =>
      approval.approvalType === "client_invoice_release" &&
      ["requested", "held"].includes(approval.status)
  ).length;
  const unansweredFollowUps = followUpQueue?.items.filter((item) => item.status === "unanswered").length ?? 0;

  return highAlerts + clientInvoiceApprovals + documentationBlockers + unansweredFollowUps;
}

function getExecutiveSummaryHeadline() {
  const urgentCount = getHighPriorityCount();

  if (urgentCount > 0) {
    return `${urgentCount} high-priority item(s) require review before operations are clear.`;
  }

  if (invoiceReviewReady > 0) {
    return `${invoiceReviewReady} job(s) are ready for invoice review.`;
  }

  return "No high-priority mock blockers are currently active.";
}

export const dashboardBusinessRules = [
  "Jobs in documentation_review, invoice_review, on_hold, incomplete, transfer_review, or return_needed count as requiring attention.",
  "Jobs with required, missing, submitted, needs_review, rejected, or held documentation count as documentation blockers.",
  "Jobs with invoiceReadyForReview true or invoiceReadinessStatus ready_for_review count as ready for invoice review.",
  "Approvals in requested or held states count as open approvals.",
  "Alerts not resolved or dismissed count as active alerts.",
  "Communications in new, unanswered, or needs_review states count as requiring follow-up.",
  "Invoices in draft, needs_review, approved, edited, or held states count as invoice backlog.",
  "High priority count combines high/critical alerts, client invoice approvals, documentation blockers, and unanswered follow-ups."
];

export const attentionTimerIcon = Timer;
