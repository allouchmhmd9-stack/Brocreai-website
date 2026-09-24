"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

// One place orchestrates the page's motion, kept calm on purpose:
//   rule   thin rules draw left to right
//   lines  headings rise line by line out of their own baseline
//   rise   blocks fade up a short way
//   [data-draw]   ticks draw once
//   [data-scrub-x] a connector fills with the scroll
// Anything inside [data-self] runs its own timeline and is skipped here.

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

const EASE = "expo.out";

export function Choreographer() {
  const pathname = usePathname();

  useEffect(() => {
    (window as unknown as { __choreo?: boolean }).__choreo = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;
    lenis = new Lenis({ lerp: 0.11, anchors: { offset: -96 }, autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Keep Lenis in step with the router: new page starts at the top, or at its anchor.
    if (lenis) {
      const hash = window.location.hash;
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      lenis.scrollTo(target ?? 0, { immediate: true, force: true, offset: target ? -96 : 0 });
    }

    if (reduce) {
      root.classList.add("motion-done");
      return;
    }

    const own = (el: Element) => !el.closest("[data-self]");
    const all = (sel: string) => gsap.utils.toArray<HTMLElement>(sel).filter(own);
    const splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      all('[data-anim="rule"]').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.3, ease: EASE, scrollTrigger: { trigger: el, start: "top 94%", once: true } },
        );
      });

      all('[data-anim="lines"]').forEach((el) => {
        gsap.set(el, { autoAlpha: 1 });
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 108,
              duration: 1.15,
              ease: EASE,
              stagger: 0.085,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            }),
        });
        splits.push(split);
      });

      const rise = all('[data-anim="rise"]');
      if (rise.length) gsap.set(rise, { autoAlpha: 0, y: 18 });
      if (rise.length) ScrollTrigger.batch(rise, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: EASE,
            stagger: 0.07,
            clearProps: "transform",
          }),
      });

      all("[data-draw]").forEach((el) => {
        gsap.from(el, {
          drawSVG: "0%",
          duration: 0.7,
          ease: "power2.out",
          delay: Number((el as HTMLElement).dataset.delay ?? 0.15),
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
        });
      });

      all("[data-scrub-x]").forEach((el) => {
        const trigger = el.closest("[data-scrub-root]") ?? el;
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger, start: "top 72%", end: "bottom 60%", scrub: 0.6 } });
      });

    });

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
