import Link from "next/link";
import { BundlesMatrix } from "@/components/BundlesMatrix";
import { Arrow, Heading } from "@/components/slip/Parts";
import { bundles } from "@/lib/content/bundles";
import type { Dictionary } from "@/lib/i18n";

// Cover: the bundles as schedules you can open, and the rule you can try for yourself.
export function BundlesTeaser({ t }: { t: Dictionary["bundlesTeaser"] }) {
  return (
    <section id="bundles" aria-labelledby="bundles-title" className="section bg-flow">
      <div className="wrap">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Heading id="bundles-title" title={t.title} lead={t.lead} className="lg:col-span-8" />
          <div data-anim="rise" className="lg:col-span-4 lg:justify-self-end">
            <Link href="/engines" className="btn btn-secondary">
              {t.cta}
              <Arrow />
            </Link>
          </div>
        </div>
        <div data-anim="rise" className="mt-12 md:mt-16">
          <BundlesMatrix bundles={bundles} seeLabel={t.more} rule={t.rule} />
        </div>
      </div>
    </section>
  );
}
