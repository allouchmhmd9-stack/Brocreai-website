import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Segs } from "@/components/Segs";
import { StatusChip } from "@/components/StatusChip";
import { Arrow } from "@/components/slip/Parts";
import { Stamp } from "@/components/slip/Stamp";
import { agentBySlug } from "@/lib/content/agents";
import { beyond, bundles } from "@/lib/content/bundles";
import { getDictionary } from "@/lib/i18n";
import { forms, initials } from "@/lib/slip";
import { cn } from "@/lib/utils";
import { ogImages } from "@/lib/og";

const d = getDictionary();
const t = d.pages.bundles;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/bundles" },
  openGraph: { title: `${t.metaTitle} | Brocare AI`, description: t.metaDescription, url: "/bundles", images: ogImages },
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
        <p data-anim="rise" className="mt-8 flex max-w-[62ch] items-center gap-3 text-white">
          <span className="lbl-ref pill shrink-0 text-accent">Any agent</span>
          {t.rule}
        </p>
      </PageHero>

      {/* Index of schedules */}
      <nav aria-label="Bundles on this page" className="wrap mt-10">
        <ol className="flex flex-wrap gap-2">
          {bundles.map((b, i) => (
            <li key={b.slug}>
              <a href={`#${b.slug}`} className="group flex items-baseline gap-2 rounded-full bg-card/50 px-4 py-2.5 text-[0.88rem] text-textsec ring-1 ring-inset ring-cardborder/50 transition hover:bg-card hover:text-white hover:ring-accent/60">
                <span className="lbl-ref group-hover:text-accent">{letter(i)}.</span>
                <span className="leading-tight">{b.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="wrap mt-6 pb-8">
        {bundles.map((b) => {
          const live = b.status === "live";
          return (
            <section key={b.slug} id={b.slug} aria-labelledby={`${b.slug}-title`} className="scroll-mt-24 py-12 md:py-16">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
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
                        <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                          {b.agents.map((slug) => {
                            const a = agentBySlug(slug);
                            return a ? (
                              <li key={slug}>
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
                <div className={cn("lg:col-span-7", !live && "opacity-85")}>
                  <p data-anim="rise" className="body text-[1.06rem]">
                    {b.body}
                  </p>
                  <dl className="mt-8 space-y-6">
                    <div data-anim="rise">
                      <dt className="lbl">{t.produces}</dt>
                      <dd className="entry mt-2 text-[0.82rem] leading-relaxed text-white">{b.produces}</dd>
                    </div>
                    <div data-anim="rise">
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
          <h2 id="beyond-title" data-anim="lines" className="h2 max-w-[20ch]">
            <Segs segs={t.beyondTitle} />
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {beyond.map((x) => (
              <li key={x.title} data-anim="rise" className="rounded-3xl bg-card/40 p-6 ring-1 ring-inset ring-cardborder/40 sm:p-7">
                <h3 className="h3">{x.title}</h3>
                <p className="body mt-3">{x.body}</p>
              </li>
            ))}
          </ol>
          <div data-anim="rise" className="mt-10 flex flex-col gap-5 rounded-3xl bg-gradient-to-r from-primary/30 via-accent/10 to-transparent p-6 ring-1 ring-inset ring-accent/30 sm:flex-row sm:items-center sm:justify-between sm:p-8">
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
