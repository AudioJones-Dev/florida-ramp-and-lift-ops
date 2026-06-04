export type CoreObjectKind =
  | "Customer"
  | "Job"
  | "Contractor"
  | "Communication"
  | "DocumentationArtifact"
  | "Invoice"
  | "Alert"
  | "Approval";

export type CustomerStatus = "prospect" | "active" | "on_hold" | "inactive" | "archived";
export type CustomerType = "residential" | "commercial";

export type JobStatus =
  | "pending"
  | "scheduled"
  | "assigned"
  | "dispatch_ready"
  | "in_progress"
  | "submitted"
  | "documentation_review"
  | "approved"
  | "invoice_review"
  | "invoiced"
  | "paid"
  | "closed"
  | "incomplete"
  | "return_needed"
  | "on_hold"
  | "cancelled";

export type ContractorStatus =
  | "candidate"
  | "trainee"
  | "helper"
  | "lead_installer"
  | "senior_lead"
  | "inactive";

export type CommunicationStatus =
  | "new"
  | "needs_review"
  | "draft"
  | "approved_to_send"
  | "sent"
  | "received"
  | "unanswered"
  | "resolved"
  | "held"
  | "cancelled";

export type DocumentationStatus =
  | "required"
  | "missing"
  | "submitted"
  | "needs_review"
  | "approved"
  | "rejected"
  | "held"
  | "archived";

export type InvoiceStatus =
  | "draft"
  | "needs_review"
  | "approved"
  | "edited"
  | "held"
  | "rejected"
  | "sent"
  | "delivered"
  | "paid"
  | "voided";

export type AlertStatus =
  | "runtime_only"
  | "open"
  | "acknowledged"
  | "assigned"
  | "escalated"
  | "resolved"
  | "dismissed"
  | "reopened";

export type AlertSeverity = "low" | "medium" | "high" | "critical";

export type ApprovalStatus =
  | "requested"
  | "approved"
  | "rejected"
  | "held"
  | "cancelled"
  | "expired"
  | "superseded";

export type RecordValue = string | number | string[];

export type ManualRecord = {
  id: string;
  [key: string]: RecordValue;
};

export type Customer = ManualRecord & {
  customerId: string;
  customerType: CustomerType;
  displayName: string;
  status: CustomerStatus;
  primaryContactName: string;
  primaryContactPhone: string;
  primaryContactEmail: string;
  source: string;
  notes: string;
};

export type Job = ManualRecord & {
  jobId: string;
  jobNumber: string;
  customerId: string;
  customerName: string;
  jobType: string;
  status: JobStatus;
  siteAddress: string;
  scheduledFor: string;
  assignedTo: string;
  documentationStatus: DocumentationStatus;
  invoiceReadiness: string;
  notes: string;
};

export type Contractor = ManualRecord & {
  contractorId: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
  status: ContractorStatus;
  payType: string;
  defaultRateOrSplit: string;
  serviceAreas: string[];
  skills: string[];
  vehicleAccess: string;
  toolAccess: string;
  ppeComplianceStatus: string;
  safetyTrainingStatus: string;
  notes: string;
};

export type Communication = ManualRecord & {
  communicationId: string;
  communicationType: string;
  direction: string;
  status: CommunicationStatus;
  sourceChannel: string;
  contactName: string;
  relatedObjectType: string;
  relatedObjectId: string;
  summary: string;
  followUpOwner: string;
};

export type DocumentationArtifact = ManualRecord & {
  documentationArtifactId: string;
  artifactType: string;
  relatedObjectType: string;
  relatedObjectId: string;
  jobNumber: string;
  submittedBy: string;
  status: DocumentationStatus;
  source: string;
  reviewGate: string;
  notes: string;
};

export type Invoice = ManualRecord & {
  invoiceId: string;
  invoiceNumber: string;
  invoiceClass: string;
  customerName: string;
  status: InvoiceStatus;
  amount: string;
  approvalOwner: string;
  quickBooksReference: string;
  readinessSummary: string;
};

export type Alert = ManualRecord & {
  alertId: string;
  sourceObjectType: string;
  sourceObjectId: string;
  severity: AlertSeverity;
  status: AlertStatus;
  owner: string;
  summary: string;
  thresholdRule: string;
};

export type Approval = ManualRecord & {
  approvalId: string;
  approvalCategory: string;
  approvalType: string;
  relatedObjectType: string;
  relatedObjectId: string;
  status: ApprovalStatus;
  requestedBy: string;
  approver: string;
  risk: string;
  targetTransition: string;
  evidenceSummary: string;
  blockingRule: string;
  decisionNotes: string;
};

export type ContractorAssignmentStatus =
  | "assigned"
  | "accepted"
  | "rejected"
  | "in_progress"
  | "submitted";

export type ContractorAssignment = {
  id: string;
  jobId: string;
  jobNumber: string;
  jobTitle: string;
  contractorName: string;
  location: string;
  siteContact: string;
  scheduledWindow: string;
  status: ContractorAssignmentStatus;
  scope: string;
  requiredEquipment: string[];
  requiredDocumentation: string[];
  documentationStatus: string;
  ppeRequirements: string[];
  safetyRequirements: string[];
  ppeStatus: string;
  payout: string;
  notes: string;
};
