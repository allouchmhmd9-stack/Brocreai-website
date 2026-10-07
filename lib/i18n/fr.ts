import type { DeepPartial, Dictionary } from "./en";

// French is secondary. Keys left out here fall back to English, so this file can
// be filled in gradually. It is not routed anywhere yet: see lib/i18n/index.ts.
export const fr: DeepPartial<Dictionary> = {
  nav: {
    engines: "Moteurs",
    bundles: "Offres",
    agents: "Agents",
    about: "A propos",
    faq: "FAQ",
    caseStudy: "Etude de cas",
    demo: "Reserver une demo",
  },
};
