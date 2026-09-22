import Link from "next/link";
import { AgentIcon } from "@/components/AgentIcon";
import { StatusChip } from "@/components/StatusChip";
import type { Agent } from "@/lib/content/agents";

// The card from the reference: a circular avatar breaking the top edge, name, a two-line
// description, a hairline, then one big figure with its label.
export function AgentCard({ agent, href, className = "" }: { agent: Agent; href?: string; className?: string }) {
  const inner = (
    <>
      <div className="absolute left-1/2 top-0 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[6px] border-deep bg-card">
        <div className="grid h-[4.2rem] w-[4.2rem] place-items-center rounded-full bg-deep/70 text-ice">
          <AgentIcon name={agent.icon} className="h-8 w-8" />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center px-6 pb-7 pt-16 text-center">
        <h3 className="flex min-h-[2.5em] items-center font-display text-xl font-bold leading-tight tracking-tight text-white">{agent.name}</h3>
        <p className="mt-2 line-clamp-2 min-h-[2.8em] text-sm leading-snug text-textsec">{agent.tagline}</p>
        {agent.status !== "live" ? <StatusChip status={agent.status} className="mt-3" /> : null}
        <div className="mt-5 h-px w-full bg-cardborder/60" />
        <p className="mt-5 font-display text-4xl font-extrabold leading-none tabular-nums text-white">{agent.cadence.big}</p>
        <p className="mt-2 text-sm text-textsec">{agent.cadence.label}</p>
      </div>
    </>
  );
  const base = `agent-card relative mt-12 flex w-[16.5rem] shrink-0 snap-start flex-col rounded-2xl border border-cardborder/70 bg-card/40 transition duration-300 ${className}`;
  if (href) {
    return (
      <Link href={href} className={`${base} hover:border-accent/60 hover:shadow-glow-soft`}>
        {inner}
      </Link>
    );
  }
  return <div className={base}>{inner}</div>;
}
