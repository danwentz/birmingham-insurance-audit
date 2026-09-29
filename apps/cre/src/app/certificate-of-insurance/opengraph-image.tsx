import { ogCard } from "@/lib/ogCard";

export const alt = "Certificates of insurance for commercial real estate owners";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    title: "Certificates of insurance for commercial real estate owners",
    hook: "What a COI does and doesn't do, and how to review the one your contractor hands you.",
  });
}
