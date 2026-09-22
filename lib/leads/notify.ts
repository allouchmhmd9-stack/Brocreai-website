import type { LeadInput } from "./validate";

// WhatsApp intake stub. When the WhatsApp intake agent exists, call it from here so a new
// lead also lands in the team's WhatsApp queue. Nothing is sent to the prospect: this only
// tells the team. It is wrapped so a failure here can never fail the form submission.
export async function notifyWhatsAppIntake(lead: LeadInput): Promise<void> {
  try {
    // Example (disabled):
    // await fetch(process.env.WHATSAPP_INTAKE_WEBHOOK!, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ company: lead.company, country: lead.country }),
    // });
    void lead;
  } catch {
    // Intentionally ignored.
  }
}
