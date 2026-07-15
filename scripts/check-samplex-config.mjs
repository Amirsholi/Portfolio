import { createPrivateKey } from "node:crypto";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const raw = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const environment = Object.fromEntries(raw.split(/\r?\n/).flatMap((line) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) return [];
  const separator = trimmed.indexOf("=");
  const key = trimmed.slice(0, separator).trim();
  let value = trimmed.slice(separator + 1).trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
  return [[key, value.replaceAll("\\n", "\n")]];
}));

const required = [
  "SUPABASE_URL",
  "SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_SECRET_KEY",
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_PUBLISHABLE_KEY",
  "VITE_SAMPLEX_ADMIN_EMAIL",
  "SAMPLEX_ADMIN_EMAIL",
  "SAMPLEX_PRIVATE_KEY",
];
const missing = required.filter((name) => !environment[name]);
if (missing.length) throw new Error(`Missing variables: ${missing.join(", ")}`);

try {
  createPrivateKey(environment.SAMPLEX_PRIVATE_KEY);
} catch {
  const key = environment.SAMPLEX_PRIVATE_KEY;
  const original = readFileSync(join(homedir(), ".samplex", "license-private.pem"), "utf8");
  console.error(JSON.stringify({
    error: "SAMPLEX_PRIVATE_KEY has an invalid PEM format.",
    hasHeader: key.startsWith("-----BEGIN PRIVATE KEY-----"),
    hasFooter: key.endsWith("-----END PRIVATE KEY-----"),
    lineCount: key.split("\n").length,
    matchesLocalKey: key.replace(/\s/g, "") === original.replace(/\s/g, ""),
  }));
  process.exit(1);
}
const result = await fetch(`${environment.SUPABASE_URL}/rest/v1/samplex_licenses?select=id&limit=1`, {
  headers: { apikey: environment.SUPABASE_SECRET_KEY },
});
if (!result.ok) throw new Error(`Supabase table check failed: HTTP ${result.status}`);

console.log(JSON.stringify({ environment: "complete", privateKey: "valid", supabase: "connected", licenseTable: "accessible" }));
