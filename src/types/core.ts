export type CoreObjectKind =
  | "Lead"
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

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "estimate_needed"
  | "estimate_sent"
  | "approved"
  | "converted"
  | "lost";

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

export type InvoiceReadinessStatus = "not_ready" | "blocked" | "needs_review" | "ready_for_review";

export type RecordValue = string | number | boolean | string[];

export type ManualRecord = {
  id: string;
  [key: string]: RecordValue;
};

export type Lead = ManualRecord & {
  leadId: string;
  customerId: string;
  contactName: string;
  leadType: string;
  status: LeadStatus;
  source: string;
  owner: string;
  nextStep: string;
  relatedCommunicationId: string;
  notes: string;
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
  invoiceReadinessStatus: InvoiceReadinessStatus;
  invoiceReadyForReview: boolean;
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

export type DemoScenario = {
  id: string;
  title: string;
  summary: string;
  stage: string;
  leadId: string;
  customerId: string;
  jobId: string;
  contractorId: string;
  communicationId: string;
  documentationId: string;
  invoiceId: string;
  alertId: string;
  approvalId: string;
  assignmentId: string;
  validation: {
    lead: string;
    job: string;
    assignment: string;
    documentation: string;
    approval: string;
    invoiceReadiness: string;
  };
};

export type BillingClientType =
  | "WilScot"
  | "Residential Customer"
  | "Commercial Customer"
  | "VA"
  | "Harmar"
  | "Bruno"
  | "Other";

export type BillingJobType =
  | "Ramp Install"
  | "Ramp Recovery"
  | "VPL Install"
  | "Stair Lift Install"
  | "Vehicle Lift Install"
  | "Service Call"
  | "Repair"
  | "Evaluation";

export type CompletionStatus = "Complete" | "Incomplete" | "Pending" | "Return Visit Required";
export type BillingZone = "Zone 1" | "Zone 2" | "Zone 3" | "Zone 4";
export type RampConfiguration = "straight" | "switchback";
export type PaySplitPreset = "60/40" | "50/50" | "70/30" | "100/0" | "custom";
export type AssignmentRole = "lead" | "assistant" | "additional";
export type FinancialTrackStatus =
  | "draft"
  | "needs_review"
  | "approved"
  | "rejected"
  | "invoiced"
  | "paid";

export type ReviewFlagSeverity = "info" | "warning" | "blocker";

export type ReviewFlag = {
  id: string;
  label: string;
  reason: string;
  severity: ReviewFlagSeverity;
};

export type ContractorDirectoryRecord = {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  activeStatus: "active" | "inactive";
  defaultRole: AssignmentRole;
  hubspotContactId?: string;
  paymentProfileStatus?: "complete" | "missing" | "needs_review";
};

export type JobAssignment = {
  id: string;
  jobId: string;
  contractorId: string;
  role: AssignmentRole;
  splitPercentage: number;
  payoutAmount: number;
  participationConfirmed: boolean;
  photoRequired: boolean;
  notes: string;
};

export type PaySplitRule = {
  id: string;
  preset: PaySplitPreset;
  label: string;
  leadPercentage: number;
  assistantPercentage: number;
  requiresAdminReview: boolean;
};

export type PaySplitOverride = {
  jobId: string;
  changedBy: string;
  oldSplit: string;
  newSplit: string;
  reason: string;
  timestamp: string;
};

export type RampJobDetails = {
  configuration: RampConfiguration;
  rampLength: number;
  riseHeight: number;
  zone: BillingZone;
  stepAttachmentQuantity: number;
  standaloneStepQuantity: number;
  additionalPlatformQuantity: number;
  additionalRampQuantity: number;
  canopyQuantity: number;
  crossBracesQuantity: number;
  oshaStepQuantity: number;
  oshaCanopyQuantity: number;
  skirtingLinearFeet: number;
  hardiPanelLinearFeet: number;
};

export type LiftJobDetails = {
  manufacturer: "Harmar" | "Bruno" | "Savaria" | "Other";
  modelNumber: string;
  serialNumber: string;
  partNumber: string;
  equipmentType: string;
  vplHeight?: "4-6" | "8" | "10" | "12" | "14";
  equipmentPlatePhotoSelected: boolean;
};

export type SecondTripReason =
  | "Missing Materials"
  | "Customer Not Available"
  | "Site Not Ready"
  | "Client Requested Return"
  | "Weather Delay"
  | "Manufacturer Issue"
  | "Permit/Site Access Issue"
  | "Installer Error"
  | "Other";

export type SecondTripDetails = {
  required: boolean;
  reason?: SecondTripReason;
  adminApproved: boolean;
};

export type PhotoChecklistItem = {
  id: string;
  label: string;
  required: boolean;
  uploadedByRole: AssignmentRole;
  selected: boolean;
};

export type ContractorWorkOrder = {
  id: string;
  workOrderNumber: string;
  customerName: string;
  address: string;
  client: BillingClientType;
  jobType: BillingJobType;
  assignedInstallerIds: string[];
  status: "assigned" | "in_progress" | "submitted" | "needs_correction";
  knownZone?: BillingZone;
  knownJobDate?: string;
};

export type BillingJobSubmission = {
  id: string;
  workOrderId?: string;
  workOrderNumber: string;
  jobDate: string;
  client: BillingClientType;
  jobType: BillingJobType;
  customerName: string;
  installAddress: string;
  leadInstallerId: string;
  assistantInstallerId?: string;
  additionalInstallerIds: string[];
  paySplitPreset: PaySplitPreset;
  customLeadPercentage?: number;
  customAssistantPercentage?: number;
  completionStatus: CompletionStatus;
  notes: string;
  rampDetails?: RampJobDetails;
  liftDetails?: LiftJobDetails;
  secondTrip: SecondTripDetails;
  photos: PhotoChecklistItem[];
  adminOverrideReason?: string;
  addedWork: boolean;
};

export type JobBatch = {
  id: string;
  batchDate: string;
  leadInstallerId: string;
  assistantInstallerId?: string;
  routeZone?: BillingZone;
  routeNotes: string;
  jobs: BillingJobSubmission[];
};

export type BillingLineItem = {
  id: string;
  itemCode: string;
  description: string;
  quantity: number;
  unitRate: number;
  total: number;
  category: "base" | "add_on" | "zone" | "second_trip" | "lift";
};

export type ContractorPayableDraft = {
  id: string;
  jobId: string;
  status: FinancialTrackStatus;
  lineItems: BillingLineItem[];
  subtotal: number;
  zoneCharge: number;
  secondTripCharge: number;
  addOnsSubtotal: number;
  totalContractorPayable: number;
  assignments: JobAssignment[];
  reviewFlags: ReviewFlag[];
};

export type ClientReceivableDraft = {
  id: string;
  jobId: string;
  status: FinancialTrackStatus;
  client: BillingClientType;
  workOrderNumber: string;
  customerName: string;
  placeholderAmount: number;
  reviewStatus: "client_rate_sheet_required" | "ready_for_admin_pricing";
  reviewFlags: ReviewFlag[];
};

export type BillingJobCalculation = {
  job: BillingJobSubmission;
  contractorPayable: ContractorPayableDraft;
  clientReceivable: ClientReceivableDraft;
};

export type ContractorWeeklyInvoiceLine = {
  workOrderNumber: string;
  jobDate: string;
  role: AssignmentRole;
  totalJobPayout: number;
  splitPercentage: number;
  contractorPayoutAmount: number;
};

export type ContractorWeeklyInvoice = {
  contractorId: string;
  contractorName: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  payDate: string;
  lines: ContractorWeeklyInvoiceLine[];
  totalWeeklyPayout: number;
  status: FinancialTrackStatus;
};
