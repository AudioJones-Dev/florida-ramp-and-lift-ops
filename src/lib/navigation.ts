import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckSquare,
  ClipboardList,
  ClipboardPen,
  FileCheck2,
  FileText,
  FileSpreadsheet,
  Gauge,
  HardHat,
  Home,
  ListChecks,
  Map,
  MessageSquare,
  Settings,
  Truck,
  WalletCards,
  UserRoundSearch,
  Users
} from "lucide-react";
import type { MockRoleId } from "@/lib/roles";

type NavigationItem = {
  href: string;
  label: string;
  icon: typeof Gauge;
  roles: MockRoleId[];
};

const internalRoles: MockRoleId[] = [
  "owner",
  "support_admin",
  "office_admin",
  "dispatcher",
  "finance"
];

export const navigationItems: NavigationItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: Gauge,
    roles: ["owner", "support_admin", "office_admin", "dispatcher", "finance"]
  },
  {
    href: "/executive",
    label: "Executive",
    icon: Home,
    roles: ["owner", "support_admin"]
  },
  {
    href: "/support",
    label: "Support Admin",
    icon: Settings,
    roles: ["support_admin", "owner"]
  },
  {
    href: "/admin",
    label: "Office Admin",
    icon: ClipboardList,
    roles: ["office_admin", "support_admin", "owner"]
  },
  {
    href: "/dispatch",
    label: "Dispatch",
    icon: Truck,
    roles: ["dispatcher", "office_admin", "support_admin", "owner"]
  },
  {
    href: "/queues",
    label: "Queues",
    icon: ListChecks,
    roles: internalRoles
  },
  {
    href: "/demo-scenarios",
    label: "Demo Scenarios",
    icon: Map,
    roles: internalRoles
  },
  {
    href: "/contractor",
    label: "Contractor Portal",
    icon: HardHat,
    roles: ["contractor", "lead_installer", "support_admin", "owner"]
  },
  {
    href: "/jobs/submit",
    label: "Submit Job",
    icon: ClipboardPen,
    roles: ["contractor", "lead_installer", "support_admin", "owner"]
  },
  { href: "/customers", label: "Customers", icon: Users, roles: internalRoles },
  { href: "/leads", label: "Leads", icon: UserRoundSearch, roles: internalRoles },
  { href: "/jobs", label: "Jobs", icon: BriefcaseBusiness, roles: internalRoles },
  { href: "/batches", label: "Batches", icon: Map, roles: internalRoles },
  { href: "/contractors", label: "Contractors", icon: HardHat, roles: internalRoles },
  { href: "/communications", label: "Communications", icon: MessageSquare, roles: internalRoles },
  { href: "/documentation", label: "Documentation", icon: FileCheck2, roles: internalRoles },
  { href: "/invoices", label: "Invoices", icon: FileText, roles: ["owner", "support_admin", "finance", "office_admin"] },
  { href: "/contractor-invoices", label: "Contractor Invoices", icon: WalletCards, roles: ["owner", "support_admin", "finance", "office_admin"] },
  { href: "/client-invoices", label: "Client Invoices", icon: FileSpreadsheet, roles: ["owner", "support_admin", "finance", "office_admin"] },
  { href: "/pricing", label: "Pricing", icon: FileSpreadsheet, roles: ["owner", "support_admin", "finance"] },
  { href: "/alerts", label: "Alerts", icon: AlertTriangle, roles: internalRoles },
  { href: "/approvals", label: "Approvals", icon: CheckSquare, roles: ["owner", "support_admin", "finance", "office_admin"] }
];
