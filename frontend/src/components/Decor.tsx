"use client";

// ─── Soft radial blobs (used on hero + about) ─────────────────────────────
export function DecorBlobs({ variant = "rose" }: { variant?: "rose" | "mauve" | "both" }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {(variant === "rose" || variant === "both") && (
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(44,40,40,0.04) 0%, transparent 65%)" }} />
      )}
      {(variant === "mauve" || variant === "both") && (
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(44,40,40,0.03) 0%, transparent 65%)" }} />
      )}
    </div>
  );
}

// ─── Hero: thin botanical sprig corners ───────────────────────────────────
export function DecorSprig({
  position = "top-right",
  opacity = 0.35,
}: {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  opacity?: number;
}) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: 220,
    height: 220,
    pointerEvents: "none",
    opacity,
    ...(position === "top-right"    && { top: 0, right: 0 }),
    ...(position === "top-left"     && { top: 0, left: 0, transform: "scaleX(-1)" }),
    ...(position === "bottom-right" && { bottom: 0, right: 0, transform: "scaleY(-1)" }),
    ...(position === "bottom-left"  && { bottom: 0, left: 0, transform: "scale(-1)" }),
  };
  return (
    <div style={style}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <path d="M185 8 Q130 60 75 165" stroke="#C4847A" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M152 42 Q132 68 110 72" stroke="#C4847A" strokeWidth="1.1" strokeLinecap="round"/>
        <path d="M120 78 Q98 98 88 120" stroke="#C4847A" strokeWidth="1.1" strokeLinecap="round"/>
        <path d="M93 112 Q78 126 68 144" stroke="#C4847A" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="110" cy="72" r="3" fill="#C4847A"/>
        <circle cx="88" cy="120" r="2.5" fill="#C4847A"/>
        <circle cx="68" cy="144" r="2.2" fill="#C4847A"/>
        <circle cx="75" cy="165" r="2.8" fill="#C4847A"/>
        <path d="M140 55 Q146 48 155 45" stroke="#C4847A" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="155" cy="45" r="2" fill="#C4847A"/>
        <path d="M104 90 Q110 83 118 81" stroke="#C4847A" strokeWidth="0.9" strokeLinecap="round"/>
        <circle cx="118" cy="81" r="1.8" fill="#C4847A"/>
      </svg>
    </div>
  );
}

export function DecorCornerLines({
  position = "top-right",
  opacity = 0.25,
}: {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  opacity?: number;
}) {
  const style: React.CSSProperties = {
    position: "absolute",
    width: 80,
    height: 80,
    pointerEvents: "none",
    opacity,
    ...(position === "top-right"    && { top: 20, right: 20 }),
    ...(position === "top-left"     && { top: 20, left: 20, transform: "scaleX(-1)" }),
    ...(position === "bottom-right" && { bottom: 20, right: 20, transform: "scaleY(-1)" }),
    ...(position === "bottom-left"  && { bottom: 20, left: 20, transform: "scale(-1)" }),
  };
  return (
    <div style={style}>
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <path d="M80 0 L80 32" stroke="#C4847A" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M80 0 L48 0" stroke="#C4847A" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="80" cy="0" r="2.5" fill="#C4847A"/>
        <path d="M72 0 L72 20" stroke="#C4847A" strokeWidth="0.6" strokeLinecap="round" opacity="0.5"/>
        <path d="M80 8 L60 8" stroke="#C4847A" strokeWidth="0.6" strokeLinecap="round" opacity="0.5"/>
      </svg>
    </div>
  );
}

// ─── About: radiating thin lines from bottom-center ──────────────────────
const CX = 50;
const CY = 110;
const LEN = 130;
const RADIATE_LINES = Array.from({ length: 24 }, (_, i) => {
  const angle = -160 + (i * 140) / 23;
  const rad = (angle * Math.PI) / 180;
  return {
    x2: Math.round((CX + LEN * Math.cos(rad)) * 1000) / 1000,
    y2: Math.round((CY + LEN * Math.sin(rad)) * 1000) / 1000,
  };
});

export function DecorRadiate() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
        style={{ opacity: 0.09 }}
      >
        {RADIATE_LINES.map((pt, i) => (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={pt.x2}
            y2={pt.y2}
            stroke="#C4847A"
            strokeWidth="0.18"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

// ─── About: diamond mesh wallpaper ───────────────────────────────────────
export function DecorDiamondMesh() {
  const w = 48;
  const h = 28;
  const id = "diamond-mesh";
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={id} x="0" y="0" width={w} height={h} patternUnits="userSpaceOnUse">
            <path
              d={`M ${w / 2} 0 L ${w} ${h / 2} L ${w / 2} ${h} L 0 ${h / 2} Z`}
              fill="none"
              stroke="#C4847A"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} opacity="0.11" />
      </svg>
    </div>
  );
}

// ─── OurStory: flowing wave lines across the section ──────────────────────
export function DecorWaves() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.07 }}
      >
        <path d="M0 100 Q180 40 360 100 Q540 160 720 100 Q900 40 1080 100 Q1260 160 1440 100"
          stroke="#C4847A" strokeWidth="1.5" fill="none"/>
        <path d="M0 130 Q180 70 360 130 Q540 190 720 130 Q900 70 1080 130 Q1260 190 1440 130"
          stroke="#C4847A" strokeWidth="1" fill="none"/>
        <path d="M0 70 Q180 10 360 70 Q540 130 720 70 Q900 10 1080 70 Q1260 130 1440 70"
          stroke="#C4847A" strokeWidth="0.8" fill="none"/>
      </svg>
      <svg
        className="absolute top-0 right-0 w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.05, transform: "scaleY(-1)" }}
      >
        <path d="M0 100 Q180 40 360 100 Q540 160 720 100 Q900 40 1080 100 Q1260 160 1440 100"
          stroke="#9B8EA8" strokeWidth="1.2" fill="none"/>
      </svg>
    </div>
  );
}

// ─── AIFeatures: subtle diagonal stripe ──────────────────────────────────
export function DecorDiagonalLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          rgba(196,132,122,0.055) 0px,
          rgba(196,132,122,0.055) 1px,
          transparent 1px,
          transparent 20px
        )`,
      }}
    />
  );
}

// ─── Countdown: concentric rings centered ────────────────────────────────
export function DecorRings() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {[280, 420, 560, 700].map((size, i) => (
        <div
          key={size}
          className="absolute rounded-full border"
          style={{
            width: size,
            height: size,
            borderColor: `rgba(196,132,122,${0.1 - i * 0.02})`,
            borderWidth: "1px",
          }}
        />
      ))}
    </div>
  );
}
