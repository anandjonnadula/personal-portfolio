"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/resume";

/** Full-screen intro shown once on load, then swept away. */
export default function Loader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), reduce ? 250 : 1550);
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }
          }
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6 px-6">
            <div className="overflow-hidden">
              <motion.p
                className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
                initial={reduce ? { opacity: 0 } : { y: "110%" }}
                animate={reduce ? { opacity: 1 } : { y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                {profile.firstName}
                <span className="text-gradient"> {profile.lastName}</span>
              </motion.p>
            </div>
            <motion.div
              className="h-px w-40 origin-left bg-gradient-to-r from-accent to-glow sm:w-56"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduce ? 0.2 : 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
