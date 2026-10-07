import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import { brokerage, contact, whatsappLink } from "@/lib/site";

// The foot of the page: issuer, pages, contact and legal in soft columns, then the small print.
export function Footer({ footer, nav }: { footer: Dictionary["footer"]; nav: Dictionary["nav"] }) {
  const year = new Date().getFullYear();
  const pages = [
    { href: "/engines", label: nav.engines },
    { href: "/agents", label: nav.agents },
    { href: "/about", label: nav.about },
    { href: "/case-study", label: nav.caseStudy },
    { href: "/faq", label: nav.faq },
    { href: "/demo", label: nav.demo },
  ];
  const legal = [
    { href: "/privacy", label: footer.privacy },
    { href: "/terms", label: footer.terms },
    { href: "/cookies", label: footer.cookies },
    { href: "/refunds", label: footer.refunds },
  ];
  return (
    <footer className="mt-10 rounded-t-[2.5rem] bg-mid">
      <div className="wrap grid gap-x-8 gap-y-12 py-14 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href="/" aria-label={nav.home} className="inline-flex items-center gap-2.5">
            <Image src="/logo/brocare-ai-logo.png" alt="" width={483} height={203} className="h-16 w-auto" />
          </Link>
          <p className="mt-6 max-w-[34ch] text-[0.95rem] leading-relaxed text-textsec">
            {footer.initiative}{" "}
            <a href={brokerage.url} target="_blank" rel="noopener noreferrer" className="ln text-white">
              {brokerage.name}
            </a>
          </p>
          <address className="entry mt-5 text-[0.76rem] not-italic leading-relaxed text-textsec">
            <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="ln">
              {contact.address}
            </a>
            <br />
            {contact.hours}
          </address>
        </div>

        <nav aria-labelledby="footer-pages" className="lg:col-span-2 lg:col-start-6">
          <h2 id="footer-pages" className="lbl">
            {footer.pagesHeading}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {pages.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="ln text-[0.95rem] text-textsec">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <h2 className="lbl">{footer.contactHeading}</h2>
          <ul className="mt-4 space-y-2.5 text-[0.95rem]">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="ln text-textsec">
                WhatsApp
              </a>
              <span className="entry block text-[0.72rem] text-textsec/80">{contact.whatsappDisplay}</span>
            </li>
            <li>
              <a href={contact.phoneHref} className="ln text-textsec">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="ln break-all text-textsec">
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
        <nav aria-labelledby="footer-legal" className="lg:col-span-2">
          <h2 id="footer-legal" className="lbl">
            {footer.legalHeading}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="ln text-[0.95rem] text-textsec">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        <div className="wrap flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="lbl-ref">
            © {year} {brokerage.name} {footer.rights}
          </p>
          <p className="lbl-ref">End of schedule</p>
        </div>
      </div>
    </footer>
  );
}
