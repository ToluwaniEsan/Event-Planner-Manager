import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ChatPanel } from "@/components/messages/ChatPanel";

export default function MessagesPage() {
  return (
    <DashboardShell>
      <div className="min-h-full bg-white font-sans dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold tracking-tight">Messages</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Simple chat between a user and a vendor, backed by your database.
          </p>
          <div className="mt-8">
            <ChatPanel />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
