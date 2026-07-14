import { ImageResponse } from "next/og";
import { profile } from "@/data/resume";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

/** Social share card, generated at build time. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#060609",
          backgroundImage:
            "radial-gradient(ellipse 60% 55% at 78% 30%, rgba(139,123,255,0.22), transparent), radial-gradient(ellipse 45% 40% at 15% 85%, rgba(76,215,246,0.14), transparent)",
          color: "#eceaf6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#8b7bff",
          }}
        >
          {profile.role}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -3,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            maxWidth: 850,
            fontSize: 30,
            lineHeight: 1.5,
            color: "#a2a2ba",
          }}
        >
          {profile.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 24,
            color: "#6b6b85",
          }}
        >
          {`github.com/${profile.githubHandle} · ${profile.email}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
