import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Arrow } from "@/components/slip/Parts";
import { getDictionary } from "@/lib/i18n";
import { bookingUrl, contact, whatsappLink } from "@/lib/site";
import { forms } from "@/lib/slip";
import { ogImages } from "@/lib/og";

const d = getDictionary();
const demo = d.demo;

export const metadata: Metadata = {
  title: demo.metaTitle,
  description: demo.metaDescription,
  alternates: { canonical: "/demo" },
  openGraph: { title: `${demo.metaTitle} | Brocare AI`, description: demo.metaDescription, url: "/demo", images: ogImages },
};

export default function DemoPage() {
  const office = [
    { label: demo.call, value: contact.phoneDisplay, href: contact.phoneHref },
    { label: demo.email, value: contact.email, href: contact.emailHref },
    { label: demo.visit, value: contact.address, href: contact.mapUrl, external: true },
    { label: demo.hoursLabel, value: contact.hours },
  ];
  return (
    <>
      <PageHero form={forms.demo} crumb={d.nav.demo} path="/demo" title={demo.title} lead={demo.lead} />
      <section aria-label={demo.metaTitle} className="pb-24 pt-10 md:pb-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <LeadForm f={demo.form} waText={demo.whatsappPrefill} />
          </div>

          <aside className="lg:col-span-5">
            <div data-anim="rise">
              <h2 className="h3">{demo.afterTitle}</h2>
              <p className="body mt-3">{demo.afterBody}</p>
            </div>

            <div data-anim="rise" className="mt-10">
              {bookingUrl ? (
                <>
                  <p className="text-textsec">{demo.bookLead}</p>
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-4">
                    {demo.bookCta}
                    <Arrow />
                  </a>
                </>
              ) : null}
              <p className={bookingUrl ? "mt-8 text-textsec" : "text-textsec"}>{bookingUrl ? demo.orLead : demo.whatsappLead}</p>
              <a href={whatsappLink(demo.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-4">
                <WhatsAppIcon className="h-5 w-5" />
                {demo.whatsappCta}
              </a>
            </div>

            <dl data-anim="rise" className="mt-10 rounded-3xl bg-card/40 px-5 py-2 ring-1 ring-inset ring-cardborder/40">
              {office.map((o) => (
                <div key={o.label} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b hair py-3.5 last:border-b-0">
                  <dt className="lbl pt-0.5">{o.label}</dt>
                  <dd className="entry text-[0.8rem] leading-relaxed text-white">
                    {o.href ? (
                      <a href={o.href} {...(o.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="ln break-words">
                        {o.value}
                      </a>
                    ) : (
                      o.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
