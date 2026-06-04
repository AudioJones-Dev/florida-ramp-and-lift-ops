import type {
  Alert,
  Approval,
  Communication,
  Contractor,
  Customer,
  DocumentationArtifact,
  Invoice,
  Job
} from "@/types/core";

export const mockDashboardMetrics = {
  openJobs: 18,
  jobsScheduledToday: 5,
  jobsCompletedThisWeek: 9,
  outstandingInvoices: 7,
  revenueThisWeek: 28450,
  contractorPayoutsPending: 6,
  missedCommunications: 4,
  leadsRequiringFollowUp: 3,
  jobsMissingDocumentation: 5,
  jobsReadyForInvoiceReview: 4,
  safetyExceptions: 2
};

export const mockQueues = [
  {
    title: "Approval queue",
    items: [
      { id: "apq-1", title: "Invoice release approval", detail: "Michael Keegan final approval required" },
      { id: "apq-2", title: "Documentation exception", detail: "Ramp install photos need review" }
    ]
  },
  {
    title: "Alert center",
    items: [
      { id: "alt-1", title: "Lead follow-up overdue", detail: "Missed call has no logged response" },
      { id: "alt-2", title: "PPE status exception", detail: "Contractor compliance status requires review" }
    ]
  },
  {
    title: "Invoice readiness",
    items: [
      { id: "inv-1", title: "Job FLR-1042", detail: "Completion notes received, photo set incomplete" },
      { id: "inv-2", title: "Job FLR-1048", detail: "Ready for human invoice review" }
    ]
  }
];

export const mockCustomers: Customer[] = [
  {
    id: "customer_001",
    customerId: "customer_001",
    customerType: "residential",
    displayName: "M. Reynolds",
    status: "active",
    primaryContactName: "M. Reynolds",
    primaryContactPhone: "(555) 013-0101",
    primaryContactEmail: "mock.customer@example.com",
    source: "Manual intake",
    notes: "Ramp install customer. HubSpot sync intentionally excluded."
  },
  {
    id: "customer_002",
    customerId: "customer_002",
    customerType: "commercial",
    displayName: "WilScot account",
    status: "active",
    primaryContactName: "Commercial coordinator",
    primaryContactPhone: "(555) 013-0102",
    primaryContactEmail: "mock.commercial@example.com",
    source: "Manual commercial account",
    notes: "Commercial account placeholder for WillScot-style work."
  },
  {
    id: "customer_003",
    customerId: "customer_003",
    customerType: "residential",
    displayName: "S. Patel",
    status: "prospect",
    primaryContactName: "S. Patel",
    primaryContactPhone: "(555) 013-0103",
    primaryContactEmail: "mock.intake@example.com",
    source: "Website/manual lead",
    notes: "Needs estimate callback."
  }
];

export const mockJobs: Job[] = [
  {
    id: "job_001",
    jobId: "job_001",
    jobNumber: "FLR-1042",
    customerId: "customer_001",
    customerName: "M. Reynolds",
    jobType: "Ramp install",
    status: "documentation_review",
    siteAddress: "Residential site, Tampa area",
    scheduledFor: "Today",
    assignedTo: "Lead Installer A",
    documentationStatus: "needs_review",
    invoiceReadiness: "Blocked by missing install photos",
    notes: "Completion notes received. Photos need human review."
  },
  {
    id: "job_002",
    jobId: "job_002",
    jobNumber: "FLR-1048",
    customerId: "customer_002",
    customerName: "WilScot account",
    jobType: "Ramp takedown",
    status: "invoice_review",
    siteAddress: "Commercial site, Orlando area",
    scheduledFor: "This week",
    assignedTo: "Senior Lead B",
    documentationStatus: "approved",
    invoiceReadiness: "Ready for human invoice review",
    notes: "Do not release client-facing invoice without Michael approval."
  },
  {
    id: "job_003",
    jobId: "job_003",
    jobNumber: "FLR-1051",
    customerId: "customer_003",
    customerName: "S. Patel",
    jobType: "Ramp estimate",
    status: "scheduled",
    siteAddress: "Residential site, Sarasota area",
    scheduledFor: "Tomorrow",
    assignedTo: "Unassigned",
    documentationStatus: "required",
    invoiceReadiness: "Not ready",
    notes: "Dispatch assignment still pending."
  }
];

export const mockContractors: Contractor[] = [
  {
    id: "contractor_001",
    contractorId: "contractor_001",
    fullName: "Lead Installer A",
    phone: "(555) 013-0201",
    email: "lead.installer@example.com",
    role: "Lead Installer",
    status: "lead_installer",
    payType: "split",
    defaultRateOrSplit: "Standard lead split",
    serviceAreas: ["Tampa", "St. Petersburg"],
    skills: ["Ramp install", "Service / repair"],
    vehicleAccess: "Yes",
    toolAccess: "Yes",
    ppeComplianceStatus: "Compliant",
    safetyTrainingStatus: "Current",
    notes: "Eligible for assigned ramp install work."
  },
  {
    id: "contractor_002",
    contractorId: "contractor_002",
    fullName: "Senior Lead B",
    phone: "(555) 013-0202",
    email: "senior.lead@example.com",
    role: "Senior Lead",
    status: "senior_lead",
    payType: "rate",
    defaultRateOrSplit: "Senior lead rate",
    serviceAreas: ["Orlando", "Central Florida"],
    skills: ["Ramp takedown", "WilScot work"],
    vehicleAccess: "Yes",
    toolAccess: "Yes",
    ppeComplianceStatus: "Review needed",
    safetyTrainingStatus: "Current",
    notes: "PPE review should stay visible in alert center."
  },
  {
    id: "contractor_003",
    contractorId: "contractor_003",
    fullName: "Helper C",
    phone: "(555) 013-0203",
    email: "helper@example.com",
    role: "Helper",
    status: "helper",
    payType: "hourly",
    defaultRateOrSplit: "Helper hourly",
    serviceAreas: ["Tampa"],
    skills: ["Ramp install support"],
    vehicleAccess: "No",
    toolAccess: "Shared",
    ppeComplianceStatus: "Compliant",
    safetyTrainingStatus: "Current",
    notes: "Assigned only with lead installer."
  }
];

export const mockCommunications: Communication[] = [
  {
    id: "communication_001",
    communicationId: "communication_001",
    communicationType: "call",
    direction: "inbound",
    status: "unanswered",
    sourceChannel: "Phone",
    contactName: "M. Reynolds",
    relatedObjectType: "Job",
    relatedObjectId: "job_001",
    summary: "Customer requested ETA confirmation.",
    followUpOwner: "Office Admin"
  },
  {
    id: "communication_002",
    communicationId: "communication_002",
    communicationType: "email",
    direction: "outbound",
    status: "needs_review",
    sourceChannel: "Email",
    contactName: "WilScot account",
    relatedObjectType: "Job",
    relatedObjectId: "job_002",
    summary: "Completion packet question needs human review before send.",
    followUpOwner: "Office Admin"
  },
  {
    id: "communication_003",
    communicationId: "communication_003",
    communicationType: "manual_note",
    direction: "internal",
    status: "new",
    sourceChannel: "Manual note",
    contactName: "S. Patel",
    relatedObjectType: "Customer",
    relatedObjectId: "customer_003",
    summary: "Needs estimate callback.",
    followUpOwner: "Office Admin"
  }
];

export const mockDocumentation: DocumentationArtifact[] = [
  {
    id: "documentation_001",
    documentationArtifactId: "documentation_001",
    artifactType: "Install photos",
    relatedObjectType: "Job",
    relatedObjectId: "job_001",
    jobNumber: "FLR-1042",
    submittedBy: "Lead Installer A",
    status: "submitted",
    source: "Contractor portal mock",
    reviewGate: "Needs review",
    notes: "Photo set incomplete."
  },
  {
    id: "documentation_002",
    documentationArtifactId: "documentation_002",
    artifactType: "Completion notes",
    relatedObjectType: "Job",
    relatedObjectId: "job_002",
    jobNumber: "FLR-1048",
    submittedBy: "Senior Lead B",
    status: "approved",
    source: "Manual admin review",
    reviewGate: "Ready for invoice",
    notes: "Approved for billing evidence."
  },
  {
    id: "documentation_003",
    documentationArtifactId: "documentation_003",
    artifactType: "Safety checklist",
    relatedObjectType: "Job",
    relatedObjectId: "job_003",
    jobNumber: "FLR-1051",
    submittedBy: "Dispatcher",
    status: "missing",
    source: "Manual requirement",
    reviewGate: "Blocked",
    notes: "Must be present before dispatch-ready state."
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: "invoice_001",
    invoiceId: "invoice_001",
    invoiceNumber: "Draft-1042",
    invoiceClass: "client",
    customerName: "M. Reynolds",
    status: "needs_review",
    amount: "$2,450",
    approvalOwner: "Office Admin",
    quickBooksReference: "Not synced",
    readinessSummary: "Missing documentation blocks invoice readiness."
  },
  {
    id: "invoice_002",
    invoiceId: "invoice_002",
    invoiceNumber: "Draft-1048",
    invoiceClass: "client",
    customerName: "WilScot account",
    status: "approved",
    amount: "$8,900",
    approvalOwner: "Michael Keegan",
    quickBooksReference: "Manual reference pending",
    readinessSummary: "Ready for final human release approval."
  },
  {
    id: "invoice_003",
    invoiceId: "invoice_003",
    invoiceNumber: "QB reference pending",
    invoiceClass: "client",
    customerName: "S. Patel",
    status: "draft",
    amount: "$0",
    approvalOwner: "Finance",
    quickBooksReference: "Not synced",
    readinessSummary: "Not ready. Estimate/job lifecycle incomplete."
  }
];

export const mockAlerts: Alert[] = [
  {
    id: "alert_001",
    alertId: "alert_001",
    sourceObjectType: "Communication",
    sourceObjectId: "communication_001",
    severity: "high",
    status: "open",
    owner: "Office Admin",
    summary: "Missed call requires follow-up.",
    thresholdRule: "Communication unanswered after follow-up threshold"
  },
  {
    id: "alert_002",
    alertId: "alert_002",
    sourceObjectType: "Contractor",
    sourceObjectId: "contractor_002",
    severity: "medium",
    status: "acknowledged",
    owner: "Dispatcher",
    summary: "PPE compliance needs review.",
    thresholdRule: "Contractor PPE not compliant or pending review"
  },
  {
    id: "alert_003",
    alertId: "alert_003",
    sourceObjectType: "Job",
    sourceObjectId: "job_002",
    severity: "medium",
    status: "assigned",
    owner: "Finance",
    summary: "Job ready for invoice review.",
    thresholdRule: "Job entered invoice_review"
  }
];

export const mockApprovals: Approval[] = [
  {
    id: "approval_001",
    approvalId: "approval_001",
    approvalType: "client_invoice_release",
    relatedObjectType: "Invoice",
    relatedObjectId: "invoice_002",
    status: "requested",
    requestedBy: "Finance",
    approver: "Michael Keegan",
    risk: "Client-facing financial action",
    decisionNotes: "Final release requires explicit human approval."
  },
  {
    id: "approval_002",
    approvalId: "approval_002",
    approvalType: "documentation_exception",
    relatedObjectType: "DocumentationArtifact",
    relatedObjectId: "documentation_001",
    status: "held",
    requestedBy: "Office Admin",
    approver: "Office Admin",
    risk: "Missing photo evidence",
    decisionNotes: "Hold until required photo set is complete."
  },
  {
    id: "approval_003",
    approvalId: "approval_003",
    approvalType: "contractor_payout_review",
    relatedObjectType: "ContractorPayout",
    relatedObjectId: "mock_payout_batch_001",
    status: "requested",
    requestedBy: "Finance",
    approver: "Finance",
    risk: "Payment-adjacent review",
    decisionNotes: "Payout review only. No payment processing in MVP scaffold."
  }
];

export const mockContractorAssignments = [
  {
    id: "assignment-1",
    job: "FLR-1042 - Ramp install",
    location: "Residential site, Tampa area",
    status: "Assigned",
    scope: "Install modular ramp and submit completion photos",
    documentationStatus: "Photos pending",
    ppe: "Compliant",
    payout: "Pending review"
  },
  {
    id: "assignment-2",
    job: "FLR-1048 - WilScot takedown",
    location: "Commercial site, Orlando area",
    status: "Accepted",
    scope: "Ramp takedown and closeout notes",
    documentationStatus: "Submitted",
    ppe: "Review needed",
    payout: "Calculated mock"
  }
];

export const coreRecordLookups = {
  customers: (id: string) => mockCustomers.find((record) => record.id === id),
  jobs: (id: string) => mockJobs.find((record) => record.id === id),
  contractors: (id: string) => mockContractors.find((record) => record.id === id),
  communications: (id: string) => mockCommunications.find((record) => record.id === id),
  documentation: (id: string) => mockDocumentation.find((record) => record.id === id),
  invoices: (id: string) => mockInvoices.find((record) => record.id === id),
  alerts: (id: string) => mockAlerts.find((record) => record.id === id),
  approvals: (id: string) => mockApprovals.find((record) => record.id === id)
};
