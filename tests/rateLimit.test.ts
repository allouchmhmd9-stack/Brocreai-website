import assert from "node:assert/strict";
import { test } from "node:test";
import { createRateLimiter } from "../lib/leads/rateLimit.ts";

test("blocks after max and reports retry time", () => {
  const t = 0;
  const rl = createRateLimiter({ windowMs: 1000, max: 2, now: () => t });
  assert.equal(rl.check("k").ok, true);
  assert.equal(rl.check("k").ok, true);
  const third = rl.check("k");
  assert.equal(third.ok, false);
  if (!third.ok) assert.ok(third.retryAfterSec >= 1);
});

test("window resets and keys are independent", () => {
  let t = 0;
  const rl = createRateLimiter({ windowMs: 1000, max: 1, now: () => t });
  assert.equal(rl.check("a").ok, true);
  assert.equal(rl.check("b").ok, true);
  assert.equal(rl.check("a").ok, false);
  t = 1500;
  assert.equal(rl.check("a").ok, true);
});

test("memory stays bounded", () => {
  const rl = createRateLimiter({ windowMs: 60_000, max: 1, maxKeys: 10, now: () => 0 });
  for (let i = 0; i < 100; i++) rl.check(`k${i}`);
  assert.equal(rl.check("k99").ok, false);
});
