import { Badge } from "@/components/ui/badge";
import type { AlertSeverity } from "@/types/core";

const urgentStatuses = new Set([
  "critical",
  "high",
  "missing",
  "needs_review",
  "unanswered",
  "on_hold",
  "held",
  "rejected",
  "incomplete",
  "transfer_requested",
  "transfer_review",
  "return_needed",
  "cancelled",
  "voided",
  "escalated"
]);

const readyStatuses = new Set([
  "active",
  "scheduled",
  "assigned",
  "dispatch_ready",
  "approved",
  "paid",
  "closed",
  "resolved",
  "acknowledged",
  "submitted",
  "partial_complete",
  "transfer_approved",
  "transferred",
  "lead_installer",
  "senior_lead"
]);

export function StatusBadge({ value }: { value: string | AlertSeverity }) {
  const normalized = value.toLowerCase();
  const variant = urgentStatuses.has(normalized)
    ? "destructive"
    : readyStatuses.has(normalized)
      ? "secondary"
      : "default";

  return <Badge variant={variant}>{formatStatus(value)}</Badge>;
}

export function formatStatus(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
