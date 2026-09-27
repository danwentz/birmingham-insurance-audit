import { ogCard } from "@/lib/ogCard";

export const alt = "How to organize your commercial property insurance documents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "How to organize your commercial property insurance documents",
    hook: "What to keep, how to file it, and what to update before every renewal.",
  });
}
