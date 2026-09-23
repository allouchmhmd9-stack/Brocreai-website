import type { Metadata } from "next";
import { AgentIcon } from "@/components/AgentIcon";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { StatusChip } from "@/components/StatusChip";
import { SectionBar } from "@/components/slip/Parts";
import { Stamp } from "@/components/slip/Stamp";
import { agentGroups, agents } from "@/lib/content/agents";
import { getDictionary } from "@/lib/i18n";
import { forms, lineNo, pad2 } from "@/lib/slip";
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
      <PageHero form={forms.agents} crumb={d.nav.agents} path="/agents" title={t.title} lead={t.lead}>
        <p data-anim="rise" className="mt-8 flex max-w-[62ch] items-start gap-3 border-t hair pt-4 text-white">
          <span className="lbl-ref mt-0.5 shrink-0 border border-accent px-1.5 py-0.5 text-accent">End. 01</span>
          {t.rule}
        </p>
      </PageHero>

      {/* Jump to a group: a printed tab strip that stays under the header */}
      <nav aria-label={t.jump} className="sticky top-16 z-30 mt-10 border-y hair bg-deep/[0.94] backdrop-blur-md">
        <ul className="wrap rail flex gap-1 overflow-x-auto">
          {agentGroups.map((g, i) => (
            <li key={g.key} className="shrink-0">
              <a href={`#${g.key}`} className="group flex items-baseline gap-2 px-3 py-3 text-[0.88rem] text-textsec transition-colors hover:text-white">
                <span className="lbl-ref group-hover:text-accent">{pad2(i + 1)}</span>
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {agentGroups.map((g, gi) => {
        const list = agents.filter((a) => a.group === g.key);
        return (
          <section key={g.key} id={g.key} aria-labelledby={`${g.key}-title`} className="scroll-mt-32 pt-16 md:pt-20">
            <div className="wrap">
              <SectionBar mark={`Group ${pad2(gi + 1)}`} name={`${list.length} ${list.length === 1 ? "agent" : "agents"}`} form={`BAI-03 · p.${gi + 1}`} />
              <h2 id={`${g.key}-title`} data-anim="lines" className="h2 mt-6">
                {g.title}
              </h2>
              {g.lead ? (
                <p data-anim="rise" className="lead mt-4">
                  {g.lead}
                </p>
              ) : null}

              <ul className="mt-10">
                {list.map((a) => {
                  const live = a.status === "live";
                  return (
                    <li key={a.slug} id={a.slug} className="scroll-mt-32 border-t hair py-10 md:py-12">
                      <article aria-labelledby={`${a.slug}-name`} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                        <div className="lg:col-span-4">
                          <div className="flex items-start gap-5 lg:flex-col">
                            <Stamp
                              data-anim="stamp"
                              ring={`${a.name} · ${live ? "live" : a.status}`}
                              icon={<AgentIcon name={a.icon} />}
                              tone={live ? "blue" : "ghost"}
                              size={112}
                              rotate={-8}
                            />
                            <div>
                              <h3 id={`${a.slug}-name`} className="text-[1.75rem] font-bold leading-[1.08] tracking-[-0.025em] text-white">
                                {a.name}
                              </h3>
                              <p className="mt-3 flex items-center gap-3">
                                <span className="lbl-ref">{lineNo(a)}</span>
                                <StatusChip status={a.status} />
                              </p>
                            </div>
                          </div>
                          <p className="mt-5 text-[1.1rem] leading-snug text-white">{a.tagline}</p>
                          <div className="mt-6 flex items-end gap-3 border-t hair pt-4">
                            <span className="text-[2.8rem] font-bold leading-none tracking-[-0.04em] text-white tabular-nums" style={{ fontStretch: "92%" }}>
                              {a.cadence.big}
                            </span>
                            <span className="pb-1 text-[0.88rem] text-textsec">{a.cadence.label}</span>
                          </div>
                        </div>
                        <dl className={cn("grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8", !live && "lg:border-l lg:border-dashed lg:border-cardborder lg:pl-10")}>
                          {FIELDS.map((key) => (
                            <div key={key} data-anim="rise" className={cn("border-t hair pt-3", key === "custom" && "sm:col-span-2")}>
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
