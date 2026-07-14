"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { useThemeValue } from "@/lib/useThemeValue";

/** Dark/light switch, pinned to the top-right corner of the viewport. */
export default function ThemeToggle() {
  const theme = useThemeValue();
  const reduce = useReducedMotion();

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    if (next === "light") {
      document.documentElement.dataset.theme = "light";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing — the choice just won't persist.
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="fixed right-4 top-3 z-[92] flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-panel/80 text-muted shadow-[0_2px_16px_-4px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-colors hover:border-accent/50 hover:text-accent-soft"
      initial={reduce ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={reduce ? false : { rotate: -60, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { rotate: 60, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
