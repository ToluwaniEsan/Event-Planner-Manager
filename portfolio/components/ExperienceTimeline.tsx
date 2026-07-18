import type { ExperienceEntry } from "@/data/profile";

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
};

const INDEX_LETTERS = "ABCDEFGH";

/** Ledger-style experience rows: mono index, role/org, dashed bullet rules. */
export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-background">
      {entries.map((job, i) => (
        <article
          key={`${job.company}-${job.role}-${job.start}`}
          className="border-b border-[var(--border)] px-6 py-6 transition-colors duration-200 last:border-b-0 hover:bg-surface sm:px-7"
        >
          <div className="flex items-start gap-5">
            <span
              className="mt-1 font-mono text-xs font-medium text-primary"
              aria-hidden
            >
              {INDEX_LETTERS[i] ?? i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-base font-bold tracking-[-0.01em] text-foreground">
                    {job.role}
                  </h3>
                  <p className="mt-0.5 text-[13px] text-muted">
                    {job.company}
                    {job.location ? ` \u00b7 ${job.location}` : ""}
                  </p>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.04em] text-faint">
                  {job.start} {"\u2014"} {job.end}
                </p>
              </div>
              <ul className="mt-3">
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    className="relative border-t border-dashed border-[var(--border)] py-2.5 pl-5 text-sm leading-relaxed text-muted"
                  >
                    <span
                      className="absolute left-0 top-[1.05rem] h-[7px] w-[7px] rounded-full bg-primary"
                      aria-hidden
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
