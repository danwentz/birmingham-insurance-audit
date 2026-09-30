import { ogCard } from "@/lib/ogCard";

export const alt = "Negligent security lawsuits against Florida apartment owners";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Negligent security lawsuits against Florida apartment owners",
    hook: "The § 768.0706 presumption, the checklist behind it, and how it fits with your GL policy.",
  });
}
