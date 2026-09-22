import assert from "node:assert/strict";
import { test } from "node:test";
import { validateLead } from "../lib/leads/validate.ts";

const good = {
  name: "Test Person",
  company: "Example Insurance",
  role: "Head of Sales",
  country: "Lebanon",
  contact: "a@b.co",
  message: "We want to automate our quotes.",
  consent: true,
};

test("accepts a complete lead", () => {
  const r = validateLead(good);
  assert.equal(r.ok, true);
});

test("accepts a phone number as contact", () => {
  assert.equal(validateLead({ ...good, contact: "+961 81 00 00 00" }).ok, true);
});

test("flags missing and invalid fields", () => {
  const r = validateLead({ ...good, name: " ", contact: "nope", message: "short" });
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.equal(r.errors.name, "required");
    assert.equal(r.errors.contact, "contact_invalid");
    assert.equal(r.errors.message, "message_short");
  }
});

test("rejects link-stuffed messages", () => {
  const r = validateLead({ ...good, message: "see http://a.com http://b.com http://c.com now" });
  assert.equal(r.ok, false);
});

test("strips control characters and caps length", () => {
  const r = validateLead({ ...good, name: "A\u0000B\nC" + "x".repeat(500) });
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.ok(!/[\u0000-\u001f]/.test(r.value.name));
    assert.ok(r.value.name.length <= 100);
  }
});

test("consent must be an explicit true", () => {
  for (const consent of [undefined, false, "true", "on", 1]) {
    const r = validateLead({ ...good, consent });
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.errors.consent, "consent_required");
  }
});

test("non-object input is rejected, not thrown", () => {
  assert.equal(validateLead(null).ok, false);
  assert.equal(validateLead("x").ok, false);
});
