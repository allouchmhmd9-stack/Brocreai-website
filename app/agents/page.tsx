import type { Metadata } from "next";
import { AgentCard } from "@/components/AgentCard";
import { CtaBand } from "@/components/CtaBand";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { PageHero } from "@/components/PageHero";
import { StatusChip } from "@/components/StatusChip";
import { agentGroups, agents } from "@/lib/content/agents";
import { getDictionary } from "@/lib/i18n";

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
        <p className="hero-in hero-in-2 mt-4 max-w-[62ch] font-medium text-ice">{t.rule}</p>
        <nav aria-label={t.jump} className="hero-in hero-in-3 mt-8 flex flex-wrap gap-2">
          {agentGroups.map((g) => (
            <a key={g.key} href={`#${g.key}`} className="rounded-full border border-cardborder px-3 py-1 text-sm text-textsec transition hover:border-ice/60 hover:text-white">
              {g.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {agentGroups.map((g, gi) => {
        const list = agents.filter((a) => a.group === g.key);
        return (
          <section key={g.key} id={g.key} className={`scroll-mt-24 py-16 md:py-20 ${gi % 2 ? "bleed-mid" : ""}`}>
            <div className="container-x">
              <Reveal>
                <h2 className="h2">{g.title}</h2>
                {g.lead ? <p className="mt-3 text-textsec">{g.lead}</p> : null}
              </Reveal>
              <Stagger as="ul" className="mt-6 space-y-8">
                {list.map((a) => (
                  <StaggerItem as="li" key={a.slug} id={a.slug} className="grid scroll-mt-28 gap-8 border-t border-cardborder/50 pt-8 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-4">
                      <AgentCard agent={a} className="w-full max-w-[16.5rem]" />
                    </div>
                    <div className="lg:col-span-8">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-2xl font-bold tracking-tight">{a.name}</h3>
                        <StatusChip status={a.status} />
                      </div>
                      <p className="mt-2 text-lg text-white">{a.tagline}</p>
                      <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                        {FIELDS.map((key) => (
                          <div key={key} className={key === "custom" ? "sm:col-span-2" : ""}>
                            <dt className="text-sm font-semibold text-white">{t.fields[key]}</dt>
                            <dd className="mt-1 leading-relaxed text-textsec">{a[key]}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        );
      })}

      <CtaBand lead={t.closing} />
    </>
  );
}
