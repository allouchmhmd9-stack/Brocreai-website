import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Segs } from "@/components/Segs";
import { StatusChip } from "@/components/StatusChip";
import { Arrow, SectionBar } from "@/components/slip/Parts";
import { Stamp } from "@/components/slip/Stamp";
import { agentBySlug } from "@/lib/content/agents";
import { beyond, bundles } from "@/lib/content/bundles";
import { getDictionary } from "@/lib/i18n";
import { forms, initials, pad2 } from "@/lib/slip";
import { cn } from "@/lib/utils";

const d = getDictionary();
const t = d.pages.bundles;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/bundles" },
  openGraph: { title: `${t.metaTitle} | Brocare AI`, description: t.metaDescription, url: "/bundles" },
};

const letter = (i: number) => String.fromCharCode(65 + i);

export default function BundlesPage() {
  return (
    <>
      <PageHero
        form={forms.bundles}
        crumb={d.nav.bundles}
        path="/bundles"
        title={t.title}
        lead={t.lead}
        aside={<Stamp data-anim="stamp" ring="Any agent · any bundle" center="ALL" size={170} rotate={-10} />}
      >
        <p data-anim="rise" className="mt-8 flex max-w-[62ch] items-start gap-3 border-t hair pt-4 text-white">
          <span className="lbl-ref mt-0.5 shrink-0 border border-accent px-1.5 py-0.5 text-accent">End. 01</span>
          {t.rule}
        </p>
      </PageHero>

      {/* Index of schedules */}
      <nav aria-label="Bundles on this page" className="wrap mt-10">
        <ol className="grid grid-cols-1 border-t hair sm:grid-cols-3 lg:grid-cols-9">
          {bundles.map((b, i) => (
            <li key={b.slug} className="border-b hair sm:border-r sm:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:last:border-r-0">
              <a href={`#${b.slug}`} className="group flex h-full items-baseline gap-2 px-3 py-3 text-[0.85rem] text-textsec transition-colors hover:bg-card hover:text-white lg:flex-col lg:gap-1">
                <span className="lbl-ref group-hover:text-accent">{letter(i)}.</span>
                <span className="leading-tight">{b.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="wrap mt-6 pb-8">
        {bundles.map((b, i) => {
          const live = b.status === "live";
          return (
            <section key={b.slug} id={b.slug} aria-labelledby={`${b.slug}-title`} className="scroll-mt-24 py-12 md:py-16">
              <SectionBar mark={`Schedule ${letter(i)}`} name={b.flag ?? b.name} form={`BAI-02 · ${pad2(i + 1)}`} />
              <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-28">
                    <h2 id={`${b.slug}-title`} data-anim="lines" className="h2">
                      {b.name}
                    </h2>
                    <StatusChip status={b.status} className="mt-4" />
                    <p data-anim="rise" className="mt-4 text-[1.2rem] leading-snug text-white">
                      {b.tagline}
                    </p>
                    {b.statusNote ? <p className="entry mt-3 text-[0.78rem] text-textsec">{b.statusNote}</p> : null}
                    {b.agents.length ? (
                      <div data-anim="rise" className="mt-8">
                        <p className="lbl">{t.agentsIn}</p>
                        <ul className="mt-3 grid grid-cols-2 gap-x-4 border-t hair">
                          {b.agents.map((slug) => {
                            const a = agentBySlug(slug);
                            return a ? (
                              <li key={slug} className="border-b hair">
                                <Link href={`/agents#${slug}`} className="group flex items-center gap-3 py-2.5 text-[0.92rem] text-textsec transition-colors hover:text-white">
                                  <Stamp ring={a.name} center={initials(a.name)} size={34} rotate={-6} tone={a.status === "live" ? "blue" : "ghost"} ink={false} />
                                  <span className="leading-tight">{a.name}</span>
                                </Link>
                              </li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={cn("lg:col-span-7", !live && "lg:border-l lg:border-dashed lg:border-cardborder lg:pl-10")}>
                  <p data-anim="rise" className="body text-[1.06rem]">
                    {b.body}
                  </p>
                  <dl className="mt-8 space-y-6">
                    <div data-anim="rise" className="border-t hair pt-3">
                      <dt className="lbl">{t.produces}</dt>
                      <dd className="entry mt-2 text-[0.82rem] leading-relaxed text-white">{b.produces}</dd>
                    </div>
                    <div data-anim="rise" className="border-t hair pt-3">
                      <dt className="lbl">{t.why}</dt>
                      <dd className="body mt-2">{b.why}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section aria-labelledby="beyond-title" className="py-16 md:py-24">
        <div className="wrap">
          <SectionBar mark="§ Ext." name="Beyond the bundles" form="BAI-02 · extensions" />
          <h2 id="beyond-title" data-anim="lines" className="h2 mt-8 max-w-[20ch]">
            <Segs segs={t.beyondTitle} />
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {beyond.map((x, i) => (
              <li key={x.title} data-anim="rise" className="border-t hair pt-4">
                <p className="lbl-ref">Extension {pad2(i + 1)}</p>
                <h3 className="h3 mt-4">{x.title}</h3>
                <p className="body mt-3">{x.body}</p>
              </li>
            ))}
          </ol>
          <div data-anim="rise" className="mt-14 flex flex-col gap-5 border-t border-primary pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[56ch] text-[1.1rem] text-white">{t.promise}</p>
            <Link href="/demo" className="btn btn-primary shrink-0">
              {d.nav.demo}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
