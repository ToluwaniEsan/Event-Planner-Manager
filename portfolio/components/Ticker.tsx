"use client";

import { useCareerMode } from "@/components/ModeProvider";
import type { ModePresentation } from "@/data/profile";
import { DEFAULT_CAREER_MODE, type CareerMode } from "@/lib/mode";

type TickerProps = {
  modes: Record<CareerMode, ModePresentation>;
};

function tickerItems(presentation: ModePresentation): string[] {
  const seen = new Set<string>();
  const items: string[] = [];
  for (const group of presentation.skills) {
    for (const item of group.items) {
      const key = item.toUpperCase();
      if (!seen.has(key)) {
        seen.add(key);
        items.push(key);
      }
    }
  }
  return items;
}

/**
 * Infinite scrolling monospace strip of lens-specific skills.
 * Pauses on hover; static under prefers-reduced-motion.
 */
export function Ticker({ modes }: TickerProps) {
  const { mode, mounted } = useCareerMode();
  const activeMode = mounted ? mode : DEFAULT_CAREER_MODE;
  const items = tickerItems(modes[activeMode]);

  const run = (keyPrefix: string) =>
    items.map((item) => (
      <span key={`${keyPrefix}-${item}`} className="inline-flex items-center">
        <span className="px-8 font-mono text-xs font-medium tracking-[0.04em] text-faint">
          {item}
        </span>
        <span className="text-primary" aria-hidden>
          {"\u2022"}
        </span>
      </span>
    ));

  return (
    <div
      key={activeMode}
      className="ticker overflow-hidden whitespace-nowrap border-y border-[var(--border)] bg-surface py-5"
      aria-hidden
    >
      <div className="ticker-track">
        {run("a")}
        {run("b")}
      </div>
    </div>
  );
}
