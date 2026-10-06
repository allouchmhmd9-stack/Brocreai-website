import type { ReactNode } from "react";
import { Segs } from "@/components/Segs";
import type { Seg } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** A section's content column. Open, never boxed: sections fade into the page instead. */
export function Sheet({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(className)}>{children}</div>;
}

/** Heading + optional lead, set on the schedule's content column. */
export function Heading({
  title,
  lead,
  as: Tag = "h2",
  className,
  size = "h2",
  id,
}: {
  title: Seg[];
  lead?: string;
  as?: "h1" | "h2";
  className?: string;
  size?: "h2" | "display";
  id?: string;
}) {
  return (
    <div className={className}>
      <Tag id={id} data-anim="lines" className={size === "display" ? "display text-[clamp(2.6rem,6vw,5.6rem)]" : "h2"}>
        <Segs segs={title} />
      </Tag>
      {lead ? (
        <p data-anim="rise" className="lead mt-5">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/** A soft round check. `ticked` draws the mark; `tone` ice marks something approved or live. */
export function Tick({ ticked = true, tone = "blue", className }: { ticked?: boolean; tone?: "blue" | "ice"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn("h-5 w-5 shrink-0", tone === "ice" ? "text-ice" : "text-accent", className)}>
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.16" />
      {ticked ? <path data-draw d="M7 12.4l3.3 3.3L17.2 8.6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /> : null}
    </svg>
  );
}

/** Field: a label printed above a value, used for dl-style form fields. */
export function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <dt className="lbl">{label}</dt>
      <dd className="mt-2">{children}</dd>
    </div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" className={cn("arr shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
