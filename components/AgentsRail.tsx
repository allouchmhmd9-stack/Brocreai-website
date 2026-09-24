"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { Arrow } from "@/components/slip/Parts";
import { LineCard } from "@/components/slip/LineCard";
import type { Agent } from "@/lib/content/agents";

/**
 * The roster as a horizontal strip of agent cards. The page never gets taken over: the
 * wheel only moves the strip while the pointer is over the cards, and once the strip hits
 * either end the wheel goes back to scrolling the page. Trackpads, touch and the arrow
 * buttons all work natively, and a scale under the strip shows where you are.
 */
export function AgentsRail({
  agents,
  head,
  prevLabel,
  nextLabel,
  allLabel,
  allNote,
}: {
  agents: Agent[];
  head: ReactNode;
  prevLabel: string;
  nextLabel: string;
  allLabel: string;
  allNote: string;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);

  // Scale follows the strip's position.
  useEffect(() => {
    const vp = viewport.current;
    if (!vp) return;
    const onScroll = () => {
      const max = vp.scrollWidth - vp.clientWidth;
      // The thumb is 16% of the track, so it travels 525% of its own width end to end.
      if (marker.current) marker.current.style.transform = `translateX(${max > 0 ? (vp.scrollLeft / max) * 525 : 0}%)`;
    };
    onScroll();
    vp.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      vp.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Vertical wheel over the cards scrolls the strip sideways, eased, until an end is reached.
  useEffect(() => {
    const vp = viewport.current;
    if (!vp) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let target = vp.scrollLeft;
    let raf = 0;
    // When the page is already scrolling, the strip slides under a still pointer. Don't catch
    // that: the visitor is heading down the page. The strip only takes the wheel once the page
    // has come to rest with the pointer on the cards.
    let lastPageScroll = 0;
    const onPageScroll = () => {
      lastPageScroll = performance.now();
    };
    window.addEventListener("scroll", onPageScroll, { passive: true });
    const glide = () => {
      const next = vp.scrollLeft + (target - vp.scrollLeft) * 0.2;
      if (Math.abs(target - next) < 0.6) {
        vp.scrollLeft = target;
        raf = 0;
        return;
      }
      vp.scrollLeft = next;
      raf = requestAnimationFrame(glide);
    };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      // A sideways trackpad gesture already scrolls the strip natively; keep it away from the
      // page's smooth-scroll handler and let it through.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.stopPropagation();
        return;
      }
      if (!raf && performance.now() - lastPageScroll < 380) return;
      const max = vp.scrollWidth - vp.clientWidth;
      const from = raf ? target : vp.scrollLeft;
      const delta = e.deltaMode === 1 ? e.deltaY * 40 : e.deltaMode === 2 ? e.deltaY * vp.clientWidth : e.deltaY;
      if ((delta < 0 && from <= 0.5) || (delta > 0 && from >= max - 0.5)) return; // at an end: the page scrolls
      e.preventDefault();
      e.stopPropagation();
      target = Math.max(0, Math.min(max, from + delta));
      if (reduce) {
        vp.scrollLeft = target;
        return;
      }
      if (!raf) raf = requestAnimationFrame(glide);
    };
    vp.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      vp.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onPageScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const step = (dir: 1 | -1) => viewport.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <div>
      <div className="wrap">{head}</div>

      <div
        ref={viewport}
        className="rail coarse-snap mt-10 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_2.5rem,black_calc(100%-2.5rem),transparent)]"
      >
        <div className="flex w-max gap-5 px-5 pb-8 pt-4 sm:px-8 lg:px-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))]">
          {agents.map((a) => (
            <div key={a.slug} className="snap-start">
              <LineCard agent={a} href={`/agents#${a.slug}`} />
            </div>
          ))}
          <div className="snap-start">
            <Link
              href="/agents"
              className="group flex h-full w-[17rem] flex-col justify-between rounded-[28px] bg-gradient-to-br from-primary via-accent to-gradientblue p-7 text-white shadow-glow transition-transform duration-500 ease-out hover:-translate-y-1 sm:w-[18rem]"
            >
              <Arrow className="h-6 w-6 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
              <span>
                <span className="block font-display text-[1.7rem] font-bold leading-[1.1]">{allLabel}</span>
                <span className="mt-3 block text-[0.92rem] leading-snug text-white/85">{allNote}</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap mt-3 flex items-center gap-6">
        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-cardborder/40" aria-hidden="true">
          <span ref={marker} className="absolute inset-y-0 left-0 block w-[16%] rounded-full bg-accent" />
        </div>
        <p className="hidden text-[0.82rem] text-textsec [@media(pointer:fine)]:block">Scroll over the cards to browse</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} aria-label={prevLabel} className="grid h-11 w-11 place-items-center rounded-full bg-card/70 text-textsec ring-1 ring-cardborder/60 transition hover:text-white hover:ring-accent">
            <Arrow className="h-4 w-4 rotate-180" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label={nextLabel} className="grid h-11 w-11 place-items-center rounded-full bg-card/70 text-textsec ring-1 ring-cardborder/60 transition hover:text-white hover:ring-accent">
            <Arrow className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
