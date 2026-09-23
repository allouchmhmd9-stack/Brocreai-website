"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent as RMouseEvent, type PointerEvent as RPointerEvent } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { Segs } from "@/components/Segs";
import { Arrow, Tick } from "@/components/slip/Parts";
import { Stamp } from "@/components/slip/Stamp";
import type { Dictionary } from "@/lib/i18n";
import { forms } from "@/lib/slip";

gsap.registerPlugin(SplitText, DrawSVGPlugin);

type HeroDict = Dictionary["hero"];

// Example entries: what five of the live agents hand over on an ordinary morning.
// Labelled as an example on the sheet; no counts or clients are claimed.
const EXAMPLE = [
  { no: "L.01", init: "LE", rot: -12, agent: "Lead Engine", entry: "Verified leads, scored out of 100, filed to the pipeline" },
  { no: "L.03", init: "PI", rot: 6, agent: "Pre-Call Intelligence", entry: "Research brief ready before the call" },
  { no: "L.04", init: "SD", rot: -4, agent: "Speed-to-Lead Drafting", entry: "First email drafted, under 150 words" },
  { no: "L.07", init: "IP", rot: 10, agent: "Instant Proposals", entry: "Client-ready proposal drafted" },
  { no: "L.09", init: "MB", rot: -8, agent: "Morning Brief", entry: "Today's brief: leads, signals, approvals" },
];

// The slip's printed particulars: facts about the issuer, all true today.
const PARTICULARS = [
  { label: "Issued by", value: "Brocare Insurance Brokerage, Beirut", wide: true },
  { label: "Territory", value: "Middle East and Africa" },
  { label: "Period", value: "Live within two weeks of kickoff" },
];

export function Hero({ hero, demoLabel }: { hero: HeroDict; demoLabel: string }) {
  const root = useRef<HTMLElement>(null);
  const box = useRef<HTMLButtonElement>(null);
  const ghost = useRef<HTMLSpanElement>(null);
  const placed = useRef<HTMLSpanElement>(null);
  const [date, setDate] = useState("");
  const [stamp, setStamp] = useState<{ x: number; y: number; r: number } | null>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    setDate(new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date()));
  }, []);

  // The load-in: the sheet is printed, the headline set, then each agent writes its line
  // and initials it. The approval box arrives last and waits for the visitor.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = gsap.utils.selector(el);
    if (reduce) {
      gsap.set(q("[data-hero]"), { autoAlpha: 1 });
      return;
    }
    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });
      gsap.set(q("[data-hero]"), { autoAlpha: 1 });
      tl.from(q("[data-h-rule]"), { scaleX: 0, transformOrigin: "left center", duration: 1.2 }, 0);
      tl.from(q("[data-h-strip] > *"), { autoAlpha: 0, y: 8, duration: 0.7, stagger: 0.06 }, 0.15);
      const h1 = SplitText.create(q("h1")[0], { type: "lines", mask: "lines" });
      splits.push(h1);
      tl.from(h1.lines, { yPercent: 110, duration: 1.2, stagger: 0.09 }, 0.2);
      tl.from(q("[data-h-rise]"), { autoAlpha: 0, y: 22, filter: "blur(6px)", duration: 1, stagger: 0.08, clearProps: "filter,transform" }, 0.55);
      tl.from(q("[data-h-tick] path"), { drawSVG: "0%", duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.9);

      q("[data-line]").forEach((row, i) => {
        const at = 0.95 + i * 0.42;
        const entry = row.querySelector("[data-entry]");
        const chars = entry ? SplitText.create(entry, { type: "words,chars" }) : null;
        if (chars) splits.push(chars);
        tl.from(row.querySelector("[data-no]"), { autoAlpha: 0, duration: 0.3 }, at);
        tl.from(row.querySelector("[data-name]"), { autoAlpha: 0, x: -8, duration: 0.5 }, at);
        if (chars) tl.from(chars.chars, { autoAlpha: 0, duration: 0.01, stagger: 0.012, ease: "none" }, at + 0.1);
        const st = row.querySelector("[data-line-stamp]");
        if (st) {
          const rot = Number(gsap.getProperty(st, "rotation")) || 0;
          tl.fromTo(st, { autoAlpha: 0, scale: 2, rotation: rot + 18 }, { autoAlpha: 1, scale: 1, rotation: rot, duration: 0.45, ease: "back.out(2.6)" }, at + 0.34);
        }
        tl.from(row.querySelector("[data-status]"), { autoAlpha: 0, duration: 0.3 }, at + 0.4);
      });
      tl.from(q("[data-approve]"), { autoAlpha: 0, y: 14, duration: 0.8 }, 0.95 + EXAMPLE.length * 0.42);
    }, el);
    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  // The stamp press: drop from above, overshoot, settle, and a small jolt through the box.
  useEffect(() => {
    if (!stamp || !placed.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        placed.current,
        { scale: 2.4, autoAlpha: 0, rotation: stamp.r + 22 },
        { scale: 1, autoAlpha: 1, rotation: stamp.r, duration: 0.42, ease: "back.out(2.8)" },
      );
      gsap.fromTo(box.current, { y: 0 }, { y: 2, duration: 0.06, yoyo: true, repeat: 1, delay: 0.16, ease: "power1.inOut" });
      gsap.fromTo("[data-status-approved]", { autoAlpha: 0, x: -6 }, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.07, delay: 0.3, ease: "expo.out" });
    }, root);
    return () => ctx.revert();
  }, [stamp]);

  const onMove = (e: RPointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse" || !box.current || !ghost.current) return;
    const r = box.current.getBoundingClientRect();
    ghost.current.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px) translate(-50%, -50%) rotate(-10deg)`;
  };

  const approve = (e: RMouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const fromKeyboard = e.detail === 0;
    const x = fromKeyboard ? r.width * 0.72 : e.clientX - r.left;
    const y = fromKeyboard ? r.height / 2 : e.clientY - r.top;
    setStamp({ x: Math.max(48, Math.min(r.width - 48, x)), y: Math.max(40, Math.min(r.height - 40, y)), r: -14 + Math.random() * 16 });
  };

  const approved = Boolean(stamp);

  return (
    <section ref={root} data-self aria-labelledby="hero-title" className="pt-16">
      <div className="wrap pb-14 pt-5 md:pt-8">
        <div data-hero className="sheet crops">
          {/* Printed header strip */}
          <div data-h-strip className="grid grid-cols-2 items-center gap-x-6 gap-y-1 px-4 py-2.5 sm:grid-cols-3 sm:px-6">
            <p className="lbl-ref">
              Form {forms.home.code} · {forms.home.title}
            </p>
            <p className="lbl hidden text-center sm:block">Brocare AI</p>
            <p className="lbl-ref text-right">
              Date <span className="entry ml-1 text-white">{date || " "}</span>
            </p>
          </div>
          <div data-h-rule className="h-px bg-cardborder" />

          <div className="grid lg:grid-cols-12">
            {/* Insured: the headline, the description, the action */}
            <div className="flex flex-col px-5 pb-8 pt-6 sm:px-8 md:pb-10 md:pt-8 lg:col-span-7 lg:border-r lg:hair xl:px-10">
              <p className="lbl">Insured</p>
              <h1 id="hero-title" className="display mt-3 text-[clamp(2.7rem,6.1vw,5.9rem)]">
                <Segs segs={hero.title} />
              </h1>
              <div data-h-rise className="mt-7 border-t hair pt-3 md:mt-9">
                <p className="lbl">Description</p>
                <p className="lead mt-2">{hero.sub}</p>
              </div>
              <div data-h-rise className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/demo" className="btn btn-primary">
                  {demoLabel}
                  <Arrow />
                </Link>
                <Link href="/agents" className="btn btn-secondary">
                  {hero.secondary}
                </Link>
              </div>
              <ul data-h-rise className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-3">
                {hero.chips.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-white">
                    <span data-h-tick>
                      <Tick />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
              <dl data-h-rise className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t hair pt-4 lg:mt-auto lg:grid-cols-3">
                {PARTICULARS.map((p) => (
                  <div key={p.label} className={p.wide ? "col-span-2 lg:col-span-1" : ""}>
                    <dt className="lbl">{p.label}</dt>
                    <dd className="entry mt-1.5 text-[0.76rem] leading-snug text-white">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Lines: each agent writes and initials its own */}
            <div className="flex flex-col border-t hair lg:col-span-5 lg:border-t-0">
              <div className="flex items-baseline justify-between gap-4 px-5 pt-5 sm:px-8 md:pt-8 xl:px-10">
                <p className="lbl">Lines written this morning</p>
                <p className="lbl-ref border border-cardborder px-1.5 py-0.5">Example</p>
              </div>
              <ol className="mt-3 px-5 sm:px-8 xl:px-10">
                {EXAMPLE.map((l) => (
                  <li key={l.no} data-line className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 border-b hair py-3.5 last:border-b-0">
                    <span data-no className="lbl-ref self-start pt-0.5">
                      {l.no}
                    </span>
                    <span className="min-w-0">
                      <span data-name className="block text-[0.95rem] font-semibold leading-tight text-white">
                        {l.agent}
                      </span>
                      <span data-entry className="entry mt-1 block text-[0.74rem] leading-snug text-textsec">
                        {l.entry}
                      </span>
                      <span data-status className="lbl mt-1.5 block text-[0.62rem]">
                        {approved ? (
                          <span data-status-approved className="text-ice">
                            Approved
                          </span>
                        ) : (
                          "Awaiting your approval"
                        )}
                      </span>
                    </span>
                    <Stamp data-line-stamp="" ring={`${l.agent} · prepared`} center={l.init} size={58} rotate={l.rot} />
                  </li>
                ))}
              </ol>

              {/* The sign-off. Nothing leaves until someone stamps it. */}
              <div data-approve className="mt-auto border-t hair px-5 pb-6 pt-4 sm:px-8 xl:px-10">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="lbl">Approved by</p>
                  {approved ? (
                    <button type="button" onClick={() => setStamp(null)} className="lbl ln">
                      Reset
                    </button>
                  ) : null}
                </div>
                <button
                  ref={box}
                  type="button"
                  aria-pressed={approved}
                  aria-label="Approve the example schedule"
                  onPointerMove={onMove}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
                  onPointerLeave={() => setHovering(false)}
                  onClick={approve}
                  className={`relative mt-2 block h-[6.5rem] w-full overflow-hidden border border-dashed text-left transition-colors ${
                    approved ? "cursor-default border-ice/60" : "cursor-none border-accent/70 hover:bg-card/60"
                  }`}
                >
                  <span
                    className={`entry absolute left-4 top-[42%] max-w-[56%] -translate-y-1/2 text-[0.78rem] leading-snug ${approved ? "text-white" : "text-textsec"}`}
                  >
                    {approved ? "Approved. Only now would any of it go out." : "Nothing goes out until you stamp it. Try it."}
                  </span>
                  <span className="absolute bottom-3 left-4 right-4 h-px bg-cardborder" aria-hidden="true" />
                  {!approved ? (
                    <span
                      ref={ghost}
                      aria-hidden="true"
                      className={`pointer-events-none absolute left-0 top-0 transition-opacity duration-200 ${hovering ? "opacity-60" : "opacity-0"}`}
                    >
                      <Stamp ring="Approved · Brocare AI" center="OK" tone="ice" size={84} rotate={0} />
                    </span>
                  ) : null}
                  {stamp ? (
                    <span
                      ref={placed}
                      aria-hidden="true"
                      className="pointer-events-none absolute"
                      style={{ left: stamp.x - 44, top: stamp.y - 44, transform: `rotate(${stamp.r}deg)` }}
                    >
                      <Stamp ring="Approved · Brocare AI" center="OK" tone="ice" size={88} rotate={0} />
                    </span>
                  ) : null}
                </button>
                <p className="sr-only" aria-live="polite">
                  {approved ? "Example schedule approved." : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
