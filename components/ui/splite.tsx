"use client";

import { Component, Suspense, lazy, type ReactNode } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

// If the 3D runtime or scene fails (blocked network, old GPU), the boundary swallows the
// error and renders nothing, so the page around it keeps working.
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Lazy-loaded Spline scene with a small ice loader while the runtime downloads.
export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <SceneBoundary>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <span className="loader" aria-hidden="true" />
          </div>
        }
      >
        <Spline scene={scene} className={className} onError={() => undefined} />
      </Suspense>
    </SceneBoundary>
  );
}
