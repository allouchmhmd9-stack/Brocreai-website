import type { ReactNode } from "react";
import { Aurora } from "@/components/Aurora";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Segs } from "@/components/Segs";
import type { Seg } from "@/lib/i18n";

// Inner-page opener: centred over soft drifting light. Breadcrumb, the title set large,
// the lead, and whatever the page adds underneath.
export function PageHero({
  crumb,
  path,
  title,
  lead,
  children,
}: {
  crumb: string;
  path: string;
  title: Seg[];
  lead?: string | string[];
  children?: ReactNode;
}) {
  const leads = Array.isArray(lead) ? lead : lead ? [lead] : [];
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden pb-16 pt-32 text-center md:pb-24 md:pt-40">
      <Aurora className="opacity-60" />
      <div className="wrap relative">
        <div className="flex justify-center">
          <Breadcrumbs trail={[{ name: crumb, path }]} />
        </div>
        <h1 id="page-title" data-anim="lines" className="display mx-auto mt-6 max-w-4xl text-[clamp(2.3rem,5vw,4.3rem)]">
          <Segs segs={title} />
        </h1>
        {leads.map((p) => (
          <p key={p} data-anim="rise" className="lead mx-auto mt-6">
            {p}
          </p>
        ))}
        {children ? <div className="mx-auto flex max-w-3xl flex-col items-center">{children}</div> : null}
      </div>
    </section>
  );
}
