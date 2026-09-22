import { en, type DeepPartial, type Dictionary } from "./en";
import { fr } from "./fr";

export type { Dictionary, Seg } from "./en";
export type Locale = "en" | "fr";
export const defaultLocale: Locale = "en";

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

// Objects merge key by key; arrays and strings are replaced whole.
function merge<T>(base: T, over: DeepPartial<T> | undefined): T {
  if (!over) return base;
  if (!isObject(base) || !isObject(over)) return (over as T) ?? base;
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(over)) {
    if (v === undefined) continue;
    out[k] = isObject(out[k]) && isObject(v) ? merge(out[k], v) : v;
  }
  return out as T;
}

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return locale === "fr" ? merge(en, fr) : en;
}
