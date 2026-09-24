import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
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

// Questions answered as numbered notes, every answer visible. Structured data mirrors them.
const faqLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) => g.items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } }))),
}).replace(/</g, "\\u003c");

export default function FaqPage() {
  return (
    <>
      <PageHero crumb={d.nav.faq} path="/faq" title={t.title} lead={t.lead} />
      <div className="wrap mt-12 grid gap-12 pb-8 lg:grid-cols-12">
        <nav aria-label={t.jump} className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="lbl">{t.jump}</p>
            <ol className="mt-3 space-y-1">
              {faqGroups.map((g) => (
                <li key={g.title}>
                  <a href={`#${slug(g.title)}`} className="group flex items-baseline gap-3 rounded-2xl px-3 py-2.5 text-[0.95rem] text-textsec transition-colors hover:bg-card/50 hover:text-white">
                    {g.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <div className="space-y-16 lg:col-span-9">
          {faqGroups.map((g) => (
            <section key={g.title} id={slug(g.title)} aria-labelledby={`${slug(g.title)}-title`} className="scroll-mt-28">
              <div data-anim="rule" className="h-px bg-primary" />
              <h2 id={`${slug(g.title)}-title`} data-anim="lines" className="h2 mt-4">
                {g.title}
              </h2>
              <dl className="mt-6">
                {g.items.map((it) => {
                  return (
                    <div key={it.q} data-anim="rise" className="border-t hair py-7">
                      <div>
                        <dt className="h3">{it.q}</dt>
                        <dd className="body mt-3">{it.a}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </section>
          ))}
        </div>
      </div>
      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqLd }} />
    </>
  );
}
