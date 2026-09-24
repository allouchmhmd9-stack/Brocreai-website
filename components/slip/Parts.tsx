import type { ReactNode } from "react";
import { Segs } from "@/components/Segs";
import type { Seg } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Section heading + optional lead. `center` sets both on the page's centre line. */
export function Heading({
  title,
  lead,
  as: Tag = "h2",
  className,
  size = "h2",
  id,
  center = false,
}: {
  title: Seg[];
  lead?: string;
  as?: "h1" | "h2";
  className?: string;
  size?: "h2" | "display";
  id?: string;
  center?: boolean;
}) {
  return (
    <div className={cn(center && "mx-auto max-w-3xl text-center", className)}>
      <Tag id={id} data-anim="lines" className={size === "display" ? "display text-[clamp(2.4rem,5.4vw,4.6rem)]" : "h2"}>
        <Segs segs={title} />
      </Tag>
      {lead ? (
        <p data-anim="rise" className={cn("lead mt-5", center && "mx-auto")}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}

type TileTone = "blue" | "ice" | "ghost";

const TILE_TONE: Record<TileTone, string> = {
  blue: "bg-primary/25 text-ice",
  ice: "bg-ice/15 text-ice",
  ghost: "bg-card/70 text-textsec ring-1 ring-inset ring-cardborder/70",
};

const TILE_SIZE = {
  sm: "h-8 w-8 rounded-xl text-[0.62rem] [&_svg]:h-4 [&_svg]:w-4",
  md: "h-12 w-12 rounded-2xl text-[0.8rem] [&_svg]:h-6 [&_svg]:w-6",
  lg: "h-14 w-14 rounded-2xl text-[0.9rem] [&_svg]:h-7 [&_svg]:w-7",
};

/** Icon tile: an icon (or initials) on a soft rounded square. Replaces the old rubber stamps. */
export function Tile({
  children,
  tone = "blue",
  size = "md",
  className,
}: {
  children: ReactNode;
  tone?: TileTone;
  size?: keyof typeof TILE_SIZE;
  className?: string;
}) {
  return (
    <span aria-hidden="true" className={cn("grid shrink-0 place-items-center font-semibold", TILE_TONE[tone], TILE_SIZE[size], className)}>
      {children}
    </span>
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

/** Field: a label printed above a value, used for dl-style fields. */
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
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" className={cn("arr shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
