import { PAGE_CONTAINER } from "@/lib/site-layout";

type SectionProps = {
  id?: string;
  title: string;
  eyebrow?: string;
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
  children,
  className = "",
  dense = false,
  showTitle = true,
}: SectionProps) {
  const py = dense ? "py-10 sm:py-14" : "py-12 sm:py-16";
  return (
    <section id={id} className={`scroll-mt-24 ${py} ${className}`}>
      <div className={PAGE_CONTAINER}>
        {showTitle ? (
          <header className="mb-8 flex flex-col gap-2 lg:mb-10 lg:max-w-4xl">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
            ) : null}
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] [font-family:var(--font-display),serif]">
              {title}
            </h2>
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
