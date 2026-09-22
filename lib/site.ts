// Single source of truth for contact details. The brokerage site uses the same values.

const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

/** True only once a real domain has been configured. Until then the site is not indexable. */
export const hasProductionDomain = Boolean(explicit);

export const siteUrl = (
  explicit || (vercelProd ? `https://${vercelProd}` : "http://localhost:3000")
).replace(/\/+$/, "");

export const siteName = "Brocare AI";

// Instant demo booking (Cal.com, Calendly or similar). While empty, the demo
// section falls back to WhatsApp and the request form.
const bookingEnv = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
export const bookingUrl = bookingEnv && /^https:\/\//i.test(bookingEnv) ? bookingEnv : "";

const brokerageEnv = process.env.NEXT_PUBLIC_BROKERAGE_URL?.trim();

export const brokerage = {
  name: "Brocare Insurance Brokerage s.a.r.l.",
  url:
    brokerageEnv && /^https?:\/\//i.test(brokerageEnv)
      ? brokerageEnv
      : "https://brocareinsurance.com",
};

export const contact = {
  phoneDisplay: "+961 1 82 33 00",
  phoneHref: "tel:+96118233300",
  // Brocare AI has its own WhatsApp line, separate from the brokerage mobile (+961 81 82 33 00).
  whatsappDisplay: "+961 76 743 111",
  whatsappHref: "https://wa.me/96176743111",
  email: "ali.m@brocareinsurance.com",
  emailHref: "mailto:ali.m@brocareinsurance.com",
  address: "Beirut, Ein El Tineh, Mousaitbeh 5046, 4th Floor",
  mapUrl: "https://maps.app.goo.gl/m59XPfqvxACtcmm88",
  hours: "Mon to Fri, 9:00 to 15:00",
} as const;

export function whatsappLink(text?: string): string {
  return text
    ? `${contact.whatsappHref}?text=${encodeURIComponent(text)}`
    : contact.whatsappHref;
}
