export const mockRoles = [
  {
    id: "owner",
    label: "Owner",
    description: "Full visibility and final MVP approval authority."
  },
  {
    id: "support_admin",
    label: "Support Admin",
    description: "AJ Digital system operator and QA/admin access."
  },
  {
    id: "office_admin",
    label: "Office Admin",
    description: "Internal intake, scheduling, documentation, and follow-up."
  },
  {
    id: "dispatcher",
    label: "Dispatcher",
    description: "Dispatch and assignment workflow visibility."
  },
  {
    id: "finance",
    label: "Finance",
    description: "Invoice readiness, payouts, and financial review."
  },
  {
    id: "lead_installer",
    label: "Lead Installer",
    description: "Crew lead visibility into assigned work."
  },
  {
    id: "contractor",
    label: "Contractor",
    description: "Assigned jobs only in the contractor portal."
  },
  {
    id: "client",
    label: "Client",
    description: "Future client access placeholder only."
  },
  {
    id: "ai_agent",
    label: "AI Agent",
    description: "Future agent context boundary placeholder."
  }
] as const;

export type MockRoleId = (typeof mockRoles)[number]["id"];

export const mockLoginAccounts = [
  {
    id: "platform",
    label: "Platform Login",
    tenantLabel: "Platform",
    email: "dev@ajdigital.app",
    roleId: "support_admin",
    description: "AJ Digital platform/operator preview."
  },
  {
    id: "admin",
    label: "Admin Login",
    tenantLabel: "Admin",
    email: "audiojones@ajdigital.app",
    roleId: "office_admin",
    description: "Office/admin workflow preview."
  },
  {
    id: "contractor",
    label: "Contractor Login",
    tenantLabel: "Contractor",
    email: "bookaudiojones@gmail.com",
    roleId: "contractor",
    description: "Assigned contractor portal preview."
  }
] as const satisfies readonly {
  id: string;
  label: string;
  tenantLabel: string;
  email: string;
  roleId: MockRoleId;
  description: string;
}[];

export type MockLoginAccountId = (typeof mockLoginAccounts)[number]["id"];
