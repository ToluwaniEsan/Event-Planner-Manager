import type { ExperienceEntry } from "@/data/profile";

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
};

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <ol className="relative border-l border-stone-200 pl-6 dark:border-stone-700">
      {entries.map((job) => (
        <li key={`${job.company}-${job.role}-${job.start}`} className="mb-8 last:mb-0">
          <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
          <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{job.role}</h3>
              <p className="text-sm font-medium text-primary">{job.company}</p>
            </div>
            <p className="text-sm text-muted">
              {job.start} – {job.end}
              {job.location ? ` · ${job.location}` : ""}
            </p>
          </div>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
            {job.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
