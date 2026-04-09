import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Local `public/uploads/**` or Vercel Blob URLs for CMS images.
 * Use with `next/image` `unoptimized` so Sharp does not drop edge-case files.
 */
export function shouldUnoptimizeImageSrc(src: string | undefined | null): boolean {
  if (!src || typeof src !== "string") return false
  const s = src.trimStart()
  if (s.startsWith("/uploads/")) return true
  if (s.includes(".public.blob.vercel-storage.com")) return true
  return false
}

/** @deprecated use shouldUnoptimizeImageSrc */
export const isLocalUploadImageSrc = shouldUnoptimizeImageSrc
