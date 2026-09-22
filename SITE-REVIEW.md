# Brocare AI: full site review (design + copy), one document

Written 2026-09-21. Supersedes `DESIGN-REVIEW.md` (applied) and `COPY-REVIEW.md` (merged in
here as Part B). Audited against the live build after the first design pass, using the
taste-skill and redesign-skill audits plus the copywriting, anti-slop and SEO passes.

## How to use this document

Every proposal has an ID. Next to each, write `KEEP`, `A` / `B` / `C`, or `EDIT: your words`.
Unmarked = KEEP. Send the marked-up file back and say "apply SITE-REVIEW.md as marked".
Nothing in this file has been applied to the site.

Two rules the implementer must hold: **no invented proof** (no counts, no testimonials, no
"trusted by"; `[needs number]` where a number is missing) and **only LIVE agents are promised**.

**Design read:** B2B agency landing for insurance-brokerage owners in Lebanon, the Gulf and
Africa; dark-tech language locked to the Brocare blues; Next + Tailwind + restrained Motion.
Dials: variance 7, motion 5, density 3. Mode: redesign, preserve brand. The brand brief fixes
the palette, the glow-not-shadow rule, the gradient words and the aurora, so those are kept
and calibrated, not removed.

---

# PART A: DESIGN

## A1. What still reads as AI-made, and why

The first pass fixed the broken things (guarantee overlap, logo tagline, em-dash orphan). What
is left is the set of patterns the taste audit flags as templated. In order of how much a
visitor notices:

1. **No real image anywhere.** The page is type, gradient blobs and glass panels. A text-only
   marketing page reads as a placeholder no matter how good the type is. This is the single
   largest change available.
2. **Hero headline is four lines at 1440.** The rule is two. The copy fix (Part B, H1) does
   most of the work; the type fix (A3) does the rest.
3. **Every section heading uses the same device**: four to six words, one gradient word, full
   stop. Gradient on every H2 turns the brand's emphasis move into wallpaper.
4. **How It Works is three equal columns.** The most recognisable AI layout on the web.
5. **Hero top padding is 10rem** (`md:pt-40`); the cap is 6rem. Content floats.
6. **The "What we run" rail I added is a fifth hero element** and an uppercase eyebrow. The
   hero should carry at most four text elements; the rail belongs below.
7. **Hand-rolled SVG icons** in `components/icons.tsx` (WhatsApp, arrow, phone, mail, pin,
   info, menu). Fine at a glance; an icon library is more consistent and less work to extend.
8. **Two different labels for the same intent**: "Book a Demo" (nav, hero, form) and "Book a
   Readiness Audit" (model section), plus "Message us on WhatsApp". One label per intent.
9. **Detail lines joined with middle dots** (`a · b · c`) in the copy I proposed. Rationed to
   one per line.
10. **Em dash in the headline** and a few in body copy. The taste audit bans them outright as
    the loudest single tell. Your original brief line contains one, so this is your call.

What is *not* a problem and stays: dark theme locked page-wide, one accent, pill buttons +
16px cards as the documented radius rule, ice focus rings, grain at 3%, reduced-motion
support, the staircase, the glass guarantee panel, Syne + Inter (Inter is body-only and
brief-mandated).

## A2. Real images: the one structural addition. ID D1

Three placements, all real, none stock:

- **D1-hero:** a real screenshot of the product. Best candidate: a HERALD morning brief or a
  HUNTER lead card in the dashboard, cropped to a phone or a narrow desktop panel, placed on
  the right half of the hero where the rail is now. It is proof that the thing exists, which
  is the proof the page currently lacks. Needs: one screenshot from the live dashboard with
  client data blurred, or from a staging tenant.
  - **A:** phone-framed screenshot (the dashboard spec is phone-first; matches "Ali does this
    from his phone").
  - **B:** desktop panel, no frame, tilted 4 degrees, glow behind it.
  - **C:** no image; keep the rail. (Weakest.)
- **D1-bundles:** one small real output per bundle row, 160px tall, right-aligned: a lead
  card, an outreach draft in the approval queue, a TAILOR deck page, a HERALD brief, a quote
  from the Health Quoter, an ECHO post. Six crops from real outputs. Rows without an image
  get none (do not fake).
- **D1-demo:** a photograph of the Ein El Tineh office or the team. Optional; only if a real
  photo exists. If not, skip; no stock.

If no screenshots can be produced this week, the implementer leaves labelled slots
(`{/* TODO: hero screenshot 1200x900 */}`) and the page ships without them rather than with
fake ones.

## A3. Hero. ID D2

- Top padding: `md:pt-40` -> `md:pt-24`. Mobile `pt-32` -> `pt-28`.
- Headline: 2 lines max at 1440 with the chosen H1 (Part B). Type: `font-extrabold` ->
  `font-bold`, tracking `-0.03em` -> `-0.02em`, size `clamp(2.15rem,5vw,4.5rem)` ->
  `clamp(2.1rem,4.4vw,4rem)`, `max-w-[17ch]` -> `max-w-[14ch]`.
- Hero stack: headline, subtext (max 20 words; the Part B H2 options are longer, so the
  implementer trims to the first sentence and moves the rest to the bundles lead), two CTAs.
  Nothing else. **Rail removed** (D1-hero takes its place, or nothing).
- Subline placement: keep the offset (`md:col-start-6`); it is the one asymmetry that works.
- Gradient: stays on the H1 emphasis word only.

## A4. Section headings and the gradient rule. ID D3

- Gradient words appear in exactly two places: the H1 and the guarantee H2. Every other H2 is
  plain white. (Removes the "same trick" tell; keeps the brand motif where it means something.)
- H2s become topic headings per Part B; the slogan line sits under them in white body type.
- Section H2 size: `clamp(2.1rem,5.2vw,4.5rem)` -> `clamp(1.9rem,3.6vw,3.2rem)`. Big display
  type is for the hero; sections should not compete with it.
- Eyebrows: the only uppercase micro-label left on the page is the optional "Sales
  Enablement" grouping above bundle rows 1-3, if you take it. The `01`-`05` stage numbers on
  the staircase are numerals on cards, not eyebrows; they stay.

## A5. How It Works: replace the three columns. ID D4

- **A (recommended):** vertical list, three rows, each `grid-cols-[4rem_1fr]`: the outlined
  numeral in the narrow column, title + body in the wide one, a hairline between rows. The
  gradient rule above each column is dropped. Reads as a sequence, which it is.
- **B:** two columns: steps 1-2 stacked left, step 3 right with the approval-queue screenshot
  (from D1) beside it.

## A6. Bundles rows. ID D5

Structure from the first pass stays (sticky heading left, staggered rows right, rows are
links). Adjustments:
- Six rows per Part B, Lead Generation first, in-build chip on Marketing & Content only.
- Detail lines: comma-separated, no middle-dot chains.
- Row image slot (D1-bundles) right-aligned inside the row at `lg`, hidden below `md`.
- Hover: keep glow + arrow. Add `active:scale-[0.99]` for press feedback.

## A7. Model / engagement. ID D6

- Staircase stays. Stage numbers stay (`01`..`05`, Inter tabular).
- CTA label unified (see A9). The readiness-audit offer becomes the section's lead sentence
  and the button says the same thing as every other button.
- Add the custom-work paragraph (Part B, M2) under the stairs in body type, max 65ch.

## A8. FAQ. ID D7

New section between Model and Demo. Plain `<dl>`, six items, question in Syne 600 at
`text-xl`, answer in body type, one hairline between items. No accordion; everything visible.

## A9. One label per intent. ID D8

- Primary contact intent: **one** label everywhere. **A:** `Book a demo` (nav, hero primary,
  model CTA, form submit). **B:** `Book a 20-minute demo` (same places).
- WhatsApp is a channel, not a second intent: its buttons keep `Message us on WhatsApp`
  because the action is different (opens WhatsApp, not the form).
- `See how it works` (hero secondary) stays as the only other CTA; it links to `#bundles`.
- `Book a readiness audit` is retired as a button label.

## A10. Icons. ID D9

Replace the seven hand-rolled glyphs in `components/icons.tsx` with `@phosphor-icons/react`
(one family, `weight="regular"`, size 20). WhatsApp: Phosphor ships `WhatsappLogo`. Adds
one dependency (check `package.json` first). Low visual impact, but it makes every future
icon consistent. **Optional.**

## A11. Em dashes. ID D10

- **A:** remove all em dashes site-wide, including the hero. The H1 options in Part B have
  none. Body copy uses a colon, comma or two sentences instead.
- **B:** keep the hero's dash (your original line) and remove the rest.

## A12. Small things (batch, no decision needed unless you object)

- Guarantee panel: keep; soften `shadow-glow-ice` to the value from the first pass's item 13.
- Demo section bottom padding after the FAQ lands: `md:pb-24` -> `md:pb-20`.
- Footer: add `Beirut` after the brokerage name (Part B, X1).
- `#product` anchor becomes `#bundles`; nav and rail links updated.
- Type scale audit after all changes: H1 > section H2 > bundle H3 > body, each step visibly
  smaller. Right now H2 and H3 are too close.

## A13. Pre-flight checklist the implementer runs before handing back

- [ ] Hero: headline 2 lines at 1440, subtext 20 words, CTAs in first viewport, `pt-24`.
- [ ] Zero em dashes if D10-A; one (hero) if D10-B.
- [ ] Gradient text in exactly two places.
- [ ] No three-equal-column section.
- [ ] One label per intent.
- [ ] No middle-dot chains.
- [ ] Real images or labelled TODO slots; no fake screenshots, no stock.
- [ ] `npm run typecheck && npm run lint && npm test && npm run build`.
- [ ] Playwright: no horizontal scroll 320/375/768/1440, no console errors, all anchors resolve.
- [ ] Anti-slop lint on the built HTML: 5/5.

---

# PART B: COPY, SEO AND MARKETING

(Merged from `COPY-REVIEW.md`, with the roster corrections: ATLAS Processor and OUTREACH-REPORT
added to the agent map; middle dots and em dashes removed from proposed copy.)

## B1. Diagnosis: why the page reads as AI-generated

I ran the current copy through the anti-slop linter. It scored 5/5 "clean". So the problem is
not vocabulary (there is no "seamless", no "leverage"). The problem is structural, and a
regex can't see it:

**1.1 Every heading has the same rhythm.** Four to six words, one gradient word, full stop.
"Nothing to install, ever." / "Start small. Add more when it proves out." / "Choose the
outcome. We run the agents behind it." Read in sequence they sound like one voice doing one
trick. Real brands vary: one long heading, one two-word one, one that is a question.

**1.2 Nothing has a number.** The catalog is full of them: prospects found *twice a week*,
outreach *under 150 words*, follow-up reminders at *7 and 14 days*, a proposal *in under two
minutes*, a quote in *two minutes instead of forty-five*, a brief *every morning*. The site
uses none of them. Numberless copy is the single strongest "a model wrote this" signal,
because models default to abstractions and people default to specifics.

**1.3 Nobody is named.** Not the buyer (a brokerage owner in Beirut, an insurer in Kinshasa),
not the agents (HUNTER, SCOUT, HERALD have names and the site hides them), not the tools
(WhatsApp is mentioned once). The page could be selling to a dentist.

**1.4 The "X. We Y." pattern.** "Choose the outcome. We run the agents." "Give access. Set the
scope. Watch the work land." It's a copywriting template, and the template shows.

**1.5 No pain, no cost of doing nothing.** The page describes outputs but never the Tuesday
afternoon a broker spends building a prospect list by hand, or the lead that went cold
because nobody followed up. Marketing language starts from the reader's problem; this starts
from our product.

**1.6 The hero headline is too long for the type it's set in.** "AI agents built for insurance —
packaged, deployed, and run for you." is 11 words in Syne ExtraBold, a very wide face. At
1440px it needs five lines. That is a copy problem before it is a CSS problem: the fix is a
headline of 5–7 words, and *then* a lighter weight. See B6.

**1.7 The most important bundle is missing.** Lead Generation (HUNTER + HUNTER Processor +
SCOUT) is Bundle 1 in the catalog, the thing that found Rawsur, and the reason the company
exists. The site lists four bundles and it is not one of them. Outreach & Follow-Up is also
absent as its own idea; it's folded into a single sentence under Sales Enablement.

**1.8 Not SEO-oriented.** One H1 with no search phrase in it; a title tag with no query
anyone types; H2s that are slogans ("Nothing to install, ever") rather than topics; no FAQ
copy answering the questions buyers search; no location words; no page beyond the home page
to rank for anything specific. See B3.

---

## B2. Positioning and voice rules for every rewrite

**Who we are talking to** (from catalog section 4, in priority order):

1. The owner of a small or mid-size insurance brokerage, Lebanon / Gulf / francophone Africa,
   3–30 staff, who does the selling personally and knows exactly which admin eats their week.
2. A sales or operations lead at an insurer that sponsors a broker network.
3. Occasionally a non-insurance owner who found us through the brokerage.

**The one thing they should remember:** *these agents find and chase business for you, and
nothing ever goes to a prospect without you approving it.*

**Voice:** a senior broker explaining to another broker, over coffee, what actually happens
each week. Short declaratives mixed with one long sentence. Numbers wherever we have them.
Agent names used the way you'd name a colleague. British spelling stays (the site uses it).

**Words to use** (customer language): prospects, leads, pipeline, follow-up, quote, proposal,
pitch deck, renewal, rate book, insurer, brokerage, book of business, approval, WhatsApp.

**Words banned** (even though the linter allows some): solution, streamline, empower, unlock,
seamless, cutting-edge, leverage, transform, journey, "AI-powered" as an adjective, "next-gen".

**Structural bans:** no "not X, but Y"; no three-item lists by reflex (use two, or four, or a
sentence); no heading that is just a slogan when a topic heading would rank; no exclamation
marks; no sentence that ends in "for you" twice on one page.

**Claim policy** (from the catalog):

| Safe to say | Not safe |
|---|---|
| HUNTER runs twice a week | Anything about volume of leads per run `[needs number]` |
| Outreach drafts are under 150 words | That outreach "sends" — it drafts only |
| Follow-up reminder at 7 days, draft at 14 | — |
| Proposal drafted in under two minutes | — |
| Quote in ~2 minutes vs ~45 by hand | Selling Quoting to another brokerage before insurer permission (catalog Bundle 6) |
| Daily brief (HERALD), weekly country risk, competitor and regulatory watch | — |
| Nothing sends automatically, ever (hard platform rule) | — |
| Marketing & Content: "in build" | That the scheduler or video exist today |
| Custom work is priced per case | Any fixed price, anywhere |

---

## B3. SEO plan

The site is one page plus /privacy. One page can rank for one cluster. Everything else needs
its own URL. Below is what to do now on the home page, and what to add as a second phase.

### B3.1 Keyword targets

I could not run live search-volume data from this session (no SERP tool connected), so these
are chosen from search intent and the catalog's language. Validate the primary set in Google
Search Console once the domain is live; drop anything with zero impressions after 60 days.

| Role | Phrase | Where it goes |
|---|---|---|
| Primary | **AI agents for insurance brokers** | H1, title, first paragraph, OG title |
| Primary | **insurance lead generation** (+ "AI", "automated") | Lead Generation bundle H3 and body |
| Secondary | insurance sales automation | Sales Enablement body |
| Secondary | automated insurance quoting / instant insurance quotes | Quoting bundle |
| Secondary | competitor intelligence for insurers / country risk insurance | Intelligence bundle |
| Long-tail | AI outreach for insurance brokers, insurance proposal generator, insurance follow-up automation | bundle bodies, FAQ |
| Local | insurance AI Lebanon, Beirut, MENA, Africa, francophone Africa, DRC | hero sub or "who it's for" line, footer, Organization schema `areaServed` |

### B3.2 Title and description (`meta`) — **ID S1**

Current title: *Brocare AI: agents built for insurance* (41 chars, no query).
Current description: generic list, 158 chars.

- **A:** title `AI Agents for Insurance Brokers & Insurers | Brocare AI` (55)
  description `Brocare AI builds and runs AI agents for insurance brokers: prospects found twice a week, outreach drafted for your approval, quotes in two minutes. Beirut, MENA and Africa.` (169 — trim "and Africa" if you want ≤160)
- **B:** title `Brocare AI: AI Agents That Find and Chase Insurance Leads` (58)
  description `Lead generation, outreach, quoting and market intelligence, run by AI agents and approved by you. Built by an insurance brokerage for brokerages and insurers.` (157)

Recommend A: it puts the search phrase first. The `%s | Brocare AI` template for sub-pages
stays.

### B3.3 Heading map — **ID S2**

Search engines read H1/H2 as the outline. Right now the outline is a list of slogans. Proposed
outline (copy for each is in §4; this is only the *structure*):

```
H1  AI agents for insurance brokers and insurers            (hero)
H2  What the agents do each week                           (bundles)   ← was "Choose the outcome"
    H3  Lead generation: new prospects twice a week
    H3  Outreach and follow-up
    H3  Proposals and pitch decks
    H3  Market, competitor and regulatory intelligence
    H3  Instant branded quotes and documents
    H3  Marketing and content (in build)
H2  How it connects to your tools                          (how)       ← was "Nothing to install, ever"
H2  First workflow live in two weeks, or we keep working free   (guarantee) ← fine, keep
H2  How an engagement works                                (model)     ← was "Start small…"
H2  Questions brokers ask us                               (FAQ, new)
H2  Book a demo                                            (demo)
```

The slogan lines don't disappear; they become the *lead sentence* under each topic H2. You keep
the voice, the crawler gets the topic.

### B3.4 Schema — **ID S3**

The Organization JSON-LD in `app/layout.tsx` is good. Add:
- `areaServed: ["LB","AE","SA","CD","CI","SN"]` (edit to the real target list) and
  `knowsAbout: ["insurance brokerage","insurance lead generation","insurance quoting"]`.
- One `Service` node per bundle (`@type: Service`, `name`, `description`, `provider` →
  Organization, `areaServed`). Six small nodes. No FAQ schema (Google restricts it to
  government and health sites now; the FAQ *content* still helps, the markup doesn't).

### B3.5 Second phase: pages that can rank — **ID S4** (decision, not copy)

One URL per bundle: `/lead-generation`, `/outreach-and-follow-up`, `/proposals`,
`/intelligence`, `/quoting`, `/marketing`. Each 500–800 words: what the agent does, a
weekly-cadence example, who it's for, the approval rule, a FAQ, the demo form. Plus
`/for-brokers` and `/for-insurers`. The home page bundle rows would link to them.
This is the difference between a brochure and a site that gets organic traffic. It is a
separate build; mark `YES` if you want it planned.

### B3.6 Small technical items

- `alt` on the header logo is "Brocare" — fine. OG image alt (in `layout.tsx` `openGraph.images`)
  should read "Brocare AI: AI agents for insurance brokers".
- Keep `lang="en"`. If a French page ships, add `hreflang`.
- Keep the indexing lockout until the domain is set (already in place).

---

## B4. Section-by-section copy

Format: **Current** → **Problem** → **Proposed** (options) → notes. Gradient-word markers are
shown as `{…}`; the implementer maps them to `g: true` segments.

### B4.1 Navigation — **ID N1**

Current: Product / How It Works / Pricing Model / Book a Demo.

Problem: "Pricing Model" promises prices and the section has none; visitors click it and feel
misled. "Product" is vague for a company that sells bundles.

- **A:** `Bundles` / `How It Works` / `Working With Us` / `Book a Demo`
- **B:** `What the agents do` / `How it connects` / `Engagement` / `Book a Demo`

Recommend A. Nav labels are also anchor text, so "Bundles" beats "Product".

### B4.2 Hero headline — **ID H1**

Current (11 words, five lines at 1440): *AI agents built for insurance — packaged, deployed,
and run for you.*

Problem: too long for a wide extrabold face (§1.6); "packaged, deployed, and run" is a triad
that describes us, not them; no search phrase.

- **A (recommended, 7 words):** `AI agents for {insurance brokers}. We run them.`
  Search phrase up front, "we run them" carries the packaged/deployed idea in three words, fits
  on two lines at 1440 and three on a phone.
- **B (6 words, punchier, weaker for SEO):** `Leads found. Follow-ups sent. {You approve.}`
  Leads with the outcome and the approval promise. Put the SEO phrase in the sub instead.
- **C (8 words):** `The sales agents your brokerage {never had to hire}.`
  Plays on "agents" (insurance agents / AI agents). Memorable; check it doesn't read as if we
  replace staff.

Note on the gradient: it currently sits on "run for you", which is the least meaningful part.
In each option above it marks the buyer or the promise.

### B4.3 Hero sub-line — **ID H2**

Current: *We build, deploy and run AI agents for quoting, sales follow-up, market intelligence
and content, so your team does not have to.*

Problem: a category list; nothing happens in it; "so your team does not have to" is a stock
close.

- **A (pairs with H1-A):** `HUNTER finds new prospects twice a week and SCOUT briefs you before
  the call. Outreach is drafted, never sent, until you tap approve. Quotes go out in two minutes
  instead of forty-five. Built by an insurance brokerage in Beirut, for brokerages and insurers
  across the Middle East and Africa.`
- **B (shorter):** `New prospects twice a week, outreach drafted for your approval, quotes in two
  minutes. Built by a Beirut brokerage that uses every agent it sells.`

"Uses every agent it sells" is true (Brocare Insurance is the first client) and it is the
strongest proof line available without a testimonial. Confirm you're comfortable saying it.

### B4.4 Hero CTAs — **ID H3**

Current: `Book a Demo` / `See How It Works`.

- **A:** `Book a 20-minute demo` / `See what runs each week` (the second one links to #bundles,
  not #how-it-works, because the bundles are the more persuasive section)
- **B:** keep both labels, change the secondary target to #bundles.

The dictionary already contains `bookLead: "Pick a 20-minute slot…"`, so "20-minute" is a
commitment someone already made; use it.

### B4.5 Hero right rail label — **ID H4**

Current: `What we run` over four bundle names.
Proposed: `Six bundles` (or `Five bundles` per B1 decision) and list them in the new order,
Lead Generation first. Minor.

### B4.6 Bundles section heading and lead — **ID B0**

Current: *Choose the outcome. We run the agents behind it.* / *Each bundle is described by the
work that gets done, not by the software behind it.*

Problem: slogan H2 (B3.3); the lead sentence is the "not X, Y" shape.

- **A:** H2 `What the agents do {each week}` + lead `Every bundle below is running today for
  Brocare Insurance. Pick the one that matches where your week goes, and we switch it on for
  you. Nothing in any of them contacts a prospect without your approval.`
- **B:** H2 `Six bundles, one rule: {you approve everything}` + lead `Here is what each one
  actually does, agent by agent, with the schedule it runs on.`

### B4.7 The bundles — **ID B1 (structure decision)**

The catalog lists each agent under one bundle. That was a way to say the roster out loud on
a call, not a rule about what a client gets. The right test is per pair: *does this agent make
this bundle better for the person buying it?* Applied to all 19 live agents and pipelines (the 16-agent roster in the 16 Sept
build prompt plus FOLLOW-UP, Lead Activation and OUTREACH-REPORT, all present as files in the
repo per MASTER-HANDOFF.md) and the three live products, the map looks like this. **Core** = the bundle doesn't exist without it.
**Adds** = included, and the copy says why. **No** = left out, with the reason, so the
decision is visible and you can overrule it.

| Agent / product | 1 Lead Gen | 2 Outreach & Follow-Up | 3 Proposals & Decks | 4 Intelligence | 5 Marketing & Content | 6 Quoting & Docs |
|---|---|---|---|---|---|---|
| HUNTER + Processor | **Core** | No: finds, doesn't chase; a client buying only this bundle brings their own leads | No | No | No | No |
| SCOUT | **Core**: pre-call brief | Adds: research feeds the draft | Adds: proposal is written from its brief | Adds: deep dive on any named company | No | No |
| ATLAS | **Adds**: a tender or expansion *is* a lead | Adds: a fresh signal is the reason to write | Adds: current market context in the deck | **Core** | **Core**: seeds posts with real events | No |
| COMPASS | Adds: who can introduce you | Adds: warm-intro path before a cold email | No | **Core** | No | No |
| HERALD | Adds: new leads in the morning brief | Adds: pending approvals and call list | No | **Core** | No | Adds: quotes awaiting reply, in the brief |
| ORACLE | Adds: which markets to prospect this quarter | No | Adds: country section of the deck | **Core** | No | No |
| WATCHER | Adds: a rival's lost mandate is a lead | No | Adds: positioning against named competitors | **Core** | Adds: what rivals publish, and where they're silent | No |
| COUNSEL | No: rules don't find leads | No | Adds (light): compliance context where the client asks | **Core** | Adds (light): keeps claims inside insurance advertising rules | Adds (light): flags rule changes that touch a product or rate |
| HORMOZI | Adds (light): is the hunted profile the right one | Adds: weekly review of offer and messaging | Adds (light): offer structure inside the proposal | **Core** | **Adds**: the "roadmap advisory agent" in the catalog is this agent pointed at channels and audiences | No |
| OUTREACH drafter | No | **Core** | No | No | No | Adds: covering email for every quote |
| Lead Activation | No | **Core** | No | No | No | No |
| FOLLOW-UP monitor | No | **Core** | No | No | No | **Adds**: chases the quote at day 7 and 14, the same way it chases outreach |
| ARCHITECT | No | No | **Core** | No | No | Adds: proposal generated from a quote |
| TAILOR | No | No | **Core** | No | Adds (light): branded brochures as content assets | Adds (light): comparison deck for a large account |
| ECHO | No | No | No | No | **Core** | No |
| CURATOR | No | No | No | No | **Core** | No |
| Health Quoter, Motor Quoter + Value Finder | No | No | No | No | No | **Core** |
| Document Studio | No | No | Adds: offer cards and comparison sheets alongside the proposal | No | No | **Core** |
| ATLAS Processor | Adds: files ATLAS signals as cards and passes qualifying ones to HUNTER's queue | No | No | Adds: the Friday digest | Adds: seeds ECHO | No |
| OUTREACH-REPORT | No | Adds: Sunday WhatsApp summary of the pipeline, pending approvals, strongest prospects | No | Adds (light): weekly pipeline numbers | No | No |
| Lead-to-Close engine (NEW) | No | Named as the upgrade path, not included | No | No | No | No |
| Scheduler, video (NEW) | No | No | No | No | "In build" tag | No |
| Inbox Copilot / Exec Inbox (NEW), CIPHER, SCRIBE (ROADMAP), FOUNDER (internal) | not in any bundle | | | | | |

Three things this map changes versus the catalog:

- **ATLAS is in five bundles.** An opportunity signal is a lead, a reason to write, a line in
  a deck, an intelligence item and a post. This is where your "opportunity scanning belongs
  with HUNTER" point lands: it belongs there *and* stays in Intelligence.
- **FOLLOW-UP monitor joins Quoting.** A quote nobody chases is the most common way a
  brokerage loses a sale, and the agent already knows how to chase at 7 and 14 days.
- **HORMOZI is the marketing advisor.** The catalog lists a "new advisory agent, roadmap" for
  Bundle 5 and then notes it reuses HORMOZI's pattern. HORMOZI is LIVE. Pointing it at
  channel and audience questions is a prompt change, not a new agent, so Marketing & Content
  can say it today. Confirm you're happy to promise that (**B7-HORMOZI** below).

Bundle-copy rule that follows from the map: **name at most three agents in a row body**, the
ones the buyer will notice, and put the rest in the `detail` line. A row that lists seven
names reads like an org chart.

Two layouts remain possible: **A: six rows** (recommended; written below) or **B: five rows**
merging Proposals into Outreach.

Each row has: **name** (H3), **body** (two to four sentences), **detail** (the small line).

#### B2 — Lead Generation (new; must be first)

- name: `Lead generation`
- body **A:** `Every Tuesday and Friday, HUNTER searches for companies that match the profile
  you set, industry, size and country, scores each one and files it as a lead card with real
  data behind it. ATLAS adds the leads a search never shows: the tender just published, the
  company that just moved into your market. Before you call, SCOUT writes the briefing: who
  they are, what changed recently, what to open with.`
- body **B:** `HUNTER goes looking for prospects twice a week, scores what it finds and puts the
  good ones in your pipeline with the data to back them up. ATLAS watches for tenders,
  expansions and new entrants and files those too. SCOUT then writes a pre-call brief for each,
  so you walk in knowing more than the other broker.`
- detail: `HUNTER runs twice a week, ATLAS scans daily, SCOUT brief per lead, COMPASS, HERALD,
  ORACLE and WATCHER feed it`

Note: "Tuesday and Friday" is an example of the specificity that sells; keep it only if that
is the real schedule, otherwise use B.

#### B3 — Outreach & Follow-Up

- name: `Outreach and follow-up`
- body: `For every lead worth pursuing, a first email under 150 words is drafted in the
  prospect's language and waits in your approval queue. It never sends itself. Seven days with
  no reply and you get a nudge; fourteen and the follow-up is already written. When ATLAS spots
  something new about a prospect, the draft opens with it. For the lead you really want, Lead
  Activation researches them properly and gives you three openers to choose from.`
- detail: `Drafts only, you approve, Reminder at day 7, follow-up drafted at day 14, SCOUT,
  COMPASS, HERALD and HORMOZI feed it`
- Optional line under the row (**B3-UPGRADE: YES/NO**): `Outgrown approving every email by
  hand? The Lead-to-Close engine sends and follows up on a schedule from your own mailbox. In
  build; ask us where it stands.`

#### B4 — Proposals & Pitch Decks

- name: `Proposals and pitch decks`
- body: `ARCHITECT drafts a complete, client-ready proposal for a named lead in under two
  minutes, built from SCOUT's research on them. TAILOR turns it into a branded pitch deck with
  the current market context for their sector and country, from ORACLE, WATCHER and ATLAS,
  never invented. Document Studio adds the offer card and comparison sheet. The paperwork that
  took a day now takes the length of a coffee.`
- detail: `Proposal in under 2 minutes, Branded PDF deck per lead, Offer cards and comparisons`

(These three rows together are "Sales Enablement". Optional eyebrow above B2–B4.)

#### B5 — Intelligence

- name: `Market, competitor and regulatory intelligence`
- body **A:** `A standing research desk without the hire. HERALD writes the morning brief:
  pipeline, new leads, market signals, today's calls. Each week WATCHER reports what competing
  brokers and insurers actually did, ORACLE updates country risk for the markets you sell into,
  and COUNSEL flags licensing and regulatory changes before they bite. ATLAS and COMPASS scan
  daily for tenders, expansions and who is newly connected to whom. HORMOZI closes the week
  with a strategy memo on your own pipeline.`
- body **B (shorter):** `Every morning, a brief on your pipeline and your markets. Every week,
  competitor moves, country risk, regulatory changes and a strategy memo, for the countries
  you operate in. The job of a full-time analyst, delivered as a document you read with your
  coffee. Ask SCOUT for a deep dive on any company and you have it the same day.`
- detail: `Daily brief, Weekly competitor, country-risk, regulatory and strategy reports ·
  Deep dive on request`

#### B6 — Quoting & Documents

- name: `Instant branded quotes and documents`
- body: `Health and motor quotes from real rate books, branded to you, in about two minutes
  instead of the forty-five it takes by hand. The Value Finder looks up a vehicle's market
  value on the spot. Document Studio turns any quote into an offer card, a comparison sheet or
  an invoice, with the covering email drafted. And a quote that goes quiet gets chased: the
  FOLLOW-UP monitor nudges you at day 7 and drafts the follow-up at day 14.`
- detail: `Health, Motor + vehicle valuation, Offer cards, comparisons, invoices, Quotes
  chased at day 7 and 14`

**Constraint (catalog Bundle 6):** the rate books belong to Fidelity and UFA. Until they agree
in writing, this bundle is only sellable to Brocare Insurance itself. Decide **B6-SHOW:
YES / NO / YES-WITH-NOTE** ("available to partner brokerages on request").

#### B7 — Marketing & Content

- name: `Marketing and content` with a small `in build` tag on the two NEW pieces only
- body: `ECHO drafts your social posts twice a week, seeded by what ATLAS found that morning
  and what WATCHER saw your competitors publish, so the post is about something that actually
  happened in your market. CURATOR plans the month. HORMOZI reviews the plan against your
  pipeline and says which audience and channel deserve the budget. Scheduling to your
  platforms and video are in build.`
- detail: `Posts drafted twice a week, Monthly calendar, Weekly channel and audience memo ·
  Scheduler and video: in build`

**Decision B7-HORMOZI:** the copy promises the marketing memo from HORMOZI today. If you'd
rather wait until it is re-prompted and tested, drop the third sentence and the memo from the
detail line.

### B4.8 How It Works — **ID W1**

Current H2: *Nothing to install, ever.* Lead: *You give us access the way you would give a new
hire access…* Steps: Give access / Set the scope / Watch the work land.

Problem: the steps are good; the H2 is a slogan; step bodies are generic ("the tools you
already use") when the connector list is a selling point.

- H2 **A:** `How it connects {to your tools}` (slogan moves to the lead: `Nothing to install,
  ever. You give us access the way you'd give a new hire access, and you can take it back the
  same afternoon.`)
- Steps (keep the three; sharpen):
  1. `Give access` — `A login to your dashboard, or a connection to Gmail or Outlook, WhatsApp
     and your CRM. Read scope by default; nothing is written to your systems until you say so.`
  2. `Set the scope` — `You choose which agents run, what they can see, and which markets and
     profiles they work. Narrow it or switch any of it off from the dashboard, at any time.`
  3. `Watch the work land` — `Leads, drafts and briefs appear in the dashboard and in your
     inbox. Every outgoing email sits in an approval queue with one button on it.`

Confirm the connector list (Gmail / Outlook / WhatsApp / CRM) against what is actually LIVE
in `docs/PERMISSIONS-DEMO-CONNECTORS.md` before it ships. Mark **W1-CONNECTORS: …**.

### B4.9 Guarantee — **ID G1**

Current: *First workflow live in two weeks.* / *Your first real workflow is live and producing
output within two weeks of kickoff. If it is not, the work continues at no cost until it is.*

This is the best section on the page. Two tweaks only:

- **A:** body → `Fourteen days after kickoff, your first workflow is running and producing
  output: leads in the pipeline, drafts in the queue, a brief in your inbox. If it isn't, we
  keep working at no charge until it is. No clause about "reasonable efforts".`
- Define "workflow" once so the promise is testable: add a small line `A workflow means one
  bundle, connected to your tools, producing its first real output.`

### B4.10 Engagement model — **ID M1**

Current H2: *Start small. Add more when it proves out.* Stages: Workshop / Readiness Audit /
The Build / Platform Access / Expansion. CTA: Book a Readiness Audit.

Problem: the section is labelled "Pricing Model" in the nav and says nothing about money, so
it disappoints. The catalog's custom-work policy (B5) is a strong, honest paragraph nobody
sees.

- H2 **A:** `How an engagement works` with lead `Start with one bundle. Add the next when the
  first one has paid for itself.`
- Stage bodies (tighter, each with what the client gets):
  1. `Workshop` — `Ninety minutes with the people who do the selling. We map where the week
     actually goes and pick the first bundle.`
  2. `Readiness audit` — `We look at your tools, data and rate books and tell you what will
     work in two weeks and what won't. Low commitment; you keep the findings either way.`
  3. `The build` — `Connectors, scope, first runs. Delivered in milestones you can see in the
     dashboard, not a launch date at the end.`
  4. `Platform access` — `The bundle runs on its schedule. You approve, we maintain.`
  5. `Expansion` — `The next bundle, or a custom agent for a process only you have.`
- Add one paragraph under the stairs — **M2:** `Bundles are priced as fixed monthly ranges
  because they're built once and run for many clients. Custom work (a bespoke agent, a
  website, a tool that isn't in the catalog) is priced per project on scope, time and the
  value it creates for your business. We don't publish a menu price for that on purpose.`
  (Straight from catalog B5, shortened. Add ranges only if you decide to publish them.)
- CTA: keep `Book a readiness audit`.

Confirm "ninety minutes" for the workshop or replace with the real length.

### B4.11 FAQ — **ID F1 (new section)**

Objections, answered in the buyer's words. Six is enough; place it between the model and the
demo. These are search queries as much as questions.

1. **Does anything get sent to my clients or prospects automatically?** `No. Every email the
   agents draft waits in an approval queue until you release it. This is a platform rule, not a
   setting.`
2. **What do you need access to?** `As little as the bundle needs. Lead Generation needs
   nothing of yours. Outreach needs a mailbox connection. Quoting needs your rate books.`
3. **We're not in insurance. Does it still apply?** `Lead generation, outreach and content
   work the same in any B2B business. Quoting and the intelligence reports are insurance-
   specific.`
4. **How fast is the first result?** `Two weeks from kickoff to a running workflow, or we keep
   working free until it is.`
5. **What does it cost?** `Each bundle has a fixed monthly range; custom builds are quoted per
   project. Book the readiness audit and you leave with both numbers.`
6. **Where are you?** `Beirut. We work with brokerages and insurers in Lebanon, the Gulf and
   French- and English-speaking Africa, in English and French.`

### B4.12 Demo section — **ID D1**

Current H2: *Book a demo.* Lead: *Tell us what you want to automate and we will come back to
you.* WhatsApp line: *The fastest route is WhatsApp.*

- H2: keep `Book a {demo}`; or **A:** `See it run on {your} pipeline`
- Lead **A:** `Twenty minutes on a call. Bring one real prospect list or one real quote and we
  run the agents on it while you watch.`
- WhatsApp prefill **A:** `Hello Brocare AI. I run [company] in [country] and I'd like to see
  the lead-generation bundle on our pipeline.` (brackets are for the sender to fill; keep
  them literal)
- Form labels: keep. Change `What do you want to automate?` → `Where does your week go?` with
  hint `Prospecting, follow-ups, quotes, reports. Tell us the one that hurts.` (**D2**)
- Success: `Thank you, we have your request.` → **A:** `Got it. You'll hear from Ali within one
  working day.` (**D3** — only if that is a promise you'll keep; else keep current)

### B4.13 Footer, 404, error — **ID X1**

- Footer line `An initiative of Brocare Insurance Brokerage s.a.r.l.` is right; add `Beirut`
  after it for the local signal: `An initiative of Brocare Insurance Brokerage s.a.r.l., Beirut.`
- 404 and error copy are fine. One change: 404 body `The link may be old or mistyped…` →
  `That link is old or mistyped. The home page has everything; or message us on WhatsApp.`
  Optional.

### B4.14 Privacy page — **ID P1**

Copy is clear and honest. Two additions the rewrite makes necessary:
- If the demo form gains the "where does your week go" field, "What we collect" already
  covers it (it lists "a description of what you want to automate"); update the wording to
  match the new label.
- Add to "Who else handles it": `If you book a call, the calendar provider we use also sees
  your name and email.` (the dictionary already has booking strings, so a calendar tool is
  coming).

### B4.15 OG share image text — **ID O1**

Current: "AI agents built for insurance." / "Packaged, deployed, and run for you."
Proposed: headline = whichever H1 option you choose; sub = `Built by a Beirut brokerage that
uses every agent it sells.` Regenerate with the existing `og_syne.py` script.

---

## B5. Marketing structure: what the page argues, in order

For the implementer and for you, this is the argument the rewritten page makes top to bottom.
If a section doesn't advance it, it goes.

1. **Hero:** who it's for and the one promise (find and chase business; you approve).
2. **Bundles:** what happens each week, with names, numbers and schedules. Lead Generation first.
3. **How it connects:** the "nothing to install / take it back any time" trust argument.
4. **Guarantee:** risk reversal with a testable definition.
5. **Engagement:** how you start small and what custom work costs (honestly: per project).
6. **FAQ:** the six objections, answered before the form.
7. **Demo:** a concrete 20-minute offer, WhatsApp as the fast lane.

What's still missing and can't be written: proof. The only honest proof today is "we use
every agent we sell". When the first external client is live, one sentence from them, with
their name and a number, goes directly under the hero. Until then, no proof section at all.

---

## B6. Design notes that come with the copy

- **Hero type (the "cramped" problem).** Shorten the headline first (H1 options are 6–8
  words). Then in `Hero.tsx`: weight `font-extrabold` → `font-bold` (Syne 700), tracking
  `-0.03em` → `-0.02em`, size `clamp(2.15rem,5vw,4.5rem)` → `clamp(2.1rem,4.6vw,4.1rem)`, and
  `max-w-[17ch]` → `max-w-[14ch]`. Syne is a wide face; it looks good at 700 and starts to look
  like a poster at 800 once a line passes ~14 characters.
- **Section H2s** move from slogan to topic (B3.3). To keep the personality, the slogan
  becomes the first sentence of the lead paragraph, set in the same size as body text but in
  white rather than textsec. Two levels: topic heading, then the human line.
- **Agent names** (HUNTER, SCOUT…) are set in small caps or in the body font with
  `tracking-[0.06em]` so they read as names, not shouting. One rule: never more than three
  names in one row body.
- **The "in build" tag** on Marketing & Content: a small outlined chip in `textsec`, not ice
  (ice is reserved for live-system moments and this one isn't live).
- **FAQ** as a plain `<dl>` with a hairline between items, no accordion. Everything visible;
  crawlers and skimmers both prefer it.
- **Rail** in the hero lists the bundles in the new order, Lead Generation first.

---

## B7. Implementation checklist (for the session that applies your marks)

| ID | File | What changes |
|---|---|---|
| S1 | `lib/i18n/en.ts` `meta` | title + description |
| S2 | all `components/sections/*.tsx` | H2s become topic headings; slogans move to lead lines |
| S3 | `app/layout.tsx` | Organization `areaServed`, `knowsAbout`; six `Service` nodes |
| S4 | new routes | second phase, separate plan |
| N1 | `components/Header.tsx` LINKS + `nav` dict | labels and anchors (`#product` → `#bundles`) |
| H1–H4 | `lib/i18n/en.ts` `hero`, `Hero.tsx` | headline, sub, CTAs, rail label, type changes (B6) |
| B0–B7 | `lib/i18n/en.ts` `product` → rename key `bundles`; `Product.tsx` | six rows, new order, agent map from B4.7, `inBuild` flag rendering a chip, optional "Sales Enablement" eyebrow, optional upgrade line under B3 |
| W1 | `en.ts` `how`, `How.tsx` | H2, lead, step bodies |
| G1 | `en.ts` `guarantee` | body + definition line |
| M1–M2 | `en.ts` `model`, `Model.tsx` | H2, stage bodies, custom-work paragraph |
| F1 | new `components/sections/Faq.tsx`, `en.ts` `faq`, `app/page.tsx` | six-item `<dl>` between Model and Demo |
| D1–D3 | `en.ts` `demo`, `LeadForm.tsx` | lead, prefill, message label + hint, success line |
| X1 | `en.ts` `footer`, `notFound` | Beirut in footer line; 404 body |
| P1 | `en.ts` `privacy` | two wording updates |
| O1 | `scratchpad/og_syne.py` → `app/opengraph-image.png` | regenerate with chosen H1 |

After applying: `npm run typecheck && npm run lint && npm test && npm run build`, then the
anti-slop lint on the built page (`deslop.py .next/server/app/index.html`), then the same
Playwright pass as before (no horizontal scroll at 320/375/768/1440, no console errors, all
anchors resolve — note `#product` becomes `#bundles`).
