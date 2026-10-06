"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent as RMouseEvent, type PointerEvent as RPointerEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Segs } from "@/components/Segs";
import { Arrow } from "@/components/slip/Parts";
import { Stamp } from "@/components/slip/Stamp";
import type { Dictionary } from "@/lib/i18n";
import { forms } from "@/lib/slip";

gsap.registerPlugin(SplitText, ScrollTrigger);

// Example entries: what five of the live agents hand over on an ordinary morning.
// Labelled as an example on the sheet; no counts or clients are claimed.
const EXAMPLE = [
  { no: "L.01", init: "LE", rot: -12, agent: "Lead Engine", entry: "Verified leads, scored out of 100, filed to the pipeline" },
  { no: "L.03", init: "PI", rot: 6, agent: "Pre-Call Intelligence", entry: "Research brief ready before the call" },
  { no: "L.04", init: "SD", rot: -4, agent: "Speed-to-Lead Drafting", entry: "First email drafted, under 150 words" },
  { no: "L.07", init: "IP", rot: 10, agent: "Instant Proposals", entry: "Client-ready proposal drafted" },
  { no: "L.09", init: "MB", rot: -8, agent: "Morning Brief", entry: "Today's brief: leads, signals, approvals" },
];

// Facts about the issuer, all true today.
const PARTICULARS = [
  { label: "Issued by", value: "Brocare Insurance Brokerage, Beirut" },
  { label: "Territory", value: "Middle East and Africa" },
  { label: "Period", value: "Live within two weeks of kickoff" },
];

/**
 * One morning's work, as an example schedule. When it scrolls into view each agent writes
 * its line and initials it; the visitor stamps the approval box and every line turns
 * approved, which is the product's whole promise in one gesture.
 */
export function ExampleSchedule({ t, demoLabel }: { t: Dictionary["schedule"]; demoLabel: string }) {
  const root = useRef<HTMLElement>(null);
  const box = useRef<HTMLButtonElement>(null);
  const signed = useRef<HTMLDivElement>(null);
  const ghost = useRef<HTMLSpanElement>(null);
  const placed = useRef<HTMLSpanElement>(null);
  const [date, setDate] = useState("");
  const [stamp, setStamp] = useState<{ x: number; y: number; r: number } | null>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    setDate(new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date()));
  }, []);

  // The write-in, played once when the sheet scrolls into view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(q("[data-hero]"), { autoAlpha: 1 });
      return;
    }
    const splits: SplitText[] = [];
    const ctx = gsap.context(() => {
      gsap.set(q("[data-hero]"), { autoAlpha: 1 });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: el, start: "top 72%", once: true } });
      const h2 = SplitText.create(q("h2")[0], { type: "lines", mask: "lines" });
      splits.push(h2);
      tl.from(h2.lines, { yPercent: 110, duration: 1.1, stagger: 0.08 }, 0);
      tl.from(q("[data-s-rise]"), { autoAlpha: 0, y: 22, filter: "blur(6px)", duration: 1, stagger: 0.08, clearProps: "filter,transform" }, 0.25);
      tl.from(q("[data-sheet]"), { autoAlpha: 0, y: 30, duration: 1 }, 0.15);
      q("[data-line]").forEach((row, i) => {
        const at = 0.55 + i * 0.4;
        const entry = row.querySelector("[data-entry]");
        const chars = entry ? SplitText.create(entry, { type: "words,chars" }) : null;
        if (chars) splits.push(chars);
        tl.from(row.querySelector("[data-name]"), { autoAlpha: 0, x: -8, duration: 0.5 }, at);
        if (chars) tl.from(chars.chars, { autoAlpha: 0, duration: 0.01, stagger: 0.012, ease: "none" }, at + 0.1);
        const st = row.querySelector("[data-line-stamp]");
        if (st) {
          const rot = Number(gsap.getProperty(st, "rotation")) || 0;
          tl.fromTo(st, { autoAlpha: 0, scale: 2, rotation: rot + 18 }, { autoAlpha: 1, scale: 1, rotation: rot, duration: 0.45, ease: "back.out(2.6)" }, at + 0.34);
        }
        tl.from(row.querySelector("[data-status]"), { autoAlpha: 0, duration: 0.3 }, at + 0.4);
      });
      tl.from(q("[data-approve]"), { autoAlpha: 0, y: 14, duration: 0.8 }, 0.55 + EXAMPLE.length * 0.4);
    }, el);
    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  // The stamp press: drop from above, overshoot, settle, and a small jolt through the box.
  useEffect(() => {
    if (!stamp || !placed.current) return;
    // The approval button is gone once stamped; keep keyboard users on the next step.
    if (document.activeElement === document.body) signed.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(placed.current, { scale: 2.4, autoAlpha: 0, rotation: stamp.r + 22 }, { scale: 1, autoAlpha: 1, rotation: stamp.r, duration: 0.42, ease: "back.out(2.8)" });
      gsap.fromTo(signed.current, { y: 0 }, { y: 2, duration: 0.06, yoyo: true, repeat: 1, delay: 0.16, ease: "power1.inOut" });
      gsap.fromTo("[data-status-approved]", { autoAlpha: 0, x: -6 }, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.07, delay: 0.3, ease: "expo.out" });
      // Opacity only: visibility:hidden would steal focus from the demo link during the fade.
      gsap.fromTo("[data-after-stamp]", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.55, ease: "expo.out" });
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
    // The stamp lands on the right half, clear of the demo button that appears on the left.
    const minX = Math.min(r.width - 48, Math.max(r.width * 0.6, 230));
    setStamp({ x: Math.max(minX, Math.min(r.width - 48, x)), y: Math.max(40, Math.min(r.height - 40, y)), r: -14 + Math.random() * 16 });
  };

  const approved = Boolean(stamp);

  return (
    <section ref={root} id="schedule" data-self aria-labelledby="schedule-title" className="section">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* The claim and the particulars */}
        <div className="lg:col-span-5">
          <h2 id="schedule-title" className="h2">
            <Segs segs={t.title} />
          </h2>
          <p data-s-rise className="lead mt-6">
            {t.lead}
          </p>
          <dl data-s-rise className="mt-10 space-y-5">
            {PARTICULARS.map((p) => (
              <div key={p.label}>
                <dt className="lbl">{p.label}</dt>
                <dd className="entry mt-1.5 text-[0.8rem] leading-snug text-white">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The sheet */}
        <div data-hero data-sheet className="sheet lg:col-span-7">
          <div className="flex items-center justify-between gap-4 px-5 pt-5 sm:px-7 sm:pt-6">
            <p className="lbl-ref">
              Form {forms.home.code} · {forms.home.title}
            </p>
            <p className="lbl-ref">
              <span className="entry text-white">{date || " "}</span>
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 px-5 pt-5 sm:px-7">
            <p className="lbl">Lines written this morning</p>
            <p className="lbl-ref pill">Example</p>
          </div>
          <ol className="mt-2 px-5 sm:px-7">
            {EXAMPLE.map((l) => (
              <li key={l.no} data-line className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 border-b hair py-3.5 last:border-b-0 sm:gap-x-4">
                <span className="min-w-0">
                  <span data-name className="flex items-baseline gap-2.5">
                    <span className="text-[0.98rem] font-semibold leading-tight text-white">{l.agent}</span>
                    <span className="lbl-ref">{l.no}</span>
                  </span>
                  <span data-entry className="entry mt-1 block text-[0.76rem] leading-snug text-textsec">
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
          <div data-approve className="px-5 pb-5 pt-3 sm:px-7 sm:pb-7">
            <div className="flex items-baseline justify-between gap-4">
              <p className="lbl">Approved by</p>
              {approved ? (
                <button type="button" onClick={() => setStamp(null)} className="lbl ln">
                  Reset
                </button>
              ) : null}
            </div>
            {!approved ? (
              <button
                ref={box}
                type="button"
                aria-label="Approve the example schedule"
                onPointerMove={onMove}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
                onPointerLeave={() => setHovering(false)}
                onClick={approve}
                className="relative mt-2 block h-[6.5rem] w-full cursor-none overflow-hidden rounded-2xl bg-deep/60 text-left ring-1 ring-inset ring-accent/40 transition-[background-color,box-shadow] hover:bg-deep/80 hover:ring-accent/80"
              >
                <span className="entry absolute left-5 top-1/2 max-w-[60%] -translate-y-1/2 text-[0.8rem] leading-snug text-textsec">
                  Nothing goes out until you stamp it. Try it.
                </span>
                <span
                  ref={ghost}
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-0 top-0 transition-opacity duration-200 ${hovering ? "opacity-60" : "opacity-0"}`}
                >
                  <Stamp ring="Approved · Brocare AI" center="OK" tone="ice" size={84} rotate={0} />
                </span>
              </button>
            ) : (
              // Signed: the box keeps its size, so nothing around it moves. The next step,
              // the demo, is offered right where the approval happened.
              <div ref={signed} className="relative mt-2 h-[6.5rem] w-full overflow-hidden rounded-2xl bg-ice/[0.07] ring-1 ring-inset ring-ice/50">
                <div data-after-stamp className="absolute left-5 top-1/2 flex -translate-y-1/2 flex-col items-start gap-2">
                  <span className="entry text-[0.76rem] leading-snug text-white">Approved. Only now would it go out.</span>
                  <Link href="/demo" className="btn btn-primary btn-sm">
                    {demoLabel}
                    <Arrow />
                  </Link>
                </div>
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
              </div>
            )}
            <p className="sr-only" aria-live="polite">
              {approved ? "Example schedule approved." : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
