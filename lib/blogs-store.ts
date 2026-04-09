import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import path from "path"

import {
  BLOGS_JSON_PATH,
  cmsBlobStorageEnabled,
  readPublicBlobJson,
  writePublicBlobJson,
} from "@/lib/cms-blob"
import type {
  InitiativeArticle,
  InitiativeCard,
  InitiativeRecord,
} from "@/lib/initiative-types"
import { DEFAULT_CTAS } from "@/lib/initiatives-bodies"
import { assertValidInitiativeId } from "@/lib/initiatives-store"
import { getDefaultBlogs } from "@/lib/blogs-default-seed"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_PATH = path.join(DATA_DIR, "blogs.json")

export type BlogStoreFile = {
  version: 1
  blogs: InitiativeRecord[]
}

function ensureDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

function normalizeSections(
  sections: InitiativeRecord["sections"],
): InitiativeRecord["sections"] {
  return sections
    .map((s) => ({
      heading: (s.heading ?? "").trim(),
      paragraphs: (s.paragraphs ?? [])
        .map((p) => (typeof p === "string" ? p.trim() : ""))
        .filter(Boolean),
    }))
    .filter((s) => s.heading.length > 0 && s.paragraphs.length > 0)
}

function normalizeGallery(gallery: string[] | undefined): string[] {
  if (!gallery?.length) return []
  return gallery.map((u) => u.trim()).filter(Boolean)
}

function recordToArticle(r: InitiativeRecord): InitiativeArticle {
  const cap = r.heroCaption
  const hasCaption = Boolean(cap?.title?.trim())

  return {
    slug: r.id,
    title: r.title,
    dateLabel: r.date,
    heroImage: r.image,
    gallery: normalizeGallery(r.gallery),
    category: r.category,
    readMinutes: r.readMinutes,
    heroCaption:
      hasCaption && cap
        ? {
            title: cap.title.trim(),
            subtitle: (cap.subtitle ?? "").trim(),
          }
        : undefined,
    intro: r.intro,
    sections: normalizeSections(r.sections),
    ctas: (() => {
      const cleaned =
        r.ctas?.filter((c) => c.label?.trim() && c.href?.trim()) ?? []
      return cleaned.length > 0 ? cleaned : DEFAULT_CTAS.map((c) => ({ ...c }))
    })(),
  }
}

function readStoreFromDisk(): BlogStoreFile | null {
  try {
    const raw = readFileSync(DATA_PATH, "utf8")
    const parsed = JSON.parse(raw) as BlogStoreFile
    if (parsed.version !== 1 || !Array.isArray(parsed.blogs)) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function mapStoreFileToRecords(file: BlogStoreFile): InitiativeRecord[] {
  return file.blogs.map((r) => {
    const cleanedCtas =
      r.ctas?.filter((c) => c?.label?.trim() && c?.href?.trim()) ?? []
    return {
      ...r,
      gallery: normalizeGallery(r.gallery),
      sections: Array.isArray(r.sections) ? r.sections : [],
      ctas:
        cleanedCtas.length > 0
          ? cleanedCtas
          : DEFAULT_CTAS.map((c) => ({ ...c })),
    }
  })
}

function loadBlogRecordsFromDisk(): InitiativeRecord[] {
  const file = readStoreFromDisk()
  if (!file || !Array.isArray(file.blogs)) {
    return getDefaultBlogs()
  }
  if (file.blogs.length === 0) {
    return []
  }
  return mapStoreFileToRecords(file)
}

export async function loadBlogRecords(): Promise<InitiativeRecord[]> {
  if (cmsBlobStorageEnabled()) {
    const file = await readPublicBlobJson<BlogStoreFile>(BLOGS_JSON_PATH)
    if (file && file.version === 1 && Array.isArray(file.blogs)) {
      if (file.blogs.length === 0) return []
      return mapStoreFileToRecords(file)
    }
    return getDefaultBlogs()
  }
  return loadBlogRecordsFromDisk()
}

export async function getBlogCards(): Promise<InitiativeCard[]> {
  const records = await loadBlogRecords()
  return records.map((r) => ({
    id: r.id,
    title: r.title,
    excerpt: r.excerpt,
    date: r.date,
    image: r.image,
  }))
}

export async function getBlogArticleBySlug(
  slug: string,
): Promise<InitiativeArticle | null> {
  const records = await loadBlogRecords()
  const r = records.find((i) => i.id === slug)
  if (!r) return null
  return recordToArticle(r)
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const records = await loadBlogRecords()
  return records.map((i) => i.id)
}

export async function persistBlogs(blogs: InitiativeRecord[]): Promise<void> {
  const payload: BlogStoreFile = { version: 1, blogs }
  if (cmsBlobStorageEnabled()) {
    await writePublicBlobJson(BLOGS_JSON_PATH, payload)
    return
  }
  ensureDir()
  writeFileSync(DATA_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8")
}

function normalizePersistedRecord(updated: InitiativeRecord): InitiativeRecord {
  const cap = updated.heroCaption
  const heroCaption =
    cap?.title?.trim()
      ? {
          title: cap.title.trim(),
          subtitle: (cap.subtitle ?? "").trim(),
        }
      : null
  return {
    ...updated,
    id: updated.id.trim(),
    gallery: normalizeGallery(updated.gallery),
    sections: normalizeSections(
      updated.sections.map((s) => ({
        heading: s.heading ?? "",
        paragraphs: Array.isArray(s.paragraphs) ? s.paragraphs : [],
      })),
    ),
    heroCaption,
    ctas: (updated.ctas ?? []).filter(
      (c) => c.label?.trim() && c.href?.trim(),
    ),
  }
}

export async function createBlogRecord(record: InitiativeRecord): Promise<void> {
  assertValidInitiativeId(record.id)
  const id = record.id.trim()
  const all = await loadBlogRecords()
  if (all.some((i) => i.id.trim() === id)) {
    throw new Error(
      `A post with slug “${id}” already exists. Pick a different slug.`,
    )
  }
  const normalized = normalizePersistedRecord({ ...record, id })
  await persistBlogs([...all, normalized])
}

export async function upsertBlogRecord(
  updated: InitiativeRecord,
): Promise<void> {
  const all = await loadBlogRecords()
  const idx = all.findIndex((i) => i.id.trim() === updated.id.trim())
  if (idx === -1) {
    throw new Error(`Unknown blog id: ${updated.id}`)
  }
  const next = [...all]
  next[idx] = normalizePersistedRecord(updated)
  await persistBlogs(next)
}

export async function deleteBlogRecord(id: string): Promise<void> {
  const t = id.trim()
  const all = await loadBlogRecords()
  const next = all.filter((i) => i.id.trim() !== t)
  if (next.length === all.length) {
    throw new Error(`Unknown blog id: ${id}`)
  }
  await persistBlogs(next)
}
