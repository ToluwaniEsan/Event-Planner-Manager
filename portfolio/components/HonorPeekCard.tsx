import { Award } from "lucide-react";

/**
 * Honors grid card — static presentation with hover “peek” (no modal).
 */
export function HonorPeekCard({ title, detail }: { title: string; detail?: string }) {
  return (
    <article className="theme-card group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-surface/90 shadow-sm backdrop-blur-sm hover:-translate-y-1 hover:border-primary/45 hover:shadow-xl dark:hover:border-highlight/45">
      <div className="flex flex-1 flex-col p-5 pb-4">
        <h3 className="text-base font-semibold leading-snug text-foreground">{title}</h3>
        {detail ? <p className="mt-2 flex-1 text-sm text-muted">{detail}</p> : null}
      </div>
      <div className="relative mt-auto h-24 overflow-hidden border-t border-[var(--border)] bg-gradient-to-b from-[var(--accent-soft)]/70 to-[var(--surface)]">
        <div className="absolute inset-x-0 bottom-0 flex justify-center px-3 pb-0.5 transition-all duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] translate-y-[55%] group-hover:translate-y-[6%]">
          <div className="flex w-full max-w-[15rem] flex-col items-center rounded-t-xl border border-[var(--border)] bg-primary px-3 py-2 text-on-primary shadow-2xl ring-1 ring-black/10 dark:border-[color:var(--border-secondary)] dark:ring-white/15">
            <Award className="h-8 w-8 shrink-0 opacity-95" strokeWidth={1.5} aria-hidden />
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] opacity-85">
              Honors recognition
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
