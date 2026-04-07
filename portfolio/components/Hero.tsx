import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";
import { PAGE_CONTAINER } from "@/lib/site-layout";
import { HeroSignalPanel } from "@/components/HeroSignalPanel";

type HeroProps = {
  name: string;
  headline: string;
  bio: string;
  avatar?: string;
  resumePdf?: string;
};

export function Hero({ name, headline, bio, avatar, resumePdf }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.65] dark:opacity-45"
        aria-hidden
      >
        <div className="absolute left-[5%] top-[12%] h-[min(420px,45vw)] w-[min(420px,45vw)] rounded-full bg-primary/10 blur-3xl dark:bg-primary/15" />
        <div className="absolute bottom-[8%] right-[3%] h-[min(380px,40vw)] w-[min(380px,40vw)] rounded-full bg-highlight/10 blur-3xl dark:bg-highlight/12" />
      </div>

      <div className={`relative ${PAGE_CONTAINER} py-14 sm:py-16 lg:py-24`}>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-7 xl:col-span-7">
            <p className="hero-animate hero-animate-1 mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Portfolio
            </p>
            <h1 className="hero-animate hero-animate-2 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl [font-family:var(--font-display),serif]">
              {name}
            </h1>
            <p className="hero-animate hero-animate-3 mt-4 max-w-2xl text-lg text-muted sm:text-xl lg:text-2xl">
              {headline}
            </p>
            <p className="hero-animate hero-animate-4 mt-6 max-w-2xl text-base leading-relaxed text-foreground/90 lg:text-lg">
              {bio}
            </p>

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

            {avatar ? (
              <div className="relative mx-auto mt-12 h-40 w-full max-w-sm sm:hidden">
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
              <div className="relative hidden overflow-hidden rounded-2xl shadow-xl ring-1 ring-[var(--border)] sm:block">
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                <Image
                  src={avatar}
                  alt={`${name}, professional headshot`}
                  width={640}
                  height={420}
                  className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.03]"
                  priority
                />
              </div>
            ) : null}

            <HeroSignalPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
