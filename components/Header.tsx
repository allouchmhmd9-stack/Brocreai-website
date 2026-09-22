"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/icons";
import { LiquidButton } from "@/components/ui/liquid-button";
import type { Dictionary } from "@/lib/i18n";
import { whatsappLink } from "@/lib/site";

const LINKS = [
  { key: "bundles", href: "/bundles" },
  { key: "agents", href: "/agents" },
  { key: "about", href: "/about" },
  { key: "faq", href: "/faq" },
] as const;

export function Header({ nav, whatsappText }: { nav: Dictionary["nav"]; whatsappText: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const wa = whatsappLink(whatsappText);

  useEffect(() => {
    const marker = document.getElementById("top");
    if (!marker || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(marker);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggleRef.current, ...(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])].filter((el): el is HTMLElement => Boolean(el));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b border-cardborder/60 bg-deep/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent"}`}>
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" aria-label={nav.home} className="flex shrink-0 items-end gap-2 rounded-lg">
          <Image src="/logo/brocare-ai-mark.png" alt="" width={479} height={165} priority className="h-8 w-auto md:h-9" />
          <span className="mb-px rounded-md border border-ice/60 px-1.5 py-0.5 font-display text-[0.65rem] font-bold leading-none tracking-[0.18em] text-ice">AI</span>
        </Link>

        <nav aria-label={nav.menuLabel} className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`link-underline text-[0.95rem] font-medium transition-colors hover:text-white focus-visible:text-white ${isActive(l.href) ? "text-white" : "text-textsec"}`}
            >
              {nav[l.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href={wa} target="_blank" rel="noopener noreferrer" aria-label={nav.whatsapp} className="grid h-11 w-11 place-items-center rounded-full text-textsec transition-colors hover:text-ice focus-visible:text-white">
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <div className="hidden lg:block">
            <LiquidButton href="/demo" variant="chrome" className="liquid-sm">{nav.demo}</LiquidButton>
          </div>
          <button ref={toggleRef} type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? nav.menuClose : nav.menuOpen} onClick={() => setOpen((v) => !v)} className="grid h-11 w-11 place-items-center rounded-full text-white lg:hidden">
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" ref={panelRef} className="menu-in fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-deep/95 backdrop-blur-xl lg:hidden">
          <nav aria-label={nav.menuLabel} className="container-x flex flex-col gap-1 py-6">
            {LINKS.map((l) => (
              <Link key={l.key} href={l.href} onClick={() => setOpen(false)} aria-current={isActive(l.href) ? "page" : undefined} className={`rounded-xl px-2 py-4 font-display text-2xl font-semibold ${isActive(l.href) ? "text-ice" : "text-white"}`}>
                {nav[l.key]}
              </Link>
            ))}
            <div className="mt-6 flex flex-col items-start gap-3">
              <LiquidButton href="/demo" variant="chrome">{nav.demo}</LiquidButton>
              <LiquidButton href={wa} external variant="ice">{nav.whatsapp}</LiquidButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
