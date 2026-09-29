import { ogCard } from "@/lib/ogCard";

export const alt = "Wind deductible buy-down for commercial property";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Wind deductible buy-down",
    hook: "What it is, how it works, and when a 5% named-storm deductible is worth buying down.",
  });
}
