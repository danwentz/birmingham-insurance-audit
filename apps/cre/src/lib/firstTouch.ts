// First-touch attribution: the page a visitor first landed on and where they
// came from, kept in localStorage and sent with the lead form so each lead
// shows which page (and search engine / referrer) brought them in.

const STORAGE_KEY = "acre_first_touch";

export type FirstTouch = { landingPage: string; referrer: string };

export function recordFirstTouch() {
  try {
    if (localStorage.getItem(STORAGE_KEY)) return;
    let referrer = "direct";
    if (document.referrer) {
      const ref = new URL(document.referrer);
      // Internal navigation isn't a source; only record other sites.
      if (ref.host === location.host) return;
      referrer = ref.host;
    }
    const touch: FirstTouch = {
      landingPage: (location.pathname + location.search).slice(0, 500),
      referrer,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(touch));
  } catch {
    // Storage blocked (private mode, etc.): the lead just goes in without it.
  }
}

export function readFirstTouch(): FirstTouch | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FirstTouch) : null;
  } catch {
    return null;
  }
}
