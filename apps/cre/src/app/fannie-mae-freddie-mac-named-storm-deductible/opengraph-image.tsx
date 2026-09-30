import { ogCard } from "@/lib/ogCard";

export const alt = "Fannie Mae and Freddie Mac named storm deductible requirements";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Fannie Mae and Freddie Mac named storm deductible requirements",
    hook: "A 5% deductible fits the 7.5% cap. The traps are the limit, the dollar minimum, and expanded deductibles.",
  });
}
