import { GitBranch, Star } from "lucide-react";
import type { GitHubRepo } from "@/lib/github";

type GithubRepoCardProps = {
  repo: GitHubRepo;
};

function formatDate(iso: string) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(
      new Date(iso),
    );
  } catch {
    return iso;
  }
}

export function GithubRepoCard({ repo }: GithubRepoCardProps) {
  return (
    <article className="theme-card group flex h-full min-w-0 max-w-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-surface/70 p-5 shadow-sm backdrop-blur-sm hover:-translate-y-1 hover:border-primary/45 hover:shadow-lg dark:hover:border-highlight/45">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <h3 className="min-w-0 flex-1 break-words text-base font-semibold text-foreground [overflow-wrap:anywhere]">
          {repo.name}
        </h3>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted">
          <Star className="h-3.5 w-3.5" aria-hidden />
          {repo.stargazers_count}
        </span>
      </div>
      <p className="mt-2 min-h-[2.5rem] break-words text-sm leading-relaxed text-muted [overflow-wrap:anywhere]">
        {repo.description || "No description provided."}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted">
        {repo.language ? (
          <span className="inline-flex items-center gap-1">
            <GitBranch className="h-3.5 w-3.5" aria-hidden />
            {repo.language}
          </span>
        ) : null}
        <span>Updated {formatDate(repo.updated_at)}</span>
      </div>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex text-sm font-semibold text-highlight underline-offset-4 transition-transform duration-300 group-hover:translate-x-0.5 hover:underline"
      >
        Open on GitHub →
      </a>
    </article>
  );
}
