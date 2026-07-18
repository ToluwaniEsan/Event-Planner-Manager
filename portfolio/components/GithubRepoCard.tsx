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
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/** Ledger-style GitHub repo card with a top accent bar on hover. */
export function GithubRepoCard({ repo }: GithubRepoCardProps) {
  return (
    <article className="theme-card group relative flex h-full min-w-0 max-w-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-background p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_24px_48px_-20px_rgba(var(--shadow),0.25)] motion-reduce:transition-none dark:hover:border-[rgba(var(--accent-glow),0.35)]">
      <span
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-primary transition-transform duration-400 ease-[cubic-bezier(0.16,0.84,0.44,1)] group-hover:scale-x-100 motion-reduce:transition-none"
        aria-hidden
      />
      <div className="flex min-w-0 items-start justify-between gap-3">
        <h3 className="min-w-0 flex-1 break-words text-base font-bold tracking-[-0.01em] text-foreground [overflow-wrap:anywhere]">
          {repo.name}
        </h3>
        <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] text-faint">
          <Star className="h-3.5 w-3.5" aria-hidden />
          {repo.stargazers_count}
        </span>
      </div>
      <p className="mt-2 min-h-[2.5rem] flex-1 break-words text-sm leading-relaxed text-muted [overflow-wrap:anywhere]">
        {repo.description || "No description provided."}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.04em] text-faint">
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
        className="mt-4 inline-flex self-start border-b border-[var(--border)] pb-0.5 text-sm font-semibold text-foreground transition-[color,border-color,transform] duration-300 hover:border-primary hover:text-primary group-hover:translate-x-0.5 motion-reduce:transition-none"
      >
        Open on GitHub {"\u2192"}
      </a>
    </article>
  );
}
