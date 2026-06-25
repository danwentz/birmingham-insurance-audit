"use client";

import { BRAND, DOMAIN } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackCall = () =>
  window.gtag?.("event", "phone_call_click", {
    event_category: "lead",
    event_label: "tap_to_call",
  });

export const trackFormSubmit = (source: string) => () =>
  window.gtag?.("event", "lead_form_submit", {
    event_category: "lead",
    event_label: source,
  });

export function LeadForm({
  compact = false,
  source = "homepage",
}: {
  compact?: boolean;
  source?: string;
}) {
  return (
    <form
      action="https://formsubmit.co/88e98acda98937d69e8fea30fa6274a4"
      method="POST"
      onSubmit={trackFormSubmit(source)}
      className="space-y-3 text-left"
    >
      {/* FormSubmit config */}
      <input type="hidden" name="_subject" value="New Insurance Audit Help Request" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={`${DOMAIN}/thank-you`} />
      {/* lead source so you know which page/city it came from */}
      <input type="hidden" name="source" value={source} />
      {/* honeypot */}
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#2A8E9E]"
      />
      <input
        type="text"
        name="business"
        placeholder="Business Name"
        required
        className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#2A8E9E]"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#2A8E9E]"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Your Phone"
        required
        className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#2A8E9E]"
      />
      {!compact && (
        <textarea
          rows={3}
          name="problem"
          placeholder="Briefly, what happened? (e.g. 'Got an audit bill for $14,000 I wasn't expecting')"
          className="border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#2A8E9E]"
        />
      )}
      <button
        type="submit"
        style={{ backgroundColor: BRAND }}
        className="w-full text-white font-semibold px-4 py-3 rounded-md hover:opacity-90 transition"
      >
        Get My Free Audit Review →
      </button>
      <p className="text-xs text-gray-500 text-center">
        No cost. No obligation. 100% confidential. We typically respond the same business day.
      </p>
    </form>
  );
}
