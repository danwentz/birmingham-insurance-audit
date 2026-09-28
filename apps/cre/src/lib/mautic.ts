import { BRAND_SHORT } from "@/lib/site";

export interface MauticSubmitResult {
  success?: number | boolean;
  validationErrors?: Record<string, string>;
  errorMessage?: string;
}

/**
 * Mautic's form submit, in messenger mode, answers with an HTML page that
 * calls parent.postMessage("<JSON as a JS string literal>"). Pull the JSON
 * out; anything unrecognizable comes back as an empty (failed) result.
 */
export function parseMauticMessengerResponse(html: string): MauticSubmitResult {
  const match = html.match(/postMessage\(\s*"((?:[^"\\]|\\.)*)"/);
  if (!match) return {};
  try {
    const payload = JSON.parse(`"${match[1]}"`);
    const parsed: unknown = JSON.parse(payload);
    return parsed && typeof parsed === "object" ? (parsed as MauticSubmitResult) : {};
  } catch {
    return {};
  }
}

const MAUTIC_URL = (process.env.MAUTIC_URL?.trim() || "https://mautic.acreinsure.com").replace(/\/$/, "");

/**
 * Posts a standalone Mautic form via the public /form/submit endpoint, in
 * messenger mode (JSON body instead of a redirect). No authentication — this
 * is the same public endpoint Mautic's own embeddable form snippets post to,
 * so it works from the browser or the server with no credentials.
 */
export async function submitMauticForm(opts: {
  formId: string;
  formName: string;
  fields: Record<string, string>;
}): Promise<{ ok: boolean; status: number; result: MauticSubmitResult }> {
  const body = new URLSearchParams();
  for (const [alias, value] of Object.entries(opts.fields)) body.set(`mauticform[${alias}]`, value);
  body.set("mauticform[formId]", opts.formId);
  body.set("mauticform[formName]", opts.formName);
  body.set("mauticform[return]", "");
  // Messenger mode is the only one that reports the outcome instead of redirecting.
  body.set("mauticform[messenger]", "1");

  const res = await fetch(`${MAUTIC_URL}/form/submit?formId=${encodeURIComponent(opts.formId)}`, {
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
  const result = parseMauticMessengerResponse(await res.text());
  return { ok: res.ok && !!result.success, status: res.status, result };
}

/**
 * Headers for authenticated calls to Mautic's REST API (/api/*), which sits
 * behind Cloudflare Access on this instance — unlike /form/submit above,
 * which has a public bypass. Used only by the subscribe flow, which needs
 * the API (to tag contacts and trigger transactional emails) because the
 * classic Mautic form-builder "add tag" / "send email" actions can't be
 * created through the REST API on this Mautic version (their property
 * fields are Symfony choice fields whose choices only populate in the web
 * UI context, so the API always rejects them as "invalid choice" — see the
 * setup notes in the CRE subscribe feature report).
 */
function mauticApiHeaders(): Record<string, string> {
  const user = process.env.MAUTIC_API_USER?.trim();
  const pass = process.env.MAUTIC_API_PASSWORD?.trim();
  if (!user || !pass) {
    throw new Error("MAUTIC_API_USER / MAUTIC_API_PASSWORD not set");
  }
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`,
    "User-Agent": `${BRAND_SHORT}-subscribe-relay/1.0`,
  };
  const cfId = process.env.MAUTIC_CF_ACCESS_CLIENT_ID?.trim();
  const cfSecret = process.env.MAUTIC_CF_ACCESS_CLIENT_SECRET?.trim();
  if (cfId && cfSecret) {
    headers["CF-Access-Client-Id"] = cfId;
    headers["CF-Access-Client-Secret"] = cfSecret;
  }
  return headers;
}

/**
 * Creates or updates (by email — Mautic's unique identifier field) a
 * contact, merging in the given tags and custom field values. Existing tags
 * and fields not mentioned here are left alone.
 */
export async function upsertMauticContact(input: {
  email: string;
  tags: string[];
  fields: Record<string, string>;
}): Promise<{ ok: boolean; contactId: number | null }> {
  const res = await fetch(`${MAUTIC_URL}/api/contacts/new`, {
    method: "POST",
    headers: mauticApiHeaders(),
    signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({ email: input.email, tags: input.tags, ...input.fields }),
  });
  if (!res.ok) return { ok: false, contactId: null };
  const data: unknown = await res.json().catch(() => null);
  const id = (data as { contact?: { id?: unknown } } | null)?.contact?.id;
  return typeof id === "number" ? { ok: true, contactId: id } : { ok: false, contactId: null };
}

/** Triggers one of Mautic's saved (template) emails to a specific contact. */
export async function sendMauticEmail(emailId: string, contactId: number): Promise<boolean> {
  const res = await fetch(
    `${MAUTIC_URL}/api/emails/${encodeURIComponent(emailId)}/contact/${contactId}/send`,
    {
      method: "POST",
      headers: mauticApiHeaders(),
      signal: AbortSignal.timeout(10_000),
    }
  );
  if (!res.ok) return false;
  const data: unknown = await res.json().catch(() => null);
  return !!(data as { success?: unknown } | null)?.success;
}
