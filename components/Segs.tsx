import type { Seg } from "@/lib/i18n";

// Renders a heading split into plain and gradient-emphasis segments.
export function Segs({ segs }: { segs: Seg[] }) {
  return (
    <>
      {segs.map((seg, i) =>
        seg.g ? (
          <span key={i} className="gradient-text">
            {seg.t}
          </span>
        ) : (
          <span key={i}>{seg.t}</span>
        ),
      )}
    </>
  );
}
