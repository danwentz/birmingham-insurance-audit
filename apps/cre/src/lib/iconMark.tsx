import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Brand mark for favicons: gold Playfair "A" on obsidian. The font is a
// one-glyph subset vendored in src/assets so the build never fetches it.
// src/app/favicon.ico (16/32/48) is a static export of /icon; regenerate it
// with PIL from that PNG if this design changes.
export async function iconMark(px: number, { rounded }: { rounded: boolean }) {
  const font = await readFile(join(process.cwd(), "src/assets/playfair-display-700-A.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#10131e",
          borderRadius: rounded ? px * 0.2 : 0,
          color: "#bfa46a",
          fontFamily: "Playfair",
          fontSize: px * 0.92,
          fontWeight: 700,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* the site's gold-rule-top, which also gives the mark an edge on dark tab bars */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: Math.max(2, px * 0.07),
            background: "#bfa46a",
          }}
        />
        <div style={{ display: "flex" }}>A</div>
      </div>
    ),
    { width: px, height: px, fonts: [{ name: "Playfair", data: font, weight: 700, style: "normal" }] }
  );
}
