import { getDictionary } from "@/lib/i18n";

// A page that sets its own `openGraph` replaces the root one, which drops the image that
// app/opengraph-image.png provides. Every page that sets `openGraph` adds this back.
export const ogImages = [
  { url: "/opengraph-image.png", width: 1200, height: 630, alt: getDictionary().meta.ogAlt },
];
