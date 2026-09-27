import { ImageResponse } from "next/og";

// Shared social card: gold rule, wordmark, title, one-line hook, CTA footer.
// Route-level opengraph-image.tsx files don't cascade to child routes, so
// every shareable page needs its own file that calls this.
export const OG_SIZE = { width: 1200, height: 630 };

export function ogCard({ title, hook }: { title: string; hook: string }) {
  const size = OG_SIZE;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1c2035",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        {/* gold top rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #bfa46a, transparent)",
          }}
        />
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#ffffff" }}>
          <span style={{ color: "#bfa46a" }}>ACRE</span>Insure
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 700, color: "#ffffff", lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 28, color: "#7a8494", fontFamily: "sans-serif" }}>
            {hook}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(191,164,106,0.3)",
            paddingTop: 24,
            fontSize: 24,
            color: "#ede2c8",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ display: "flex" }}>Large-account specialists · $50k+ premium</div>
          <div style={{ display: "flex", background: "#bfa46a", color: "#10131e", padding: "10px 24px", borderRadius: 4, fontWeight: 700 }}>
            Request a Quote
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
