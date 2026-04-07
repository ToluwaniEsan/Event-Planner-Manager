import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { VendorProfile } from "@/components/vendors/VendorProfile";
import { getVendorById } from "@/lib/vendors";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vendor = getVendorById(id);
  if (!vendor) {
    return { title: "Vendor not found — Event Planner" };
  }
  return {
    title: `${vendor.name} — Event Planner`,
    description: vendor.blurb,
  };
}

export default async function VendorProfilePage({ params }: Props) {
  const { id } = await params;
  const vendor = getVendorById(id);
  if (!vendor) notFound();

  return (
    <DashboardShell>
      <div className="min-h-full bg-white font-sans dark:bg-zinc-900">
        <VendorProfile vendor={vendor} />
      </div>
    </DashboardShell>
  );
}
