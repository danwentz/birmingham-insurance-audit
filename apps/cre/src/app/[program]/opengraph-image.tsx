import { ogCard } from "@/lib/ogCard";
import { PROGRAMS, getProgram } from "@/lib/programs";

// Program pages are what gets sent to prospects directly, so the card needs
// to name the program — the generic homepage card doesn't tell a recipient
// what they're clicking into.
export const alt = "Commercial real estate insurance program, brokered for large portfolios.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// [program]/page.tsx sets dynamicParams = false, so this must match it.
export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ program: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ program: string }> }) {
  const { program: slug } = await params;
  const program = getProgram(slug);
  const title = program?.name ?? "Commercial Real Estate Insurance";
  const hook = program?.hook ?? "Brokered for large portfolios.";

  return ogCard({ title, hook });
}
