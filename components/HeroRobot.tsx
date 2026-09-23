"use client";

import { useEffect, useState } from "react";
import { SplineScene } from "@/components/ui/splite";

// The interactive robot scene. It only mounts on large screens with motion allowed, so
// phones never download the 3D runtime; they keep the aurora behind the copy instead.
const SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export function HeroRobot() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const big = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShow(big.matches && !still.matches);
    update();
    big.addEventListener("change", update);
    still.addEventListener("change", update);
    return () => {
      big.removeEventListener("change", update);
      still.removeEventListener("change", update);
    };
  }, []);
  if (!show) return null;
  return (
    <div aria-hidden="true" className="pointer-events-auto absolute inset-y-0 right-0 hidden w-[52%] lg:block">
      <SplineScene scene={SCENE} className="h-full w-full" />
    </div>
  );
}
