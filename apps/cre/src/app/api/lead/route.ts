import { NextRequest, NextResponse } from "next/server";
import { PHONE_DISPLAY } from "@/lib/site";

export const runtime = "nodejs";

// Cloudflare's always-pass test secret — used as a dev fallback so the form works without setup.
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";
// Must match data-action on the widget in LeadForm.
const TURNSTILE_ACTION = "lead";

// TODO: point at a dedicated CRE inbox/endpoint (reusing the audit FormSubmit id for now)
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/88e98acda98937d69e8fea30fa6274a4";

function failResponse(reason: string) {
  console.warn("lead rejected:", reason);
  return new NextResponse(
    `Verification failed. Please go back and try again, or call ${PHONE_DISPLAY}.`,
    { status: 400 }
  );
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // Honeypot: silently drop bot submissions without tipping them off.
  const honey = formData.get("_honey");
  if (typeof honey === "string" && honey.trim() !== "") {
    return NextResponse.redirect(new URL("/thank-you", req.url), 303);
  }

  const token = formData.get("cf-turnstile-response");
  if (typeof token !== "string" || token === "" || token.length > 2048) {
    return failResponse(`bad token (length ${typeof token === "string" ? token.length : typeof token})`);
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  const remoteIp = forwardedFor?.split(",")[0]?.trim();

  // Real secret: enforce action + hostname. No secret: test keys, except in production (fail closed).
  const realSecret = process.env.TURNSTILE_SECRET_KEY;
  if (!realSecret && process.env.VERCEL_ENV === "production") {
    return failResponse("TURNSTILE_SECRET_KEY not set in production");
  }
  const secret = realSecret ?? TURNSTILE_TEST_SECRET;
  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean)
  );
  if (realSecret && expectedHostnames.size === 0) {
    return failResponse("TURNSTILE_HOSTNAMES empty");
  }

  const verifyBody = new URLSearchParams();
  verifyBody.set("secret", secret);
  verifyBody.set("response", token);
  if (remoteIp) {
    verifyBody.set("remoteip", remoteIp);
  }

  let verifyResult: {
    success?: boolean;
    action?: string;
    hostname?: string;
    "error-codes"?: string[];
  };
  try {
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: verifyBody,
    });
    if (!verifyRes.ok) throw new Error(`siteverify ${verifyRes.status}`);
    verifyResult = await verifyRes.json();
  } catch (err) {
    return failResponse(`siteverify error: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (
    !verifyResult.success ||
    (realSecret &&
      (verifyResult.action !== TURNSTILE_ACTION || !expectedHostnames.has(verifyResult.hostname ?? "")))
  ) {
    return failResponse(`siteverify rejected: ${JSON.stringify({
      errorCodes: verifyResult["error-codes"],
      action: verifyResult.action,
      hostname: verifyResult.hostname,
      expectedHostnames: [...expectedHostnames],
    })}`);
  }

  const payload = {
    _subject: "New CRE Insurance Inquiry",
    _template: "table",
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    asset_type: formData.get("asset_type"),
    premium_band: formData.get("premium_band"),
    details: formData.get("details"),
    site: formData.get("site"),
    source: formData.get("source"),
  };

  try {
    const submitRes = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    // FormSubmit can return 200 with { success: "false" }, so check the body too.
    const submitResult: { success?: string | boolean } = await submitRes.json().catch(() => ({}));
    if (!submitRes.ok || String(submitResult.success) !== "true") {
      return new NextResponse(
        `Something went wrong submitting your request. Please call ${PHONE_DISPLAY} instead.`,
        { status: 502 }
      );
    }
  } catch {
    return new NextResponse(
      `Something went wrong submitting your request. Please call ${PHONE_DISPLAY} instead.`,
      { status: 502 }
    );
  }

  return NextResponse.redirect(new URL("/thank-you", req.url), 303);
}
