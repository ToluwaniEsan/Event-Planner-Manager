import { Section } from "@/components/Section";
import { getDefaultPresentation, profile } from "@/data/profile";
import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import type { Metadata } from "next";

const defaultPresentation = getDefaultPresentation();

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${profile.identity.name} \u2014 ${defaultPresentation.headline}.`,
};

function mailLabel(href: string) {
  return href.replace(/^mailto:/i, "");
}

const rowClass =
  "theme-surface group flex items-center gap-4 border-b border-[var(--border)] px-5 py-5 transition-[background-color,padding-left] duration-200 last:border-b-0 hover:bg-surface hover:pl-6 motion-reduce:transition-none";

const iconClass =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-accent-soft text-primary transition-colors duration-200 group-hover:border-primary";

export default function ContactPage() {
  return (
    <Section
      num="01"
      eyebrow="Contact"
      title="Say hello."
      note="Fastest response by email; usually within a day."
    >
      <p className="max-w-2xl text-base leading-relaxed text-muted">
        The fastest way to reach me is email. I&apos;m open to product and software engineering
        conversations {"\u2014"} internships, collaborations, and roles where requirements clarity
        and solid systems matter.
      </p>

      <div className="mt-10 max-w-3xl overflow-hidden rounded-xl border border-[var(--border)] bg-background">
        {profile.links.phone ? (
          <a href={`tel:${profile.links.phone.replace(/\D/g, "")}`} className={rowClass}>
            <span className={iconClass}>
              <Phone className="h-4.5 w-4.5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-faint">
                Phone
              </span>
              <span className="mt-0.5 block text-sm font-semibold text-foreground">
                {profile.links.phone}
              </span>
            </span>
          </a>
        ) : null}

        <div className={rowClass}>
          <span className={iconClass}>
            <Mail className="h-4.5 w-4.5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-faint">
              Email
            </span>
            <span className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-sm font-semibold text-foreground">
              <a
                href={profile.links.email}
                className="break-all underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {mailLabel(profile.links.email)}
              </a>
              {profile.links.emailSecondary ? (
                <>
                  <span className="text-faint" aria-hidden>
                    /
                  </span>
                  <a
                    href={profile.links.emailSecondary}
                    className="break-all underline-offset-4 transition-colors hover:text-primary hover:underline"
                  >
                    {mailLabel(profile.links.emailSecondary)}
                  </a>
                </>
              ) : null}
            </span>
          </span>
        </div>

        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={rowClass}
        >
          <span className={iconClass}>
            <LinkedinIcon className="h-4.5 w-4.5" />
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-faint">
              LinkedIn
            </span>
            <span className="mt-0.5 block text-sm font-semibold text-foreground">Profile</span>
          </span>
        </a>

        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className={rowClass}
        >
          <span className={iconClass}>
            <GithubIcon className="h-4.5 w-4.5" />
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-faint">
              GitHub
            </span>
            <span className="mt-0.5 block text-sm font-semibold text-foreground">
              Repositories
            </span>
          </span>
        </a>
      </div>
    </Section>
  );
}
