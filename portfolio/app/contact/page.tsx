import { Section } from "@/components/Section";
import { profile } from "@/data/profile";
import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${profile.identity.name} — email, GitHub, and LinkedIn.`,
};

function mailLabel(href: string) {
  return href.replace(/^mailto:/i, "");
}

export default function ContactPage() {
  return (
    <Section eyebrow="Contact" title="Say hello">
      <p className="max-w-2xl text-muted">
        The fastest way to reach me is email. I&apos;m also happy to connect on LinkedIn or review
        work on GitHub.
      </p>

      <ul className="mt-10 space-y-4">
        {profile.links.phone ? (
          <li>
            <a
              href={`tel:${profile.links.phone.replace(/\D/g, "")}`}
              className="theme-surface group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-surface/40 p-4 transition-colors hover:border-primary/40 dark:hover:border-[color:var(--border-secondary)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-primary dark:text-foreground">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">Phone</p>
                <p className="text-sm text-muted group-hover:text-foreground">{profile.links.phone}</p>
              </div>
            </a>
          </li>
        ) : null}
        <li>
          <div className="theme-surface flex items-center gap-3 rounded-xl border border-[var(--border)] bg-surface/40 p-4 transition-colors hover:border-primary/40 dark:hover:border-[color:var(--border-secondary)]">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-primary dark:text-foreground">
              <Mail className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-sm text-muted">
                <a
                  href={profile.links.email}
                  className="break-all underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  {mailLabel(profile.links.email)}
                </a>
                {profile.links.emailSecondary ? (
                  <>
                    <span className="text-muted" aria-hidden>
                      /
                    </span>
                    <a
                      href={profile.links.emailSecondary}
                      className="break-all underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {mailLabel(profile.links.emailSecondary)}
                    </a>
                  </>
                ) : null}
              </p>
            </div>
          </div>
        </li>
        <li>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-surface group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-surface/40 p-4 transition-colors hover:border-primary/40 dark:hover:border-[color:var(--border-secondary)]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-primary dark:text-foreground">
              <LinkedinIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">LinkedIn</p>
              <p className="text-sm text-muted group-hover:text-foreground">Profile</p>
            </div>
          </a>
        </li>
        <li>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-surface group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-surface/40 p-4 transition-colors hover:border-primary/40 dark:hover:border-[color:var(--border-secondary)]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-primary dark:text-foreground">
              <GithubIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">GitHub</p>
              <p className="text-sm text-muted group-hover:text-foreground">Repositories</p>
            </div>
          </a>
        </li>
      </ul>
    </Section>
  );
}
