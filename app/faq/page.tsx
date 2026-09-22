import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/PageHero";
import { faqGroups } from "@/lib/content/faq";
import { getDictionary } from "@/lib/i18n";

const d = getDictionary();
const t = d.pages.faq;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/faq" },
  openGraph: { title: `${t.metaTitle} | Brocare AI`, description: t.metaDescription, url: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero crumb={d.nav.faq} path="/faq" title={t.title} lead={t.lead} />
      <section className="pb-12">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <nav aria-label={t.jump} className="lg:col-span-3">
            <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-1">
              {faqGroups.map((g) => (
                <li key={g.title}>
                  <a href={`#${slug(g.title)}`} className="inline-block rounded-full border border-cardborder px-3 py-1 text-sm text-textsec transition hover:border-ice/60 hover:text-white lg:border-0 lg:px-0 lg:py-1.5 lg:text-base">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16 lg:col-span-9">
            {faqGroups.map((g) => (
              <Reveal key={g.title}>
                <section id={slug(g.title)} className="scroll-mt-28">
                  <h2 className="h2 mb-4">{g.title}</h2>
                  <FaqList items={g.items} />
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
