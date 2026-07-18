import type { SkillGroup } from "@/data/profile";

type SkillChipsProps = {
  groups: SkillGroup[];
};

/**
 * Ruled skill-group columns: monospace group headers and bordered list rows
 * whose square bullet flips to the accent color on hover.
 */
export function SkillChips({ groups }: SkillChipsProps) {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
      {groups.map((group) => (
        <div key={group.title} className="bg-background p-7 transition-colors duration-300">
          <h3 className="mb-4 font-mono text-[11.5px] font-semibold uppercase tracking-[0.08em] text-primary">
            {group.title}
          </h3>
          <ul>
            {group.items.map((item) => (
              <li
                key={item}
                className="group/skill flex items-center gap-2.5 border-b border-[var(--border)] py-2.5 text-sm font-medium text-muted transition-[color,padding-left] duration-200 last:border-b-0 hover:pl-1 hover:text-foreground motion-reduce:transition-none"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 bg-[var(--border)] transition-[background-color,transform] duration-200 group-hover/skill:scale-125 group-hover/skill:bg-primary motion-reduce:transition-none"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
