import type { Seg } from "@/lib/i18n";

// The engines: the strongest stand-alone products, each a group of agents working together.
// Three have their own page; the rest link to their agent on /agents.
// Copy rules: no em dashes, no invented numbers, no client, insurer or reinsurer names.

const s = (t: string, g = false): Seg => (g ? { t, g } : { t });

export type EngineStep = { title: string; body: string };

export type EnginePage = {
  slug: "accounting" | "outreach" | "marketing";
  name: string;
  status: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  title: Seg[];
  lead: string;
  proof: string;
  steps: EngineStep[];
  outputs: string[];
  control: string[];
  agents: string[];
};

export const enginePages: EnginePage[] = [
  {
    slug: "accounting",
    name: "Accounting Engine",
    status: "Running on our own books",
    icon: "Calculator",
    metaTitle: "Accounting Engine: insurer statements reconciled for you",
    metaDescription:
      "The Accounting Engine reads insurer statements, matches every line to your records, checks commission and prepares the month for your accountant's sign-off.",
    title: [s("Statements reconciled to the "), s("cent", true), s(", ready for your sign-off.")],
    lead: "The Accounting Engine reads your insurer statements, matches every line against your records, checks the commission, and hands your accountant a finished reconciliation to review. Nothing becomes final until a person signs it off.",
    proof:
      "Before offering it to anyone, we ran it on eight months of our own brokerage's statements. Every month balanced to the cent, and running the same month twice gives exactly the same result.",
    steps: [
      { title: "Read the statements", body: "Insurer statements arrive as PDF or Excel, in different layouts. The engine learns each layout once and reads every line from then on." },
      { title: "Match every line", body: "Each line is matched to your records, policy by policy. Reversals, endorsements and carried differences are handled the way your accountant handles them." },
      { title: "Check the commission", body: "Commission is checked against your agreed rates, and anything off the table is flagged before it reaches the books." },
      { title: "Flag what does not fit", body: "Anything that does not reconcile is listed clearly with its reason, and a query letter to the insurer is drafted for you." },
      { title: "Prepare the month", body: "Your reconciliation sheet and bordereaux are built in the layout your team already uses, ready for review." },
      { title: "Sign off and seal", body: "Your accountant reviews, decides and signs off. The month is then sealed, so the record cannot quietly change later." },
    ],
    outputs: [
      "A reconciled month, every line accounted for",
      "Unmatched items listed with their reason",
      "Commission checked against your rates",
      "Draft query letters to insurers",
      "Your reconciliation sheet, in your own layout",
      "Bordereaux built and checked cell by cell",
    ],
    control: [
      "Nothing is final until your accountant signs it off",
      "The same month always gives the same result",
      "Every decision is recorded, with who made it",
      "A sealed month only changes through a new, recorded run",
    ],
    agents: ["cipher"],
  },
  {
    slug: "outreach",
    name: "Outreach Engine",
    status: "In final testing",
    icon: "Megaphone",
    metaTitle: "Outreach Engine: cold email, replies and follow-up, approved by you",
    metaDescription:
      "The Outreach Engine writes personal first emails, follows up on schedule, reads every reply and drafts your answer. Every email waits for your approval.",
    title: [s("Outreach that never forgets to "), s("follow up", true), s(".")],
    lead: "The Outreach Engine runs your email outreach from first touch to booked call. It writes a personal first email for every prospect, follows up on schedule, reads every reply and drafts your answer. Every email waits for your approval before it goes anywhere.",
    proof: "Built for our own brokerage's outreach first, and tested in depth before a single email goes out for anyone else.",
    steps: [
      { title: "Check every address", body: "Each address is verified before it is used, so your domain is not burned on bounces." },
      { title: "Write the first email", body: "A short, personal first email for each prospect, in your voice, drafted for you to approve." },
      { title: "Follow up on schedule", body: "Polite follow-ups are drafted days ahead and wait in your approvals, so no one slips through." },
      { title: "Read every reply", body: "Replies are read and sorted, and an answer is drafted in the same thread, ready for you to send." },
      { title: "Alert you on WhatsApp", body: "Hot replies and booked calls reach your team on WhatsApp straight away." },
      { title: "Protect your sender name", body: "Spam signals are watched every day, and sending pauses on its own if they rise." },
    ],
    outputs: [
      "Personal first emails, ready to approve",
      "Follow-ups drafted days ahead",
      "Reply drafts in the right thread",
      "WhatsApp alerts for hot replies",
      "A weekly report on what worked",
    ],
    control: [
      "Nothing sends until you approve it",
      "Reply drafts sit in your own mailbox, never sent for you",
      "Sending pauses on its own if spam signals rise",
      "Switch it off at any time",
    ],
    agents: ["speed-to-lead-drafting", "follow-up-monitor", "lead-activation"],
  },
  {
    slug: "marketing",
    name: "Marketing Engine",
    status: "In use at Brocare",
    icon: "Sparkles",
    metaTitle: "Marketing Engine: a content studio for your brand",
    metaDescription:
      "The Marketing Engine plans, writes and designs your content in your brand voice, then schedules it once you approve. One engine, every channel, one calendar.",
    title: [s("A content studio that sounds like "), s("you", true), s(".")],
    lead: "The Marketing Engine plans, writes and designs your content in your own brand voice: carousels, reel scripts and posts. It schedules each piece only once you approve it. One engine, every channel, one calendar.",
    proof: "It runs our own brand's content first, from the monthly plan to the approved post.",
    steps: [
      { title: "Learn your brand", body: "Your voice, audience, offers and visual style are written down once, so every piece sounds like you." },
      { title: "Plan the month", body: "Content pillars and a calendar built around what your buyers care about." },
      { title: "Write and design", body: "Carousels, reel scripts, hooks and captions, designed in your brand." },
      { title: "Check the quality", body: "Every piece passes a quality check and a plain-language pass before you see it." },
      { title: "Approve and schedule", body: "You approve each piece. Only then is it scheduled to your channels." },
      { title: "Learn from results", body: "Performance is tracked and fed back into next month's plan." },
    ],
    outputs: [
      "A monthly content calendar",
      "Carousels and posts in your brand",
      "Reel and video scripts with hooks",
      "Captions for every channel",
      "A studio to review, edit and approve",
    ],
    control: [
      "Nothing is posted until you approve it",
      "Your brand voice, written down and kept",
      "Edit any piece before it goes out",
      "Pause or change the plan at any time",
    ],
    agents: ["content-engine", "content-calendar"],
  },
];

export const engineBySlug = (slug: string) => enginePages.find((e) => e.slug === slug);

// Every engine shown on the landing page, in order. `href` is where "See the engine" goes.
export const showcase = [
  { name: "Lead Engine", href: "/agents#lead-engine" },
  { name: "Outreach Engine", href: "/engines/outreach" },
  { name: "Marketing Engine", href: "/engines/marketing" },
  { name: "Accounting Engine", href: "/engines/accounting" },
  { name: "Quote Desk", href: "/agents#instant-proposals" },
  { name: "Morning Brief", href: "/agents#morning-brief" },
];
