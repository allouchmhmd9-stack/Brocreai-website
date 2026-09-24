"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AgentIcon } from "@/components/AgentIcon";
import { Segs } from "@/components/Segs";
import { Arrow, Tick, Tile } from "@/components/slip/Parts";
import { agents } from "@/lib/content/agents";
import type { Dictionary } from "@/lib/i18n";

// Example entries: what five of the live agents hand over on an ordinary morning.
// Labelled as an example on the card; no counts or clients are claimed.
const EXAMPLE = [
  { agent: "Lead Engine", entry: "Verified leads, scored out of 100, filed to the pipeline" },
  { agent: "Pre-Call Intelligence", entry: "Research brief ready before the call" },
  { agent: "Speed-to-Lead Drafting", entry: "First email drafted, under 150 words" },
  { agent: "Instant Proposals", entry: "Client-ready proposal drafted" },
  { agent: "Morning Brief", entry: "Today's brief: leads, signals, approvals" },
].map((l) => ({ ...l, icon: agents.find((a) => a.name === l.agent)?.icon ?? "Sparkles" }));

/**
 * One morning's work, waiting for approval. The visitor approves it and every line turns
 * approved: the product's whole promise in one gesture.
 */
export function ExampleSchedule({ t, demoLabel }: { t: Dictionary["schedule"]; demoLabel: string }) {
  const root = useRef<HTMLDivElement>(null);
  const next = useRef<HTMLAnchorElement>(null);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    if (!approved) return;
    next.current?.focus({ preventScroll: true });
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-approved]", { autoAlpha: 0, x: -6, duration: 0.45, stagger: 0.07, ease: "expo.out" });
      gsap.from("[data-after]", { autoAlpha: 0, y: 8, duration: 0.6, delay: 0.3, ease: "expo.out" });
    }, root);
    return () => ctx.revert();
  }, [approved]);

  return (
    <section id="schedule" aria-labelledby="schedule-title" className="section">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="schedule-title" data-anim="lines" className="h2">
            <Segs segs={t.title} />
          </h2>
          <p data-anim="rise" className="lead mt-5">
            {t.lead}
          </p>
        </div>

        <div ref={root} data-anim="rise" className="glass p-5 sm:p-7 lg:col-span-7">
          <div className="flex items-center justify-between gap-4 px-1">
            <p className="font-display text-lg font-semibold">This morning</p>
            <span className="rounded-full bg-card/80 px-3 py-1 text-[0.78rem] text-textsec ring-1 ring-inset ring-cardborder/70">Example</span>
          </div>

          <ol className="mt-4 space-y-2">
            {EXAMPLE.map((l) => (
              <li key={l.agent} className="flex items-center gap-4 rounded-2xl bg-deep/40 px-4 py-3.5">
                <Tile size="sm" tone={approved ? "ice" : "blue"} className="h-10 w-10 [&_svg]:h-5 [&_svg]:w-5">
                  <AgentIcon name={l.icon} />
                </Tile>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-tight text-white">{l.agent}</span>
                  <span className="mt-1 block text-[0.9rem] leading-snug text-textsec">{l.entry}</span>
                </span>
                <span className="hidden shrink-0 sm:block">
                  {approved ? (
                    <span data-approved className="flex items-center gap-1.5 text-[0.82rem] font-medium text-ice">
                      <Tick tone="ice" className="h-4 w-4" />
                      Approved
                    </span>
                  ) : (
                    <span className="text-[0.82rem] text-textsec">Awaiting approval</span>
                  )}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-5 flex min-h-[3.1rem] flex-col gap-4 px-1 sm:flex-row sm:items-center sm:justify-between">
            {!approved ? (
              <>
                <p className="text-[0.92rem] text-textsec">Nothing goes out until you approve it. Try it.</p>
                <button type="button" onClick={() => setApproved(true)} className="btn btn-secondary btn-sm shrink-0">
                  <Tick tone="ice" className="h-4 w-4" />
                  Approve all
                </button>
              </>
            ) : (
              <>
                <p data-after className="flex items-center gap-2 text-[0.95rem] text-white">
                  <Tick tone="ice" />
                  Approved. Only now would it go out.
                </p>
                <div data-after className="flex items-center gap-4">
                  <button type="button" onClick={() => setApproved(false)} className="ln text-[0.88rem] text-textsec">
                    Reset
                  </button>
                  <Link ref={next} href="/demo" className="btn btn-primary btn-sm">
                    {demoLabel}
                    <Arrow />
                  </Link>
                </div>
              </>
            )}
          </div>
          <p className="sr-only" aria-live="polite">
            {approved ? "Example morning approved." : ""}
          </p>
        </div>
      </div>
    </section>
  );
}
