import { demoScenarios, mockApprovals, mockDocumentation, mockInvoices, mockJobs } from "@/lib/mock-data";

export type MockTimelineEvent = {
  id: string;
  label: string;
  detail: string;
  actor: string;
  timestamp: string;
  status: string;
};

export function getMockTimelineForRecord(recordId: string): MockTimelineEvent[] {
  const scenario = demoScenarios.find(
    (item) =>
      item.id === recordId ||
      item.leadId === recordId ||
      item.customerId === recordId ||
      item.jobId === recordId ||
      item.documentationId === recordId ||
      item.invoiceId === recordId ||
      item.approvalId === recordId ||
      item.communicationId === recordId ||
      item.alertId === recordId
  );
  const job = mockJobs.find((item) => item.id === recordId || item.jobId === recordId);
  const documentation = mockDocumentation.find(
    (item) => item.id === recordId || item.documentationArtifactId === recordId
  );
  const invoice = mockInvoices.find((item) => item.id === recordId || item.invoiceId === recordId);
  const approval = mockApprovals.find((item) => item.id === recordId || item.approvalId === recordId);

  if (scenario) {
    return [
      {
        id: `${recordId}-lead`,
        label: "Lead captured",
        detail: scenario.validation.lead,
        actor: "Office/Admin",
        timestamp: "Mock T-5",
        status: "captured"
      },
      {
        id: `${recordId}-job`,
        label: "Job state reached",
        detail: scenario.validation.job,
        actor: "Dispatcher",
        timestamp: "Mock T-4",
        status: "state_transition"
      },
      {
        id: `${recordId}-assignment`,
        label: "Contractor assignment updated",
        detail: scenario.validation.assignment,
        actor: "Dispatcher / Contractor",
        timestamp: "Mock T-3",
        status: "assignment"
      },
      {
        id: `${recordId}-documentation`,
        label: "Documentation checkpoint",
        detail: scenario.validation.documentation,
        actor: "Contractor / Office Admin",
        timestamp: "Mock T-2",
        status: "documentation"
      },
      {
        id: `${recordId}-approval`,
        label: "Approval checkpoint",
        detail: scenario.validation.approval,
        actor: "Human approver",
        timestamp: "Mock T-1",
        status: "approval"
      },
      {
        id: `${recordId}-invoice`,
        label: "Invoice readiness",
        detail: scenario.validation.invoiceReadiness,
        actor: "Finance",
        timestamp: "Mock now",
        status: "readiness"
      }
    ];
  }

  if (job) {
    return [
      {
        id: `${recordId}-job-created`,
        label: "JobCreated",
        detail: `${job.jobNumber} was created from manual/mock intake.`,
        actor: "Office/Admin",
        timestamp: "Mock T-3",
        status: "created"
      },
      {
        id: `${recordId}-job-state`,
        label: "Job state",
        detail: `Current state is ${job.status}.`,
        actor: job.assignedTo === "Unassigned" ? "Dispatcher" : job.assignedTo,
        timestamp: "Mock T-2",
        status: job.status
      },
      {
        id: `${recordId}-invoice-readiness`,
        label: "Invoice readiness evaluated",
        detail: job.invoiceReadiness,
        actor: "Finance",
        timestamp: "Mock now",
        status: job.invoiceReadinessStatus
      }
    ];
  }

  if (documentation) {
    return [
      {
        id: `${recordId}-doc-created`,
        label: "DocumentationRequired",
        detail: `${documentation.artifactType} required for ${documentation.jobNumber}.`,
        actor: "System rule / Office Admin",
        timestamp: "Mock T-2",
        status: "required"
      },
      {
        id: `${recordId}-doc-status`,
        label: "Documentation status",
        detail: documentation.notes,
        actor: documentation.submittedBy,
        timestamp: "Mock now",
        status: documentation.status
      }
    ];
  }

  if (invoice) {
    return [
      {
        id: `${recordId}-invoice-draft`,
        label: "InvoiceDraftCreated",
        detail: `${invoice.invoiceNumber} exists as a mock draft/readiness record.`,
        actor: "Finance",
        timestamp: "Mock T-2",
        status: "draft"
      },
      {
        id: `${recordId}-invoice-review`,
        label: "Invoice review state",
        detail: invoice.readinessSummary,
        actor: invoice.approvalOwner,
        timestamp: "Mock now",
        status: invoice.status
      }
    ];
  }

  if (approval) {
    return [
      {
        id: `${recordId}-approval-requested`,
        label: "ApprovalRequested",
        detail: approval.evidenceSummary,
        actor: approval.requestedBy,
        timestamp: "Mock T-1",
        status: "requested"
      },
      {
        id: `${recordId}-approval-boundary`,
        label: "Human approval boundary",
        detail: approval.blockingRule,
        actor: approval.approver,
        timestamp: "Mock now",
        status: approval.status
      }
    ];
  }

  return [
    {
      id: `${recordId}-audit-placeholder`,
      label: "Audit placeholder",
      detail: "This record has no specialized mock event trail yet. Future persistence should store audit events explicitly.",
      actor: "Mock system",
      timestamp: "Mock now",
      status: "mock_only"
    }
  ];
}
