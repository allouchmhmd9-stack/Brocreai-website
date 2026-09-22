// Shared by the browser form and the API route, so both apply the same rules.
// No imports on purpose: this file must run unchanged in the browser, in Next and in node:test.

export const LIMITS = {
  name: 100,
  company: 120,
  role: 100,
  country: 80,
  contact: 120,
  message: 2000,
} as const;

export type LeadField = keyof typeof LIMITS;
export type LeadInput = Record<LeadField, string>;
export type FieldError = "required" | "contact_invalid" | "message_short" | "links" | "consent_required";
export type FieldErrors = Partial<Record<LeadField | "consent", FieldError>>;

const MESSAGE_MIN = 10;
const MAX_LINKS = 2;
const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

// Strip control characters. Line breaks and tabs survive in free text only.
// eslint-disable-next-line no-control-regex
const CONTROL_LINE = /[\u0000-\u001f\u007f]/g;
// eslint-disable-next-line no-control-regex
const CONTROL_TEXT = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;

const cleanLine = (v: unknown, max: number) =>
  (typeof v === "string" ? v : "").replace(CONTROL_LINE, " ").replace(/\s+/g, " ").trim().slice(0, max);

const cleanText = (v: unknown, max: number) =>
  (typeof v === "string" ? v : "").replace(/\r\n?/g, "\n").replace(CONTROL_TEXT, "").trim().slice(0, max);

function validContact(v: string): boolean {
  if (EMAIL.test(v)) return true;
  if (!/^[+\d\s().-]+$/.test(v)) return false;
  const digits = v.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}

function countLinks(v: string): number {
  return (v.match(/https?:\/\/|www\./gi) ?? []).length;
}

export type ValidationResult =
  | { ok: true; value: LeadInput }
  | { ok: false; errors: FieldErrors };

export function validateLead(raw: unknown): ValidationResult {
  const src = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const value: LeadInput = {
    name: cleanLine(src.name, LIMITS.name),
    company: cleanLine(src.company, LIMITS.company),
    role: cleanLine(src.role, LIMITS.role),
    country: cleanLine(src.country, LIMITS.country),
    contact: cleanLine(src.contact, LIMITS.contact),
    message: cleanText(src.message, LIMITS.message),
  };
  const errors: FieldErrors = {};

  for (const k of ["name", "company", "role", "country"] as const) {
    if (!value[k]) errors[k] = "required";
    else if (countLinks(value[k]) > 0) errors[k] = "links";
  }
  if (!value.contact) errors.contact = "required";
  else if (!validContact(value.contact)) errors.contact = "contact_invalid";

  if (!value.message) errors.message = "required";
  else if (value.message.length < MESSAGE_MIN) errors.message = "message_short";
  else if (countLinks(value.message) > MAX_LINKS) errors.message = "links";

  // Consent to be contacted must be an explicit tick, not a default.
  if (src.consent !== true) errors.consent = "consent_required";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}
