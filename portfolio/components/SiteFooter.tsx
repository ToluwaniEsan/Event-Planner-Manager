"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { useCareerMode } from "@/components/ModeProvider";
import { DEFAULT_CAREER_MODE } from "@/lib/mode";
import { PAGE_CONTAINER } from "@/lib/site-layout";

type SiteFooterProps = {
  name: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
};

export function SiteFooter({ name, links }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const { mode, mounted } = useCareerMode();
  const activeMode = mounted ? mode : DEFAULT_CAREER_MODE;
  const accentWord = activeMode === "engineering" ? "TEAL" : "INDIGO";

  return (
    <footer className="theme-surface border-t border-[var(--border)] py-9">
      <div
        className={`flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between ${PAGE_CONTAINER}`}
      >
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-muted">
            {"\u00a9"} {year} {name}. Built with Next.js.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-faint">
            {"DESIGNED IN NAVY \u0026 "}
            <span className="text-primary">{accentWord}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <Link
            href="/projects"
            className="nav-link text-muted transition-colors hover:text-foreground"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="nav-link text-muted transition-colors hover:text-foreground"
          >
            Contact
          </Link>
          <a
            href={links.github}
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={links.linkedin}
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={links.email}
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
