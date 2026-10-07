import Link from "next/link";
import { Arrow } from "@/components/slip/Parts";
import { agents } from "@/lib/content/agents";
import { initials } from "@/lib/slip";

const STATUS: Record<string, string> = { live: "live", pilot: "in pilot", build: "in build", coming: "coming soon" };

// Every agent on two slow strips. Statuses come straight from lib/content/agents.ts.
export function AgentsMarquee() {
  const half = Math.ceil(agents.length / 2);
  const lanes = [agents.slice(0, half), agents.slice(half)];
  return (
    <section aria-labelledby="team-title" className="pb-6 pt-14 text-center md:pt-16">
      <div className="wrap">
        <p className="lbl">The team &middot; {agents.length} agents &middot; one approval inbox</p>
        <h2 id="team-title" className="h2 mx-auto mt-3 max-w-3xl">Every desk, already staffed.</h2>
      </div>
      <div className="marquee mt-9" aria-label="The Brocare AI agents">
        {lanes.map((lane, k) => (
          <div key={k} className={`lane ${k ? "lane-rev" : ""}`}>
            {[...lane, ...lane].map((a, i) => {
              const live = a.status === "live";
              return (
                <Link key={`${a.slug}-${i}`} href={`/agents#${a.slug}`} tabIndex={i >= lane.length ? -1 : undefined} aria-hidden={i >= lane.length ? true : undefined} className={`chip ${live ? "" : "chip-dim"}`}>
                  <i>{initials(a.name)}</i>
                  {a.name}
                  <span className="chip-st">{STATUS[a.status] ?? a.status}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/agents" className="btn btn-secondary">
          See all agents
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
