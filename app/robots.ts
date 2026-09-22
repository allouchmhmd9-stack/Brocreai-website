import type { MetadataRoute } from "next";
import { hasProductionDomain, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!hasProductionDomain) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
