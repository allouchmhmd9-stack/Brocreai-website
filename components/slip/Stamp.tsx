import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "blue" | "ice" | "ghost" | "white";

const TONE: Record<Tone, string> = {
  blue: "text-accent",
  ice: "text-ice",
  ghost: "text-cardborder",
  white: "text-white",
};

/**
 * A round rubber stamp: two rings, a line of text running around the band, and initials
 * or an icon in the middle. The ink texture comes from the #ink filter in the layout.
 * Decorative by default; pass `label` when the stamp carries meaning on its own.
 */
export function Stamp({
  ring,
  center,
  icon,
  tone = "blue",
  size = 96,
  rotate = -8,
  label,
  ink = true,
  className,
  ...rest
}: {
  ring: string;
  center?: string;
  icon?: ReactNode;
  tone?: Tone;
  size?: number;
  rotate?: number;
  label?: string;
  ink?: boolean;
  className?: string;
} & Record<`data-${string}`, string | undefined>) {
  const id = useId().replace(/:/g, "");
  const path = `stamp-ring-${id}`;
  // Short ring text repeats so it always wraps the full circle; long text runs once.
  const text = ring.length > 20 ? `${ring} · ` : `${ring} · ${ring} · `;
  return (
    <span
      {...rest}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("inline-block shrink-0 select-none", TONE[tone], className)}
      style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}
    >
      <svg viewBox="0 0 120 120" width="100%" height="100%" style={ink ? { filter: "url(#ink)" } : undefined}>
        <defs>
          <path id={path} d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="3.2" />
        <circle cx="60" cy="60" r="39" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <text
          fill="currentColor"
          style={{ fontSize: 9.6, fontWeight: 700, letterSpacing: "0.18em", fontStretch: "75%", textTransform: "uppercase" }}
        >
          <textPath href={`#${path}`} textLength="292" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
        {icon ? (
          <g transform="translate(42 42)">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              {icon}
            </svg>
          </g>
        ) : (
          <text
            x="60"
            y="61"
            textAnchor="middle"
            dominantBaseline="central"
            fill="currentColor"
            style={{ fontSize: center && center.length > 2 ? 17 : 28, fontWeight: 800, letterSpacing: "-0.02em", fontStretch: "92%" }}
          >
            {center}
          </text>
        )}
      </svg>
    </span>
  );
}

/** The SVG filter that gives every stamp its uneven ink. Rendered once in the layout. */
export function InkDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <filter id="ink" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" xChannelSelector="R" yChannelSelector="G" result="rough" />
          <feComponentTransfer in="noise" result="speckle">
            <feFuncA type="discrete" tableValues="0.35 1 1 1 1 0.55 1 1" />
          </feComponentTransfer>
          <feComposite in="rough" in2="speckle" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
