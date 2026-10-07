import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AgentIcon } from "@/components/AgentIcon";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Arrow, Tick } from "@/components/slip/Parts";
import { agentBySlug } from "@/lib/content/agents";
import { engineBySlug, enginePages } from "@/lib/content/engines";
import { ogImages } from "@/lib/og";
import { siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return enginePages.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = engineBySlug((await params).slug);
  if (!e) return {};
  return {
    title: e.metaTitle,
    description: e.metaDescription,
    alternates: { canonical: `/engines/${e.slug}` },
    openGraph: { title: `${e.metaTitle} | Brocare AI`, description: e.metaDescription, url: `/engines/${e.slug}`, images: ogImages },
  };
}

export default async function EnginePage({ params }: { params: Promise<{ slug: string }> }) {
  const e = engineBySlug((await params).slug);
  if (!e) notFound();
  const members = e.agents.map((s) => agentBySlug(s)).filter((a): a is NonNullable<typeof a> => Boolean(a));
  const ld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    name: e.name,
    description: e.metaDescription,
    url: `${siteUrl}/engines/${e.slug}`,
    serviceType: "AI agents for insurance",
    provider: { "@id": `${siteUrl}/#organization` },
  }).replace(/</g, "\\u003c");

  return (
    <>
      <PageHero form={{ code: "BAI-E", title: e.name }} crumb={e.name} path={`/engines/${e.slug}`} title={e.title} lead={e.lead}>
        <p data-anim="rise" className="mt-7 inline-flex items-center gap-2 rounded-full bg-ice/10 px-3.5 py-1.5 text-[0.85rem] text-ice ring-1 ring-inset ring-ice/40">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ice" />
          {e.status}
        </p>
      </PageHero>

      <section aria-labelledby="steps-title" className="section">
        <div className="wrap">
          <h2 id="steps-title" data-anim="lines" className="h2 max-w-3xl">
            How it works
          </h2>
          <ol className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {e.steps.map((s, i) => (
              <li key={s.title} data-anim="rise" className="rounded-3xl bg-gradient-to-b from-card/70 to-mid/40 p-6 ring-1 ring-inset ring-cardborder/50 md:p-7">
                <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-[0.85rem] font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="h3 mt-5">{s.title}</h3>
                <p className="body mt-2 text-[0.97rem]">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="What you get and how you stay in control" className="section">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 data-anim="lines" className="h2">What lands on your desk</h2>
            <ul className="mt-8 space-y-4">
              {e.outputs.map((o) => (
                <li key={o} data-anim="rise" className="flex items-start gap-3 text-[1.05rem] text-white">
                  <Tick className="mt-0.5 h-6 w-6 shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 data-anim="lines" className="h2">You stay in control</h2>
            <ul className="mt-8 space-y-4">
              {e.control.map((c) => (
                <li key={c} data-anim="rise" className="flex items-start gap-3 text-[1.05rem] text-white">
                  <Tick tone="ice" className="mt-0.5 h-6 w-6 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="wrap">
          <p data-anim="rise" className="mt-14 max-w-3xl rounded-3xl bg-ice/[0.06] p-6 text-[1.05rem] leading-relaxed text-white ring-1 ring-inset ring-ice/30 md:p-8">
            {e.proof}
          </p>
        </div>
      </section>

      {members.length ? (
        <section aria-labelledby="inside-title" className="section">
          <div className="wrap">
            <h2 id="inside-title" data-anim="lines" className="h2">Inside this engine</h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {members.map((a) => (
                <li key={a.slug} data-anim="rise">
                  <Link href={`/agents#${a.slug}`} className="group inline-flex items-center gap-3 rounded-full bg-card/70 py-2 pl-2 pr-5 ring-1 ring-inset ring-cardborder/60 transition hover:ring-white/60">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/30 text-ice">
                      <AgentIcon name={a.icon} className="h-4 w-4" />
                    </span>
                    <span className="font-semibold text-white">{a.name}</span>
                    <Arrow className="h-4 w-4 text-textsec transition group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link href="/engines" className="ln text-textsec">
                See every engine
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      <CtaBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
    </>
  );
}
