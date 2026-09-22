import { LiquidButton } from "@/components/ui/liquid-button";
import { Reveal } from "@/components/motion";
import { Segs } from "@/components/Segs";
import { getDictionary } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

// The closing call to action, shared by every page.
export function CtaBand({ lead }: { lead?: string }) {
  const d = getDictionary();
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(45,111,255,.22), transparent 70%)" }} />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2rem,4.6vw,3.6rem)] font-bold leading-[1.06] tracking-[-0.02em] text-balance">
            <Segs segs={d.closing.title} />
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lg text-textsec">{lead ?? d.closing.lead}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LiquidButton href="/demo" variant="chrome">{d.nav.demo}</LiquidButton>
            <LiquidButton href={whatsappLink(d.demo.whatsappPrefill)} external variant="ice">{d.nav.whatsapp}</LiquidButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
