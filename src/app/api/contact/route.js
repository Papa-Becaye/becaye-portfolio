import { validateContact, LIMITS } from "@/utils/validation";

export const dynamic = "force-dynamic";

/**
 * Formulaire de contact — ne simule JAMAIS un envoi réussi.
 * Canaux de livraison, par ordre de priorité :
 *  1. Resend           : RESEND_API_KEY + CONTACT_TO_EMAIL (+ CONTACT_FROM_EMAIL)
 *  2. Webhook / Formspree : CONTACT_FORM_ENDPOINT
 *  3. Base PostgreSQL  : DATABASE_URL (table contact_messages)
 * Si aucun canal n'est disponible → 503 { error: "not_configured" }.
 */

// Limitation de débit simple en mémoire (5 messages / 10 min / IP)
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const clean = (value, max) => String(value ?? "").trim().slice(0, max);
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

async function sendWithResend(data) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: data.email,
      subject: `[Portfolio] ${data.subject}`,
      html: `<p><strong>${escapeHtml(data.name)}</strong> &lt;${escapeHtml(data.email)}&gt; (${escapeHtml(data.lang)})</p><p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>`,
      text: `${data.name} <${data.email}> (${data.lang})\n\n${data.message}`,
    }),
  });
  if (!res.ok) throw new Error(`resend_${res.status}`);
}

async function sendToEndpoint(data) {
  const res = await fetch(process.env.CONTACT_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`endpoint_${res.status}`);
}

async function saveToDatabase(data) {
  const [{ db }, { contactMessages }] = await Promise.all([import("@/db"), import("@/db/schema")]);
  await db.insert(contactMessages).values(data);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot : on répond « ok » sans rien traiter (les bots ne sont pas informés)
  if (body && body.website) return Response.json({ ok: true });

  const data = {
    name: clean(body?.name, LIMITS.name),
    email: clean(body?.email, LIMITS.email),
    subject: clean(body?.subject, LIMITS.subject),
    message: clean(body?.message, LIMITS.message),
    lang: ["fr", "en", "ar"].includes(body?.lang) ? body.lang : "fr",
  };

  const errors = validateContact(data);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, error: "validation", errors }, { status: 422 });
  }

  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const channels = [];
  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) channels.push(sendWithResend);
  if (process.env.CONTACT_FORM_ENDPOINT) channels.push(sendToEndpoint);
  if (process.env.DATABASE_URL) channels.push(saveToDatabase);

  if (!channels.length) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  for (const channel of channels) {
    try {
      await channel(data);
      return Response.json({ ok: true });
    } catch (error) {
      console.error(`[contact] ${channel.name} failed:`, error?.message || error);
    }
  }
  return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
}
