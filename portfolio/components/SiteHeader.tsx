"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, Menu } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ModeToggle } from "@/components/ModeToggle";
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
  { href: "/#background", label: "Background" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#honors", label: "Honors" },
  { href: "/#credentials", label: "Credentials" },
  { href: "/projects", label: "Archive" },
];

export function SiteHeader({ name, links }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`theme-surface sticky top-0 z-50 border-b backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-[var(--border)] shadow-[0_1px_0_rgba(var(--shadow),0.02)]"
          : "border-transparent"
      }`}
      style={{ backgroundColor: "var(--nav-bg)" }}
    >
      <div className={`flex items-center justify-between gap-3 py-3 ${PAGE_CONTAINER}`}>
        <Link
          href="/"
          className="shrink-0 text-sm font-bold tracking-tight text-foreground transition-colors duration-300 hover:text-primary"
        >
          {name}
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link py-1 text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden md:block">
            <ModeToggle />
          </div>
          <ThemeToggle />
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-transparent text-muted transition-colors duration-300 hover:border-[var(--border)] hover:text-primary lg:inline-flex"
            aria-label="GitHub"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-transparent text-muted transition-colors duration-300 hover:border-[var(--border)] hover:text-primary lg:inline-flex"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={links.email}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-transparent text-muted transition-colors duration-300 hover:border-[var(--border)] hover:text-primary lg:inline-flex"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" aria-hidden />
          </a>
          <Link
            href="/contact"
            className="hidden shrink-0 rounded-lg bg-button px-4 py-2 text-[13px] font-semibold text-on-button transition-[background-color,color,transform] duration-250 hover:-translate-y-px hover:bg-primary hover:text-on-accent sm:inline-flex"
          >
            Get in touch
          </Link>

          <details className="relative xl:hidden">
            <summary className="list-none [&::-webkit-details-marker]:hidden">
              <span className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] bg-surface text-foreground transition-colors duration-300 hover:border-primary hover:text-primary">
                <Menu className="h-4 w-4" aria-hidden />
                <span className="sr-only">Open menu</span>
              </span>
            </summary>
            <div className="theme-surface absolute right-0 mt-2 w-56 rounded-xl border border-[var(--border)] bg-background p-2 shadow-xl">
              <div className="mb-2 border-b border-[var(--border)] px-2 pb-3 pt-1 md:hidden">
                <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-faint">
                  Career lens
                </p>
                <ModeToggle showFullLabels className="w-full justify-between" />
              </div>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground"
              >
                Contact
              </Link>
              <a
                href={links.email}
                className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground sm:hidden"
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
