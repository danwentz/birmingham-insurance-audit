import { ogCard } from "@/lib/ogCard";

export const alt = "When an insurance increase pushes your DSCR under the loan covenant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "When an insurance increase pushes DSCR under the covenant",
    hook: "How lenders test it, what a miss usually triggers, and what to do before the test date.",
  });
}
