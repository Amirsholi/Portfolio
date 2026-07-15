import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const environmentPath = new URL("../.env.local", import.meta.url);
const privateKeyPath = join(homedir(), ".samplex", "license-private.pem");
const privateKey = readFileSync(privateKeyPath, "utf8").trim().replaceAll("\r", "").replaceAll("\n", "\\n");
const current = readFileSync(environmentPath, "utf8");
const line = `SAMPLEX_PRIVATE_KEY="${privateKey}"`;
const next = /^SAMPLEX_PRIVATE_KEY=.*$/m.test(current)
  ? current.replace(/^SAMPLEX_PRIVATE_KEY=.*$/m, line)
  : `${current.trimEnd()}\n${line}\n`;
writeFileSync(environmentPath, next, "utf8");
console.log("SampleX private key synchronized without exposing its value.");
