import Link from "next/link";
import { Arrow, Heading, SectionBar } from "@/components/slip/Parts";
import { landingFaq } from "@/lib/content/faq";
import type { Dictionary } from "@/lib/i18n";
import { pad2 } from "@/lib/slip";

// Notes: the three questions every first call starts with, answered in the margin.
export function FaqTeaser({ t }: { t: Dictionary["faqTeaser"] }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 md:py-28">
      <div className="wrap">
        <SectionBar mark="§ 07" name="Notes" form="BAI-01 · p.7" />
        <div className="mt-10 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading id="faq-title" title={t.title} lead={t.lead} />
            <div data-anim="rise" className="mt-8">
              <Link href="/faq" className="btn btn-secondary">
                {t.cta}
                <Arrow />
              </Link>
            </div>
          </div>
          <dl className="lg:col-span-7">
            {landingFaq.map((it, i) => (
              <div key={it.q} data-anim="rise" className="grid gap-x-6 border-t hair py-7 sm:grid-cols-[4.5rem_1fr]">
                <span className="lbl-ref pt-1">Note {pad2(i + 1)}</span>
                <div>
                  <dt className="h3">{it.q}</dt>
                  <dd className="body mt-3">{it.a}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
