import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Helarys — Websites for growing businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const iconBuffer = fs.readFileSync(path.join(process.cwd(), "public/brand/icon.svg"));
  const iconSrc = `data:image/svg+xml;base64,${iconBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0F19",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(3,211,251,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(2,101,249,0.10) 0%, transparent 70%)",
          }}
        />
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.07,
            backgroundImage: "radial-gradient(circle, rgba(34,211,238,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Top border line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent, #03D3FB, #0265F9, transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 28,
            zIndex: 10,
          }}
        >
          {/* Icon + wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iconSrc} width={100} height={100} alt="" />
            <div
              style={{
                fontSize: 110,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                background: "linear-gradient(90deg, #03D3FB 0%, #60c8ff 40%, #0265F9 100%)",
                backgroundClip: "text",
                color: "transparent",
                lineHeight: 1,
              }}
            >
              Helarys
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 400,
              color: "#a1a1aa",
              letterSpacing: "-0.01em",
            }}
          >
            Websites for growing businesses
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#03D3FB" }} />
          <div style={{ fontSize: 15, color: "#52525b", letterSpacing: "0.05em" }}>
            helarys.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
