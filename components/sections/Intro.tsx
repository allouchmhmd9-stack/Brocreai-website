import { Briefcase, Globe, ShieldCheck } from "lucide-react";
import { Heading, Tile } from "@/components/slip/Parts";
import type { Dictionary } from "@/lib/i18n";

const ICONS = [Briefcase, ShieldCheck, Globe];

// Where the system comes from: the claim, centred, then three calm cards.
export function Intro({ intro }: { intro: Dictionary["intro"] }) {
  return (
    <section id="provenance" aria-labelledby="provenance-title" className="section bg-flow">
      <div className="wrap">
        <Heading id="provenance-title" title={intro.title} lead={intro.lead} center />
        <ul className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3">
          {intro.facts.map((f, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <li key={f.title} data-anim="rise" className="glass glass-hover p-7 md:p-8">
                <Tile>
                  <Icon strokeWidth={1.7} />
                </Tile>
                <h3 className="h3 mt-6">{f.title}</h3>
                <p className="body mt-3 text-[0.95rem]">{f.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
