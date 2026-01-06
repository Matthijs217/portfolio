export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";

const lastHitByIp = new Map<string, number>();

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const name = String(data.name ?? "").trim();
    const email = String(data.email ?? "").trim();
    const subject = String(data.subject ?? "").trim();
    const message = String(data.message ?? "").trim();

    const honeypot = String(data.company ?? "").trim();
    if (honeypot) return new Response(JSON.stringify({ ok: true }), { status: 200 });

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400 });
    }

    if (name.length > 80 || subject.length > 120 || message.length > 4000) {
      return new Response(JSON.stringify({ ok: false, error: "Input too long" }), { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid email" }), { status: 400 });
    }

    const ip =
      request.headers.get("x-nf-client-connection-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    const now = Date.now();
    const last = lastHitByIp.get(ip) ?? 0;

    if (now - last < 30_000) {
      return new Response(JSON.stringify({ ok: false, error: "Too many requests" }), { status: 429 });
    }
    lastHitByIp.set(ip, now);

    const resendKey = import.meta.env.RESEND_API_KEY;
    const toEmail = import.meta.env.CONTACT_TO_EMAIL;

    if (!resendKey || !toEmail) {
      return new Response(JSON.stringify({ ok: false, error: "Server env missing" }), { status: 500 });
    }

    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `Portfolio contact: ${subject}`,
      text: `Naam: ${name}\nEmail: ${email}\nOnderwerp: ${subject}\n\n${message}`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Server error" }), { status: 500 });
  }
};
