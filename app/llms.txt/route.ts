import { agents } from "@/lib/content/agents";
import { bundles, bundleStatusLabel } from "@/lib/content/bundles";
import { getDictionary } from "@/lib/i18n";
import { contact, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

// A plain-text summary for AI crawlers and assistants (llmstxt.org format).
export function GET() {
  const d = getDictionary();
  const b = bundles.map((x) => `- ${x.name} (${bundleStatusLabel[x.status]}): ${x.short}`).join("\n");
  const a = agents.map((x) => `- ${x.name}${x.status !== "live" ? ` (${x.status})` : ""}: ${x.does}`).join("\n");
  const body = `# Brocare AI

> ${d.meta.description}

Brocare AI is an initiative of Brocare Insurance Brokerage s.a.r.l., Beirut, Lebanon. It builds and runs AI agents for insurers, brokerages and agents, first in the Middle East and Africa. Every agent drafts, scores or prepares; nothing reaches a prospect until the client approves it. Engines are a guide: any agent can be added to any engine.

## Engines (${siteUrl}/engines)

${b}

## Agents (${siteUrl}/agents)

${a}

## Guarantee

${d.guarantee.body}

## Pages

- [Home](${siteUrl}/)
- [Engines](${siteUrl}/engines)
- [Agents](${siteUrl}/agents)
- [About](${siteUrl}/about)
- [Case study](${siteUrl}/case-study)
- [FAQ](${siteUrl}/faq)
- [Book a demo](${siteUrl}/demo)
- [Privacy policy](${siteUrl}/privacy), [Terms](${siteUrl}/terms), [Cookies](${siteUrl}/cookies), [Refunds](${siteUrl}/refunds)

## Contact

- Phone: ${contact.phoneDisplay}
- WhatsApp: ${contact.whatsappDisplay}
- Email: ${contact.email}
- Address: ${contact.address}
- Hours: ${contact.hours}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
