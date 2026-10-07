import type { Metadata } from "next";
import Link from "next/link";
import { AgentIcon } from "@/components/AgentIcon";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Arrow } from "@/components/slip/Parts";
import { enginePages, showcase } from "@/lib/content/engines";
import type { Seg } from "@/lib/i18n/en";
import { ogImages } from "@/lib/og";

const description =
  "Six engines, each a team of AI agents working together: lead generation, outreach, marketing, accounting, quoting and the morning brief. Every one waits for your approval.";

export const metadata: Metadata = {
  title: "Engines: the Brocare AI products",
  description,
  alternates: { canonical: "/engines" },
  openGraph: { title: "Engines: the Brocare AI products | Brocare AI", description, url: "/engines", images: ogImages },
};

const title: Seg[] = [{ t: "Six engines. One team. All under your " }, { t: "approval", g: true }, { t: "." }];

const BLURB: Record<string, { body: string; icon: string }> = {
  "Lead Engine": { body: "Finds companies that fit your market, scores every lead out of 100 and hands over a ready list.", icon: "Radar" },
  "Outreach Engine": { body: "Personal first emails, follow-ups on schedule and reply drafts, all waiting for your approval.", icon: "Megaphone" },
  "Marketing Engine": { body: "Plans, writes and designs your content in your brand voice, then schedules it once you approve.", icon: "Sparkles" },
  "Accounting Engine": { body: "Reads insurer statements, matches every line to your records and prepares the month for sign-off.", icon: "Calculator" },
  "Quote Desk": { body: "Reads the client's request, pulls rates from your sheets and builds a branded proposal.", icon: "FileOutput" },
  "Morning Brief": { body: "One brief before 8:00: the overnight inbox, the hot leads and what needs your approval.", icon: "Sunrise" },
};

export default function EnginesPage() {
  const withPage = new Set(enginePages.map((e) => e.name));
  return (
    <>
      <PageHero
        form={{ code: "BAI-E", title: "Engines" }}
        crumb="Engines"
        path="/engines"
        title={title}
        lead="Each engine is a group of agents working together on one part of your business. Start with one, add the next when you are ready. Nothing goes out until someone approves it."
      />
      <section aria-label="All engines" className="section pt-6 md:pt-8">
        <div className="wrap">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {showcase.map((e) => {
              const b = BLURB[e.name];
              return (
                <li key={e.name} data-anim="rise">
                  <Link href={e.href} className="group flex h-full flex-col rounded-3xl bg-gradient-to-b from-card/80 to-mid/50 p-7 ring-1 ring-inset ring-cardborder/50 transition duration-500 hover:-translate-y-1 hover:ring-white/50">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/25 text-ice">
                      <AgentIcon name={b?.icon ?? "Sparkles"} className="h-6 w-6" />
                    </span>
                    <span className="h3 mt-6 block">{e.name}</span>
                    <span className="body mt-2 block text-[0.97rem]">{b?.body}</span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.92rem] font-medium text-ice group-hover:text-white">
                      {withPage.has(e.name) ? "See the engine" : "See the agent"}
                      <Arrow className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
