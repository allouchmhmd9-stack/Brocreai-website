import type { Metadata } from "next";
import Link from "next/link";
import { Aurora } from "@/components/Aurora";
import { WhatsAppIcon } from "@/components/icons";
import { Arrow } from "@/components/slip/Parts";
import { getDictionary } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

const d = getDictionary();

export const metadata: Metadata = {
  title: d.notFound.metaTitle,
  robots: { index: false, follow: true },
};

// Page not found: a calm centred message and the two ways back.
export default function NotFound() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 text-center md:pb-32 md:pt-44">
      <Aurora className="opacity-60" />
      <div className="wrap relative">
        <p className="font-display text-[clamp(4rem,12vw,8rem)] font-bold leading-none text-white/10" aria-hidden="true">
          404
        </p>
        <h1 className="display mx-auto -mt-6 max-w-3xl text-[clamp(2.2rem,4.8vw,4rem)]">{d.notFound.title}</h1>
        <p className="lead mx-auto mt-6">{d.notFound.body}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            {d.notFound.home}
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
