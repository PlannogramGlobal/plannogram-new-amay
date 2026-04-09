"use server"

import { revalidatePath } from "next/cache"

import {
  createBlogRecord,
  deleteBlogRecord,
  loadBlogRecords,
  upsertBlogRecord,
} from "@/lib/blogs-store"
import type { InitiativeRecord } from "@/lib/initiative-types"
import { getAdminSession } from "@/lib/initiatives-admin-auth"

export async function saveBlogAction(
  record: InitiativeRecord,
): Promise<{ ok: boolean; error?: string }> {
  const session = await getAdminSession()
  if (!session) {
    return { ok: false, error: "Not signed in." }
  }
  try {
    await upsertBlogRecord(record)
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Save failed."
    return { ok: false, error: msg }
  }
  const id = record.id.trim()
  revalidatePath("/blogs")
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/site/admin/blogs")
  return { ok: true }
}

export async function createBlogAction(
  record: InitiativeRecord,
): Promise<{ ok: boolean; error?: string }> {
  const session = await getAdminSession()
  if (!session) {
    return { ok: false, error: "Not signed in." }
  }
  try {
    await createBlogRecord(record)
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Create failed."
    return { ok: false, error: msg }
  }
  const id = record.id.trim()
  revalidatePath("/blogs")
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/site/admin/blogs")
  return { ok: true }
}

export async function deleteBlogAction(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  const session = await getAdminSession()
  if (!session) {
    return { ok: false, error: "Not signed in." }
  }
  const slug = id.trim()
  try {
    await deleteBlogRecord(slug)
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Delete failed."
    return { ok: false, error: msg }
  }
  revalidatePath("/blogs")
  revalidatePath(`/blogs/${slug}`)
  revalidatePath("/site/admin/blogs")
  return { ok: true }
}

export async function loadBlogsForAdmin(): Promise<
  InitiativeRecord[] | null
> {
  const session = await getAdminSession()
  if (!session) return null
  return loadBlogRecords()
}
