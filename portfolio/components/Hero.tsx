import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { PAGE_CONTAINER } from "@/lib/site-layout";

type HeroMetric = {
  label: string;
  value: string;
};

type HeroProps = {
  name: string;
  headline: string;
  bio: string;
  avatar?: string;
  resumePdf?: string;
  modeLabel?: string;
  metrics?: HeroMetric[];
};

export function Hero({
  name,
  headline,
  bio,
  avatar,
  resumePdf,
  modeLabel,
  metrics = [],
}: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.7] dark:opacity-50"
        aria-hidden
      >
        <div className="hero-orb hero-orb-a absolute left-[4%] top-[10%] h-[min(440px,48vw)] w-[min(440px,48vw)] rounded-full blur-3xl" />
        <div className="hero-orb hero-orb-b absolute bottom-[6%] right-[2%] h-[min(400px,42vw)] w-[min(400px,42vw)] rounded-full blur-3xl" />
      </div>

      <div className={`relative ${PAGE_CONTAINER} py-14 sm:py-16 lg:py-24`}>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="hero-animate hero-animate-1 mb-5 flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Dual-track portfolio
              </p>
              {modeLabel ? (
                <span className="mode-badge rounded-full border border-[var(--border)] bg-surface/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted backdrop-blur-sm">
                  Viewing · {modeLabel}
                </span>
              ) : null}
            </div>

            <h1 className="hero-animate hero-animate-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl [font-family:var(--font-display),serif]">
              {name}
            </h1>
            <p
              key={headline}
              className="hero-copy hero-animate hero-animate-3 mt-4 max-w-2xl text-pretty text-lg leading-snug text-muted sm:text-xl lg:text-2xl"
            >
              {headline}
            </p>
            <p
              key={bio}
              className="hero-copy hero-animate hero-animate-4 mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/90 lg:text-lg"
            >
              {bio}
            </p>

            <div className="hero-animate hero-animate-5 mt-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                Career lens
              </p>
              <ModeToggle size="md" showFullLabels />
            </div>

            <div className="hero-animate hero-animate-5 mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="theme-btn inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-on-primary shadow-md ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:shadow-lg hover:brightness-105 dark:ring-white/20"
              >
                View projects
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="theme-btn inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-surface/80 px-6 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary dark:border-[color:var(--border-secondary)] dark:hover:border-white/55 dark:hover:text-highlight"
              >
                Get in touch
              </Link>
              {resumePdf ? (
                <a
                  href={resumePdf}
                  className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-highlight hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileDown className="h-4 w-4" aria-hidden />
                  Résumé PDF
                </a>
              ) : null}
            </div>

            {metrics.length ? (
              <dl className="hero-animate hero-animate-5 mt-10 grid gap-3 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="metric-card rounded-2xl border border-[var(--border)] bg-surface/70 p-4 shadow-sm backdrop-blur-sm"
                  >
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                      {metric.label}
                    </dt>
                    <dd className="mt-2 text-sm leading-snug text-muted">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {avatar ? (
              <div className="relative mx-auto mt-12 w-full max-w-sm sm:hidden">
                <Image
                  src={avatar}
                  alt={`${name}, professional headshot`}
                  width={320}
                  height={200}
                  className="h-44 w-full rounded-2xl object-cover shadow-lg ring-1 ring-[var(--border)]"
                  priority
                />
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-8 lg:col-span-5 xl:col-span-5">
            {avatar ? (
              <div className="relative hidden overflow-hidden rounded-3xl shadow-xl ring-1 ring-[var(--border)] sm:block">
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                <Image
                  src={avatar}
                  alt={`${name}, professional headshot`}
                  width={640}
                  height={420}
                  className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.03]"
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-background/70 px-4 py-3 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    GPA 3.96 · PSM I · Honors CS
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Systems design · requirements · product delivery
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
