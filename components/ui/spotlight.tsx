"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// A soft light that follows the cursor inside its parent section. Eased with a small lerp on
// requestAnimationFrame, so it glides rather than snaps. Pointer devices only.
export function Spotlight({ className, size = 420 }: { className?: string; size?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent || !window.matchMedia("(pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    const tick = () => {
      x += (tx - x) * (reduce ? 1 : 0.14);
      y += (ty - y) * (reduce ? 1 : 0.14);
      el.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const move = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const enter = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      x = tx = e.clientX - r.left;
      y = ty = e.clientY - r.top;
      el.style.opacity = "1";
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerenter", enter);
    parent.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerenter", enter);
      parent.removeEventListener("pointerleave", leave);
    };
  }, [size]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute left-0 top-0 rounded-full opacity-0 blur-2xl transition-opacity duration-300", className)}
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle at center, rgba(255,255,255,0.22), rgba(79,195,247,0.18) 35%, rgba(45,111,255,0.12) 55%, transparent 72%)",
      }}
    />
  );
}
