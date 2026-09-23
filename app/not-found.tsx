import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { Arrow } from "@/components/slip/Parts";
import { Stamp } from "@/components/slip/Stamp";
import { getDictionary } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

const d = getDictionary();

export const metadata: Metadata = {
  title: d.notFound.metaTitle,
  robots: { index: false, follow: true },
};

// A form that was never issued: the sheet is printed, the reference is void.
export default function NotFound() {
  return (
    <section className="pt-16">
      <div className="wrap py-10 md:py-16">
        <div className="sheet crops grid gap-10 px-5 py-10 sm:px-8 md:grid-cols-12 md:px-12 md:py-16">
          <div className="md:col-span-8">
            <p className="lbl-ref">Form {d.notFound.code} · Not issued</p>
            <h1 className="display mt-6 text-[clamp(2.4rem,5.4vw,4.6rem)]">{d.notFound.title}</h1>
            <p className="lead mt-6">{d.notFound.body}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
          <div className="flex items-center justify-start md:col-span-4 md:justify-end">
            <Stamp ring="Void · not issued · 404" center="VOID" tone="white" size={200} rotate={-14} className="opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
