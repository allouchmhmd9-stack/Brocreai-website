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
    <section className="pt-16">
      <div className="wrap py-10 md:py-16">
        <div className="py-6 md:py-10">
        <h1 className="display max-w-[18ch] text-[clamp(2.2rem,4.6vw,3.8rem)]">
          {d.error.title}
        </h1>
        <p className="lead mt-6">{d.error.body}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
      </div>
    </section>
  );
}
