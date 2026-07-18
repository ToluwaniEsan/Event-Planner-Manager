import { Award } from "lucide-react";

/**
 * Honors grid card: static presentation whose bottom strip reveals an accent
 * "Honors recognition" panel on hover (no modal).
 */
export function HonorPeekCard({ title, detail }: { title: string; detail?: string }) {
  return (
    <article className="theme-card group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-background transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] hover:-translate-y-1.5 hover:border-primary hover:shadow-[0_28px_48px_-22px_rgba(var(--shadow),0.3),0_0_0_1px_rgba(var(--accent-glow),0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="flex flex-1 flex-col p-6 pb-5">
        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-primary">
          Honor
        </p>
        <h3 className="mt-3 text-[15.5px] font-bold leading-relaxed tracking-[-0.01em] text-foreground">
          {title}
        </h3>
        {detail ? <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{detail}</p> : null}
      </div>
      <div
        className="relative h-12 shrink-0 overflow-hidden border-t border-dashed border-[var(--border)] bg-surface"
        aria-hidden
      >
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[10.5px] tracking-[0.08em] text-faint transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] group-hover:-translate-y-[60%] group-hover:opacity-0 motion-reduce:transition-none">
          AAMU
        </span>
        <span className="absolute inset-0 flex translate-y-full items-center justify-center gap-2.5 bg-primary text-on-accent transition-transform duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)] group-hover:translate-y-0 motion-reduce:transition-none">
          <Award className="h-[15px] w-[15px] shrink-0" strokeWidth={2} aria-hidden />
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em]">
            Honors recognition
          </span>
        </span>
      </div>
    </article>
  );
}
