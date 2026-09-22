import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/PageHero";
import { LiquidButton } from "@/components/ui/liquid-button";
import { about } from "@/lib/content/pages";
import { getDictionary } from "@/lib/i18n";

const d = getDictionary();

export const metadata: Metadata = {
  title: about.metaTitle,
  description: about.metaDescription,
  alternates: { canonical: "/about" },
  openGraph: { title: `${about.metaTitle} | Brocare AI`, description: about.metaDescription, url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero crumb={d.nav.about} path="/about" title={about.title} lead={about.intro} />
      <section className="pb-8">
        <div className="container-x max-w-3xl space-y-12">
          {about.blocks.map((b) => (
            <Reveal key={b.h}>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{b.h}</h2>
              {b.p.map((p) => (
                <p key={p} className="mt-4 max-w-[68ch] leading-relaxed text-textsec">{p}</p>
              ))}
            </Reveal>
          ))}
          <Reveal className="flex flex-col gap-4 border-t border-cardborder/60 pt-8 sm:flex-row sm:items-center">
            <p className="text-lg text-white">{about.ctaLead}</p>
            <div className="flex flex-wrap gap-3">
              <LiquidButton href="/demo" variant="chrome">{d.nav.demo}</LiquidButton>
              <LiquidButton href="/agents" variant="ice">{d.pages.about.seeAgents}</LiquidButton>
            </div>
          </Reveal>
          <p className="text-sm text-textsec">
            <Link href="/case-study" className="link-underline text-white">{d.nav.caseStudy}</Link>: {d.pages.about.caseStudyLead}
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
