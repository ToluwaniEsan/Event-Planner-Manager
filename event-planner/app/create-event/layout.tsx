import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create event — Event Planner",
  description: "Set up your event details, vendors, and budget in a few steps.",
};

export default function CreateEventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
