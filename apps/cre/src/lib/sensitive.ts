// Detects SSNs, payment card numbers, and bank account/routing numbers in
// free-text form input. The privacy policy tells visitors not to send these;
// LeadForm blocks them before submit and /api/lead redacts anything that
// slips through (JS disabled, direct POST), so they never reach Mautic.
//
// Patterns are deliberately narrow to avoid false positives on things a CRE
// lead legitimately types: phone numbers, ZIP+4, dollar amounts with commas,
// unit counts, and FEINs (12-3456789), which brokers do need.

export type SensitiveKind = "ssn" | "card" | "bank";

// 123-45-6789 or 123 45 6789 (same separator both times). Excludes invalid
// SSN area numbers 000, 666, and 9xx, which also rules out most ZIP+4 lookalikes.
const SSN_FORMATTED = /\b(?!000|666|9\d\d)\d{3}([- ])(?!00)\d{2}\1(?!0000)\d{4}\b/g;

// "SSN 123456789", "social security #: 123-45-6789", etc.
const SSN_KEYWORD = /\b(?:ssn|ss#|social\s+security(?:\s+(?:no|number|#))?)\b[\s:#.-]*\d[\d -]{7,10}\d\b/gi;

// 13–19 digits, optionally grouped by single spaces or dashes; must pass Luhn.
const CARD_CANDIDATE = /\b\d(?:[ -]?\d){12,18}\b/g;

// Account/routing numbers are only recognizable by the words around them.
const BANK_KEYWORD =
  /\b(?:routing|aba|acct|account\s*(?:no|number|#)|bank\s*account|checking|savings|iban|swift)\b[\s:#.-]*(?:no\.?|number|#)?[\s:#.-]*\d[\d -]{4,}\d\b/gi;

function luhn(digits: string): boolean {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48;
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

function cardMatches(text: string): string[] {
  return (text.match(CARD_CANDIDATE) ?? []).filter((m) => {
    const digits = m.replace(/[ -]/g, "");
    return digits.length >= 13 && digits.length <= 19 && luhn(digits);
  });
}

export function findSensitive(text: string): SensitiveKind[] {
  const kinds: SensitiveKind[] = [];
  if (text.match(SSN_FORMATTED) || text.match(SSN_KEYWORD)) kinds.push("ssn");
  if (cardMatches(text).length > 0) kinds.push("card");
  if (text.match(BANK_KEYWORD)) kinds.push("bank");
  return kinds;
}

export function redactSensitive(text: string): string {
  let out = text.replace(SSN_KEYWORD, "[REDACTED]").replace(SSN_FORMATTED, "[REDACTED]");
  out = out.replace(BANK_KEYWORD, "[REDACTED]");
  for (const m of cardMatches(out)) out = out.replace(m, "[REDACTED]");
  return out;
}

export const SENSITIVE_LABELS: Record<SensitiveKind, string> = {
  ssn: "a Social Security number",
  card: "a payment card number",
  bank: "a bank account or routing number",
};
