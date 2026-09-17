import { NextRequest, NextResponse } from "next/server";
import { PHONE_DISPLAY } from "@/lib/site";

export const runtime = "nodejs";

// Cloudflare's always-pass test secret — used as a dev fallback so the form works without setup.
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

// TODO: point at a dedicated CRE inbox/endpoint (reusing the audit FormSubmit id for now)
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/88e98acda98937d69e8fea30fa6274a4";

function failResponse() {
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
  if (typeof token !== "string" || token === "") {
    return failResponse();
  }

  const forwardedFor = req.headers.get("x-forwarded-for");
  const remoteIp = forwardedFor?.split(",")[0]?.trim();

  const secret = process.env.TURNSTILE_SECRET_KEY ?? TURNSTILE_TEST_SECRET;

  const verifyBody = new URLSearchParams();
  verifyBody.set("secret", secret);
  verifyBody.set("response", token);
  if (remoteIp) {
    verifyBody.set("remoteip", remoteIp);
  }

  let verifyResult: { success?: boolean };
  try {
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verifyBody,
    });
    verifyResult = await verifyRes.json();
  } catch {
    return failResponse();
  }

  if (!verifyResult.success) {
    return failResponse();
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
