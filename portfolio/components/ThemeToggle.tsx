"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getServerSnapshot = () => false;
const getClientSnapshot = () => true;

export function ThemeToggle() {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <span
        className="inline-flex h-9 w-9 shrink-0 rounded-full border border-transparent"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="theme-btn group/theme relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] text-muted transition-[border-color,color,transform] duration-300 hover:rotate-12 hover:border-primary hover:text-primary active:scale-90 motion-reduce:transition-none motion-reduce:hover:rotate-0"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <Sun
        className={`absolute h-4 w-4 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] motion-reduce:transition-none ${
          isDark ? "-rotate-90 scale-[0.3] opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
        aria-hidden
      />
      <Moon
        className={`absolute h-4 w-4 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] motion-reduce:transition-none ${
          isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-[0.3] opacity-0"
        }`}
        aria-hidden
      />
    </button>
  );
}
