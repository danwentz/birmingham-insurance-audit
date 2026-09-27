import { ogCard } from "@/lib/ogCard";

export const alt = "Claims strategy for commercial property owners";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Claims strategy for commercial property owners",
    hook: "When to report, what to file, and how claims change what you pay at renewal.",
  });
}
