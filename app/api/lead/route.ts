import { sendLeadEmail } from "@/lib/leads/email";
import { notifyWhatsAppIntake } from "@/lib/leads/notify";
import { createRateLimiter } from "@/lib/leads/rateLimit";
import { validateLead } from "@/lib/leads/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024;
const MIN_FILL_MS = 2500;

const perIp = createRateLimiter({ windowMs: 10 * 60_000, max: 5 });
const global = createRateLimiter({ windowMs: 60 * 60_000, max: 80 });

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

function sameOrigin(req: Request): boolean {
  const host = req.headers.get("host");
  const origin = req.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }
  const site = req.headers.get("sec-fetch-site");
  return site === "same-origin" || site === "none";
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ ok: false }, 403);

  if (!(req.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return json({ ok: false }, 415);
  }

  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BYTES) return json({ ok: false }, 413);
  const raw = await req.text();
  if (Buffer.byteLength(raw) > MAX_BYTES) return json({ ok: false }, 413);

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("shape");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false }, 400);
  }

  const ip = clientIp(req);
  const a = perIp.check(ip);
  const b = global.check("all");
  const limited = !a.ok ? a : !b.ok ? b : null;
  if (limited) return json({ ok: false }, 429, { "Retry-After": String(limited.retryAfterSec) });

  // Bots get a convincing success so they do not learn what tripped the filter.
  const elapsed = body.elapsed;
  if (typeof body.website === "string" && body.website.trim() !== "") return json({ ok: true });
  if (typeof elapsed !== "number" || !Number.isFinite(elapsed)) return json({ ok: false }, 400);
  if (elapsed < MIN_FILL_MS) return json({ ok: true });

  const result = validateLead(body);
  if (!result.ok) return json({ ok: false, errors: result.errors }, 400);

  if (process.env.NODE_ENV !== "production" && process.env.LEAD_DRY_RUN === "1") {
    console.info("[lead:dry-run] accepted", { company: result.value.company, country: result.value.country });
    return json({ ok: true });
  }

  const sent = await sendLeadEmail(result.value);
  if (!sent.ok) {
    console.error("[lead] delivery failed:", sent.reason);
    return json({ ok: false }, sent.reason === "not_configured" ? 503 : 502);
  }

  await notifyWhatsAppIntake(result.value);
  return json({ ok: true });
}
