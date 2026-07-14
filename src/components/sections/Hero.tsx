"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { profile } from "@/data/resume";
import Magnetic from "@/components/ui/Magnetic";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

// Entrance choreography starts as the intro loader sweeps away.
const BASE_DELAY = 1.45;

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.75], [0, -60]);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: BASE_DELAY + delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-svh items-center overflow-hidden">
      {/* CSS backdrop — always present, doubles as the no-WebGL fallback */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,black,transparent)]" />
        <div className="blob left-[8%] top-[18%] h-72 w-72 bg-accent/14" />
        <div className="blob right-[6%] top-[30%] h-96 w-96 bg-glow/10 [animation-delay:-8s]" />
      </div>

      <HeroScene reducedMotion={reduce ?? false} />

      {/* Readability gradients over the scene */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-void via-void/55 to-transparent lg:via-void/35"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-28 pt-32 sm:px-8"
        style={reduce ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <motion.p className="eyebrow" {...enter(0)}>
          {profile.roleParts.join(" · ")}
        </motion.p>

        <motion.h1
          className="mt-6 font-display text-[clamp(2.9rem,9vw,6.75rem)] font-bold leading-[0.98] tracking-tight"
          {...enter(0.1)}
        >
          <span className="block text-ink">{profile.firstName}</span>
          <span className="text-gradient block">{profile.lastName}</span>
        </motion.h1>

        <motion.p className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" {...enter(0.22)}>
          {profile.tagline}
        </motion.p>

        <motion.div className="mt-5 flex flex-wrap gap-2" {...enter(0.3)}>
          <span className="chip">{profile.degree}</span>
          <span className="chip">
            {profile.collegeShort} · {profile.gradClass}
          </span>
        </motion.div>

        <motion.div className="mt-10 flex flex-wrap items-center gap-4" {...enter(0.4)}>
          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-[#6d5cf0] px-7 py-3.5 font-medium text-white shadow-[0_8px_40px_-10px_rgba(139,123,255,0.7)] transition-shadow hover:shadow-[0_10px_50px_-8px_rgba(139,123,255,0.9)]"
            >
              Explore Projects
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-edge bg-ink/[0.03] px-7 py-3.5 font-medium text-ink transition-colors hover:border-accent/50 hover:bg-ink/[0.06]"
            >
              Get in Touch
            </a>
          </Magnetic>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-edge bg-ink/[0.03] text-muted transition-all hover:border-accent/50 hover:text-ink"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-edge bg-ink/[0.03] text-muted transition-all hover:border-accent/50 hover:text-ink"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: BASE_DELAY + 1, duration: 1 }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2.5">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-faint">Scroll</span>
          <div className="flex h-9 w-5 justify-center rounded-full border border-edge pt-1.5">
            <div className="scroll-dot h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
