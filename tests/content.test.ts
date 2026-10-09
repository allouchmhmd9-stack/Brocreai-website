import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { agents } from "../lib/content/agents.ts";
import { beyond, bundles } from "../lib/content/bundles.ts";
import { enginePages } from "../lib/content/engines.ts";
import { faqGroups } from "../lib/content/faq.ts";
import { about, caseStudy } from "../lib/content/pages.ts";
import { en } from "../lib/i18n/en.ts";

// Public copy rules. The approval wording may never claim that nothing at all is automatic:
// the instant acknowledgement to someone who contacts you first is sent on its own.
const APPROVAL =
  "No outreach, post or accounting entry goes out without a person on your team saying yes. The only automatic message is the instant acknowledgement to someone who contacts you first.";

const copy = JSON.stringify({ en, faqGroups, about, caseStudy, bundles, beyond, enginePages, agents });
const files = ["app/llms.txt/route.ts", "components/sections/ExampleSchedule.tsx"].map((f) => readFileSync(f, "utf8")).join("\n");
const all = copy + "\n" + files;

test("no blanket claim that nothing at all goes out without approval", () => {
  for (const phrase of [
    "Nothing goes out until",
    "You approve everything",
    "Nothing reaches a prospect until",
    "nothing reaches a prospect until",
    // Site-wide "how it connects" step; the Outreach Engine's own page may say it of its emails.
    "already works. Every email waits for your approval.",
    "none of them act on your behalf without your say-so",
    "nothing goes out without it",
    "now happen on their own",
  ]) {
    assert.ok(!all.includes(phrase), `blanket approval claim still present: "${phrase}"`);
  }
});

test("the FAQ, about page and landing intro use the exact approval wording", () => {
  const faq = faqGroups.flatMap((g) => g.items).find((i) => i.q.startsWith("Can I see what an agent is about to do"));
  assert.ok(faq?.a.includes(APPROVAL));
  assert.ok(JSON.stringify(about).includes(APPROVAL));
  assert.ok(en.intro.facts.some((f) => f.body.includes(APPROVAL)));
  assert.ok(en.schedule.lead.includes(APPROVAL));
});

test("the accounting work is never described as fully automated", () => {
  assert.ok(!/fully automated/i.test(copy));
});

test("copy speaks to insurers, brokers and agents, never to brokerages alone", () => {
  assert.ok(!copy.includes("where a brokerage quietly loses"));
  assert.ok(!copy.includes("most brokerages and mid-size insurers"));
});

test("no em dashes, no Arabic claim, no client, insurer or reinsurer names", () => {
  assert.ok(!all.includes("—"));
  assert.ok(!/arabic/i.test(copy));
  for (const name of ["Rawsur", "Fidelity", "UFA", "Mayfair", "Munich Re"]) assert.ok(!all.includes(name), name);
});
