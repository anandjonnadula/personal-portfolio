import { orbitSkills, skillGroups, techLinks } from "@/data/resume";
import SkillOrbit from "@/components/three/SkillOrbit";
import GlareCard from "@/components/ui/GlareCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowUpRightIcon } from "@/components/ui/icons";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          number="02"
          eyebrow="Skills"
          title="A stack chosen by what it ships."
          lead="Every technology below has been used in a real, deployed project — nothing decorative."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <SkillOrbit skills={[...orbitSkills]} />
            <p className="mt-4 text-center font-mono text-xs text-faint">
              click &amp; hold to spin · click a word to open its GitHub
            </p>
          </Reveal>

          <div className="order-1 space-y-4 lg:order-2">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={0.07 * i}>
                <GlareCard
                  className={`p-6 ${
                    group.accent ? "border-accent/30 shadow-[0_0_50px_-20px_rgba(139,123,255,0.45)]" : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-lg font-semibold text-ink">{group.title}</h3>
                    {group.accent ? (
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-accent">
                        Core edge
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-faint">{group.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => {
                      const url = techLinks[skill];
                      return (
                        <li key={skill}>
                          {url ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="chip"
                              aria-label={`${skill} — open GitHub page`}
                            >
                              {skill}
                              <ArrowUpRightIcon className="h-3 w-3 opacity-60" />
                            </a>
                          ) : (
                            <span className="chip">{skill}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </GlareCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
