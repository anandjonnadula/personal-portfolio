import { projects, profile, techLinks } from "@/data/resume";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/ui/icons";

const HUE_GLARE: Record<string, string> = {
  violet: "var(--glare-violet)",
  cyan: "var(--glare-cyan)",
  mint: "var(--glare-mint)",
};

const HUE_TEXT: Record<string, string> = {
  violet: "text-accent",
  cyan: "text-glow",
  mint: "text-mint",
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          number="03"
          eyebrow="Projects"
          title="Case studies in shipping."
          lead="Three production-grade builds — a live ERP platform, a clinical-grade imaging system and a community health tool built on data collected in the field."
        />

        <div className="mt-14 space-y-8">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={0.05 * i}>
              <TiltCard className="group relative">
                <article
                  className="panel panel-hover relative overflow-hidden p-7 sm:p-10"
                  style={{ ["--glare-color" as string]: HUE_GLARE[project.hue] }}
                >
                  {/* Cursor-following glare, driven by TiltCard's --gx/--gy vars */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(620px circle at var(--gx, 50%) var(--gy, 50%), var(--glare-color), transparent 45%)",
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
                    {/* Meta column */}
                    <div className="flex flex-row flex-wrap items-baseline gap-x-6 gap-y-4 lg:flex-col lg:gap-y-6">
                      <span className={`font-display text-5xl font-bold tracking-tight sm:text-6xl ${HUE_TEXT[project.hue]} opacity-60`}>
                        {project.index}
                      </span>
                      <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-faint">Timeline</p>
                        <p className="mt-1 text-sm text-muted">{project.period}</p>
                      </div>
                      {project.metrics ? (
                        <dl className="w-full space-y-3 border-t border-edge pt-4 max-lg:hidden">
                          {project.metrics.map((metric) => (
                            <div key={metric.label}>
                              <dd className={`font-display text-2xl font-bold ${HUE_TEXT[project.hue]}`}>
                                {metric.value}
                              </dd>
                              <dt className="text-xs text-faint">{metric.label}</dt>
                            </div>
                          ))}
                        </dl>
                      ) : null}
                    </div>

                    {/* Content column */}
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-faint">{project.kind}</p>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{project.subtitle}</p>

                      <ul className="mt-6 space-y-3">
                        {project.bullets.map((bullet, j) => (
                          <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted">
                            <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${HUE_TEXT[project.hue]} bg-current`} />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {/* Metrics inline on small screens */}
                      {project.metrics ? (
                        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 lg:hidden">
                          {project.metrics.map((metric) => (
                            <div key={metric.label}>
                              <dd className={`font-display text-xl font-bold ${HUE_TEXT[project.hue]}`}>
                                {metric.value}
                              </dd>
                              <dt className="text-xs text-faint">{metric.label}</dt>
                            </div>
                          ))}
                        </dl>
                      ) : null}

                      <ul className="mt-7 flex flex-wrap gap-2">
                        {project.tech.map((tech) => {
                          const url = techLinks[tech];
                          return (
                            <li key={tech}>
                              {url ? (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="chip"
                                  aria-label={`${tech} — open GitHub page`}
                                >
                                  {tech}
                                  <ArrowUpRightIcon className="h-3 w-3 opacity-60" />
                                </a>
                              ) : (
                                <span className="chip">{tech}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>

                      {project.liveUrl ? (
                        <div className="mt-7">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent-soft transition-all hover:border-accent/70 hover:bg-accent/20"
                          >
                            View Live Platform
                            <ArrowUpRightIcon className="h-4 w-4" />
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-sm text-faint">
            More on{" "}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted underline-offset-4 transition-colors hover:text-accent-soft hover:underline"
            >
              <GitHubIcon className="h-4 w-4" />
              github.com/{profile.githubHandle}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
