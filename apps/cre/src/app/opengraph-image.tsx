import { ImageResponse } from "next/og";
import { BRAND_SHORT } from "@/lib/site";

export const alt = "Commercial real estate insurance brokered for large portfolios.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#f7f5ef",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#1b5e4a" }}>
          {BRAND_SHORT}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, color: "#0f1e2e", lineHeight: 1.05 }}>
            Commercial real estate insurance, brokered for large portfolios.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#41505f" }}>
            Multifamily · High-TIV portfolios · Catastrophe property · Builders risk / OCIP
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e3ded3",
            paddingTop: 24,
            fontSize: 26,
            color: "#0f1e2e",
          }}
        >
          <div style={{ display: "flex" }}>Large-account specialists · $50k+ premium</div>
          <div style={{ display: "flex", background: "#1b5e4a", color: "#fff", padding: "10px 24px", borderRadius: 8 }}>
            Request a Review
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
