"use client";

// Fires a GA4 `phone_click` event whenever a visitor clicks any tel: link
// that matches PHONE_HREF, wherever it appears (header, footer, hero,
// thank-you page, ...). Delegated at the document level so a new PHONE_HREF
// link never needs its own tracking code — mount this once in the root
// layout and every current and future tap-to-call link is covered.

import { useEffect } from "react";
import { PHONE_HREF } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function PhoneClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest(`a[href="${PHONE_HREF}"]`);
      if (!link) return;
      window.gtag?.("event", "phone_click", {
        event_category: "lead",
        event_label: "tap_to_call",
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
