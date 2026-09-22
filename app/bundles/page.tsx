import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { PageHero } from "@/components/PageHero";
import { Segs } from "@/components/Segs";
import { StatusChip } from "@/components/StatusChip";
import { LiquidButton } from "@/components/ui/liquid-button";
import { agentBySlug } from "@/lib/content/agents";
import { beyond, bundles } from "@/lib/content/bundles";
import { getDictionary } from "@/lib/i18n";

const d = getDictionary();
const t = d.pages.bundles;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/bundles" },
  openGraph: { title: `${t.metaTitle} | Brocare AI`, description: t.metaDescription, url: "/bundles" },
};

export default function BundlesPage() {
  return (
    <>
      <PageHero crumb={d.nav.bundles} path="/bundles" title={t.title} lead={t.lead}>
        <p className="hero-in hero-in-2 mt-4 max-w-[62ch] font-medium text-ice">{t.rule}</p>
      </PageHero>

      <section className="pb-8">
        <Stagger as="ul" className="container-x space-y-6">
          {bundles.map((b) => (
            <StaggerItem as="li" key={b.slug} id={b.slug} className="glass scroll-mt-28 p-6 sm:p-8 md:p-10">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  {b.flag ? <p className="text-sm font-medium text-ice">{b.flag}</p> : null}
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{b.name}</h2>
                    <StatusChip status={b.status} />
                  </div>
                  <p className="mt-3 text-lg text-white">{b.tagline}</p>
                  {b.statusNote ? <p className="mt-3 text-sm text-textsec">{b.statusNote}</p> : null}
                  {b.agents.length ? (
                    <div className="mt-6">
                      <p className="text-sm font-medium text-textsec">{t.agentsIn}</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {b.agents.map((slug) => {
                          const a = agentBySlug(slug);
                          return a ? (
                            <li key={slug}>
                              <Link href={`/agents#${slug}`} className="inline-flex rounded-full border border-cardborder px-3 py-1 text-sm text-white transition hover:border-ice/60 hover:text-ice">
                                {a.name}
                              </Link>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  ) : null}
                </div>
                <div className="space-y-6 lg:col-span-7">
                  <p className="leading-relaxed text-textsec">{b.body}</p>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">{t.produces}</h3>
                    <p className="mt-1 leading-relaxed text-textsec">{b.produces}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">{t.why}</h3>
                    <p className="mt-1 leading-relaxed text-textsec">{b.why}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bleed-mid py-24 md:py-32">
        <div className="container-x">
          <Reveal>
            <h2 className="h2 max-w-[20ch]">
              <Segs segs={t.beyondTitle} />
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
            {beyond.map((x) => (
              <StaggerItem key={x.title} className="border-t border-cardborder/60 pt-5">
                <h3 className="font-display text-xl font-bold tracking-tight">{x.title}</h3>
                <p className="mt-3 leading-relaxed text-textsec">{x.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <p className="max-w-[56ch] text-white">{t.promise}</p>
            <LiquidButton href="/demo" variant="chrome" className="shrink-0">{d.nav.demo}</LiquidButton>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
