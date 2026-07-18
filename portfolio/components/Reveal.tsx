"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/components/useReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms (for list items). */
  delay?: number;
  /** Slightly subtler motion for nested elements. */
  variant?: "block" | "soft";
};

/** Scroll reveal: fade + rise once the element enters the viewport. */
export function Reveal({ children, className = "", delay = 0, variant = "block" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [intersected, setIntersected] = useState(false);
  const reduceMotion = useReducedMotion();

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

  const distance = variant === "soft" ? 16 : 26;
  const style: CSSProperties = {
    transitionDelay: delay ? `${delay}ms` : undefined,
    transform: on ? "translateY(0)" : `translateY(${distance}px)`,
    opacity: on ? 1 : 0,
    transition:
      "opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 0.84, 0.44, 1)",
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
