"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AgentCard } from "@/components/AgentCard";
import type { Agent } from "@/lib/content/agents";

// Horizontal, snap-scrolling row of agent cards with arrow buttons on wide screens.
export function AgentsRail({ agents, prevLabel, nextLabel }: { agents: Agent[]; prevLabel: string; nextLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <div className="relative">
      <div
        ref={ref}
        className="rail -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 pt-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-1"
      >
        {agents.map((a) => (
          <AgentCard key={a.slug} agent={a} href={`/agents#${a.slug}`} />
        ))}
      </div>
      <div className="mt-2 hidden justify-end gap-2 lg:flex">
        <button type="button" onClick={() => go(-1)} aria-label={prevLabel} className="grid h-11 w-11 place-items-center rounded-full border border-cardborder text-textsec transition hover:border-ice/60 hover:text-ice">
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label={nextLabel} className="grid h-11 w-11 place-items-center rounded-full border border-cardborder text-textsec transition hover:border-ice/60 hover:text-ice">
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
