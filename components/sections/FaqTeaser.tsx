import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { Arrow, Heading } from "@/components/slip/Parts";
import { landingFaq } from "@/lib/content/faq";
import type { Dictionary } from "@/lib/i18n";

// The three questions every first call starts with. Answers stay folded until asked for;
// the full FAQ page has every answer.
export function FaqTeaser({ t }: { t: Dictionary["faqTeaser"] }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="wrap">
        <Heading id="faq-title" title={t.title} lead={t.lead} center />
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion items={landingFaq} />
        </div>
        <div data-anim="rise" className="mt-10 text-center">
          <Link href="/faq" className="btn btn-secondary">
            {t.cta}
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
