import { ogCard } from "@/lib/ogCard";

export const alt = "Commercial Insurance Rate Barometer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Commercial Insurance Rate Barometer",
    hook: "Where property, GL, and excess renewal rates are heading, and why.",
  });
}
