import Link from "next/link";
import { Aurora } from "@/components/Aurora";
import { WhatsAppIcon } from "@/components/icons";
import { Segs } from "@/components/Segs";
import { Arrow } from "@/components/slip/Parts";
import { getDictionary } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

// The close of every page: one centred invitation over soft light, and the two ways in.
export function CtaBand({ lead }: { lead?: string }) {
  const d = getDictionary();
  return (
    <section aria-labelledby="sign-title" className="section relative overflow-hidden bg-flow">
      <Aurora className="opacity-50" />
      <div className="wrap relative text-center">
        <h2 id="sign-title" data-anim="lines" className="display mx-auto max-w-4xl text-[clamp(2.2rem,4.8vw,4rem)]">
          <Segs segs={d.closing.title} />
        </h2>
        <p data-anim="rise" className="lead mx-auto mt-6">
          {lead ?? d.closing.lead}
        </p>
        <div data-anim="rise" className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/demo" className="btn btn-primary">
            {d.nav.demo}
            <Arrow />
          </Link>
          <a href={whatsappLink(d.demo.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <WhatsAppIcon className="h-5 w-5" />
            {d.nav.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
