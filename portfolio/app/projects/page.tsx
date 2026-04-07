import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { GithubRepoCard } from "@/components/GithubRepoCard";
import { profile } from "@/data/profile";
import { getPublicRepos } from "@/lib/github";
import {
  filterDuplicateGithubRepos,
  sortReposByStarsThenUpdated,
} from "@/lib/project-merge";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description: `Projects and repositories by ${profile.identity.name} — manual highlights and GitHub.`,
};

export default async function ProjectsPage() {
  const repos = await getPublicRepos(profile.githubUsername, {
    includeForks: profile.includeForkedGithubRepos,
    includeArchived: profile.includeArchivedGithubRepos,
  });
  const githubOnly = filterDuplicateGithubRepos(repos, profile.manualProjects);
  const sorted = [...githubOnly].sort(sortReposByStarsThenUpdated);
  const showGithubWarning = repos === null;

  return (
    <Section eyebrow="Portfolio" title="Projects">
      <p className="mb-8 max-w-2xl text-muted">
        Curated highlights below, plus public repositories from GitHub (updated periodically).
      </p>

      {showGithubWarning ? (
        <p
          className="theme-surface mb-8 rounded-lg border border-highlight/25 bg-accent-soft/95 px-4 py-3 text-sm text-foreground"
          role="status"
        >
          Could not load GitHub repositories. Showing manual projects only — check back later or browse{" "}
          <a href={profile.links.github} className="font-medium underline">
            GitHub
          </a>
          .
        </p>
      ) : null}

      {profile.manualProjects.length ? (
        <>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            Highlights
          </h3>
          <div className="mb-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {profile.manualProjects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </>
      ) : null}

      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
        GitHub
      </h3>
      {sorted.length === 0 && !showGithubWarning ? (
        <p className="text-sm text-muted">No additional public repositories to list.</p>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((r) => (
          <GithubRepoCard key={r.id} repo={r} />
        ))}
      </div>
    </Section>
  );
}
