"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/useReducedMotion";

type CountUpProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
  suffixClassName?: string;
};

/** Number that counts up from 0 when it scrolls into view. */
export function CountUp({
  value,
  decimals = 0,
  suffix,
  duration = 1200,
  className = "",
  suffixClassName = "text-primary",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || reduceMotion) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, reduceMotion, value, duration]);

  const shown = reduceMotion ? value : started ? display : 0;

  return (
    <span ref={ref} className={className}>
      {shown.toFixed(decimals)}
      {suffix ? <span className={suffixClassName}>{suffix}</span> : null}
    </span>
  );
}
