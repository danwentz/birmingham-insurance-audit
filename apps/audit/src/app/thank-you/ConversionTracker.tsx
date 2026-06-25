"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ConversionTracker() {
  useEffect(() => {
    // Fires once when the thank-you page loads — i.e. the lead form was
    // successfully submitted and FormSubmit redirected here.
    window.gtag?.("event", "generate_lead", {
      event_category: "lead",
      event_label: "audit_help_form",
      value: 1,
    });
  }, []);

  return null;
}
