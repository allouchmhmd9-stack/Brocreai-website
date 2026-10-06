import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { Arrow, Heading, Sheet } from "@/components/slip/Parts";
import { landingFaq } from "@/lib/content/faq";
import type { Dictionary } from "@/lib/i18n";

// The three questions every first call starts with. Answers stay folded until asked for,
// so the section stays short; the full FAQ page has every answer.
export function FaqTeaser({ t }: { t: Dictionary["faqTeaser"] }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="wrap">
        <Sheet>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Heading id="faq-title" title={t.title} lead={t.lead} />
              <div data-anim="rise" className="mt-8">
                <Link href="/faq" className="btn btn-secondary">
                  {t.cta}
                  <Arrow />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <Accordion items={landingFaq} />
            </div>
          </div>
        </Sheet>
      </div>
    </section>
  );
}
