import { ogCard } from "@/lib/ogCard";

export const alt = "Replacement cost value: what it is, and why it changes every year";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Replacement cost value: what it is, and why it changes every year",
    hook: "The number your property limit is built on, and why a stale one shrinks claims.",
  });
}
