"use client";

import Link from "next/link";
import {
  useRef,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/components/useReducedMotion";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Renders a plain anchor with target=_blank instead of next/link. */
  external?: boolean;
  /** Spawn a click ripple from the cursor position. */
  ripple?: boolean;
  download?: boolean;
  ariaLabel?: string;
};

/**
 * CTA link that leans toward the cursor (magnetic) and optionally emits a
 * click ripple. Mouse-only; inert under prefers-reduced-motion.
 */
export function MagneticLink({
  href,
  children,
  className = "",
  external = false,
  ripple = false,
  download = false,
  ariaLabel,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();

  const onPointerMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${(dx * 0.12).toFixed(1)}px, ${(dy * 0.18).toFixed(1)}px)`;
  };

  const onPointerLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ripple || reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const d = Math.max(rect.width, rect.height);
    const span = document.createElement("span");
    span.className = "cta-ripple";
    span.style.width = `${d}px`;
    span.style.height = `${d}px`;
    span.style.left = `${e.clientX - rect.left - d / 2}px`;
    span.style.top = `${e.clientY - rect.top - d / 2}px`;
    el.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  };

  const cls = `${ripple ? "relative overflow-hidden " : ""}inline-flex items-center will-change-transform transition-[transform,background-color,color,border-color,box-shadow] duration-200 ease-out ${className}`;

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target={download ? undefined : "_blank"}
        rel={download ? undefined : "noopener noreferrer"}
        download={download || undefined}
        aria-label={ariaLabel}
        className={cls}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      className={cls}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
