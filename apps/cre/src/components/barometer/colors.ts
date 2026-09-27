// Gauge zone / state colors, derived from the site palette (midnight, obsidian,
// gold, champagne, ivory, slate) but pushed to enough chroma to read as
// distinct hues against the ivory page surface. Validated against #f8f5ee
// (ivory) in light mode with the dataviz skill's palette validator — all
// checks pass (lightness band, chroma floor, CVD separation, normal-vision
// floor, contrast vs. surface). See PROGRESS notes in the commit for the
// validator output.
//
//   node validate_palette.js "#0e8a58,#2965a3,#a8790d,#a5233a" --mode light --surface "#f8f5ee"
//   -> ALL CHECKS PASS

import type { StateKey } from "@/lib/barometer";

export const ZONE_COLOR: Record<StateKey, string> = {
  soft: "#0e8a58", // softening — rates coming down
  flat: "#2965a3", // flat to modest
  firm: "#a8790d", // firming
  hard: "#a5233a", // hardening
};

export const ZONE_LABEL: Record<StateKey, string> = {
  soft: "Softening",
  flat: "Flat to modest",
  firm: "Firming",
  hard: "Hardening",
};

// The four gauge zones as [start, end] on the -10..+20 scale every gauge uses.
export const ZONES: { a: number; b: number; key: StateKey }[] = [
  { a: -10, b: 0, key: "soft" },
  { a: 0, b: 5, key: "flat" },
  { a: 5, b: 10, key: "firm" },
  { a: 10, b: 20, key: "hard" },
];
