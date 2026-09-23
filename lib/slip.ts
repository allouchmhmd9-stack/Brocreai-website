import { agents, type Agent } from "@/lib/content/agents";

// Small helpers for the placing-slip world: agent initials for stamps, line numbers,
// and the form codes printed at the top of each page.

/** First letter of the first and last word: "Speed-to-Lead Drafting" -> "SD". */
export function initials(name: string): string {
  const words = name.split(/[\s\-&]+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/** Position of an agent in the full roster, as printed on the slip: "L.07". */
export function lineNo(agent: Agent): string {
  const i = agents.findIndex((a) => a.slug === agent.slug);
  return `L.${String(i + 1).padStart(2, "0")}`;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** The form code printed in each page's header strip. */
export const forms = {
  home: { code: "BAI-01", title: "Schedule of work" },
  bundles: { code: "BAI-02", title: "Schedule of bundles" },
  agents: { code: "BAI-03", title: "Schedule of agents" },
  about: { code: "BAI-04", title: "Declaration" },
  caseStudy: { code: "BAI-05", title: "Record of use" },
  faq: { code: "BAI-06", title: "Notes and answers" },
  demo: { code: "BAI-07", title: "Request for demonstration" },
  legal: { code: "BAI-L", title: "Terms of use" },
} as const;
