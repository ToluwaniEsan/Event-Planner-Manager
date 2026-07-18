"use client";

import { useEffect, useState } from "react";

export type RailSection = {
  id: string;
  label: string;
};

type SectionRailProps = {
  sections: RailSection[];
};

/**
 * Fixed left-edge progress rail (desktop only): a pip per section,
 * with the active section highlighted and its label revealed.
 */
export function SectionRail({ sections }: SectionRailProps) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 min-[1450px]:flex"
      aria-label="Section progress"
    >
      {sections.map((section) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group/rail flex items-center gap-2.5"
          >
            <span
              className={`h-[7px] w-[7px] shrink-0 rounded-full transition-all duration-300 ${
                isActive
                  ? "scale-[1.45] bg-primary"
                  : "bg-[var(--border)] group-hover/rail:bg-faint"
              }`}
              aria-hidden
            />
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.08em] transition-all duration-300 ${
                isActive
                  ? "translate-x-0 text-foreground opacity-100"
                  : "-translate-x-1.5 text-faint opacity-0 group-hover/rail:translate-x-0 group-hover/rail:opacity-100"
              }`}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </aside>
  );
}
