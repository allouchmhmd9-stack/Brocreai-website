import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getDictionary } from "@/lib/i18n";

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
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: d.meta.ogAlt }],
    },
  };
}

// Draft legal text: have a qualified lawyer in Lebanon review it before launch.
export function LegalPage({ page }: { page: LegalKey }) {
  const p = d.legal[page];
  return (
    <section className="pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="container-x max-w-3xl">
        <Breadcrumbs trail={[{ name: p.title, path: `/${page}` }]} />
        <h1 className="mt-8 font-display text-4xl font-bold tracking-tight md:text-5xl">{p.title}</h1>
        <p className="mt-4 text-sm text-textsec">
          {d.legal.updatedLabel}: {d.legal.updated}
        </p>
        <div className="mt-12 space-y-10">
          {p.sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-xl font-bold md:text-2xl">{s.h}</h2>
              {s.p.map((para) => (
                <p key={para} className="mt-3 max-w-[68ch] leading-relaxed text-textsec">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
