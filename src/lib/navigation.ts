import {
  AlertTriangle,
  BriefcaseBusiness,
  CheckSquare,
  ClipboardList,
  FileCheck2,
  FileText,
  Gauge,
  HardHat,
  Home,
  ListChecks,
  MessageSquare,
  Settings,
  Truck,
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
    href: "/contractor",
    label: "Contractor Portal",
    icon: HardHat,
    roles: ["contractor", "lead_installer", "support_admin", "owner"]
  },
  { href: "/customers", label: "Customers", icon: Users, roles: internalRoles },
  { href: "/jobs", label: "Jobs", icon: BriefcaseBusiness, roles: internalRoles },
  { href: "/contractors", label: "Contractors", icon: HardHat, roles: internalRoles },
  { href: "/communications", label: "Communications", icon: MessageSquare, roles: internalRoles },
  { href: "/documentation", label: "Documentation", icon: FileCheck2, roles: internalRoles },
  { href: "/invoices", label: "Invoices", icon: FileText, roles: ["owner", "support_admin", "finance", "office_admin"] },
  { href: "/alerts", label: "Alerts", icon: AlertTriangle, roles: internalRoles },
  { href: "/approvals", label: "Approvals", icon: CheckSquare, roles: ["owner", "support_admin", "finance", "office_admin"] }
];
