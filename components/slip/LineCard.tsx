import Link from "next/link";
import { AgentIcon } from "@/components/AgentIcon";
import { Tile } from "@/components/slip/Parts";
import { agentGroups, type Agent } from "@/lib/content/agents";
import { cn } from "@/lib/utils";

const GROUP = Object.fromEntries(agentGroups.map((g) => [g.key, g.title.replace(/ agents$/, "")]));

/**
 * One agent as a glass card: icon tile, name, group, the two-line job, and how often it
 * runs. Live agents carry an ice mark; pilot and coming-soon agents are dimmed, never
 * dressed up as live.
 */
export function LineCard({ agent, href, className }: { agent: Agent; href?: string; className?: string }) {
  const live = agent.status === "live";
  const body = (
    <>
      <span className="flex items-start justify-between gap-3">
        <Tile size="lg" tone={live ? "blue" : "ghost"}>
          <AgentIcon name={agent.icon} />
        </Tile>
        <span className={cn("flex items-center gap-1.5 pt-1 text-[0.78rem] font-medium", live ? "text-ice" : "text-textsec")}>
          <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", live ? "bg-ice" : "border border-textsec")} />
          {live ? "Live" : agent.status === "pilot" ? "In pilot" : "Coming soon"}
        </span>
      </span>
      <span className="mt-6 block min-h-[2.4em] font-display text-[1.2rem] font-semibold leading-[1.2] text-white [box-sizing:content-box]">{agent.name}</span>
      <span className="mt-1.5 block truncate text-[0.8rem] text-textsec/80">{GROUP[agent.group]}</span>
      <span className="mt-3 line-clamp-2 min-h-[2.9em] text-[0.92rem] leading-[1.5] text-textsec">{agent.tagline}</span>
      <span className="mt-5 flex items-baseline gap-2 border-t hair pt-4">
        <span className="font-display text-[1.9rem] font-bold leading-none text-white tabular-nums">{agent.cadence.big}</span>
        <span className="text-[0.82rem] text-textsec">{agent.cadence.label}</span>
      </span>
    </>
  );
  const base = cn("glass relative flex w-[17rem] shrink-0 flex-col p-6 sm:w-[18rem]", !live && "opacity-75", className);
  if (href) {
    return (
      <Link href={href} className={cn(base, "glass-hover")}>
        {body}
      </Link>
    );
  }
  return <div className={base}>{body}</div>;
}
