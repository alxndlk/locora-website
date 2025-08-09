import fs from "node:fs/promises";
import * as jose from "jose";

const teamId = "P9X95TTA7H";
const keyId = "FNFBB4R659";
const clientId = "com.locora.app.service"; // Service ID
const privateKey = await fs.readFile("./AuthKey_FNFBB4R659.p8", "utf8");

const alg = "ES256";
const now = Math.floor(Date.now() / 1000);

const token = await new jose.SignJWT({})
  .setProtectedHeader({ alg, kid: keyId })
  .setIssuer(teamId) // iss
  .setAudience("https://appleid.apple.com") // aud
  .setSubject(clientId) // sub
  .setIssuedAt(now)
  .setExpirationTime(now + 60 * 60 * 24 * 180) // 180 дней
  .sign(await jose.importPKCS8(privateKey, alg));

console.log(token);
