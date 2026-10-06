import type { Metadata } from "next";
import { Clauses } from "@/components/Clauses";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Stamp } from "@/components/slip/Stamp";
import { caseStudy } from "@/lib/content/pages";
import { getDictionary } from "@/lib/i18n";
import { forms } from "@/lib/slip";

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
        form={forms.caseStudy}
        crumb={d.nav.caseStudy}
        path="/case-study"
        title={caseStudy.title}
        lead={caseStudy.intro}
        aside={<Stamp data-anim="stamp" ring="In daily use · Brocare Insurance" center="IN USE" size={172} rotate={-9} />}
      />
      <div className="mt-10">
        <Clauses blocks={caseStudy.blocks} mark="Record" />
      </div>
      <CtaBand lead={caseStudy.ctaLead} />
    </>
  );
}
