import { ogCard } from "@/lib/ogCard";

export const alt = "Negligent security lawsuits against Georgia apartment owners";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Negligent security lawsuits against Georgia apartment owners",
    hook: "What Georgia's 2025 tort reform (SB 68) changed, and what to check in your GL policy.",
  });
}
