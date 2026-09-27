import { ogCard } from "@/lib/ogCard";

export const alt = "Affordable housing insurance: Section 8, HUD, and LIHTC";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Affordable housing insurance: Section 8, HUD, and LIHTC",
    hook: "What underwriters actually price, and how to present the portfolio.",
  });
}
