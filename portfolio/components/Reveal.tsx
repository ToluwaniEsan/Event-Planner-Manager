"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

function subscribeReducedMotion() {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = () => {};
  mq.addEventListener("change", handler);
  return () => mq.removeEventListener("change", handler);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms (for list items). */
  delay?: number;
  /** Slightly subtler motion for nested elements. */
  variant?: "block" | "soft";
};

export function Reveal({ children, className = "", delay = 0, variant = "block" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [intersected, setIntersected] = useState(false);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const on = reduceMotion || intersected;

  useEffect(() => {
    if (reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setIntersected(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduceMotion]);

  const y = variant === "soft" ? 12 : 20;
  const style: CSSProperties = {
    transitionDelay: delay ? `${delay}ms` : undefined,
    transform: on ? "translateY(0)" : `translateY(${y}px)`,
    opacity: on ? 1 : 0,
    transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
