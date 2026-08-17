import GlareCard from "@/components/ui/GlareCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Certifications as CertificationsData } from "@/data/resume";
export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          number="03"
          eyebrow="Certifications"
          title="Everything has its place in the stack."
          lead="Professional certifications validating my skills across web development, AI, and cloud technologies."
        />

        <div className="mt-14 grid gap-6">
          {CertificationsData.map((certification, i: number) => (
            <Reveal key={certification.label} delay={0.07 * i}>
              <GlareCard className="p-6 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-lg font-semibold text-ink accent">
                        {certification.index}&nbsp;&nbsp;&nbsp;&nbsp;
                        {certification.label}
                      </h3>

                      <span className="rounded-full border border-ink/10 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                        {certification.period}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-3">
                    <a
                      href={certification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chip"
                      aria-label={`${certification.label} — verify certification`}
                    >
                      Verify
                      <ArrowUpRightIcon className="h-3 w-3 opacity-60" />
                    </a>

                    <a
                      href={certification.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chip"
                      aria-label={`${certification.label} — view certificate`}
                    >
                      Certificate
                      <ArrowUpRightIcon className="h-3 w-3 opacity-60" />
                    </a>
                  </div>
                </div>
              </GlareCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}