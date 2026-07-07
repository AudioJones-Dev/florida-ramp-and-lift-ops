import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { AppShell } from "@/components/app-shell";

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  await auth.protect();

  return (
    <Suspense fallback={<div className="p-6">Loading dashboard...</div>}>
      <AppShell>{children}</AppShell>
    </Suspense>
  );
}
