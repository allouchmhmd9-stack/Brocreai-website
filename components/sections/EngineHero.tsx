"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactElement } from "react";
import { Segs } from "@/components/Segs";
import { ShieldCanvas } from "@/components/ShieldCanvas";
import { Arrow } from "@/components/slip/Parts";
import { showcase } from "@/lib/content/engines";
import type { Dictionary } from "@/lib/i18n";
import st from "./EngineHero.module.css";

const ICON: Record<string, ReactElement> = {
  radar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><path d="M12 12l6-6" /></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>,
  play: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M10 9l5 3-5 3z" /></svg>,
  ledger: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="3.5" width="16" height="17" rx="2" /><path d="M8 8h8M8 12h8M8 16h5M12 3.5v17" /></svg>,
  doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>,
  sun: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 18h16M7 14a5 5 0 0 1 10 0M12 4v3M5.5 7.5l1.6 1.6M18.5 7.5l-1.6 1.6" /></svg>,
};

// Each engine, as the stage shows it. Same order as the shield's symbols and `showcase`.
const SCENES = [
  { role: "a lead machine", id: "engine:leads", icon: "radar", kicker: "Works in your tools",
    tasks: ["find companies that fit your market", "score every lead out of 100", "write the research brief", "hand over a ready list"],
    tools: [["LinkedIn", "#1a3bdb", "in"], ["Company sites", "#2d6fff", "Ws"], ["Your CRM", "#1565c0", "Cr"], ["Excel", "#1a3bdb", "Xl"]] },
  { role: "an outreach team", id: "engine:outreach", icon: "mail", kicker: "Works in your tools",
    tasks: ["draft a personal first email", "follow up on schedule", "read and sort every reply", "book the call in your calendar"],
    tools: [["Outlook", "#1a3bdb", "Ol"], ["Gmail", "#2d6fff", "Gm"], ["WhatsApp", "#1565c0", "Wa"], ["Calendar", "#1a3bdb", "Ca"]] },
  { role: "a marketing studio", id: "engine:marketing", icon: "play", kicker: "Publishes to",
    tasks: ["plan the week’s posts", "write carousels and scripts", "design them in your brand", "schedule once you approve"],
    tools: [["Instagram", "#1a3bdb", "Ig"], ["LinkedIn", "#2d6fff", "in"], ["TikTok", "#1565c0", "Tk"], ["Your brand kit", "#1a3bdb", "Bk"]] },
  { role: "an accounting desk", id: "engine:accounting", icon: "ledger", kicker: "Works in your tools",
    tasks: ["read the insurer statements", "match every line to your records", "flag what does not reconcile", "prepare the month for review"],
    tools: [["Excel", "#1a3bdb", "Xl"], ["Statements", "#2d6fff", "St"], ["Your ledger", "#1565c0", "Lg"], ["PDF", "#1a3bdb", "Pd"]] },
  { role: "a quote desk", id: "engine:quoting", icon: "doc", kicker: "Works in your tools",
    tasks: ["read the client’s request", "pull rates from your sheets", "build the client proposal", "send it as your branded PDF"],
    tools: [["Excel", "#1a3bdb", "Xl"], ["Outlook", "#2d6fff", "Ol"], ["Your rates", "#1565c0", "Rt"], ["PDF", "#1a3bdb", "Pd"]] },
  { role: "a morning briefing", id: "engine:briefing", icon: "sun", kicker: "Works in your tools",
    tasks: ["read the overnight inbox", "flag the hot leads", "list what needs your approval", "send the brief before 8:00"],
    tools: [["Outlook", "#1a3bdb", "Ol"], ["WhatsApp", "#2d6fff", "Wa"], ["Calendar", "#1565c0", "Ca"], ["Your CRM", "#1a3bdb", "Cr"]] },
] as const;

const STEP = 950, FIRST = 600, CYCLE = 7400;

export function EngineHero({ hero, demoLabel, agentCount, bundleCount }: { hero: Dictionary["hero"]; demoLabel: string; agentCount: number; bundleCount: number }) {
  const [ix, setIx] = useState(0);
  const [active, setActive] = useState(-1);
  const [done, setDone] = useState(0);
  const [approved, setApproved] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [role, setRole] = useState<string>(SCENES[0].role);
  const [reduce, setReduce] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null), cardRef = useRef<HTMLDivElement>(null), shieldRef = useRef<HTMLDivElement>(null), toolsRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLCanvasElement>(null), heroRef = useRef<HTMLElement>(null);
  const [beams, setBeams] = useState<{ a: string; t: string[] }>({ a: "", t: [] });

  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);

  // The scene cycle: four tasks tick off, then the next engine.
  useEffect(() => {
    setActive(-1); setDone(0); setApproved(false);
    if (reduce) { setDone(4); return; }
    const t: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < 4; i++) {
      t.push(setTimeout(() => { setActive(i); setPulse((p) => p + 1); }, FIRST + i * STEP));
      t.push(setTimeout(() => { setActive(-1); setDone(i + 1); }, FIRST + 600 + i * STEP));
    }
    t.push(setTimeout(() => setIx((v) => (v + 1) % SCENES.length), CYCLE));
    return () => t.forEach(clearTimeout);
  }, [ix, reduce]);

  // The typed role line.
  const roleRef = useRef<string>(SCENES[0].role);
  useEffect(() => {
    const target: string = SCENES[ix].role;
    if (reduce) { roleRef.current = target; setRole(target); return; }
    let txt = roleRef.current, adding = false;
    const iv = setInterval(() => {
      if (!adding) { txt = txt.slice(0, -1); if (!txt) adding = true; }
      else { txt = target.slice(0, txt.length + 1); if (txt === target) clearInterval(iv); }
      roleRef.current = txt; setRole(txt);
    }, 32);
    return () => clearInterval(iv);
  }, [ix, reduce]);

  // Beams from the engine card to the shield, and from the shield to each tool.
  const drawBeams = useCallback(() => {
    const s = stageRef.current, c = cardRef.current, sh = shieldRef.current, tl = toolsRef.current;
    if (!s || !c || !sh || !tl || window.innerWidth < 960) { setBeams({ a: "", t: [] }); return; }
    const sr = s.getBoundingClientRect(), cr = sh.getBoundingClientRect(), ar = c.getBoundingClientRect();
    const cx1 = cr.left - sr.left + cr.width * 0.12, cx2 = cr.right - sr.left - cr.width * 0.12, cy = cr.top - sr.top + cr.height / 2;
    const cv = (x1: number, y1: number, x2: number, y2: number) => { const m = (x1 + x2) / 2; return `M${x1},${y1} C${m},${y1} ${m},${y2} ${x2},${y2}`; };
    const a = cv(ar.right - sr.left, ar.top - sr.top + ar.height / 2, cx1, cy);
    const t = Array.from(tl.children).map((el) => { const r = el.getBoundingClientRect(); return cv(cx2, cy, r.left - sr.left, r.top - sr.top + r.height / 2); });
    setBeams({ a, t });
  }, []);
  useLayoutEffect(() => { drawBeams(); }, [ix, drawBeams]);
  useEffect(() => {
    const ro = new ResizeObserver(() => drawBeams());
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [drawBeams]);

  // A soft dot field behind the hero that brightens near the pointer.
  useEffect(() => {
    const cv = fieldRef.current, hero = heroRef.current;
    if (!cv || !hero) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0, dots: [number, number, number][] = [], mx = -999, my = -999, raf = 0;
    const size = () => { const r = cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2); W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); dots = []; for (let y = 9; y < H; y += 18) for (let x = 9; x < W; x += 18) dots.push([x, y, Math.random()]); };
    const frame = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const cx = W * 0.5 + Math.sin(t / 3300) * W * 0.18, cy = H * 0.5 + Math.cos(t / 2800) * H * 0.12;
      for (const [x, y, n] of dots) {
        const g = Math.max(0, 1 - Math.hypot(x - cx, y - cy) / (W * 0.42)) * 0.5 + Math.max(0, 1 - Math.hypot(x - mx, y - my) / 170) * 0.9;
        ctx.fillStyle = `rgba(79,195,247,${(0.03 + g * (0.2 + n * 0.16)).toFixed(3)})`; ctx.fillRect(x, y, 1.4, 1.4);
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    const move = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const leave = () => { mx = my = -999; };
    hero.addEventListener("pointermove", move); hero.addEventListener("pointerleave", leave);
    const ro = new ResizeObserver(size); ro.observe(cv);
    size(); raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave); };
  }, [reduce]);

  const scene = SCENES[ix], engine = showcase[ix];
  const lit = active >= 0 ? active % 4 : -1;

  return (
    <section ref={heroRef} aria-labelledby="hero-title" className={st.hero}>
      <canvas ref={fieldRef} className={st.field} aria-hidden="true" />
      <div className="wrap">
        <div className={st.top}>
          <span className={st.tagline}><b>{agentCount} agents</b><span className={st.dot} />{bundleCount} bundles<span className={st.dot} />built inside a real brokerage</span>
          <h1 id="hero-title" className={`display ${st.title}`}><Segs segs={hero.title} /></h1>
          <p className={st.turn} aria-live="polite">
            <span>Turn your brokerage into</span>
            <span><span className={st.role}>{role}</span><span className={st.caret} aria-hidden="true" /></span>
          </p>
          <div className={st.ctas}>
            <Link href="/demo" className="btn btn-primary">{demoLabel}<Arrow /></Link>
            <Link href="/engines" className="btn btn-secondary">See the engines</Link>
          </div>
        </div>

        <div ref={stageRef} className={st.stage}>
          <svg className={st.beams} aria-hidden="true">
            <defs><linearGradient id="ehBeamGrad" x1="0" x2="1"><stop offset="0" stopColor="#2d6fff" stopOpacity=".2" /><stop offset=".5" stopColor="#4fc3f7" /><stop offset="1" stopColor="#2d6fff" stopOpacity=".2" /></linearGradient></defs>
            {beams.a ? (<><path className={st.beamBase} d={beams.a} /><path className={st.beam} d={beams.a} /></>) : null}
            {beams.t.map((d, i) => (<g key={i}><path className={st.beamBase} d={d} /><path className={st.beam} d={d} style={{ opacity: lit === i ? 0.9 : 0.15 }} /></g>))}
          </svg>

          <div className={st.col}>
            <p className={`lbl ${st.kicker}`}>Engine</p>
            <div ref={cardRef} key={`card-${ix}`} className={`${st.card} ${st.swap}`}>
              <div className={st.face} aria-hidden="true">{ICON[scene.icon]}</div>
              <div>
                <div className={st.name}>{engine.name}</div>
                <div className={st.id}>{scene.id}</div>
              </div>
              <Link href={engine.href} className={st.see}>See it &rarr;</Link>
            </div>
            <ul key={`tasks-${ix}`} className={`${st.tasks} ${st.swap}`}>
              {scene.tasks.map((t, i) => (
                <li key={t} className={`${st.task} ${active === i ? st.on : ""} ${i < done ? st.done : ""}`}>
                  <span className={st.g}>{i === 3 ? "✎" : "▚"}</span><span>{t}</span><span className={st.ok}>{"✓"}</span>
                </li>
              ))}
            </ul>
            <div className={st.approve}>
              <span aria-live="polite">{approved ? "Approved. Only now does it go out." : "Drafts waiting for your approval"}</span>
              <button type="button" className={`btn btn-primary btn-sm ${approved ? "btn-done" : ""}`} disabled={approved} onClick={() => setApproved(true)}>
                {approved ? "✓ Approved" : "Approve all"}
              </button>
            </div>
          </div>

          <div ref={shieldRef} className={st.center}>
            <ShieldCanvas scene={ix} pulse={pulse} approved={approved} className={st.shield} />
          </div>

          <div className={st.col}>
            <p className={`lbl ${st.kicker}`}>{scene.kicker}</p>
            <div ref={toolsRef} key={`tools-${ix}`} className={`${st.tools} ${st.swap}`}>
              {scene.tools.map(([n, c, a], i) => (
                <div key={n} className={`${st.tool} ${lit === i ? st.lit : ""}`}><span className={st.lg} style={{ background: c }}>{a}</span>{n}</div>
              ))}
            </div>
          </div>
        </div>

        <div className={st.tabs} role="group" aria-label="Choose an engine">
          {showcase.map((e, i) => (
            <button key={e.name} type="button" aria-pressed={i === ix} className={`${st.tab} ${i === ix ? st.tabOn : ""}`} onClick={() => setIx(i)}>{e.name}</button>
          ))}
        </div>
      </div>
    </section>
  );
}
