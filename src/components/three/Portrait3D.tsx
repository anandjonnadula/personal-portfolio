"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import type { PointerEvent } from "react";
import { useRef } from "react";
import { profile } from "@/data/resume";

const MAX_HOVER_TILT = 8; // subtle tracking while hovering
const MAX_DRAG_TILT = 26; // full swing while held

/**
 * 3D portrait card: hovers tilt it gently, click-and-hold grabs it so it can
 * be swung around; releasing springs it back. Layered elements (glow, ring,
 * badge) sit at different depths for real parallax.
 */
export default function Portrait3D() {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({ held: false, lastX: 0, lastY: 0, tx: 0, ty: 0 });

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const setGlare = (e: PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--gx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    cardRef.current.style.setProperty("--gy", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const state = drag.current;
    state.held = true;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
    state.tx = rotateX.get();
    state.ty = rotateY.get();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    setGlare(e);
    const state = drag.current;
    if (state.held) {
      // Grabbed: accumulate rotation from pointer movement.
      state.ty = Math.max(-MAX_DRAG_TILT, Math.min(MAX_DRAG_TILT, state.ty + (e.clientX - state.lastX) * 0.35));
      state.tx = Math.max(-MAX_DRAG_TILT, Math.min(MAX_DRAG_TILT, state.tx - (e.clientY - state.lastY) * 0.3));
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      rotateY.set(state.ty);
      rotateX.set(state.tx);
    } else if (e.pointerType === "mouse" && cardRef.current) {
      // Hovering: gentle tracking.
      const rect = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * MAX_HOVER_TILT * 2);
      rotateX.set(-py * MAX_HOVER_TILT * 1.5);
    }
  };

  const release = () => {
    drag.current.held = false;
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-[320px] select-none sm:max-w-[340px]" style={{ perspective: 1100 }}>
      {/* Ambient glow */}
      <div className="halo absolute -inset-8 rounded-full blur-3xl" aria-hidden="true" />
      {/* Rotating dashed orbit ring (color from --ring, theme-aware) */}
      <div
        className="portrait-ring absolute -inset-5 rounded-[2.4rem] border border-dashed"
        aria-hidden="true"
      />

      <motion.div
        ref={cardRef}
        className="relative cursor-grab touch-pan-y active:cursor-grabbing"
        style={
          reduce
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1100 }
        }
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onPointerLeave={() => {
          if (!drag.current.held) release();
        }}
      >
        <div className="relative overflow-hidden rounded-[1.75rem] border border-edge bg-panel">
          <Image
            src={profile.portrait}
            alt={`Portrait of ${profile.name}`}
            width={880}
            height={1320}
            sizes="(max-width: 640px) 320px, 340px"
            className="block h-auto w-full"
            draggable={false}
          />
          {/* Cursor-following sheen */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(420px circle at var(--gx, 30%) var(--gy, 20%), var(--glare-violet), transparent 55%)",
            }}
            aria-hidden="true"
          />
          {/* Bottom fade for badge readability */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Floating name badge, lifted off the card in 3D */}
        <div
          className="absolute bottom-5 left-1/2 flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-4 py-2 backdrop-blur-md"
          style={{ transform: "translateX(-50%) translateZ(48px)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_10px_2px_rgba(94,234,212,0.6)]" aria-hidden="true" />
          <span className="whitespace-nowrap font-mono text-[0.68rem] tracking-wide text-white">
            {profile.name}
          </span>
        </div>
      </motion.div>

      <p className="mt-5 text-center font-mono text-xs text-faint" aria-hidden="true">
        click &amp; hold to spin
      </p>
    </div>
  );
}
