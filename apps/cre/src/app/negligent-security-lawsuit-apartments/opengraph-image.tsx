import { ogCard } from "@/lib/ogCard";

export const alt = "Negligent security lawsuits against apartment owners";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Negligent security lawsuits against apartment owners",
    hook: "Liability rules vary by state. The assault and battery gap in your GL policy does not.",
  });
}
