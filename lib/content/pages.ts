import type { Seg } from "@/lib/i18n";

const s = (t: string, g = false): Seg => (g ? { t, g } : { t });

export type Block = { h: string; p: string[] };

export const about = {
  metaTitle: "About Brocare AI: built inside a real insurance brokerage",
  metaDescription:
    "Brocare AI was built inside Brocare Insurance Brokerage to solve real problems first. Now it runs for insurers, brokerages and agents across the Middle East and Africa.",
  title: [s("We automated our own brokerage first. Then we decided to "), s("sell", true), s(" it.")],
  intro: [
    "Brocare AI did not start as a pitch deck. It started on an ordinary day inside Brocare Insurance Brokerage: a producer spending forty-five minutes building one quote by hand, a good lead going cold because nobody got back to them in time, a stack of insurer statements nobody had the hours to reconcile that week. We did not call a software company. We built the fix ourselves, used it inside our own brokerage every single day, and only sold it once we trusted it with our own business.",
    "That is still true today. Brocare AI runs parallel to Brocare Insurance Brokerage. Not as a demo environment, not as a showcase, but as the actual system our own team uses to quote, follow up, prospect and report, every working day. When you see an agent on this site, you are looking at something running live in a real brokerage right now, not a concept.",
  ],
  blocks: [
    {
      h: "Built by insurance people, not software people who read about insurance",
      p: [
        "Most companies selling AI for insurance have never quoted a policy, chased a renewal or reconciled a bordereau. We have. Brocare AI comes out of a team with real, day-to-day experience running an insurance brokerage: the actual workflows, the actual paperwork, the actual pressure of a client waiting on a quote. That is the difference between software adapted to fit insurance and software built inside it from day one.",
        "Insurance is not like other industries when it comes to AI. The data is sensitive. The regulations are real. The margin for error on a quote, a policy document or a client communication is close to zero. A generic automation agency can wire up a chatbot for a restaurant just as easily as for an insurer, and it shows. We only do this. Every agent, every workflow, every decision in how this platform is built starts from the question: what does an actual brokerage or insurer need, exactly, today.",
      ],
    },
    {
      h: "How we think about AI: it prepares, you decide",
      p: [
        "Every agent inside Brocare AI drafts, scores, flags and prepares. None of them send, publish or act on your behalf without your review, until you have explicitly told the system you are ready for more autonomy, and even then, the control stays fully in your hands. We built it this way for our own brokerage first, because we were not willing to let a system make a client-facing decision without us seeing it. That standard does not change for anyone we sell to.",
      ],
    },
    {
      h: "Where we work",
      p: [
        "Brocare AI is based in Beirut, running alongside Brocare Insurance Brokerage, and built for the Middle East and Africa first, the exact markets we know from the inside. Our home base is Lebanon, with real, active relationships already open across the DRC, Congo-Brazzaville, Nigeria, Cote d'Ivoire and Guinea, and the Gulf is next. As we grow, that focus stays the same: insurance-native AI for the region we actually understand, before anywhere else.",
      ],
    },
    {
      h: "Beyond the standard bundles",
      p: [
        "Not every business fits a standard package, and we do not force it to. Alongside the bundles on this site, we build fully custom AI tools and agents for specific businesses and workflows, priced individually, based on what it actually takes and what it is worth to you, never off a rate card. If what you need does not exist in our catalog yet, that is a conversation, not a dead end.",
      ],
    },
    {
      h: "The guarantee",
      p: [
        "We back every build with the same promise, no exceptions: your first workflow is live and producing real output within two weeks of kickoff, or we keep working at no additional cost until it is. It is the same standard we hold ourselves to internally. If it is not fast enough for our own brokerage, we do not consider it done.",
      ],
    },
  ] as Block[],
  ctaLead: "Ready to see it running?",
};

export const caseStudy = {
  metaTitle: "Case study: how Brocare Insurance runs on Brocare AI",
  metaDescription:
    "The real story of the brokerage that built Brocare AI, uses it every day, and used it to open relationships with some of Africa's largest insurers.",
  title: [s("Built in a real brokerage. Proven every day. Ready for "), s("yours", true), s(".")],
  intro: [
    "Before Brocare AI was a company, it was a set of tools built to fix problems inside Brocare Insurance Brokerage, our own business. It still runs there today, every day, alongside every client we have sold it to since. This is that story.",
  ],
  blocks: [
    {
      h: "How we actually use it",
      p: [
        "Every morning at Brocare Insurance starts with one brief instead of five separate check-ins: pipeline, new leads, market signals, what needs approval, and the day's call list, all in one place before anyone has had coffee. Through the day, quoting that used to take the better part of an hour now takes seconds. Leads that would have needed a manual search now land in the pipeline twice a week, already verified and scored. Follow-ups that used to depend on someone remembering now happen on their own. None of this is a pilot programme running alongside our real work. It is our real work now.",
      ],
    },
    {
      h: "How it became our best lead-generation channel",
      p: [
        "The clearest proof of what this system can do did not come from a sales pitch. It came from the system itself, working. An agent searching for prospects matching our targeting profile surfaced Rawsur, the Democratic Republic of Congo's largest non-life insurer by market share, rated Moody's AA- and reinsured by Munich Re, as a ranked lead, the same way it surfaces every other prospect. The outreach engine drafted the first approach. A reply became a meeting. The meeting became a real, ongoing relationship. Mayfair Insurance Congo followed the exact same path shortly after.",
        "That is not a demo we built to impress anyone. It is what happened when we pointed our own prospecting system at our own targets and let it work, and it is the single best argument we have for what it can do for you, because we did not build it to prove a point. We built it to find business, and it found some of the most respected insurers in the region.",
      ],
    },
    {
      h: "The icebreaker that changed conversations",
      p: [
        "Here is what we did not expect going in: the system itself became one of our strongest relationship-building tools. Opening a conversation with \"let me show you something we built and use ourselves\" lands completely differently than a cold pitch. It is proof before a single promise is made. More than once, a meeting that started as a courtesy call turned into a real conversation about partnership because the person across the table watched a real lead get researched, scored and drafted in front of them, live, on their own company as the example. That is not something a slide deck can do.",
      ],
    },
    {
      h: "What changed inside our own team",
      p: [
        "The honest version of this story is not just that we got more leads. It is that the bottlenecks that used to slow every part of our week (the quote that sat in a queue, the follow-up that got forgotten, the proposal that took a day to put together) are gone. Our team works faster and more effectively, individually and together, because the repetitive parts of the job stopped being their job. That shows up in how many conversations we can run at once, how quickly we respond to a client, and how much of our actual time goes to the parts of the business that need a person's judgement instead of a person's typing speed.",
      ],
    },
    {
      h: "The full picture",
      p: [
        "Reconciliation. Lead generation. Outreach. Follow-up. Document generation. Quoting. Quote comparisons. Offer generation. Market intelligence. Content. Everything a working insurance brokerage does day to day, we have built an agent for, because we needed one, not because it looked good on a feature list. That is the actual operating system running underneath Brocare Insurance Brokerage right now, and it is exactly what we sell.",
      ],
    },
    {
      h: "Why we are selling it",
      p: [
        "We did not set out to become a software company. We set out to fix our own brokerage, and it worked well enough, consistently enough, that keeping it to ourselves stopped making sense. The efficiency, the speed, the relationships it has already helped us build: that is not a hypothetical pitch. It is what happened to us. The best of it, honestly, is probably still ahead of us, and now it is available to run inside your business the same way it runs inside ours.",
      ],
    },
  ] as Block[],
  ctaLead: "See it for yourself. We will show you a real agent working on a real example from your market, not ours.",
};
