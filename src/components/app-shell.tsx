"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { navigationItems } from "@/lib/navigation";
import { mockRoles, type MockRoleId } from "@/lib/roles";
import { Button } from "@/components/ui/button";

function getInitialRole(): MockRoleId {
  const requestedRole =
    typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("role");
  const validRole = mockRoles.find((role) => role.id === requestedRole);
  return validRole?.id ?? "owner";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedRole = searchParams.get("role");
  const initialRole = mockRoles.find((item) => item.id === requestedRole)?.id ?? getInitialRole();
  const [role, setRole] = useState<MockRoleId>(initialRole);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeRole = mockRoles.find((item) => item.id === role) ?? mockRoles[0];
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
    url.searchParams.set("role", nextRole);
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
                href={`${item.href}?role=${role}`}
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
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <span className="hidden text-[var(--muted-foreground)] sm:inline">Preview as</span>
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
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
