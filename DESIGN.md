---
name: Brocare AI
description: A full AI team for insurance, set as a live placing slip that waits for a human stamp.
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
    fontSize: "clamp(2.7rem, 6.1vw, 5.9rem)"
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
  sm: "2px"
  DEFAULT: "3px"
  md: "4px"
  stamp: "9999px"
spacing:
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "40px"
  ruled-line: "36px"
  sheet-max: "84rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "0 1.35rem"
    height: "3.1rem"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "0 1.35rem"
    height: "3.1rem"
  button-secondary-hover:
    backgroundColor: "{colors.card}"
  button-sm:
    padding: "0 1rem"
    height: "2.55rem"
  sheet:
    backgroundColor: "{colors.mid}"
    rounded: "0"
    padding: "40px 32px"
  field-box:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.white}"
    rounded: "0"
    padding: "1.7rem 0.85rem 0.7rem"
  line-card:
    backgroundColor: "{colors.mid}"
    textColor: "{colors.white}"
    rounded: "0"
    padding: "0 24px 24px"
    width: "17.5rem"
  line-card-hover:
    backgroundColor: "{colors.card}"
  status-live:
    textColor: "{colors.ice}"
    typography: "{typography.label}"
  status-pending:
    textColor: "{colors.textsec}"
    typography: "{typography.label}"
  stamp:
    textColor: "{colors.accent}"
    rounded: "{rounded.stamp}"
    size: "96px"
  stamp-approved:
    textColor: "{colors.ice}"
    rounded: "{rounded.stamp}"
  stamp-ghost:
    textColor: "{colors.cardborder}"
    rounded: "{rounded.stamp}"
---

# Design System: Brocare AI

## Overview

**Creative North Star: "The Placing Slip"**

The site is set as a live insurance placing slip. Every surface is a printed form sheet on navy stock: hairline rules, condensed field labels, typed entries, reference codes, tick boxes, sign-here lines and round rubber stamps. Each agent writes and initials its own line; the last box on the document always belongs to the visitor, who approves it with a stamp. The system refuses the category default of a 3D robot hero floating over glass feature cards.

Density is that of a working document: tight labels, generous reading measure, sections that read as consecutive pages of one form (folio marks such as "§ 05 · Conditions" and "BAI-01 · p.5"). Depth comes from ink and paper, never from light: tonal navy sheets, hairline borders, crop marks at the corners and a faint fixed grain over everything. Motion follows the same metaphor: rules draw, headings rise out of their baseline, entries type, stamps press.

The brand palette is fixed and blue-only. Ice is the scarcest colour on any screen because it means something: live, or approved.

**Key Characteristics:**
- Navy form stock with hairline rules and registration crop marks; no glass, no glow cards.
- One variable family (Archivo) carrying three voices through its width axis, plus Martian Mono for anything typed onto the slip.
- Square corners everywhere; only stamps are round.
- Ice reserved for live and approved states.
- Pilot and coming-soon items print as dashed outlines and ghost stamps, never as live.
- Motion grammar: rules draw, entries type, stamps press; fully gated behind reduced-motion.

## Colors

A fixed, all-blue brand palette on near-black navy, where one bright ice tone is held back as a signal.

### Primary
- **Royal Press Blue** (primary): the primary button fill, section rules that open each part of the document, the left margin rule inside sheets (at 40% opacity), text selection. The colour of the printed form itself.
- **Stamp Ink Blue** (accent): rubber stamp ink, crop marks, the section mark in every folio, active nav underline, reading-progress rule, button hover fill, field hover border, the inked connector on scroll. The most frequent accent.

### Secondary
- **Ice Signal** (ice): only where something is live or approved: live status marks, the Approved stamp and its dashed box, the focus ring, the text caret, the bright middle stop of the gradient word. Never decorative.

### Tertiary
- **Deep Cobalt** (gradientblue): part of the fixed brand palette and declared as a token, but not used anywhere in the shipped build. Reserved; do not introduce it without a reason the system can name.

### Neutral
- **Midnight Ground** (deep): page background, header, field-box fill (at 55%, 85% on focus), the disc behind a card's stamp.
- **Form Stock Navy** (mid): the sheet colour for every framed section, line cards, hero slip.
- **Card Navy** (card): hover state only (line card hover, secondary button hover wash, approval box hover).
- **Hairline Navy** (cardborder): every border and rule on the form, ruled-paper lines (at 32%), ghost stamps, scrollbar thumb.
- **Ledger Grey-Blue** (textsec): labels, leads, body copy, pending status.
- **Paper White** (white): headings, entries of record, button text, the signature stroke.

### Named Rules
**The Earned Ice Rule.** Ice appears only when something is live or has been approved (plus the functional focus ring and caret). If an element is not live, not approved and not focused, it is not ice.

**The One Gradient Word Rule.** Every marketing title carries exactly one emphasised word in the white-to-ice-to-accent gradient (100deg, white 0%, ice 46%, accent 100%). Never two, never a whole line.

**The Fixed Stock Rule.** The palette is the brand's and is closed. Tints are made by opacity on existing tokens, not by new hex values.

## Typography

**Display Font:** Archivo, variable with width axis (with system-ui, sans-serif)
**Body Font:** Archivo (same family, normal width)
**Label/Mono Font:** Martian Mono, variable with width axis (with ui-monospace, monospace)

**Character:** One grotesque plays three roles by width: condensed caps for printed field labels (72%), normal for reading, slightly expanded and heavy for display (104%). Martian Mono is the typewriter: whatever an agent or a person wrote into a field.

### Hierarchy
- **Display** (760, clamp(2.7rem, 6.1vw, 5.9rem) on the landing slip, clamp(2.4rem, 5.2vw, 4.8rem) on inner page heroes, 0.98): page titles and the closing sign-off title. Balanced wrap.
- **Headline** (720, clamp(2rem, 3.9vw, 3.5rem), 1.02): section titles inside sheets.
- **Title** (680, clamp(1.25rem, 1.8vw, 1.6rem), 1.12): condition steps, clause and card titles.
- **Lead** (400, clamp(1.05rem, 1.25vw, 1.2rem), 1.6, max 62ch): the paragraph under a title, in ledger grey-blue.
- **Body** (400, 1rem, 1.7, max 68ch): running copy, ledger grey-blue.
- **Label** (620, 0.7rem, 0.14em, uppercase, width 72%): the caps printed on every form box: "Description", "Approved by", "Territory", status marks, footer column heads.
- **Reference** (Martian Mono 0.68rem, 0.02em): form codes, folios, line numbers (L.01), dates, the boxed "Example" tag.
- **Entry** (Martian Mono, width 88%, -0.01em, set at 0.74 to 0.78rem): typed values: agent outputs, particulars, the approval box prompt.
- **Stat** (700, 2.6rem, 1, -0.04em, tabular figures, width 92%): the cadence number on an agent line card.

### Named Rules
**The Typed Entry Rule.** Mono means written onto the form: entries, references, codes, dates and line numbers. Headlines, body and buttons are never mono.

**The Printed Label Rule.** Field labels are always condensed caps in Archivo at 72% width, sitting on or inside a hairline. They name a field; they do not introduce a heading.

## Layout

A single centred sheet column (max 84rem) with side gutters of 20px, 32px from 640px and 40px from 1024px. The landing reads as one continuous document: each section is a framed sheet with a top strip carrying its section mark on the left and its folio on the right, a hairline under the strip, and, from 1024px, a vertical margin rule in royal blue at 40% set 4rem in from the left edge with content indented to 6rem. Sections sit close together (24 to 32px vertical gap) so the sheets stack like pages; the closing sign-off band opens up to 80 to 112px.

Inside sheets, content follows a 12-column grid at 1024px and above: the landing slip splits 7/5 (Insured field left, agent lines right, divided by a hairline), inner page heroes 8/4 or 10/2. Ruled paper uses a 36px line pitch. Below 1024px everything stacks to one column; horizontal rails (agent cards) scroll with the bar hidden. The header is fixed at 64px with a reading-progress rule along its bottom edge.

**The Folio Rule.** A section mark lives in a sheet's top strip or at the right-hand end of a section rule, set small in the reference face with the mark in stamp-ink blue. It is never stacked above a heading.

## Elevation & Depth

The system is flat and printed. Depth is conveyed by the tonal step from midnight ground to form-stock navy, by hairline borders, crop marks, ruled lines and a fixed fractal grain at 4.5% opacity over the whole page so the navy reads as stock rather than plastic. Hover lifts are physical and small (line cards rise 6px and brighten to card navy); nothing floats.

### Shadow Vocabulary
- **Press edge + ink bleed** (`box-shadow: inset 0 -2px 0 rgba(5,8,26,0.35), 0 10px 28px -14px rgba(45,111,255,0.9)`): the primary button only, so it reads as a pressed printed tab. Hover deepens to `0 16px 36px -14px`; active inverts to `inset 0 2px 4px rgba(5,8,26,0.45)`.

### Named Rules
**The Printed Not Lifted Rule.** Sheets, cards, fields and chips carry no shadow. The primary button is the single element with a cast, and it is soft and blue, never a hard offset.

## Shapes

Forms are rectilinear. Corners are square to barely softened: 2px on buttons and the focus ring, 3px default, 4px maximum; sheets, cards, fields and chips are square. Frames are 1px hairlines; registration crop marks (14px, 2px accent strokes) sit on a sheet's top-left and bottom-right corners. State is carried by stroke style: solid for live and issued, dashed for pilot, coming soon, the empty approval box and invalid fields. Tick boxes are drawn squares with a square-capped check. Status marks are 6px squares: filled ice for live, outlined for everything else.

The only round forms are rubber stamps: two concentric rings (3.2 and 1.3 stroke on a 120 grid), ring text running the band in condensed caps, initials or a line icon in the centre, rotated a few degrees off square, roughened by a shared SVG ink filter (turbulence displacement plus speckle).

**The Square Form Rule.** If it is not a stamp, it is not round.

## Components

### Buttons
Printed tabs that press like a stamp.
- **Shape:** near-square (2px), min height 3.1rem, 0 1.35rem padding, weight 640 at 0.97rem, arrow glyph trailing.
- **Primary:** royal press blue fill, white text, press-edge shadow (see Elevation).
- **Hover / Focus:** fill steps to stamp-ink blue, arrow slides 4px right on the out-expo curve; active drops 1px and inverts the shadow. Focus ring is a 2px ice outline at 3px offset.
- **Secondary:** transparent with a hairline navy border; hover turns the border stamp-ink blue and washes the fill with card navy at 70%.
- **Small:** 2.55rem tall, 0 1rem padding, 0.9rem type; used in the header and inside the signed approval box.

### Status Marks (chips)
- **Style:** label face at about 0.62rem with a 6px square bullet, no container.
- **State:** Live is ice text with a filled ice square; pilot, in build, coming soon and priced-per-engagement are ledger grey-blue with an outlined square.

### Cards / Containers
- **Sheet:** form-stock navy, 1px hairline border, square, crop marks; top strip with mark and folio over a hairline; content padding 40px/20px on mobile, 56px/40px with a 6rem left indent from 1024px.
- **Background:** mid for sheets and cards; card navy only on hover.
- **Shadow Strategy:** none (see Elevation).
- **Border:** hairline navy solid for issued content, dashed for anything not yet live.

### Inputs / Fields
- **Style:** a printed box: 1px hairline border, midnight fill at 55%, the label set inside the top edge (0.6rem from top, 0.85rem from left), value at 1rem (never smaller, to stop iOS zoom).
- **Focus:** border turns ice and the fill deepens to 85%; hover border is stamp-ink blue at 70%.
- **Error:** border goes ledger grey-blue and dashed. Disabled buttons drop to 70% opacity.

### Navigation
- **Header:** fixed, 64px, midnight at 97% with a hairline bottom. Logo mark followed by a mono "AI" tag in a stamp-ink border. Links in Archivo 500 at 0.95rem, ledger grey-blue, white on hover and when current; a 2px stamp-ink underline scales in from the left on hover and stays for the current page. A 1px accent reading-progress rule fills along the header's bottom edge.
- **Mobile:** full-height midnight panel that unrolls from the top (clip-path, 0.35s); links set at 2rem bold, width 104%, each on a hairline row with a trailing accent arrow; primary and WhatsApp buttons full width.
- **Links in copy:** underlined at 1px in ledger grey-blue at 35%, offset 0.28em; the underline turns stamp-ink blue on hover.

### Rubber Stamp (signature)
The one round object and the system's signature. Tones: stamp-ink blue for an agent's initials, ice for Approved, hairline navy "ghost" for agents not yet live, white for a void mark. Default 96px; 58px on hero lines, 84px on cards, up to 200px as a page seal. Stamps press in (scale from about 2x, rotate back 16 to 22 degrees, back-out overshoot). Seals can turn slowly with scroll. On the landing slip, an ice Approved stamp follows the pointer over the dashed approval box and presses on click.

### Agent Line Card (signature, user-pinned anatomy)
In order: the agent's stamp breaking the top edge (on a midnight disc), the agent name (1.3rem bold), the line number and group row (reference + condensed label), a two-line tagline, a hairline rule that turns stamp-ink blue on hover, the cadence stat with its label, and the status mark. 17.5rem wide (18.5rem from 640px), form-stock navy, 24px side padding. Live cards have a solid hairline; pilot and coming-soon cards are dashed with a ghost stamp. Linked cards lift 6px on hover, border to stamp-ink blue, fill to card navy, stamp tips -12 degrees.

### Section Rule
A 1px royal press blue rule that draws left to right, with the folio set in the reference face at its right-hand end.

### Sign-off Band
Closes every page: a sheet with a display title on the left and, on the right, a handwritten signature stroke that draws with the scroll over a white sign-here line marked with an accent X, labelled in condensed caps, with the demo and WhatsApp buttons below.

## Do's and Don'ts

### Do:
- **Do** build every section as a sheet of the same document: form-stock navy, hairline frame, crop marks, top strip with mark and folio.
- **Do** keep ice for live and approved states, the focus ring and the caret only.
- **Do** set exactly one gradient word per title.
- **Do** set anything typed onto the slip (entries, codes, dates, line numbers) in Martian Mono, and field labels in 72%-width Archivo caps.
- **Do** print pilot and coming-soon items as dashed outlines with ghost stamps and outlined status squares.
- **Do** tag demonstration content with the boxed "Example" reference so nothing reads as a claim.
- **Do** follow the motion grammar: rules draw (1.3s, expo out), headings rise by line (1.15s, 0.085s stagger), blocks settle from a 6px blur, entries type by character, stamps press with a back-out overshoot.
- **Do** keep content visible by default: entrance states apply only after the motion gate opts in, reduced motion skips all of it, and a 4s fallback restores everything if the choreographer never starts.

### Don't:
- **Don't** round anything that is not a stamp beyond 4px.
- **Don't** stack a section mark, form code or label above a heading; it belongs in the top strip or at the end of a rule.
- **Don't** add shadows to sheets, cards, fields or chips, and never use a hard offset shadow.
- **Don't** add colours outside the fixed brand palette.
- **Don't** dress a pilot or coming-soon item as live (no ice, no solid border, no blue stamp).
- **Don't** use em dashes in any typeset copy, and don't set titles that address brokers directly.
- **Don't** fall back to the category default: 3D robot heroes, glass feature cards, glowing gradient panels.
