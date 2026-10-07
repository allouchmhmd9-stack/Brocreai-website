// Bundles as sold. Agents are listed by slug so the pages can link to them. Bundles are a
// guide, not a fixed menu: any agent can be added to any bundle.

export type BundleStatus = "live" | "pilot" | "build" | "custom" | "coming";

export type Bundle = {
  slug: string;
  name: string;
  tagline: string;
  flag?: string;
  body: string;
  produces: string;
  why: string;
  status: BundleStatus;
  statusNote?: string;
  agents: string[]; // agent slugs
  short: string; // one line for the landing page
};

export const bundleStatusLabel: Record<BundleStatus, string> = {
  live: "Live",
  pilot: "In pilot",
  build: "In build",
  custom: "Priced per engagement",
  coming: "Coming soon",
};

export const bundles: Bundle[] = [
  {
    slug: "sales-enablement",
    name: "Sales Enablement",
    flag: "The flagship engine",
    tagline: "Quote faster. Follow up faster. Close faster.",
    short: "New prospects twice a week, outreach and follow-ups drafted for approval, proposals in minutes.",
    body: "This is the engine most companies start with, because it is the one you feel working in the first week. It covers your entire top of funnel: new prospects land on your pipeline automatically, twice a week, already verified and scored out of 100, not a raw list you have to work through yourself. Every lead gets a pre-call research brief before you ever pick up the phone. The moment a lead is worth pursuing, a first-touch outreach email is drafted and ready for your one-tap approval, in your language. If nobody replies, the system does not forget: it reminds you after a week, then drafts the actual follow-up after two, so no lead goes cold from a busy Tuesday. And when a conversation is ready to move forward, a complete, client-ready proposal or a branded pitch deck is ready in minutes, not days.",
    produces: "Scored, verified lead cards with pre-call research attached; drafted first-touch and follow-up emails ready for approval; client-ready proposals and branded pitch decks, generated on demand.",
    why: "The paperwork and busywork that eats a producer's week (list-building, first drafts, remembering to follow up, building a deck from scratch) gets handled automatically, so your team's time goes to the calls and relationships that actually close business.",
    status: "live",
    agents: ["lead-engine", "lead-processor", "pre-call-intelligence", "speed-to-lead-drafting", "lead-activation", "follow-up-monitor", "instant-proposals", "pitch-decks"],
  },
  {
    slug: "market-intelligence",
    name: "Market Intelligence",
    tagline: "A standing research team, without the hire.",
    short: "A brief every morning, plus weekly competitor, country-risk, regulatory and strategy reports.",
    body: "Every morning, your team gets one brief covering your pipeline, new leads, market signals and today's call list, instead of five different places to check. Behind that brief is a full intelligence operation running quietly in the background: what your competitors are actually doing, country-risk shifts in the markets you operate in, and regulatory or licensing changes that affect how you are allowed to do business, each tracked automatically and surfaced the moment something is worth your attention. A weekly strategy memo goes a step further, reviewing your whole pipeline and handing you three concrete moves for the week ahead, not generic advice.",
    produces: "A daily morning brief; daily opportunity and network-relationship signals; weekly competitor intelligence; weekly country-risk updates; weekly regulatory and compliance alerts; a weekly strategy memo.",
    why: "This is the research function most brokerages and mid-size insurers cannot justify hiring a full-time analyst for, delivered as a standing brief instead, at a fraction of the cost of that hire.",
    status: "live",
    agents: ["morning-brief", "opportunity-scanner", "network-intelligence", "country-risk", "competitor-tracking", "regulatory-watch", "weekly-strategy-memo"],
  },
  {
    slug: "quoting-and-documents",
    name: "Quoting & Documents",
    tagline: "Your competitors are still quoting by hand. You don't have to.",
    short: "Instant branded health and motor quotes from your own rate books, and the documents to send with them.",
    body: "What used to take forty-five minutes per quote now takes seconds. Connect your own rate books and this engine turns quoting into an instant, branded, self-serve experience for health and motor lines. Your team opens it and quotes a client directly, any time, without waiting on anyone. A vehicle's fair market value is filled in automatically on every motor quote, so the sum insured is right from day one instead of being argued about at claim time. And every quote can become a polished offer card, a comparison sheet or an invoice with one click, ready to send straight to a client's phone.",
    produces: "Instant, self-serve branded health and motor quotes; automatic vehicle market-value lookups; polished offer cards, comparison sheets and invoices generated from any quote.",
    why: "This is the engine your team touches every single day, which makes it the fastest to prove its value, and the hardest one to go back to working without, once they have felt the difference.",
    status: "live",
    agents: ["health-quoter", "motor-quoter", "vehicle-value-finder", "document-studio"],
  },
  {
    slug: "marketing-and-content",
    name: "Marketing & Content",
    tagline: "Content grounded in something real, not generic filler.",
    short: "Social content drafted twice a week from real market signals, and a calendar planned every Sunday.",
    body: "Twice a week, on-brand social content gets drafted for you. Unlike a generic content tool, it is seeded by real signals your own Market Intelligence engine is already tracking, so posts are grounded in something real happening in your market. A full content calendar is planned every Sunday evening, so posting never starts from a blank page on a Monday. Nothing publishes without your sign-off.",
    produces: "Twice-weekly drafted social content, in English or French; a full weekly content calendar, planned in advance.",
    why: "Consistent, credible content is one of the first things to slip when a team gets busy. This keeps it running without taking anyone off their actual job.",
    status: "live",
    agents: ["content-engine", "content-calendar", "opportunity-scanner"],
  },
  {
    slug: "morning-inbox-copilot",
    name: "Morning Inbox Copilot",
    tagline: "The easiest yes in the whole catalog.",
    short: "Connect your inbox and get what is urgent, drafted replies and a short action list, on demand.",
    body: "Connect your inbox and, on demand, get an instant read on what is actually urgent, drafted replies ready for the easy ones, and everything else turned into a short, clear action list, so opening your inbox stops being the most dreaded part of your morning.",
    produces: "A triaged view of your inbox on demand; drafted replies for routine messages; a short action list for everything else.",
    why: "It is low-commitment, immediately useful, and the fastest way to feel what an AI agent working inside your actual workflow feels like. The natural first step into a bigger relationship.",
    status: "build",
    statusNote: "In build. Ask us for current availability.",
    agents: [],
  },
  {
    slug: "executive-inbox-intelligence",
    name: "Executive Inbox Intelligence",
    tagline: "Reads your inbox every morning. Writes like you. Gets sharper every week.",
    short: "A personal inbox agent for one executive that learns your voice and never sends on its own.",
    body: "The premium version of the Inbox Copilot, built for one person, not a whole company. Every morning, it reads through your inbox, sorts what actually matters, and drafts replies in your own voice. It learns exactly how you write and who matters most to you over time, and it never sends anything on its own. It keeps a searchable history of your correspondence and drafts, and shows you what it is saving you: response times, what it caught that you would have missed, hours back in your week. The longer you use it, the better it gets, and the harder it becomes to imagine working without it.",
    produces: "A sorted inbox and drafted replies every morning; a personal writing-style profile that improves over time; a living priority-contact ranking; ongoing time-saved and response-time analytics.",
    why: "This is the one product in the entire catalog that compounds, priced and built for a single executive or founder who lives in their inbox.",
    status: "pilot",
    statusNote: "In pilot now, priced per person.",
    agents: ["executive-inbox-intelligence"],
  },
  {
    slug: "revenue-autopilot",
    name: "Revenue Autopilot",
    flag: "The lead-to-close email engine",
    tagline: "The full pipeline: find, score, reach out and follow up, from your own inbox.",
    short: "Sales Enablement plus sending and timed follow-ups from your own email, every send approved by you.",
    body: "This is Sales Enablement's more advanced sibling: everything that engine does, plus the ability to actually send, with your own email doing the sending, and to run timed follow-up sequences. Every send is still approved by you, one at a time or as a batch in a single review. The moment someone replies, the sequence stops and hands the conversation to you.",
    produces: "An end-to-end lead pipeline from first research to final follow-up; sent (not just drafted) outreach on your own account once you approve it; timed follow-up sequences that stop the instant someone responds.",
    why: "For a team that has outgrown reviewing every single email by hand, this is the upgrade path: the same engine, with the sending done for you and a whole morning of approvals in one review.",
    status: "build",
    statusNote: "In build. Ask us for current availability.",
    agents: ["lead-engine", "lead-processor", "speed-to-lead-drafting", "follow-up-monitor"],
  },
  {
    slug: "build-to-order-private-ai",
    name: "Build-to-Order Private AI",
    tagline: "Entirely yours. One time. No recurring access from us, ever.",
    short: "A fully private, custom AI assistant built around your business and handed over completely.",
    body: "For companies that want to own their AI system outright: a fully private, custom-built assistant, loaded with deep knowledge of your business, connected to your own tools, and handed over completely. Once it is delivered, we have no ongoing access to it. It runs on your own account, under your own control, permanently.",
    produces: "A private, fully custom AI assistant built specifically around your business and workflows, with complete ownership transferred to you at delivery.",
    why: "The right choice for a company that wants the deepest possible control and privacy, and is willing to trade a recurring relationship for owning the whole thing outright, one time.",
    status: "custom",
    statusNote: "Available now, priced individually for every engagement.",
    agents: [],
  },
  {
    slug: "back-office",
    name: "Back Office",
    tagline: "Reconciliation, renewals and claims, done for you. Coming soon.",
    short: "CIPHER reconciliation plus renewal tracking, claims-status monitoring and receivables follow-up. In development.",
    body: "CIPHER handles statement reconciliation and Excel and balance-sheet building, fully automated, in development now. Claims & Renewals, also in development, adds automatic renewal tracking so nothing lapses unnoticed, claims-communication monitoring so a client is never left wondering where their claim stands, and receivables follow-up so outstanding balances get chased without anyone having to remember to. Built the same way as everything else here: configured to your process, not a generic template.",
    produces: "Reconciled statements with every unexplained item flagged; the working Excel files your team relies on; renewal alerts, claims-status visibility and receivables reminders.",
    why: "The back office is where a brokerage quietly loses hours and money every month. These agents give those hours back.",
    status: "coming",
    statusNote: "In development. Early access goes to clients who ask first.",
    agents: ["cipher", "claims-and-renewals"],
  },
];

export const beyond = [
  {
    title: "Custom builds",
    body: "Not every need fits a package, and we do not force it to. We build fully custom AI tools and agents for a specific business or workflow: a bespoke build for a non-insurance company, a new tool that does not exist in this catalog yet, even a website or an app. Priced individually every time, based on the scope, the time, and the value it creates for your business, never off a rate card.",
  },
  {
    title: "Fractional Head of AI",
    body: "For clients on Platform Access who want more than quarterly check-ins, this turns ongoing expansion into a real retainer: a standing relationship where we propose and ship a new workflow every quarter, review governance and vendor choices, and report to your leadership. Your own head of AI, without the full-time hire.",
  },
  {
    title: "Insurer-sponsored network rollout",
    body: "If you are an insurer, Brocare AI can roll out across your entire broker and agent network in one sale. Every broker in the network gets seats, and market intelligence is syndicated across all of them at almost no added cost per broker. One sale, an entire network running on the same platform, all carrying your name alongside ours.",
  },
];

export const bundleBySlug = (slug: string) => bundles.find((b) => b.slug === slug);
