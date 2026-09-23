import Link from "next/link";
import { Check } from "lucide-react";
import { Aurora } from "@/components/Aurora";
import { HeroRobot } from "@/components/HeroRobot";
import { Segs } from "@/components/Segs";
import { Arrow } from "@/components/slip/Parts";
import { Spotlight } from "@/components/ui/spotlight";
import type { Dictionary } from "@/lib/i18n";

// The hero: copy on the left, the interactive robot on the right (large screens only),
// a cursor spotlight over the whole section, drifting aurora light behind, and the three
// promises under the buttons.
export function Hero({ hero, demoLabel }: { hero: Dictionary["hero"]; demoLabel: string }) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-16 pt-28 md:pb-20 md:pt-36 lg:flex lg:min-h-[94svh] lg:items-center">
      <Aurora className="opacity-70" />
      <Spotlight className="z-0" size={440} />
      <HeroRobot />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-deep" />
      <div className="wrap relative z-10 lg:grid lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 id="hero-title" data-anim="lines" className="display max-w-[15ch] text-[clamp(2.7rem,6vw,5.6rem)]">
            <Segs segs={hero.title} />
          </h1>
          <p data-anim="rise" className="lead mt-7 max-w-[46ch] md:text-[1.25rem]">
            {hero.sub}
          </p>
          <div data-anim="rise" className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo" className="btn btn-primary">
              {demoLabel}
              <Arrow />
            </Link>
            <Link href="/agents" className="btn btn-secondary">
              {hero.secondary}
            </Link>
          </div>
          <ul data-anim="rise" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[0.92rem] text-textsec">
            {hero.chips.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-ice/15">
                  <Check className="h-3.5 w-3.5 text-ice" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
