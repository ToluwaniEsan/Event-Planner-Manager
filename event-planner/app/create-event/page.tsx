import { CreateEventWizard } from "@/components/create-event/CreateEventWizard";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function CreateEventPage() {
  return (
    <DashboardShell>
      <div className="min-h-full bg-white font-sans dark:bg-zinc-900">
        <CreateEventWizard />
      </div>
    </DashboardShell>
  );
}
