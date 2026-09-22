import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/motion";
import { Segs } from "@/components/Segs";
import { LiquidButton } from "@/components/ui/liquid-button";
import { landingFaq } from "@/lib/content/faq";
import type { Dictionary } from "@/lib/i18n";

export function FaqTeaser({ t }: { t: Dictionary["faqTeaser"] }) {
  return (
    <section id="faq" className="bleed-mid relative scroll-mt-20 py-24 md:py-32">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h2 className="h2">
            <Segs segs={t.title} />
          </h2>
          <p className="mt-5 text-lg text-textsec">{t.lead}</p>
          <div className="mt-8">
            <LiquidButton href="/faq" variant="ice">{t.cta}</LiquidButton>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-8">
          <FaqList items={landingFaq} />
        </Reveal>
      </div>
    </section>
  );
}
