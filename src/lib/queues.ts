import {
  AlertTriangle,
  CheckSquare,
  ClipboardList,
  FileCheck2,
  FileText,
  HardHat,
  MessageSquare
} from "lucide-react";
import {
  mockAlerts,
  mockApprovals,
  mockCommunications,
  mockContractorAssignments,
  mockJobs
} from "@/lib/mock-data";
import type { ManualRecord } from "@/types/core";

export type QueueKey =
  | "documentation"
  | "invoice-review"
  | "approvals"
  | "alerts"
  | "contractor-assignments"
  | "follow-up";

export type QueueItem = ManualRecord & {
  title: string;
  detail: string;
  owner: string;
  status: string;
  href: string;
};

export type QueueDefinition = {
  key: QueueKey;
  title: string;
  description: string;
  href: string;
  ownerLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  icon: typeof ClipboardList;
  items: QueueItem[];
};

const jobsNeedingDocumentation = mockJobs
  .filter((job) =>
    ["required", "missing", "submitted", "needs_review", "rejected", "held"].includes(
      job.documentationStatus
    )
  )
  .map((job) => ({
    id: `queue-doc-${job.id}`,
    title: `${job.jobNumber} - ${job.customerName}`,
    detail: `Action: collect or review proof-of-work for ${job.jobType}. ${job.invoiceReadiness}`,
    owner: job.assignedTo === "Unassigned" ? "Office Admin" : job.assignedTo,
    status: job.documentationStatus,
    href: `/jobs/${job.id}`,
    jobId: job.jobId
  }));

const jobsReadyForInvoiceReview = mockJobs
  .filter((job) => job.invoiceReadyForReview || job.invoiceReadinessStatus === "ready_for_review")
  .map((job) => ({
    id: `queue-invoice-${job.id}`,
    title: `${job.jobNumber} - ${job.customerName}`,
    detail: `Action: finance review packet, then route client-facing release to Michael. ${job.invoiceReadiness}`,
    owner: "Finance",
    status: job.status,
    href: `/jobs/${job.id}`,
    jobId: job.jobId
  }));

const openApprovals = mockApprovals
  .filter((approval) => ["requested", "held"].includes(approval.status))
  .map((approval) => ({
    id: `queue-approval-${approval.id}`,
    title: approval.approvalType,
    detail: `Action: ${approval.approver} must approve, hold, or reject with notes. ${approval.risk}`,
    owner: approval.approver,
    status: approval.status,
    href: `/approvals/${approval.id}`,
    approvalId: approval.approvalId
  }));

const activeAlerts = mockAlerts
  .filter((alert) => !["resolved", "dismissed"].includes(alert.status))
  .map((alert) => ({
    id: `queue-alert-${alert.id}`,
    title: alert.summary,
    detail: `Action: ${alert.owner} should acknowledge or resolve. ${alert.sourceObjectType}: ${alert.thresholdRule}`,
    owner: alert.owner,
    status: alert.status,
    href: `/alerts/${alert.id}`,
    severity: alert.severity
  }));

const contractorAssignments = mockContractorAssignments.map((assignment) => ({
  id: `queue-assignment-${assignment.id}`,
  title: `${assignment.jobNumber} - ${assignment.jobTitle}`,
  detail: `Action: verify acceptance, PPE, and required documentation. ${assignment.scope}. Documentation: ${assignment.documentationStatus}`,
  owner: "Dispatcher",
  status: assignment.status,
  href: "/contractor",
  assignmentId: assignment.id
}));

const communicationsRequiringFollowUp = mockCommunications
  .filter((communication) => ["unanswered", "needs_review", "new"].includes(communication.status))
  .map((communication) => ({
    id: `queue-followup-${communication.id}`,
    title: `${communication.contactName} - ${communication.sourceChannel}`,
    detail: `Action: ${communication.followUpOwner} should respond or review. ${communication.summary}`,
    owner: communication.followUpOwner,
    status: communication.status,
    href: `/communications/${communication.id}`,
    communicationId: communication.communicationId
  }));

export const queueDefinitions: QueueDefinition[] = [
  {
    key: "documentation",
    title: "Jobs Needing Documentation",
    description: "Action queue for collecting, reviewing, or rejecting proof-of-work before completion and billing.",
    href: "/queues/documentation",
    ownerLabel: "Responsible owner",
    emptyTitle: "No documentation blockers",
    emptyDescription: "No mock jobs currently require documentation attention.",
    icon: FileCheck2,
    items: jobsNeedingDocumentation
  },
  {
    key: "invoice-review",
    title: "Jobs Ready For Invoice Review",
    description: "Action queue for finance packet review before Michael approves any client-facing invoice release.",
    href: "/queues/invoice-review",
    ownerLabel: "Responsible owner",
    emptyTitle: "No jobs ready for invoice review",
    emptyDescription: "No mock jobs currently match invoice review criteria.",
    icon: FileText,
    items: jobsReadyForInvoiceReview
  },
  {
    key: "approvals",
    title: "Open Approvals",
    description: "Human approval records that require approve, hold, or reject decisions with notes.",
    href: "/queues/approvals",
    ownerLabel: "Approver",
    emptyTitle: "No open approvals",
    emptyDescription: "All mock approval records are resolved or inactive.",
    icon: CheckSquare,
    items: openApprovals
  },
  {
    key: "alerts",
    title: "Active Alerts",
    description: "Persisted alerts that need ownership, acknowledgement, escalation, or resolution.",
    href: "/queues/alerts",
    ownerLabel: "Owner",
    emptyTitle: "No active alerts",
    emptyDescription: "No persisted mock alerts require attention.",
    icon: AlertTriangle,
    items: activeAlerts
  },
  {
    key: "contractor-assignments",
    title: "Contractor Assignments",
    description: "Dispatch review queue for assignment acceptance, PPE requirements, and field documentation status.",
    href: "/queues/contractor-assignments",
    ownerLabel: "Responsible role",
    emptyTitle: "No contractor assignments",
    emptyDescription: "No mock contractor assignments are currently available.",
    icon: HardHat,
    items: contractorAssignments
  },
  {
    key: "follow-up",
    title: "Communications Requiring Follow-Up",
    description: "Follow-up queue for missed, new, or review-needed communications before leads and jobs stall.",
    href: "/queues/follow-up",
    ownerLabel: "Follow-up owner",
    emptyTitle: "No communications requiring follow-up",
    emptyDescription: "No mock communication records currently need follow-up.",
    icon: MessageSquare,
    items: communicationsRequiringFollowUp
  }
];

export function getQueueDefinition(key: QueueKey) {
  return queueDefinitions.find((queue) => queue.key === key);
}
