import { ogCard } from "@/lib/ogCard";

export const alt = "Hotel portfolio insurance: one program for three or more hotels";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Hotel portfolio insurance: one program for three or more hotels",
    hook: "Blanket vs. scheduled limits, CAT aggregates, and adding acquisitions mid-term.",
  });
}
