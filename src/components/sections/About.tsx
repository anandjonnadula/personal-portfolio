import { about, profile } from "@/data/resume";
import Portrait3D from "@/components/three/Portrait3D";
import GlareCard from "@/components/ui/GlareCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading number="01" eyebrow="About" title={about.heading} />

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[340px_1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24">
            <Portrait3D />
          </Reveal>

          <div className="space-y-6">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">{paragraph}</p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <GlareCard className="p-6 sm:p-7">
                <dl className="divide-y divide-edge">
                  {about.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline justify-between gap-6 py-3.5 first:pt-0 last:pb-0"
                    >
                      <dt className="font-mono text-xs uppercase tracking-widest text-faint">{fact.label}</dt>
                      <dd className="text-right text-sm font-medium text-ink">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-edge pt-4">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-accent transition-colors hover:text-accent-soft"
                  >
                    github.com/{profile.githubHandle} ↗
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-accent transition-colors hover:text-accent-soft"
                  >
                    linkedin.com/in/{profile.linkedinHandle} ↗
                  </a>
                </div>
              </GlareCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
