import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

export const INITIATIVES_ADMIN_COOKIE = "pg_init_admin"
const MAX_AGE_SEC = 60 * 60 * 24 * 7

function adminSecret(): string {
  return process.env.INITIATIVES_ADMIN_SECRET ?? ""
}

function safeEqualString(a: string, b: string): boolean {
  try {
    const A = Buffer.from(a, "utf8")
    const B = Buffer.from(b, "utf8")
    if (A.length !== B.length) return false
    return timingSafeEqual(A, B)
  } catch {
    return false
  }
}

function signToken(payload: { u: string; exp: number }): string {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url")
  const h = createHmac("sha256", adminSecret()).update(body).digest("base64url")
  return `${body}.${h}`
}

export function verifyToken(token: string): { user: string } | null {
  if (!adminSecret()) return null
  const dot = token.lastIndexOf(".")
  if (dot === -1) return null
  const body = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const expected = createHmac("sha256", adminSecret())
    .update(body)
    .digest("base64url")
  if (!safeEqualString(sig, expected)) return null
  try {
    const raw = Buffer.from(body, "base64url").toString("utf8")
    const p = JSON.parse(raw) as { u: string; exp: number }
    if (typeof p.exp !== "number" || p.exp < Date.now()) return null
    if (typeof p.u !== "string") return null
    return { user: p.u }
  } catch {
    return null
  }
}

export async function getAdminSession(): Promise<{ user: string } | null> {
  const raw = (await cookies()).get(INITIATIVES_ADMIN_COOKIE)?.value
  if (!raw) return null
  return verifyToken(raw)
}

export async function setAdminSession(username: string): Promise<void> {
  const exp = Date.now() + MAX_AGE_SEC * 1000
  const token = signToken({ u: username, exp })
  ;(await cookies()).set(INITIATIVES_ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SEC,
  })
}

export async function clearAdminSession(): Promise<void> {
  ;(await cookies()).delete(INITIATIVES_ADMIN_COOKIE)
}

export function verifyAdminCredentials(user: string, pass: string): boolean {
  const u = process.env.INITIATIVES_ADMIN_USER ?? ""
  const p = process.env.INITIATIVES_ADMIN_PASSWORD ?? ""
  if (!adminSecret() || !u || !p) return false
  return safeEqualString(user, u) && safeEqualString(pass, p)
}
