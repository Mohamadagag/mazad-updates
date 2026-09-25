import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin-auth";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET ?? process.env.SUPABASE_SECRET_KEY;

  if (!secret) {
    throw new Error("Set ADMIN_SESSION_SECRET or SUPABASE_SECRET_KEY to sign admin sessions.");
  }

  return secret;
}

function createSignature(expiresAt: string) {
  return createHmac("sha256", getSessionSecret())
    .update(`mazad-admin:${expiresAt}`)
    .digest("base64url");
}

export function createAdminSession() {
  const expiresAt = String(Date.now() + ADMIN_SESSION_MAX_AGE * 1000);
  return `${expiresAt}.${createSignature(expiresAt)}`;
}

export function verifyAdminSession(value: string | undefined) {
  if (!value) return false;

  const [expiresAt, signature, ...extra] = value.split(".");
  if (!expiresAt || !signature || extra.length > 0 || !/^\d+$/.test(expiresAt)) {
    return false;
  }

  if (Number(expiresAt) <= Date.now()) return false;

  try {
    const expected = Buffer.from(createSignature(expiresAt));
    const actual = Buffer.from(signature);
    return expected.length === actual.length && timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

export function verifyCredential(provided: unknown, expected: string | undefined) {
  if (typeof provided !== "string" || !expected) return false;

  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
}
