"use client";

import { useCareerMode } from "@/components/ModeProvider";
import {
  CAREER_MODE_LABELS,
  CAREER_MODE_SHORT_LABELS,
  CAREER_MODES,
  type CareerMode,
} from "@/lib/mode";

type ModeToggleProps = {
  size?: "sm" | "md";
  className?: string;
  showFullLabels?: boolean;
};

export function ModeToggle({
  size = "sm",
  className = "",
  showFullLabels = false,
}: ModeToggleProps) {
  const { mode, setMode, mounted } = useCareerMode();

  if (!mounted) {
    const skeletonSize =
      size === "md"
        ? showFullLabels
          ? "h-[2.625rem] min-w-[20rem]"
          : "h-[2.625rem] min-w-[11rem]"
        : showFullLabels
          ? "h-9 min-w-[16rem]"
          : "h-9 min-w-[9.5rem]";
    return (
      <span
        className={`inline-flex max-w-full shrink-0 animate-pulse rounded-full border border-[var(--border)] bg-surface/60 ${skeletonSize} ${className}`}
        aria-hidden
      />
    );
  }

  const pad = "p-1";
  const btn =
    size === "md"
      ? "px-4 py-2 text-xs"
      : "px-3 py-1.5 text-[11px]";

  return (
    <div
      role="group"
      aria-label="Career focus"
      data-active-mode={mode}
      className={`mode-toggle relative inline-grid grid-cols-2 ${pad} rounded-full border border-[var(--border)] bg-surface shadow-sm backdrop-blur-sm ${className}`}
    >
      <span className="mode-toggle-indicator" aria-hidden />
      {CAREER_MODES.map((option: CareerMode) => {
        const active = mode === option;
        const label = showFullLabels
          ? CAREER_MODE_LABELS[option]
          : CAREER_MODE_SHORT_LABELS[option];
        return (
          <button
            key={option}
            type="button"
            onClick={() => setMode(option)}
            aria-pressed={active}
            className={`${btn} relative z-10 whitespace-nowrap rounded-full font-mono font-medium uppercase tracking-[0.03em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
              active ? "text-on-button" : "text-muted hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
