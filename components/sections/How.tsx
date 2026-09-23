import { Heading, Sheet } from "@/components/slip/Parts";
import { Stamp } from "@/components/slip/Stamp";
import type { Dictionary } from "@/lib/i18n";

// Conditions: how access is given, scoped and approved. The three conditions sit on one
// ruled line that inks itself as you scroll, and the last one closes in a sign-off box.
export function How({ how }: { how: Dictionary["how"] }) {
  const last = how.steps.length - 1;
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-6 md:py-8">
      <div className="wrap">
        <Sheet mark="§ 05" name="Conditions" form="BAI-01 · p.5">
          <Heading id="how-title" title={how.title} lead={how.lead} className="max-w-4xl" />

          <div data-scrub-root className="relative mt-12 md:mt-16">
            {/* The connecting line (wide screens): a printed rule, inked as you scroll */}
            <div aria-hidden="true" className="absolute left-0 right-0 top-[1.1rem] hidden h-px bg-cardborder md:block" />
            <div aria-hidden="true" data-scrub-x className="absolute left-0 right-0 top-[calc(1.1rem-0.5px)] hidden h-[2px] origin-left bg-accent md:block" />

            <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
              {how.steps.map((s, i) => (
                <li key={s.title} data-anim="rise" className="relative flex flex-col border-l hair pl-6 md:border-l-0 md:pl-0">
                  <span aria-hidden="true" className="entry grid h-9 w-9 place-items-center border border-accent bg-mid text-[0.8rem] font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="h3 mt-6">{s.title}</h3>
                  <p className="body mt-3">{s.body}</p>
                  {i === last ? (
                    <div className="mt-6 flex items-center gap-4 border border-dashed border-ice/50 px-4 py-3">
                      <Stamp data-anim="stamp" ring="Approved · by you" center="OK" tone="ice" size={64} rotate={-10} />
                      <p className="entry text-[0.74rem] leading-snug text-white">Signed off by you. Only then does anything go out.</p>
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </Sheet>
      </div>
    </section>
  );
}
