import { education } from "@/data/resume";
import GlareCard from "@/components/ui/GlareCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Education() {
  const featured = education.filter((entry) => entry.featured);
  const rest = education.filter((entry) => !entry.featured);

  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading number="05" eyebrow="Education" title="Grounded in AI & Data Science." />

        <div className="mt-12 space-y-5">
          {featured.map((entry) => (
            <Reveal key={entry.title}>
              <GlareCard className="p-7 sm:p-9">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative flex flex-wrap items-start justify-between gap-6">
                  <div className="max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{entry.period}</p>
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.7rem]">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-base text-muted">{entry.institution}</p>
                    {entry.detail ? (
                      <p className="mt-3 text-sm leading-relaxed text-faint">{entry.detail}</p>
                    ) : null}
                  </div>
                  <div className="rounded-2xl border border-accent/30 bg-accent/10 px-6 py-4 text-center">
                    <p className="font-display text-3xl font-bold text-accent-soft">{entry.score.value}</p>
                    <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">
                      {entry.score.label}
                    </p>
                  </div>
                </div>
              </GlareCard>
            </Reveal>
          ))}

          <div className="grid gap-5 sm:grid-cols-2">
            {rest.map((entry, i) => (
              <Reveal key={entry.title} delay={0.08 + i * 0.07}>
                <GlareCard className="flex h-full items-start justify-between gap-4 p-6 sm:p-7">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-faint">{entry.period}</p>
                    <h3 className="mt-2.5 font-display text-lg font-semibold text-ink">{entry.title}</h3>
                    <p className="mt-1 text-sm text-muted">{entry.institution}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-bold text-accent-soft">{entry.score.value}</p>
                    <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">{entry.score.label}</p>
                  </div>
                </GlareCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
