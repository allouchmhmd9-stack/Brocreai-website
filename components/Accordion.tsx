"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/content/faq";
import { cn } from "@/lib/utils";

/**
 * Questions that open in place. All start closed so the section stays short; clicking a
 * question drops its answer down (and closes the one that was open). Keyboard and screen
 * reader friendly: each question is a button that reports whether its answer is showing.
 */
export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId().replace(/:/g, "");
  return (
    <div className="divide-y divide-cardborder/40">
      {items.map((it, i) => {
        const isOpen = open === i;
        const btn = `${base}-q-${i}`;
        const panel = `${base}-a-${i}`;
        return (
          <div key={it.q} data-anim="rise">
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className={cn("text-[1.15rem] font-semibold leading-snug tracking-[-0.015em] transition-colors md:text-[1.25rem]", isOpen ? "text-white" : "text-white/90 group-hover:text-white")}>
                  {it.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ring-inset transition-[background-color,box-shadow] duration-300",
                    isOpen ? "bg-accent ring-accent" : "bg-card/70 ring-cardborder/70 group-hover:ring-accent/70",
                  )}
                >
                  <span className="absolute h-[2px] w-3.5 rounded-full bg-white" />
                  <span className={cn("absolute h-3.5 w-[2px] rounded-full bg-white transition-transform duration-300 ease-out", isOpen && "scale-y-0")} />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <div className="overflow-hidden">
                <p className="body pb-7 pr-12">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
