import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Segs } from "@/components/Segs";
import type { Seg } from "@/lib/i18n";

// Inner-page opener: the page printed as its own form. Strip with the form code and the
// breadcrumb, then the title set large, the lead, and whatever the page adds.
export function PageHero({
  form,
  crumb,
  path,
  title,
  lead,
  children,
  aside,
}: {
  form: { code: string; title: string };
  crumb: string;
  path: string;
  title: Seg[];
  lead?: string | string[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const leads = Array.isArray(lead) ? lead : lead ? [lead] : [];
  return (
    <section aria-labelledby="page-title" className="pt-16">
      <div className="wrap pt-5 md:pt-8">
        <div className="sheet crops">
          <div className="flex flex-col gap-2 border-b hair px-5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="lbl-ref">
              Form {form.code} · {form.title}
            </p>
            <Breadcrumbs trail={[{ name: crumb, path }]} />
          </div>
          <div className="grid gap-10 px-5 pb-10 pt-8 sm:px-8 md:pb-14 md:pt-12 lg:grid-cols-12 xl:px-10">
            <div className={aside ? "lg:col-span-8" : "lg:col-span-10"}>
              <h1 id="page-title" data-anim="lines" className="display text-[clamp(2.4rem,5.2vw,4.8rem)]">
                <Segs segs={title} />
              </h1>
              {leads.map((p) => (
                <p key={p} data-anim="rise" className="lead mt-6">
                  {p}
                </p>
              ))}
              {children}
            </div>
            {aside ? <div className="flex items-end justify-start lg:col-span-4 lg:justify-end">{aside}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
