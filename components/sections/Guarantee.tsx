import { Aurora } from "@/components/Aurora";
import { Segs } from "@/components/Segs";
import type { Dictionary } from "@/lib/i18n";

// An example of how the fortnight usually runs, labelled as such. The guarantee itself is
// the commitment; the milestones are illustrative.
const MILESTONES = [
  { day: "Day 1", title: "Kickoff", body: "Access given and the first bundle chosen." },
  { day: "Day 5", title: "Agents connected", body: "Linked to the tools your team already uses." },
  { day: "Day 8", title: "First drafts to you", body: "Real output, waiting for your review." },
  { day: "Day 14", title: "Live", body: "Your first workflow producing real work.", live: true },
];

// The guarantee: one clear statement, centred, and four milestones underneath.
export function Guarantee({ guarantee }: { guarantee: Dictionary["guarantee"] }) {
  return (
    <section id="guarantee" aria-labelledby="guarantee-title" className="section relative overflow-hidden bg-flow">
      <Aurora className="opacity-40" />
      <div className="wrap relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="guarantee-title" data-anim="lines" className="h2">
            <Segs segs={guarantee.title} />
          </h2>
          <p data-anim="rise" className="lead mx-auto mt-5">
            {guarantee.body}
          </p>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {MILESTONES.map((m) => (
            <li
              key={m.day}
              data-anim="rise"
              className={m.live ? "glass p-7 ring-1 ring-inset ring-ice/40 [background:rgba(79,195,247,0.07)]" : "glass p-7"}
            >
              <p className={m.live ? "lbl text-ice" : "lbl"}>{m.day}</p>
              <h3 className="h3 mt-4">{m.title}</h3>
              <p className="body mt-2 text-[0.92rem]">{m.body}</p>
            </li>
          ))}
        </ol>
        <p data-anim="rise" className="mx-auto mt-8 max-w-2xl text-center text-[0.88rem] leading-relaxed text-textsec">
          An example of how the two weeks usually run. {guarantee.definition}
        </p>
      </div>
    </section>
  );
}
