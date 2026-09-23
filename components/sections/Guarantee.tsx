"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Segs } from "@/components/Segs";
import { SectionBar } from "@/components/slip/Parts";
import { Stamp } from "@/components/slip/Stamp";
import type { Dictionary } from "@/lib/i18n";
import { pad2 } from "@/lib/slip";

gsap.registerPlugin(ScrollTrigger);

const DAYS = 14;

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
    <section id="guarantee" aria-labelledby="guarantee-title" className="py-20 md:py-28">
      <div className="wrap">
        <SectionBar mark="§ 06" name="Warranty" form="BAI-01 · p.6" />
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
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
            <div className="sheet crops">
              <div className="flex items-baseline justify-between border-b hair px-5 py-3">
                <p className="lbl">Period</p>
                <p className="lbl-ref">{guarantee.big}</p>
              </div>
              <ol className="grid grid-cols-7">
                {Array.from({ length: DAYS }, (_, i) => {
                  const day = i + 1;
                  const lastDay = day === DAYS;
                  return (
                    <li key={day} className="relative aspect-[3/4] border-b border-r hair [&:nth-child(7n)]:border-r-0">
                      <span data-fill aria-hidden="true" className={`absolute inset-0 ${lastDay ? "bg-primary" : "bg-primary/30"}`} />
                      <span className="lbl-ref relative block p-1.5 sm:p-2">{pad2(day)}</span>
                      {day === 1 ? <span className="lbl absolute bottom-1.5 left-1.5 text-[0.55rem] text-white sm:bottom-2 sm:left-2">Kickoff</span> : null}
                      {lastDay ? (
                        <span data-live className="absolute inset-0 grid place-items-center">
                          <Stamp ring="Live · first workflow" center="LIVE" tone="ice" size={64} rotate={-9} />
                        </span>
                      ) : null}
                      <span className="sr-only">{lastDay ? `Day ${day}: live` : `Day ${day}`}</span>
                    </li>
                  );
                })}
              </ol>
              <div className="flex items-center gap-4 px-5 py-4">
                <span className="lbl-ref shrink-0 border border-dashed border-textsec/60 px-1.5 py-0.5">15+</span>
                <p className="entry text-[0.78rem] leading-snug text-textsec">If it is not live by day 14, we keep working at no additional cost until it is.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
