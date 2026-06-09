"use client";

import { CalendarDays, Camera, ClipboardPen, Plus, Search, ShieldAlert, UserCheck } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  assignedWorkOrders,
  calculateBatch,
  contractorDirectory,
  createPhotoChecklist,
  currency,
  getContractorName,
  getPaySplit,
  isLiftJob,
  isRampJob,
  paySplitRules,
  searchAssignedWorkOrders
} from "@/lib/contractor-billing";
import type {
  BillingClientType,
  BillingJobSubmission,
  BillingJobType,
  BillingZone,
  CompletionStatus,
  ContractorWorkOrder,
  PaySplitPreset,
  RampConfiguration,
  SecondTripReason
} from "@/types/core";

const clientOptions: BillingClientType[] = [
  "WilScot",
  "Residential Customer",
  "Commercial Customer",
  "VA",
  "Harmar",
  "Bruno",
  "Other"
];

const jobTypeOptions: BillingJobType[] = [
  "Ramp Install",
  "Ramp Recovery",
  "VPL Install",
  "Stair Lift Install",
  "Vehicle Lift Install",
  "Service Call",
  "Repair",
  "Evaluation"
];

const completionOptions: CompletionStatus[] = ["Complete", "Incomplete", "Pending", "Return Visit Required"];
const zoneOptions: BillingZone[] = ["Zone 1", "Zone 2", "Zone 3", "Zone 4"];
const secondTripReasons: SecondTripReason[] = [
  "Missing Materials",
  "Customer Not Available",
  "Site Not Ready",
  "Client Requested Return",
  "Weather Delay",
  "Manufacturer Issue",
  "Permit/Site Access Issue",
  "Installer Error",
  "Other"
];

type MockSubmitState =
  | {
      status: "idle";
    }
  | {
      status: "blocked";
      messages: string[];
    }
  | {
      status: "submitted";
      jobCount: number;
      contractorPayableStatus: string;
      clientReceivableStatus: string;
    };

export function ContractorSubmissionFlow() {
  const [installerId, setInstallerId] = useState("contractor_david");
  const [statusFilter, setStatusFilter] = useState<ContractorWorkOrder["status"] | "all">("all");
  const [query, setQuery] = useState("");
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState(assignedWorkOrders[0]?.id ?? "");
  const selectedWorkOrder =
    assignedWorkOrders.find((workOrder) => workOrder.id === selectedWorkOrderId) ?? assignedWorkOrders[0];
  const [jobDraft, setJobDraft] = useState<BillingJobSubmission>(() => createJobFromWorkOrder(selectedWorkOrder));
  const [batchJobs, setBatchJobs] = useState<BillingJobSubmission[]>([]);
  const [submitState, setSubmitState] = useState<MockSubmitState>({ status: "idle" });

  const visibleWorkOrders = useMemo(
    () =>
      searchAssignedWorkOrders({
        query,
        installerId,
        status: statusFilter
      }),
    [installerId, query, statusFilter]
  );

  const calculation = calculateBatch({
    id: "local_submission_preview",
    batchDate: jobDraft.jobDate,
    leadInstallerId: jobDraft.leadInstallerId,
    assistantInstallerId: jobDraft.assistantInstallerId,
    routeZone: jobDraft.rampDetails?.zone,
    routeNotes: "Local submission preview",
    jobs: [...batchJobs, jobDraft]
  }).at(-1);

  const split = getPaySplit(
    jobDraft.paySplitPreset,
    jobDraft.customLeadPercentage,
    jobDraft.customAssistantPercentage
  );

  function selectWorkOrder(workOrderId: string) {
    const workOrder = assignedWorkOrders.find((item) => item.id === workOrderId);

    if (!workOrder) {
      return;
    }

    setSelectedWorkOrderId(workOrder.id);
    setJobDraft(createJobFromWorkOrder(workOrder, installerId));
  }

  function patchJob(patch: Partial<BillingJobSubmission>) {
    setJobDraft((current) => ({ ...current, ...patch }));
    setSubmitState({ status: "idle" });
  }

  function changeJobType(jobType: BillingJobType) {
    patchJob({
      jobType,
      photos: createPhotoChecklist(jobType),
      rampDetails: isRampJob(jobType) ? jobDraft.rampDetails ?? createDefaultRampDetails(selectedWorkOrder) : undefined,
      liftDetails: isLiftJob(jobType) ? jobDraft.liftDetails ?? createDefaultLiftDetails(jobType, jobDraft.client) : undefined
    });
  }

  function addCurrentJobToBatch() {
    setBatchJobs((current) => [...current, { ...jobDraft, id: `${jobDraft.id}_${current.length + 1}` }]);
    const fallback = visibleWorkOrders.find((workOrder) => workOrder.id !== selectedWorkOrderId) ?? selectedWorkOrder;
    setSelectedWorkOrderId(fallback.id);
    setJobDraft(createJobFromWorkOrder(fallback, installerId));
    setSubmitState({ status: "idle" });
  }

  function submitMockBatch() {
    const calculations = calculateBatch({
      id: "local_submit_batch",
      batchDate: jobDraft.jobDate,
      leadInstallerId: jobDraft.leadInstallerId,
      assistantInstallerId: jobDraft.assistantInstallerId,
      routeZone: jobDraft.rampDetails?.zone,
      routeNotes: "Local submit validation",
      jobs: [...batchJobs, jobDraft]
    });
    const messages = getSubmitBlockers(jobDraft, selectedWorkOrder, split.leadPercentage, split.assistantPercentage);

    if (messages.length > 0) {
      setSubmitState({ status: "blocked", messages });
      return;
    }

    setSubmitState({
      status: "submitted",
      jobCount: batchJobs.length + 1,
      contractorPayableStatus: calculation?.contractorPayable.status ?? calculations.at(-1)?.contractorPayable.status ?? "draft",
      clientReceivableStatus: calculation?.clientReceivable.status ?? calculations.at(-1)?.clientReceivable.status ?? "needs_review"
    });
  }

  const blocked = calculation?.contractorPayable.reviewFlags.some((flag) => flag.severity === "blocker");

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Mobile Contractor Job Submission</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">
              Search assigned work orders, preload known CRM/work order data, complete job details,
              and preview contractor payable and client receivable review tracks. This remains mock-only.
            </p>
          </div>
          <Badge variant="secondary">No persistence or integrations</Badge>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.35fr]">
        <WorkOrderLookup
          installerId={installerId}
          query={query}
          selectedWorkOrderId={selectedWorkOrderId}
          statusFilter={statusFilter}
          visibleWorkOrders={visibleWorkOrders}
          onInstallerChange={(id) => {
            setInstallerId(id);
            const next = assignedWorkOrders.find((workOrder) => workOrder.assignedInstallerIds.includes(id));
            if (next) {
              setSelectedWorkOrderId(next.id);
              setJobDraft(createJobFromWorkOrder(next, id));
            }
          }}
          onQueryChange={setQuery}
          onSelectWorkOrder={selectWorkOrder}
          onStatusFilterChange={setStatusFilter}
        />

        <section className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-lg font-semibold">Start Job Submission</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Lead installer owns final submission and required photos. Assistant participation is optional.
              </p>
            </div>
            {blocked ? <Badge variant="destructive">Blocked</Badge> : <Badge variant="secondary">Preview ready</Badge>}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Work order number" value={jobDraft.workOrderNumber} onChange={(value) => patchJob({ workOrderNumber: value })} />
            <TextInput label="Date completed" type="date" value={jobDraft.jobDate} onChange={(value) => patchJob({ jobDate: value })} />
            <SelectInput label="Client" value={jobDraft.client} options={clientOptions} onChange={(value) => patchJob({ client: value as BillingClientType })} />
            <SelectInput
              label="Job type"
              value={jobDraft.jobType}
              options={jobTypeOptions}
              onChange={(value) => changeJobType(value as BillingJobType)}
            />
            <TextInput label="Customer name" value={jobDraft.customerName} onChange={(value) => patchJob({ customerName: value })} />
            <TextInput label="Install address" value={jobDraft.installAddress} onChange={(value) => patchJob({ installAddress: value })} />
            <ContractorSelect label="Lead installer" value={jobDraft.leadInstallerId} onChange={(value) => patchJob({ leadInstallerId: value })} />
            <ContractorSelect label="Assistant installer" value={jobDraft.assistantInstallerId ?? ""} onChange={(value) => patchJob({ assistantInstallerId: value || undefined })} optional />
            <ContractorSelect
              label="Additional installer"
              value={jobDraft.additionalInstallerIds[0] ?? ""}
              onChange={(value) => patchJob({ additionalInstallerIds: value ? [value] : [] })}
              optional
              excludedIds={[jobDraft.leadInstallerId, jobDraft.assistantInstallerId].filter(Boolean) as string[]}
            />
            <SelectInput
              label="Pay split"
              value={jobDraft.paySplitPreset}
              options={paySplitRules.map((rule) => rule.preset)}
              onChange={(value) => patchJob({ paySplitPreset: value as PaySplitPreset })}
            />
            <SelectInput
              label="Completion status"
              value={jobDraft.completionStatus}
              options={completionOptions}
              onChange={(value) => patchJob({ completionStatus: value as CompletionStatus })}
            />
          </div>

          {jobDraft.paySplitPreset === "custom" ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <NumberInput label="Lead percentage" value={jobDraft.customLeadPercentage ?? 60} onChange={(value) => patchJob({ customLeadPercentage: value })} />
              <NumberInput label="Assistant percentage" value={jobDraft.customAssistantPercentage ?? 40} onChange={(value) => patchJob({ customAssistantPercentage: value })} />
            </div>
          ) : null}

          {isRampJob(jobDraft.jobType) && jobDraft.rampDetails ? (
            <RampFields job={jobDraft} onPatch={patchJob} />
          ) : null}

          {isLiftJob(jobDraft.jobType) && jobDraft.liftDetails ? (
            <LiftFields job={jobDraft} onPatch={patchJob} />
          ) : null}

          <section className="mt-5 rounded-md border bg-[var(--background)] p-4">
            <h3 className="text-sm font-semibold">Second Trip</h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <SelectInput
                label="Was a second trip required?"
                value={jobDraft.secondTrip.required ? "Yes" : "No"}
                options={["No", "Yes"]}
                onChange={(value) =>
                  patchJob({
                    secondTrip: {
                      required: value === "Yes",
                      reason: value === "Yes" ? jobDraft.secondTrip.reason ?? "Client Requested Return" : undefined,
                      adminApproved: false
                    }
                  })
                }
              />
              {jobDraft.secondTrip.required ? (
                <SelectInput
                  label="Second trip reason"
                  value={jobDraft.secondTrip.reason ?? "Client Requested Return"}
                  options={secondTripReasons}
                  onChange={(value) =>
                    patchJob({
                      secondTrip: { required: true, reason: value as SecondTripReason, adminApproved: false }
                    })
                  }
                />
              ) : null}
            </div>
          </section>

          <PhotoChecklist job={jobDraft} onPatch={patchJob} />

          <label className="mt-5 block text-sm font-medium">
            Notes
            <textarea
              className="mt-2 min-h-24 w-full rounded-md border bg-white px-3 py-2 text-sm outline-none ring-[var(--ring)] focus:ring-2"
              value={jobDraft.notes}
              onChange={(event) => patchJob({ notes: event.target.value })}
              placeholder="Completion details, blockers, additional work, or return trip context."
            />
          </label>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button onClick={addCurrentJobToBatch}>
              <Plus className="h-4 w-4" />
              Add Another Job
            </Button>
            <Button variant="secondary" onClick={submitMockBatch}>
              Submit mock batch for review
            </Button>
          </div>
          {jobDraft.additionalInstallerIds.length > 0 ? (
            <div className="mt-4 rounded-md border bg-[var(--background)] p-3 text-sm text-[var(--muted-foreground)]">
              Additional installer selected. Manual split review is required; additional payout defaults to $0 in this MVP pass.
            </div>
          ) : null}
          {submitState.status === "blocked" ? (
            <div className="mt-4 rounded-md border border-[var(--destructive)] bg-white p-3 text-sm">
              <div className="font-semibold text-[var(--destructive)]">Mock submit blocked</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[var(--muted-foreground)]">
                {submitState.messages.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {submitState.status === "submitted" ? (
            <div className="mt-4 rounded-md border bg-[var(--secondary)] p-3 text-sm text-[var(--secondary-foreground)]">
              <div className="font-semibold">Mock batch ready for admin review</div>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                <span>{submitState.jobCount} job(s) submitted locally</span>
                <span>Payable: {submitState.contractorPayableStatus.replace(/_/g, " ")}</span>
                <span>Receivable: {submitState.clientReceivableStatus.replace(/_/g, " ")}</span>
              </div>
            </div>
          ) : null}
        </section>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <PreviewCard
          icon={UserCheck}
          title="Pay Split"
          value={`${split.leadPercentage}% / ${split.assistantPercentage}%`}
          detail={`${getContractorName(jobDraft.leadInstallerId)} lead, ${jobDraft.assistantInstallerId ? getContractorName(jobDraft.assistantInstallerId) : "no assistant"}`}
        />
        <PreviewCard
          icon={ClipboardPen}
          title="Contractor Payable"
          value={currency(calculation?.contractorPayable.totalContractorPayable ?? 0)}
          detail="Calculated from mock contractor rate sheet; requires admin approval."
        />
        <PreviewCard
          icon={CalendarDays}
          title="Batch Jobs"
          value={String(batchJobs.length + 1)}
          detail="Each job keeps its own pricing, photos, notes, split, and approval state."
        />
      </section>

      {calculation ? (
        <section className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-lg font-semibold">Admin Review Preview</h2>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                One submission creates contractor payable and client receivable tracks. Client draft excludes contractor payout values.
              </p>
            </div>
            <Badge variant="secondary">{calculation.contractorPayable.reviewFlags.length} review flag(s)</Badge>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <TrackPanel title="Contractor payable" status={calculation.contractorPayable.status}>
              <MetricRow label="Base/add-ons subtotal" value={currency(calculation.contractorPayable.subtotal)} />
              <MetricRow label="Zone charge" value={currency(calculation.contractorPayable.zoneCharge)} />
              <MetricRow label="Second trip" value={currency(calculation.contractorPayable.secondTripCharge)} />
              <MetricRow label="Total payable" value={currency(calculation.contractorPayable.totalContractorPayable)} />
            </TrackPanel>
            <TrackPanel title="Client receivable" status={calculation.clientReceivable.status}>
              <MetricRow label="Draft status" value="Client rate sheet required" />
              <MetricRow label="Client" value={calculation.clientReceivable.client} />
              <MetricRow label="Work order" value={calculation.clientReceivable.workOrderNumber} />
              <MetricRow label="Contractor payout exposed" value="No" />
            </TrackPanel>
          </div>
          <div className="mt-4 grid gap-3">
            {[...calculation.contractorPayable.reviewFlags, ...calculation.clientReceivable.reviewFlags].map((flag) => (
              <div key={flag.id} className="rounded-md border bg-[var(--background)] p-3 text-sm">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldAlert className="h-4 w-4 text-[var(--accent)]" />
                  {flag.label}
                </div>
                <p className="mt-1 text-[var(--muted-foreground)]">{flag.reason}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function WorkOrderLookup({
  installerId,
  query,
  selectedWorkOrderId,
  statusFilter,
  visibleWorkOrders,
  onInstallerChange,
  onQueryChange,
  onSelectWorkOrder,
  onStatusFilterChange
}: {
  installerId: string;
  query: string;
  selectedWorkOrderId: string;
  statusFilter: ContractorWorkOrder["status"] | "all";
  visibleWorkOrders: ContractorWorkOrder[];
  onInstallerChange: (id: string) => void;
  onQueryChange: (query: string) => void;
  onSelectWorkOrder: (id: string) => void;
  onStatusFilterChange: (status: ContractorWorkOrder["status"] | "all") => void;
}) {
  return (
    <section className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-[var(--muted-foreground)]" />
        <h2 className="text-lg font-semibold">Assigned Work Order Lookup</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
        Installers only see assigned work orders in this mock flow. Admin access can be modeled later with broader scope.
      </p>
      <div className="mt-4 space-y-4">
        <ContractorSelect label="Filter by assigned installer" value={installerId} onChange={onInstallerChange} />
        <TextInput label="Search work order, customer, or address" value={query} onChange={onQueryChange} />
        <SelectInput
          label="Status"
          value={statusFilter}
          options={["all", "assigned", "in_progress", "submitted", "needs_correction"]}
          onChange={(value) => onStatusFilterChange(value as ContractorWorkOrder["status"] | "all")}
        />
      </div>
      <div className="mt-4 space-y-3">
        {visibleWorkOrders.map((workOrder) => {
          const active = workOrder.id === selectedWorkOrderId;

          return (
            <button
              key={workOrder.id}
              className={`w-full rounded-md border p-3 text-left text-sm transition ${
                active ? "border-[var(--primary)] bg-[var(--secondary)]" : "bg-white hover:bg-[var(--muted)]"
              }`}
              onClick={() => onSelectWorkOrder(workOrder.id)}
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold">{workOrder.workOrderNumber}</span>
                <Badge variant="secondary">{workOrder.status.replace(/_/g, " ")}</Badge>
              </div>
              <p className="mt-1 text-[var(--muted-foreground)]">{workOrder.customerName}</p>
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">{workOrder.address}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function RampFields({ job, onPatch }: { job: BillingJobSubmission; onPatch: (patch: Partial<BillingJobSubmission>) => void }) {
  const details = job.rampDetails;

  if (!details) {
    return null;
  }

  const currentDetails = details;

  function patchRamp(patch: Partial<NonNullable<BillingJobSubmission["rampDetails"]>>) {
    onPatch({ rampDetails: { ...currentDetails, ...patch } });
  }

  return (
    <section className="mt-5 rounded-md border bg-[var(--background)] p-4">
      <h3 className="text-sm font-semibold">Ramp Details</h3>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <SelectInput label="Configuration" value={details.configuration} options={["straight", "switchback"]} onChange={(value) => patchRamp({ configuration: value as RampConfiguration })} />
        <NumberSelect label="Ramp length" value={details.rampLength} options={[6, 12, 18, 24, 30, 36, 42, 48, 54]} onChange={(value) => patchRamp({ rampLength: value })} />
        <NumberSelect label="Rise height" value={details.riseHeight} options={[20, 24, 30, 36, 42, 48, 54]} onChange={(value) => patchRamp({ riseHeight: value })} />
        <NumberInput label="Step attachment qty" value={details.stepAttachmentQuantity} onChange={(value) => patchRamp({ stepAttachmentQuantity: value })} />
        <NumberInput label="Standalone step qty" value={details.standaloneStepQuantity} onChange={(value) => patchRamp({ standaloneStepQuantity: value })} />
        <NumberInput label="Additional platform qty" value={details.additionalPlatformQuantity} onChange={(value) => patchRamp({ additionalPlatformQuantity: value })} />
        <NumberInput label="Additional ramp qty" value={details.additionalRampQuantity} onChange={(value) => patchRamp({ additionalRampQuantity: value })} />
        <NumberInput label="Canopy qty" value={details.canopyQuantity} onChange={(value) => patchRamp({ canopyQuantity: value })} />
        <NumberInput label="Cross braces qty" value={details.crossBracesQuantity} onChange={(value) => patchRamp({ crossBracesQuantity: value })} />
        <NumberInput label="OSHA step qty" value={details.oshaStepQuantity} onChange={(value) => patchRamp({ oshaStepQuantity: value })} />
        <NumberInput label="OSHA canopy qty" value={details.oshaCanopyQuantity} onChange={(value) => patchRamp({ oshaCanopyQuantity: value })} />
        <NumberInput label="Skirting linear feet" value={details.skirtingLinearFeet} onChange={(value) => patchRamp({ skirtingLinearFeet: value })} />
        <NumberInput label="Hardi panel linear feet" value={details.hardiPanelLinearFeet} onChange={(value) => patchRamp({ hardiPanelLinearFeet: value })} />
        <SelectInput label="Zone" value={details.zone} options={zoneOptions} onChange={(value) => patchRamp({ zone: value as BillingZone })} />
      </div>
    </section>
  );
}

function LiftFields({ job, onPatch }: { job: BillingJobSubmission; onPatch: (patch: Partial<BillingJobSubmission>) => void }) {
  const details = job.liftDetails;

  if (!details) {
    return null;
  }

  const currentDetails = details;

  function patchLift(patch: Partial<NonNullable<BillingJobSubmission["liftDetails"]>>) {
    onPatch({ liftDetails: { ...currentDetails, ...patch } });
  }

  return (
    <section className="mt-5 rounded-md border bg-[var(--background)] p-4">
      <h3 className="text-sm font-semibold">Lift Details</h3>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        <SelectInput
          label="Manufacturer"
          value={details.manufacturer}
          options={["Harmar", "Bruno", "Savaria", "Other"]}
          onChange={(value) =>
            patchLift({
              manufacturer: value as NonNullable<BillingJobSubmission["liftDetails"]>["manufacturer"]
            })
          }
        />
        <TextInput label="Model number" value={details.modelNumber} onChange={(value) => patchLift({ modelNumber: value })} />
        <TextInput label="Serial number" value={details.serialNumber} onChange={(value) => patchLift({ serialNumber: value })} />
        <TextInput label="Part number" value={details.partNumber} onChange={(value) => patchLift({ partNumber: value })} />
        <SelectInput label="Equipment type" value={details.equipmentType} options={["Harmar Outside Lift", "Bruno Outside Lift", "Swing Away", "Inside Lift", "Straight Stair", "Folding Rail", "Hitch with wiring", "Hitch without wiring", "VPL"]} onChange={(value) => patchLift({ equipmentType: value })} />
        {job.jobType === "VPL Install" ? (
          <SelectInput
            label="VPL height"
            value={details.vplHeight ?? "4-6"}
            options={["4-6", "8", "10", "12", "14"]}
            onChange={(value) =>
              patchLift({ vplHeight: value as NonNullable<BillingJobSubmission["liftDetails"]>["vplHeight"] })
            }
          />
        ) : null}
      </div>
      <label className="mt-4 flex items-center gap-2 text-sm">
        <input
          checked={details.equipmentPlatePhotoSelected}
          onChange={(event) => patchLift({ equipmentPlatePhotoSelected: event.target.checked })}
          type="checkbox"
        />
        Equipment plate photo placeholder selected
      </label>
    </section>
  );
}

function PhotoChecklist({ job, onPatch }: { job: BillingJobSubmission; onPatch: (patch: Partial<BillingJobSubmission>) => void }) {
  return (
    <section className="mt-5 rounded-md border bg-[var(--background)] p-4">
      <div className="flex items-center gap-2">
        <Camera className="h-4 w-4 text-[var(--muted-foreground)]" />
        <h3 className="text-sm font-semibold">Required Photo Checklist Placeholder</h3>
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {job.photos.map((photo) => (
          <label key={photo.id} className="flex items-start gap-2 rounded-md border bg-white p-3 text-sm">
            <input
              checked={photo.selected}
              onChange={(event) =>
                onPatch({
                  photos: job.photos.map((item) =>
                    item.id === photo.id ? { ...item, selected: event.target.checked } : item
                  )
                })
              }
              type="checkbox"
            />
            <span>
              <span className="font-medium">{photo.label}</span>
              <span className="block text-xs text-[var(--muted-foreground)]">
                {photo.required ? "Required" : "Optional"} - lead installer responsibility
              </span>
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

function ContractorSelect({
  label,
  value,
  onChange,
  optional = false,
  excludedIds = []
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
  excludedIds?: string[];
}) {
  const activeContractors = contractorDirectory.filter(
    (contractor) => contractor.activeStatus === "active" && !excludedIds.includes(contractor.id)
  );

  return (
    <SelectInput
      label={label}
      value={value}
      options={[...(optional ? [""] : []), ...activeContractors.map((contractor) => contractor.id)]}
      onChange={onChange}
      formatOption={(option) => (option ? getContractorName(option) : "None")}
    />
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        className="mt-2 h-10 w-full rounded-md border bg-white px-3 text-sm outline-none ring-[var(--ring)] focus:ring-2"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        className="mt-2 h-10 w-full rounded-md border bg-white px-3 text-sm outline-none ring-[var(--ring)] focus:ring-2"
        min={0}
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function NumberSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: number;
  options: number[];
  onChange: (value: number) => void;
}) {
  return (
    <SelectInput label={label} value={String(value)} options={options.map(String)} onChange={(value) => onChange(Number(value))} />
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange,
  formatOption
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  formatOption?: (value: string) => string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <select
        className="mt-2 h-10 w-full rounded-md border bg-white px-3 text-sm outline-none ring-[var(--ring)] focus:ring-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option || "empty"} value={option}>
            {formatOption ? formatOption(option) : option.replace(/_/g, " ")}
          </option>
        ))}
      </select>
    </label>
  );
}

function PreviewCard({
  icon: Icon,
  title,
  value,
  detail
}: {
  icon: typeof CalendarDays;
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-[var(--muted-foreground)]">{title}</h2>
        <Icon className="h-4 w-4 text-[var(--primary)]" />
      </div>
      <div className="text-2xl font-semibold">{value}</div>
      <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{detail}</p>
    </article>
  );
}

function TrackPanel({ title, status, children }: { title: string; status: string; children: ReactNode }) {
  return (
    <article className="rounded-md border bg-[var(--background)] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-semibold">{title}</h3>
        <Badge variant="secondary">{status.replace(/_/g, " ")}</Badge>
      </div>
      <div className="space-y-2">{children}</div>
    </article>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border bg-white px-3 py-2 text-sm">
      <span className="text-[var(--muted-foreground)]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function createJobFromWorkOrder(workOrder: ContractorWorkOrder, installerId = workOrder.assignedInstallerIds[0]): BillingJobSubmission {
  return {
    id: `submission_${workOrder.id}`,
    workOrderId: workOrder.id,
    workOrderNumber: workOrder.workOrderNumber,
    jobDate: workOrder.knownJobDate ?? "2026-06-09",
    client: workOrder.client,
    jobType: workOrder.jobType,
    customerName: workOrder.customerName,
    installAddress: workOrder.address,
    leadInstallerId: installerId,
    assistantInstallerId: workOrder.assignedInstallerIds.find((id) => id !== installerId),
    additionalInstallerIds: [],
    paySplitPreset: "60/40",
    completionStatus: "Complete",
    notes: "",
    rampDetails: isRampJob(workOrder.jobType) ? createDefaultRampDetails(workOrder) : undefined,
    liftDetails: isLiftJob(workOrder.jobType) ? createDefaultLiftDetails(workOrder.jobType, workOrder.client) : undefined,
    secondTrip: { required: false, adminApproved: false },
    photos: createPhotoChecklist(workOrder.jobType),
    addedWork: false
  };
}

function createDefaultRampDetails(workOrder?: ContractorWorkOrder): NonNullable<BillingJobSubmission["rampDetails"]> {
  return {
    configuration: "straight",
    rampLength: 24,
    riseHeight: 30,
    zone: workOrder?.knownZone ?? "Zone 1",
    stepAttachmentQuantity: 0,
    standaloneStepQuantity: 0,
    additionalPlatformQuantity: 0,
    additionalRampQuantity: 0,
    canopyQuantity: 0,
    crossBracesQuantity: 0,
    oshaStepQuantity: 0,
    oshaCanopyQuantity: 0,
    skirtingLinearFeet: 0,
    hardiPanelLinearFeet: 0
  };
}

function createDefaultLiftDetails(
  jobType: BillingJobType,
  client: BillingClientType
): NonNullable<BillingJobSubmission["liftDetails"]> {
  return {
    manufacturer: client === "Bruno" ? "Bruno" : client === "Harmar" ? "Harmar" : "Other",
    modelNumber: "",
    serialNumber: "",
    partNumber: "",
    equipmentType: jobType === "VPL Install" ? "VPL" : "Inside Lift",
    vplHeight: jobType === "VPL Install" ? "4-6" : undefined,
    equipmentPlatePhotoSelected: false
  };
}

function getSubmitBlockers(
  job: BillingJobSubmission,
  workOrder: ContractorWorkOrder | undefined,
  leadPercentage: number,
  assistantPercentage: number
) {
  const blockers: string[] = [];

  if (!workOrder || !job.workOrderNumber) {
    blockers.push("Select an assigned work order before submitting.");
  }
  if (!job.leadInstallerId) {
    blockers.push("Assign a lead installer before submitting.");
  }
  if (isRampJob(job.jobType) && !job.rampDetails) {
    blockers.push("Ramp details are required for ramp jobs.");
  }
  if (isLiftJob(job.jobType) && !job.liftDetails) {
    blockers.push("Lift details are required for lift jobs.");
  }
  if (leadPercentage + assistantPercentage !== 100) {
    blockers.push("Lead and assistant split must total 100%.");
  }

  return blockers;
}
