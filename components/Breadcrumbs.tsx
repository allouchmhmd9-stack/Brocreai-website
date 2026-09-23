import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

// Visible trail plus matching BreadcrumbList structured data.
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  const nav = getDictionary().nav;
  const items = [{ name: nav.homeCrumb, path: "/" }, ...trail];
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path === "/" ? "/" : it.path}`,
    })),
  }).replace(/</g, "\\u003c");

  return (
    <nav aria-label={nav.breadcrumb} className="lbl-ref">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true" className="text-cardborder">/</span> : null}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-white">
                {it.name}
              </span>
            ) : (
              <Link href={it.path} className="ln">
                {it.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </nav>
  );
}
