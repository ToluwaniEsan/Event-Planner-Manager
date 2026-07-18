"use client";

import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { SkillChips } from "@/components/SkillChips";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectCard } from "@/components/ProjectCard";
import { GithubRepoCard } from "@/components/GithubRepoCard";
import { Reveal } from "@/components/Reveal";
import { HonorPeekCard } from "@/components/HonorPeekCard";
import { CredentialsSection } from "@/components/CredentialsSection";
import { MetricsBand, type Metric } from "@/components/MetricsBand";
import { Ticker } from "@/components/Ticker";
import { SectionRail } from "@/components/SectionRail";
import { MagneticLink } from "@/components/MagneticLink";
import { useCareerMode } from "@/components/ModeProvider";
import type { ModePresentation, Profile } from "@/data/profile";
import type { GitHubRepo } from "@/lib/github";
import { PAGE_CONTAINER } from "@/lib/site-layout";
import {
  CAREER_MODE_SHORT_LABELS,
  DEFAULT_CAREER_MODE,
  type CareerMode,
} from "@/lib/mode";
import Link from "next/link";

type HomeExperienceProps = {
  profile: Profile;
  modes: Record<CareerMode, ModePresentation>;
  featuredGithub: GitHubRepo[];
  showGithubWarning: boolean;
};

const RAIL_SECTIONS = [
  { id: "about", label: "About" },
  { id: "background", label: "Background" },
  { id: "projects", label: "Projects" },
  { id: "impact", label: "Impact" },
  { id: "skills", label: "Skills" },
  { id: "honors", label: "Honors" },
  { id: "credentials", label: "Credentials" },
  { id: "cta", label: "Contact" },
];

/* Verified numbers surfaced across profile.ts copy. */
const HERO_STATS = [
  { value: 3.96, decimals: 2, label: "GPA \u00b7 Honors Program, AAMU" },
  { value: 4, label: "Systems shipped \u0026 documented" },
  { value: 100, suffix: "+", label: "Tutoring sessions delivered" },
];

const IMPACT_METRICS: Metric[] = [
  {
    value: 99.9,
    decimals: 1,
    suffix: "%",
    label: "Uptime sustained over a 2-week load test \u2014 MediLink Africa",
  },
  {
    value: 200,
    label: "Simulated concurrent users benchmarked for the data model",
  },
  {
    value: 30,
    suffix: "%",
    label: "Referral time cut by system documentation \u0026 runbook",
  },
  {
    value: 90,
    suffix: "%+",
    label: "Tutoring satisfaction across 100+ sessions",
  },
];

const HERO_EYEBROW =
  "Honors CS \u00b7 Alabama A\u0026M \u00b7 GPA 3.96 \u00b7 Class of 2027";

export function HomeExperience({
  profile,
  modes,
  featuredGithub,
  showGithubWarning,
}: HomeExperienceProps) {
  const { mode, mounted } = useCareerMode();
  const activeMode = mounted ? mode : DEFAULT_CAREER_MODE;
  const content = modes[activeMode];
  const featuredManual = content.manualProjects.filter((p) => p.featured);
  const modeCertificates = profile.certificates.filter((credential) =>
    activeMode === "product"
      ? credential.title !== "CodePath TIP101"
      : credential.title !== "Leland Product Management Bootcamp",
  );
  const modeGithubRepos = activeMode === "engineering" ? featuredGithub : [];

  return (
    <div key={activeMode} className="mode-transition-shell">
      <SectionRail sections={RAIL_SECTIONS} />

      <Hero
        name={profile.identity.name}
        headline={content.headline}
        bio={content.bio}
        eyebrow={HERO_EYEBROW}
        avatar={profile.identity.avatar}
        resumePdf={profile.links.resumePdf}
        modeShortLabel={CAREER_MODE_SHORT_LABELS[activeMode]}
        location="Huntsville, AL"
        stats={HERO_STATS}
      />

      <Ticker modes={modes} />

      <Section
        id="about"
        num="01"
        eyebrow="About"
        title={content.aboutTitle}
        note={profile.identity.location}
        className="bg-surface"
      >
        <div className="grid items-start gap-10 xl:grid-cols-12 xl:gap-14">
          <Reveal className="xl:col-span-7">
            <p className="text-base leading-[1.85] text-muted lg:text-lg lg:leading-[1.85]">
              {content.about}
            </p>
          </Reveal>
          <Reveal delay={120} variant="soft" className="xl:col-span-5">
            <aside className="rounded-xl border border-[var(--border)] bg-background p-2">
              <p className="px-4 pb-1.5 pt-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                At a glance
              </p>
              <ul>
                {content.glance.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] px-4 py-4 transition-[background-color,padding-left] duration-200 last:border-b-0 hover:bg-surface hover:pl-5 motion-reduce:transition-none"
                  >
                    <span className="shrink-0 font-mono text-[11.5px] font-medium text-faint">
                      {item.label}
                    </span>
                    <span className="text-right text-[13.5px] font-semibold leading-relaxed text-foreground">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </Section>

      <Section
        id="background"
        num="02"
        eyebrow="Background"
        title={"Experience \u0026 education"}
        note="Every number below is from the resume."
        dense
      >
        <div className="grid gap-12 xl:grid-cols-2 xl:gap-14">
          <Reveal>
            <div>
              <h3 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
                Experience
              </h3>
              <ExperienceTimeline entries={content.experience} />
            </div>
          </Reveal>
          <Reveal delay={100} variant="soft">
            <div>
              <h3 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
                Education
              </h3>
              <ul className="space-y-5">
                {profile.education.map((e) => (
                  <li
                    key={e.school}
                    className="theme-card rounded-xl border border-[var(--border)] bg-background p-6 transition-colors hover:border-primary sm:p-7"
                  >
                    <p className="font-mono text-xs font-medium text-primary" aria-hidden>
                      {"\u2192"}
                    </p>
                    <h4 className="mt-2 text-base font-bold tracking-[-0.01em] text-foreground">
                      {e.school}
                    </h4>
                    <p className="mt-1 text-sm font-medium text-primary">{e.degree}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.04em] text-faint">
                      {e.start} {"\u2014"} {e.end}
                    </p>
                    <ul className="mt-3">
                      {e.highlights.map((h) => (
                        <li
                          key={h}
                          className="border-t border-dashed border-[var(--border)] py-2.5 text-sm leading-relaxed text-muted"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section
        id="projects"
        num="03"
        eyebrow={content.projectsEyebrow}
        title="Systems, fully documented."
        note="One throughline: reduce the distance between a problem and the person who can act on it."
        className="bg-surface"
      >
        {activeMode === "engineering" && showGithubWarning ? (
          <Reveal>
            <p className="theme-surface mb-6 rounded-xl border border-[var(--border)] bg-accent-soft px-4 py-3 text-sm text-foreground">
              Could not load repositories from GitHub right now. Showing manual highlights only
              {" \u2014 "}try again later or visit{" "}
              <a href={profile.links.github} className="font-medium underline">
                GitHub
              </a>
              .
            </p>
          </Reveal>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          {featuredManual.map((p, i) => (
            <Reveal key={`${activeMode}-${p.title}`} delay={i * 90} className="h-full">
              <ProjectCard project={p} index={i + 1} total={featuredManual.length} />
            </Reveal>
          ))}
        </div>

        {modeGithubRepos.length ? (
          <>
            <Reveal delay={100}>
              <h3 className="mb-5 mt-12 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
                From GitHub
              </h3>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {modeGithubRepos.map((r, i) => (
                <Reveal key={r.id} delay={i * 70} className="h-full">
                  <GithubRepoCard repo={r} />
                </Reveal>
              ))}
            </div>
          </>
        ) : null}

        <Reveal delay={140}>
          <p className="mt-9 text-sm text-muted">
            <Link
              href="/projects"
              className="border-b border-[var(--border)] pb-0.5 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Browse the full project archive {"\u2192"}
            </Link>
          </p>
        </Reveal>
      </Section>

      <MetricsBand
        id="impact"
        num="04"
        eyebrow="Impact"
        title="In numbers."
        note="The measurable side of the work above: benchmarked, load-tested, or peer-evaluated."
        metrics={IMPACT_METRICS}
      />

      <Section
        id="skills"
        num="05"
        eyebrow="Toolkit"
        title={content.skillsTitle}
        note="Switch the lens above: the toolkit reorders around how you'd work with me."
      >
        <Reveal>
          <SkillChips groups={content.skills} />
        </Reveal>
      </Section>

      <Section
        id="honors"
        num="06"
        eyebrow="Recognition"
        title={"Awards \u0026 honors"}
        note="Academic distinctions alongside research, tutoring, and delivery work."
        className="bg-surface"
        dense
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.honorsLeadership.map((h, i) => (
            <Reveal key={h.title} delay={i * 90} className="h-full">
              <HonorPeekCard title={h.title} detail={h.detail} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="credentials"
        num="07"
        eyebrow="Proof"
        title="On the record."
        note="Certificates open in an inline viewer."
        dense
      >
        <CredentialsSection certificates={modeCertificates} />
      </Section>

      <section id="cta" className="scroll-mt-24 py-14 sm:py-20">
        <div className={PAGE_CONTAINER}>
          <Reveal>
            <div className="relative overflow-hidden rounded-[20px] bg-band px-8 py-16 text-center text-band-ink sm:px-12">
              <div
                className="pointer-events-none absolute inset-0 [background:radial-gradient(700px_circle_at_50%_-10%,rgba(var(--accent-glow),0.22),transparent_60%)]"
                aria-hidden
              />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-[1.15] tracking-[-0.02em] sm:text-4xl">
                  {content.ctaTitle}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-band-muted">
                  {content.ctaBody}
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
                  <MagneticLink
                    href="/contact"
                    ripple
                    className="rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-on-accent hover:brightness-110"
                  >
                    Get in touch
                  </MagneticLink>
                  {profile.links.resumePdf ? (
                    <MagneticLink
                      href={profile.links.resumePdf}
                      external
                      className="rounded-lg border border-white/20 px-6 py-3.5 text-sm font-semibold text-band-ink hover:bg-white/[0.07]"
                    >
                      {"R\u00e9sum\u00e9"}
                    </MagneticLink>
                  ) : null}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
