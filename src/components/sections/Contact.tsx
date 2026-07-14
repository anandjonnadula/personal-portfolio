"use client";

import { useState } from "react";
import { profile } from "@/data/resume";
import GlareCard from "@/components/ui/GlareCard";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  GitHubIcon,
  GlobeIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/ui/icons";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto link remains the fallback.
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="blob left-1/2 top-10 h-80 w-80 -translate-x-1/2 bg-accent/12" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          number="06"
          eyebrow="Contact"
          title="Let's build something that ships."
          lead="Open to conversations with recruiters, teams and collaborators — the fastest way to reach me is email."
          align="center"
        />

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent to-[#6d5cf0] px-8 py-4 font-medium text-white shadow-[0_8px_40px_-10px_rgba(139,123,255,0.7)] transition-shadow hover:shadow-[0_10px_50px_-8px_rgba(139,123,255,0.9)]"
            >
              <MailIcon className="h-5 w-5" />
              {profile.email}
            </a>
          </Magnetic>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-edge bg-ink/[0.03] px-5 py-4 text-sm font-medium text-muted transition-colors hover:border-accent/50 hover:text-ink"
            aria-live="polite"
          >
            {copied ? (
              <>
                <CheckIcon className="h-4 w-4 text-mint" />
                Copied
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4" />
                Copy email
              </>
            )}
          </button>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0.12}>
            <GlareCard href={profile.github} external className="group flex h-full flex-col gap-3 p-6">
              <GitHubIcon className="h-6 w-6 text-accent-soft" />
              <div>
                <p className="font-display font-semibold text-ink">GitHub</p>
                <p className="mt-1 break-all font-mono text-xs text-faint">github.com/{profile.githubHandle}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-accent-soft">
                View profile
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </span>
            </GlareCard>
          </Reveal>

          <Reveal delay={0.16}>
            <GlareCard href={profile.linkedin} external className="group flex h-full flex-col gap-3 p-6">
              <LinkedInIcon className="h-6 w-6 text-accent-soft" />
              <div>
                <p className="font-display font-semibold text-ink">LinkedIn</p>
                <p className="mt-1 break-all font-mono text-xs text-faint">
                  linkedin.com/in/{profile.linkedinHandle}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-1 text-sm text-muted transition-colors group-hover:text-accent-soft">
                Connect
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </span>
            </GlareCard>
          </Reveal>

          <Reveal delay={0.2}>
            <GlareCard className="flex h-full flex-col gap-3 p-6">
              <PhoneIcon className="h-6 w-6 text-accent-soft" />
              <div>
                <p className="font-display font-semibold text-ink">Phone</p>
                <p className="mt-1 font-mono text-xs text-faint">
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-accent-soft"
                  >
                    {profile.phone}
                  </a>
                </p>
                <p className="mt-1.5 font-mono text-xs text-faint">
                  <a
                    href={`tel:${profile.phoneSecondary.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-accent-soft"
                  >
                    {profile.phoneSecondary}
                  </a>
                </p>
              </div>
              <span className="mt-auto text-sm text-muted">Call or message</span>
            </GlareCard>
          </Reveal>

          <Reveal delay={0.24}>
            <GlareCard className="flex h-full flex-col gap-3 p-6">
              <GlobeIcon className="h-6 w-6 text-accent-soft" />
              <div>
                <p className="font-display font-semibold text-ink">Languages</p>
                <p className="mt-1 text-sm text-muted">{profile.languages.join(" · ")}</p>
              </div>
            </GlareCard>
          </Reveal>
        </div>

        <Reveal delay={0.28} className="mt-12 text-center">
          <a
            href={profile.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-7 py-3.5 font-medium text-accent-soft transition-all hover:border-accent/70 hover:bg-accent/20 hover:shadow-[0_0_30px_-6px_rgba(139,123,255,0.6)]"
          >
            View Resume (PDF)
            <ArrowUpRightIcon className="h-5 w-5" />
          </a>
          <p className="mt-3 text-xs text-faint">Opens in a new tab — download it from the viewer if needed.</p>
        </Reveal>
      </div>
    </section>
  );
}
