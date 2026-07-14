"use client";

import type { PointerEvent, ReactNode, Ref } from "react";
import { useRef, useState } from "react";

type GlareCardProps = {
  children: ReactNode;
  className?: string;
  /** Radial gradient color that follows the cursor. */
  glare?: string;
  /** Renders the card as a link when provided. */
  href?: string;
  external?: boolean;
};

/**
 * Panel with the same cursor-following gradient glow as the project cards,
 * but without the 3D tilt. Used across About, Skills, Experience, Education
 * and Contact.
 */
export default function GlareCard({
  children,
  className = "",
  glare = "var(--glare-violet)",
  href,
  external,
}: GlareCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: PointerEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--gx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    ref.current.style.setProperty("--gy", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const overlay = (
    <span
      className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
      style={{
        opacity: hovering ? 1 : 0,
        background: `radial-gradient(480px circle at var(--gx, 50%) var(--gy, 50%), ${glare}, transparent 46%)`,
      }}
      aria-hidden="true"
    />
  );

  const shared = {
    className: `panel panel-hover relative overflow-hidden ${className}`,
    onPointerMove: handleMove,
    onPointerEnter: () => setHovering(true),
    onPointerLeave: () => setHovering(false),
  };

  if (href) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...shared}
      >
        {overlay}
        {children}
      </a>
    );
  }

  return (
    <div ref={ref as Ref<HTMLDivElement>} {...shared}>
      {overlay}
      {children}
    </div>
  );
}
