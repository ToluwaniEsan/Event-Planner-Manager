import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { VendorMarketplace } from "@/components/vendors/VendorMarketplace";

export default function VendorsPage() {
  return (
    <DashboardShell>
      <div className="min-h-full bg-white font-sans dark:bg-zinc-900">
        <VendorMarketplace />
      </div>
    </DashboardShell>
  );
}
