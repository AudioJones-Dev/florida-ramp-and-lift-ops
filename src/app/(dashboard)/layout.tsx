import { Suspense } from "react";
import { AppShell } from "@/components/app-shell";

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div className="p-6">Loading dashboard...</div>}>
      <AppShell>{children}</AppShell>
    </Suspense>
  );
}
