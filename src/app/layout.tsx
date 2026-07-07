import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FLR Operational Intelligence Platform",
  description: "Mock-only MVP scaffold for Florida Ramp & Lift operations."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
