import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const pages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/engines", priority: 0.9, freq: "monthly" },
  { path: "/engines/accounting", priority: 0.8, freq: "monthly" },
  { path: "/engines/outreach", priority: 0.8, freq: "monthly" },
  { path: "/engines/marketing", priority: 0.8, freq: "monthly" },
  { path: "/agents", priority: 0.9, freq: "monthly" },
  { path: "/about", priority: 0.7, freq: "monthly" },
  { path: "/case-study", priority: 0.6, freq: "monthly" },
  { path: "/faq", priority: 0.7, freq: "monthly" },
  { path: "/demo", priority: 0.8, freq: "monthly" },
  { path: "/privacy", priority: 0.3, freq: "yearly" },
  { path: "/terms", priority: 0.3, freq: "yearly" },
  { path: "/cookies", priority: 0.2, freq: "yearly" },
  { path: "/refunds", priority: 0.2, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map((p) => ({ url: `${siteUrl}${p.path}`, lastModified: now, changeFrequency: p.freq, priority: p.priority }));
}
