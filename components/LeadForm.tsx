"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { InfoIcon, WhatsAppIcon } from "@/components/icons";
import type { Dictionary } from "@/lib/i18n";
import { LIMITS, validateLead, type FieldErrors, type LeadField } from "@/lib/leads/validate";
import { whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error" | "rate";
type FormDict = Dictionary["demo"]["form"];

function Notice({ title, body, waText }: { title: string; body: string; waText?: string }) {
  return (
    <div role="alert" className="flex gap-3 rounded-xl border border-textsec/40 bg-deep/60 p-4 text-sm">
      <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-ice" />
      <div>
        <p className="font-semibold text-white">{title}</p>
        {body ? <p className="mt-1 text-textsec">{body}</p> : null}
        {waText ? (
          <a
            href={whatsappLink(waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-2 inline-flex items-center gap-2 text-white"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  );
}

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
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
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
      <div className="glass p-6 sm:p-8 md:p-10">
        <div ref={successRef} tabIndex={-1} role="status" className="outline-none">
          <p className="font-display text-2xl font-bold md:text-3xl">{f.successTitle}</p>
          <p className="mt-3 text-textsec">{f.successBody}</p>
          <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary mt-8">
            {f.again}
          </button>
        </div>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form onSubmit={onSubmit} noValidate className="glass relative space-y-5 p-6 sm:p-8 md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={f.name} error={msg("name")} auto="name" max={LIMITS.name} />
        <Field id="company" label={f.company} error={msg("company")} auto="organization" max={LIMITS.company} />
        <Field id="role" label={f.role} error={msg("role")} auto="organization-title" max={LIMITS.role} />
        <Field id="country" label={f.country} error={msg("country")} auto="country-name" max={LIMITS.country} />
      </div>
      <Field id="contact" label={f.contact} error={msg("contact")} auto="email" max={LIMITS.contact} />

      <div>
        <label htmlFor="message" className="field-label">
          {f.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={LIMITS.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className="field-input resize-y"
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 flex items-center gap-2 text-sm text-white">
            <InfoIcon className="h-4 w-4 shrink-0 text-ice" />
            {msg("message")}
          </p>
        ) : (
          <p id="message-hint" className="mt-2 text-sm text-textsec">
            {f.messageHint}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-cardborder bg-deep accent-[#2d6fff]"
          />
          <label htmlFor="consent" className="cursor-pointer text-sm leading-relaxed text-textsec">
            {f.consentLabel}{" "}
            <Link href="/privacy" className="link-underline text-white">
              {f.consentLink}
            </Link>
          </label>
        </div>
        {errors.consent ? (
          <p id="consent-error" className="mt-2 flex items-center gap-2 text-sm text-white">
            <InfoIcon className="h-4 w-4 shrink-0 text-ice" />
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

      <div className="flex flex-col items-start gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending"}
          className="btn btn-primary shrink-0 whitespace-nowrap disabled:opacity-70"
        >
          {status === "sending" ? f.sending : f.submit}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  auto,
  max,
}: {
  id: string;
  label: string;
  error?: string;
  auto: string;
  max: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        autoComplete={auto}
        maxLength={max}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field-input"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-2 text-sm text-white">
          <InfoIcon className="h-4 w-4 shrink-0 text-ice" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
