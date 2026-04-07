import Link from "next/link";
import { Mail, Menu } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PAGE_CONTAINER } from "@/lib/site-layout";

type SiteHeaderProps = {
  name: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
};

const nav = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#background", label: "Background" },
  { href: "/#honors", label: "Honors" },
  { href: "/#credentials", label: "Credentials" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ name, links }: SiteHeaderProps) {
  return (
    <header className="theme-surface sticky top-0 z-50 border-b border-[var(--border)] bg-background/85 backdrop-blur-md">
      <div className={`flex items-center justify-between gap-3 py-3 ${PAGE_CONTAINER}`}>
        <Link
          href="/"
          className="shrink-0 text-sm font-semibold tracking-tight text-foreground transition-colors duration-300 hover:text-highlight"
        >
          {name}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors duration-300 hover:text-highlight"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors duration-300 hover:bg-accent-soft hover:text-highlight dark:border dark:border-[color:var(--border-secondary)] dark:hover:bg-white/[0.06]"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors duration-300 hover:bg-accent-soft hover:text-highlight dark:border dark:border-[color:var(--border-secondary)] dark:hover:bg-white/[0.06]"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={links.email}
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors duration-300 hover:bg-accent-soft hover:text-highlight dark:border dark:border-[color:var(--border-secondary)] dark:hover:bg-white/[0.06] sm:inline-flex"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" aria-hidden />
          </a>

          <details className="relative lg:hidden">
            <summary className="list-none [&::-webkit-details-marker]:hidden">
              <span className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] bg-surface text-foreground transition-colors duration-300 dark:border-[color:var(--border-secondary)]">
                <Menu className="h-4 w-4" aria-hidden />
                <span className="sr-only">Open menu</span>
              </span>
            </summary>
            <div className="theme-surface absolute right-0 mt-2 w-52 rounded-xl border border-[var(--border)] bg-surface p-2 shadow-xl dark:border-[color:var(--border-secondary)]">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-accent-soft hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={links.email}
                className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-accent-soft hover:text-foreground sm:hidden"
              >
                Email
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
