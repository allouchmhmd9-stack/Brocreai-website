import type { Metadata } from "next";
import Link from "next/link";
import { Aurora } from "@/components/Aurora";
import { WhatsAppIcon } from "@/components/icons";
import { getDictionary } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

const d = getDictionary();

export const metadata: Metadata = {
  title: d.notFound.metaTitle,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden pt-24">
      <Aurora />
      <div className="container-x relative py-20">
        <p aria-hidden="true" className="font-display text-[clamp(5rem,22vw,14rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-white/10">
          {d.notFound.code}
        </p>
        <h1 className="mt-6 max-w-[18ch] font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          {d.notFound.title}
        </h1>
        <p className="mt-5 max-w-md text-lg text-textsec">{d.notFound.body}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            {d.notFound.home}
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
