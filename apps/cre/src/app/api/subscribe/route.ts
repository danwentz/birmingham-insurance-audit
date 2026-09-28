import { NextRequest, NextResponse } from "next/server";
import { upsertMauticContact, sendMauticEmail } from "@/lib/mautic";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

// Must match data-action on the widget in SubscribeForm.
const TURNSTILE_ACTION = "subscribe";

// Always applied; marks the contact as coming through the quiet email-capture
// path rather than the "Request a Quote" lead form. Distinct from line:cre
// (id 2, the tag the 130-day renewal campaign segments on) — subscribers
// must never get that tag from this route.
const SUBSCRIBER_TAG = "line:cre-subscriber";
const BAROMETER_TAG = "cre-barometer";

// Mautic "CRE - Your calculator result" / "CRE - You're on the list" emails.
const RESULT_EMAIL_ID = process.env.MAUTIC_SUBSCRIBE_RESULT_EMAIL_ID?.trim() || "6";
const BAROMETER_EMAIL_ID = process.env.MAUTIC_SUBSCRIBE_BAROMETER_EMAIL_ID?.trim() || "7";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Only these calculator paths may be emailed back as a "result" link — never
// an arbitrary URL a visitor could get this route to relay.
const ALLOWED_RESULT_PATHS = new Set([
  "/multifamily-insurance-calculator",
  "/coinsurance-penalty-calculator",
  "/hotel-insurance-calculator",
  "/wind-deductible-calculator",
]);

function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

/**
 * Same-origin (as this request — works in dev, preview, and prod), allow-
 * listed calculator URL only; drops anything else. Origin is taken from the
 * request rather than the hardcoded production domain so it doesn't reject
 * legitimate submissions from a preview deployment.
 */
function sanitizeResultUrl(raw: string, requestOrigin: string): string {
  if (!raw) return "";
  let url: URL;
  let origin: URL;
  try {
    url = new URL(raw);
    origin = new URL(requestOrigin);
  } catch {
    return "";
  }
  if (url.host !== origin.host) return "";
  if (!ALLOWED_RESULT_PATHS.has(url.pathname)) return "";
  url.protocol = origin.protocol;
  return url.toString().slice(0, 500);
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid request.");
  }
  if (typeof body !== "object" || body === null) return fail(400, "Invalid request.");
  const b = body as Record<string, unknown>;

  // Honeypot: silently pretend success without touching Mautic.
  if (typeof b._honey === "string" && b._honey.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof b.email === "string" ? b.email.trim().slice(0, 200) : "";
  if (!email || email.length > 190 || !EMAIL_RE.test(email)) {
    return fail(400, "Enter a valid email address.");
  }

  const kind = b.kind === "barometer" ? "barometer" : "result";
  const barometerOptin = kind === "barometer" || b.barometer_optin === true;
  const resultUrl =
    kind === "result"
      ? sanitizeResultUrl(typeof b.result_url === "string" ? b.result_url : "", req.nextUrl.origin)
      : "";
  if (kind === "result" && !resultUrl) {
    return fail(400, "Missing or invalid result link.");
  }
  const source = typeof b.source === "string" ? b.source.trim().slice(0, 190) : "";

  const forwardedFor = req.headers.get("x-forwarded-for");
  const remoteIp = forwardedFor?.split(",")[0]?.trim();
  const turnstile = await verifyTurnstile(b["cf-turnstile-response"], TURNSTILE_ACTION, remoteIp);
  if (!turnstile.ok) {
    console.warn("subscribe rejected:", turnstile.reason);
    return fail(400, "Verification failed. Please try again.");
  }

  const tags = [SUBSCRIBER_TAG];
  if (barometerOptin) tags.push(BAROMETER_TAG);

  let contactId: number | null = null;
  try {
    const upsert = await upsertMauticContact({
      email,
      tags,
      fields: {
        ...(resultUrl ? { result_link: resultUrl } : {}),
        lead_source: source || "unknown",
        business_line: "CRE",
      },
    });
    if (!upsert.ok) throw new Error("upsert did not return a contact id");
    contactId = upsert.contactId;
  } catch (err) {
    console.error("subscribe mautic upsert error:", err instanceof Error ? err.message : String(err));
    return fail(502, "Something went wrong. Please try again in a moment.");
  }

  // The contact is already saved and tagged at this point; the confirmation
  // email is best-effort and shouldn't fail the whole request.
  if (contactId) {
    try {
      await sendMauticEmail(kind === "result" ? RESULT_EMAIL_ID : BAROMETER_EMAIL_ID, contactId);
    } catch (err) {
      console.error("subscribe email send error:", err instanceof Error ? err.message : String(err));
    }
  }

  return NextResponse.json({ ok: true });
}
