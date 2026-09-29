import { ogCard } from "@/lib/ogCard";

export const alt = "Franchise hotel insurance requirements";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Franchise hotel insurance requirements",
    hook: "What your flag requires, why it changes mid-year, and how to stay compliant without a scramble.",
  });
}
