import Link from "next/link";
import { AgentsRail } from "@/components/AgentsRail";
import { Arrow, Heading, SectionBar } from "@/components/slip/Parts";
import { agents } from "@/lib/content/agents";
import type { Dictionary } from "@/lib/i18n";

// Lines: the whole roster as a strip of line slips. Live agents are inked; the ones in
// pilot or still in build print as ghosts, so nothing is dressed up as live.
export function AgentsTeaser({ t }: { t: Dictionary["agentsTeaser"] }) {
  const head = (
    <>
      <SectionBar mark="§ 03" name="Lines" form="BAI-01 · p.3" />
      <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
        <Heading id="agents-title" title={t.title} lead={t.lead} className="lg:col-span-8" />
        <div data-anim="rise" className="lg:col-span-4 lg:justify-self-end">
          <Link href="/agents" className="btn btn-secondary">
            {t.cta}
            <Arrow />
          </Link>
        </div>
      </div>
    </>
  );
  return (
    <section id="agents" aria-labelledby="agents-title" className="overflow-hidden py-16 md:py-20">
      <AgentsRail agents={agents} head={head} prevLabel={t.prev} nextLabel={t.next} allLabel={t.cta} allNote={t.note} />
    </section>
  );
}
