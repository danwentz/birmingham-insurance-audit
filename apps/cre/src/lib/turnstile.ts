// Shared Cloudflare Turnstile verification, used by every form-backed API
// route. Each caller passes its own expected `data-action` value (must match
// the `data-action` on the widget the form renders) so a token minted for
// one form can't be replayed against another.

// Cloudflare's always-pass test secret — used as a dev fallback so forms
// work locally without any Turnstile setup.
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

export interface TurnstileResult {
  ok: boolean;
  /** Diagnostic string for server logs only — never shown to the visitor. */
  reason?: string;
}

export async function verifyTurnstile(
  token: unknown,
  expectedAction: string,
  remoteIp?: string
): Promise<TurnstileResult> {
  if (typeof token !== "string" || token === "" || token.length > 2048) {
    return {
      ok: false,
      reason: `bad token (length ${typeof token === "string" ? token.length : typeof token})`,
    };
  }

  // Real secret: enforce action + hostname. No secret: test keys, except in production (fail closed).
  const realSecret = process.env.TURNSTILE_SECRET_KEY?.trim() || undefined;
  if (!realSecret && process.env.VERCEL_ENV === "production") {
    return { ok: false, reason: "TURNSTILE_SECRET_KEY not set in production" };
  }
  const secret = realSecret ?? TURNSTILE_TEST_SECRET;
  const expectedHostnames = new Set(
    (process.env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean)
  );
  if (realSecret && expectedHostnames.size === 0) {
    return { ok: false, reason: "TURNSTILE_HOSTNAMES empty" };
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
    return { ok: false, reason: `siteverify error: ${err instanceof Error ? err.message : String(err)}` };
  }

  if (
    !verifyResult.success ||
    (realSecret &&
      (verifyResult.action !== expectedAction || !expectedHostnames.has(verifyResult.hostname ?? "")))
  ) {
    return {
      ok: false,
      reason: `siteverify rejected: ${JSON.stringify({
        errorCodes: verifyResult["error-codes"],
        action: verifyResult.action,
        hostname: verifyResult.hostname,
        expectedHostnames: [...expectedHostnames],
      })}`,
    };
  }

  return { ok: true };
}
