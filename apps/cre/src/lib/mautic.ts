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
