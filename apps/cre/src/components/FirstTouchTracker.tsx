"use client";

// Records the visitor's first landing page and referrer. Mounted once in the
// root layout so every entry page is covered.

import { useEffect } from "react";
import { recordFirstTouch } from "@/lib/firstTouch";

export default function FirstTouchTracker() {
  useEffect(recordFirstTouch, []);
  return null;
}
