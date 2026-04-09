import { head, put } from "@vercel/blob"

/** Stable keys in your Blob store (same data for every visitor after admin saves). */
export const CMS_BLOB_PREFIX = "plannogram"

export const INITIATIVES_JSON_PATH = `${CMS_BLOB_PREFIX}/cms/initiatives.json`
export const BLOGS_JSON_PATH = `${CMS_BLOB_PREFIX}/cms/blogs.json`

export function cmsBlobStorageEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim())
}

/**
 * Read JSON from a public blob by pathname. Returns null if missing or invalid.
 */
export async function readPublicBlobJson<T>(pathname: string): Promise<T | null> {
  if (!cmsBlobStorageEnabled()) return null
  try {
    const meta = await head(pathname)
    const res = await fetch(meta.url, { cache: "no-store" })
    if (!res.ok) return null
    return JSON.parse(await res.text()) as T
  } catch {
    return null
  }
}

/**
 * Write or overwrite JSON at a fixed pathname (shared across all deploys / users).
 */
export async function writePublicBlobJson(
  pathname: string,
  data: unknown,
): Promise<void> {
  if (!cmsBlobStorageEnabled()) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not set.")
  }
  await put(pathname, JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: 60,
  })
}

/**
 * Upload a binary image; returns the public HTTPS URL to store in CMS JSON.
 */
export async function putPublicImageBlob(options: {
  pathname: string
  body: Buffer
  contentType: string
}): Promise<{ url: string }> {
  if (!cmsBlobStorageEnabled()) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not set.")
  }
  const result = await put(options.pathname, options.body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType: options.contentType,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  })
  return { url: result.url }
}
