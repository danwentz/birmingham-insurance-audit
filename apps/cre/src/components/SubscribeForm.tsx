"use client";

import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

type Variant = "result" | "barometer";
type Status = "idle" | "sending" | "sent" | "error";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

// Same src as LeadForm so next/script loads api.js once per page.
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

// Render explicitly into our own (non-.cf-turnstile) div: this form can mount
// after api.js has loaded (the "result" variant expands later), and implicit
// rendering only scans the DOM once, at script load.
function whenTurnstileReady(): Promise<TurnstileApi> {
  const w = window as unknown as { turnstile?: TurnstileApi };
  if (w.turnstile) return Promise.resolve(w.turnstile);
  return new Promise((resolve) => {
    const id = window.setInterval(() => {
      if (w.turnstile) {
        window.clearInterval(id);
        resolve(w.turnstile);
      }
    }, 100);
  });
}

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
  const [token, setToken] = useState("");
  const widgetEl = useRef<HTMLDivElement>(null);
  const widget = useRef<{ api: TurnstileApi; id: string } | null>(null);
  const showForm = expanded && status !== "sent";

  useEffect(() => {
    if (!showForm) return;
    let cancelled = false;
    whenTurnstileReady().then((api) => {
      if (cancelled || !widgetEl.current) return;
      const id = api.render(widgetEl.current, {
        sitekey: TURNSTILE_SITE_KEY,
        action: "subscribe",
        theme: dark ? "dark" : "light",
        size: "flexible",
        callback: (t: string) => setToken(t),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
      widget.current = { api, id };
    });
    return () => {
      cancelled = true;
      if (widget.current) widget.current.api.remove(widget.current.id);
      widget.current = null;
      setToken("");
    };
  }, [showForm, dark]);

  // Tokens are single-use; get a fresh one before any retry.
  function resetWidget() {
    setToken("");
    if (widget.current) widget.current.api.reset(widget.current.id);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const honey = String(data.get("_honey") ?? "");

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
        resetWidget();
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
      resetWidget();
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

      <Script src={TURNSTILE_SRC} strategy="lazyOnload" />
      <div ref={widgetEl} />

      {status === "error" && (
        <p role="alert" className={`text-sm font-semibold ${dark ? "text-red-400" : "text-red-700"}`}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !token}
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
