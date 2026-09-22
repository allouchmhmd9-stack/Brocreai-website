import { Reveal } from "@/components/motion";
import { Segs } from "@/components/Segs";
import type { Dictionary } from "@/lib/i18n";

// Ice is used here on purpose: this is the real commitment.
export function Guarantee({ guarantee }: { guarantee: Dictionary["guarantee"] }) {
  return (
    <section id="guarantee" className="relative scroll-mt-20 overflow-hidden py-16 md:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -left-[10vmax] top-1/2 h-[50vmax] w-[50vmax] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(79,195,247,.14), transparent 70%)" }} />
      <div className="container-x relative">
        <Reveal className="glass grid gap-8 p-6 shadow-[0_0_0_1px_rgba(79,195,247,.35),0_24px_60px_-24px_rgba(79,195,247,.45)] sm:p-8 md:p-14 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-10">
          <p className="min-w-0 whitespace-nowrap font-display text-[clamp(2.75rem,5vw,4.75rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-ice lg:pt-2">
            {guarantee.big}
          </p>
          <div className="min-w-0 lg:border-l lg:border-cardborder/60 lg:pl-10">
            <h2 className="h2">
              <Segs segs={guarantee.title} />
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white">{guarantee.body}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-textsec">{guarantee.definition}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
