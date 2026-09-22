import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Segs } from "@/components/Segs";
import { StatusChip } from "@/components/StatusChip";
import { LiquidButton } from "@/components/ui/liquid-button";
import { bundles } from "@/lib/content/bundles";
import type { Dictionary } from "@/lib/i18n";

// The bundles, one line each. Detail lives on /bundles.
export function BundlesTeaser({ t }: { t: Dictionary["bundlesTeaser"] }) {
  const shown = bundles.slice(0, 6);
  return (
    <section id="bundles" className="relative scroll-mt-20 py-24 md:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <h2 className="h2">
            <Segs segs={t.title} />
          </h2>
          <p className="mt-5 text-lg text-textsec">{t.lead}</p>
          <p className="mt-3 font-medium text-ice">{t.rule}</p>
        </Reveal>
        <Stagger as="ul" className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((b) => (
            <StaggerItem as="li" key={b.slug}>
              <Link href={`/bundles#${b.slug}`} className="group flex h-full flex-col rounded-2xl border border-cardborder/70 bg-card/30 p-6 transition duration-300 hover:border-accent/60 hover:bg-card/50 hover:shadow-glow-soft">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-bold tracking-tight">{b.name}</h3>
                  <StatusChip status={b.status} />
                </div>
                <p className="mt-3 flex-1 leading-relaxed text-textsec">{b.short}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white">
                  {t.more}
                  <ArrowRight className="h-4 w-4 text-ice transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10">
          <LiquidButton href="/bundles" variant="ice">{t.cta}</LiquidButton>
        </Reveal>
      </div>
    </section>
  );
}
