"use client";

import { useEffect, useRef } from "react";

/**
 * The particle shield: grains of light form a shield with the current engine's symbol inside.
 * They scatter from the cursor and settle back, re-form when the engine changes, pulse when a
 * task starts, and become a check mark when the visitor approves.
 */

type Draw = (c: CanvasRenderingContext2D) => void;

function shieldPath(c: CanvasRenderingContext2D) {
  c.beginPath();
  c.moveTo(110, 18);
  c.bezierCurveTo(150, 34, 178, 38, 196, 38);
  c.bezierCurveTo(198, 118, 168, 168, 110, 204);
  c.bezierCurveTo(52, 168, 22, 118, 24, 38);
  c.bezierCurveTo(42, 38, 70, 34, 110, 18);
  c.closePath();
}

// One symbol per engine, in the order of the landing page's engines.
const SYMBOLS: Draw[] = [
  (c) => { c.beginPath(); c.arc(110, 108, 46, 0, 7); c.moveTo(136, 108); c.arc(110, 108, 26, 0, 7); c.moveTo(110, 108); c.lineTo(146, 76); c.stroke(); },
  (c) => { c.beginPath(); c.rect(66, 74, 88, 64); c.moveTo(70, 80); c.lineTo(110, 110); c.lineTo(150, 80); c.stroke(); },
  (c) => { c.beginPath(); c.rect(64, 70, 92, 72); c.moveTo(100, 90); c.lineTo(124, 106); c.lineTo(100, 122); c.closePath(); c.stroke(); },
  (c) => { c.beginPath(); c.rect(72, 60, 76, 92); c.moveTo(110, 60); c.lineTo(110, 152); c.moveTo(82, 82); c.lineTo(102, 82); c.moveTo(82, 102); c.lineTo(102, 102); c.moveTo(118, 82); c.lineTo(138, 82); c.moveTo(118, 102); c.lineTo(138, 102); c.moveTo(118, 122); c.lineTo(132, 122); c.stroke(); },
  (c) => { c.beginPath(); c.moveTo(82, 64); c.lineTo(126, 64); c.lineTo(142, 80); c.lineTo(142, 150); c.lineTo(82, 150); c.closePath(); c.moveTo(94, 100); c.lineTo(130, 100); c.moveTo(94, 120); c.lineTo(122, 120); c.stroke(); },
  (c) => { c.beginPath(); c.moveTo(66, 140); c.lineTo(154, 140); c.moveTo(80, 124); c.arc(110, 124, 30, Math.PI, 0); c.moveTo(110, 70); c.lineTo(110, 84); c.moveTo(74, 88); c.lineTo(84, 96); c.moveTo(146, 88); c.lineTo(136, 96); c.stroke(); },
];
const CHECK: Draw = (c) => { c.beginPath(); c.moveTo(74, 110); c.lineTo(100, 136); c.lineTo(148, 82); c.stroke(); };

const N = 1800;
type P = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; inner: number; s: number };

export function ShieldCanvas({ scene, pulse, approved, className }: { scene: number; pulse: number; approved: boolean; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const api = useRef<{ target: (d: Draw) => void; pulse: () => void; approved: (v: boolean) => void } | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    box.appendChild(cv);
    const ctx = cv.getContext("2d")!;
    const off = document.createElement("canvas");
    off.width = off.height = 220;
    const o = off.getContext("2d", { willReadFrequently: true })!;
    let S = 0, raf = 0, pulseV = 0, isApproved = false, mx = -9, my = -9;
    const P: P[] = [];

    const fit = () => { const r = box.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2); S = r.width; cv.width = S * d; cv.height = S * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    const grab = () => { const d = o.getImageData(0, 0, 220, 220).data, A: [number, number][] = []; for (let i = 0; i < d.length; i += 8) if (d[i + 3] > 128) A.push([(i / 4) % 220, Math.floor(i / 4 / 220)]); return A; };
    const target = (sym: Draw) => {
      o.clearRect(0, 0, 220, 220); o.lineCap = "round"; o.lineJoin = "round"; o.strokeStyle = "#fff";
      o.lineWidth = 12; shieldPath(o); o.stroke();
      o.save(); o.translate(110, 112); o.scale(0.8, 0.8); o.translate(-110, -112); o.lineWidth = 5; shieldPath(o); o.stroke(); o.restore();
      const A = grab();
      o.clearRect(0, 0, 220, 220); o.lineWidth = 9; sym(o); const B = grab();
      P.forEach((p, k) => { const inner = k >= N * 0.68, src = inner ? B : A, q = src[(Math.random() * src.length) | 0] || [110, 110]; p.tx = q[0] / 220; p.ty = q[1] / 220; p.inner = inner ? 1 : 0; });
    };
    for (let k = 0; k < N; k++) P.push({ x: Math.random(), y: Math.random(), vx: 0, vy: 0, tx: 0.5, ty: 0.5, inner: 0, s: 0.8 + Math.random() * 1.3 });

    const draw = () => {
      if (!S) { if (!reduce) raf = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, S, S);
      const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S * 0.5);
      g.addColorStop(0, `rgba(45,111,255,${0.16 + pulseV * 0.2})`); g.addColorStop(1, "rgba(45,111,255,0)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
      if (pulseV > 0.02) { ctx.strokeStyle = `rgba(79,195,247,${pulseV * 0.6})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(S / 2, S / 2, S * (0.5 - pulseV * 0.32), 0, 7); ctx.stroke(); }
      pulseV *= 0.95;
      ctx.save(); const sc = S / 220; ctx.scale(sc, sc); shieldPath(ctx);
      ctx.shadowColor = "rgba(79,195,247,.9)"; ctx.shadowBlur = 22 + pulseV * 18; ctx.strokeStyle = `rgba(79,195,247,${0.22 + pulseV * 0.25})`; ctx.lineWidth = 10; ctx.stroke();
      ctx.shadowBlur = 0; ctx.fillStyle = "rgba(26,59,219,.10)"; ctx.fill(); ctx.restore();
      const k = (S / 340) * 1.25;
      for (const p of P) {
        if (!reduce) {
          p.vx += (p.tx - p.x) * 0.018; p.vy += (p.ty - p.y) * 0.018;
          const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
          if (d2 < 0.012) { const f = (0.012 - d2) * 0.9; p.vx += dx * f * 40; p.vy += dy * f * 40; }
          p.vx *= 0.86; p.vy *= 0.86; p.x += p.vx + (Math.random() - 0.5) * 0.0012; p.y += p.vy + (Math.random() - 0.5) * 0.0012;
        } else { p.x = p.tx; p.y = p.ty; }
        const sz = p.inner ? p.s * k : p.s * k * 1.2;
        ctx.fillStyle = p.inner ? (isApproved ? "rgba(255,255,255,.98)" : "rgba(255,255,255,.85)") : `rgba(${p.s > 1.75 ? "255,255,255" : "79,195,247"},${0.7 + p.s * 0.12})`;
        ctx.beginPath(); ctx.arc(p.x * S, p.y * S, sz * 0.62, 0, 6.283); ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => { const r = box.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / r.height; };
    const onLeave = () => { mx = my = -9; };
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => { fit(); if (reduce) draw(); });
    ro.observe(box);

    api.current = {
      target: (d) => { P.forEach((p) => { p.vx += (Math.random() - 0.5) * 0.06; p.vy += (Math.random() - 0.5) * 0.06; }); target(d); if (reduce) draw(); },
      pulse: () => { pulseV = 1; },
      approved: (v) => { isApproved = v; },
    };
    fit(); target(SYMBOLS[0]); draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); box.removeEventListener("pointermove", onMove); box.removeEventListener("pointerleave", onLeave); cv.remove(); api.current = null; };
  }, []);

  useEffect(() => { api.current?.target(SYMBOLS[scene % SYMBOLS.length]); }, [scene]);
  useEffect(() => { if (pulse) api.current?.pulse(); }, [pulse]);
  useEffect(() => {
    api.current?.approved(approved);
    if (approved) { api.current?.target(CHECK); api.current?.pulse(); }
  }, [approved]);

  return <div ref={boxRef} className={className} style={{ position: "relative", aspectRatio: "1" }} />;
}
