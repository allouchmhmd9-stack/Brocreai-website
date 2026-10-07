import type { Metadata } from "next";
import Link from "next/link";
import { Clauses } from "@/components/Clauses";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Arrow } from "@/components/slip/Parts";
import { Stamp } from "@/components/slip/Stamp";
import { about } from "@/lib/content/pages";
import { getDictionary } from "@/lib/i18n";
import { forms } from "@/lib/slip";
import { ogImages } from "@/lib/og";

const d = getDictionary();

export const metadata: Metadata = {
  title: about.metaTitle,
  description: about.metaDescription,
  alternates: { canonical: "/about" },
  openGraph: { title: `${about.metaTitle} | Brocare AI`, description: about.metaDescription, url: "/about", images: ogImages },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        form={forms.about}
        crumb={d.nav.about}
        path="/about"
        title={about.title}
        lead={about.intro}
        aside={
          <div data-spin>
            <Stamp ring="Brocare Insurance Brokerage · Beirut" center="BEIRUT" size={180} rotate={0} />
          </div>
        }
      />
      <div className="mt-10">
        <Clauses blocks={about.blocks} />
      </div>
      <div className="wrap">
        <div data-anim="rise" className="mt-4 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-primary/30 via-accent/10 to-transparent p-6 ring-1 ring-inset ring-accent/30 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[1.4rem] font-bold tracking-[-0.02em] text-white">{about.ctaLead}</p>
            <p className="mt-2 text-textsec">
              <Link href="/case-study" className="ln text-white">
                {d.nav.caseStudy}
              </Link>
              : {d.pages.about.caseStudyLead}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/demo" className="btn btn-primary">
              {d.nav.demo}
              <Arrow />
            </Link>
            <Link href="/agents" className="btn btn-secondary">
              {d.pages.about.seeAgents}
            </Link>
          </div>
        </div>
      </div>
      <CtaBand />
    </>
  );
}
