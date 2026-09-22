// Fixed-window counter held in memory. On serverless each instance keeps its own counts,
// so this is a speed bump, not a guarantee. Add platform-level rate limiting for real protection.

export type RateLimiter = {
  check: (key: string) => { ok: true } | { ok: false; retryAfterSec: number };
};

export function createRateLimiter(opts: {
  windowMs: number;
  max: number;
  now?: () => number;
  maxKeys?: number;
}): RateLimiter {
  const { windowMs, max, now = Date.now, maxKeys = 5000 } = opts;
  const hits = new Map<string, { start: number; count: number }>();

  return {
    check(key) {
      const t = now();
      if (hits.size >= maxKeys) {
        for (const [k, v] of hits) if (t - v.start >= windowMs) hits.delete(k);
        // Still full of live entries: drop the oldest so memory stays bounded.
        if (hits.size >= maxKeys) {
          const oldest = hits.keys().next().value;
          if (oldest !== undefined) hits.delete(oldest);
        }
      }
      const cur = hits.get(key);
      if (!cur || t - cur.start >= windowMs) {
        hits.set(key, { start: t, count: 1 });
        return { ok: true };
      }
      if (cur.count >= max) {
        return { ok: false, retryAfterSec: Math.max(1, Math.ceil((cur.start + windowMs - t) / 1000)) };
      }
      cur.count += 1;
      return { ok: true };
    },
  };
}
