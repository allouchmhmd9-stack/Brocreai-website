import type { Metadata } from "next";
import { AgentIcon } from "@/components/AgentIcon";
import { Tile } from "@/components/slip/Parts";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { StatusChip } from "@/components/StatusChip";
import { agentGroups, agents } from "@/lib/content/agents";
import { getDictionary } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const d = getDictionary();
const t = d.pages.agents;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: "/agents" },
  openGraph: { title: `${t.metaTitle} | Brocare AI`, description: t.metaDescription, url: "/agents" },
};

const FIELDS = ["does", "outputs", "how", "when", "custom"] as const;

export default function AgentsPage() {
  return (
    <>
      <PageHero crumb={d.nav.agents} path="/agents" title={t.title} lead={t.lead}>
        <p data-anim="rise" className="mt-8 flex max-w-[62ch] items-center gap-3 text-left text-white">
          <span className="shrink-0 rounded-full bg-accent/15 px-2.5 py-0.5 text-[0.76rem] font-medium text-ice">Any agent</span>
          {t.rule}
        </p>
      </PageHero>

      {/* Jump to a group: a printed tab strip that stays under the header */}
      <nav aria-label={t.jump} className="sticky top-[4.6rem] z-30 mt-10">
        <ul className="wrap rail flex gap-2 overflow-x-auto py-1">
          {agentGroups.map((g) => (
            <li key={g.key} className="shrink-0">
              <a href={`#${g.key}`} className="group flex items-baseline gap-2 rounded-full bg-mid/90 px-4 py-2.5 text-[0.88rem] text-textsec ring-1 ring-inset ring-cardborder/60 backdrop-blur-md transition hover:text-white hover:ring-accent/70">
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {agentGroups.map((g) => {
        const list = agents.filter((a) => a.group === g.key);
        return (
          <section key={g.key} id={g.key} aria-labelledby={`${g.key}-title`} className="scroll-mt-32 pt-16 md:pt-20">
            <div className="wrap">
              <h2 id={`${g.key}-title`} data-anim="lines" className="h2">
                {g.title}
              </h2>
              {g.lead ? (
                <p data-anim="rise" className="lead mt-4">
                  {g.lead}
                </p>
              ) : null}

              <ul className="mt-10 space-y-5">
                {list.map((a) => {
                  const live = a.status === "live";
                  return (
                    <li key={a.slug} id={a.slug} className="scroll-mt-36 rounded-3xl bg-gradient-to-b from-card/50 to-mid/30 px-5 py-8 ring-1 ring-inset ring-cardborder/40 sm:px-8 md:py-10">
                      <article aria-labelledby={`${a.slug}-name`} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                        <div className="lg:col-span-4">
                          <div className="flex items-start gap-5 lg:flex-col">
                            <Tile size="lg" tone={live ? "blue" : "ghost"} className="h-16 w-16 [&_svg]:h-8 [&_svg]:w-8">
                              <AgentIcon name={a.icon} />
                            </Tile>
                            <div>
                              <h3 id={`${a.slug}-name`} className="text-[1.75rem] font-bold leading-[1.08] tracking-[-0.025em] text-white">
                                {a.name}
                              </h3>
                              <p className="mt-3 flex items-center gap-3">
                                <StatusChip status={a.status} />
                              </p>
                            </div>
                          </div>
                          <p className="mt-5 text-[1.1rem] leading-snug text-white">{a.tagline}</p>
                          <div className="mt-6 flex items-end gap-3">
                            <span className="text-[2.8rem] font-bold leading-none tracking-[-0.04em] text-white tabular-nums" style={{ fontStretch: "92%" }}>
                              {a.cadence.big}
                            </span>
                            <span className="pb-1 text-[0.88rem] text-textsec">{a.cadence.label}</span>
                          </div>
                        </div>
                        <dl className={cn("grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8", !live && "opacity-85")}>
                          {FIELDS.map((key) => (
                            <div key={key} data-anim="rise" className={cn(key === "custom" && "sm:col-span-2")}>
                              <dt className="lbl">{t.fields[key]}</dt>
                              <dd className={cn("mt-2", key === "outputs" ? "entry text-[0.8rem] leading-relaxed text-white" : "body")}>{a[key]}</dd>
                            </div>
                          ))}
                        </dl>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      <CtaBand lead={t.closing} />
    </>
  );
}
