"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/resume";
import GlareCard from "@/components/ui/GlareCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);

  // The spine fills as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          number="04"
          eyebrow="Experience"
          title="Leadership beyond the codebase."
          lead="Elected roles and long-term service — coordinating people, events and initiatives at campus scale."
        />

        <div ref={trackRef} className="relative mt-16">
          {/* Timeline spine */}
          <div
            className="absolute bottom-2 left-[7px] top-2 w-px bg-edge md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent to-glow md:left-1/2 md:-translate-x-1/2"
            style={reduce ? undefined : { scaleY }}
            aria-hidden="true"
          />

          <ol className="space-y-12 md:space-y-16">
            {experience.map((entry, i) => {
              const left = i % 2 === 0;
              return (
                <li key={entry.role} className="relative">
                  {/* Node dot */}
                  <span
                    className="absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    <span className="absolute h-full w-full rounded-full bg-accent/25" />
                    <span className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_14px_2px_rgba(139,123,255,0.6)]" />
                  </span>

                  <div
                    className={`pl-10 md:w-[calc(50%-2.5rem)] md:pl-0 ${
                      left ? "md:mr-auto md:text-right" : "md:ml-auto"
                    }`}
                  >
                    <Reveal delay={0.05}>
                      <GlareCard className="p-6 text-left sm:p-7">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="chip text-accent-soft!">{entry.period}</span>
                          <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-faint">
                            {entry.type}
                          </span>
                        </div>
                        <h3 className="mt-4 font-display text-xl font-semibold text-ink">{entry.role}</h3>
                        <p className="mt-1 text-sm font-medium text-accent-soft/80">{entry.org}</p>
                        <ul className="mt-3 space-y-2">
                          {entry.points.map((point, j) => (
                            <li key={j} className="text-sm leading-relaxed text-muted">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </GlareCard>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
