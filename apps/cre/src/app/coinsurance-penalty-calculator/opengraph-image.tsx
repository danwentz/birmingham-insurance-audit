import { ImageResponse } from "next/og";

// The root opengraph-image covers "/" only, so a page this share-prone needs its
// own — a calculator link posted without a card is a link nobody clicks.
export const alt =
  "Coinsurance penalty calculator: payout ratio, penalty on the loss, and what it takes to cure the gap.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const METRICS = ["Payout ratio", "On any loss size", "Margin clause", "Cost to cure"];

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
          background: "#1c2035",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
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
          <div style={{ display: "flex", fontSize: 34, color: "#bfa46a", fontFamily: "sans-serif" }}>
            Free calculator
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 60,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
            }}
          >
            Coinsurance cuts a partial loss too.
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
            {METRICS.map((m) => (
              <div
                key={m}
                style={{
                  display: "flex",
                  borderLeft: "3px solid #bfa46a",
                  paddingLeft: 14,
                  fontSize: 24,
                  color: "#7a8494",
                  fontFamily: "sans-serif",
                }}
              >
                {m}
              </div>
            ))}
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
          <div style={{ display: "flex" }}>No email required · Nothing leaves your browser</div>
          <div
            style={{
              display: "flex",
              background: "#bfa46a",
              color: "#10131e",
              padding: "10px 24px",
              borderRadius: 4,
              fontWeight: 700,
            }}
          >
            Run your numbers
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
