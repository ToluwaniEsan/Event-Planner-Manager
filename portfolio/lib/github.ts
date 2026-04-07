const REVALIDATE_SECONDS = 3600;

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
};

type GithubApiRepo = Partial<GitHubRepo> & { message?: string };

export type GetPublicReposOptions = {
  perPage?: number;
  includeForks?: boolean;
  includeArchived?: boolean;
};

function buildHeaders(includeToken: boolean): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    // GitHub rejects requests without a descriptive User-Agent.
    "User-Agent": "ToluwaniEsan-portfolio (https://github.com/ToluwaniEsan)",
  };
  const token = process.env.GITHUB_TOKEN?.trim();
  if (includeToken && token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

function parseReposJson(
  data: unknown,
  includeForks: boolean,
  includeArchived: boolean,
): GitHubRepo[] | null {
  if (!Array.isArray(data)) return null;

  const repos: GitHubRepo[] = [];
  for (const raw of data as GithubApiRepo[]) {
    if (typeof raw?.full_name !== "string" || typeof raw?.html_url !== "string") continue;
    if (!includeForks && raw.fork) continue;
    if (!includeArchived && raw.archived) continue;

    repos.push({
      id: typeof raw.id === "number" ? raw.id : 0,
      name: String(raw.name ?? raw.full_name.split("/")[1] ?? ""),
      full_name: raw.full_name,
      html_url: raw.html_url,
      description: raw.description ?? null,
      fork: Boolean(raw.fork),
      archived: Boolean(raw.archived),
      stargazers_count: typeof raw.stargazers_count === "number" ? raw.stargazers_count : 0,
      language: raw.language ?? null,
      updated_at: typeof raw.updated_at === "string" ? raw.updated_at : "",
    });
  }

  return repos;
}

/**
 * Fetches public repos for a user. Returns null if the request fails (network, rate limit, etc.).
 * Retries without a token if the first request returns 401 (expired/invalid GITHUB_TOKEN).
 */
export async function getPublicRepos(
  username: string,
  options: GetPublicReposOptions = {},
): Promise<GitHubRepo[] | null> {
  const trimmed = username.trim();
  if (!trimmed) return null;

  const perPage = options.perPage ?? 100;
  const params = new URLSearchParams({
    per_page: String(perPage),
    sort: "updated",
    direction: "desc",
  });

  const url = `https://api.github.com/users/${encodeURIComponent(trimmed)}/repos?${params}`;
  const includeForks = options.includeForks ?? false;
  const includeArchived = options.includeArchived ?? false;

  const tokenPresent = Boolean(process.env.GITHUB_TOKEN?.trim());

  const attempts: boolean[] = tokenPresent ? [true, false] : [false];

  try {
    for (let i = 0; i < attempts.length; i++) {
      const withToken = attempts[i] ?? false;
      const res = await fetch(url, {
        headers: buildHeaders(withToken),
        next: { revalidate: REVALIDATE_SECONDS },
      });

      // Invalid/expired tokens return 401; retry unauthenticated for public repos only.
      if (res.status === 401 && withToken && tokenPresent) {
        continue;
      }

      if (!res.ok) {
        if (i === attempts.length - 1) return null;
        continue;
      }

      const data: unknown = await res.json();
      return parseReposJson(data, includeForks, includeArchived);
    }

    return null;
  } catch {
    return null;
  }
}
