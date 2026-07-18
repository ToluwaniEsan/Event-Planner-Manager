"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useCareerMode } from "@/components/ModeProvider";

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
  const { mode } = useCareerMode();
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

  const distance = variant === "soft" ? 12 : 20;
  const hiddenTransform =
    mode === "engineering"
      ? `translateX(${distance}px) scale(0.99)`
      : `translateY(${distance}px) scale(0.985)`;
  const duration = mode === "engineering" ? "0.55s" : "0.72s";
  const easing =
    mode === "engineering"
      ? "cubic-bezier(0.16, 1, 0.3, 1)"
      : "cubic-bezier(0.22, 1, 0.36, 1)";
  const style: CSSProperties = {
    transitionDelay: delay ? `${delay}ms` : undefined,
    transform: on ? "translate3d(0, 0, 0) scale(1)" : hiddenTransform,
    opacity: on ? 1 : 0,
    filter: on ? "blur(0)" : mode === "engineering" ? "blur(3px)" : "blur(1px)",
    transition: `opacity ${duration} ${easing}, transform ${duration} ${easing}, filter ${duration} ${easing}`,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
