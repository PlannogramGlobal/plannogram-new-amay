import { mkdir, writeFile } from "fs/promises"
import path from "path"

import {
  CMS_BLOB_PREFIX,
  cmsBlobStorageEnabled,
  putPublicImageBlob,
} from "@/lib/cms-blob"
import { INITIATIVES_ADMIN_COOKIE, verifyToken } from "@/lib/initiatives-admin-auth"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const MAX_BYTES = 8 * 1024 * 1024
const ALLOWED = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/jpg", "jpg"],
  ["image/png", "png"],
  ["image/pjpeg", "jpg"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
])

export async function POST(request: Request) {
  const token = (await cookies()).get(INITIATIVES_ADMIN_COOKIE)?.value
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
  }

  const file = formData.get("file")
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const mime = file.type.toLowerCase()
  const ext = ALLOWED.get(mime)
  if (!ext) {
    return NextResponse.json(
      {
        error:
          "Only PNG, JPG/JPEG, WebP, and GIF images are allowed. Use .png, .jpg, or .jpeg files.",
      },
      { status: 400 },
    )
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  if (buffer.length === 0) {
    return NextResponse.json({ error: "Empty file" }, { status: 400 })
  }
  if (buffer.length > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large (max 8 MB)." },
      { status: 400 },
    )
  }

  const id = crypto.randomUUID()
  const filename = `${id}.${ext}`
  const contentType =
    mime ||
    (ext === "jpg" ? "image/jpeg" : ext === "png" ? "image/png" : `image/${ext}`)

  if (cmsBlobStorageEnabled()) {
    try {
      const { url } = await putPublicImageBlob({
        pathname: `${CMS_BLOB_PREFIX}/uploads/initiatives/${filename}`,
        body: buffer,
        contentType,
      })
      return NextResponse.json({ url })
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Upload failed"
      return NextResponse.json({ error: msg }, { status: 500 })
    }
  }

  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "initiatives",
  )
  await mkdir(uploadDir, { recursive: true })
  const filepath = path.join(uploadDir, filename)
  await writeFile(filepath, buffer)

  const url = `/uploads/initiatives/${filename}`
  return NextResponse.json({ url })
}
