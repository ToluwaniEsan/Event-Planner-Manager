import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
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
  return (
    <footer className="theme-surface border-t border-[var(--border)] py-10">
      <div
        className={`flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between ${PAGE_CONTAINER}`}
      >
        <p className="text-sm text-muted">
          © {year} {name}. Built with Next.js.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <Link href="/projects" className="text-muted transition-colors hover:text-highlight">
            Projects
          </Link>
          <Link href="/contact" className="text-muted transition-colors hover:text-highlight">
            Contact
          </Link>
          <a
            href={links.github}
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-highlight dark:hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={links.linkedin}
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-highlight dark:hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={links.email}
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-highlight dark:hover:text-foreground"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
