# Brocare AI website

Marketing site for Brocare AI, a separate company from Brocare Insurance Brokerage.
Next.js (App Router), TypeScript, Tailwind, Framer Motion. No database, no login.

## Run locally

```bash
npm install
cp .env.example .env.local     # then edit
npm run dev                    # http://localhost:3000
```

To try the demo form without an email key: put `LEAD_DRY_RUN=1` in `.env.local`.

## Checks

```bash
npm run typecheck && npm run lint && npm test && npm run build
```

## Deploy (Vercel)

1. Import the repository in Vercel. Framework preset: Next.js. No build settings to change.
2. Add the environment variables from `.env.example` (Settings > Environment Variables).
3. Add the domain (Settings > Domains) and set `NEXT_PUBLIC_SITE_URL` to it. Only then does the site allow indexing.

## Where things live

| Path | What |
|---|---|
| `lib/site.ts` | Phone, WhatsApp, email, address. Shared with the brokerage site. Change contact details here only. |
| `lib/i18n/` | Copy. `en.ts` is the source; `fr.ts` overrides keys as French is written. |
| `app/api/lead/route.ts` | Demo form endpoint: validation, rate limit, Resend email. |
| `lib/leads/notify.ts` | Stub where the WhatsApp intake agent plugs in later. |
| `next.config.mjs` | Security headers and Content-Security-Policy. |

## Security notes

- The form is the only input a stranger can send. It is same-origin only, size-capped,
  validated on the server, rate limited, honeypotted, and HTML-escaped in the email.
- The rate limiter is in memory. On serverless it is per instance, so treat it as a
  speed bump and add Vercel's WAF rate limiting before running paid traffic.
- No secret is ever sent to the browser. The Resend key is read on the server only.
