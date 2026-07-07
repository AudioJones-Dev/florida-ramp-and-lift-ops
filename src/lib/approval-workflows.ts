import { mockApprovals } from "@/lib/mock-data";
import type { Approval, ApprovalStatus } from "@/types/core";

export type ApprovalWorkflowKind =
  | "Invoice approval"
  | "Documentation approval"
  | "Payout approval"
  | "Job completion approval";

export type ApprovalDecision = "approved" | "rejected" | "held";

export type ApprovalWorkflowItem = Approval & {
  workflowKind: ApprovalWorkflowKind;
  detailHref: string;
  sourceHref: string;
  currentStatus: ApprovalStatus;
};

const sourceHrefByObject: Record<string, string> = {
  Invoice: "/invoices",
  DocumentationArtifact: "/documentation",
  ContractorPayout: "/approvals",
  Job: "/jobs"
};

export const approvalWorkflowItems: ApprovalWorkflowItem[] = mockApprovals.map((approval) => ({
  ...approval,
  workflowKind: approval.approvalCategory as ApprovalWorkflowKind,
  detailHref: `/approvals/${approval.id}`,
  sourceHref: `${sourceHrefByObject[approval.relatedObjectType] ?? "/approvals"}/${approval.relatedObjectId}`,
  currentStatus: approval.status
}));

export const approvalWorkflowKinds: ApprovalWorkflowKind[] = [
  "Invoice approval",
  "Documentation approval",
  "Payout approval",
  "Job completion approval"
];

export function getApprovalWorkflowCounts(items = approvalWorkflowItems) {
  return approvalWorkflowKinds.map((kind) => ({
    kind,
    count: items.filter((item) => item.workflowKind === kind).length,
    open: items.filter(
      (item) => item.workflowKind === kind && ["requested", "held"].includes(item.currentStatus)
    ).length
  }));
}
