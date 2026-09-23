"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Segs } from "@/components/Segs";
import { Sheet } from "@/components/slip/Parts";
import { Stamp } from "@/components/slip/Stamp";
import type { Dictionary } from "@/lib/i18n";
import { pad2 } from "@/lib/slip";

gsap.registerPlugin(ScrollTrigger);

const DAYS = 14;

// An example of how the fortnight usually runs, labelled as such on the sheet. The guarantee
// itself is the commitment; the day-by-day steps are illustrative.
const ENTRIES: Record<number, string> = {
  1: "Kickoff",
  2: "Access given",
  3: "Scope chosen",
  5: "Agents connected",
  8: "First drafts to you",
  10: "Your review",
  12: "Tuned to you",
};

// Warranty: the real commitment, printed as a period of cover. Fourteen days fill as you
// scroll, day fourteen is stamped live, and the clause after it is the free extension.
export function Guarantee({ guarantee }: { guarantee: Dictionary["guarantee"] }) {
  const cal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cal.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const fills = gsap.utils.toArray<HTMLElement>("[data-fill]");
      gsap.set(fills, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.to(fills, {
        scaleY: 1,
        ease: "none",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 50%", scrub: 0.5 },
      });
      const stamp = el.querySelector("[data-live]");
      if (stamp) {
        gsap.fromTo(
          stamp,
          { autoAlpha: 0, scale: 2, rotation: 20 },
          {
            autoAlpha: 1,
            scale: 1,
            rotation: -9,
            duration: 0.5,
            ease: "back.out(2.6)",
            scrollTrigger: { trigger: el, start: "bottom 52%", toggleActions: "play none none reverse" },
          },
        );
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="guarantee" aria-labelledby="guarantee-title" className="py-6 md:py-8">
      <div className="wrap">
        <Sheet>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <h2 id="guarantee-title" data-anim="lines" className="h2">
              <Segs segs={guarantee.title} />
            </h2>
            <p data-anim="rise" className="lead mt-6">
              {guarantee.body}
            </p>
            <div data-anim="rise" className="mt-8 border-t hair pt-3">
              <p className="lbl">Definition</p>
              <p className="entry mt-2 max-w-[56ch] text-[0.8rem] leading-relaxed text-textsec">{guarantee.definition}</p>
            </div>
          </div>

          <div ref={cal} className="lg:col-span-6">
            <div className="rounded-3xl bg-deep/50 p-3 ring-1 ring-inset ring-cardborder/40 sm:p-4">
              <div className="flex items-baseline justify-between px-2 pb-3 pt-1">
                <p className="lbl">Period · example timeline</p>
                <p className="lbl-ref">{guarantee.big}</p>
              </div>
              <ol className="grid grid-cols-[repeat(7,minmax(0,1fr))] gap-1.5 sm:gap-2">
                {Array.from({ length: DAYS }, (_, i) => {
                  const day = i + 1;
                  const lastDay = day === DAYS;
                  return (
                    <li key={day} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-card/60 sm:rounded-xl">
                      <span data-fill aria-hidden="true" className={`absolute inset-0 ${lastDay ? "bg-primary" : "bg-primary/30"}`} />
                      <span className="lbl-ref relative z-10 block p-1.5 sm:p-2">{pad2(day)}</span>
                      {ENTRIES[day] ? (
                        <span className={`entry absolute inset-x-1.5 bottom-1.5 text-[0.5rem] leading-tight text-white sm:inset-x-2 sm:bottom-2 sm:text-[0.56rem] ${day === 1 ? "" : "hidden sm:block"}`}>
                          {ENTRIES[day]}
                        </span>
                      ) : null}
                      {lastDay ? (
                        <span data-live className="absolute inset-0 grid items-end justify-items-center pb-1 sm:place-items-center sm:pb-0">
                          {/* Scaled down on phones so the stamp stays inside its day cell */}
                          <span className="block h-[38px] w-[38px] sm:h-16 sm:w-16"><span className="block origin-top-left scale-[0.6] sm:scale-100">
                            <Stamp ring="Live · first workflow" center="LIVE" tone="ice" size={64} rotate={-9} />
                          </span></span>
                        </span>
                      ) : null}
                      <span className="sr-only">{lastDay ? `Day ${day}: live` : ENTRIES[day] ? `Day ${day}: ${ENTRIES[day]}` : `Day ${day}`}</span>
                    </li>
                  );
                })}
              </ol>
              <div className="flex items-center gap-4 px-2 pb-1 pt-4">
                <span className="lbl-ref pill shrink-0">15+</span>
                <p className="entry text-[0.78rem] leading-snug text-textsec">If it is not live by day 14, we keep working at no additional cost until it is.</p>
              </div>
            </div>
          </div>
        </div>
        </Sheet>
      </div>
    </section>
  );
}
