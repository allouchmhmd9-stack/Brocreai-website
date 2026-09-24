import { Heading, Tick } from "@/components/slip/Parts";
import type { Dictionary } from "@/lib/i18n";

// How access is given, scoped and approved: three numbered steps on glass cards.
export function How({ how }: { how: Dictionary["how"] }) {
  const last = how.steps.length - 1;
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section">
      <div className="wrap">
        <Heading id="how-title" title={how.title} lead={how.lead} center />
        <ol className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3">
          {how.steps.map((s, i) => (
            <li key={s.title} data-anim="rise" className="glass glass-hover flex flex-col p-7 md:p-8">
              <span aria-hidden="true" className="tile font-display text-lg font-bold">
                {i + 1}
              </span>
              <h3 className="h3 mt-6">{s.title}</h3>
              <p className="body mt-3 text-[0.95rem]">{s.body}</p>
              {i === last ? (
                <p className="mt-6 flex items-center gap-3 rounded-2xl bg-ice/[0.07] px-4 py-3 text-[0.9rem] text-white ring-1 ring-inset ring-ice/30">
                  <Tick tone="ice" />
                  Signed off by you. Only then does anything go out.
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
