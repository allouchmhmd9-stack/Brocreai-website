import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getDictionary } from "@/lib/i18n";
import { ogImages } from "@/lib/og";
import { forms } from "@/lib/slip";

const d = getDictionary();
type LegalKey = "privacy" | "terms" | "cookies" | "refunds";

export function legalMetadata(key: LegalKey): Metadata {
  const p = d.legal[key];
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: `/${key}` },
    openGraph: {
      title: `${p.metaTitle} | Brocare AI`,
      description: p.metaDescription,
      url: `/${key}`,
      images: ogImages,
    },
  };
}

// Draft legal text: have a qualified lawyer in Lebanon review it before launch.
// Set as the small print it is: numbered clauses on a reading measure.
export function LegalPage({ page }: { page: LegalKey }) {
  const p = d.legal[page];
  return (
    <>
      <PageHero form={{ code: forms.legal.code, title: p.title }} crumb={p.title} path={`/${page}`} title={[{ t: p.title }]}>
        <p className="lbl-ref mt-6">
          {d.legal.updatedLabel}: <span className="text-white">{d.legal.updated}</span>
        </p>
      </PageHero>
      <div className="wrap pb-24 pt-10 md:pb-32">
        <ol className="max-w-3xl">
          {p.sections.map((s, i) => (
            <li key={s.h} data-anim="rise" className="grid grid-cols-[2.2rem_minmax(0,1fr)] gap-x-4 border-t hair py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-6">
              <span className="lbl-ref pt-1 text-accent">{i + 1}.</span>
              <div>
                <h2 className="h3">{s.h}</h2>
                {s.p.map((para) => (
                  <p key={para} className="body mt-3">
                    {para}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
