import { Heading, Sheet, Tick } from "@/components/slip/Parts";
import { Stamp } from "@/components/slip/Stamp";
import type { Dictionary } from "@/lib/i18n";

// Provenance: where the system comes from. The claim, the brokerage's seal, and three
// declarations ticked like the particulars on a proposal form, on the same slip stock.
export function Intro({ intro }: { intro: Dictionary["intro"] }) {
  return (
    <section id="provenance" aria-labelledby="provenance-title" className="py-6 md:py-8">
      <div className="wrap">
        <Sheet>
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <Heading id="provenance-title" title={intro.title} lead={intro.lead} className="lg:col-span-8" />
            <div className="flex justify-start lg:col-span-4 lg:justify-end">
              <div data-spin>
                <Stamp ring="Brocare Insurance Brokerage · Beirut" center="BEIRUT" size={184} rotate={0} tone="blue" className="opacity-90" />
              </div>
            </div>
          </div>

          <dl className="mt-12 border-b hair md:mt-16">
            {intro.facts.map((f) => (
              <div key={f.title} data-anim="rise" className="grid gap-x-8 gap-y-2 border-t hair py-6 md:grid-cols-12 md:py-7">
                <dt className="flex items-start gap-4 md:col-span-5">
                  <Tick className="mt-1 h-6 w-6" />
                  <span className="h3">{f.title}</span>
                </dt>
                <dd className="body pl-10 md:col-span-7 md:pl-0 md:text-[1.05rem]">{f.body}</dd>
              </div>
            ))}
          </dl>
        </Sheet>
      </div>
    </section>
  );
}
