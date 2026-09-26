// Shared CRE-site constants. Edit brand / phone / domain / GA here only.

export const BRAND_NAME = "Alabama Commercial Real Estate Insurance";
export const BRAND_SHORT = "ACREInsure";

// Same advisor/number as the audit site by default — swap if you use a separate line.
export const PHONE_DISPLAY = "(205) 999-4884";
export const PHONE_HREF = "tel:+12059994884";
export const PHONE_E164 = "+1-205-999-4884";

// Where privacy requests go (listed on /privacy).
export const PRIVACY_EMAIL = "dan.wentz@usi.com";

// www is the host that serves 200 — the apex 307s here. Canonicals, og:url,
// sitemap, robots host and schema @ids all derive from this, so it must match
// the redirect target or every canonical points at a redirect.
export const DOMAIN = "https://www.acreinsure.com";

// CRE site GA4 measurement ID (separate from the audit site)
export const GA_ID = "G-RJ6FTGFFZH";

// Positioning: large-account CRE only.
export const PREMIUM_FLOOR = "$50,000";
