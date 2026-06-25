import { ImageResponse } from "next/og";

export const alt =
  "Surprise insurance audit bill? Free, confidential review for central & north Alabama business owners.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND = "#2A8E9E";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f3a41 0%, #1f6d79 55%, #2A8E9E 100%)",
          padding: "70px 80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Serving Central &amp; North Alabama
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
            Surprise Insurance Audit Bill?
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 38,
              fontWeight: 400,
              color: "rgba(255,255,255,0.92)",
              maxWidth: 950,
            }}
          >
            Don&apos;t pay it until you talk to us. Free, confidential review — we help
            dispute and reduce what you owe.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255,255,255,0.25)",
            paddingTop: 28,
            fontSize: 32,
          }}
        >
          <div style={{ display: "flex", fontWeight: 700 }}>(205) 999-4884</div>
          <div
            style={{
              display: "flex",
              background: "white",
              color: BRAND,
              fontWeight: 700,
              padding: "12px 28px",
              borderRadius: 10,
            }}
          >
            Free Audit Review
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
