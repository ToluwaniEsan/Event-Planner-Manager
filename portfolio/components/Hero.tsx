"use client";

import Image from "next/image";
import { FileDown } from "lucide-react";
import {
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { CountUp } from "@/components/CountUp";
import { MagneticLink } from "@/components/MagneticLink";
import { useReducedMotion } from "@/components/useReducedMotion";
import { PAGE_CONTAINER } from "@/lib/site-layout";

type HeroStat = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
};

type HeroProps = {
  name: string;
  headline: string;
  bio: string;
  eyebrow: string;
  avatar?: string;
  resumePdf?: string;
  modeShortLabel: string;
  location?: string;
  stats: HeroStat[];
};

type MeshBlob = {
  x: number;
  y: number;
  r: number;
  alpha: number;
  useAccent: boolean;
  sx: number;
  sy: number;
  ox: number;
  oy: number;
};

function makeBlobs(): MeshBlob[] {
  return [
    { x: 0.2, y: 0.3, r: 0.35, alpha: 0.1, useAccent: true, sx: 0.00006, sy: 0.00004, ox: 0, oy: 0 },
    { x: 0.75, y: 0.25, r: 0.28, alpha: 0.07, useAccent: true, sx: -0.00005, sy: 0.00005, ox: 0, oy: 0 },
    { x: 0.55, y: 0.7, r: 0.32, alpha: 0.05, useAccent: false, sx: 0.00004, sy: -0.00005, ox: 0, oy: 0 },
  ];
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .toUpperCase();
}

/** Splits the headline at its first separator so the tail can carry the accent color. */
function splitHeadline(headline: string): [string, string | null] {
  const sep = " \u00b7 ";
  const at = headline.indexOf(sep);
  if (at === -1) return [headline, null];
  return [headline.slice(0, at + sep.length), headline.slice(at + sep.length)];
}

export function Hero({
  name,
  headline,
  bio,
  eyebrow,
  avatar,
  resumePdf,
  modeShortLabel,
  location,
  stats,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.4, active: false });
  const reduceMotion = useReducedMotion();

  /* Cursor-reactive mesh gradient canvas. */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const blobs = makeBlobs();
    const pointer = pointerRef.current;
    let t = 0;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };

    const cssTriplet = (nameVar: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(nameVar).trim() || fallback;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const glow = cssTriplet("--accent-glow", "54, 82, 246");
      const neutral = cssTriplet("--mesh-neutral", "11, 18, 32");
      for (const b of blobs) {
        let tx = 0;
        let ty = 0;
        if (pointer.active) {
          tx = (pointer.x - b.x) * 0.12;
          ty = (pointer.y - b.y) * 0.12;
        }
        b.ox += (tx - b.ox) * 0.03;
        b.oy += (ty - b.oy) * 0.03;
        const bx = (b.x + Math.sin(t * b.sx * 1000) * 0.03 + b.ox) * w;
        const by = (b.y + Math.cos(t * b.sy * 1000) * 0.03 + b.oy) * h;
        const color = `rgba(${b.useAccent ? glow : neutral}, ${b.alpha})`;
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, b.r * w);
        grad.addColorStop(0, color);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bx, by, b.r * w, 0, Math.PI * 2);
        ctx.fill();
      }
      t += 1;
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    pointerRef.current.x = px;
    pointerRef.current.y = py;
    pointerRef.current.active = true;
    section.classList.add("hero-pointer-on");
    section.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
    section.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);

    /* Portrait tilt + sheen tracking. */
    const frame = frameRef.current;
    if (frame && !reduceMotion) {
      const fr = frame.getBoundingClientRect();
      const fx = (e.clientX - fr.left) / fr.width;
      const fy = (e.clientY - fr.top) / fr.height;
      const cx = Math.max(-1, Math.min(2, fx));
      const cy = Math.max(-1, Math.min(2, fy));
      const ry = (cx - 0.5) * 7;
      const rx = (0.5 - cy) * 7;
      frame.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      frame.style.setProperty("--px", `${(Math.max(0, Math.min(1, fx)) * 100).toFixed(1)}%`);
      frame.style.setProperty("--py", `${(Math.max(0, Math.min(1, fy)) * 100).toFixed(1)}%`);
    }
  };

  const onPointerLeave = () => {
    pointerRef.current.active = false;
    sectionRef.current?.classList.remove("hero-pointer-on");
    if (frameRef.current) frameRef.current.style.transform = "";
  };

  const [headlineLead, headlineAccent] = splitHeadline(headline);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-[var(--border)]"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-55"
        aria-hidden
      />
      <div className="hero-spotlight" aria-hidden />

      <div className={`relative ${PAGE_CONTAINER} py-14 sm:py-16 lg:py-24`}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="hero-animate hero-animate-1 mb-6 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5">
              <span className="text-[13px] font-semibold text-primary">{eyebrow}</span>
            </div>

            <div className="hero-animate hero-animate-2 mb-6 flex flex-wrap items-center gap-3.5">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                Viewing through
              </span>
              <ModeToggle />
            </div>

            <h1 className="hero-animate hero-animate-3 max-w-3xl text-4xl font-extrabold leading-[1.06] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-[3.4rem]">
              {headlineLead}
              {headlineAccent ? <span className="text-primary">{headlineAccent}</span> : null}
            </h1>

            <p
              key={bio}
              className="hero-animate hero-animate-4 mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted lg:text-lg"
            >
              {bio}
            </p>

            <div className="hero-animate hero-animate-5 mt-9 flex flex-wrap items-center gap-3.5">
              <MagneticLink
                href="/projects"
                ripple
                className="gap-2 rounded-lg bg-button px-6 py-3.5 text-sm font-semibold text-on-button hover:bg-primary hover:text-on-accent hover:shadow-[0_12px_24px_-8px_rgba(var(--accent-glow),0.4)]"
              >
                View my work {"\u2192"}
              </MagneticLink>
              <MagneticLink
                href="/contact"
                className="rounded-lg border border-[var(--border)] px-6 py-3.5 text-sm font-semibold text-foreground hover:border-foreground hover:bg-surface"
              >
                Get in touch
              </MagneticLink>
              {resumePdf ? (
                <a
                  href={resumePdf}
                  className="inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileDown className="h-4 w-4" aria-hidden />
                  {"R\u00e9sum\u00e9 PDF"}
                </a>
              ) : null}
            </div>
          </div>

          {avatar ? (
            <div className="lg:col-span-5">
              <figure className="hero-animate hero-animate-4 relative mx-auto w-[min(340px,78vw)] lg:ml-auto lg:mr-0">
                <div className="portrait-halo" aria-hidden />
                <div
                  ref={frameRef}
                  className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-surface shadow-[0_32px_64px_-32px_rgba(var(--shadow),0.4)] transition-transform duration-300 ease-out will-change-transform"
                >
                  <Image
                    src={avatar}
                    alt={`${name}, professional headshot`}
                    width={680}
                    height={850}
                    className="aspect-[4/5] w-full object-cover"
                    priority
                  />
                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl border border-[rgba(var(--accent-glow),0.4)]"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute left-3.5 top-3.5 rounded-md bg-[rgba(11,18,32,0.55)] px-2.5 py-1.5 font-mono text-[10px] tracking-[0.1em] text-white backdrop-blur-sm"
                    aria-hidden
                  >
                    {initials(name)}
                  </div>
                </div>
                <figcaption className="absolute -bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border)] bg-background px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-muted shadow-[0_10px_24px_-12px_rgba(var(--shadow),0.35)]">
                  <span className="pulse-dot h-[7px] w-[7px] shrink-0 rounded-full bg-primary" aria-hidden />
                  {modeShortLabel} lens{location ? ` \u00b7 ${location}` : ""}
                </figcaption>
              </figure>
            </div>
          ) : null}
        </div>

        {stats.length ? (
          <dl className="hero-animate hero-animate-5 mt-16 grid overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] gap-px sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-6 transition-colors duration-300 hover:bg-surface">
                <dd className="text-[2rem] font-extrabold tracking-[-0.02em] text-foreground">
                  <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                </dd>
                <dt className="mt-1.5 text-[12.5px] font-medium text-faint">{stat.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
