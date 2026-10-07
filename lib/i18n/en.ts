// English copy. Every visible UI string lives here so a locale can override it. Long-form page
// copy (bundles, agents, FAQ, about, case study) lives in lib/content/*.
// Heading emphasis: segments with g:true render in the gradient treatment, one word per title.
//
// Copy rules: no em dashes; no invented proof; titles do not address brokers directly
// ("insurers" is the light word we use); only live agents are promised.

export type Seg = { t: string; g?: boolean };
const s = (t: string, g = false): Seg => (g ? { t, g } : { t });

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? U[] | undefined
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

const updated = "21 September 2026";

export const en = {
  meta: {
    title: "Brocare AI: AI Agents for Insurance Brokers, Agents & Insurers",
    description:
      "The insurance-native AI operating system, built inside a real brokerage and proven every day. Quoting, leads, follow-up and documents, automated. Book a demo.",
    ogAlt: "Brocare AI: the AI teams insurers never had to hire",
  },
  nav: {
    engines: "Engines",
    agents: "Agents",
    about: "About",
    faq: "FAQ",
    caseStudy: "Case study",
    demo: "Book a demo",
    whatsapp: "Message us on WhatsApp",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    home: "Brocare AI home",
    skip: "Skip to content",
    menuLabel: "Main menu",
    breadcrumb: "Breadcrumb",
    homeCrumb: "Home",
  },
  hero: {
    title: [s("The AI "), s("teams", true), s(" insurers never had to hire.")],
    sub: "The insurance-native AI operating system for brokers, agents and insurers. Built inside a real brokerage, proven every day, ready for yours.",
    secondary: "Meet the agents",
    chips: ["Nothing to install", "You approve everything", "Live in two weeks, guaranteed"],
  },
  schedule: {
    title: [s("Every line waits for your "), s("approval", true), s(".")],
    lead: "An example of what five live agents hand over before the day starts. Each one writes its line and initials it. Nothing goes out until someone signs it off.",
  },
  intro: {
    title: [s("The AI operating system built inside a real insurance brokerage. Now "), s("yours", true), s(".")],
    lead: "Every agent on this site runs each working day inside Brocare Insurance Brokerage, our own brokerage in Beirut. It quotes, prospects, follows up and reports for us first. Then it does the same for you.",
    facts: [
      { title: "Built by insurance people", body: "Quoting, renewals, bordereaux, statements. We have done the work the agents now do." },
      { title: "It prepares, you decide", body: "Every agent drafts, scores and flags. Nothing reaches a prospect until you approve it." },
      { title: "Middle East and Africa first", body: "Beirut is home. Active relationships across the DRC, Congo-Brazzaville, Nigeria, Cote d'Ivoire and Guinea. The Gulf is next." },
    ],
  },
  bundlesTeaser: {
    title: [s("Pick an engine. Add "), s("any", true), s(" agent.")],
    lead: "Engines are complete pieces of your operation, built from agents already running in a real brokerage. Start with one and add more as you grow.",
    rule: "Engines are there to guide you. Nothing is fixed: any agent can be added to any engine.",
    more: "See the engine",
    cta: "See all engines",
  },
  agentsTeaser: {
    title: [s("Meet the "), s("agents", true), s(" already doing the work.")],
    lead: "Each one prepares its work and hands it to you for approval. Live agents carry the ice mark. The ones still in pilot or in build are dimmed, never dressed up as live.",
    note: "What each agent does, what it produces, when it runs and how it is customised.",
    cta: "See all agents",
    prev: "Scroll agents left",
    next: "Scroll agents right",
  },
  how: {
    title: [s("How it "), s("connects", true), s(" to your tools.")],
    lead: "Nothing to install. You give access the way you would give a new hire, and you can take it back at any time.",
    steps: [
      { title: "Give access", body: "A login to a scoped dashboard, or an OAuth or API connection to the tools you already use." },
      { title: "Choose the scope", body: "You pick which agents run and what they can see. Switch any of it off whenever you want." },
      { title: "Approve the work", body: "Leads, drafts and briefs arrive where your team already works. Every email waits for your approval." },
    ],
  },
  guarantee: {
    big: "2 weeks",
    title: [s("Live in two "), s("weeks.", true), s(" Or we keep working free.")],
    body: "Your first workflow is live and producing real output within two weeks of kickoff. If it is not, we keep working at no additional cost until it is.",
    definition: "A workflow means one engine, connected to your tools, producing its first real output.",
  },
  faqTeaser: {
    title: [s("The questions we get asked "), s("most", true), s(".")],
    lead: "Three of the questions every first call starts with. The full list covers how it works, security, pricing and the company.",
    cta: "Read all the answers",
  },
  closing: {
    title: [s("Insurance is slow. We made it "), s("fast", true), s(".")],
    lead: "A 30-minute call. We show you a live agent working on a real example from your market, not a slideshow.",
  },
  pages: {
    bundles: {
      metaTitle: "AI engines for insurance: sales, intelligence, quoting and more",
      metaDescription:
        "Packaged AI engines for insurance: lead generation, market intelligence, quoting and documents, content, and inbox automation. See what each engine does.",
      title: [s("Quote faster. Follow up faster. Close "), s("faster", true), s(".")],
      lead: "Brocare AI is sold in engines, not single features, because a lead generator without a way to reach out is half a tool, and a quoting engine without documents to send is the same. Every engine below is a complete, working piece of your operation, built from agents already proven inside a real brokerage. Start with one. Add more as you grow.",
      rule: "Engines are there to guide you. Nothing is fixed: any agent can be added to any engine.",
      agentsIn: "Agents in this engine",
      produces: "What it produces",
      why: "Why it matters",
      beyondTitle: [s("Beyond the "), s("engines", true), s(".")],
      promise: "Every engine ships with the same promise: live and producing real output within two weeks, or we keep working free until it is.",
    },
    agents: {
      metaTitle: "Meet the agents: Brocare AI's full roster",
      metaDescription:
        "Every AI agent inside Brocare AI, explained: what it does, what it produces, how it runs, and how to customise it for your business.",
      title: [s("Meet the "), s("agents", true), s(".")],
      lead: "Every agent below is real, running, and already doing this work inside our own brokerage. Not a concept, not a prototype. Each one prepares its work and hands it to you for approval; none of them act on your behalf without your say-so.",
      rule: "Any agent can be added to any engine. The engines are a guide, not a fixed menu.",
      jump: "Jump to a group",
      fields: {
        does: "What it does",
        outputs: "The outputs",
        how: "How it works",
        when: "When it runs",
        custom: "How customisable it is",
      },
      closing: "Seen enough? Book a demo and watch two or three of these run on a real example from your own market.",
    },
    faq: {
      metaTitle: "FAQ: how Brocare AI works, costs and protects your data",
      metaDescription:
        "Answers on how Brocare AI works, what it costs, how your data is protected, and how fast you can get started.",
      title: [s("Questions, "), s("answered", true), s(".")],
      lead: "Everything a first call usually covers, written down.",
      jump: "Jump to a section",
    },
    about: {
      seeAgents: "See the agents",
      caseStudyLead: "the full story of the brokerage this was built in.",
    },
  },
  demo: {
    metaTitle: "Book a demo",
    metaDescription: "A 30-minute call where we show a live Brocare AI agent working on a real example from your market. Or message us on WhatsApp.",
    title: [s("Book a "), s("demo", true), s(".")],
    lead: "A 30-minute call. We show you a live agent working on a real example from your market, not a slideshow, and tell you which engine fits.",
    afterTitle: "What happens after you book",
    afterBody: "A short call with a live agent on a real example. If it is a fit, the next step is a Readiness Audit: a short, paid engagement where we map your workflows, quantify what is costing you time, and scope exactly what to build first.",
    bookLead: "Pick a 30-minute slot. It goes straight into our calendar.",
    bookCta: "Pick a time",
    orLead: "Prefer to write? WhatsApp is the fastest way to reach us.",
    whatsappLead: "The fastest way to reach us is WhatsApp.",
    whatsappCta: "Message us on WhatsApp",
    whatsappPrefill: "Hello Brocare AI, I would like to book a demo.",
    call: "Call",
    email: "Email",
    visit: "Visit",
    hoursLabel: "Hours",
    form: {
      name: "Full name",
      company: "Company",
      role: "Role",
      country: "Country",
      contact: "Email or WhatsApp number",
      message: "What takes most of your week?",
      messageHint: "Prospecting, follow-ups, quotes or reports. One line is enough.",
      consentLabel: "I agree that Brocare AI may contact me about this request.",
      consentLink: "How we use your details",
      submit: "Book a demo",
      sending: "Sending...",
      successTitle: "Request received.",
      successBody: "We will contact you on the email or number you gave us to set a time.",
      again: "Send another request",
      errorTitle: "Your request did not go through.",
      errorBody: "Try again in a moment, or message us on WhatsApp.",
      rateTitle: "Too many attempts from this connection.",
      rateBody: "Wait a few minutes and try again, or message us on WhatsApp.",
      fixTitle: "Check the highlighted fields.",
      errors: {
        required: "This field is required.",
        contact_invalid: "Enter a valid email address or phone number.",
        message_short: "Add a little more detail (at least 10 characters).",
        links: "Remove the links and try again.",
        consent_required: "Tick this box so we can reply to you.",
      },
    },
  },
  footer: {
    initiative: "An initiative of",
    rights: "All rights reserved.",
    pagesHeading: "Pages",
    contactHeading: "Contact",
    legalHeading: "Legal",
    privacy: "Privacy policy",
    terms: "Terms and conditions",
    cookies: "Cookie policy",
    refunds: "Refund policy",
  },
  notFound: {
    metaTitle: "Page not found",
    code: "404",
    title: "This page does not exist.",
    body: "The link is old or mistyped. The home page has everything, or you can message us on WhatsApp.",
    home: "Back to home",
  },
  error: {
    title: "Something went wrong on our side.",
    body: "Reload the page and try again. If it keeps happening, message us on WhatsApp.",
    retry: "Try again",
  },
  // Legal pages. Drafted from how the site actually works. Have a qualified lawyer in
  // Lebanon review them before launch.
  legal: {
    updatedLabel: "Last updated",
    updated,
    privacy: {
      metaTitle: "Privacy policy",
      metaDescription:
        "What Brocare AI collects through this website, why, who processes it and how to see, correct or delete your data.",
      title: "Privacy policy",
      sections: [
        {
          h: "Who we are",
          p: [
            "Brocare AI is an initiative of Brocare Insurance Brokerage s.a.r.l., Beirut, Ein El Tineh, Mousaitbeh 5046, 4th Floor, Lebanon. We are responsible for the personal data described here.",
            "Contact for anything in this policy: ali.m@brocareinsurance.com.",
          ],
        },
        {
          h: "What we collect",
          p: [
            "Through the demo form: your name, company, role, country, an email address or WhatsApp number, what you tell us takes most of your week, and your consent to be contacted.",
            "If you message us on WhatsApp, call us or email us, we receive what you send.",
            "Our hosting provider keeps short-lived technical logs (such as IP address and browser type) to run and protect the site. We do not use them to identify you.",
          ],
        },
        {
          h: "Why we collect it",
          p: [
            "Only to reply to your request and follow up about a demo or engagement. We rely on the consent you give when you tick the box on the form. You can withdraw it at any time by writing to us.",
          ],
        },
        {
          h: "Who processes it for us",
          p: [
            "Vercel hosts this website. Resend delivers the demo form to our inbox by email. Both process data on our behalf and may store it outside Lebanon.",
            "If you use WhatsApp or a Google Maps link on this site, those services apply their own privacy policies.",
            "We do not sell your data or share it for advertising.",
          ],
        },
        {
          h: "How long we keep it",
          p: [
            "We keep an enquiry for as long as we need it to respond and follow up. If it does not become an engagement, we delete it.",
          ],
        },
        {
          h: "Your rights",
          p: [
            "You can ask to see, correct or delete the data we hold about you, or withdraw your consent, by writing to ali.m@brocareinsurance.com.",
            "We handle personal data in line with Lebanese Law No. 81 of 2018 on Electronic Transactions and Personal Data.",
          ],
        },
        {
          h: "Cookies",
          p: ["This site sets no cookies. The cookie policy explains the details."],
        },
      ],
    },
    terms: {
      metaTitle: "Terms and conditions",
      metaDescription:
        "The terms for using the Brocare AI website: what the site is, how engagements are agreed, intellectual property and governing law.",
      title: "Terms and conditions",
      sections: [
        {
          h: "About these terms",
          p: [
            "These terms cover your use of this website, run by Brocare AI, an initiative of Brocare Insurance Brokerage s.a.r.l., Beirut, Lebanon. By using the site you accept them.",
          ],
        },
        {
          h: "What this site is",
          p: [
            "This site describes our services. It does not sell anything and takes no payments. Descriptions of engines and agents are a summary and can change as the services develop.",
          ],
        },
        {
          h: "How engagements are agreed",
          p: [
            "Any work we do for you is governed by a written engagement letter signed by both sides. It sets the scope, fees, payment terms, data handling and the two-week guarantee. If it conflicts with anything on this site, the engagement letter wins.",
          ],
        },
        {
          h: "Using the site",
          p: [
            "Do not use the site or the demo form to send spam, links, malicious code or anything unlawful, and do not try to break or overload it. We may block traffic that does.",
          ],
        },
        {
          h: "Intellectual property",
          p: [
            "The Brocare name and logo, the site design and the text on it belong to Brocare Insurance Brokerage s.a.r.l. You may link to the site. Do not copy it or reuse its content without our written permission.",
          ],
        },
        {
          h: "No advice",
          p: [
            "Nothing on this site is insurance, legal or financial advice. It describes software services only.",
          ],
        },
        {
          h: "Liability",
          p: [
            "We keep the site accurate and available, but we provide it as it is. To the extent the law allows, we are not liable for losses caused by relying on the site or by it being unavailable.",
          ],
        },
        {
          h: "Governing law",
          p: [
            "These terms are governed by the laws of Lebanon. The courts of Beirut have jurisdiction.",
          ],
        },
        {
          h: "Contact",
          p: ["Questions about these terms: ali.m@brocareinsurance.com or +961 1 82 33 00."],
        },
      ],
    },
    cookies: {
      metaTitle: "Cookie policy",
      metaDescription:
        "Brocare AI sets no cookies and runs no analytics or advertising trackers. What happens when you follow a link to WhatsApp or Google Maps.",
      title: "Cookie policy",
      sections: [
        {
          h: "Cookies on this site",
          p: [
            "This site sets no cookies. It runs no analytics, advertising or tracking scripts, and it loads its fonts from our own server. That is why there is no cookie banner.",
          ],
        },
        {
          h: "Links to other services",
          p: [
            "Some links open other services: WhatsApp, Google Maps, and a booking calendar if we offer one. Those services may set their own cookies once you are on their site, under their own policies.",
          ],
        },
        {
          h: "If this changes",
          p: [
            "If we add analytics or anything that sets cookies, we will update this page first and ask for your consent where the law requires it.",
          ],
        },
      ],
    },
    refunds: {
      metaTitle: "Refund policy",
      metaDescription:
        "How fees, the two-week guarantee and refunds work for Brocare AI engagements. The website itself takes no payments.",
      title: "Refund policy",
      sections: [
        {
          h: "This website takes no payments",
          p: ["Nothing is sold or paid for on this site, so there is nothing to refund here."],
        },
        {
          h: "Engagements",
          p: [
            "Fees, payment terms, cancellation and any refunds for our services are set out in the engagement letter you sign with us before work starts.",
          ],
        },
        {
          h: "The two-week guarantee",
          p: [
            "If your first workflow is not running and producing output within two weeks of kickoff, we keep working at no charge until it is. The engagement letter sets out exactly how this applies to you.",
          ],
        },
        {
          h: "Questions",
          p: ["Write to ali.m@brocareinsurance.com about anything on this page."],
        },
      ],
    },
  },
};

export type Dictionary = typeof en;
