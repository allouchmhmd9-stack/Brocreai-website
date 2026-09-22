import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Segs } from "@/components/Segs";
import type { Dictionary } from "@/lib/i18n";

// A real sequence, set as one: numeral in a narrow column, the step beside it.
export function How({ how }: { how: Dictionary["how"] }) {
  return (
    <section id="how-it-works" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <h2 className="h2">
            <Segs segs={how.title} />
          </h2>
          <p className="mt-5 max-w-md text-lg text-textsec">{how.lead}</p>
        </Reveal>
        <Stagger as="ol" className="lg:col-span-7">
          {how.steps.map((step, i) => (
            <StaggerItem as="li" key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-5 border-b border-cardborder/50 py-7 first:border-t md:grid-cols-[4.5rem_1fr] md:py-8">
              <span aria-hidden="true" className="font-display text-5xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_#2d6fff] md:text-6xl">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-lg leading-relaxed text-textsec">{step.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
