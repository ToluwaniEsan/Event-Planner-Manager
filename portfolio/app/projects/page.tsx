import { ProjectsExperience } from "@/components/ProjectsExperience";
import { profile, getDefaultPresentation } from "@/data/profile";
import { getPublicRepos } from "@/lib/github";
import {
  filterDuplicateGithubRepos,
  sortReposByStarsThenUpdated,
} from "@/lib/project-merge";
import type { Metadata } from "next";

export const revalidate = 3600;

const defaultPresentation = getDefaultPresentation();

export const metadata: Metadata = {
  title: "Projects",
  description: `Projects and repositories by ${profile.identity.name} — ${defaultPresentation.headline}.`,
};

export default async function ProjectsPage() {
  const allManual = [
    ...profile.modes.product.manualProjects,
    ...profile.modes.engineering.manualProjects,
  ];
  const repos = await getPublicRepos(profile.githubUsername, {
    includeForks: profile.includeForkedGithubRepos,
    includeArchived: profile.includeArchivedGithubRepos,
  });
  const githubOnly = filterDuplicateGithubRepos(repos, allManual);
  const sorted = [...githubOnly].sort(sortReposByStarsThenUpdated);
  const showGithubWarning = repos === null;

  return (
    <ProjectsExperience
      profile={profile}
      modes={profile.modes}
      githubRepos={sorted}
      showGithubWarning={showGithubWarning}
    />
  );
}
