"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function Tracker() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") ?? "unknown";

  useEffect(() => {
    // This effect can run before the afterInteractive GA script has defined
    // window.gtag. Queue onto dataLayer the same way the gtag stub does, so
    // gtag.js picks the event up once it loads instead of it being dropped.
    window.dataLayer = window.dataLayer || [];
    const gtag =
      window.gtag ??
      function gtagStub() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };
    gtag("event", "generate_lead", { source, value: 1, currency: "USD" });
  }, [source]);

  return null;
}

// useSearchParams() requires a Suspense boundary in the App Router.
export default function ConversionTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
