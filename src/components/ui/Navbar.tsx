"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks, profile } from "@/data/resume";
import { ArrowUpRightIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";

export default function Navbar() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in the middle of the viewport for the active state.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-[90] transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-b border-edge bg-void/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
      initial={reduce ? false : { y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Right padding keeps items clear of the fixed theme toggle in the corner. */}
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between pl-5 pr-16 sm:pl-8 sm:pr-16"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="group flex items-center gap-3"
          aria-label={`${profile.name} — back to top`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-edge bg-panel font-display text-sm font-bold text-accent-soft transition-colors group-hover:border-accent/50">
            {profile.initials}
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight text-ink sm:block">
            {profile.name}
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                active === link.id ? "bg-ink/[0.06] text-ink" : "text-muted hover:text-ink"
              }`}
              aria-current={active === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
          <a
            href={profile.resumeFile}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-soft transition-all hover:border-accent/70 hover:bg-accent/20 hover:shadow-[0_0_24px_-6px_rgba(139,123,255,0.6)]"
          >
            Resume
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge text-ink lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col bg-void/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-16 items-center justify-between px-5 sm:px-8">
              <span className="font-display text-sm font-semibold text-ink">{profile.name}</span>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-edge text-ink"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 px-8 pb-16">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="border-b border-edge py-4 font-display text-3xl font-semibold tracking-tight text-ink transition-colors hover:text-accent-soft"
                  initial={reduce ? false : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="mr-4 font-mono text-sm text-accent">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={profile.resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-6 py-3 font-medium text-accent-soft"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                View Resume
                <ArrowUpRightIcon className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
