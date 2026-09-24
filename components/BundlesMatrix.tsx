"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Plus } from "lucide-react";
import { Arrow } from "@/components/slip/Parts";
import { agents } from "@/lib/content/agents";
import { bundleStatusLabel, type Bundle } from "@/lib/content/bundles";
import { cn } from "@/lib/utils";

/**
 * Pick a bundle on the left; its agents light up among all the agents. Tap any other agent
 * to add it: the rule "any agent can be added to any bundle", shown instead of told.
 * Additions are only for this page and reset per bundle.
 */
export function BundlesMatrix({ bundles, seeLabel, rule }: { bundles: Bundle[]; seeLabel: string; rule: string }) {
  const [active, setActive] = useState(0);
  const [added, setAdded] = useState<Record<string, string[]>>({});
  const [announce, setAnnounce] = useState("");
  const grid = useRef<HTMLUListElement>(null);
  const lastAdded = useRef<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  // On narrow screens the schedule sits below the list: bring it into view when a bundle is picked.
  const choose = (i: number) => {
    setActive(i);
    if (window.innerWidth < 1024) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => panel.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }));
    }
  };
  const b = bundles[active];
  const extra = useMemo(() => added[b.slug] ?? [], [added, b.slug]);
  const inBundle = new Set(b.agents);
  const count = b.agents.length + extra.length;

  // Fade in the bundle's own agents each time the bundle changes.
  useEffect(() => {
    if (!grid.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = grid.current.querySelectorAll("[data-in='true'] [data-ink]");
    if (!targets.length) return;
    const tween = gsap.fromTo(targets, { autoAlpha: 0.3 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out", stagger: 0.025 });
    return () => {
      tween.kill();
      gsap.set(targets, { clearProps: "all" });
    };
  }, [active]);

  // Settle the agent that was just added.
  useEffect(() => {
    const slug = lastAdded.current;
    if (!slug || !grid.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = grid.current.querySelector(`[data-slug="${slug}"] [data-ink]`);
    if (el) gsap.fromTo(el, { scale: 0.92 }, { scale: 1, duration: 0.4, ease: "expo.out" });
    lastAdded.current = null;
  }, [extra]);

  const toggle = (slug: string, name: string) => {
    if (inBundle.has(slug)) return;
    const has = extra.includes(slug);
    const next = has ? extra.filter((s) => s !== slug) : [...extra, slug];
    if (!has) lastAdded.current = slug;
    setAdded((prev) => ({ ...prev, [b.slug]: next }));
    setAnnounce(has ? `${name} removed from ${b.name}.` : `${name} added to ${b.name}.`);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* The index of bundles */}
      <div className="lg:col-span-5">
        <ul aria-label="Choose a bundle" className="space-y-1.5">
          {bundles.map((x, i) => {
            const on = i === active;
            return (
              <li key={x.slug}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(i)}
                  className={cn(
                    "group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-3 rounded-2xl px-5 py-3.5 text-left transition-colors",
                    on ? "bg-card/80 text-white ring-1 ring-inset ring-accent/40" : "text-textsec hover:bg-card/40 hover:text-white",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block font-display text-[1.05rem] font-semibold leading-tight">{x.name}</span>
                    <span className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <span className="overflow-hidden">
                        <span className="mt-2 block text-[0.92rem] leading-relaxed text-textsec">{x.short}</span>
                      </span>
                    </span>
                  </span>
                  <span className={cn("text-[0.76rem] font-medium", x.status === "live" ? "text-ice" : "text-textsec")}>{bundleStatusLabel[x.status]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The schedule for the chosen bundle */}
      <div ref={panel} className="scroll-mt-20 lg:col-span-7">
        <div className="glass">
          <div className="px-5 pb-6 pt-6 sm:px-7 sm:pt-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="font-display text-[1.45rem] font-bold leading-tight text-white">{b.name}</p>
              <p className="text-[0.85rem] text-textsec">
                {count} of {agents.length} agents
              </p>
            </div>
            <p className="mt-1.5 text-textsec">{b.tagline}</p>
            {b.statusNote ? <p className="mt-3 text-[0.85rem] text-textsec">{b.statusNote}</p> : null}

            <ul ref={grid} className="mt-6 flex flex-wrap gap-2">
              {agents.map((a) => {
                const own = inBundle.has(a.slug);
                const plus = extra.includes(a.slug);
                return (
                  <li key={a.slug} data-slug={a.slug} data-in={own ? "true" : "false"}>
                    <button
                      type="button"
                      onClick={() => toggle(a.slug, a.name)}
                      aria-pressed={own || plus}
                      aria-disabled={own}
                      aria-label={own ? `${a.name}, part of ${b.name}` : plus ? `Remove ${a.name} from ${b.name}` : `Add ${a.name} to ${b.name}`}
                      title={a.name}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.84rem] transition-colors",
                        own
                          ? "cursor-default bg-primary/30 text-white ring-1 ring-inset ring-accent/50"
                          : plus
                            ? "bg-ice/15 text-white ring-1 ring-inset ring-ice/50"
                            : "text-textsec ring-1 ring-inset ring-cardborder/70 hover:text-white hover:ring-accent/60",
                      )}
                    >
                      <span data-ink>{a.name}</span>
                      {plus ? <span className="text-[0.72rem] text-ice">Added</span> : null}
                      {!own && !plus ? (
                        <Plus aria-hidden="true" className="h-3.5 w-3.5 text-textsec/70" strokeWidth={2} />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="sr-only" aria-live="polite">
              {announce}
            </p>
          </div>
          <div className="flex flex-col gap-4 px-5 pb-6 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="flex items-start gap-3 text-[0.92rem] leading-snug text-white">
              <span className="mt-0.5 shrink-0 rounded-full bg-accent/15 px-2.5 py-0.5 text-[0.76rem] font-medium text-ice">Any agent</span>
              {rule}
            </p>
            <Link href={`/bundles#${b.slug}`} className="btn btn-secondary btn-sm shrink-0">
              {seeLabel}
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
