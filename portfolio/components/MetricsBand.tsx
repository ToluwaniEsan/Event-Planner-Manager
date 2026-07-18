import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { PAGE_CONTAINER } from "@/lib/site-layout";

export type Metric = {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
};

type MetricsBandProps = {
  id?: string;
  num?: string;
  eyebrow: string;
  title: string;
  note?: string;
  metrics: Metric[];
};

/** Full-bleed dark navy band with count-up metric cells. */
export function MetricsBand({ id, num, eyebrow, title, note, metrics }: MetricsBandProps) {
  return (
    <section id={id} className="scroll-mt-24 bg-band py-16 text-band-ink sm:py-24">
      <div className={PAGE_CONTAINER}>
        <Reveal>
          <header className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
            <div>
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-accent-bright">
                {num ? `${num} \u2014 ` : ""}
                {eyebrow}
              </p>
              <h2 className="text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">{title}</h2>
            </div>
            {note ? (
              <p className="max-w-[330px] text-sm leading-relaxed text-band-muted">{note}</p>
            ) : null}
          </header>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 90} className="h-full">
              <div className="h-full bg-band-cell p-7 transition-colors duration-300 hover:bg-band-cell-hover lg:p-9">
                <p className="text-[2.2rem] font-extrabold tracking-[-0.02em] lg:text-[2.6rem]">
                  <CountUp
                    value={metric.value}
                    decimals={metric.decimals}
                    suffix={metric.suffix}
                    suffixClassName="text-accent-bright"
                  />
                </p>
                <p className="mt-2 text-[12.5px] font-medium leading-relaxed text-band-muted">
                  {metric.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
