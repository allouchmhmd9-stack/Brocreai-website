"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FocusEvent, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/components/motion/Choreographer";
import { Arrow } from "@/components/slip/Parts";
import { LineCard } from "@/components/slip/LineCard";
import type { Agent } from "@/lib/content/agents";

gsap.registerPlugin(ScrollTrigger);

/**
 * The roster as a strip of line slips. On wide screens with motion allowed the section pins
 * and the strip travels sideways as you scroll down; everywhere else it is a native,
 * snap-scrolling rail with arrow buttons. A printed scale under it shows where you are.
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
  const root = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [pinned, setPinned] = useState(false);

  const setProgress = (p: number) => {
    if (marker.current) marker.current.style.transform = `translateX(${p * 100}%)`;
  };

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (min-height: 720px)", () => {
      const vp = viewport.current;
      const tr = track.current;
      if (!vp || !tr || !root.current) return;
      setPinned(true);
      const distance = () => Math.max(0, tr.scrollWidth - vp.clientWidth);
      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 64px",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
      trigger.current = tween.scrollTrigger ?? null;
      return () => {
        setPinned(false);
        trigger.current = null;
      };
    });
    return () => mm.revert();
  }, []);

  // Native rail: the scale follows the scroll position.
  useEffect(() => {
    const vp = viewport.current;
    if (!vp || pinned) return;
    const onScroll = () => {
      const max = vp.scrollWidth - vp.clientWidth;
      setProgress(max > 0 ? vp.scrollLeft / max : 0);
    };
    onScroll();
    vp.addEventListener("scroll", onScroll, { passive: true });
    return () => vp.removeEventListener("scroll", onScroll);
  }, [pinned]);

  // Keyboard users tabbing through a pinned strip: scroll the page so the focused card is in view.
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    const st = trigger.current;
    const vp = viewport.current;
    const tr = track.current;
    if (!pinned || !st || !vp || !tr) return;
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
    if (!card) return;
    const distance = Math.max(1, tr.scrollWidth - vp.clientWidth);
    const x = Math.min(distance, Math.max(0, card.offsetLeft - 24));
    const y = st.start + (x / distance) * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { immediate: true });
    else window.scrollTo({ top: y });
  };

  const step = (dir: 1 | -1) => viewport.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <div ref={root} className={pinned ? "flex min-h-[calc(100svh-64px)] flex-col justify-center py-10" : ""}>
      <div className="wrap">{head}</div>

      <div ref={viewport} onFocus={onFocus} className={`mt-10 ${pinned ? "overflow-hidden" : "rail snap-x snap-mandatory overflow-x-auto"}`}>
        <div ref={track} className="flex w-max gap-5 px-5 pb-6 pt-12 sm:px-8 lg:px-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))]">
          {agents.map((a) => (
            <div key={a.slug} data-card className="snap-start">
              <LineCard agent={a} href={`/agents#${a.slug}`} />
            </div>
          ))}
          <div data-card className="snap-start">
            <Link
              href="/agents"
              className="group flex h-full w-[17.5rem] flex-col justify-between border border-primary bg-primary p-6 text-white transition-colors duration-300 hover:bg-accent sm:w-[18.5rem]"
            >
              <span className="lbl text-white/80">End of strip</span>
              <span>
                <span className="block text-[1.9rem] font-bold leading-[1.05] tracking-[-0.03em]">{allLabel}</span>
                <span className="mt-3 block text-[0.92rem] leading-snug text-white/85">{allNote}</span>
                <Arrow className="mt-6 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap mt-4 flex items-center gap-6">
        <div className="relative h-4 flex-1" aria-hidden="true">
          <div className="absolute inset-x-0 top-1/2 h-px bg-cardborder" />
          <div className="absolute inset-0 flex justify-between">
            {Array.from({ length: agents.length + 1 }, (_, i) => (
              <span key={i} className={`w-px bg-cardborder ${i % 5 === 0 ? "h-4" : "mt-1 h-2"}`} />
            ))}
          </div>
          <span ref={marker} className="absolute inset-0 block">
            <span className="absolute -left-px top-0 block h-4 w-[3px] bg-accent" />
          </span>
        </div>
        {!pinned ? (
          <div className="flex gap-2">
            <button type="button" onClick={() => step(-1)} aria-label={prevLabel} className="grid h-11 w-11 place-items-center border hair text-textsec transition hover:border-accent hover:text-white">
              <Arrow className="h-4 w-4 rotate-180" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label={nextLabel} className="grid h-11 w-11 place-items-center border hair text-textsec transition hover:border-accent hover:text-white">
              <Arrow className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
