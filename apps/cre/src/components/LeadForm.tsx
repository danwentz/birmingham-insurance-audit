"use client";

import { DOMAIN } from "@/lib/site";

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

const inputClass =
  "w-full border-0 border-b border-gold/20 bg-transparent px-0 py-3 text-obsidian placeholder:text-slate focus:border-b-2 focus:border-gold focus:outline-none";

export function LeadForm({ source = "homepage" }: { source?: string }) {
  return (
    <form
      // TODO: point at a dedicated CRE inbox/endpoint (reusing the audit FormSubmit id for now)
      action="https://formsubmit.co/88e98acda98937d69e8fea30fa6274a4"
      method="POST"
      onSubmit={trackFormSubmit(source)}
      className="space-y-3 text-left"
    >
      <input type="hidden" name="_subject" value="New CRE Insurance Inquiry" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={`${DOMAIN}/thank-you`} />
      <input type="hidden" name="site" value="CRE" />
      <input type="hidden" name="source" value={source} />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-3">
        <input type="text" name="name" placeholder="Full name" required className={inputClass} />
        <input type="text" name="company" placeholder="Company" required className={inputClass} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input type="email" name="email" placeholder="Work email" required className={inputClass} />
        <input type="tel" name="phone" placeholder="Phone" required className={inputClass} />
      </div>

      <select name="asset_type" defaultValue="" required className={inputClass}>
        <option value="" disabled>
          Asset type / portfolio
        </option>
        <option>Multifamily / Apartments</option>
        <option>Office</option>
        <option>Retail / Shopping Center</option>
        <option>Industrial / Warehouse</option>
        <option>Hospitality / Hotel</option>
        <option>Mixed portfolio</option>
        <option>New construction / Development</option>
        <option>Other</option>
      </select>

      <select name="premium_band" defaultValue="" required className={inputClass}>
        <option value="" disabled>
          Current annual premium (or est.)
        </option>
        <option>$50k – $150k</option>
        <option>$150k – $500k</option>
        <option>$500k – $1M</option>
        <option>$1M+</option>
        <option>Not sure</option>
      </select>

      <textarea
        rows={3}
        name="details"
        placeholder="Briefly: total insured value, # of units/locations, renewal date, or what you need."
        className={inputClass}
      />

      <button
        type="submit"
        className="mt-2 w-full rounded-sm bg-gold px-4 py-3 text-sm font-semibold uppercase tracking-wide text-obsidian transition-colors hover:bg-gold-dark"
      >
        Request a Quote
      </button>
      <p className="text-center text-xs text-slate">
        Confidential. No obligation. We respond within one business day.
      </p>
    </form>
  );
}
