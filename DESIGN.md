---
name: Brocare AI
description: A full AI team for insurance, on soft navy panels, with an interactive robot up front and a rubber stamp waiting for a human approval.
colors:
  deep: "#05081A"
  mid: "#0A0F2E"
  card: "#0D1440"
  cardborder: "#1E3A6E"
  primary: "#1A3BDB"
  accent: "#2D6FFF"
  gradientblue: "#1565C0"
  ice: "#4FC3F7"
  textsec: "#B0C4DE"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.7rem, 6vw, 5.6rem)"
    fontWeight: 760
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 104"
  display-page:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.2vw, 4.8rem)"
    fontWeight: 760
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 104"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.9vw, 3.5rem)"
    fontWeight: 720
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 100"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.8vw, 1.6rem)"
    fontWeight: 680
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  question:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.4vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.25vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  button:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.97rem"
    fontWeight: 620
    lineHeight: 1
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 620
    lineHeight: 1.2
    letterSpacing: "0.14em"
    fontVariation: "'wdth' 72"
  reference:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.68rem"
    fontWeight: 400
    letterSpacing: "0.02em"
  entry:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.76rem"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 88"
  stat:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "2.6rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "'tnum'"
    fontVariation: "'wdth' 92"
rounded:
  sm: "8px"
  DEFAULT: "12px"
  md: "14px"
  lg: "18px"
  xl: "22px"
  2xl: "28px"
  3xl: "36px"
  footer: "40px"
  full: "9999px"
spacing:
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "40px"
  sheet-max: "84rem"
  header: "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: "0 1.6rem"
    height: "3.1rem"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: "0 1.6rem"
    height: "3.1rem"
  button-sm:
    rounded: "{rounded.full}"
    padding: "0 1.15rem"
    height: "2.6rem"
  sheet:
    backgroundColor: "{colors.mid}"
    rounded: "{rounded.2xl}"
    padding: "56px 48px"
  field-box:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "1.7rem 0.85rem 0.7rem"
  pill:
    backgroundColor: "{colors.card}"
    textColor: "{colors.textsec}"
    typography: "{typography.reference}"
    rounded: "{rounded.full}"
    padding: "0.2rem 0.65rem"
  line-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.white}"
    rounded: "{rounded.3xl}"
    padding: "0 24px 24px"
    width: "17.5rem"
  approval-box:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.textsec}"
    rounded: "{rounded.2xl}"
    height: "6.5rem"
  approval-box-signed:
    textColor: "{colors.white}"
    rounded: "{rounded.2xl}"
  accordion-toggle:
    backgroundColor: "{colors.card}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    size: "36px"
  accordion-toggle-open:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
  status-live:
    textColor: "{colors.ice}"
    typography: "{typography.label}"
  status-pending:
    textColor: "{colors.textsec}"
    typography: "{typography.label}"
  stamp:
    textColor: "{colors.accent}"
    rounded: "{rounded.full}"
    size: "96px"
  stamp-approved:
    textColor: "{colors.ice}"
    rounded: "{rounded.full}"
  stamp-ghost:
    textColor: "{colors.cardborder}"
    rounded: "{rounded.full}"
---

# Design System: Brocare AI

## Overview

**Creative North Star: "The Soft Slip"**

The site opens on light, not paper: an interactive Spline robot on the right of the hero, slow aurora drifting behind the headline, and a soft spotlight that follows the cursor. Below it, every section sits on a rounded navy panel with a faint border and a soft shadow, so the page reads as a sequence of calm, gently lifted surfaces rather than a ruled form. The insurance document survives where it earns its place: typed mono entries, condensed field labels, round rubber stamps, and one approval box that always belongs to the visitor.

Density is relaxed. Panels breathe (56px by 48px of padding on desktop), dividers are faint and appear only where they help reading, and nothing is boxed in for the sake of it. Corners are soft everywhere: 28px on panels, 36px on agent cards, full pills on buttons, tags and toggles. Motion is fluid and continuous: aurora drift, a spotlight that glides, a metallic highlight sweeping across buttons, headings rising by line, entries typing, stamps pressing.

The brand palette is fixed and blue-only. Ice is the brightest note on any screen and signals live, approved or promised states; elsewhere it appears only as light inside metal and glow.

**Key Characteristics:**
- Rounded everything: panels 28px, cards 36px, fields 14px, buttons, tags and toggles fully round.
- Soft navy panels with a faint border and a soft ambient shadow; no crop marks, section folios, printed strips or ruled margins.
- Interactive robot hero with aurora drift and a cursor spotlight, desktop only and never under reduced motion.
- Liquid-metal pill buttons with a sweeping highlight.
- The document survives as detail: Martian Mono entries, condensed caps labels, rubber stamps, the visitor's approval box.
- Pilot and coming-soon items are dimmed with ghost stamps, never dressed as live.

## Colors

A fixed, all-blue brand palette on near-black navy, with ice held back as the one bright signal.

### Primary
- **Royal Press Blue** (primary): first stop of the primary button's metal gradient and of the approval-line gradient, step number discs, checked checkboxes, text selection.
- **Stamp Ink Blue** (accent): rubber stamp ink, the open accordion toggle, active nav underline, reading-progress line, card and field hover rings, rail position thumb, the middle of the button metal. The most frequent accent.

### Secondary
- **Ice Signal** (ice): live status, the Approved stamp and signed approval box, the hero's three promise checks, the focus ring and text caret, the bright middle of the gradient word. As light only: the highlight inside button metal, secondary button rim, cursor spotlight.

### Tertiary
- **Deep Cobalt** (gradientblue): the deep end of gradients only: primary button metal, the "all agents" card, the aurora. Never a flat fill or text colour.

### Neutral
- **Midnight Ground** (deep): page background, header (at 90%), field fill (55%, 85% on focus), approval box (60%), the disc behind a card's stamp.
- **Form Stock Navy** (mid): the lower stop of every panel gradient, footer.
- **Card Navy** (card): upper stop of panel and card gradients, pill fill, closed accordion toggle, rail arrow buttons, secondary button metal.
- **Hairline Navy** (cardborder): faint borders and dividers, always at reduced opacity (40 to 70%); ghost stamps, scrollbar thumb.
- **Ledger Grey-Blue** (textsec): labels, leads, body copy, pending status.
- **Paper White** (white): headings, entries of record, button text, the signature stroke.

### Named Rules
**The Earned Ice Rule.** Ice as a colour of text, fill or stamp means live, approved, or one of the hero's promises (plus the focus ring and caret). Ice may also appear as light inside button metal and the cursor spotlight. It is never a decorative fill or a heading colour.

**The One Gradient Word Rule.** Every marketing title carries exactly one emphasised word in the white-to-ice-to-accent gradient (100deg, white 0%, ice 46%, accent 100%). Never two, never a whole line.

**The Fixed Stock Rule.** The palette is the brand's and is closed. Tints are made by opacity on existing tokens, not by new hex values.

## Typography

**Display Font:** Archivo, variable with width axis (with system-ui, sans-serif)
**Body Font:** Archivo (same family, normal width)
**Label/Mono Font:** Martian Mono, variable with width axis (with ui-monospace, monospace)

**Character:** One grotesque plays three roles by width: condensed caps for field labels (72%), normal for reading, slightly expanded and heavy for display (104%). Martian Mono is the typewriter: whatever an agent or a person wrote.

### Hierarchy
- **Display** (760, clamp(2.7rem, 6vw, 5.6rem) in the hero, clamp(2.4rem, 5.2vw, 4.8rem) on inner page heroes, 0.98): page titles and the closing sign-off title. Balanced wrap.
- **Headline** (720, clamp(2rem, 3.9vw, 3.5rem), 1.02): section titles.
- **Title** (680, clamp(1.25rem, 1.8vw, 1.6rem), 1.12): steps, clause and card titles.
- **Question** (600, 1.15rem, 1.25rem from 768px, snug): accordion questions.
- **Lead** (400, clamp(1.05rem, 1.25vw, 1.2rem), 1.6, max 62ch): the paragraph under a title, in ledger grey-blue.
- **Body** (400, 1rem, 1.7, max 68ch): running copy, ledger grey-blue.
- **Label** (620, 0.7rem, 0.14em, uppercase, width 72%): field names ("Approved by", "Territory"), status marks, footer column heads.
- **Reference** (Martian Mono 0.68rem, 0.02em): form codes, line numbers (L.01), dates, pill tags.
- **Entry** (Martian Mono, width 88%, -0.01em, 0.74 to 0.8rem): typed values: agent outputs, particulars, approval prompts.
- **Stat** (700, 2.6rem, 1, -0.04em, tabular figures, width 92%): the cadence number on an agent card.

### Named Rules
**The Typed Entry Rule.** Mono means written onto the document: entries, references, codes, dates and line numbers. Headlines, body, questions and buttons are never mono.

**The Field Label Rule.** Condensed caps name a field or a status. They never introduce a heading as a stacked line above it.

## Layout

A single centred column (max 84rem) with side gutters of 20px, 32px from 640px and 40px from 1024px. The fixed header is 64px. The landing hero is full bleed to about 94% of the viewport height on 1024px and up: headline, lead, buttons and promise checks in the left 7 of 12 columns, the robot filling the right 52% behind them, a gradient fading the bottom into the page. Below 1024px the hero is copy only over the aurora.

Content sections are rounded panels stacked with small gaps (24 to 32px vertical); sections that stand without a panel (the example schedule, the closing band) open up to 64 to 112px. Inside panels, a 12-column grid at 1024px and above: 5/7 for the schedule and FAQ, 7/5 for the closing band, 8/4 or 10/2 for inner page heroes. Everything stacks to one column below 1024px.

The agent strip bleeds past the column to the viewport edges with soft masked fades (2.5rem), cards gapped 20px, the scrollbar hidden and replaced by a rounded position track with round arrow buttons.

**The Header Row Rule.** A form code or reference inside a panel sits in a header row paired with a counterpart on the right (a breadcrumb or a date), not alone above a heading.

## Elevation & Depth

A soft, layered system. Depth comes from tonal gradients (card navy to form-stock navy), faint borders, a soft ambient shadow under every panel, ambient light (aurora, spotlight), and a fixed fractal grain at 4.5% over the whole page. Hover lifts are small and glow blue.

### Shadow Vocabulary
- **Panel** (`box-shadow: inset 0 1px 0 rgba(176,196,222,0.06), 0 30px 80px -40px rgba(5,8,26,0.9)`): every rounded panel; a faint top light and a deep, diffuse fall-off.
- **Metal primary** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 4px rgba(5,8,26,0.5), 0 0 0 1px rgba(45,111,255,0.5), 0 10px 30px -10px rgba(45,111,255,0.7)`): primary button; hover brightens the rim to ice and widens the glow to `0 16px 44px -10px`.
- **Metal secondary** (`box-shadow: inset 0 1px 0 rgba(79,195,247,0.4), inset 0 -2px 4px rgba(5,8,26,0.55), 0 0 0 1px rgba(79,195,247,0.35)`): secondary button; hover adds an ice glow `0 12px 36px -12px`.
- **Card hover glow** (`box-shadow: 0 24px 60px -28px rgba(45,111,255,0.7)`): linked agent cards on hover.
- **Feature glow** (`box-shadow: 0 20px 60px -25px rgba(45,111,255,0.8)`): the filled "all agents" card.
- **Header edge** (`box-shadow: 0 1px 0 rgba(30,58,110,0.35)`): the header's bottom line.

### Named Rules
**The Soft Light Rule.** Shadows are diffuse and blue or navy, with large blur and negative spread. Never a hard offset shadow.

## Shapes

Soft and rounded throughout. Panels 28px, agent cards and the "all agents" card 36px, the approval box and inline sign-off boxes 28px, fields 14px, the skip link 12px, checkboxes 14px, the footer's top corners 40px. Buttons, pills, accordion toggles, rail arrows, the rail track, step discs and check chips are fully round. Borders are 1px, faint (cardborder at 40 to 70%), usually drawn as inset rings; dividers between list rows are the same faint line.

Rubber stamps remain the signature round form: two concentric rings (3.2 and 1.3 stroke on a 120 grid), ring text in condensed caps, initials or a line icon in the centre, rotated a few degrees off square, roughened by a shared SVG ink filter.

**The Soft Corner Rule.** Nothing that holds content has a sharp corner. Containers start at 14px; anything tag-like or pressable is a full pill.

## Components

### Buttons
Liquid-metal pills.
- **Shape:** fully round, min height 3.1rem, 0 1.6rem padding, weight 620 at 0.97rem, arrow trailing.
- **Primary:** deep blue metal: a 120deg royal to accent to cobalt gradient with an ice highlight at the top left and a navy shade at the bottom right; metal primary shadow.
- **Hover / Focus:** a white highlight sweeps across the face (0.9s), the button rises 1px and scales to 1.02, the arrow nudges 3px right, the glow widens. Active scales to 0.98. Focus ring is a 2px ice outline at 3px offset. Reduced motion drops the sweep and the movement.
- **Secondary:** lighter, glassier navy metal with an ice rim; hover brightens the rim and adds an ice glow.
- **Small:** 2.6rem tall, 0 1.15rem, 0.9rem type; header and inside the signed approval box.

### Chips
- **Pill tag:** reference mono in a full-round pill, card navy at 60% with a faint border; used for "Example", "Any agent" and counts. Text accent when it points to an action.
- **Promise check:** a 20px ice-tinted disc (ice at 15%) with an ice check, followed by the promise in ledger grey-blue; hero only.
- **Status marks:** condensed caps at about 0.62rem with a 6px mark, no container. Live is ice text with a filled ice mark; pilot, in build, coming soon and priced-per-engagement are ledger grey-blue with an outlined mark.

### Cards / Containers
- **Panel:** 28px corners, a 180deg gradient from card navy at 62% to form-stock navy at 50%, a 1px hairline navy border at 45%, panel shadow. Padding 40px/20px on mobile, 56px/48px from 768px.
- **Shadow Strategy:** panel shadow at rest (see Elevation).
- **Border:** faint and solid; never dashed for decoration.

### Inputs / Fields
- **Style:** 14px corners, 1px hairline navy at 80%, midnight fill at 55%, the label set inside the top edge (0.6rem from top, 0.85rem from left), value at 1rem (never smaller, to stop iOS zoom).
- **Focus:** border turns ice and the fill deepens to 85%; hover border is stamp-ink blue at 70%.
- **Error:** border goes ledger grey-blue and dashed. Disabled buttons drop to 70% opacity.

### Navigation
- **Header:** fixed, 64px, midnight at 90% with a faint bottom edge. The Brocare AI mark (36px tall, 40px from 768px) on the left. Links in Archivo 500 at 0.95rem, ledger grey-blue, white on hover and when current; a 2px stamp-ink underline scales in from the left and stays for the current page. A 1px accent reading-progress line fills along the bottom edge.
- **Mobile:** full-height midnight panel that unrolls from the top (clip-path, 0.35s); links at 2rem bold, width 104%, with a trailing accent arrow; primary and WhatsApp buttons full width.
- **Links in copy:** 1px underline in ledger grey-blue at 35%, offset 0.28em, turning stamp-ink blue on hover.
- **Footer:** form-stock navy with 40px top corners; the full Brocare AI logo with its tagline (64px tall), then condensed-caps column heads over link lists.

### Accordion (FAQ)
All questions closed by default; opening one closes the other. Each row is a full-width button (question type, 24px vertical padding) with a 36px round toggle on the right: card navy with a faint ring when closed (ring turns accent on hover), solid accent when open, its plus collapsing to a minus. The answer drops down by animating grid rows from 0fr to 1fr with a fade (0.5s, out curve), in body type. Rows are divided by faint lines; closed answers are inert and hidden from assistive tech.

### Hero Robot
The Spline scene fills the right 52% of the hero on 1024px and up and is interactive. It never mounts on smaller screens or under reduced motion, so phones never download the runtime. Two aurora blobs (accent and cobalt radial gradients, no blur filter) drift over 34s and 41s; a 440px spotlight (white to ice to accent) follows the cursor with a 0.14 lerp on fine pointers only.

### Rubber Stamp (signature)
Tones: stamp-ink blue for an agent's initials or icon, ice for Approved, hairline navy "ghost" for agents not yet live, white for a void mark. Default 96px; 58px on schedule lines, 84px on cards, 64px in sign-off boxes. Stamps press in (scale from about 2x, rotate back 16 to 22 degrees, back-out overshoot).

### Agent Card (signature)
In order: the agent's stamp breaking the top edge on a midnight disc, the agent name (1.3rem bold), the line number and group (reference + condensed label), a two-line tagline, a divider fading from hairline navy to transparent (accent on hover), the cadence stat with its label, and the status mark. 17.5rem wide (18.5rem from 640px), 36px corners, a card-to-form-stock gradient with a faint inset ring. Pilot and coming-soon cards are dimmed to 75% with a ghost stamp. Linked cards lift 6px on hover, ring to accent at 60%, gain the card hover glow, stamp tips -12 degrees. The strip ends with a filled "all agents" card in the royal-to-cobalt gradient. The wheel moves the strip only while the pointer rests on the cards and the page is still, and hands back to the page at either end; touch snaps card to card.

### Example Schedule and Approval Box (signature)
A panel of five example agent lines, each with a mono entry that types in and an initials stamp that presses. The approval box below is a 28px-corner midnight well with an accent ring; an ice Approved stamp follows the pointer inside it and presses on click, the box turns ice-tinted (ice at 7%, ice ring at 50%), every line reads Approved, and the demo button appears in place. Always tagged with the "Example" pill.

### Sign-off Band
Closes every page: a panel with a display title on the left and, on the right, a handwritten signature that draws with the scroll over a white sign-here line marked with an accent X, labelled in condensed caps, with the demo and WhatsApp buttons below.

## Do's and Don'ts

### Do:
- **Do** set every content section on a rounded panel: 28px corners, soft navy gradient, faint border, panel shadow.
- **Do** make every button a liquid-metal pill, and every tag, toggle and small control fully round.
- **Do** keep ice for live, approved and the hero's promises, plus the focus ring, caret and the light inside metal.
- **Do** set exactly one gradient word per title.
- **Do** set anything typed (entries, codes, dates, line numbers) in Martian Mono, and field labels in 72%-width Archivo caps.
- **Do** dim pilot and coming-soon items to 75% with ghost stamps and outlined status marks.
- **Do** tag demonstration content with the "Example" pill so nothing reads as a claim.
- **Do** keep FAQ answers folded until the question is clicked.
- **Do** keep the robot desktop-only and off under reduced motion; the aurora carries the hero everywhere else.
- **Do** keep content visible by default: entrance states apply only after the motion gate opts in, reduced motion skips all of it, and a 4s fallback restores everything if the choreographer never starts.

### Don't:
- **Don't** use sharp corners or square boxes on anything that holds content.
- **Don't** outline every part: no registration crop marks, section folios, printed top strips, ruled paper or margin rules. Dividers stay faint and only where they help reading.
- **Don't** use hard offset shadows.
- **Don't** add colours outside the fixed brand palette.
- **Don't** dress a pilot or coming-soon item as live (no ice, no blue stamp, no full opacity).
- **Don't** show FAQ answers open by default on the landing page.
- **Don't** use em dashes in any typeset copy, and don't set titles that address brokers directly.
