"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Calendar,
  LayoutDashboard,
  Menu,
  MessageSquare,
  PartyPopper,
  Store,
  Wallet,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Events", icon: Calendar },
  { label: "Vendors", href: "/vendors", icon: Store },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Budget", href: "/budget", icon: Wallet },
] as const;

const linkActiveClass =
  "flex items-center gap-3 rounded-lg bg-zinc-200/70 px-3 py-2.5 text-sm font-medium text-foreground transition-colors dark:bg-zinc-800";

const linkInactiveClass =
  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/80";

function NavList({
  pathname,
  onNavigate,
  className,
}: {
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          if ("href" in item && item.href) {
            const active =
              item.href === "/vendors"
                ? pathname === "/vendors" || pathname.startsWith("/vendors/")
                : pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={active ? linkActiveClass : linkInactiveClass}
                >
                  <Icon className="size-5 shrink-0" aria-hidden />
                  {item.label}
                </Link>
              </li>
            );
          }
          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={onNavigate}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
              >
                <Icon className="size-5 shrink-0" aria-hidden />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-full flex-1 bg-background font-sans">
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-zinc-200 bg-background/95 px-4 backdrop-blur md:hidden dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <PartyPopper className="size-7 text-violet-600 dark:text-violet-400" aria-hidden />
          <span className="text-lg font-semibold tracking-tight">Event Planner</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          aria-expanded={mobileOpen}
          aria-controls="mobile-sidebar"
          aria-label="Open menu"
        >
          <Menu className="size-6" />
        </button>
      </header>

      {/* Mobile overlay */}
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      {/* Sidebar — desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-zinc-200 bg-zinc-50 md:flex dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex h-16 items-center gap-2 border-b border-zinc-200 px-5 dark:border-zinc-800">
          <PartyPopper className="size-8 text-violet-600 dark:text-violet-400" aria-hidden />
          <span className="text-lg font-semibold tracking-tight">Event Planner</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavList pathname={pathname} />
        </div>
      </aside>

      {/* Sidebar — mobile drawer */}
      <aside
        id="mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-zinc-200 bg-zinc-50 shadow-xl transition-transform duration-200 ease-out dark:border-zinc-800 dark:bg-zinc-950 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
          <span className="font-semibold">Menu</span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <NavList pathname={pathname} onNavigate={() => setMobileOpen(false)} />
        </div>
      </aside>

      <main className="min-w-0 flex-1 pt-14 md:pt-0">{children}</main>
    </div>
  );
}
