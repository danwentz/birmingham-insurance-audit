import { ogCard } from "@/lib/ogCard";

export const alt = "Gulf Coast hotel insurance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Gulf Coast hotel insurance",
    hook: "Named-storm deductibles, the E&S market, and the hurricane-season binding window.",
  });
}
