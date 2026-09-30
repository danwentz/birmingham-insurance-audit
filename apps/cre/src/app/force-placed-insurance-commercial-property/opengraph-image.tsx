import { ogCard } from "@/lib/ogCard";

export const alt = "Force-placed insurance on commercial property loans";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Force-placed insurance on commercial property loans",
    hook: "What triggers it, who it protects, what it costs you, and how to get it removed.",
  });
}
