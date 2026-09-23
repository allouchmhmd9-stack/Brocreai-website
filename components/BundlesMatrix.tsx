"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { Arrow } from "@/components/slip/Parts";
import { Stamp } from "@/components/slip/Stamp";
import { agents } from "@/lib/content/agents";
import { bundleStatusLabel, type Bundle } from "@/lib/content/bundles";
import { initials, pad2 } from "@/lib/slip";
import { cn } from "@/lib/utils";

/**
 * Pick a bundle on the left; its agents ink in on the grid of all agents. Tap any other
 * agent to stamp it into the bundle: the rule "any agent can be added to any bundle",
 * shown instead of told. Additions are only for this page and reset per bundle.
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

  // Ink in the bundle's own stamps each time the bundle changes.
  useEffect(() => {
    if (!grid.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = grid.current.querySelectorAll("[data-in='true'] [data-ink]");
    if (!targets.length) return;
    const tween = gsap.fromTo(targets, { scale: 1.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(2.4)", stagger: 0.035 });
    return () => {
      tween.kill();
      gsap.set(targets, { clearProps: "all" });
    };
  }, [active]);

  // Press the stamp that was just added.
  useEffect(() => {
    const slug = lastAdded.current;
    if (!slug || !grid.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = grid.current.querySelector(`[data-slug="${slug}"] [data-ink]`);
    if (el) gsap.fromTo(el, { scale: 1.9, autoAlpha: 0, rotation: 20 }, { scale: 1, autoAlpha: 1, rotation: 0, duration: 0.45, ease: "back.out(2.8)" });
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
                    "group grid w-full grid-cols-[2.2rem_1fr_auto] items-baseline gap-x-3 rounded-2xl px-4 py-3.5 text-left transition-colors",
                    on ? "bg-card/80 text-white ring-1 ring-inset ring-accent/40" : "text-textsec hover:bg-card/40 hover:text-white",
                  )}
                >
                  <span className={cn("lbl-ref transition-colors", on && "text-accent")}>{String.fromCharCode(65 + i)}.</span>
                  <span className="min-w-0">
                    <span className="block text-[1.08rem] font-semibold leading-tight">{x.name}</span>
                    <span className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <span className="overflow-hidden">
                        <span className="mt-2 block text-[0.92rem] leading-relaxed text-textsec">{x.short}</span>
                      </span>
                    </span>
                  </span>
                  <span className={cn("lbl text-[0.6rem]", x.status === "live" ? "text-ice" : "text-textsec")}>{bundleStatusLabel[x.status]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* The schedule for the chosen bundle */}
      <div ref={panel} className="scroll-mt-20 lg:col-span-7">
        <div className="sheet">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-5 pt-5 sm:px-7 sm:pt-6">
            <p className="lbl">
              Schedule <span className="lbl-ref ml-2 text-white">{String.fromCharCode(65 + active)}</span>
            </p>
            <p className="lbl-ref">
              {pad2(count)} of {pad2(agents.length)} agents
            </p>
          </div>
          <div className="px-5 pb-6 pt-5 sm:px-7">
            <p className="text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-white">{b.name}</p>
            <p className="mt-1.5 text-textsec">{b.tagline}</p>
            {b.statusNote ? <p className="entry mt-3 text-[0.75rem] text-textsec">{b.statusNote}</p> : null}

            <ul ref={grid} className="mt-6 grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-6">
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
                      className={cn("group flex w-full flex-col items-center gap-1.5 text-center", own ? "cursor-default" : "cursor-pointer")}
                    >
                      <span className="relative grid h-[3.6rem] w-[3.6rem] place-items-center">
                        <Stamp ring={a.name} center={initials(a.name)} tone="ghost" size={58} rotate={0} ink={false} className="absolute inset-0" />
                        {own || plus ? (
                          <span data-ink className="absolute inset-0">
                            <Stamp ring={a.name} center={initials(a.name)} tone={plus ? "white" : "blue"} size={58} rotate={own ? -8 : 10} />
                          </span>
                        ) : null}
                      </span>
                      <span className={cn("line-clamp-2 text-[0.68rem] leading-tight transition-colors", own || plus ? "text-white" : "text-textsec group-hover:text-white")}>
                        {a.name}
                      </span>
                      {plus ? <span className="lbl text-[0.55rem] text-white">Added</span> : null}
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
              <span className="lbl-ref pill mt-0.5 shrink-0 text-accent">Any agent</span>
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
