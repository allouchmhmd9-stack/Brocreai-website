import { Check } from "lucide-react";
import { Aurora } from "@/components/Aurora";
import { HeroRobot } from "@/components/HeroRobot";
import { Segs } from "@/components/Segs";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Spotlight } from "@/components/ui/spotlight";
import type { Dictionary } from "@/lib/i18n";

// The hero: copy on the left, the interactive robot on the right (large screens only),
// a cursor spotlight over the whole section, and three feature chips under the buttons.
export function Hero({ hero, demoLabel }: { hero: Dictionary["hero"]; demoLabel: string }) {
  return (
    <section className="relative isolate min-h-[88svh] overflow-hidden pb-20 pt-32 md:pt-40 lg:min-h-[92svh]">
      <Aurora className="opacity-70" />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-40" size={420} />
      <HeroRobot />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-deep" />
      <div className="container-x relative z-10 lg:grid lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="hero-in max-w-[16ch] font-display text-[clamp(2.4rem,5.4vw,4.9rem)] font-bold leading-[1.04] tracking-[-0.025em] text-balance">
            <Segs segs={hero.title} />
          </h1>
          <p className="hero-in hero-in-2 mt-6 max-w-[46ch] text-lg leading-relaxed text-textsec md:text-xl">{hero.sub}</p>
          <div className="hero-in hero-in-2 mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LiquidButton href="/demo" variant="chrome" fluid>{demoLabel}</LiquidButton>
            <LiquidButton href="/agents" variant="ice" fluid>{hero.secondary}</LiquidButton>
          </div>
          <ul className="hero-in hero-in-3 mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-textsec">
            {hero.chips.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-ice" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
