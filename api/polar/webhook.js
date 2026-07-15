import { validateEvent, WebhookVerificationError } from "@polar-sh/sdk/webhooks";
import { createSampleXLicense, requireEnvironment, serviceHeaders } from "../_lib/samplex-license.js";

const PRODUCTS = {
  "0540eafa-44ed-4df8-9a16-c3d19067c69d": { kind: "credits", credits: 500, label: "500 Export Pack" },
  "82f19b8f-9f50-4e81-a94d-26fa83fccef5": { kind: "permanent", credits: null, label: "SampleX Lifetime" },
};

export const config = { api: { bodyParser: false } };

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });

  try {
    requireEnvironment("POLAR_WEBHOOK_SECRET", "SUPABASE_URL", "SUPABASE_SECRET_KEY", "SAMPLEX_PRIVATE_KEY");
    const rawBody = await readRawBody(request);
    const headers = Object.fromEntries(Object.entries(request.headers).map(([key, value]) => [key, Array.isArray(value) ? value[0] : String(value || "")]));
    const event = validateEvent(rawBody, headers, process.env.POLAR_WEBHOOK_SECRET);

    if (event.type !== "order.paid") return response.status(202).json({ received: true });
    const order = event.data;
    const plan = PRODUCTS[order.productId];
    if (!plan || !order.paid) return response.status(202).json({ received: true });

    const existing = await findLicense("payment_id", order.id);
    if (existing) return response.status(200).json({ received: true });

    const license = createSampleXLicense(plan);
    const record = {
      id: license.id,
      kind: plan.kind,
      credits: plan.credits,
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
    };

    const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/samplex_licenses`, {
      method: "POST",
      headers: serviceHeaders("return=minimal"),
      body: JSON.stringify(record),
    });

    if (!result.ok) {
      if (result.status === 409 && await findLicense("payment_id", order.id)) return response.status(200).json({ received: true });
      throw new Error(`License registry write failed: ${result.status}`);
    }

    return response.status(201).json({ received: true });
  } catch (error) {
    if (error instanceof WebhookVerificationError) return response.status(403).json({ error: "Invalid webhook signature." });
    console.error("Polar webhook fulfillment failed", error);
    return response.status(500).json({ error: "Fulfillment failed." });
  }
}

async function findLicense(field, value) {
  const query = new URLSearchParams({ select: "id", [field]: `eq.${value}`, limit: "1" });
  const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/samplex_licenses?${query}`, { headers: serviceHeaders() });
  if (!result.ok) throw new Error("License registry query failed.");
  return (await result.json())[0] || null;
}

async function readRawBody(request) {
  if (Buffer.isBuffer(request.body)) return request.body;
  if (typeof request.body === "string") return Buffer.from(request.body);
  const chunks = [];
  for await (const chunk of request) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}
