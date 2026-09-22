import { escapeHtml } from "./escape";
import type { LeadInput } from "./validate";

export type SendResult = { ok: true } | { ok: false; reason: "not_configured" | "provider_error" };

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

// Sends the lead to our inbox through Resend's REST API (no SDK, no extra dependency).
// Provider errors are never passed back to the browser and no personal data is logged.
export async function sendLeadEmail(lead: LeadInput): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!key || !to || !from) return { ok: false, reason: "not_configured" };

  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Company", lead.company],
    ["Role", lead.role],
    ["Country", lead.country],
    ["Contact", lead.contact],
    ["What takes most of their week", lead.message],
    ["Consent to be contacted", "Given on the form"],
  ];
  const html = `<table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td valign="top"><b>${escapeHtml(k)}</b></td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const subject = `New Brocare AI demo request: ${lead.company}`.replace(/[\r\n]+/g, " ").slice(0, 150);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        text,
        ...(EMAIL.test(lead.contact) ? { reply_to: lead.contact } : {}),
      }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "provider_error" };
  } catch {
    return { ok: false, reason: "provider_error" };
  }
}
