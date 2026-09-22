"use client";

import { useEffect } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { getDictionary } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const d = getDictionary();
  useEffect(() => {
    console.error(error.digest ?? error.name);
  }, [error]);

  return (
    <section className="flex min-h-[70svh] items-center pt-24">
      <div className="container-x py-20">
        <h1 className="max-w-[18ch] font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          {d.error.title}
        </h1>
        <p className="mt-5 max-w-md text-lg text-textsec">{d.error.body}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            {d.error.retry}
          </button>
          <a
            href={whatsappLink(d.demo.whatsappPrefill)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {d.nav.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
