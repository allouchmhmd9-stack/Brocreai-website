import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/lib/i18n";
import { brokerage, contact, hasProductionDomain, siteName, siteUrl } from "@/lib/site";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["600", "700", "800"],
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

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
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <head>
        {/* Reveals start hidden; without JavaScript they must stay visible. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="font-body">
        <span id="top" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-3 w-px" />
        <a href="#main" className="skip-link">
          {dict.nav.skip}
        </a>
        <Header nav={dict.nav} whatsappText={dict.demo.whatsappPrefill} />
        <main id="main">{children}</main>
        <Footer footer={dict.footer} nav={dict.nav} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </body>
    </html>
  );
}
