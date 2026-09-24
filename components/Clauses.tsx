import type { Block } from "@/lib/content/pages";

// Long-form pages: each heading in the margin column, the text on a comfortable measure
// beside it.
export function Clauses({ blocks }: { blocks: Block[] }) {
  return (
    <div className="wrap">
      {blocks.map((b, i) => (
        <section key={b.h} aria-labelledby={`clause-${i}`} className="grid gap-x-12 gap-y-4 border-t hair py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 id={`clause-${i}`} data-anim="lines" className="font-display text-[clamp(1.4rem,2.1vw,1.85rem)] font-bold leading-[1.18] text-balance">
                {b.h}
              </h2>
            </div>
          </div>
          <div className="lg:col-span-8">
            {b.p.map((p, j) => (
              <p key={p} data-anim="rise" className={`body text-[1.06rem] ${j ? "mt-5" : ""}`}>
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
