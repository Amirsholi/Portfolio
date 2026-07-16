import { requireEnvironment, serviceHeaders } from "../_lib/samplex-license.js";

export default async function handler(request, response) {
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed." });

  try {
    requireEnvironment("SUPABASE_URL", "SUPABASE_SECRET_KEY");
    const checkoutId = String(request.query.checkout_id || "").trim();
    if (!/^[0-9a-f-]{36}$/i.test(checkoutId)) return response.status(400).json({ error: "Invalid checkout." });

    const query = new URLSearchParams({
      select: "kind,token,issued_at,payment_status,status",
      checkout_id: `eq.${checkoutId}`,
      limit: "1",
    });
    const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/samplex_licenses?${query}`, { headers: serviceHeaders() });
    if (!result.ok) throw new Error("License registry query failed.");
    const license = (await result.json())[0];
    if (!license) return response.status(202).json({ status: "processing" });
    if (license.payment_status === "refunded" || license.status !== "active") return response.status(410).json({ status: "refunded", error: "This license is no longer active." });
    return response.status(200).json({ status: "ready", license });
  } catch (error) {
    console.error("Polar license lookup failed", error);
    return response.status(500).json({ error: "License lookup is unavailable." });
  }
}
