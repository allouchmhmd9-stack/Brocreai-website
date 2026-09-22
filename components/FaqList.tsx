import type { FaqItem } from "@/lib/content/faq";

// Plain definition list: every answer visible, no accordion to open.
export function FaqList({ items, columns = false }: { items: FaqItem[]; columns?: boolean }) {
  return (
    <dl className={columns ? "grid gap-x-10 md:grid-cols-2" : ""}>
      {items.map((it) => (
        <div key={it.q} className="border-t border-cardborder/50 py-6">
          <dt className="font-display text-lg font-semibold leading-snug text-white md:text-xl">{it.q}</dt>
          <dd className="mt-3 max-w-[68ch] leading-relaxed text-textsec">{it.a}</dd>
        </div>
      ))}
    </dl>
  );
}
