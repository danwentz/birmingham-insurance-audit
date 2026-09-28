import { NextRequest, NextResponse } from "next/server";
import { PHONE_DISPLAY } from "@/lib/site";
import { submitMauticForm } from "@/lib/mautic";
import { verifyTurnstile } from "@/lib/turnstile";
import { findSensitive, redactSensitive } from "@/lib/sensitive";

export const runtime = "nodejs";

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
  const forwardedFor = req.headers.get("x-forwarded-for");
  const remoteIp = forwardedFor?.split(",")[0]?.trim();

  const turnstile = await verifyTurnstile(token, TURNSTILE_ACTION, remoteIp);
  if (!turnstile.ok) {
    return failResponse(turnstile.reason ?? "verification failed");
  }

  // Leads go to the Mautic standalone form "CRE Lead Form" (alias cre_lead_f).
  // Posting server-side keeps the Turnstile check authoritative; Mautic then
  // creates/updates the contact and runs the form's actions (notification
  // email, line:cre tag). Field keys below are the Mautic form field aliases.
  const formId = process.env.MAUTIC_FORM_ID?.trim() || "4";
  const formName = process.env.MAUTIC_FORM_NAME?.trim() || "cre_lead_f";

  // Redact SSNs, card, and bank numbers server-side too: LeadForm blocks them,
  // but a no-JS or direct POST would skip that check.
  const text = (key: string) => {
    const value = formData.get(key);
    if (typeof value !== "string") return "";
    const trimmed = value.trim().slice(0, 2000);
    if (findSensitive(trimmed).length === 0) return trimmed;
    console.warn(`lead field "${key}" contained sensitive data; redacted`);
    return redactSensitive(trimmed);
  };
  // <input type="date"> always submits YYYY-MM-DD; drop anything else.
  const renewalDate = /^\d{4}-\d{2}-\d{2}$/.test(text("renewal_date")) ? text("renewal_date") : "";
  // First-touch attribution from FirstTouchTracker, so each lead email shows
  // which page and referrer brought the visitor in.
  const landingPage = text("landing_page").slice(0, 500);
  const referrer = text("referrer").slice(0, 200);
  const details = [
    renewalDate && `Renewal date: ${renewalDate}`,
    text("details"),
    landingPage && `First landing page: ${landingPage}`,
    referrer && `Referrer: ${referrer}`,
  ]
    .filter(Boolean)
    .join("\n");
  const [firstName, ...rest] = text("name").split(/\s+/);
  const fields: Record<string, string> = {
    first_name: firstName,
    last_name: rest.join(" "),
    email: text("email"),
    phone: text("phone"),
    company: text("company"),
    asset_type: text("asset_type"),
    premium_band: text("premium_band"),
    // Also in details so it shows up in the lead email; renewal_date is the
    // structured Mautic field for renewal-timed follow-up.
    renewal_date: renewalDate,
    details,
    business_line: "CRE",
    lead_source: text("source") || "unknown",
  };

  try {
    const submit = await submitMauticForm({ formId, formName, fields });
    if (!submit.ok) {
      console.error(
        "lead mautic failed:",
        submit.status,
        JSON.stringify(submit.result.validationErrors ?? submit.result.errorMessage ?? "(unparseable response)")
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

  const redirectUrl = new URL("/thank-you", req.url);
  redirectUrl.searchParams.set("source", fields.lead_source);
  return NextResponse.redirect(redirectUrl, 303);
}
