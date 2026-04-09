"use client"

import { useEffect, useRef, useState } from "react"

import type { InitiativeRecord, InitiativeSection } from "@/lib/initiative-types"

const DEFAULT_UPLOAD_PATH = "/api/admin/initiatives/upload"
const DEFAULT_STORAGE_HINT = {
  dataFile: "data/initiatives.json",
  publicPath: "/initiatives",
} as const

export type InitiativeRecordFormProps = {
  draft: InitiativeRecord
  updateDraft: (fn: (d: InitiativeRecord) => InitiativeRecord) => void
  pending: boolean
  keyPrefix: string
  slugMode: "editable" | "readonly"
  /** Admin upload API (initiatives vs blogs). */
  uploadPath?: string
  /** Shown in the footer note under the form. */
  storageHint?: { dataFile: string; publicPath: string }
}

export function InitiativeRecordForm({
  draft,
  updateDraft,
  pending,
  keyPrefix,
  slugMode,
  uploadPath = DEFAULT_UPLOAD_PATH,
  storageHint = DEFAULT_STORAGE_HINT,
}: InitiativeRecordFormProps) {
  return (
    <>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Checklist
        </p>
        <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
          {slugMode === "editable" ? (
            <CheckItem
              ok={/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.id.trim())}
              label="URL slug valid"
            />
          ) : null}
          <CheckItem ok={Boolean(draft.title.trim())} label="Title set" />
          <CheckItem ok={Boolean(draft.image.trim())} label="Primary image set" />
          <CheckItem ok={Boolean(draft.excerpt.trim())} label="Card excerpt" />
          <CheckItem ok={Boolean(draft.intro.trim())} label="Intro text" />
          <CheckItem
            ok={draft.sections.some((s) => s.heading.trim())}
            label="At least one section heading"
          />
        </ul>
      </div>

      <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        {slugMode === "readonly" ? (
          <p className="text-sm text-zinc-700">
            Public page:{" "}
            <code className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs">
              /initiatives/{draft.id}
            </code>
          </p>
        ) : (
          <label className="block text-sm font-medium">
            URL slug (creates{" "}
            <code className="rounded bg-zinc-100 px-1 text-xs">
              /initiatives/your-slug
            </code>
            )
            <input
              value={draft.id}
              onChange={(e) =>
                updateDraft((d) => ({
                  ...d,
                  id: e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, ""),
                }))
              }
              placeholder="e.g. youth-planning-lab"
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 font-mono text-sm"
            />
            <span className="mt-1 block text-xs text-zinc-500">
              Lowercase, numbers, hyphens only. Cannot be changed after
              creation.
            </span>
          </label>
        )}

        <Field
          label="Title"
          value={draft.title}
          onChange={(v) => updateDraft((d) => ({ ...d, title: v }))}
        />
        <Field
          label="Excerpt (card)"
          value={draft.excerpt}
          onChange={(v) => updateDraft((d) => ({ ...d, excerpt: v }))}
          textarea
        />
        <Field
          label="Date line"
          value={draft.date}
          onChange={(v) => updateDraft((d) => ({ ...d, date: v }))}
        />

        <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Primary image
              </p>
              <p className="mt-0.5 text-xs text-zinc-600">
                Hero + flip cards on /initiatives. Upload or paste a URL — this
                image appears on the public initiatives screen.
              </p>
            </div>
            {draft.image.trim() ? (
              <button
                type="button"
                onClick={() => updateDraft((d) => ({ ...d, image: "" }))}
                className="shrink-0 rounded-lg border border-red-200 bg-white px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
              >
                Remove image
              </button>
            ) : null}
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-stretch">
            <input
              value={draft.image}
              onChange={(e) =>
                updateDraft((d) => ({ ...d, image: e.target.value }))
              }
              placeholder="https://… or upload"
              className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-xs"
            />
            <ImageUploadButton
              uploadPath={uploadPath}
              disabled={pending}
              onUploaded={(url) =>
                updateDraft((d) => ({ ...d, image: url }))
              }
            />
          </div>
          <div className="mt-3">
            <AdminImagePreview
              url={draft.image}
              emptyLabel="No primary image — paste a URL or upload."
            />
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Extra gallery images
              </p>
              <p className="mr-4 mt-0.5 text-xs text-zinc-600">
                Optional. Below the hero on the detail page.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                updateDraft((d) => ({ ...d, gallery: [...d.gallery, ""] }))
              }
              className="shrink-0 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800"
            >
              + Add image slot
            </button>
          </div>

          {draft.gallery.length === 0 ? (
            <p className="mt-4 text-center text-sm text-zinc-500">
              No extra images. Use &quot;Add image slot&quot; if needed.
            </p>
          ) : null}

          <ul className="mt-4 space-y-5">
            {draft.gallery.map((url, idx) => (
              <GalleryRow
                key={`${keyPrefix}-g-${idx}`}
                uploadPath={uploadPath}
                index={idx}
                url={url}
                onUrlChange={(next) =>
                  updateDraft((d) => ({
                    ...d,
                    gallery: d.gallery.map((u, i) => (i === idx ? next : u)),
                  }))
                }
                onRemove={() =>
                  updateDraft((d) => ({
                    ...d,
                    gallery: d.gallery.filter((_, i) => i !== idx),
                  }))
                }
                onMoveUp={
                  idx > 0
                    ? () =>
                        updateDraft((d) => {
                          const g = [...d.gallery]
                          ;[g[idx - 1], g[idx]] = [g[idx], g[idx - 1]]
                          return { ...d, gallery: g }
                        })
                    : undefined
                }
                onMoveDown={
                  idx < draft.gallery.length - 1
                    ? () =>
                        updateDraft((d) => {
                          const g = [...d.gallery]
                          ;[g[idx], g[idx + 1]] = [g[idx + 1], g[idx]]
                          return { ...d, gallery: g }
                        })
                    : undefined
                }
              />
            ))}
          </ul>
        </div>

        <Field
          label="Category"
          value={draft.category}
          onChange={(v) => updateDraft((d) => ({ ...d, category: v }))}
        />
        <label className="block text-sm font-medium">
          Read time (minutes)
          <input
            type="number"
            min={1}
            value={draft.readMinutes}
            onChange={(e) =>
              updateDraft((d) => ({
                ...d,
                readMinutes: Math.max(1, Number(e.target.value) || 1),
              }))
            }
            className="mt-1 w-32 rounded-lg border border-zinc-300 px-3 py-2"
          />
        </label>

        <p className="text-sm font-semibold text-zinc-800">
          Hero overlay (leave title empty to hide)
        </p>
        <Field
          label="Overlay title"
          value={draft.heroCaption?.title ?? ""}
          onChange={(v) =>
            updateDraft((d) => ({
              ...d,
              heroCaption: {
                title: v,
                subtitle: d.heroCaption?.subtitle ?? "",
              },
            }))
          }
        />
        <Field
          label="Overlay subtitle"
          value={draft.heroCaption?.subtitle ?? ""}
          onChange={(v) =>
            updateDraft((d) => ({
              ...d,
              heroCaption: {
                title: d.heroCaption?.title ?? "",
                subtitle: v,
              },
            }))
          }
        />

        <label className="block text-sm font-medium">
          Intro
          <textarea
            value={draft.intro}
            onChange={(e) =>
              updateDraft((d) => ({ ...d, intro: e.target.value }))
            }
            rows={4}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
        </label>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-800">
              Sections
            </span>
            <button
              type="button"
              onClick={() =>
                updateDraft((d) => ({
                  ...d,
                  sections: [
                    ...d.sections,
                    { heading: "New section", paragraphs: [""] },
                  ],
                }))
              }
              className="rounded-lg bg-zinc-100 px-2 py-1 text-xs font-medium hover:bg-zinc-200"
            >
              Add section
            </button>
          </div>
          {draft.sections.map((sec, idx) => (
            <SectionBlock
              key={`${keyPrefix}-sec-${idx}`}
              section={sec}
              index={idx}
              onChange={(next) =>
                updateDraft((d) => ({
                  ...d,
                  sections: d.sections.map((s, i) => (i === idx ? next : s)),
                }))
              }
              onRemove={() =>
                updateDraft((d) => ({
                  ...d,
                  sections: d.sections.filter((_, i) => i !== idx),
                }))
              }
            />
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-800">
              Bottom links
            </span>
            <button
              type="button"
              onClick={() =>
                updateDraft((d) => ({
                  ...d,
                  ctas: [
                    ...d.ctas,
                    { label: "Link", href: "/", external: false },
                  ],
                }))
              }
              className="rounded-lg bg-zinc-100 px-2 py-1 text-xs font-medium hover:bg-zinc-200"
            >
              Add link
            </button>
          </div>
          {draft.ctas.map((cta, idx) => (
            <div
              key={`${keyPrefix}-cta-${idx}`}
              className="flex flex-wrap gap-2 rounded-lg border border-zinc-100 p-3"
            >
              <input
                value={cta.label}
                onChange={(e) =>
                  updateDraft((d) => ({
                    ...d,
                    ctas: d.ctas.map((c, i) =>
                      i === idx ? { ...c, label: e.target.value } : c,
                    ),
                  }))
                }
                placeholder="Label"
                className="min-w-[8rem] flex-1 rounded border border-zinc-300 px-2 py-1 text-sm"
              />
              <input
                value={cta.href}
                onChange={(e) =>
                  updateDraft((d) => ({
                    ...d,
                    ctas: d.ctas.map((c, i) =>
                      i === idx ? { ...c, href: e.target.value } : c,
                    ),
                  }))
                }
                placeholder="Href"
                className="min-w-[8rem] flex-[2] rounded border border-zinc-300 px-2 py-1 font-mono text-xs"
              />
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="checkbox"
                  checked={Boolean(cta.external)}
                  onChange={(e) =>
                    updateDraft((d) => ({
                      ...d,
                      ctas: d.ctas.map((c, i) =>
                        i === idx
                          ? { ...c, external: e.target.checked }
                          : c,
                      ),
                    }))
                  }
                />
                External
              </label>
              <button
                type="button"
                onClick={() =>
                  updateDraft((d) => ({
                    ...d,
                    ctas: d.ctas.filter((_, i) => i !== idx),
                  }))
                }
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-500">
          Saved data lives in{" "}
          <code className="rounded bg-zinc-100 px-1">{storageHint.dataFile}</code>
          . After saving, open{" "}
          <code className="rounded bg-zinc-100 px-1">{storageHint.publicPath}</code>{" "}
          for the public page.
        </p>
      </div>
    </>
  )
}

function CheckItem({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span
        className={`inline-flex size-5 items-center justify-center rounded-full text-xs font-bold ${
          ok
            ? "bg-emerald-100 text-emerald-800"
            : "bg-amber-100 text-amber-800"
        }`}
        aria-hidden
      >
        {ok ? "✓" : "!"}
      </span>
      <span className={ok ? "text-zinc-700" : "text-zinc-900"}>{label}</span>
    </li>
  )
}

function ImageUploadButton({
  onUploaded,
  disabled,
  uploadPath,
}: {
  onUploaded: (url: string) => void
  disabled?: boolean
  uploadPath: string
}) {
  const ref = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    setBusy(true)
    setErr(null)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch(uploadPath, {
        method: "POST",
        body: fd,
        credentials: "include",
      })
      const data = (await res.json()) as { error?: string; url?: string }
      if (!res.ok) {
        throw new Error(data.error || "Upload failed")
      }
      if (!data.url) {
        throw new Error("No image URL returned")
      }
      onUploaded(data.url)
    } catch (x) {
      setErr(x instanceof Error ? x.message : "Upload failed")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex shrink-0 flex-col justify-center gap-1 sm:w-44">
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,.jpg,.jpeg,.png"
        className="sr-only"
        onChange={onPick}
      />
      <button
        type="button"
        disabled={disabled || busy}
        onClick={() => ref.current?.click()}
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 disabled:opacity-50"
      >
        {busy ? "Uploading…" : "Upload image"}
      </button>
      {err ? (
        <p className="text-xs leading-snug text-red-600">{err}</p>
      ) : null}
    </div>
  )
}

function AdminImagePreview({
  url,
  emptyLabel,
}: {
  url: string
  emptyLabel: string
}) {
  const trimmed = url.trim()
  const [broken, setBroken] = useState(false)

  useEffect(() => {
    setBroken(false)
  }, [trimmed])

  if (!trimmed) {
    return (
      <div className="flex aspect-[16/10] max-h-56 w-full max-w-xl items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-white text-center text-sm text-zinc-400">
        {emptyLabel}
      </div>
    )
  }

  if (broken) {
    return (
      <div className="flex aspect-[16/10] max-h-56 w-full max-w-xl flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 text-center text-sm text-red-800">
        <p className="font-medium">Could not load this URL.</p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={trimmed}
        src={trimmed}
        alt=""
        className="max-h-72 w-full object-contain"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
      />
    </div>
  )
}

function GalleryRow({
  index,
  url,
  uploadPath,
  onUrlChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  index: number
  url: string
  uploadPath: string
  onUrlChange: (v: string) => void
  onRemove: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}) {
  return (
    <li className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-2">
        <span className="text-xs font-semibold text-zinc-500">
          Gallery {index + 1}
        </span>
        <div className="flex flex-wrap items-center gap-1">
          {onMoveUp ? (
            <button
              type="button"
              onClick={onMoveUp}
              className="rounded border border-zinc-200 px-2 py-0.5 text-xs hover:bg-zinc-50"
            >
              ↑
            </button>
          ) : null}
          {onMoveDown ? (
            <button
              type="button"
              onClick={onMoveDown}
              className="rounded border border-zinc-200 px-2 py-0.5 text-xs hover:bg-zinc-50"
            >
              ↓
            </button>
          ) : null}
          <button
            type="button"
            onClick={onRemove}
            className="rounded border border-red-200 px-2 py-0.5 text-xs font-medium text-red-700 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <input
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="https://… or upload"
          className="min-w-0 flex-1 rounded-lg border border-zinc-300 px-3 py-2 font-mono text-xs"
        />
        <ImageUploadButton
          uploadPath={uploadPath}
          onUploaded={(u) => onUrlChange(u)}
        />
      </div>
      <div className="mt-2 max-w-md">
        <AdminImagePreview
          url={url}
          emptyLabel="Paste URL or upload."
        />
      </div>
    </li>
  )
}

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  textarea?: boolean
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
      )}
    </label>
  )
}

function SectionBlock({
  section,
  index,
  onChange,
  onRemove,
}: {
  section: InitiativeSection
  index: number
  onChange: (s: InitiativeSection) => void
  onRemove: () => void
}) {
  const text = section.paragraphs.join("\n\n")
  return (
    <div className="rounded-lg border border-zinc-100 bg-zinc-50/80 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500">
          Section {index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-red-600 hover:underline"
        >
          Remove section
        </button>
      </div>
      <input
        value={section.heading}
        onChange={(e) =>
          onChange({ ...section, heading: e.target.value })
        }
        placeholder="Heading"
        className="mb-2 w-full rounded border border-zinc-300 px-2 py-1 text-sm font-semibold"
      />
      <label className="block text-xs text-zinc-600">
        Paragraphs (blank line between paragraphs)
        <textarea
          value={text}
          onChange={(e) =>
            onChange({
              ...section,
              paragraphs: e.target.value
                .split(/\n\s*\n/)
                .map((p) => p.trim())
                .filter(Boolean),
            })
          }
          rows={5}
          className="mt-1 w-full rounded border border-zinc-300 px-2 py-1 font-mono text-sm"
        />
      </label>
    </div>
  )
}
