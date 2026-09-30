import { ogCard } from "@/lib/ogCard";

export const alt = "Commercial real estate insurance guides";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Commercial real estate insurance guides",
    hook: "Lenders, wind, hotels, liability, and claims, written for owners and CFOs.",
  });
}
