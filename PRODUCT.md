# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Anyone who works in insurance and could become a client: brokerages, agencies, independent agents and insurers, in Lebanon, the wider Middle East and Africa. The site is often found by an employee who then recommends it upward, so it must make sense to a junior reader and still persuade the heads and managers of larger companies. Those target companies are never named, and titles never address brokers or brokerages directly ("insurers" is the acceptable light word; subtitles may name brokers, agents and insurers).

## Product Purpose

Brocare AI sells AI agents that do real insurance work: finding and scoring leads, researching prospects before calls, drafting follow-ups, producing quotes, proposals and pitch decks, morning briefs, market and regulatory intelligence, content, document work and inbox triage. The site's job is to get a qualified visitor to book a 30-minute demo (or message on WhatsApp). Success is a booked demo.

## Positioning

The agents were built and run inside a real insurance brokerage (Brocare Insurance Brokerage, Beirut) before being offered to anyone else. Brocare AI is an initiative of that brokerage. It is insurance-native, not a generic AI agency.

## Operating Context

- Delivered as agents grouped into bundles; bundles are only a guide and any agent can be added to any bundle.
- Nothing to install: access is given like a new hire (scoped dashboard login, OAuth or API), and can be revoked at any time.
- Every agent prepares work and hands it over for approval; nothing reaches a prospect automatically.
- Guarantee: the first workflow (one bundle, connected, producing real output) is live within two weeks of kickoff, or work continues free until it is.
- Next step after a demo is a paid Readiness Audit.
- Contact: WhatsApp +961 76 743 111, office +961 1 82 33 00, ali.m@brocareinsurance.com, Beirut, Ein El Tineh, Mousaitbeh 5046, 4th Floor. Mon to Fri 9:00 to 15:00.

## Capabilities and Constraints

- Next.js 15 App Router, React 19, TypeScript, Tailwind 3, framer-motion. Deployed on Vercel from GitHub `main`; redesign work stays local until the user approves.
- Pages: landing, /bundles, /agents, /about, /faq, /demo, /case-study (footer only, not in nav), privacy, terms, cookies, refunds, custom 404.
- 24 agents and 9 bundles, defined in `lib/content/agents.ts` and `lib/content/bundles.ts`. Only live agents are promised; NEW, pilot and coming-soon agents are labelled.
- Strict CSP in `next.config.mjs`; no cookies, analytics or trackers; fonts self-hosted.
- Demo form posts to `/api/lead` (Resend); consent checkbox required.

## Brand Commitments

- Palette is fixed: deep #05081A, mid #0A0F2E, primary #1A3BDB, accent #2D6FFF, gradient blue #1565C0, ice #4FC3F7 (reserved for live, proof and guarantee moments), secondary text #B0C4DE, card #0D1440, card border #1E3A6E. Blues only: no purple, red or orange.
- Fonts are open to change.
- No em dashes anywhere in copy.
- Exactly one emphasised (gradient) word per title.
- Landing-page copy may be reworked; deep pages (bundles, agents, FAQ, about, legal) keep copy pack v2 substantially as is, except for SEO improvements.
- Customer-facing agent names only (Lead Engine, Morning Brief, ...), never internal codenames.
- The Spline robot hero may stay, change, or be replaced by something better.

## Evidence on Hand

- The Brocare Insurance Brokerage itself as the proving ground, and a case study in `lib/content/pages.ts` (clients, insurers and reinsurers are never named), kept off the main nav.
- Real active relationships named in copy: DRC, Congo-Brazzaville, Nigeria, Cote d'Ivoire, Guinea.
- No testimonials, client logos, usage counts or benchmarks exist. None may be invented.

## Product Principles

1. Show the work, not the promise: every claim sits next to a concrete output an agent produces.
2. Control is the product: approval before anything goes out is stated wherever capability is.
3. A whole AI team, not a tool: breadth across the insurance workflow is the differentiator.
4. Insurance people talking to insurance people: specific, unglamorous, no hype vocabulary.
5. Truth over polish: nothing fabricated, statuses labelled honestly.

## Accessibility & Inclusion

WCAG 2.2 AA: keyboard-operable everything, visible focus, contrast on the dark ground, and `prefers-reduced-motion` respected for every animation and 3D scene.
