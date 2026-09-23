import type { Block } from "@/lib/content/pages";
import { pad2 } from "@/lib/slip";

// Long-form pages set as numbered clauses: the clause mark and heading in the margin
// column, the text on a comfortable measure beside it.
export function Clauses({ blocks, mark = "Clause" }: { blocks: Block[]; mark?: string }) {
  return (
    <div className="wrap">
      {blocks.map((b, i) => (
        <section key={b.h} aria-labelledby={`clause-${i}`} className="grid gap-x-12 gap-y-4 border-t hair py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="lbl-ref text-accent">
                {mark} {pad2(i + 1)}
              </p>
              <h2 id={`clause-${i}`} data-anim="lines" className="mt-3 text-[clamp(1.5rem,2.3vw,2rem)] font-bold leading-[1.12] tracking-[-0.025em] text-balance">
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
