"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import type { PointerEvent as ReactPointerEvent, ReactNode, RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useThemeValue, type Theme } from "@/lib/useThemeValue";

type Palette = {
  node: string;
  nodeAlt: string;
  edge: string;
  edgeOpacity: number;
  pulse: string;
  particle: string;
  particleOpacity: number;
  glowOpacity: number;
  blending: THREE.Blending;
};

/* Additive blending glows on dark; normal blending with deeper tones reads on light. */
const PALETTES: Record<Theme, Palette> = {
  dark: {
    node: "#8b7bff",
    nodeAlt: "#4cd7f6",
    edge: "#8b7bff",
    edgeOpacity: 0.13,
    pulse: "#d9f6ff",
    particle: "#7a86c8",
    particleOpacity: 0.55,
    glowOpacity: 0.85,
    blending: THREE.AdditiveBlending,
  },
  light: {
    node: "#4c3ad6",
    nodeAlt: "#067a9e",
    edge: "#5443dd",
    edgeOpacity: 0.45,
    pulse: "#2b1daa",
    particle: "#7d7da2",
    particleOpacity: 0.7,
    glowOpacity: 0.3,
    blending: THREE.NormalBlending,
  },
};

type DragState = {
  held: boolean;
  dx: number;
  dy: number;
  offX: number;
  offY: number;
  vx: number;
  vy: number;
};

function webglSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/** Soft circular sprite so points render as glowing dots instead of squares. */
function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.85)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);
}

/** Evenly distributes points on a sphere (golden-angle spiral) with slight jitter. */
function fibonacciSphere(count: number, radius: number, jitter = 0.14): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push(
      new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r)
        .multiplyScalar(radius)
        .add(
          new THREE.Vector3(
            (Math.random() - 0.5) * jitter,
            (Math.random() - 0.5) * jitter,
            (Math.random() - 0.5) * jitter
          )
        )
    );
  }
  return points;
}

type NeuralCoreProps = {
  nodeCount: number;
  animate: boolean;
  palette: Palette;
  theme: Theme;
};

/**
 * The "neural core": nodes on a sphere, edges between near neighbours, and
 * bright signal pulses travelling along random edges each frame.
 */
function NeuralCore({ nodeCount, animate, palette, theme }: NeuralCoreProps) {
  const spinRef = useRef<THREE.Group | null>(null);
  const dotTexture = useDotTexture();

  const { nodeGeo, edgeGeo, pulseGeo, nodes, edges, pulses } = useMemo(() => {
    const accent = new THREE.Color(palette.node);
    const alt = new THREE.Color(palette.nodeAlt);
    const nodes = fibonacciSphere(nodeCount, 2.2);

    const edges: [number, number][] = [];
    const maxDistance = 1.02;
    for (let i = 0; i < nodes.length; i++) {
      let linked = 0;
      for (let j = i + 1; j < nodes.length && linked < 3; j++) {
        if (nodes[i].distanceTo(nodes[j]) < maxDistance) {
          edges.push([i, j]);
          linked++;
        }
      }
    }

    const nodePositions = new Float32Array(nodes.length * 3);
    const nodeColors = new Float32Array(nodes.length * 3);
    nodes.forEach((p, i) => {
      nodePositions.set([p.x, p.y, p.z], i * 3);
      const color = i % 4 === 0 ? alt : accent;
      nodeColors.set([color.r, color.g, color.b], i * 3);
    });
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));

    const edgePositions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      edgePositions.set(
        [nodes[a].x, nodes[a].y, nodes[a].z, nodes[b].x, nodes[b].y, nodes[b].z],
        i * 6
      );
    });
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));

    const pulseCount = Math.min(14, Math.max(edges.length, 1));
    const pulses = Array.from({ length: pulseCount }, () => ({
      edge: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.4 + Math.random() * 0.55,
    }));
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pulseCount * 3), 3));

    return { nodeGeo, edgeGeo, pulseGeo, nodes, edges, pulses };
  }, [nodeCount, palette]);

  useFrame((_, delta) => {
    if (!animate) return;
    if (spinRef.current) {
      spinRef.current.rotation.y += delta * 0.07;
      spinRef.current.rotation.x = Math.sin(spinRef.current.rotation.y * 0.55) * 0.07;
    }
    if (edges.length === 0) return;
    const attr = pulseGeo.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < pulses.length; i++) {
      const pulse = pulses[i];
      pulse.t += delta * pulse.speed;
      if (pulse.t >= 1) {
        pulse.t = 0;
        pulse.edge = Math.floor(Math.random() * edges.length);
      }
      const [a, b] = edges[pulse.edge];
      attr.setXYZ(
        i,
        nodes[a].x + (nodes[b].x - nodes[a].x) * pulse.t,
        nodes[a].y + (nodes[b].y - nodes[a].y) * pulse.t,
        nodes[a].z + (nodes[b].z - nodes[a].z) * pulse.t
      );
    }
    attr.needsUpdate = true;
  });

  return (
    <group ref={spinRef}>
      <points geometry={nodeGeo}>
        <pointsMaterial
          key={`node-${theme}`}
          vertexColors
          map={dotTexture}
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={palette.blending}
        />
      </points>
      <lineSegments geometry={edgeGeo}>
        <lineBasicMaterial
          key={`edge-${theme}`}
          color={palette.edge}
          transparent
          opacity={palette.edgeOpacity}
          depthWrite={false}
          blending={palette.blending}
        />
      </lineSegments>
      <points geometry={pulseGeo}>
        <pointsMaterial
          key={`pulse-${theme}`}
          color={palette.pulse}
          map={dotTexture}
          size={0.2}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={palette.blending}
        />
      </points>
    </group>
  );
}

/** Soft radial glow billboard behind the core. */
function CoreGlow({ opacity }: { opacity: number }) {
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, "rgba(139, 123, 255, 0.5)");
      gradient.addColorStop(0.45, "rgba(139, 123, 255, 0.14)");
      gradient.addColorStop(1, "rgba(139, 123, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <sprite scale={[7.5, 7.5, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}

/** Distant star field drifting slowly in the opposite direction for depth. */
function ParticleField({
  count,
  animate,
  palette,
  theme,
}: {
  count: number;
  animate: boolean;
  palette: Palette;
  theme: Theme;
}) {
  const ref = useRef<THREE.Points | null>(null);
  const dotTexture = useDotTexture();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.6 + Math.random() * 6.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75;
      positions[i * 3 + 2] = r * Math.cos(phi) - 1.5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((_, delta) => {
    if (!animate || !ref.current) return;
    ref.current.rotation.y -= delta * 0.012;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        key={`particle-${theme}`}
        color={palette.particle}
        map={dotTexture}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={palette.particleOpacity}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Eases the scene toward the pointer, floats gently, and applies
 * click-and-hold drag rotation with inertia on release.
 */
function Rig({
  children,
  animate,
  drag,
}: {
  children: ReactNode;
  animate: boolean;
  drag: RefObject<DragState>;
}) {
  const ref = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const s = drag.current;

    if (s.held) {
      const addY = s.dx * 0.005;
      const addX = s.dy * 0.0035;
      s.offY += addY;
      s.offX += addX;
      if (delta > 0) {
        s.vy = addY / delta;
        s.vx = addX / delta;
      }
      s.dx = 0;
      s.dy = 0;
    } else {
      // Inertia after release, decaying exponentially.
      s.offY += s.vy * delta;
      s.offX += s.vx * delta;
      const decay = Math.exp(-2.1 * delta);
      s.vy *= decay;
      s.vx *= decay;
    }
    s.offX = THREE.MathUtils.clamp(s.offX, -1.1, 1.1);

    const targetY = (animate ? state.pointer.x * 0.35 : 0) + s.offY;
    const targetX = (animate ? -state.pointer.y * 0.22 : 0) + s.offX;
    const smoothing = s.held ? 10 : 2.4;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, targetY, smoothing, delta);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, targetX, smoothing, delta);
    if (animate) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.12;
    }
  });

  return <group ref={ref}>{children}</group>;
}

type HeroSceneProps = {
  reducedMotion?: boolean;
};

/**
 * WebGL hero backdrop. Renders nothing when WebGL is unavailable — the hero's
 * CSS gradient backdrop remains as the graceful fallback. Rendering pauses
 * when the hero scrolls out of view. Click-and-hold anywhere over the scene
 * grabs the constellation and spins it.
 */
export default function HeroScene({ reducedMotion = false }: HeroSceneProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [inView, setInView] = useState(true);
  const [compact, setCompact] = useState(false);
  const theme = useThemeValue();
  const palette = PALETTES[theme];

  const dragRef = useRef<DragState>({ held: false, dx: 0, dy: 0, offX: 0, offY: 0, vx: 0, vy: 0 });
  const lastPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setSupported(webglSupported());
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.04,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [supported]);

  const animate = !reducedMotion;

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!animate) return;
    dragRef.current.held = true;
    dragRef.current.vx = 0;
    dragRef.current.vy = 0;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const s = dragRef.current;
    if (!s.held) return;
    s.dx += e.clientX - lastPointer.current.x;
    s.dy += e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const endDrag = () => {
    dragRef.current.held = false;
  };

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
      aria-hidden="true"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {supported && (
        <Canvas
          frameloop={inView && animate ? "always" : "demand"}
          camera={{ position: [0, 0, 6.5], fov: 42 }}
          dpr={[1, 1.75]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <group position={compact ? [0, 0.4, 0] : [1.6, -0.1, 0]}>
            <Rig animate={animate} drag={dragRef}>
              <CoreGlow opacity={palette.glowOpacity} />
              <NeuralCore nodeCount={compact ? 96 : 150} animate={animate} palette={palette} theme={theme} />
            </Rig>
            <ParticleField
              count={compact ? 320 : 650}
              animate={animate}
              palette={palette}
              theme={theme}
            />
          </group>
        </Canvas>
      )}
    </div>
  );
}
