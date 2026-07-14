"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useRef } from "react";
import type { OrbitSkill } from "@/data/resume";

type SkillOrbitProps = {
  skills: OrbitSkill[];
};

const BASE_SPIN = 0.32; // idle rotation speed (rad/s)
const BASE_TILT = -0.3;
const DRAG_CLICK_THRESHOLD = 6; // px of movement before a press counts as a drag

/**
 * A 3D "skill galaxy": each technology is a link placed on a fibonacci sphere
 * and projected to 2D every frame, so the cloud rotates in depth without a
 * WebGL context. It drifts on its own, leans toward the cursor, and can be
 * grabbed (click-and-hold) to spin with inertia. Clicking a word opens that
 * technology's GitHub page; clicks are suppressed if the press was a drag.
 */
export default function SkillOrbit({ skills }: SkillOrbitProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const movedRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const count = skills.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const base = Array.from({ length: count }, (_, i) => {
      const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let radius = 0;
    const measure = () => {
      radius = (container.offsetWidth / 2) * 0.78;
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);

    // Rotation state: idle drift + pointer lean + grab-drag with inertia.
    let ry = 0;
    let rx = BASE_TILT;
    let vy = BASE_SPIN;
    let vx = 0;
    let targetVy = BASE_SPIN;
    let targetRx = BASE_TILT;
    let held = false;
    let lastX = 0;
    let lastY = 0;

    // No pointer capture here: capturing would retarget the pointerup (and the
    // click derived from it) to the container, so the word links would never
    // fire. Drag continues outside the container via window-level listeners.
    const onPointerDown = (e: PointerEvent) => {
      if (reduceMotion) return;
      held = true;
      movedRef.current = 0;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onWindowMove = (e: PointerEvent) => {
      if (!held) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      movedRef.current += Math.abs(dx) + Math.abs(dy);
      lastX = e.clientX;
      lastY = e.clientY;
      // Rotate with the pointer (screen-Y grows downward, so pitch subtracts
      // to keep the sphere's front following the drag); remember velocity for inertia.
      ry += dx * 0.006;
      rx = Math.max(-1.2, Math.min(1.2, rx - dy * 0.004));
      vy = dx * 0.006 * 60;
      vx = -dy * 0.004 * 60;
    };

    const onWindowUp = () => {
      held = false;
    };

    const onHoverMove = (e: PointerEvent) => {
      if (held || e.pointerType !== "mouse") return;
      const rect = container.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetVy = BASE_SPIN + px * 0.9;
      targetRx = BASE_TILT - py * 0.8;
    };

    const onPointerLeave = () => {
      targetVy = BASE_SPIN;
      targetRx = BASE_TILT;
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onHoverMove);
    container.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", onWindowUp);
    window.addEventListener("pointercancel", onWindowUp);

    let visible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersectionObserver.observe(container);

    const project = () => {
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      for (let i = 0; i < count; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const p = base[i];
        // Rotate around Y, then X, then project orthographically.
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const depth = (z2 + 1) / 2; // 0 (back) → 1 (front)
        const scale = 0.55 + depth * 0.6;
        el.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y1 * radius}px, 0) scale(${scale})`;
        el.style.opacity = String(0.22 + depth * 0.78);
        el.style.zIndex = String(Math.round(depth * 100));
        el.dataset.front = depth > 0.8 ? "true" : "false";
      }
    };

    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;
      if (!held) {
        // Inertia decays back toward the idle drift.
        vy += (targetVy - vy) * dt * 2.2;
        vx += (0 - vx) * dt * 2.2;
        rx += (targetRx - rx) * dt * 2 + vx * dt;
        ry += vy * dt;
      }
      project();
    };

    if (reduceMotion) {
      project(); // static, but still laid out in 3D
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onHoverMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointermove", onWindowMove);
      window.removeEventListener("pointerup", onWindowUp);
      window.removeEventListener("pointercancel", onWindowUp);
    };
  }, [skills]);

  // A press that travelled further than the threshold is a drag, not a click.
  const suppressClickAfterDrag = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (movedRef.current > DRAG_CLICK_THRESHOLD) {
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[30rem] cursor-grab touch-pan-y active:cursor-grabbing"
      role="group"
      aria-label="Skill galaxy — each technology links to its GitHub page"
    >
      {/* Core glow */}
      <div
        className="halo-strong absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_24px_4px_rgba(139,123,255,0.55)]"
        aria-hidden="true"
      />
      {skills.map((skill, i) => (
        <a
          key={skill.label}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          href={skill.url}
          target="_blank"
          rel="noopener noreferrer"
          className="orbit-item"
          onClick={suppressClickAfterDrag}
          draggable={false}
          aria-label={`${skill.label} — open GitHub page`}
        >
          {skill.label}
        </a>
      ))}
    </div>
  );
}
