import type { Metadata } from "next";
import { Clauses } from "@/components/Clauses";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { caseStudy } from "@/lib/content/pages";
import { getDictionary } from "@/lib/i18n";

const d = getDictionary();

export const metadata: Metadata = {
  title: caseStudy.metaTitle,
  description: caseStudy.metaDescription,
  alternates: { canonical: "/case-study" },
  openGraph: { title: `${caseStudy.metaTitle} | Brocare AI`, description: caseStudy.metaDescription, url: "/case-study" },
};

export default function CaseStudyPage() {
  return (
    <>
      <PageHero
        crumb={d.nav.caseStudy}
        path="/case-study"
        title={caseStudy.title}
        lead={caseStudy.intro}
      />
      <div className="mt-10">
        <Clauses blocks={caseStudy.blocks} />
      </div>
      <CtaBand lead={caseStudy.ctaLead} />
    </>
  );
}
