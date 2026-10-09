export type FaqItem = { q: string; a: string };
export type FaqGroup = { title: string; items: FaqItem[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "What is Brocare AI, exactly?",
        a: "An AI operating system built specifically for insurance: a set of AI agents that handle lead generation, follow-up, quoting, document creation, market intelligence, and soon reconciliation and claims tracking, so your team spends less time on repetitive work and more time on clients. It was built inside a real insurance brokerage before it was ever sold to anyone else.",
      },
      {
        q: "Do I need an IT team or any technical knowledge to use this?",
        a: "No. If you can use WhatsApp and a web browser, you can use Brocare AI. There is nothing to install, nothing to configure at a code level, and no technical staff required on your side.",
      },
      {
        q: "How is this different from hiring a developer to build something similar?",
        a: "A developer builds you a tool. We hand you an entire operating system, already built, already proven inside a real brokerage, that keeps improving. When something breaks at 2am because a model updated or an API changed, that is on us, not you. You are not buying code. You are buying a team that has already solved the problem you are about to hand someone to solve from scratch.",
      },
      {
        q: "How long until something is actually working?",
        a: "Two weeks, guaranteed. Your first real workflow is live and producing genuine output inside two weeks of kickoff, or we keep working for free until it is. This is not a marketing promise. It is a contractual guarantee we put in writing.",
      },
      {
        q: "What happens after I book a demo?",
        a: "A short call where we show a live agent working on a real example from your market, not a slideshow. If it is a fit, the next step is a Readiness Audit: a short, paid engagement where we map your actual workflows, quantify what is costing you time, and scope exactly what to build first.",
      },
      {
        q: "Do you only sell fixed engines, or can you build something custom for us?",
        a: "Both. The engines on this site are built once and sold repeatedly, which is why they are fast and affordable. If what you need is genuinely different (a custom tool, a new agent for a specific process, even a website or an app) we build that to order, priced on the scope, the time, and the value it creates for your business specifically. No two custom builds are priced the same, on purpose.",
      },
    ],
  },
  {
    title: "How it works",
    items: [
      {
        q: "Do I need to install anything on my computer or my team's computers?",
        a: "No. Nothing is ever installed on any device. You get a login link to your own dashboard, and you connect the tools you already use (your inbox, WhatsApp, your CRM) the same way you would grant a new employee access, not the way you would install software.",
      },
      {
        q: "How does Brocare AI connect to my email, WhatsApp or CRM?",
        a: "Through secure, standard connections (OAuth logins or API keys) that you control and can revoke at any time. We never ask for your passwords, and access is scoped to exactly what each agent needs, nothing more.",
      },
      {
        q: "Can I see what an agent is about to do before it happens?",
        a: "Yes, always. Every agent prepares and queues its work (a drafted email, a proposal, a follow-up) for your one-tap approval. No outreach, post or accounting entry goes out without a person on your team saying yes. The only automatic message is the instant acknowledgement to someone who contacts you first. It confirms the enquiry arrived and that a person will reply.",
      },
      {
        q: "What if an agent makes a mistake?",
        a: "Every agent's output goes through your review before it reaches a client, which is exactly the point of the approval step. Beyond that, agents are tested against real examples of what good looks like for your business, gathered from you directly during onboarding, so the system is checked against your own standard, not a generic one.",
      },
      {
        q: "What languages does it work in?",
        a: "English and French, the two languages our markets do business in. Tell us your markets during onboarding and we set each agent to the right one.",
      },
      {
        q: "Can any agent go in any engine?",
        a: "Yes. The engines are there to guide you towards a starting point that works on day one. Nothing in them is fixed. Any agent can be added to any engine, and the Readiness Audit is where we put together the exact set for your business.",
      },
    ],
  },
  {
    title: "Security and data",
    items: [
      {
        q: "Who can see my data?",
        a: "Only you and your own team, by design. Every client's data is separated at the database level, not just filtered by a setting, and that isolation is tested against deliberate attacks, not just assumed to hold.",
      },
      {
        q: "Do you train your AI on my data?",
        a: "No. Your data is never used to train any model, for us or anyone else. It exists to run your agents, full stop.",
      },
      {
        q: "We are a regulated company and our data is sensitive. Is that a problem?",
        a: "It is exactly what we built for. Client-owned accounts and credentials, a full audit log of every action, an approval gate on everything that leaves the system (apart from the instant acknowledgement to a website enquiry), and a documented data processing agreement and retention policy are all standard, not upgrades.",
      },
      {
        q: "You work with other insurers and brokers. Could you ever be a conflict of interest?",
        a: "No. Every client's data and configuration is fully isolated from every other client's, with contractual data isolation in writing. Where an engine depends on a specific insurer's own rate books, we only extend it to another broker with that insurer's written permission, never quietly.",
      },
      {
        q: "What happens to my data if I stop using Brocare AI?",
        a: "You can request full deletion at any time, across every system it touches, and we will confirm it in writing. It is your data before, during and after working with us.",
      },
    ],
  },
  {
    title: "Pricing and engagement",
    items: [
      {
        q: "How much does this cost?",
        a: "It depends entirely on what you need. A single engine for a small agency and a full network rollout for a regional insurer are priced completely differently, and we would rather price it honestly against your situation than publish a number that is wrong for almost everyone who reads it. Book a discovery call or a Readiness Audit and you will have a real number, specific to you, fast.",
      },
      {
        q: "What is the Readiness Audit, and do I need it?",
        a: "It is a short, paid, fixed-scope engagement where we map exactly how your team works today, quantify what it is costing you in time, and hand you a prioritised plan, with a live agent demo included. It is the fastest way to get an accurate build plan and price, and most clients start here.",
      },
      {
        q: "What is included in Platform Access?",
        a: "Ongoing use of your agents on a schedule you control, seats for your team, monthly reporting on what the system actually produced (leads, hours saved, documents generated), and a standing relationship where we propose new workflows as your business grows. When you are ready for it, a Fractional Head of AI retainer turns quarterly expansion into an ongoing strategic relationship rather than a one-off project.",
      },
      {
        q: "We are an insurer. Can we roll this out to our whole broker network?",
        a: "Yes, and it is one of the strongest ways to work with us. An insurer can sponsor Brocare AI across its entire broker and agent network: one sale, seats for everyone in it, syndicated market intelligence shared across the network at almost no added cost per broker. One insurer, forty brokers, all under one rollout.",
      },
      {
        q: "Can I just get a quote to compare you against other vendors?",
        a: "We would rather be honest: this is not a labour bid, and we do not compete on being the cheapest line item on a spreadsheet. If you want to understand real value against real cost, a discovery call will get you there faster than a quote request will.",
      },
      {
        q: "Does this replace my team?",
        a: "No. It removes the repetitive parts of their job so they can spend their time on the parts that actually need a person: judgement calls, relationships and closing. Every client we have built for has kept their team and made it faster, not smaller.",
      },
    ],
  },
  {
    title: "About the company",
    items: [
      {
        q: "What is the difference between Brocare AI and Brocare Insurance?",
        a: "Brocare Insurance Brokerage is a real, operating insurance brokerage in Beirut. Brocare AI is a separate company, founded by the same team, that packages the AI system built inside that brokerage and sells it to other insurers, brokerages and agents, including ones that compete with Brocare Insurance. Your data and relationship stay entirely separate from theirs.",
      },
      {
        q: "Why should I trust an AI vendor that is connected to a brokerage, especially if I compete with them?",
        a: "Because the alternative, a vendor who has never actually run a brokerage, has never felt the problems they are claiming to solve. Every client's data is contractually isolated, and the platform exists specifically because insurance-native AI is a genuinely hard, specific problem, not because anyone is trying to learn your book of business.",
      },
      {
        q: "Do you only work with companies in Lebanon and the DRC?",
        a: "Those are where we started, because that is where our own relationships and proof are strongest. Brocare AI is built for the Middle East and Africa broadly, with active markets already spanning Lebanon, the DRC, Congo-Brazzaville, Nigeria, Cote d'Ivoire and Guinea, and the Gulf next. If you are an insurer, brokerage or agent anywhere in the region, book a call and let's talk.",
      },
    ],
  },
];

// The three shown on the landing page.
export const landingFaq: FaqItem[] = [
  faqGroups[1].items[2],
  faqGroups[0].items[3],
  faqGroups[3].items[0],
];
