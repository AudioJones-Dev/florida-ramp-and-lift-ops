import type {
  AssignmentRole,
  BillingJobCalculation,
  BillingJobSubmission,
  BillingJobType,
  BillingLineItem,
  BillingZone,
  ClientReceivableDraft,
  ContractorDirectoryRecord,
  ContractorPayableDraft,
  ContractorWeeklyInvoice,
  ContractorWorkOrder,
  JobAssignment,
  JobBatch,
  PaySplitPreset,
  PaySplitRule,
  ReviewFlag,
  SecondTripReason
} from "@/types/core";

export const contractorDirectory: ContractorDirectoryRecord[] = [
  {
    id: "contractor_david",
    name: "David Rivera",
    companyName: "Rivera Access Install",
    email: "david.rivera@example.com",
    phone: "(555) 013-2201",
    activeStatus: "active",
    defaultRole: "lead",
    hubspotContactId: "hs_mock_david",
    paymentProfileStatus: "complete"
  },
  {
    id: "contractor_maria",
    name: "Maria Chen",
    companyName: "Suncoast Mobility Crew",
    email: "maria.chen@example.com",
    phone: "(555) 013-2202",
    activeStatus: "active",
    defaultRole: "assistant",
    hubspotContactId: "hs_mock_maria",
    paymentProfileStatus: "complete"
  },
  {
    id: "contractor_jamal",
    name: "Jamal Brooks",
    companyName: "Brooks Lift Services",
    email: "jamal.brooks@example.com",
    phone: "(555) 013-2203",
    activeStatus: "active",
    defaultRole: "lead",
    paymentProfileStatus: "needs_review"
  },
  {
    id: "contractor_erin",
    name: "Erin Walker",
    companyName: "Walker Field Support",
    email: "erin.walker@example.com",
    phone: "(555) 013-2204",
    activeStatus: "active",
    defaultRole: "additional",
    paymentProfileStatus: "missing"
  }
];

export const paySplitRules: PaySplitRule[] = [
  {
    id: "split_60_40",
    preset: "60/40",
    label: "60 / 40 default",
    leadPercentage: 60,
    assistantPercentage: 40,
    requiresAdminReview: false
  },
  {
    id: "split_50_50",
    preset: "50/50",
    label: "50 / 50 equal crew",
    leadPercentage: 50,
    assistantPercentage: 50,
    requiresAdminReview: true
  },
  {
    id: "split_70_30",
    preset: "70/30",
    label: "70 / 30 lead-heavy",
    leadPercentage: 70,
    assistantPercentage: 30,
    requiresAdminReview: true
  },
  {
    id: "split_100_0",
    preset: "100/0",
    label: "100 / 0 lead only",
    leadPercentage: 100,
    assistantPercentage: 0,
    requiresAdminReview: true
  },
  {
    id: "split_custom",
    preset: "custom",
    label: "Custom split",
    leadPercentage: 60,
    assistantPercentage: 40,
    requiresAdminReview: true
  }
];

export const assignedWorkOrders: ContractorWorkOrder[] = [
  {
    id: "wo_wilscot_1048",
    workOrderNumber: "WS-1048",
    customerName: "WilScot Orlando Modular",
    address: "7420 Tradeport Dr, Orlando, FL 32827",
    client: "WilScot",
    jobType: "Ramp Recovery",
    assignedInstallerIds: ["contractor_david", "contractor_maria"],
    status: "assigned",
    knownZone: "Zone 2",
    knownJobDate: "2026-06-08"
  },
  {
    id: "wo_wilscot_1055",
    workOrderNumber: "WS-1055",
    customerName: "WilScot Lakeland Yard",
    address: "3120 Commerce Point Dr, Lakeland, FL 33801",
    client: "WilScot",
    jobType: "Ramp Install",
    assignedInstallerIds: ["contractor_david", "contractor_maria"],
    status: "in_progress",
    knownZone: "Zone 2",
    knownJobDate: "2026-06-08"
  },
  {
    id: "wo_res_2201",
    workOrderNumber: "FLR-2201",
    customerName: "A. Martin",
    address: "Residential site, Clearwater, FL 33756",
    client: "Residential Customer",
    jobType: "Ramp Install",
    assignedInstallerIds: ["contractor_jamal"],
    status: "assigned",
    knownZone: "Zone 1",
    knownJobDate: "2026-06-09"
  },
  {
    id: "wo_lift_3004",
    workOrderNumber: "FLR-3004",
    customerName: "D. Nguyen",
    address: "Residential site, Naples, FL 34102",
    client: "Harmar",
    jobType: "VPL Install",
    assignedInstallerIds: ["contractor_jamal", "contractor_erin"],
    status: "needs_correction",
    knownZone: "Zone 4",
    knownJobDate: "2026-06-10"
  }
];

export const requiredPhotoLabels = [
  "Front view",
  "Side view",
  "Ramp/lift landing",
  "Work order/site context",
  "Any issue or incomplete work"
];

const rampLengths = [6, 12, 18, 24, 30, 36, 42, 48, 54];

const straightRampInstallRates = Object.fromEntries(
  rampLengths.map((length) => [length, 130 + length * 12])
) as Record<number, number>;

const switchbackRampInstallRates = Object.fromEntries(
  rampLengths.map((length) => [length, 180 + length * 15])
) as Record<number, number>;

const straightRampRecoveryRates = Object.fromEntries(
  rampLengths.map((length) => [length, 90 + length * 8])
) as Record<number, number>;

const switchbackRampRecoveryRates = Object.fromEntries(
  rampLengths.map((length) => [length, 120 + length * 10])
) as Record<number, number>;

const zoneCharges: Record<BillingZone, number> = {
  "Zone 1": 75,
  "Zone 2": 125,
  "Zone 3": 175,
  "Zone 4": 225
};

const liftRates: Record<string, number> = {
  "Harmar Outside Lift": 275,
  "Bruno Outside Lift": 275,
  "Swing Away": 95,
  "Inside Lift": 225,
  "Straight Stair": 325,
  "Folding Rail": 125,
  "Hitch with wiring": 160,
  "Hitch without wiring": 95,
  "VPL 4-6": 650,
  "VPL 8": 800,
  "VPL 10": 950,
  "VPL 12": 1100,
  "VPL 14": 1250
};

const addOnRates = {
  additionalPlatform: 85,
  additionalRamp: 95,
  stepSolo: 55,
  stepAttach: 45,
  canopy: 65,
  crossBraces: 35,
  oshaStep: 70,
  oshaCanopy: 85,
  skirtingLinearFoot: 8,
  hardiPanelLinearFoot: 11
};

export function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function getContractorName(contractorId: string) {
  return contractorDirectory.find((contractor) => contractor.id === contractorId)?.name ?? "Unassigned";
}

export function getPaySplit(
  preset: PaySplitPreset,
  customLeadPercentage?: number,
  customAssistantPercentage?: number
) {
  if (preset === "custom") {
    return {
      leadPercentage: customLeadPercentage ?? 60,
      assistantPercentage: customAssistantPercentage ?? 40,
      requiresAdminReview: true
    };
  }

  const rule = paySplitRules.find((item) => item.preset === preset) ?? paySplitRules[0];

  return {
    leadPercentage: rule.leadPercentage,
    assistantPercentage: rule.assistantPercentage,
    requiresAdminReview: rule.requiresAdminReview
  };
}

export function validatePaySplit(
  preset: PaySplitPreset,
  leadPercentage: number,
  assistantPercentage: number
): ReviewFlag[] {
  const flags: ReviewFlag[] = [];
  const total = leadPercentage + assistantPercentage;

  if (total !== 100) {
    flags.push({
      id: "split_invalid_total",
      label: "Invalid pay split",
      reason: `Lead and assistant split totals ${total}%, not 100%.`,
      severity: "blocker"
    });
  }

  if (preset === "custom") {
    flags.push({
      id: "custom_split",
      label: "Custom split",
      reason: "Custom splits require admin review and an override reason.",
      severity: "warning"
    });
  } else if (preset !== "60/40") {
    flags.push({
      id: "non_default_split",
      label: "Non-default split",
      reason: `${preset} differs from the default 60/40 split.`,
      severity: "warning"
    });
  }

  return flags;
}

export function isRampJob(jobType: BillingJobType) {
  return jobType === "Ramp Install" || jobType === "Ramp Recovery";
}

export function isLiftJob(jobType: BillingJobType) {
  return jobType === "VPL Install" || jobType === "Stair Lift Install" || jobType === "Vehicle Lift Install";
}

export function searchAssignedWorkOrders({
  query,
  installerId,
  status,
  adminAccess = false
}: {
  query: string;
  installerId: string;
  status?: ContractorWorkOrder["status"] | "all";
  adminAccess?: boolean;
}) {
  const normalizedQuery = query.trim().toLowerCase();

  return assignedWorkOrders.filter((workOrder) => {
    const assigned = adminAccess || workOrder.assignedInstallerIds.includes(installerId);
    const statusMatches = !status || status === "all" || workOrder.status === status;
    const queryMatches =
      normalizedQuery.length === 0 ||
      workOrder.workOrderNumber.toLowerCase().includes(normalizedQuery) ||
      workOrder.customerName.toLowerCase().includes(normalizedQuery) ||
      workOrder.address.toLowerCase().includes(normalizedQuery);

    return assigned && statusMatches && queryMatches;
  });
}

function lineItem(
  itemCode: string,
  description: string,
  quantity: number,
  unitRate: number,
  category: BillingLineItem["category"]
): BillingLineItem {
  return {
    id: `${itemCode}-${description.replace(/\W+/g, "-").toLowerCase()}`,
    itemCode,
    description,
    quantity,
    unitRate,
    total: quantity * unitRate,
    category
  };
}

function getRampBaseRate(job: BillingJobSubmission) {
  const details = job.rampDetails;

  if (!details) {
    return 0;
  }

  if (job.jobType === "Ramp Recovery") {
    return details.configuration === "switchback"
      ? switchbackRampRecoveryRates[details.rampLength]
      : straightRampRecoveryRates[details.rampLength];
  }

  return details.configuration === "switchback"
    ? switchbackRampInstallRates[details.rampLength]
    : straightRampInstallRates[details.rampLength];
}

function getSecondTripCharge(reason: SecondTripReason | undefined, zone: BillingZone | undefined) {
  if (!reason || !zone || reason === "Installer Error") {
    return 0;
  }

  return zoneCharges[zone];
}

function getZoneCharge(job: BillingJobSubmission, zoneOccurrence: number) {
  const zone = job.rampDetails?.zone;

  if (!zone) {
    return 0;
  }

  const base = zoneCharges[zone];
  return zoneOccurrence > 0 ? base * 0.5 : base;
}

function getRampLineItems(job: BillingJobSubmission): BillingLineItem[] {
  const details = job.rampDetails;

  if (!details) {
    return [];
  }

  const baseCode = `${details.configuration === "switchback" ? "RAMP-SW" : "RAMP-ST"}-${
    job.jobType === "Ramp Recovery" ? "REC" : "INS"
  }`;
  const items = [
    lineItem(
      baseCode,
      `${details.configuration} ${job.jobType.toLowerCase()} ${details.rampLength} ft`,
      1,
      getRampBaseRate(job),
      "base"
    )
  ];

  if (details.additionalPlatformQuantity > 0) {
    items.push(
      lineItem("ADD-PLATFORM", "Additional platform", details.additionalPlatformQuantity, addOnRates.additionalPlatform, "add_on")
    );
  }
  if (details.additionalRampQuantity > 0) {
    items.push(
      lineItem("ADD-RAMP", "Additional ramp", details.additionalRampQuantity, addOnRates.additionalRamp, "add_on")
    );
  }
  if (details.standaloneStepQuantity > 0) {
    items.push(lineItem("STEP-SOLO", "Standalone step / step at door", details.standaloneStepQuantity, addOnRates.stepSolo, "add_on"));
  }
  if (details.stepAttachmentQuantity > 0) {
    items.push(lineItem("STEP-ATTACH", "Step attachment", details.stepAttachmentQuantity, addOnRates.stepAttach, "add_on"));
  }
  if (details.canopyQuantity > 0) {
    items.push(lineItem("CANOPY", "Canopy", details.canopyQuantity, addOnRates.canopy, "add_on"));
  }
  if (details.crossBracesQuantity > 0) {
    items.push(lineItem("CROSS-BRACE", "Cross braces", details.crossBracesQuantity, addOnRates.crossBraces, "add_on"));
  }
  if (details.oshaStepQuantity > 0) {
    items.push(lineItem("OSHA-STEP", "OSHA step", details.oshaStepQuantity, addOnRates.oshaStep, "add_on"));
  }
  if (details.oshaCanopyQuantity > 0) {
    items.push(lineItem("OSHA-CANOPY", "OSHA canopy", details.oshaCanopyQuantity, addOnRates.oshaCanopy, "add_on"));
  }
  if (details.skirtingLinearFeet > 0) {
    items.push(lineItem("SKIRT-LF", "Skirting linear feet", details.skirtingLinearFeet, addOnRates.skirtingLinearFoot, "add_on"));
  }
  if (details.hardiPanelLinearFeet > 0) {
    items.push(lineItem("HARDI-LF", "Hardi panel linear feet", details.hardiPanelLinearFeet, addOnRates.hardiPanelLinearFoot, "add_on"));
  }

  return items;
}

function getLiftLineItems(job: BillingJobSubmission): BillingLineItem[] {
  const details = job.liftDetails;

  if (!details) {
    return [];
  }

  if (job.jobType === "VPL Install" && details.vplHeight) {
    const description = `VPL ${details.vplHeight}`;
    return [lineItem(`VPL-${details.vplHeight}`, description, 1, liftRates[description], "lift")];
  }

  const equipmentKey =
    details.equipmentType in liftRates
      ? details.equipmentType
      : details.manufacturer === "Bruno"
        ? "Bruno Outside Lift"
        : details.manufacturer === "Harmar"
          ? "Harmar Outside Lift"
          : "Inside Lift";

  return [lineItem(equipmentKey.toUpperCase().replace(/\W+/g, "-"), equipmentKey, 1, liftRates[equipmentKey], "lift")];
}

export function calculateBillingJob(job: BillingJobSubmission, zoneOccurrence = 0): BillingJobCalculation {
  const flags: ReviewFlag[] = [];
  const split = getPaySplit(job.paySplitPreset, job.customLeadPercentage, job.customAssistantPercentage);
  flags.push(...validatePaySplit(job.paySplitPreset, split.leadPercentage, split.assistantPercentage));

  if (!job.leadInstallerId) {
    flags.push({
      id: "missing_lead_installer",
      label: "Missing lead installer",
      reason: "Final submission must have a lead installer responsible for required photos.",
      severity: "blocker"
    });
  }

  const missingRequiredPhotos = job.photos.filter((photo) => photo.required && !photo.selected);
  if (missingRequiredPhotos.length > 0) {
    flags.push({
      id: "missing_required_photos",
      label: "Missing required lead photos",
      reason: `${missingRequiredPhotos.length} required photo placeholder(s) are not selected.`,
      severity: "warning"
    });
  }

  if (job.completionStatus !== "Complete") {
    flags.push({
      id: "incomplete_job",
      label: "Incomplete or pending job",
      reason: `${job.completionStatus} requires admin review before billing.`,
      severity: "warning"
    });
  }

  if (job.addedWork) {
    flags.push({
      id: "added_work",
      label: "Added work",
      reason: "Field-added work requires admin review before invoicing.",
      severity: "warning"
    });
  }

  if (job.additionalInstallerIds.length > 0) {
    flags.push({
      id: "additional_installer_manual_split",
      label: "Additional installer",
      reason: "Additional installer is included for attendance/context. Manual split review is required before payout.",
      severity: "warning"
    });
  }

  if (job.secondTrip.required) {
    flags.push({
      id: "second_trip_requested",
      label: "Second trip requested",
      reason:
        job.secondTrip.reason === "Installer Error"
          ? "Installer-error second trip is omitted from charges and requires review."
          : "Second trip charge requires admin approval.",
      severity: "warning"
    });
  }

  if (zoneOccurrence > 0 && job.rampDetails?.zone) {
    flags.push({
      id: "same_zone_reduced_charge",
      label: "Same-day same-zone duplicate charge",
      reason: `${job.rampDetails.zone} appears earlier in this batch. Suggested zone charge uses 50% reduction.`,
      severity: "info"
    });
  }

  const lineItems = isRampJob(job.jobType) ? getRampLineItems(job) : getLiftLineItems(job);
  const zoneCharge = isRampJob(job.jobType) ? getZoneCharge(job, zoneOccurrence) : 0;
  const secondTripCharge = getSecondTripCharge(job.secondTrip.reason, job.rampDetails?.zone);
  const addOnsSubtotal = lineItems
    .filter((item) => item.category === "add_on")
    .reduce((total, item) => total + item.total, 0);
  const subtotal = lineItems.reduce((total, item) => total + item.total, 0);
  const totalContractorPayable = subtotal + zoneCharge + secondTripCharge;

  if (zoneCharge > 0) {
    lineItems.push(lineItem("ZONE", job.rampDetails?.zone ?? "Zone charge", 1, zoneCharge, "zone"));
  }
  if (secondTripCharge > 0) {
    lineItems.push(lineItem("2ND-DELIVERY", "Second delivery / return trip", 1, secondTripCharge, "second_trip"));
  }

  const assignments = createAssignmentPayouts(job, totalContractorPayable, split.leadPercentage, split.assistantPercentage);

  const contractorPayable: ContractorPayableDraft = {
    id: `payable_${job.id}`,
    jobId: job.id,
    status: flags.some((flag) => flag.severity === "blocker") ? "draft" : "needs_review",
    lineItems,
    subtotal,
    zoneCharge,
    secondTripCharge,
    addOnsSubtotal,
    totalContractorPayable,
    assignments,
    reviewFlags: flags
  };

  const clientReceivable: ClientReceivableDraft = {
    id: `receivable_${job.id}`,
    jobId: job.id,
    status: "needs_review",
    client: job.client,
    workOrderNumber: job.workOrderNumber,
    customerName: job.customerName,
    placeholderAmount: 0,
    reviewStatus: "client_rate_sheet_required",
    reviewFlags: [
      {
        id: "client_rate_sheet_required",
        label: "Client receivable draft",
        reason: "Client-side amount requires separate client rate sheet review. Contractor payout data is excluded.",
        severity: "warning"
      }
    ]
  };

  return { job, contractorPayable, clientReceivable };
}

function createAssignmentPayouts(
  job: BillingJobSubmission,
  totalContractorPayable: number,
  leadPercentage: number,
  assistantPercentage: number
): JobAssignment[] {
  const assignments: JobAssignment[] = [];

  if (job.leadInstallerId) {
    assignments.push({
      id: `${job.id}-lead`,
      jobId: job.id,
      contractorId: job.leadInstallerId,
      role: "lead",
      splitPercentage: leadPercentage,
      payoutAmount: roundCurrency(totalContractorPayable * (leadPercentage / 100)),
      participationConfirmed: true,
      photoRequired: true,
      notes: "Lead owns final submission and required photos."
    });
  }

  if (job.assistantInstallerId) {
    assignments.push({
      id: `${job.id}-assistant`,
      jobId: job.id,
      contractorId: job.assistantInstallerId,
      role: "assistant",
      splitPercentage: assistantPercentage,
      payoutAmount: roundCurrency(totalContractorPayable * (assistantPercentage / 100)),
      participationConfirmed: false,
      photoRequired: false,
      notes: "Assistant may confirm participation and add optional notes."
    });
  }

  job.additionalInstallerIds.forEach((contractorId, index) => {
    assignments.push({
      id: `${job.id}-additional-${index}`,
      jobId: job.id,
      contractorId,
      role: "additional",
      splitPercentage: 0,
      payoutAmount: 0,
      participationConfirmed: false,
      photoRequired: false,
      notes: "Additional installer included for attendance/context; payout requires admin override."
    });
  });

  return assignments;
}

export function calculateBatch(batch: JobBatch) {
  const zoneSeen = new Map<BillingZone, number>();

  return batch.jobs.map((job) => {
    const zone = job.rampDetails?.zone;
    const occurrence = zone ? zoneSeen.get(zone) ?? 0 : 0;

    if (zone) {
      zoneSeen.set(zone, occurrence + 1);
    }

    return calculateBillingJob(job, occurrence);
  });
}

export function buildWeeklyContractorInvoices({
  calculations,
  payPeriodStart,
  payPeriodEnd,
  payDate,
  approvedOnly = true
}: {
  calculations: BillingJobCalculation[];
  payPeriodStart: string;
  payPeriodEnd: string;
  payDate: string;
  approvedOnly?: boolean;
}): ContractorWeeklyInvoice[] {
  const invoices = new Map<string, ContractorWeeklyInvoice>();

  calculations.forEach((calculation) => {
    const payable = calculation.contractorPayable;
    const jobDate = normalizeDateOnly(calculation.job.jobDate);

    if (approvedOnly && payable.status !== "approved") {
      return;
    }

    if (!isDateWithinRange(jobDate, payPeriodStart, payPeriodEnd)) {
      return;
    }

    payable.assignments.forEach((assignment) => {
      const contractor = contractorDirectory.find((item) => item.id === assignment.contractorId);

      if (!contractor) {
        return;
      }

      const current =
        invoices.get(contractor.id) ??
        {
          contractorId: contractor.id,
          contractorName: contractor.name,
          payPeriodStart,
          payPeriodEnd,
          payDate,
          lines: [],
          totalWeeklyPayout: 0,
          status: "draft"
        };

      current.lines.push({
        workOrderNumber: calculation.job.workOrderNumber,
        jobDate: calculation.job.jobDate,
        role: assignment.role,
        totalJobPayout: payable.totalContractorPayable,
        splitPercentage: assignment.splitPercentage,
        contractorPayoutAmount: assignment.payoutAmount
      });
      current.totalWeeklyPayout = roundCurrency(current.totalWeeklyPayout + assignment.payoutAmount);
      invoices.set(contractor.id, current);
    });
  });

  return Array.from(invoices.values());
}

export function getMondayThroughFridayPayWindow(referenceDate = new Date()) {
  const day = referenceDate.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(referenceDate);
  monday.setDate(referenceDate.getDate() + mondayOffset - 7);

  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4);

  const payDate = new Date(monday);
  payDate.setDate(monday.getDate() + 7);

  return {
    payPeriodStart: toIsoDate(monday),
    payPeriodEnd: toIsoDate(friday),
    payDate: toIsoDate(payDate)
  };
}

export function createPhotoChecklist(jobType: BillingJobType) {
  const labels = [...requiredPhotoLabels];

  if (isLiftJob(jobType)) {
    labels.push("Equipment plate");
  }

  if (isRampJob(jobType)) {
    labels.push("Step attachment");
  }

  return labels.map((label, index) => ({
    id: `photo_${index + 1}`,
    label,
    required: index < 4 || label === "Equipment plate",
    uploadedByRole: "lead" as AssignmentRole,
    selected: index < 3
  }));
}

export const sampleBatch: JobBatch = {
  id: "batch_2026_06_08_zone_2",
  batchDate: "2026-06-08",
  leadInstallerId: "contractor_david",
  assistantInstallerId: "contractor_maria",
  routeZone: "Zone 2",
  routeNotes: "Two WilScot ramp jobs in the same zone; second zone charge should be reviewed.",
  jobs: [
    {
      id: "submission_ws_1048",
      workOrderId: "wo_wilscot_1048",
      workOrderNumber: "WS-1048",
      jobDate: "2026-06-08",
      client: "WilScot",
      jobType: "Ramp Recovery",
      customerName: "WilScot Orlando Modular",
      installAddress: "7420 Tradeport Dr, Orlando, FL 32827",
      leadInstallerId: "contractor_david",
      assistantInstallerId: "contractor_maria",
      additionalInstallerIds: [],
      paySplitPreset: "60/40",
      completionStatus: "Complete",
      notes: "Ramp recovered and site condition documented.",
      rampDetails: {
        configuration: "straight",
        rampLength: 24,
        riseHeight: 30,
        zone: "Zone 2",
        stepAttachmentQuantity: 0,
        standaloneStepQuantity: 1,
        additionalPlatformQuantity: 0,
        additionalRampQuantity: 0,
        canopyQuantity: 0,
        crossBracesQuantity: 1,
        oshaStepQuantity: 0,
        oshaCanopyQuantity: 0,
        skirtingLinearFeet: 0,
        hardiPanelLinearFeet: 0
      },
      secondTrip: { required: false, adminApproved: false },
      photos: createPhotoChecklist("Ramp Recovery"),
      addedWork: false
    },
    {
      id: "submission_ws_1055",
      workOrderId: "wo_wilscot_1055",
      workOrderNumber: "WS-1055",
      jobDate: "2026-06-08",
      client: "WilScot",
      jobType: "Ramp Install",
      customerName: "WilScot Lakeland Yard",
      installAddress: "3120 Commerce Point Dr, Lakeland, FL 33801",
      leadInstallerId: "contractor_david",
      assistantInstallerId: "contractor_maria",
      additionalInstallerIds: [],
      paySplitPreset: "70/30",
      completionStatus: "Complete",
      notes: "Same-day same-zone install with one additional platform.",
      rampDetails: {
        configuration: "switchback",
        rampLength: 30,
        riseHeight: 36,
        zone: "Zone 2",
        stepAttachmentQuantity: 1,
        standaloneStepQuantity: 0,
        additionalPlatformQuantity: 1,
        additionalRampQuantity: 0,
        canopyQuantity: 0,
        crossBracesQuantity: 2,
        oshaStepQuantity: 0,
        oshaCanopyQuantity: 0,
        skirtingLinearFeet: 12,
        hardiPanelLinearFeet: 0
      },
      secondTrip: { required: true, reason: "Client Requested Return", adminApproved: false },
      photos: createPhotoChecklist("Ramp Install").map((photo) =>
        photo.id === "photo_4" ? { ...photo, selected: false } : photo
      ),
      addedWork: true
    },
    {
      id: "submission_flr_3004",
      workOrderId: "wo_lift_3004",
      workOrderNumber: "FLR-3004",
      jobDate: "2026-06-10",
      client: "Harmar",
      jobType: "VPL Install",
      customerName: "D. Nguyen",
      installAddress: "Residential site, Naples, FL 34102",
      leadInstallerId: "contractor_jamal",
      assistantInstallerId: "contractor_erin",
      additionalInstallerIds: [],
      paySplitPreset: "custom",
      customLeadPercentage: 65,
      customAssistantPercentage: 35,
      completionStatus: "Pending",
      notes: "Equipment plate still needs final photo review.",
      liftDetails: {
        manufacturer: "Harmar",
        modelNumber: "HMR-MOCK-12",
        serialNumber: "SN-MOCK-3004",
        partNumber: "PN-VPL-12",
        equipmentType: "VPL",
        vplHeight: "12",
        equipmentPlatePhotoSelected: false
      },
      secondTrip: { required: true, reason: "Installer Error", adminApproved: false },
      photos: createPhotoChecklist("VPL Install").map((photo) =>
        photo.label === "Equipment plate" ? { ...photo, selected: false } : photo
      ),
      addedWork: false
    }
  ]
};

export const sampleCalculations = calculateBatch(sampleBatch);

export const approvedSampleCalculations: BillingJobCalculation[] = sampleCalculations.map((calculation, index) => ({
  ...calculation,
  contractorPayable: {
    ...calculation.contractorPayable,
    status: index < 2 ? "approved" : calculation.contractorPayable.status
  }
}));

export const sampleWeeklyInvoices = buildWeeklyContractorInvoices({
  calculations: approvedSampleCalculations,
  ...getMondayThroughFridayPayWindow(new Date("2026-06-16T12:00:00"))
});

function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}

function normalizeDateOnly(value: string) {
  return value.slice(0, 10);
}

function isDateWithinRange(value: string, start: string, end: string) {
  const date = normalizeDateOnly(value);
  return date >= normalizeDateOnly(start) && date <= normalizeDateOnly(end);
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
