"use client";

import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { GithubRepoCard } from "@/components/GithubRepoCard";
import { Reveal } from "@/components/Reveal";
import { useCareerMode } from "@/components/ModeProvider";
import type { ModePresentation, Profile } from "@/data/profile";
import type { GitHubRepo } from "@/lib/github";
import { DEFAULT_CAREER_MODE, type CareerMode } from "@/lib/mode";

type ProjectsExperienceProps = {
  profile: Profile;
  modes: Record<CareerMode, ModePresentation>;
  githubRepos: GitHubRepo[];
  showGithubWarning: boolean;
};

export function ProjectsExperience({
  profile,
  modes,
  githubRepos,
  showGithubWarning,
}: ProjectsExperienceProps) {
  const { mode, mounted } = useCareerMode();
  const activeMode = mounted ? mode : DEFAULT_CAREER_MODE;
  const content = modes[activeMode];
  const showGithubRepos = activeMode === "engineering";

  return (
    <div key={activeMode} className="mode-transition-shell">
      <Section
        num="01"
        eyebrow="Portfolio"
        title="Projects"
        note="One throughline: reduce the distance between a problem and the person who can act on it."
      >
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted">
          Highlights framed for{" "}
          <span className="font-semibold text-foreground">
            {activeMode === "product" ? "product management" : "software engineering"}
          </span>
          , plus public repositories from GitHub.
        </p>

        {showGithubRepos && showGithubWarning ? (
          <p
            className="theme-surface mb-8 rounded-xl border border-[var(--border)] bg-accent-soft px-4 py-3 text-sm text-foreground"
            role="status"
          >
            Could not load GitHub repositories. Showing manual projects only{" \u2014 "}check back
            later or browse{" "}
            <a href={profile.links.github} className="font-medium underline">
              GitHub
            </a>
            .
          </p>
        ) : null}

        {content.manualProjects.length ? (
          <>
            <h3 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
              Highlights
            </h3>
            <div className="mb-14 grid gap-5 md:grid-cols-2">
              {content.manualProjects.map((p, i) => (
                <Reveal key={`${activeMode}-${p.title}`} delay={i * 90} className="h-full">
                  <ProjectCard
                    project={p}
                    index={i + 1}
                    total={content.manualProjects.length}
                  />
                </Reveal>
              ))}
            </div>
          </>
        ) : null}

        {showGithubRepos ? (
          <>
            <h3 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
              GitHub repositories
            </h3>
            {githubRepos.length === 0 && !showGithubWarning ? (
              <p className="text-sm text-muted">No additional public repositories to list.</p>
            ) : null}
            <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {githubRepos.map((r, i) => (
                <Reveal key={r.id} delay={Math.min(i, 7) * 60} className="h-full">
                  <GithubRepoCard repo={r} />
                </Reveal>
              ))}
            </div>
          </>
        ) : null}
      </Section>
    </div>
  );
}
