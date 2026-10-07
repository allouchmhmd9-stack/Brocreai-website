import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { AgentsTeaser } from "@/components/sections/AgentsTeaser";
import { BundlesTeaser } from "@/components/sections/BundlesTeaser";
import { FaqTeaser } from "@/components/sections/FaqTeaser";
import { Guarantee } from "@/components/sections/Guarantee";
import { ExampleSchedule } from "@/components/sections/ExampleSchedule";
import { AgentsMarquee } from "@/components/sections/AgentsMarquee";
import { EngineHero } from "@/components/sections/EngineHero";
import { How } from "@/components/sections/How";
import { Intro } from "@/components/sections/Intro";
import { agents } from "@/lib/content/agents";
import { bundles } from "@/lib/content/bundles";
import { getDictionary } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

const d = getDictionary();

export const metadata: Metadata = {
  title: { absolute: d.meta.title },
  description: d.meta.description,
  alternates: { canonical: "/" },
};

const servicesLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Brocare AI engines",
  url: `${siteUrl}/engines`,
  itemListElement: bundles.map((b) => ({
    "@type": "Offer",
    url: `${siteUrl}/engines#${b.slug}`,
    itemOffered: {
      "@type": "Service",
      name: b.name,
      description: b.short,
      serviceType: "AI agents for insurance",
      provider: { "@id": `${siteUrl}/#organization` },
    },
  })),
}).replace(/</g, "\\u003c");

export default function HomePage() {
  return (
    <>
      <EngineHero hero={d.hero} demoLabel={d.nav.demo} agentCount={agents.length} bundleCount={bundles.filter((b) => b.status !== "custom").length} />
      <AgentsMarquee />
      <ExampleSchedule t={d.schedule} demoLabel={d.nav.demo} />
      <Intro intro={d.intro} />
      <AgentsTeaser t={d.agentsTeaser} />
      <BundlesTeaser t={d.bundlesTeaser} />
      <How how={d.how} />
      <Guarantee guarantee={d.guarantee} />
      <FaqTeaser t={d.faqTeaser} />
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: servicesLd }} />
    </>
  );
}
