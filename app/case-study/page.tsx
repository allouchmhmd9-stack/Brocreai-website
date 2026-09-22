import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion";
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
      <PageHero crumb={d.nav.caseStudy} path="/case-study" title={caseStudy.title} lead={caseStudy.intro} />
      <section className="pb-8">
        <div className="container-x max-w-3xl space-y-12">
          {caseStudy.blocks.map((b) => (
            <Reveal key={b.h}>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{b.h}</h2>
              {b.p.map((p) => (
                <p key={p} className="mt-4 max-w-[68ch] leading-relaxed text-textsec">{p}</p>
              ))}
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand lead={caseStudy.ctaLead} />
    </>
  );
}
