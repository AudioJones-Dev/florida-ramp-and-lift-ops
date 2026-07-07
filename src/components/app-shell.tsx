"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { navigationItems } from "@/lib/navigation";
import { mockLoginAccounts, mockRoles, type MockRoleId } from "@/lib/roles";
import { Button } from "@/components/ui/button";

function getInitialRole(): MockRoleId {
  if (typeof window === "undefined") {
    return "owner";
  }

  const params = new URLSearchParams(window.location.search);
  const requestedAccount = params.get("account");
  const accountRole = mockLoginAccounts.find((account) => account.id === requestedAccount)?.roleId;
  if (accountRole) {
    return accountRole;
  }

  const requestedRole = params.get("role");
  const validRole = mockRoles.find((role) => role.id === requestedRole);
  return validRole?.id ?? "owner";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isLoaded, user } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedAccount = searchParams.get("account");
  const requestedRole = searchParams.get("role");
  const requestedAccountRole = mockLoginAccounts.find(
    (account) => account.id === requestedAccount
  )?.roleId;
  const initialRole =
    requestedAccountRole ??
    mockRoles.find((item) => item.id === requestedRole)?.id ??
    getInitialRole();
  const [role, setRole] = useState<MockRoleId>(initialRole);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeRole = mockRoles.find((item) => item.id === role) ?? mockRoles[0];
  const activeAccount =
    mockLoginAccounts.find(
      (account) => account.id === requestedAccount && account.roleId === role
    ) ??
    mockLoginAccounts.find((account) => account.roleId === role);
  const activeAccountQuery = activeAccount ? `&account=${activeAccount.id}` : "";
  const accountEmail =
    isLoaded && user?.primaryEmailAddress?.emailAddress
      ? user.primaryEmailAddress.emailAddress
      : activeAccount?.email;
  const visibleItems = useMemo(
    () =>
      navigationItems.filter((item) =>
        item.roles.length === 0 ? true : item.roles.includes(role)
      ),
    [role]
  );

  function updateRole(nextRole: MockRoleId) {
    setRole(nextRole);
    const url = new URL(window.location.href);
    const matchingAccount = mockLoginAccounts.find((account) => account.roleId === nextRole);
    url.searchParams.set("role", nextRole);
    if (matchingAccount) {
      url.searchParams.set("account", matchingAccount.id);
    } else {
      url.searchParams.delete("account");
    }
    window.history.replaceState({}, "", url);
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 border-r bg-white px-4 py-5 transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-[var(--primary)] text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold">Florida Ramp & Lift</div>
            <div className="text-xs text-[var(--muted-foreground)]">Operational Intelligence</div>
          </div>
        </div>
        <nav className="mt-7 space-y-1">
          {visibleItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={`${item.href}?role=${role}${activeAccountQuery}`}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                  active
                    ? "bg-[var(--secondary)] font-semibold text-[var(--secondary-foreground)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b bg-white/95 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                aria-label="Open navigation"
                className="lg:hidden"
                size="icon"
                variant="secondary"
                onClick={() => setMobileOpen((value) => !value)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <div className="text-xs font-medium uppercase text-[var(--muted-foreground)]">
                  Mock role
                </div>
                <div className="text-sm font-semibold">{activeRole.label}</div>
                {accountEmail ? (
                  <div className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                    {accountEmail}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <span className="hidden text-[var(--muted-foreground)] sm:inline">
                  Preview as
                </span>
                <select
                  className="h-10 rounded-md border bg-white px-3 text-sm outline-none ring-[var(--ring)] focus:ring-2"
                  value={role}
                  onChange={(event) => updateRole(event.target.value as MockRoleId)}
                >
                  {mockRoles.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <UserButton />
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
