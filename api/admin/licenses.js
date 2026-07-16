import { createSampleXLicense, requireEnvironment, serviceHeaders } from "../_lib/samplex-license.js";

const VALID_KINDS = new Set(["permanent", "promo"]);

export default async function handler(request, response) {
  try {
    const user = await requireAdmin(request);
    if (request.method === "GET") return listLicenses(response);
    if (request.method === "POST") return createLicense(request, response, user.email);
    response.setHeader("Allow", "GET, POST");
    return response.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    const status = error.status || 500;
    return response.status(status).json({ error: status === 500 ? "License service is unavailable." : error.message });
  }
}

async function requireAdmin(request) {
  requireEnvironment("SUPABASE_URL", "SUPABASE_PUBLISHABLE_KEY", "SAMPLEX_ADMIN_EMAIL");
  const authorization = request.headers.authorization || "";
  if (!authorization.startsWith("Bearer ")) throw httpError(401, "Administrator session is required.");
  const authResponse = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, { headers: { apikey: process.env.SUPABASE_PUBLISHABLE_KEY, Authorization: authorization } });
  if (!authResponse.ok) throw httpError(401, "Administrator session has expired.");
  const user = await authResponse.json();
  if (user.email?.toLowerCase() !== process.env.SAMPLEX_ADMIN_EMAIL.toLowerCase()) throw httpError(403, "This account is not authorized.");
  return user;
}

async function listLicenses(response) {
  requireEnvironment("SUPABASE_URL", "SUPABASE_SECRET_KEY");
  const since = new Date(Date.now() - 30 * 86_400_000).toISOString().slice(0, 10);
  const [licenseResult, metricResult] = await Promise.all([
    fetch(`${process.env.SUPABASE_URL}/rest/v1/samplex_licenses?select=*&order=issued_at.desc&limit=200`, { headers: serviceHeaders() }),
    fetch(`${process.env.SUPABASE_URL}/rest/v1/samplex_metrics?select=day,event,count&day=gte.${since}&order=day.desc`, { headers: serviceHeaders() }),
  ]);
  if (!licenseResult.ok || !metricResult.ok) throw new Error("Administration query failed.");
  return response.status(200).json({ licenses: await licenseResult.json(), metrics: await metricResult.json() });
}

async function createLicense(request, response, issuedBy) {
  requireEnvironment("SUPABASE_URL", "SUPABASE_SECRET_KEY", "SAMPLEX_PRIVATE_KEY");
  const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {};
  const kind = String(body.kind || "promo");
  if (!VALID_KINDS.has(kind)) throw httpError(400, "Invalid license type.");
  const { id, issuedAt, token } = createSampleXLicense({ kind });
  const record = { id, kind, credits: null, email: cleanOptional(body.email, 180), note: cleanOptional(body.note, 240), token, status: "active", issued_at: issuedAt, issued_by: issuedBy };
  const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/samplex_licenses`, { method: "POST", headers: { ...serviceHeaders(), Prefer: "return=representation" }, body: JSON.stringify(record) });
  if (!result.ok) throw new Error("License registry write failed.");
  const [license] = await result.json();
  return response.status(201).json({ license });
}

function cleanOptional(value, maximum) { if (!value) return null; return String(value).trim().slice(0, maximum) || null; }
function httpError(status, message) { const error = new Error(message); error.status = status; return error; }
