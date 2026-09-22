import { Reveal } from "@/components/motion";
import { Segs } from "@/components/Segs";
import type { Dictionary } from "@/lib/i18n";

// What Brocare AI is, in one screen: the claim on the left, the three facts on the right.
export function Intro({ intro }: { intro: Dictionary["intro"] }) {
  return (
    <section className="bleed-mid relative py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <h2 className="h2 max-w-[22ch]">
            <Segs segs={intro.title} />
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-textsec">{intro.lead}</p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-3 lg:col-span-6 lg:grid-cols-1">
          {intro.facts.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08} className="border-t border-cardborder/60 pt-5">
              <h3 className="font-display text-xl font-bold tracking-tight">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-textsec">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
