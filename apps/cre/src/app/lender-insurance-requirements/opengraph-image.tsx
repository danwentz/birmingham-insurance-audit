import { ogCard } from "@/lib/ogCard";

export const alt = "Lender insurance requirements for commercial real estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Lender insurance requirements for commercial real estate",
    hook: "What your loan documents require, and where Fannie Mae and Freddie Mac differ.",
  });
}
