import { ogCard } from "@/lib/ogCard";

export const alt = "Negligent security lawsuits against Alabama apartment owners";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Negligent security lawsuits against Alabama apartment owners",
    hook: "How Alabama courts treat crime-on-property claims, and what to check in your GL policy.",
  });
}
