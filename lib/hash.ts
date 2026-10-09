// The element a URL hash points at, or null. A hash is not always a valid CSS selector
// (#1, #a%20b, #_=_), and querySelector throws on those, so look the target up by id.
// No imports on purpose: node:test loads this file directly.
export function hashTarget(hash: string, doc: { getElementById(id: string): HTMLElement | null }): HTMLElement | null {
  if (!hash || hash === "#") return null;
  let id = hash.slice(1);
  try {
    id = decodeURIComponent(id);
  } catch {
    // Malformed escape: look it up as typed.
  }
  return doc.getElementById(id);
}
