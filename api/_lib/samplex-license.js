import { createPrivateKey, randomUUID, sign } from "node:crypto";

export function createSampleXLicense({ kind, credits = null }) {
  const id = randomUUID().replaceAll("-", "");
  const issuedAt = new Date().toISOString();
  const payload = { version: 1, id, product: "samplex", kind, issuedAt, ...(credits ? { credits } : {}) };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const privateKeyPem = process.env.SAMPLEX_PRIVATE_KEY.replace(/\\n/g, "\n");
  const signature = sign("sha256", Buffer.from(encodedPayload, "base64url"), {
    key: createPrivateKey(privateKeyPem),
    dsaEncoding: "ieee-p1363",
  }).toString("base64url");

  return { id, issuedAt, token: `SAMPLEX.${encodedPayload}.${signature}` };
}

export function serviceHeaders(prefer) {
  return {
    apikey: process.env.SUPABASE_SECRET_KEY,
    Authorization: `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

export function requireEnvironment(...names) {
  if (names.some((name) => !process.env[name])) throw new Error("Missing server configuration.");
}
