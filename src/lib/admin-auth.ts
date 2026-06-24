export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function base64urlEncode(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(value: string): string | null {
  try {
    const padded = value + "=".repeat((4 - (value.length % 4)) % 4);
    const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

function getSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET ?? null;
}

async function hmacSha256(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SESSION_SECRET
  );
}

export async function createSessionToken(username: string): Promise<string | null> {
  const secret = getSessionSecret();
  if (!secret) return null;

  const exp = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${username}:${exp}`;
  const sig = await hmacSha256(payload, secret);
  const payloadB64 = base64urlEncode(payload);
  return `${payloadB64}.${sig}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const secret = getSessionSecret();
  const adminUsername = process.env.ADMIN_USERNAME;
  if (!secret || !adminUsername) return false;

  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return false;

  let payload = base64urlDecode(payloadB64);
  if (!payload) return false;

  const [username, expStr] = payload.split(":");
  const exp = Number(expStr);
  if (!username || !Number.isFinite(exp) || Date.now() > exp) return false;
  if (username !== adminUsername) return false;

  const expectedSig = await hmacSha256(payload, secret);
  return sig === expectedSig;
}

export function validateCredentials(
  username: string,
  password: string
): boolean {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminUsername || !adminPassword) return false;
  return username === adminUsername && password === adminPassword;
}
