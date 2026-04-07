import type { SkillGroup } from "@/data/profile";

type SkillChipsProps = {
  groups: SkillGroup[];
};

export function SkillChips({ groups }: SkillChipsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {groups.map((group) => (
        <div
          key={group.title}
          className="theme-card group rounded-2xl border border-[var(--border)] bg-surface/50 p-6 shadow-sm backdrop-blur-sm hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg dark:hover:border-highlight/40 sm:col-span-1 lg:col-span-2"
        >
          <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li key={item}>
                <span className="inline-flex rounded-full border border-[var(--border)] bg-background/80 px-3 py-1.5 text-xs font-medium text-muted transition-colors group-hover:border-primary/35 dark:group-hover:border-highlight/35">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
