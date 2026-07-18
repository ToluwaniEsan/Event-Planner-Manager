"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "@/components/useReducedMotion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees per axis. Kept small: restraint over spectacle. */
  maxTilt?: number;
};

/**
 * Card wrapper with subtle pointer tilt and an accent glare that tracks the
 * cursor. Mouse-only; inert for touch and under prefers-reduced-motion.
 */
export function TiltCard({ children, className = "", maxTilt = 2 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * maxTilt * 2;
    const ry = (px - 0.5) * maxTilt * 2;
    el.style.transform = `perspective(1400px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
    el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
  };

  const onPointerLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      className={`group relative will-change-transform transition-transform duration-300 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
      <div className="card-glare z-10 rounded-[inherit]" aria-hidden />
    </div>
  );
}
