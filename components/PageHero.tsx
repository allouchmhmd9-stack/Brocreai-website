import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Segs } from "@/components/Segs";
import type { Seg } from "@/lib/i18n";

// Inner-page opener: breadcrumb, one-gradient-word title, lead paragraph.
export function PageHero({ crumb, path, title, lead, children }: { crumb: string; path: string; title: Seg[]; lead?: string | string[]; children?: React.ReactNode }) {
  const leads = Array.isArray(lead) ? lead : lead ? [lead] : [];
  return (
    <section className="relative pb-12 pt-28 md:pb-16 md:pt-36">
      <div className="container-x">
        <Breadcrumbs trail={[{ name: crumb, path }]} />
        <h1 className="hero-in mt-8 max-w-[24ch] font-display text-[clamp(2.1rem,4.4vw,3.9rem)] font-bold leading-[1.06] tracking-[-0.02em] text-balance">
          <Segs segs={title} />
        </h1>
        {leads.map((p) => (
          <p key={p} className="hero-in hero-in-2 mt-5 max-w-[62ch] text-lg leading-relaxed text-textsec">
            {p}
          </p>
        ))}
        {children}
      </div>
    </section>
  );
}
