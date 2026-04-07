"use client";

const signals = [
  {
    title: "Long horizon",
    body: "I prioritize what people will still need years from now—not just what ships this sprint.",
  },
  {
    title: "Durable platforms",
    body: "Systems that stay maintainable, observable, and evolvable as requirements change.",
  },
  {
    title: "Needs over novelty",
    body: "Depth on real problems beats chasing trends. I invest where impact compounds.",
  },
] as const;

export function HeroSignalPanel() {
  return (
    <div className="grid gap-3 sm:gap-4">
      {signals.map((s, i) => (
        <div
          key={s.title}
          className="theme-card group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-surface/70 p-4 shadow-sm backdrop-blur-sm hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg dark:hover:border-highlight/40"
          style={{ animationDelay: `${120 + i * 90}ms` }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
            aria-hidden
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/15 blur-2xl dark:bg-highlight/10" />
          </div>
          <p className="relative text-xs font-semibold uppercase tracking-widest text-primary">{s.title}</p>
          <p className="relative mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
        </div>
      ))}
    </div>
  );
}
