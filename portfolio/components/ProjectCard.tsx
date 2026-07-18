"use client";

import { useId, useState } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { TiltCard } from "@/components/TiltCard";
import type { ManualProject } from "@/data/profile";

type ProjectCardProps = {
  project: ManualProject;
  /** 1-based position for the mono "01 / 04" index. */
  index?: number;
  total?: number;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Splits a description into a lead sentence and remaining sentences,
 * which become the expandable "Case notes". Uses profile copy verbatim.
 */
function splitSentences(text: string): [string, string[]] {
  const parts = text.split(/(?<=\.)\s+(?=[A-Z])/);
  if (parts.length <= 1) return [text, []];
  return [parts[0], parts.slice(1)];
}

/**
 * Numbered case-study card: top accent bar scales in on hover, subtle pointer
 * tilt + glare, mono stack chips, and expandable case notes.
 */
export function ProjectCard({ project, index, total }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const [lead, notes] = splitSentences(project.description);

  return (
    <TiltCard className="h-full rounded-2xl">
      <article className="theme-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-background p-7 transition-[border-color,box-shadow] duration-300 group-hover:border-transparent group-hover:shadow-[0_24px_48px_-20px_rgba(var(--shadow),0.25)] dark:group-hover:border-[rgba(var(--accent-glow),0.35)]">
        <span
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-primary transition-transform duration-400 ease-[cubic-bezier(0.16,0.84,0.44,1)] group-hover:scale-x-100 motion-reduce:transition-none"
          aria-hidden
        />

        {index && total ? (
          <p className="font-mono text-xs font-medium text-primary">
            {pad(index)} / {pad(total)}
          </p>
        ) : (
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">
            Case study
          </p>
        )}

        <h3 className="mt-3.5 text-[1.2rem] font-bold leading-snug tracking-[-0.01em] text-foreground">
          {project.title}
        </h3>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-md border border-[var(--border)] bg-surface px-2 py-1 font-mono text-[10.5px] font-medium text-muted transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-foreground motion-reduce:transition-none"
            >
              {s}
            </li>
          ))}
        </ul>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{lead}</p>

        {notes.length ? (
          <>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
              className="mt-4 inline-flex items-center gap-2 self-start py-1 font-mono text-[11.5px] font-semibold tracking-[0.05em] text-primary"
            >
              <span
                className={`grid h-[18px] w-[18px] place-items-center rounded-full border border-current text-xs leading-none transition-transform duration-400 ease-[cubic-bezier(0.34,1.25,0.64,1)] motion-reduce:transition-none ${
                  open ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
              Case notes
            </button>
            <div
              id={panelId}
              className={`grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.16,0.84,0.44,1)] motion-reduce:transition-none ${
                open ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="mt-3 border-t border-dashed border-[var(--border)]">
                  {notes.map((note) => (
                    <li
                      key={note}
                      className="relative border-b border-dashed border-[var(--border)] py-2 pl-5 text-[13px] leading-relaxed text-muted"
                    >
                      <span
                        className="absolute left-0 top-2 font-mono text-xs text-primary"
                        aria-hidden
                      >
                        {"\u2192"}
                      </span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : null}

        {project.repoUrl || project.liveUrl ? (
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border-b border-[var(--border)] pb-0.5 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
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
                className="inline-flex items-center gap-1.5 border-b border-[var(--border)] pb-0.5 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Live site
              </a>
            ) : null}
          </div>
        ) : null}
      </article>
    </TiltCard>
  );
}
