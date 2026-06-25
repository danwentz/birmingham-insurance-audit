"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ConversionTracker() {
  useEffect(() => {
    window.gtag?.("event", "generate_lead", {
      event_category: "lead",
      event_label: "cre_inquiry",
      value: 1,
    });
  }, []);
  return null;
}
