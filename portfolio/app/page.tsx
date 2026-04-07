import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { SkillChips } from "@/components/SkillChips";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectCardCompact } from "@/components/ProjectCard";
import { GithubRepoCard } from "@/components/GithubRepoCard";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { getPublicRepos } from "@/lib/github";
import {
  filterDuplicateGithubRepos,
  sortReposByStarsThenUpdated,
} from "@/lib/project-merge";
import { PAGE_CONTAINER } from "@/lib/site-layout";
import { HonorPeekCard } from "@/components/HonorPeekCard";
import { CredentialsSection } from "@/components/CredentialsSection";
import Link from "next/link";

export const revalidate = 3600;

export default async function HomePage() {
  const repos = await getPublicRepos(profile.githubUsername, {
    includeForks: profile.includeForkedGithubRepos,
    includeArchived: profile.includeArchivedGithubRepos,
  });
  const githubOnly = filterDuplicateGithubRepos(repos, profile.manualProjects);
  const sorted = [...githubOnly].sort(sortReposByStarsThenUpdated);
  const featuredGithub = sorted.slice(0, 6);
  const featuredManual = profile.manualProjects.filter((p) => p.featured);

  const showGithubWarning = repos === null;

  return (
    <>
      <Hero
        name={profile.identity.name}
        headline={profile.identity.headline}
        bio={profile.identity.bio}
        avatar={profile.identity.avatar}
        resumePdf={profile.links.resumePdf}
      />

      <Section
        id="about"
        eyebrow="About"
        title="Built for what lasts"
        className="border-b border-[var(--border)] bg-surface/40 dark:bg-[var(--surface)]/35"
      >
        <div className="grid items-start gap-10 xl:grid-cols-12 xl:gap-14">
          <Reveal className="xl:col-span-7">
            <p className="text-base leading-relaxed text-muted lg:text-lg lg:leading-relaxed">
              {profile.identity.about}
            </p>
            {profile.identity.location ? (
              <p className="mt-6 text-sm font-medium text-primary">{profile.identity.location}</p>
            ) : null}
          </Reveal>
          <Reveal delay={90} variant="soft" className="xl:col-span-5">
            <aside className="rounded-2xl border border-[var(--border)] bg-surface/70 p-6 shadow-md backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                At a glance
              </p>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3 border-b border-[var(--border)] pb-4">
                  <span className="shrink-0 font-semibold text-foreground">Focus</span>
                  <span className="text-muted">Durable systems &amp; long-term user value</span>
                </li>
                <li className="flex gap-3 border-b border-[var(--border)] pb-4">
                  <span className="shrink-0 font-semibold text-foreground">How I decide</span>
                  <span className="text-muted">Depth on real needs—not one-off novelty</span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 font-semibold text-foreground">Collaboration</span>
                  <span className="text-muted">Readable code, clean interfaces, clear tradeoffs</span>
                </li>
              </ul>
            </aside>
          </Reveal>
        </div>
      </Section>

      <Section id="skills" eyebrow="Skills" title="Capability stack">
        <Reveal>
          <SkillChips groups={profile.skills} />
        </Reveal>
      </Section>

      <Section
        id="background"
        eyebrow="Career"
        title="Experience & education"
        className="border-y border-[var(--border)] bg-surface/40 dark:bg-[var(--surface)]/35"
        dense
      >
        <div className="grid gap-12 xl:grid-cols-2 xl:gap-16">
          <Reveal>
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted">
                Experience
              </h3>
              <ExperienceTimeline entries={profile.experience} />
            </div>
          </Reveal>
          <Reveal delay={80} variant="soft">
            <div>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted">
                Education
              </h3>
              <ul className="space-y-6">
                {profile.education.map((e) => (
                  <li
                    key={e.school}
                    className="theme-card rounded-2xl border border-[var(--border)] bg-surface/50 p-5 hover:border-primary/35 dark:hover:border-highlight/35"
                  >
                    <h4 className="text-lg font-semibold text-foreground">{e.school}</h4>
                    <p className="text-sm font-medium text-primary">{e.degree}</p>
                    <p className="text-sm text-muted">
                      {e.start} – {e.end}
                    </p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
                      {e.highlights.map((h) => (
                        <li key={h}>{h}</li>
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
        id="honors"
        eyebrow="Recognition"
        title="Honors & leadership development"
        className="border-b border-[var(--border)] bg-surface/30 dark:bg-[var(--surface)]/40"
        dense
      >
        <p className="mb-8 max-w-3xl text-muted">
          Scholarships, honors designations, and leadership threads that show how I show up on campus and
          with teams—not only in code.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.honorsLeadership.map((h, i) => (
            <Reveal key={h.title} delay={i * 55}>
              <HonorPeekCard title={h.title} detail={h.detail} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="credentials" eyebrow="Proof" title="Certificates & credentials" dense>
        <CredentialsSection certificates={profile.certificates} />
      </Section>

      <Section id="projects" eyebrow="Projects" title="Selected work" dense>
        {showGithubWarning ? (
          <Reveal>
            <p className="theme-surface mb-6 rounded-xl border border-highlight/25 bg-accent-soft/95 px-4 py-3 text-sm text-foreground">
              Could not load repositories from GitHub right now. Showing manual highlights only — try
              again later or visit{" "}
              <a href={profile.links.github} className="font-medium underline">
                GitHub
              </a>
              .
            </p>
          </Reveal>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {featuredManual.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <ProjectCardCompact project={p} />
            </Reveal>
          ))}
          {featuredGithub.map((r, i) => (
            <Reveal key={r.id} delay={(featuredManual.length + i) * 60}>
              <GithubRepoCard repo={r} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-sm text-muted">
            <Link
              href="/projects"
              className="font-semibold text-highlight underline-offset-4 transition-colors hover:underline"
            >
              Browse the full project archive →
            </Link>
          </p>
        </Reveal>
      </Section>

      <section className="border-t border-[var(--border)] py-12 sm:py-14">
        <div className={PAGE_CONTAINER}>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-accent-soft/60 via-background to-background px-8 py-10 shadow-sm sm:flex-row sm:items-center sm:px-10 lg:px-12">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground [font-family:var(--font-display),serif] sm:text-3xl">
                  Let&apos;s talk about what you&apos;re building for the long run.
                </h2>
                <p className="mt-3 text-muted">
                  Open to roles and collaborations where resilient platforms and careful execution
                  matter.
                </p>
              </div>
              <Link
                href="/contact"
                className="theme-btn inline-flex shrink-0 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-on-primary shadow-md ring-1 ring-black/10 transition hover:-translate-y-0.5 hover:shadow-lg hover:brightness-105 dark:ring-white/20"
              >
                Contact
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
