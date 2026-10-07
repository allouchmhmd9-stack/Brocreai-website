import type { Metadata, Viewport } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ButtonRipple } from "@/components/motion/ButtonRipple";
import { Choreographer } from "@/components/motion/Choreographer";
import { InkDefs } from "@/components/slip/Stamp";
import { getDictionary } from "@/lib/i18n";
import { brokerage, contact, hasProductionDomain, siteName, siteUrl } from "@/lib/site";

// Archivo carries the whole voice through its width axis: condensed caps for the printed
// field labels, normal for reading, slightly expanded and heavy for the display lines.
// Martian Mono is the typewriter: every entry an agent or a person writes onto the slip.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const mono = Martian_Mono({ subsets: ["latin"], axes: ["wdth"], variable: "--font-mono", display: "swap" });

// Runs before first paint: opt into entrance motion only when the visitor allows it, and
// restore everything if the choreographer has not started within four seconds.
const motionGate = `(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion');setTimeout(function(){if(!window.__choreo)d.classList.add('motion-done')},4000)}catch(e){}})();`;

const dict = getDictionary();

export const viewport: Viewport = {
  themeColor: "#05081A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: dict.meta.title, template: `%s | ${siteName}` },
  description: dict.meta.description,
  applicationName: siteName,
  creator: brokerage.name,
  publisher: brokerage.name,
  // Locked out of search until a real domain is set (see .env.example).
  robots: hasProductionDomain ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en",
    siteName,
    title: dict.meta.title,
    description: dict.meta.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: dict.meta.title, description: dict.meta.description },
  formatDetection: { telephone: false, email: false, address: false },
};

// Organisation, local business and website, linked by @id so search engines read them
// as one entity. Only facts that are true today: no ratings, no reviews.
const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/logo/brocare-ai-mark.png`,
      description: dict.meta.description,
      email: contact.email,
      telephone: "+96118233300",
      parentOrganization: { "@type": "Organization", name: brokerage.name, url: brokerage.url },
      knowsAbout: ["insurance brokerage", "insurance lead generation", "insurance quoting", "AI agents"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: "+96176743111",
          email: contact.email,
          availableLanguage: ["en", "fr"],
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#localbusiness`,
      name: siteName,
      url: siteUrl,
      image: `${siteUrl}/opengraph-image.png`,
      telephone: "+96118233300",
      email: contact.email,
      parentOrganization: { "@id": `${siteUrl}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mousaitbeh 5046, 4th Floor, Ein El Tineh",
        addressLocality: "Beirut",
        addressCountry: "LB",
      },
      geo: { "@type": "GeoCoordinates", latitude: 33.882563, longitude: 35.481999 },
      hasMap: contact.mapUrl,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "15:00",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
}).replace(/</g, "\\u003c");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body className="font-sans">
        <InkDefs />
        <span id="top" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-3 w-px" />
        <a href="#main" className="skip-link">
          {dict.nav.skip}
        </a>
        <Header nav={dict.nav} whatsappText={dict.demo.whatsappPrefill} />
        <main id="main">{children}</main>
        <Footer footer={dict.footer} nav={dict.nav} />
        <Choreographer />
        <ButtonRipple />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </body>
    </html>
  );
}
