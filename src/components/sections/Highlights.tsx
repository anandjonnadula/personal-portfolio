import { highlights } from "@/data/resume";
import NumberTicker from "@/components/ui/NumberTicker";
import Reveal from "@/components/ui/Reveal";

/** Resume-sourced metrics band: model performance, platform scale, service. */
export default function Highlights() {
  return (
    <section aria-label="Highlights" className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="panel relative overflow-hidden p-8 sm:p-10">
            <div
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {highlights.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                    <NumberTicker value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm font-medium text-accent-soft">{stat.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-faint">{stat.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-2 border-t border-edge pt-8">
              {highlights.pills.map((pill) => (
                <span key={pill} className="chip">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
