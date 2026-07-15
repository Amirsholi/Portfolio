import { createPrivateKey, randomUUID, sign } from "node:crypto";

const VALID_KINDS = new Set(["permanent", "promo", "credits"]);

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
  const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/samplex_licenses?select=*&order=issued_at.desc&limit=200`, { headers: serviceHeaders() });
  if (!result.ok) throw new Error("License registry query failed.");
  return response.status(200).json({ licenses: await result.json() });
}

async function createLicense(request, response, issuedBy) {
  requireEnvironment("SUPABASE_URL", "SUPABASE_SECRET_KEY", "SAMPLEX_PRIVATE_KEY");
  const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {};
  const kind = String(body.kind || "promo");
  if (!VALID_KINDS.has(kind)) throw httpError(400, "Invalid license type.");
  const credits = kind === "credits" ? Number(body.credits) : null;
  if (kind === "credits" && (!Number.isInteger(credits) || credits <= 0 || credits > 100000)) throw httpError(400, "Credits must be a positive integer.");
  const id = randomUUID().replaceAll("-", "");
  const issuedAt = new Date().toISOString();
  const payload = { version: 1, id, product: "samplex", kind, issuedAt, ...(credits ? { credits } : {}) };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const privateKeyPem = process.env.SAMPLEX_PRIVATE_KEY.replace(/\\n/g, "\n");
  const signature = sign("sha256", Buffer.from(encodedPayload, "base64url"), { key: createPrivateKey(privateKeyPem), dsaEncoding: "ieee-p1363" }).toString("base64url");
  const token = `SAMPLEX.${encodedPayload}.${signature}`;
  const record = { id, kind, credits, email: cleanOptional(body.email, 180), note: cleanOptional(body.note, 240), token, status: "active", issued_at: issuedAt, issued_by: issuedBy };
  const result = await fetch(`${process.env.SUPABASE_URL}/rest/v1/samplex_licenses`, { method: "POST", headers: { ...serviceHeaders(), Prefer: "return=representation" }, body: JSON.stringify(record) });
  if (!result.ok) throw new Error("License registry write failed.");
  const [license] = await result.json();
  return response.status(201).json({ license });
}

function serviceHeaders() { return { apikey: process.env.SUPABASE_SECRET_KEY, "Content-Type": "application/json" }; }
function cleanOptional(value, maximum) { if (!value) return null; return String(value).trim().slice(0, maximum) || null; }
function requireEnvironment(...names) { if (names.some((name) => !process.env[name])) throw new Error("Missing server configuration."); }
function httpError(status, message) { const error = new Error(message); error.status = status; return error; }
