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

export const mockCustomers = [
  { id: "cus-1", name: "M. Reynolds", type: "Residential", phone: "(555) 013-0101", email: "mock.customer@example.com", status: "Active" },
  { id: "cus-2", name: "WilScot account", type: "Commercial", phone: "(555) 013-0102", email: "mock.commercial@example.com", status: "Active" },
  { id: "cus-3", name: "S. Patel", type: "Residential", phone: "(555) 013-0103", email: "mock.intake@example.com", status: "Lead" }
];

export const mockJobs = [
  { id: "job-1", jobNumber: "FLR-1042", customer: "M. Reynolds", status: "Documentation Review", scheduledFor: "Today", assignedTo: "Lead Installer A" },
  { id: "job-2", jobNumber: "FLR-1048", customer: "WilScot account", status: "Invoice Review", scheduledFor: "This week", assignedTo: "Senior Lead B" },
  { id: "job-3", jobNumber: "FLR-1051", customer: "S. Patel", status: "Scheduled", scheduledFor: "Tomorrow", assignedTo: "Unassigned" }
];

export const mockContractors = [
  { id: "con-1", name: "Lead Installer A", role: "Lead Installer", status: "Lead Installer", skills: "Ramp install, service", ppeStatus: "Compliant" },
  { id: "con-2", name: "Senior Lead B", role: "Senior Lead", status: "Senior Lead", skills: "Ramp takedown, WilScot work", ppeStatus: "Review needed" },
  { id: "con-3", name: "Helper C", role: "Helper", status: "Helper", skills: "Ramp install support", ppeStatus: "Compliant" }
];

export const mockCommunications = [
  { id: "com-1", channel: "Phone", contact: "M. Reynolds", summary: "Requested ETA confirmation", status: "Requires follow-up", relatedObject: "Job FLR-1042" },
  { id: "com-2", channel: "Email", contact: "WilScot account", summary: "Sent completion packet question", status: "Open", relatedObject: "Job FLR-1048" },
  { id: "com-3", channel: "Manual note", contact: "S. Patel", summary: "Needs estimate callback", status: "New", relatedObject: "Lead" }
];

export const mockDocumentation = [
  { id: "doc-1", artifact: "Install photos", job: "FLR-1042", submittedBy: "Lead Installer A", status: "Submitted", reviewGate: "Needs review" },
  { id: "doc-2", artifact: "Completion notes", job: "FLR-1048", submittedBy: "Senior Lead B", status: "Approved", reviewGate: "Ready for invoice" },
  { id: "doc-3", artifact: "Safety checklist", job: "FLR-1051", submittedBy: "Dispatcher", status: "Missing", reviewGate: "Blocked" }
];

export const mockInvoices = [
  { id: "inv-1", invoiceNumber: "Draft-1042", customer: "M. Reynolds", status: "Needs documentation", amount: "$2,450", approvalOwner: "Office Admin" },
  { id: "inv-2", invoiceNumber: "Draft-1048", customer: "WilScot account", status: "Ready for Michael", amount: "$8,900", approvalOwner: "Michael Keegan" },
  { id: "inv-3", invoiceNumber: "QB reference pending", customer: "S. Patel", status: "Not ready", amount: "$0", approvalOwner: "Finance" }
];

export const mockAlerts = [
  { id: "alert-1", severity: "High", source: "Communication", status: "Open", owner: "Office Admin", summary: "Missed call requires follow-up" },
  { id: "alert-2", severity: "Medium", source: "Contractor", status: "Acknowledged", owner: "Dispatcher", summary: "PPE compliance needs review" },
  { id: "alert-3", severity: "Medium", source: "Job", status: "Open", owner: "Finance", summary: "Job ready for invoice review" }
];

export const mockApprovals = [
  { id: "approval-1", request: "Client invoice release", source: "Draft-1048", status: "Requested", approver: "Michael Keegan", risk: "Client-facing financial action" },
  { id: "approval-2", request: "Documentation exception", source: "FLR-1042", status: "Pending", approver: "Office Admin", risk: "Missing photo evidence" },
  { id: "approval-3", request: "Contractor payout review", source: "Payout batch mock", status: "Draft", approver: "Finance", risk: "Payment-adjacent review" }
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
