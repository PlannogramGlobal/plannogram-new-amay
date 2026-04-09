"use server"

import { revalidatePath } from "next/cache"

import {
  clearAdminSession,
  getAdminSession,
  setAdminSession,
  verifyAdminCredentials,
} from "@/lib/initiatives-admin-auth"
import type { InitiativeRecord } from "@/lib/initiative-types"
import {
  createInitiativeRecord,
  deleteInitiativeRecord,
  loadInitiativeRecords,
  upsertInitiativeRecord,
} from "@/lib/initiatives-store"

export async function loginAction(formData: FormData): Promise<{
  ok: boolean
  error?: string
}> {
  const user = String(formData.get("user") ?? "").trim()
  const pass = String(formData.get("password") ?? "")
  const secret = process.env.INITIATIVES_ADMIN_SECRET?.trim() ?? ""
  if (!secret) {
    return {
      ok: false,
      error:
        "INITIATIVES_ADMIN_SECRET is missing in .env or .env.local. Add a long random string and restart the dev server.",
    }
  }
  if (!verifyAdminCredentials(user, pass)) {
    return { ok: false, error: "Invalid username or password." }
  }
  await setAdminSession(user)
  return { ok: true }
}

export async function logoutAction(): Promise<void> {
  await clearAdminSession()
}

export async function saveInitiativeAction(
  record: InitiativeRecord,
): Promise<{ ok: boolean; error?: string }> {
  const session = await getAdminSession()
  if (!session) {
    return { ok: false, error: "Not signed in." }
  }
  try {
    await upsertInitiativeRecord(record)
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Save failed."
    return { ok: false, error: msg }
  }
  const id = record.id.trim()
  revalidatePath("/initiatives")
  revalidatePath(`/initiatives/${id}`)
  revalidatePath("/site/admin/initiatives")
  return { ok: true }
}

export async function createInitiativeAction(
  record: InitiativeRecord,
): Promise<{ ok: boolean; error?: string }> {
  const session = await getAdminSession()
  if (!session) {
    return { ok: false, error: "Not signed in." }
  }
  try {
    await createInitiativeRecord(record)
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Create failed."
    return { ok: false, error: msg }
  }
  const id = record.id.trim()
  revalidatePath("/initiatives")
  revalidatePath(`/initiatives/${id}`)
  revalidatePath("/site/admin/initiatives")
  return { ok: true }
}

export async function deleteInitiativeAction(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  const session = await getAdminSession()
  if (!session) {
    return { ok: false, error: "Not signed in." }
  }
  const slug = id.trim()
  try {
    await deleteInitiativeRecord(slug)
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Delete failed."
    return { ok: false, error: msg }
  }
  revalidatePath("/initiatives")
  revalidatePath(`/initiatives/${slug}`)
  revalidatePath("/site/admin/initiatives")
  return { ok: true }
}

export async function loadInitiativesForAdmin(): Promise<
  InitiativeRecord[] | null
> {
  const session = await getAdminSession()
  if (!session) return null
  return loadInitiativeRecords()
}
