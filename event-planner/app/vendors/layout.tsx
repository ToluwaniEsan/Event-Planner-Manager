import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor marketplace — Event Planner",
  description: "Discover and filter venues, catering, music, and activities for your event.",
};

export default function VendorsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
