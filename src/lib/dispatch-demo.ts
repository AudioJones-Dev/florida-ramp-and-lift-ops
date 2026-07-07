export type DispatchMode = "ranked_offer" | "invite_bid" | "direct_assign";

export type DispatchFactorKey =
  | "travel"
  | "loading"
  | "offloading"
  | "evaluation"
  | "siteCommunication"
  | "staging"
  | "installing"
  | "grading";

export type StackGrade = "Feasible" | "Conditional" | "Less likely";

export type DispatchRecommendation = {
  contractor: string;
  score: number;
  position: "Recommended" | "Strong alternate" | "Backup";
  summary: string;
  reasons: string[];
};

export type DispatchDemoJob = {
  id: string;
  jobNumber: string;
  title: string;
  customer: string;
  location: string;
  dispatchMode: DispatchMode;
  objective: string;
  stackGrade: StackGrade;
  invoiceBatch: string;
  stackSummary: string;
  factors: Record<DispatchFactorKey, number>;
  recommendations: DispatchRecommendation[];
};

export type InvoiceBatchSuggestion = {
  title: string;
  grade: StackGrade;
  jobNumbers: string[];
  summary: string;
  reasons: string[];
};

export const dispatchFactorFields: Array<{ key: DispatchFactorKey; label: string }> = [
  { key: "travel", label: "Travel" },
  { key: "loading", label: "Loading" },
  { key: "offloading", label: "Offloading" },
  { key: "evaluation", label: "Evaluation" },
  { key: "siteCommunication", label: "Site communication" },
  { key: "staging", label: "Staging" },
  { key: "installing", label: "Installing" },
  { key: "grading", label: "Grading" }
];

export const dispatchDemoJobs: DispatchDemoJob[] = [
  {
    id: "job_3001",
    jobNumber: "FLR-3001",
    title: "Clearwater residential ramp install",
    customer: "Residential customer",
    location: "Clearwater / Pinellas",
    dispatchMode: "ranked_offer",
    objective: "Best stack candidate",
    stackGrade: "Feasible",
    invoiceBatch: "Batch A",
    stackSummary:
      "Short route, shared truck staging, and light closeout overhead make this the cleanest walk-through stack.",
    factors: {
      travel: 1,
      loading: 2,
      offloading: 2,
      evaluation: 1,
      siteCommunication: 1,
      staging: 2,
      installing: 2,
      grading: 1
    },
    recommendations: [
      {
        contractor: "Lead Installer A",
        score: 96,
        position: "Recommended",
        summary: "Best same-day residential route fit with the strongest overall performance history.",
        reasons: [
          "Shortest route and best region fit for Pinellas-area work.",
          "Strong ramp-install history and reliable photo documentation.",
          "Low current load keeps the crew available for a stacked route."
        ]
      },
      {
        contractor: "Helper C",
        score: 83,
        position: "Strong alternate",
        summary: "Good support-seat option if the crew needs a helper on the same route.",
        reasons: [
          "Keeps the truck route efficient for shared labor.",
          "Best used as support, not as the lead installer.",
          "Useful for staging, cleanup, and follow-up documentation."
        ]
      },
      {
        contractor: "Senior Lead B",
        score: 72,
        position: "Backup",
        summary: "Available, but farther from the route and better suited for commercial work.",
        reasons: [
          "Higher drive time than the Pinellas crew.",
          "Commercial strength is not needed for this job.",
          "Good fallback if the preferred crew is unavailable."
        ]
      }
    ]
  },
  {
    id: "job_3002",
    jobNumber: "FLR-3002",
    title: "Tampa evaluation and handrail adjustment",
    customer: "Residential customer",
    location: "Tampa / Hillsborough",
    dispatchMode: "ranked_offer",
    objective: "Fastest closeout",
    stackGrade: "Feasible",
    invoiceBatch: "Batch A",
    stackSummary:
      "This can be paired with the Clearwater install because the route, crew, and closeout packet stay simple.",
    factors: {
      travel: 1,
      loading: 1,
      offloading: 1,
      evaluation: 2,
      siteCommunication: 2,
      staging: 1,
      installing: 1,
      grading: 1
    },
    recommendations: [
      {
        contractor: "Lead Installer A",
        score: 94,
        position: "Recommended",
        summary: "Fastest and cleanest choice for a same-region follow-up stop.",
        reasons: [
          "Shared Tampa/Pinellas territory keeps travel low.",
          "The job is light enough to stack with another residential stop.",
          "Strong site communication and documentation follow-through."
        ]
      },
      {
        contractor: "Helper C",
        score: 81,
        position: "Strong alternate",
        summary: "Useful if the walkthrough needs extra hands or a short secondary visit.",
        reasons: [
          "Low complexity is a good fit for support labor.",
          "Keeps the route flexible if the lead crew is delayed.",
          "Best when paired with a primary installer."
        ]
      },
      {
        contractor: "Senior Lead B",
        score: 70,
        position: "Backup",
        summary: "Possible, but this is not the best use of the commercial-focused crew.",
        reasons: [
          "Longer route than the residential crew.",
          "Commercial experience is not the main requirement here.",
          "Should only be used if the primary crew cannot take it."
        ]
      }
    ]
  },
  {
    id: "job_3003",
    jobNumber: "FLR-3003",
    title: "Orlando commercial takedown",
    customer: "Commercial account",
    location: "Orlando / Central Florida",
    dispatchMode: "invite_bid",
    objective: "Human-reviewed commercial route",
    stackGrade: "Conditional",
    invoiceBatch: "Batch B",
    stackSummary:
      "This is viable as a separate commercial packet, but the site communication and documentation handoffs make it less stack-friendly.",
    factors: {
      travel: 3,
      loading: 3,
      offloading: 3,
      evaluation: 3,
      siteCommunication: 4,
      staging: 3,
      installing: 2,
      grading: 2
    },
    recommendations: [
      {
        contractor: "Senior Lead B",
        score: 95,
        position: "Recommended",
        summary: "Best commercial fit and the strongest choice for an invite-only or bid-reviewed route.",
        reasons: [
          "Central Florida territory keeps the commercial route practical.",
          "Best match for WilScot-style coordination and closeout work.",
          "Good documentation history for invoice-ready packets."
        ]
      },
      {
        contractor: "Lead Installer A",
        score: 77,
        position: "Strong alternate",
        summary: "Can do the work, but this is not the most natural route fit.",
        reasons: [
          "Residential strength is solid, but the commercial handoff is heavier.",
          "Useful as a backup if the Orlando lead is unavailable.",
          "Still viable if the crew can stay on one route after the job."
        ]
      },
      {
        contractor: "Helper C",
        score: 69,
        position: "Backup",
        summary: "Best as support for cleanup and closeout, not primary dispatch.",
        reasons: [
          "Not the strongest commercial lead choice.",
          "Good for a helper seat on a larger crew.",
          "Should not carry the route alone."
        ]
      }
    ]
  },
  {
    id: "job_3004",
    jobNumber: "FLR-3004",
    title: "Naples VPL install",
    customer: "Specialty install client",
    location: "Naples / Southwest Florida",
    dispatchMode: "invite_bid",
    objective: "Specialty-only assignment",
    stackGrade: "Less likely",
    invoiceBatch: "Batch C",
    stackSummary:
      "This is a specialty job and should stay separate because staging, equipment, and install complexity make it a poor stacking candidate.",
    factors: {
      travel: 4,
      loading: 4,
      offloading: 4,
      evaluation: 4,
      siteCommunication: 3,
      staging: 5,
      installing: 5,
      grading: 4
    },
    recommendations: [
      {
        contractor: "VPL Specialist D",
        score: 98,
        position: "Recommended",
        summary: "Top specialty choice for a complex lift install and invite-only route.",
        reasons: [
          "Only contractor in the demo with a specialty lift skill set.",
          "Best match for staging-heavy work and complex install steps.",
          "Invite-only review keeps the job controlled and visible."
        ]
      },
      {
        contractor: "Senior Lead B",
        score: 82,
        position: "Strong alternate",
        summary: "Commercially strong, but still secondary to a specialty lift installer.",
        reasons: [
          "Can handle commercial coordination if the specialty vendor is unavailable.",
          "Still needs a tighter review because the install is high complexity.",
          "Better as a backup bidder than the default assignment."
        ]
      },
      {
        contractor: "Lead Installer A",
        score: 64,
        position: "Backup",
        summary: "Viable only if the job is simplified or split into smaller work scopes.",
        reasons: [
          "Residential ramp strength does not fully cover a specialty lift install.",
          "High staging complexity makes this a weaker route fit.",
          "Keep as a fallback, not the primary recommendation."
        ]
      }
    ]
  }
];

export const dispatchInvoiceBatches: InvoiceBatchSuggestion[] = [
  {
    title: "Batch A — Clearwater and Tampa",
    grade: "Feasible",
    jobNumbers: ["FLR-3001", "FLR-3002"],
    summary: "Best demo stack: same metro area, same crew rhythm, and minimal reloading between stops.",
    reasons: [
      "One truck can cover both jobs without long deadhead travel.",
      "Loading and offloading can be reused across the same route.",
      "The invoice packet can stay together because the documentation rhythm is similar."
    ]
  },
  {
    title: "Batch B — Orlando commercial closeout",
    grade: "Conditional",
    jobNumbers: ["FLR-3003"],
    summary: "Works as a separate commercial packet. It is stackable only if a nearby commercial stop is added later.",
    reasons: [
      "Commercial site communication is the dominant variable here.",
      "The crew should keep the closeout packet separate from residential work.",
      "Better for a standalone invoice review than a residential stack."
    ]
  },
  {
    title: "Batch C — Naples VPL install",
    grade: "Less likely",
    jobNumbers: ["FLR-3004"],
    summary: "Specialty install with heavy staging requirements. Keep this invoice separate unless a nearby specialty stop is added.",
    reasons: [
      "Travel, staging, and install complexity are all high.",
      "Specialty equipment and review steps make it a poor stack candidate.",
      "Invoice handling should stay isolated until the job is complete."
    ]
  }
];
