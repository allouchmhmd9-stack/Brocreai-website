import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons";
import { Segs } from "@/components/Segs";
import { Arrow } from "@/components/slip/Parts";
import { getDictionary } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

// The close of every page: the signature block. A signature writes itself onto the line as
// you arrive, and the action sits on that line.
export function CtaBand({ lead }: { lead?: string }) {
  const d = getDictionary();
  return (
    <section aria-labelledby="sign-title" className="section bg-flow">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 id="sign-title" data-anim="lines" className="display text-[clamp(2.3rem,5vw,4.4rem)]">
              <Segs segs={d.closing.title} />
            </h2>
            <p data-anim="rise" className="lead mt-6">
              {lead ?? d.closing.lead}
            </p>
          </div>

          <div data-scrub-root className="flex flex-col justify-end lg:col-span-5">
            <div className="relative">
              <svg aria-hidden="true" viewBox="0 0 320 110" className="h-24 w-full text-white md:h-28" fill="none">
                <path
                  data-scrub-draw
                  d="M14 80 C 22 44, 40 16, 48 34 C 56 52, 34 86, 28 72 C 22 58, 52 50, 66 58 C 78 65, 70 82, 82 74 C 94 66, 98 42, 108 48 C 118 54, 104 80, 118 77 C 132 74, 134 50, 146 53 C 157 56, 147 76, 160 74 C 176 71, 178 42, 194 47 C 205 51, 193 73, 206 72 C 222 70, 228 38, 244 42 C 256 46, 244 72, 260 70 C 276 68, 286 54, 306 52"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path data-scrub-draw d="M38 92 C 120 84, 214 82, 304 74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              </svg>
              <div className="flex items-end gap-3 border-b border-white/70 pb-1">
                <span className="text-xl font-bold text-accent">X</span>
              </div>
              <p className="lbl mt-2">Sign here: a 20-minute call</p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link href="/demo" className="btn btn-primary">
                {d.nav.demo}
                <Arrow />
              </Link>
              <a href={whatsappLink(d.demo.whatsappPrefill)} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <WhatsAppIcon className="h-5 w-5" />
                {d.nav.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
