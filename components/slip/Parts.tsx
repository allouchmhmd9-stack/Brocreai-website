import type { ReactNode } from "react";
import { Segs } from "@/components/Segs";
import type { Seg } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * The printed rule that opens a section: a strong rule with its folio (section mark, name,
 * form reference) set small at the right-hand end, the way a form prints its page reference.
 * Nothing is stacked over the heading.
 */
export function SectionBar({ mark, name, form, className }: { mark: string; name: string; form?: string; className?: string }) {
  return (
    <div className={cn("relative flex items-center gap-4", className)}>
      <div data-anim="rule" className="h-px flex-1 bg-primary" />
      <p className="lbl-ref shrink-0">
        <span className="text-accent">{mark}</span> · {name}
        {form ? <span className="hidden sm:inline"> · {form}</span> : null}
      </p>
    </div>
  );
}

/**
 * A section printed on the slip stock: the framed navy sheet with registration corners,
 * a top strip carrying the section mark and folio, and a ruled margin down the left on wide
 * screens, so the landing reads as one continuous document.
 */
export function Sheet({ mark, name, form, children, className }: { mark: string; name: string; form: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("sheet crops", className)}>
      <div className="flex items-baseline justify-between gap-6 border-b hair px-5 py-2.5 sm:px-6">
        <p className="lbl-ref">
          <span className="text-accent">{mark}</span> · {name}
        </p>
        <p className="lbl-ref">{form}</p>
      </div>
      <div className="relative px-5 py-10 sm:px-8 md:py-14 lg:pl-24 lg:pr-10">
        <span aria-hidden="true" className="absolute bottom-0 left-16 top-0 hidden w-px bg-primary/40 lg:block" />
        {children}
      </div>
    </div>
  );
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

/** A drawn tick box. `ticked` draws the check; `tone` ice marks something approved or live. */
export function Tick({ ticked = true, tone = "blue", className }: { ticked?: boolean; tone?: "blue" | "ice"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn("h-5 w-5 shrink-0", tone === "ice" ? "text-ice" : "text-accent", className)}>
      <rect x="2.5" y="2.5" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
      {ticked ? (
        <path data-draw d="M6.5 12.5l3.6 3.6L18 7.2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
      ) : null}
    </svg>
  );
}

/** Field: a label printed above a value, used for dl-style form fields. */
export function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("border-t hair pt-3", className)}>
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
