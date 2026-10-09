import assert from "node:assert/strict";
import { test } from "node:test";
import { hashTarget } from "../lib/hash.ts";

// A stand-in document: getElementById only, like the real one, never a selector parser.
const el = (id: string) => ({ id }) as unknown as HTMLElement;
const doc = (...ids: string[]) => ({ getElementById: (id: string) => (ids.includes(id) ? el(id) : null) });

test("finds the element a normal hash points at", () => {
  assert.equal(hashTarget("#lead-engine", doc("lead-engine"))?.id, "lead-engine");
});

test("hashes that are not valid CSS selectors do not throw", () => {
  // These used to crash every page on desktop through document.querySelector(hash).
  for (const h of ["#1", "#_=_", "#a b", "#%E0%A4%A", "#a.b", "#:~:text=x"]) {
    assert.doesNotThrow(() => hashTarget(h, doc()));
  }
  assert.equal(hashTarget("#1", doc("1"))?.id, "1");
});

test("decodes escaped ids and ignores an empty hash", () => {
  assert.equal(hashTarget("#a%20b", doc("a b"))?.id, "a b");
  assert.equal(hashTarget("", doc("x")), null);
  assert.equal(hashTarget("#", doc("")), null);
});
