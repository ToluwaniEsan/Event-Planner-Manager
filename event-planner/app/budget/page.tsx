import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BudgetTracker } from "@/components/budget/BudgetTracker";

export default function BudgetPage() {
  return (
    <DashboardShell>
      <div className="min-h-full bg-white font-sans dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold tracking-tight">Budget</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Track event budget versus booking spend.
          </p>
          <div className="mt-8">
            <BudgetTracker />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
