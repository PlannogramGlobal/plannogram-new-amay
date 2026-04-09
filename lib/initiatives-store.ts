import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import path from "path"

import {
  cmsBlobStorageEnabled,
  INITIATIVES_JSON_PATH,
  readPublicBlobJson,
  writePublicBlobJson,
} from "@/lib/cms-blob"
import type {
  InitiativeArticle,
  InitiativeCard,
  InitiativeRecord,
  InitiativeStoreFile,
} from "@/lib/initiative-types"
import { DEFAULT_CTAS } from "@/lib/initiatives-bodies"
import { getDefaultInitiatives } from "@/lib/initiatives-seed-merge"

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_PATH = path.join(DATA_DIR, "initiatives.json")

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

function readStoreFromDisk(): InitiativeStoreFile | null {
  try {
    const raw = readFileSync(DATA_PATH, "utf8")
    const parsed = JSON.parse(raw) as InitiativeStoreFile
    if (parsed.version !== 1 || !Array.isArray(parsed.initiatives)) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function mapStoreFileToRecords(file: InitiativeStoreFile): InitiativeRecord[] {
  return file.initiatives.map((r) => {
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

function loadInitiativeRecordsFromDisk(): InitiativeRecord[] {
  const file = readStoreFromDisk()
  if (!file || !Array.isArray(file.initiatives)) {
    return getDefaultInitiatives()
  }
  if (file.initiatives.length === 0) {
    return []
  }
  return mapStoreFileToRecords(file)
}

export async function loadInitiativeRecords(): Promise<InitiativeRecord[]> {
  if (cmsBlobStorageEnabled()) {
    const file = await readPublicBlobJson<InitiativeStoreFile>(
      INITIATIVES_JSON_PATH,
    )
    if (file && file.version === 1 && Array.isArray(file.initiatives)) {
      if (file.initiatives.length === 0) return []
      return mapStoreFileToRecords(file)
    }
    return getDefaultInitiatives()
  }
  return loadInitiativeRecordsFromDisk()
}

export async function getAllInitiatives(): Promise<InitiativeRecord[]> {
  return loadInitiativeRecords()
}

export async function getInitiativeCards(): Promise<InitiativeCard[]> {
  const records = await loadInitiativeRecords()
  return records.map((r) => ({
    id: r.id,
    title: r.title,
    excerpt: r.excerpt,
    date: r.date,
    image: r.image,
  }))
}

export async function getInitiativeBySlug(
  slug: string,
): Promise<InitiativeArticle | null> {
  const records = await loadInitiativeRecords()
  const r = records.find((i) => i.id === slug)
  if (!r) return null
  return recordToArticle(r)
}

export async function getAllInitiativeSlugs(): Promise<string[]> {
  const records = await loadInitiativeRecords()
  return records.map((i) => i.id)
}

export async function persistInitiatives(
  initiatives: InitiativeRecord[],
): Promise<void> {
  const payload: InitiativeStoreFile = { version: 1, initiatives }
  if (cmsBlobStorageEnabled()) {
    await writePublicBlobJson(INITIATIVES_JSON_PATH, payload)
    return
  }
  ensureDir()
  writeFileSync(DATA_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8")
}

const INITIATIVE_ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function assertValidInitiativeId(id: string): void {
  const t = id.trim()
  if (!t) {
    throw new Error("URL slug is required.")
  }
  if (!INITIATIVE_ID_RE.test(t)) {
    throw new Error(
      "URL slug: use lowercase letters, numbers, and hyphens only (e.g. coastal-resilience-hub).",
    )
  }
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

export async function createInitiativeRecord(
  record: InitiativeRecord,
): Promise<void> {
  assertValidInitiativeId(record.id)
  const id = record.id.trim()
  const all = await loadInitiativeRecords()
  if (all.some((i) => i.id.trim() === id)) {
    throw new Error(
      `An initiative with slug “${id}” already exists. Pick a different slug.`,
    )
  }
  const normalized = normalizePersistedRecord({ ...record, id })
  await persistInitiatives([...all, normalized])
}

export async function upsertInitiativeRecord(
  updated: InitiativeRecord,
): Promise<void> {
  const all = await loadInitiativeRecords()
  const idx = all.findIndex((i) => i.id.trim() === updated.id.trim())
  if (idx === -1) {
    throw new Error(`Unknown initiative id: ${updated.id}`)
  }
  const next = [...all]
  next[idx] = normalizePersistedRecord(updated)
  await persistInitiatives(next)
}

export async function deleteInitiativeRecord(id: string): Promise<void> {
  const t = id.trim()
  const all = await loadInitiativeRecords()
  const next = all.filter((i) => i.id.trim() !== t)
  if (next.length === all.length) {
    throw new Error(`Unknown initiative id: ${id}`)
  }
  await persistInitiatives(next)
}
