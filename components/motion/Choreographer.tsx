"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { hashTarget } from "@/lib/hash";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

// One place orchestrates the page's motion grammar, so every section speaks it the same way:
//   rule   printed rules draw left to right
//   lines  headings rise line by line out of their own baseline
//   rise   blocks settle into place, sharpening from a slight blur
//   type   short entries type themselves in
//   stamp  stamps drop and press with weight
//   [data-draw]        ticks and small strokes draw once
//   [data-scrub-draw]  long strokes (connectors, the signature) draw with the scroll
// Anything inside [data-self] runs its own timeline (the hero) and is skipped here.

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
      const target = hashTarget(window.location.hash, document);
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
      if (rise.length) gsap.set(rise, { autoAlpha: 0, y: 26, filter: "blur(6px)" });
      if (rise.length) ScrollTrigger.batch(rise, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: EASE,
            stagger: 0.08,
            clearProps: "filter,transform",
          }),
      });

      all('[data-anim="type"]').forEach((el) => {
        const split = SplitText.create(el, { type: "chars" });
        splits.push(split);
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(split.chars, {
          autoAlpha: 0,
          duration: 0.01,
          stagger: 0.02,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      all('[data-anim="stamp"]').forEach((el) => {
        const rot = Number(gsap.getProperty(el, "rotation")) || 0;
        gsap.fromTo(
          el,
          { autoAlpha: 0, scale: 1.9, rotation: rot + 16 },
          {
            autoAlpha: 1,
            scale: 1,
            rotation: rot,
            duration: 0.55,
            ease: "back.out(2.4)",
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
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

      // Seals turn slowly as the page passes them.
      all("[data-spin]").forEach((el) => {
        gsap.fromTo(el, { rotation: -18 }, { rotation: 24, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 } });
      });

      all("[data-scrub-x]").forEach((el) => {
        const trigger = el.closest("[data-scrub-root]") ?? el;
        gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger, start: "top 72%", end: "bottom 60%", scrub: 0.6 } });
      });

      all("[data-scrub-draw]").forEach((el) => {
        const trigger = el.closest("[data-scrub-root]") ?? el;
        gsap.from(el, {
          drawSVG: "0%",
          ease: "none",
          scrollTrigger: { trigger, start: "top 72%", end: "bottom 55%", scrub: 0.6 },
        });
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
