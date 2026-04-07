import type { GitHubRepo } from "@/lib/github";
import type { ManualProject } from "@/data/profile";

/** "owner/repo" from a GitHub URL, lowercase, or null. */
export function repoKeyFromUrl(url: string | undefined): string | null {
  if (!url) return null;
  const m = url.match(/github\.com\/([^/?#]+)\/([^/?#]+)/i);
  if (!m) return null;
  const owner = m[1];
  const repo = m[2].replace(/\.git$/i, "");
  return `${owner}/${repo}`.toLowerCase();
}

export function githubRepoKeysFromManual(projects: ManualProject[]): Set<string> {
  const keys = new Set<string>();
  for (const p of projects) {
    const k = repoKeyFromUrl(p.repoUrl);
    if (k) keys.add(k);
  }
  return keys;
}

export function filterDuplicateGithubRepos(
  repos: GitHubRepo[] | null,
  manual: ManualProject[],
): GitHubRepo[] {
  if (!repos?.length) return [];
  const manualKeys = githubRepoKeysFromManual(manual);
  return repos.filter((r) => !manualKeys.has(r.full_name.toLowerCase()));
}

export function sortReposByStarsThenUpdated(a: GitHubRepo, b: GitHubRepo): number {
  if (b.stargazers_count !== a.stargazers_count) {
    return b.stargazers_count - a.stargazers_count;
  }
  return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
}
