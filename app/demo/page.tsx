import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/PageHero";
import { LiquidButton } from "@/components/ui/liquid-button";
import { getDictionary } from "@/lib/i18n";
import { bookingUrl, contact, whatsappLink } from "@/lib/site";

const d = getDictionary();
const demo = d.demo;

export const metadata: Metadata = {
  title: demo.metaTitle,
  description: demo.metaDescription,
  alternates: { canonical: "/demo" },
  openGraph: { title: `${demo.metaTitle} | Brocare AI`, description: demo.metaDescription, url: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <PageHero crumb={d.nav.demo} path="/demo" title={demo.title} lead={demo.lead} />
      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-xl font-bold tracking-tight md:text-2xl">{demo.afterTitle}</h2>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-textsec">{demo.afterBody}</p>

            {bookingUrl ? (
              <>
                <p className="mt-8 text-textsec">{demo.bookLead}</p>
                <div className="mt-3"><LiquidButton href={bookingUrl} external variant="chrome">{demo.bookCta}</LiquidButton></div>
              </>
            ) : null}
            <p className="mt-8 text-textsec">{bookingUrl ? demo.orLead : demo.whatsappLead}</p>
            <div className="mt-3">
              <LiquidButton href={whatsappLink(demo.whatsappPrefill)} external variant={bookingUrl ? "ice" : "chrome"}>{demo.whatsappCta}</LiquidButton>
            </div>

            <ul className="mt-10 space-y-4 text-textsec">
              <li className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 shrink-0" />
                <span className="sr-only">{demo.call}</span>
                <a href={contact.phoneHref} className="link-underline text-white">{contact.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon className="h-5 w-5 shrink-0" />
                <span className="sr-only">{demo.email}</span>
                <a href={contact.emailHref} className="link-underline break-all text-white">{contact.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0" />
                <span className="sr-only">{demo.visit}</span>
                <span>
                  <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-white">{contact.address}</a>
                  <span className="mt-1 block text-sm"><span className="sr-only">{demo.hoursLabel}: </span>{contact.hours}</span>
                </span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <LeadForm f={demo.form} waText={demo.whatsappPrefill} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
