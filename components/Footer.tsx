import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import { brokerage, contact, whatsappLink } from "@/lib/site";

export function Footer({ footer, nav }: { footer: Dictionary["footer"]; nav: Dictionary["nav"] }) {
  const year = new Date().getFullYear();
  const pages = [
    { href: "/bundles", label: nav.bundles },
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
    <footer className="border-t border-cardborder/50 bg-deep">
      <div className="container-x grid gap-10 py-12 text-sm text-textsec md:grid-cols-4">
        <div className="space-y-3">
          <p>
            {footer.initiative}{" "}
            <a href={brokerage.url} target="_blank" rel="noopener noreferrer" className="link-underline text-white">
              {brokerage.name}
            </a>
          </p>
          <address className="not-italic leading-relaxed">
            <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white">
              {contact.address}
            </a>
            <br />
            {contact.hours}
          </address>
        </div>
        <nav aria-labelledby="footer-pages">
          <h2 id="footer-pages" className="font-semibold text-white">{footer.pagesHeading}</h2>
          <ul className="mt-3 space-y-2">
            {pages.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-semibold text-white">{footer.contactHeading}</h2>
          <ul className="mt-3 space-y-2">
            <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-white">WhatsApp {contact.whatsappDisplay}</a></li>
            <li><a href={contact.phoneHref} className="link-underline hover:text-white">{contact.phoneDisplay}</a></li>
            <li><a href={contact.emailHref} className="link-underline break-all hover:text-white">{contact.email}</a></li>
          </ul>
        </div>
        <nav aria-labelledby="footer-legal">
          <h2 id="footer-legal" className="font-semibold text-white">{footer.legalHeading}</h2>
          <ul className="mt-3 space-y-2">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-cardborder/30">
        <p className="container-x py-5 text-xs text-textsec">© {year} {brokerage.name} {footer.rights}</p>
      </div>
    </footer>
  );
}
