import { PAGE_CONTAINER } from "@/lib/site-layout";

type SectionProps = {
  id?: string;
  title: string;
  eyebrow?: string;
  /** Monospace index prefix, e.g. "01". */
  num?: string;
  /** Short right-aligned note beside the title (desktop). */
  note?: string;
  children: React.ReactNode;
  className?: string;
  /** Tighter vertical rhythm for denser pages. */
  dense?: boolean;
  /** Intro + children share one wide row (title spans full width). */
  showTitle?: boolean;
};

export function Section({
  id,
  title,
  eyebrow,
  num,
  note,
  children,
  className = "",
  dense = false,
  showTitle = true,
}: SectionProps) {
  const py = dense ? "py-14 sm:py-20" : "py-16 sm:py-24";
  return (
    <section id={id} className={`scroll-mt-24 ${py} ${className}`}>
      <div className={PAGE_CONTAINER}>
        {showTitle ? (
          <header className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
            <div>
              {eyebrow ? (
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                  {num ? `${num} \u2014 ` : ""}
                  {eyebrow}
                </p>
              ) : null}
              <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-foreground sm:text-4xl">
                {title}
              </h2>
            </div>
            {note ? (
              <p className="max-w-[330px] text-sm leading-relaxed text-muted">{note}</p>
            ) : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
