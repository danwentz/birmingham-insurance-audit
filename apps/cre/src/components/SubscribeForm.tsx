"use client";

import Script from "next/script";
import { useState, type FormEvent } from "react";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

type Variant = "result" | "barometer";
type Status = "idle" | "sending" | "sent" | "error";

/**
 * Quiet, secondary email-capture. Not the primary CTA — LeadForm ("Request a
 * Quote") is. Two variants:
 *  - "result": collapsed behind a small text link under a calculator's
 *    results; expands to a mini form and emails back the current share URL.
 *  - "barometer": an always-visible compact block on the rate barometer
 *    page, below the site's quote CTAs.
 */
export function SubscribeForm({ variant, source }: { variant: Variant; source: string }) {
  const dark = variant === "result";
  const [expanded, setExpanded] = useState(variant === "barometer");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [barometerOptin, setBarometerOptin] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const honey = String(data.get("_honey") ?? "");
    const token = String(data.get("cf-turnstile-response") ?? "");

    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          kind: variant,
          result_url: variant === "result" ? window.location.href : undefined,
          barometer_optin: variant === "result" ? barometerOptin : true,
          source,
          _honey: honey,
          "cf-turnstile-response": token,
        }),
      });
      const json: unknown = await res.json().catch(() => ({ ok: false }));
      const ok = res.ok && !!(json as { ok?: unknown } | null)?.ok;
      if (!ok) {
        const errText = (json as { error?: unknown } | null)?.error;
        setStatus("error");
        setErrorMsg(typeof errText === "string" ? errText : "Something went wrong. Please try again.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <p className={`text-sm ${dark ? "text-champagne" : "text-slate"}`}>
        {variant === "result" ? "Sent. Check your inbox for the link." : "You're on the list. Check your inbox."}
      </p>
    );
  }

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="text-sm text-champagne/70 underline decoration-champagne/30 underline-offset-4 transition-colors hover:text-gold"
      >
        Email me this result
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit} className={variant === "result" ? "mt-3 max-w-sm space-y-3" : "max-w-sm space-y-3"}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
        strategy="lazyOnload"
      />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

      <label className="block">
        <span
          className={`block text-[11px] font-semibold uppercase tracking-[0.14em] ${
            dark ? "text-champagne/70" : "text-slate"
          }`}
        >
          Email
        </span>
        <input
          type="email"
          name="email"
          required
          placeholder="you@company.com"
          className={
            dark
              ? "mt-1 w-full border-0 border-b border-champagne/25 bg-transparent px-0 py-2 text-champagne placeholder:text-champagne/40 focus:border-b-2 focus:border-gold focus:outline-none"
              : "mt-1 w-full border-0 border-b border-gold/20 bg-transparent px-0 py-2 text-obsidian placeholder:text-slate focus:border-b-2 focus:border-gold focus:outline-none"
          }
        />
      </label>

      {variant === "result" && (
        <label className={`flex items-start gap-2 text-sm ${dark ? "text-champagne/80" : "text-slate"}`}>
          <input
            type="checkbox"
            name="barometer_optin_checkbox"
            checked={barometerOptin}
            onChange={(e) => setBarometerOptin(e.target.checked)}
            className="mt-0.5"
          />
          <span>Also send me the quarterly CRE Rate Barometer.</span>
        </label>
      )}

      <div
        className="cf-turnstile"
        data-sitekey={TURNSTILE_SITE_KEY}
        data-action="subscribe"
        data-theme={dark ? "dark" : "light"}
        data-size="flexible"
      />

      {status === "error" && (
        <p role="alert" className={`text-sm font-semibold ${dark ? "text-red-400" : "text-red-700"}`}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className={
          dark
            ? "inline-flex items-center gap-2 rounded-sm border border-gold/40 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-champagne transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
            : "inline-flex items-center gap-2 rounded-sm bg-gold px-4 py-2 text-sm font-semibold uppercase tracking-wide text-obsidian transition-colors hover:bg-gold-dark disabled:opacity-50"
        }
      >
        {status === "sending" ? "Sending…" : variant === "result" ? "Send it" : "Sign me up"}
      </button>
    </form>
  );
}
