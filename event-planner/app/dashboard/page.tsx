import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  Building2,
  Music,
  PartyPopper,
  Sparkles,
  Star,
  UtensilsCrossed,
} from "lucide-react";

const categories = [
  {
    title: "Venue",
    description: "Spaces, halls, and outdoor locations for any size.",
    icon: Building2,
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    title: "Catering",
    description: "Menus, chefs, and dietary options your guests will love.",
    icon: UtensilsCrossed,
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    title: "Music",
    description: "DJs, bands, and sound for the right vibe.",
    icon: Music,
    accent: "from-sky-500/20 to-blue-500/10",
  },
  {
    title: "Activities",
    description: "Games, photo booths, and memorable experiences.",
    icon: Sparkles,
    accent: "from-emerald-500/20 to-teal-500/10",
  },
] as const;

const popularVendors = [
  {
    name: "Harbor Lights Venue",
    category: "Venue",
    rating: 4.9,
    gradient: "from-violet-600 to-indigo-600",
  },
  {
    name: "Bloom & Feast Catering",
    category: "Catering",
    rating: 4.8,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    name: "Nightwave DJs",
    category: "Music",
    rating: 5.0,
    gradient: "from-sky-500 to-cyan-600",
  },
  {
    name: "Snap & Smile Photo",
    category: "Activities",
    rating: 4.7,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Garden Estate",
    category: "Venue",
    rating: 4.9,
    gradient: "from-fuchsia-600 to-pink-600",
  },
  {
    name: "Urban Bites Co.",
    category: "Catering",
    rating: 4.6,
    gradient: "from-rose-500 to-red-600",
  },
] as const;

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="min-h-full bg-white dark:bg-zinc-900">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <header className="mb-8 sm:mb-10">
            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300">
              <PartyPopper className="size-3.5" aria-hidden />
              Your events at a glance
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 max-w-xl text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              Plan vendors, stay on budget, and keep every detail in one place.
            </p>
          </header>

          <section aria-labelledby="categories-heading" className="mb-10 sm:mb-12">
            <h2 id="categories-heading" className="sr-only">
              Vendor categories
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.title}
                    type="button"
                    className="group flex flex-col rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 text-left transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/40 dark:hover:border-zinc-600"
                  >
                    <div
                      className={`mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.accent} dark:from-white/10 dark:to-white/5`}
                    >
                      <Icon className="size-6 text-zinc-800 dark:text-zinc-100" aria-hidden />
                    </div>
                    <h3 className="font-semibold text-foreground">{cat.title}</h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {cat.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section aria-labelledby="popular-heading">
            <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="popular-heading" className="text-lg font-semibold tracking-tight sm:text-xl">
                Popular Vendors
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Highly rated picks in your area
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {popularVendors.map((v) => (
                <article
                  key={v.name}
                  className="overflow-hidden rounded-xl border border-zinc-200 bg-background shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/30"
                >
                  <div
                    className={`flex h-28 items-end bg-gradient-to-br p-4 ${v.gradient}`}
                    aria-hidden
                  >
                    <span className="text-sm font-medium text-white/95">{v.category}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{v.name}</h3>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400">
                        <Star className="size-4 fill-current" aria-hidden />
                        <span className="font-medium tabular-nums">{v.rating}</span>
                        <span className="sr-only">out of 5 stars</span>
                      </span>
                      <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                        View
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
