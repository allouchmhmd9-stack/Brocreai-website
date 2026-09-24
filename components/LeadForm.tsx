"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { InfoIcon, WhatsAppIcon } from "@/components/icons";
import { Arrow, Tile } from "@/components/slip/Parts";
import type { Dictionary } from "@/lib/i18n";
import { LIMITS, validateLead, type FieldErrors, type LeadField } from "@/lib/leads/validate";
import { whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error" | "rate";
type FormDict = Dictionary["demo"]["form"];

function Notice({ title, body, waText }: { title: string; body: string; waText?: string }) {
  return (
    <div role="alert" className="flex gap-3 rounded-2xl bg-deep/60 p-4 text-sm ring-1 ring-inset ring-textsec/40">
      <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-textsec" />
      <div>
        <p className="font-semibold text-white">{title}</p>
        {body ? <p className="mt-1 text-textsec">{body}</p> : null}
        {waText ? (
          <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="ln mt-2 inline-flex items-center gap-2 text-white">
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  );
}

// The demo request as a printed proposal form: numbered parts, labels set inside each box,
// a declaration tick box, and a stamp when it has been received.
export function LeadForm({ f, waText }: { f: FormDict; waText?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const renderedAt = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const msg = (field: LeadField | "consent") => {
    const code = errors[field];
    return code ? f.errors[code] : undefined;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = validateLead({
      name: fd.get("name"),
      company: fd.get("company"),
      role: fd.get("role"),
      country: fd.get("country"),
      contact: fd.get("contact"),
      message: fd.get("message"),
      consent: fd.get("consent") === "on",
    });
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("idle");
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.value,
          consent: true,
          website: String(fd.get("website") ?? ""),
          elapsed: Date.now() - renderedAt.current,
        }),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (res.status === 429) {
        setStatus("rate");
        return;
      }
      if (res.status === 400) {
        const data = (await res.json().catch(() => null)) as { errors?: FieldErrors } | null;
        if (data?.errors) {
          setErrors(data.errors);
          setStatus("idle");
          return;
        }
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="sheet p-6 sm:p-8 md:p-10">
        <div ref={successRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-6 outline-none sm:flex-row sm:items-center">
          <Tile size="lg" tone="ice" className="h-16 w-16 [&_svg]:h-8 [&_svg]:w-8">
            <Check strokeWidth={2.2} />
          </Tile>
          <div>
            <p className="text-[1.8rem] font-bold tracking-[-0.02em]">{f.successTitle}</p>
            <p className="mt-2 text-textsec">{f.successBody}</p>
            <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary btn-sm mt-6">
              {f.again}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={onSubmit} noValidate className="sheet relative">
      <div className="px-5 pt-6 sm:px-7">
        <p className="lbl">About you</p>
      </div>
      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7">
        <Field id="name" label={f.name} error={msg("name")} auto="name" max={LIMITS.name} />
        <Field id="company" label={f.company} error={msg("company")} auto="organization" max={LIMITS.company} />
        <Field id="role" label={f.role} error={msg("role")} auto="organization-title" max={LIMITS.role} />
        <Field id="country" label={f.country} error={msg("country")} auto="country-name" max={LIMITS.country} />
        <div className="sm:col-span-2">
          <Field id="contact" label={f.contact} error={msg("contact")} auto="email" max={LIMITS.contact} />
        </div>
      </div>

      <div className="px-5 pt-3 sm:px-7">
        <p className="lbl">The work</p>
      </div>
      <div className="p-5 sm:p-7">
        <label htmlFor="message" className="fbox" data-invalid={errors.message ? "true" : undefined}>
          <span className="lbl">{f.message}</span>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={LIMITS.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : "message-hint"}
            className="finput resize-y"
          />
        </label>
        {errors.message ? (
          <p id="message-error" className="mt-2 flex items-center gap-2 text-sm text-white">
            <InfoIcon className="h-4 w-4 shrink-0 text-textsec" />
            {msg("message")}
          </p>
        ) : (
          <p id="message-hint" className="entry mt-2 text-[0.74rem] text-textsec">
            {f.messageHint}
          </p>
        )}
      </div>

      <div className="px-5 sm:px-7">
        <p className="lbl">Consent</p>
      </div>
      <div className="space-y-5 p-5 sm:p-7">
        <div>
          <label htmlFor="consent" className="flex cursor-pointer items-start gap-3">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              required
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-accent text-transparent transition-colors peer-checked:bg-primary peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ice"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <span className="text-sm leading-relaxed text-textsec">
              {f.consentLabel}{" "}
              <Link href="/privacy" className="ln text-white">
                {f.consentLink}
              </Link>
            </span>
          </label>
          {errors.consent ? (
            <p id="consent-error" className="mt-2 flex items-center gap-2 text-sm text-white">
              <InfoIcon className="h-4 w-4 shrink-0 text-textsec" />
              {msg("consent")}
            </p>
          ) : null}
        </div>

        {/* Honeypot: people never see it, bots fill it in. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div aria-live="polite" className="space-y-3">
          {hasErrors ? <Notice title={f.fixTitle} body="" /> : null}
          {status === "error" ? <Notice title={f.errorTitle} body={f.errorBody} waText={waText} /> : null}
          {status === "rate" ? <Notice title={f.rateTitle} body={f.rateBody} waText={waText} /> : null}
        </div>

        <button type="submit" disabled={status === "sending"} aria-busy={status === "sending"} className="btn btn-primary w-full sm:w-auto">
          {status === "sending" ? f.sending : f.submit}
          <Arrow />
        </button>
      </div>
    </form>
  );
}

function Field({ id, label, error, auto, max }: { id: string; label: string; error?: string; auto: string; max: number }) {
  return (
    <div>
      <label htmlFor={id} className="fbox" data-invalid={error ? "true" : undefined}>
        <span className="lbl">{label}</span>
        <input
          id={id}
          name={id}
          type="text"
          autoComplete={auto}
          maxLength={max}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="finput"
        />
      </label>
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-2 text-sm text-white">
          <InfoIcon className="h-4 w-4 shrink-0 text-textsec" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
