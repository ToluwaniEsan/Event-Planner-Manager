import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Event Planner",
  description: "Plan events, manage vendors, and track your budget in one place.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
