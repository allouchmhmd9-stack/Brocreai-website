---
name: Brocare AI
description: A full AI team for insurance, set on open navy that blends section into section, with soft glass cards, icon tiles, an interactive robot up front and liquid-metal buttons.
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
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.2vw, 4.7rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.01em"
  display-page:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 5vw, 4.3rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3.1rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0"
  title:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.01em"
  stat:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "1.9rem"
    fontWeight: 700
    lineHeight: 1
    fontFeature: "'tnum'"
  question:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.4vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.03rem, 1.2vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  button:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.97rem"
    fontWeight: 620
    lineHeight: 1
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
rounded:
  sm: "8px"
  DEFAULT: "12px"
  md: "14px"
  lg: "18px"
  xl: "22px"
  2xl: "28px"
  3xl: "36px"
  footer: "40px"
  tile: "16px"
  full: "9999px"
spacing:
  gutter-sm: "20px"
  gutter-md: "32px"
  gutter-lg: "40px"
  sheet-max: "84rem"
  header: "64px"
  section-y: "5.5rem"
  section-y-md: "7rem"
  card-pad: "28px"
  card-pad-md: "32px"
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
  glass-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.white}"
    rounded: "{rounded.2xl}"
    padding: "{spacing.card-pad}"
  icon-tile:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ice}"
    rounded: "{rounded.tile}"
    size: "3rem"
  icon-tile-ghost:
    backgroundColor: "{colors.card}"
    textColor: "{colors.textsec}"
    rounded: "{rounded.tile}"
  icon-tile-ice:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.ice}"
    rounded: "{rounded.tile}"
  line-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.white}"
    rounded: "{rounded.2xl}"
    padding: "24px"
    width: "17rem"
  chip:
    textColor: "{colors.textsec}"
    rounded: "{rounded.full}"
    padding: "0.5rem 0.875rem"
  chip-included:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
  chip-added:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
  pill:
    backgroundColor: "{colors.card}"
    textColor: "{colors.textsec}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
  field-box:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "1.7rem 0.85rem 0.7rem"
  accordion-toggle:
    backgroundColor: "{colors.card}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
    size: "36px"
  accordion-toggle-open:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
---

# Design System: Brocare AI

## Overview

**Creative North Star: "Calm Glass"**

The page is one open field of navy. Sections have no boxes around them: they sit on the page ground and fade into each other through a soft darker band with transparent ends, so there is never a hard line between one section and the next. Content lives on soft glass cards (see-through navy, a thin border, an 18px backdrop blur, 28px corners), and each card leads with an icon tile: a line icon in ice on a soft royal square. The hero keeps the interactive Spline robot, drifting aurora and a cursor spotlight; inner pages and the closing band open centred over the same aurora.

Density is relaxed and centred. Section intros sit on the centre line (title, then lead, max 48rem wide), with cards in a grid of three or four below them. Headings are set in Syne, wide and calm; everything read is Inter. There is no monospace and no typed-document furniture. Motion is quiet: headings rise line by line, blocks fade up 18px, ticks draw, one connector fills with the scroll. Buttons are liquid-metal pills with a highlight that sweeps across on hover.

The palette is fixed and blue-only. Ice is the brightest note and marks live, approved and promised states, plus the icon glyphs inside tiles.

**Key Characteristics:**
- Open navy sections that blend into each other; no boxed sections and no hard dividers between them.
- Glass cards: 28px corners, navy at 55%, 1px hairline border, 18px backdrop blur; linked cards lift 4px with a blue glow.
- Icon tiles lead every card: ice line icon on royal at 25%, 16px corners.
- Syne headings, Inter reading, no monospace.
- Centred section intros, inner-page heroes and closing band over aurora.
- Liquid-metal pill buttons with a sweeping highlight.
- Pilot and coming-soon items are dimmed with ghost tiles, never dressed as live.

## Colors

A fixed, all-blue brand palette on near-black navy, with ice held back as the one bright signal.

### Primary
- **Royal Blue** (primary): the icon tile fill (at 25%), included chips in the bundle picker (at 30%), the first stop of the primary button metal, text selection.
- **Signal Blue** (accent): the middle of the button metal, the open accordion toggle, the active nav underline and reading-progress line, hover rings on cards, chips and fields, the far end of the gradient word.

### Secondary
- **Ice** (ice): icon glyphs inside tiles, live status, Approved marks and the approved card, the Day 14 milestone, the hero's promise checks, added chips, the focus ring and caret, the bright middle of the gradient word. As light only: the highlight inside button metal and the secondary button rim.

### Tertiary
- **Deep Cobalt** (gradientblue): the deep end of gradients only: primary button metal and the aurora. Never a flat fill or text colour.

### Neutral
- **Midnight Ground** (deep): page background, header (at 90%), field fill (55%, 85% on focus), the approval demo's rows (at 40%), mobile menu.
- **Night Navy** (mid): footer.
- **Glass Navy** (card): the glass fill (at 55%), pills, the closed accordion toggle, ghost tiles (70%), the selected bundle row (80%).
- **Hairline Navy** (cardborder): the glass border (55%), dividers (40%), chip and pill rings (70%), scrollbar thumb.
- **Grey-Blue** (textsec): leads, body, labels, secondary lines, pending status.
- **White** (white): headings, card titles, button text.

### Named Rules
**The Earned Ice Rule.** Ice as text, a mark or a tinted fill means live, approved or promised (plus the focus ring, the caret and tile glyphs). It is never a heading colour or a large decorative fill.

**The One Gradient Word Rule.** Every marketing title carries exactly one word in the white-to-ice-to-accent gradient (100deg, white 0%, ice 46%, accent 100%). Never two, never a whole line. This is pinned by the client.

**The Fixed Stock Rule.** The palette is the brand's and is closed. Tints are made by opacity on existing tokens, not by new hex values.

## Typography

**Display Font:** Syne (with system-ui, sans-serif)
**Body Font:** Inter (with system-ui, sans-serif)

**Character:** Syne gives every heading a wide, calm, slightly unusual voice; Inter does all the reading and every control, quiet and even.

### Hierarchy
- **Display** (700, clamp(2.5rem, 5.2vw, 4.7rem) in the hero; clamp(2.3rem, 5vw, 4.3rem) on inner-page heroes; clamp(2.2rem, 4.8vw, 4rem) on the closing band; 1.06, balanced wrap): page titles and the closing invitation.
- **Headline** (700, clamp(1.9rem, 3.6vw, 3.1rem), 1.1): section titles.
- **Title** (600, clamp(1.1rem, 1.5vw, 1.3rem), 1.2): card and milestone titles. Agent names on cards run at 1.2rem semibold Syne; the bundle name at 1.45rem bold.
- **Stat** (Syne 700, 1.9rem, 1, tabular figures): the cadence number on an agent card.
- **Question** (Inter 600, 1.15rem, 1.25rem from 768px, snug): accordion questions.
- **Lead** (400, clamp(1.03rem, 1.2vw, 1.15rem), 1.7, max 62ch): the paragraph under a title, grey-blue.
- **Body** (400, 1rem, 1.7, max 68ch): running copy, grey-blue; 0.92 to 0.95rem inside cards.
- **Label** (600, 0.72rem, 0.16em, uppercase, grey-blue at 80%): field names, footer column heads, milestone days. Used sparingly.

### Named Rules
**The Two Voices Rule.** Syne sets headings, card titles and stats; Inter sets everything else, buttons and questions included. No third family, and no monospace.

**The Quiet Label Rule.** Uppercase labels name a field, a column or a milestone day. They never sit above a section heading as a stacked kicker.

## Layout

A single centred column (max 84rem) with side gutters of 20px, 32px from 640px and 40px from 1024px. The fixed header is 64px. Sections are open, padded 5.5rem top and bottom (7rem from 768px); alternate sections carry the blend band so neighbours fade into each other.

Section intros are centred (max 48rem) with the lead under the title, then a grid 56px below (64px from 768px): three cards from 768px for intro and how-it-works, four milestones from 1024px (two from 640px) for the guarantee, all gapped 20px. The approval demo and bundle picker use a 12-column split at 1024px (5/7). Everything stacks to one column below its breakpoint.

The landing hero is full bleed to about 94% of the viewport height from 1024px: copy in the left 7 of 12 columns, the robot behind on the right, a gradient fading the bottom into the page. Below 1024px it is copy only over the aurora. Inner-page heroes are centred: breadcrumb, display title (max 56rem), lead.

The agents rail bleeds past the column with soft masked fades; the wheel scrolls it only while the pointer rests on the cards, and touch snaps card to card. Its scrollbar is hidden.

## Elevation & Depth

Depth comes from translucency and light, not stacked shadows. Glass cards are see-through navy with an 18px backdrop blur over the aurora and the grain; there is no shadow at rest. A fixed fractal grain at 4.5% covers the whole page. Lift and glow are responses to hover only.

### Shadow Vocabulary
- **Glass hover glow** (`box-shadow: 0 20px 50px -24px rgba(45,111,255,0.55)`): linked glass cards on hover, with a 4px lift and the border turning accent at 60%.
- **Metal primary** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -2px 4px rgba(5,8,26,0.5), 0 0 0 1px rgba(45,111,255,0.5), 0 10px 30px -10px rgba(45,111,255,0.7)`): primary button; hover brightens the rim to ice and widens the glow to `0 16px 44px -10px`.
- **Metal secondary** (`box-shadow: inset 0 1px 0 rgba(79,195,247,0.4), inset 0 -2px 4px rgba(5,8,26,0.55), 0 0 0 1px rgba(79,195,247,0.35)`): secondary button; hover adds an ice glow `0 12px 36px -12px`.
- **Header edge** (`box-shadow: 0 1px 0 rgba(30,58,110,0.35)`): the header's bottom line.

### Named Rules
**The Flat Glass Rule.** Glass is flat at rest; it lifts and glows only on hover, and never under reduced motion.

**The Soft Light Rule.** Shadows are diffuse and blue, with large blur and negative spread. Never a hard offset shadow.

## Shapes

Soft and rounded throughout. Glass cards 28px, icon tiles 16px (12px at the small size), inner rows and bundle rows 16px, fields 14px, the skip link 12px, the footer's top corners 40px. Buttons, pills, chips, accordion toggles and tick discs are fully round. Borders are 1px and faint, often drawn as inset rings.

**The Soft Corner Rule.** Nothing that holds content has a sharp corner. Containers start at 14px; anything tag-like or pressable is a full pill.

## Components

### Buttons
Liquid-metal pills.
- **Shape:** fully round, min height 3.1rem, 0 1.6rem padding, Inter 620 at 0.97rem, arrow trailing.
- **Primary:** deep blue metal: a 120deg royal to accent to cobalt gradient with an ice highlight top left and a navy shade bottom right.
- **Hover / Focus:** a white highlight sweeps across the face (0.9s), the button rises 1px and scales to 1.02, the arrow nudges 3px right, the glow widens. Active scales to 0.98. Focus ring is a 2px ice outline at 3px offset. Reduced motion drops the sweep and the movement.
- **Secondary:** lighter, glassier navy metal with an ice rim; hover brightens the rim and adds an ice glow.
- **Small:** 2.6rem tall, 0 1.15rem, 0.9rem type: header, "Approve all", the bundle picker.

### Chips
- **Bundle chips:** full pills, 0.84rem Inter, 0.5rem by 0.875rem. Available: grey-blue text with a hairline ring and a small plus, turning white with an accent ring on hover. Included: royal at 30% with an accent ring. Added: ice at 15% with an ice ring and an "Added" note.
- **Pill tag:** a full pill in glass navy with a hairline ring, 0.78rem grey-blue; marks demonstration content ("Example").
- **Promise check:** a 20px ice-tinted disc (ice at 15%) with an ice check; hero only.
- **Status mark:** 0.78rem medium text with a 6px dot; live is ice with a filled dot, pilot and coming soon are grey-blue with an outlined dot.

### Cards / Containers
- **Corner Style:** 28px.
- **Background:** glass navy at 55% with an 18px backdrop blur.
- **Shadow Strategy:** none at rest; the glass hover glow on linked cards (see Elevation).
- **Border:** 1px hairline navy at 55%.
- **Internal Padding:** 28px, 32px from 768px on feature cards; 24px on agent cards.
- **Approved state:** a card or row that marks something approved or live takes an ice tint (ice at 7%) and an ice inset ring (30 to 40%).

### Icon Tile (signature)
A 3rem square with 16px corners, royal at 25% behind an ice line icon (1.7 stroke). Tones: blue for the default, ice (ice at 15%) once approved, ghost (glass navy at 70% with a hairline ring, grey-blue icon) for agents not yet live. Sizes: 2rem, 3rem, 3.5rem. In how-it-works, the tile carries the step number in bold Syne instead of an icon.

### Inputs / Fields
- **Style:** 14px corners, 1px hairline navy at 80%, midnight fill at 55%, the label set inside the top edge, value at 1rem (never smaller, to stop iOS zoom).
- **Focus:** border turns ice and the fill deepens to 85%; hover border is accent at 70%.
- **Error:** border goes grey-blue and dashed. Disabled buttons drop to 70% opacity.

### Navigation
- **Header:** fixed, 64px, midnight at 90% with a faint bottom edge. Mark on the left. Links in Inter 500 at 0.95rem, grey-blue, white on hover and when current; a 2px accent underline scales in from the left and stays for the current page. A 1px accent reading-progress line fills along the bottom edge.
- **Mobile:** full-height midnight panel that unrolls from the top (clip-path, 0.35s); links at 2rem bold with a trailing accent arrow; primary and WhatsApp buttons full width.
- **Links in copy:** 1px underline in grey-blue at 35%, offset 0.28em, turning accent on hover.
- **Footer:** night navy with 40px top corners; the full logo, then uppercase-label column heads over link lists.

### Agent Card
A glass card 17rem wide (18rem from 640px): a large icon tile with the status mark top right, the agent name (Syne 1.2rem semibold), the group, a two-line tagline, then a faint divider over the cadence stat and its label. Pilot and coming-soon cards drop to 75% opacity with a ghost tile. Linked cards take the glass hover.

### Approval Demo (signature)
A glass card titled "This morning" with an "Example" pill: five agent rows (16px corners, midnight at 40%, small icon tile, agent name, one line of output, "Awaiting approval"). "Approve all" (secondary, small) turns every tile ice, every row reads Approved with an ice tick, and the demo button appears. A reset link undoes it.

### Accordion (FAQ)
Centred, all questions closed by default; opening one closes the other. Each row is a full-width button (question type, 24px vertical padding) with a 36px round toggle: glass navy with a hairline ring when closed (ring turns accent on hover), solid accent when open, its plus collapsing to a minus. The answer opens by animating grid rows from 0fr to 1fr with a fade (0.5s). Rows are divided by faint lines.

### Hero Robot and Aurora
The Spline scene fills the right of the hero from 1024px and is interactive; it never mounts on smaller screens or under reduced motion. Two aurora blobs (accent and cobalt radial gradients) drift over 34s and 41s; a 440px spotlight follows the cursor on fine pointers only. The aurora also sits behind inner-page heroes, the guarantee and the closing band at lower opacity.

### Motion
Five effects only, all on the expo-out curve and gated so content is visible by default: headings rise line by line out of a mask (1.15s, 0.085s stagger); blocks fade up 18px (0.9s, no blur); thin rules draw left to right; ticks draw once; one connector fills with the scroll. Reduced motion skips all of it.

## Do's and Don'ts

### Do:
- **Do** leave sections open on the navy ground and let neighbours fade through the blend band; put content on glass cards (28px, navy at 55%, 1px hairline border, 18px blur).
- **Do** lead a card with an icon tile: ice line icon on royal at 25%, 16px corners.
- **Do** centre section intros, inner-page heroes and the closing band.
- **Do** set headings in Syne and everything else in Inter.
- **Do** make every button a liquid-metal pill, and every tag, chip and toggle fully round.
- **Do** keep ice for live, approved and promised states, tile glyphs, the focus ring and the light inside metal.
- **Do** set exactly one gradient word per title.
- **Do** dim pilot and coming-soon items to 75% with ghost tiles and outlined status dots.
- **Do** tag demonstration content with the "Example" pill so nothing reads as a claim.
- **Do** keep the robot desktop-only and off under reduced motion; the aurora carries the hero everywhere else.
- **Do** keep content visible by default: entrance states apply only after the motion gate opts in.

### Don't:
- **Don't** box whole sections or divide them with hard lines.
- **Don't** use monospace, typed entries, form codes, rubber stamps or line numbers.
- **Don't** put an uppercase label above a section heading.
- **Don't** use sharp corners on anything that holds content.
- **Don't** shadow glass at rest, and never use hard offset shadows.
- **Don't** add colours outside the fixed brand palette.
- **Don't** dress a pilot or coming-soon item as live (no ice, no blue tile, no full opacity).
- **Don't** show FAQ answers open by default.
- **Don't** add typing, stamping, spinning or blur-in entrance effects.
