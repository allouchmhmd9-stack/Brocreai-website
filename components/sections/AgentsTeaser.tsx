import { AgentsRail } from "@/components/AgentsRail";
import { Reveal } from "@/components/motion";
import { Segs } from "@/components/Segs";
import { LiquidButton } from "@/components/ui/liquid-button";
import { liveAgents } from "@/lib/content/agents";
import type { Dictionary } from "@/lib/i18n";

export function AgentsTeaser({ t }: { t: Dictionary["agentsTeaser"] }) {
  return (
    <section id="agents" className="bleed-mid relative scroll-mt-20 overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <h2 className="h2">
            <Segs segs={t.title} />
          </h2>
          <p className="mt-5 text-lg text-textsec">{t.lead}</p>
        </Reveal>
        <Reveal className="mt-6">
          <AgentsRail agents={liveAgents} prevLabel={t.prev} nextLabel={t.next} />
        </Reveal>
        <Reveal className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[56ch] text-textsec">{t.note}</p>
          <LiquidButton href="/agents" variant="chrome" className="shrink-0">{t.cta}</LiquidButton>
        </Reveal>
      </div>
    </section>
  );
}
