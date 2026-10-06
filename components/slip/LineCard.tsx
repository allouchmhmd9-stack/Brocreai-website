import Link from "next/link";
import { AgentIcon } from "@/components/AgentIcon";
import { Stamp } from "@/components/slip/Stamp";
import { agentGroups, type Agent } from "@/lib/content/agents";
import { lineNo } from "@/lib/slip";
import { cn } from "@/lib/utils";

const GROUP = Object.fromEntries(agentGroups.map((g) => [g.key, g.title.replace(/ agents$/, "")]));

/**
 * One agent as a line slip: its round stamp breaks the top edge, then its line number,
 * name, the two-line job, a divider, and how often it runs. Live agents carry an ice mark;
 * pilot and coming-soon agents are dimmed with an outline stamp, never dressed up as live.
 */
export function LineCard({ agent, href, className }: { agent: Agent; href?: string; className?: string }) {
  const live = agent.status === "live";
  const body = (
    <>
      <span className="absolute left-6 top-0 -translate-y-1/2 rounded-full bg-deep p-1.5 transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-105">
        <Stamp
          ring={`${agent.name} · ${live ? "live" : agent.status}`}
          icon={<AgentIcon name={agent.icon} />}
          tone={live ? "blue" : "ghost"}
          size={84}
          rotate={-6}
        />
      </span>
      <span className="block min-h-[2.3em] pt-12 text-[1.3rem] font-bold leading-[1.12] tracking-[-0.02em] text-white [box-sizing:content-box]">{agent.name}</span>
      <span className="mt-2 flex items-baseline gap-2">
        <span className="lbl-ref">{lineNo(agent)}</span>
        <span className="lbl truncate text-[0.6rem]">{GROUP[agent.group]}</span>
      </span>
      <span className="mt-3 line-clamp-2 min-h-[2.9em] text-[0.92rem] leading-[1.45] text-textsec">{agent.tagline}</span>
      <span className="mt-5 block h-px w-full bg-gradient-to-r from-cardborder/80 to-transparent transition-colors duration-300 group-hover:from-accent" aria-hidden="true" />
      <span className="mt-4 flex items-end justify-between gap-3">
        <span>
          <span className="block text-[2.6rem] font-bold leading-none tracking-[-0.04em] text-white tabular-nums" style={{ fontStretch: "92%" }}>
            {agent.cadence.big}
          </span>
          <span className="mt-1.5 block text-[0.82rem] text-textsec">{agent.cadence.label}</span>
        </span>
        <span className={cn("lbl flex items-center gap-1.5 text-[0.62rem]", live ? "text-ice" : "text-textsec")}>
          <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", live ? "bg-ice" : "border border-textsec")} />
          {live ? "Live" : agent.status === "pilot" ? "In pilot" : "Coming soon"}
        </span>
      </span>
    </>
  );
  const base = cn(
    "group relative flex w-[17.5rem] shrink-0 flex-col rounded-3xl bg-gradient-to-b from-card/80 to-mid/60 px-6 pb-6 ring-1 ring-inset ring-cardborder/50 transition-[transform,box-shadow,background-color] duration-500 ease-out sm:w-[18.5rem]",
    !live && "opacity-75",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={cn(base, "hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-28px_rgba(45,111,255,0.7)] hover:ring-accent/60 focus-visible:-translate-y-1.5")}>
        {body}
      </Link>
    );
  }
  return <div className={base}>{body}</div>;
}
