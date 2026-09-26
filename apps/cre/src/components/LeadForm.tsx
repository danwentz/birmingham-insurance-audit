"use client";

import Link from "next/link";
import Script from "next/script";
import { useState, type FormEvent } from "react";
import { findSensitive, SENSITIVE_LABELS } from "@/lib/sensitive";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackFormSubmit = (source: string) => () =>
  window.gtag?.("event", "lead_form_submit", {
    event_category: "lead",
    event_label: source,
  });

const inputClass =
  "w-full border-0 border-b border-gold/20 bg-transparent px-0 py-3 text-obsidian placeholder:text-slate focus:border-b-2 focus:border-gold focus:outline-none";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

// Free-text fields a visitor could paste an SSN, card, or bank number into.
const CHECKED_FIELDS = ["name", "company", "phone", "details"];

export function LeadForm({ source = "homepage" }: { source?: string }) {
  const [sensitiveError, setSensitiveError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const text = CHECKED_FIELDS.map((f) => String(data.get(f) ?? "")).join("\n");
    const kinds = findSensitive(text);
    if (kinds.length > 0) {
      event.preventDefault();
      setSensitiveError(
        `It looks like you entered ${kinds.map((k) => SENSITIVE_LABELS[k]).join(" and ")}. Please remove it. We never need that through this form.`
      );
      return;
    }
    setSensitiveError("");
    trackFormSubmit(source)();
  }

  return (
    <form
      action="/api/lead"
      method="POST"
      onSubmit={onSubmit}
      className="space-y-3 text-left"
    >
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
        strategy="lazyOnload"
      />
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
        <option>Self-Storage</option>
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

      <div className="cf-turnstile mt-2" data-sitekey={TURNSTILE_SITE_KEY} data-action="lead" data-theme="light" data-size="flexible" />

      <p role="alert" className={sensitiveError ? "text-sm font-semibold text-red-700" : "sr-only"}>
        {sensitiveError}
      </p>

      <button
        type="submit"
        className="mt-2 w-full rounded-sm bg-gold px-4 py-3 text-sm font-semibold uppercase tracking-wide text-obsidian transition-colors hover:bg-gold-dark"
      >
        Request a Quote
      </button>
      <p className="text-center text-xs text-obsidian/70">
        Confidential. No obligation. We respond within one business day.
      </p>
      <p className="text-center text-xs text-obsidian/70">
        By submitting, you agree that we may contact you about your request by phone or email.
        Submitting this form does not bind coverage. See our{" "}
        <Link href="/privacy" className="underline hover:text-gold-dark">Privacy Policy</Link>.
      </p>
    </form>
  );
}
