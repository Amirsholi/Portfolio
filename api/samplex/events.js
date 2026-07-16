import { requireEnvironment, serviceHeaders } from "../_lib/samplex-license.js";

const VALID_EVENTS = new Set(["demo_interest", "checkout_interest"]);

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  try {
    requireEnvironment("SUPABASE_URL", "SUPABASE_SECRET_KEY");
    const fetchSite = String(request.headers["sec-fetch-site"] || "");
    if (fetchSite === "cross-site") return response.status(403).json({ error: "Cross-site metrics are not accepted." });
    const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {};
    const event = String(body.event || "");
    if (!VALID_EVENTS.has(event)) return response.status(400).json({ error: "Unknown metric." });

    const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/increment_samplex_metric`, {
      method: "POST",
      headers: serviceHeaders(),
      body: JSON.stringify({ metric_event: event }),
    });
    if (!result.ok) throw new Error("Metric write failed.");
    response.setHeader("Cache-Control", "no-store");
    return response.status(204).end();
  } catch {
    return response.status(503).json({ error: "Metrics are temporarily unavailable." });
  }
}
