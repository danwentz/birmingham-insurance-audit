import { NextRequest, NextResponse } from "next/server";
import { BRAND_SHORT, PHONE_DISPLAY } from "@/lib/site";
import { parseMauticMessengerResponse } from "@/lib/mautic";

export const runtime = "nodejs";

// Cloudflare's always-pass test secret — used as a dev fallback so the form works without setup.
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";
// Must match data-action on the widget in LeadForm.
const TURNSTILE_ACTION = "lead";

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
  const realSecret = process.env.TURNSTILE_SECRET_KEY?.trim() || undefined;
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
    // Siteverify answers 400 with a JSON body (error-codes) on rejection, so parse regardless of status.
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

  // Leads go to the Mautic standalone form "CRE Lead Form" (alias cre_lead_f).
  // Posting server-side keeps the Turnstile check authoritative; Mautic then
  // creates/updates the contact and runs the form's actions (notification
  // email, line:cre tag). Field keys below are the Mautic form field aliases.
  const mauticUrl = (process.env.MAUTIC_URL?.trim() || "https://mautic.acreinsure.com").replace(/\/$/, "");
  const formId = process.env.MAUTIC_FORM_ID?.trim() || "4";
  const formName = process.env.MAUTIC_FORM_NAME?.trim() || "cre_lead_f";

  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim().slice(0, 2000) : "";
  };
  const [firstName, ...rest] = text("name").split(/\s+/);
  const fields: Record<string, string> = {
    first_name: firstName,
    last_name: rest.join(" "),
    email: text("email"),
    phone: text("phone"),
    company: text("company"),
    asset_type: text("asset_type"),
    premium_band: text("premium_band"),
    details: text("details"),
    business_line: "CRE",
    lead_source: text("source") || "unknown",
  };

  const body = new URLSearchParams();
  for (const [alias, value] of Object.entries(fields)) body.set(`mauticform[${alias}]`, value);
  body.set("mauticform[formId]", formId);
  body.set("mauticform[formName]", formName);
  body.set("mauticform[return]", "");
  // Messenger mode is the only one that reports the outcome instead of redirecting.
  body.set("mauticform[messenger]", "1");

  try {
    const submitRes = await fetch(`${mauticUrl}/form/submit?formId=${encodeURIComponent(formId)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
        "User-Agent": `${BRAND_SHORT}-lead-relay/1.0`,
      },
      redirect: "manual",
      signal: AbortSignal.timeout(10_000),
      body,
    });
    const result = parseMauticMessengerResponse(await submitRes.text());
    if (!submitRes.ok || !result.success) {
      console.error(
        "lead mautic failed:",
        submitRes.status,
        JSON.stringify(result.validationErrors ?? result.errorMessage ?? "(unparseable response)")
      );
      return new NextResponse(
        `Something went wrong submitting your request. Please call ${PHONE_DISPLAY} instead.`,
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("lead mautic error:", err instanceof Error ? err.message : String(err));
    return new NextResponse(
      `Something went wrong submitting your request. Please call ${PHONE_DISPLAY} instead.`,
      { status: 502 }
    );
  }

  return NextResponse.redirect(new URL("/thank-you", req.url), 303);
}
