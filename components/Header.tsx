"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/icons";
import { Arrow } from "@/components/slip/Parts";
import type { Dictionary } from "@/lib/i18n";
import { contact, whatsappLink } from "@/lib/site";

const LINKS = [
  { key: "engines", href: "/engines" },
  { key: "bundles", href: "/bundles" },
  { key: "agents", href: "/agents" },
  { key: "about", href: "/about" },
  { key: "faq", href: "/faq" },
] as const;

export function Header({ nav, whatsappText }: { nav: Dictionary["nav"]; whatsappText: string }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const wa = whatsappLink(whatsappText);

  // Reading progress: a thin accent line under the header that fills as the page is read.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

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
      const items = [toggleRef.current, ...(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])].filter(
        (el): el is HTMLElement => Boolean(el),
      );
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
    <header className="fixed inset-x-0 top-0 z-50 bg-deep/[0.9] shadow-[0_1px_0_rgba(30,58,110,0.35)]">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label={nav.home} className="group flex shrink-0 items-center gap-2.5">
          <Image src="/logo/brocare-ai-mark.png" alt="" width={483} height={164} priority className="h-9 w-auto transition-opacity group-hover:opacity-85 md:h-10" />
        </Link>

        <nav aria-label={nav.menuLabel} className="hidden h-full items-stretch lg:flex">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.key}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`group relative flex items-center px-4 text-[0.95rem] font-medium transition-colors hover:text-white ${active ? "text-white" : "text-textsec"}`}
              >
                {nav[l.key]}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-4 -bottom-px h-[2px] origin-left bg-accent transition-transform duration-500 ease-out ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={nav.whatsapp}
            className="grid h-11 w-11 place-items-center text-textsec transition-colors hover:text-white"
          >
            <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
          </a>
          <Link href="/demo" className="btn btn-primary btn-sm hidden lg:inline-flex">
            {nav.demo}
            <Arrow />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.menuClose : nav.menuOpen}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center text-white lg:hidden"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      <div ref={progressRef} aria-hidden="true" className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent" />

      {open && (
        <div id="mobile-menu" ref={panelRef} className="menu-in fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-deep lg:hidden">
          <nav aria-label={nav.menuLabel} className="wrap flex min-h-full flex-col py-6">
            <ul>
              {LINKS.map((l) => (
                <li key={l.key}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`flex items-center justify-between py-5 text-[2rem] font-bold tracking-tight ${isActive(l.href) ? "text-white" : "text-textsec"}`}
                    style={{ fontStretch: "104%" }}
                  >
                    {nav[l.key]}
                    <Arrow className="h-6 w-6 text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/demo" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                {nav.demo}
                <Arrow />
              </Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-full">
                <WhatsAppIcon className="h-5 w-5" />
                {nav.whatsapp}
              </a>
            </div>
            <p className="lbl-ref mt-auto pt-10">
              {contact.phoneDisplay} · {contact.hours}
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
