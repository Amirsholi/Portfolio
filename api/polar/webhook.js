import { validateEvent, WebhookVerificationError } from "@polar-sh/sdk/webhooks";
import { createSampleXLicense, requireEnvironment, serviceHeaders } from "../_lib/samplex-license.js";

const PRODUCTS = {
  "82f19b8f-9f50-4e81-a94d-26fa83fccef5": { kind: "permanent", label: "SampleX Lifetime" },
};

export const config = { api: { bodyParser: false } };

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });

  try {
    requireEnvironment("POLAR_WEBHOOK_SECRET", "SUPABASE_URL", "SUPABASE_SECRET_KEY", "SAMPLEX_PRIVATE_KEY");
    const rawBody = await readRawBody(request);
    const headers = Object.fromEntries(Object.entries(request.headers).map(([key, value]) => [key, Array.isArray(value) ? value[0] : String(value || "")]));
    const event = validateEvent(rawBody, headers, process.env.POLAR_WEBHOOK_SECRET);

    if (event.type === "order.refunded") {
      await recordRefund(event.data);
      return response.status(200).json({ received: true });
    }
    if (event.type !== "order.paid") return response.status(202).json({ received: true });
    const order = event.data;
    const plan = PRODUCTS[order.productId];
    if (!plan || !order.paid) return response.status(202).json({ received: true });

    const existing = await findLicense("payment_id", order.id);
    if (existing) {
      await deliverByEmail(existing, plan);
      return response.status(200).json({ received: true });
    }

    const license = createSampleXLicense(plan);
    const record = {
      id: license.id,
      kind: plan.kind,
      credits: null,
      email: order.customer?.email || null,
      note: `Polar: ${plan.label}`,
      token: license.token,
      status: "active",
      issued_at: license.issuedAt,
      issued_by: "polar:order.paid",
      payment_id: order.id,
      checkout_id: order.checkoutId,
      product_id: order.productId,
      customer_id: order.customerId,
      amount: order.totalAmount,
      currency: order.currency,
      payment_status: order.status,
      delivery_status: "onsite",
    };

    const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/samplex_licenses`, {
      method: "POST",
      headers: serviceHeaders("return=minimal"),
      body: JSON.stringify(record),
    });

    if (!result.ok) {
      if (result.status === 409) {
        const concurrent = await findLicense("payment_id", order.id);
        if (concurrent) {
          await deliverByEmail(concurrent, plan);
          return response.status(200).json({ received: true });
        }
      }
      throw new Error(`License registry write failed: ${result.status}`);
    }

    await deliverByEmail({ ...record }, plan);
    return response.status(201).json({ received: true });
  } catch (error) {
    if (error instanceof WebhookVerificationError) return response.status(403).json({ error: "Invalid webhook signature." });
    console.error("Polar webhook fulfillment failed", error);
    return response.status(500).json({ error: "Fulfillment failed." });
  }
}

async function findLicense(field, value) {
  const query = new URLSearchParams({ select: "*", [field]: `eq.${value}`, limit: "1" });
  const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/samplex_licenses?${query}`, { headers: serviceHeaders() });
  if (!result.ok) throw new Error("License registry query failed.");
  return (await result.json())[0] || null;
}

async function recordRefund(order) {
  const existing = await findLicense("payment_id", order.id);
  if (!existing) return;
  const fullyRefunded = order.status === "refunded" || order.refundedAmount >= order.totalAmount;
  const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/samplex_licenses?payment_id=eq.${encodeURIComponent(order.id)}`, {
    method: "PATCH",
    headers: serviceHeaders("return=minimal"),
    body: JSON.stringify({
      payment_status: fullyRefunded ? "refunded" : "partially_refunded",
      refunded_amount: order.refundedAmount,
      refunded_at: new Date().toISOString(),
      ...(fullyRefunded ? { status: "revoked" } : {}),
    }),
  });
  if (!result.ok) throw new Error(`Refund registry update failed: ${result.status}`);
}

async function deliverByEmail(license, plan) {
  if (!process.env.RESEND_API_KEY || !process.env.SAMPLEX_FROM_EMAIL || !license.email || license.delivery_status === "emailed") return;
  const result = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.SAMPLEX_FROM_EMAIL,
      to: [license.email],
      subject: `Your ${plan.label} license code`,
      html: licenseEmail(plan.label, license.token),
    }),
  });
  if (!result.ok) throw new Error(`License email delivery failed: ${result.status}`);
  const update = await fetch(`${process.env.SUPABASE_URL}/rest/v1/samplex_licenses?id=eq.${encodeURIComponent(license.id)}`, {
    method: "PATCH",
    headers: serviceHeaders("return=minimal"),
    body: JSON.stringify({ delivery_status: "emailed", delivered_at: new Date().toISOString() }),
  });
  if (!update.ok) throw new Error(`Email delivery registry update failed: ${update.status}`);
}

function licenseEmail(label, token) {
  return `<!doctype html><html><body style="margin:0;background:#071019;color:#dcebf0;font-family:Arial,sans-serif"><div style="max-width:620px;margin:auto;padding:42px 24px"><p style="color:#55c8eb;font-size:12px;letter-spacing:2px">SAMPLEX</p><h1 style="color:#fff;font-size:28px">Your ${label} is ready.</h1><p style="color:#9db0ba;line-height:1.6">Copy the signed code below and paste it into the key field in the SampleX extension.</p><div style="margin:24px 0;padding:18px;border:1px solid #2d5364;border-radius:8px;background:#0b1821;word-break:break-all;font-family:monospace;color:#a9e5ef">${token}</div><p><a href="https://amirsholi.vercel.app/samplex" style="color:#65c9eb">Open SampleX</a></p><p style="margin-top:30px;color:#637985;font-size:12px">Need help? amirsholi999@gmail.com</p></div></body></html>`;
}

async function readRawBody(request) {
  if (Buffer.isBuffer(request.body)) return request.body;
  if (typeof request.body === "string") return Buffer.from(request.body);
  const chunks = [];
  for await (const chunk of request) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}
