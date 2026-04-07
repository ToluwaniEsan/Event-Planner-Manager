import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import type { ManualProject } from "@/data/profile";

type ProjectCardProps = {
  project: ManualProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="theme-card group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-surface shadow-sm hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl dark:hover:border-highlight/45">
      {project.image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-accent-soft">
          <Image
            src={project.image}
            alt=""
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] w-full bg-gradient-to-br from-accent-soft via-surface to-transparent" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-md bg-accent-soft px-2 py-0.5 text-xs text-foreground/90"
            >
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-highlight transition-colors hover:underline"
            >
              <GithubIcon className="h-4 w-4" />
              Repository
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-highlight transition-colors hover:underline"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              Live site
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** Compact card for home “featured” strip (no image requirement). */
export function ProjectCardCompact({ project }: ProjectCardProps) {
  return (
    <article className="theme-card flex h-full flex-col rounded-2xl border border-[var(--border)] bg-surface/60 p-5 shadow-sm backdrop-blur-sm hover:-translate-y-1 hover:border-primary/45 hover:shadow-lg dark:hover:border-highlight/45">
      <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
        {project.stack.slice(0, 4).map((s) => (
          <span key={s} className="rounded-md bg-accent-soft/80 px-2 py-0.5 dark:bg-accent-soft/40">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-4">
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-highlight underline-offset-4 transition-colors hover:underline"
          >
            View repo →
          </a>
        ) : (
          <Link
            href="/projects"
            className="text-sm font-semibold text-highlight underline-offset-4 transition-colors hover:underline"
          >
            All projects →
          </Link>
        )}
      </div>
    </article>
  );
}
