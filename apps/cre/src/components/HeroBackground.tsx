import Image from "next/image";

// Dimmed hero photo with a left-to-right midnight gradient. Drop inside a `relative overflow-hidden`
// hero section; the content wrapper after it needs `relative` to sit on top.
// `dim` sets image opacity; darker source images need a higher value to read at all.
export function HeroBackground({ src, dim = "opacity-30" }: { src: string; dim?: string }) {
  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className={`pointer-events-none select-none object-cover ${dim}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-midnight via-midnight/85 to-midnight/40"
      />
    </>
  );
}

export const GUIDE_HERO = "/guide-hero.jpg";
export const CALCULATOR_HERO = "/calculator-hero.jpg";
