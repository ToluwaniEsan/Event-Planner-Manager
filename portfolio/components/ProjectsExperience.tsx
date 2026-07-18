"use client";

import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { GithubRepoCard } from "@/components/GithubRepoCard";
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
    <Section eyebrow="Portfolio" title="Projects">
      <p className="mb-8 max-w-2xl text-muted">
        Highlights framed for{" "}
        <span className="font-medium text-foreground">
          {activeMode === "product" ? "product management" : "software engineering"}
        </span>
        , plus public repositories from GitHub.
      </p>

      {showGithubRepos && showGithubWarning ? (
        <p
          className="theme-surface mb-8 rounded-lg border border-highlight/25 bg-accent-soft/95 px-4 py-3 text-sm text-foreground"
          role="status"
        >
          Could not load GitHub repositories. Showing manual projects only — check back later or
          browse{" "}
          <a href={profile.links.github} className="font-medium underline">
            GitHub
          </a>
          .
        </p>
      ) : null}

      {content.manualProjects.length ? (
        <>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            Highlights
          </h3>
          <div className="mb-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {content.manualProjects.map((p) => (
              <ProjectCard key={`${activeMode}-${p.title}`} project={p} />
            ))}
          </div>
        </>
      ) : null}

      {showGithubRepos ? (
        <>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            GitHub repositories
          </h3>
          {githubRepos.length === 0 && !showGithubWarning ? (
            <p className="text-sm text-muted">No additional public repositories to list.</p>
          ) : null}
          <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {githubRepos.map((r) => (
              <GithubRepoCard key={r.id} repo={r} />
            ))}
          </div>
        </>
      ) : null}
    </Section>
    </div>
  );
}
