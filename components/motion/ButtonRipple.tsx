"use client";

import { useEffect } from "react";

// A soft ripple from the exact point a .btn is pressed. One listener for the whole site.
export function ButtonRipple() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onDown = (e: PointerEvent) => {
      const btn = (e.target as Element | null)?.closest<HTMLElement>(".btn");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2;
      const dot = document.createElement("span");
      dot.className = "ripple";
      dot.setAttribute("aria-hidden", "true");
      dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
      btn.appendChild(dot);
      dot.addEventListener("animationend", () => dot.remove(), { once: true });
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);
  return null;
}
