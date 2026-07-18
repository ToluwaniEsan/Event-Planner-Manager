import { HomeExperience } from "@/components/HomeExperience";
import { profile } from "@/data/profile";
import { getPublicRepos } from "@/lib/github";
import {
  filterDuplicateGithubRepos,
  sortReposByStarsThenUpdated,
} from "@/lib/project-merge";

export const revalidate = 3600;

export default async function HomePage() {
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
  const featuredGithub = sorted.slice(0, 6);
  const showGithubWarning = repos === null;

  return (
    <HomeExperience
      profile={profile}
      modes={profile.modes}
      featuredGithub={featuredGithub}
      showGithubWarning={showGithubWarning}
    />
  );
}
