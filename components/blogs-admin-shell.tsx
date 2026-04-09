"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

import {
  createBlogAction,
  deleteBlogAction,
  saveBlogAction,
} from "@/app/site/admin/blogs/actions"
import { logoutAction } from "@/app/site/admin/initiatives/actions"
import { InitiativeRecordForm } from "@/components/initiative-record-form"
import type { InitiativeRecord } from "@/lib/initiative-types"
import { emptyBlogTemplate } from "@/lib/blogs-default-seed"

function clone<T>(x: T): T {
  return JSON.parse(JSON.stringify(x)) as T
}

function prepareRecordForSave(record: InitiativeRecord): InitiativeRecord {
  const heroTitle = record.heroCaption?.title?.trim() ?? ""
  return {
    ...record,
    id: record.id.trim(),
    gallery: record.gallery.map((u) => u.trim()).filter(Boolean),
    heroCaption:
      heroTitle.length > 0
        ? {
            title: heroTitle,
            subtitle: (record.heroCaption?.subtitle ?? "").trim(),
          }
        : null,
  }
}

const BLOG_UPLOAD = "/api/admin/blogs/upload"
const BLOG_STORAGE = {
  dataFile: "data/blogs.json",
  publicPath: "/blogs",
} as const

type Phase = "menu" | "add" | "edit"

export function BlogsAdminShell({
  initial,
  username,
}: {
  initial: InitiativeRecord[]
  username: string
}) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>("menu")
  const [list, setList] = useState<InitiativeRecord[]>(() => clone(initial))
  const [addDraft, setAddDraft] = useState<InitiativeRecord>(() =>
    emptyBlogTemplate(),
  )
  const [selectedId, setSelectedId] = useState(initial[0]?.id ?? "")

  const [feedback, setFeedback] = useState<{
    text: string
    ok: boolean
  } | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    setList(clone(initial))
  }, [initial])

  useEffect(() => {
    if (list.length === 0) return
    if (!list.some((r) => r.id === selectedId)) {
      setSelectedId(list[0].id)
    }
  }, [list, selectedId])

  const updateAddDraft = useCallback(
    (fn: (d: InitiativeRecord) => InitiativeRecord) => {
      setAddDraft((d) => fn(clone(d)))
    },
    [],
  )

  const draft = useMemo(
    () => list.find((r) => r.id === selectedId) ?? null,
    [list, selectedId],
  )

  const updateEditDraft = useCallback(
    (fn: (d: InitiativeRecord) => InitiativeRecord) => {
      setList((prev) =>
        prev.map((r) => (r.id === selectedId ? fn(clone(r)) : r)),
      )
    },
    [selectedId],
  )

  async function onLogout() {
    await logoutAction()
    router.refresh()
  }

  async function onDeletePost() {
    if (!draft) return
    const label = draft.title.trim() || draft.id
    if (
      !window.confirm(
        `Delete post “${label}” (${draft.id})? This removes it from the site and from data/blogs.json.`,
      )
    ) {
      return
    }
    setPending(true)
    setFeedback(null)
    const id = draft.id
    const res = await deleteBlogAction(id)
    setPending(false)
    if (res.ok) {
      const rest = list.filter((r) => r.id !== id)
      setList(clone(rest))
      setFeedback({
        ok: true,
        text: "Post deleted. Public pages updated.",
      })
      if (rest.length === 0) {
        setPhase("menu")
        setSelectedId("")
      } else {
        setSelectedId(rest[0].id)
      }
      router.refresh()
    } else {
      setFeedback({
        ok: false,
        text: res.error ?? "Delete failed.",
      })
    }
  }

  async function onSaveEdit() {
    const record = list.find((r) => r.id === selectedId)
    if (!record) return
    setPending(true)
    setFeedback(null)
    const toSave = prepareRecordForSave(record)
    const res = await saveBlogAction(toSave)
    setPending(false)
    if (res.ok) {
      setFeedback({
        ok: true,
        text: "Saved. Public /blogs and this post’s page updated.",
      })
      router.refresh()
    } else {
      setFeedback({
        ok: false,
        text: res.error ?? "Save failed.",
      })
    }
  }

  async function onCreate() {
    setPending(true)
    setFeedback(null)
    const toSave = prepareRecordForSave(addDraft)
    const res = await createBlogAction(toSave)
    setPending(false)
    if (res.ok) {
      setFeedback({
        ok: true,
        text: `Created “${toSave.title || toSave.id}”. It appears on /blogs.`,
      })
      setSelectedId(toSave.id)
      setAddDraft(emptyBlogTemplate())
      setPhase("menu")
      router.refresh()
    } else {
      setFeedback({
        ok: false,
        text: res.error ?? "Create failed.",
      })
    }
  }

  function goMenu() {
    setPhase("menu")
    setFeedback(null)
  }

  function startAdd() {
    setAddDraft(emptyBlogTemplate())
    setPhase("add")
    setFeedback(null)
  }

  function startEdit() {
    if (list.length === 0) {
      startAdd()
      return
    }
    setPhase("edit")
    setFeedback(null)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 text-zinc-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Blog</h1>
          <p className="text-sm text-zinc-500">
            Signed in as {username} · same login as initiatives admin
          </p>
        </div>
        <button
          type="button"
          onClick={() => onLogout()}
          className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium hover:bg-zinc-50"
        >
          Sign out
        </button>
      </div>

      {phase !== "menu" ? (
        <button
          type="button"
          onClick={goMenu}
          className="inline-flex text-sm font-medium text-zinc-500 hover:text-zinc-900"
        >
          ← Back to menu
        </button>
      ) : null}

      {feedback ? (
        <p
          role="status"
          className={
            feedback.ok ? "text-sm text-emerald-700" : "text-sm text-red-600"
          }
        >
          {feedback.text}
        </p>
      ) : null}

      {phase === "menu" ? (
        <div className="space-y-4">
          <p className="text-sm text-zinc-600">
            Add a new post or edit an existing one. Images upload as PNG, JPG, or
            JPEG (also WebP/GIF).
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={startAdd}
              className="rounded-2xl border-2 border-zinc-900 bg-zinc-900 px-5 py-6 text-left text-white shadow-sm transition hover:bg-zinc-800"
            >
              <span className="block text-base font-semibold">Add post</span>
              <span className="mt-1 block text-sm text-zinc-300">
                New URL slug, hero image, and article copy for /blogs.
              </span>
            </button>
            <button
              type="button"
              onClick={startEdit}
              disabled={list.length === 0}
              className="rounded-2xl border-2 border-zinc-200 bg-white px-5 py-6 text-left shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="block text-base font-semibold text-zinc-900">
                Edit post
              </span>
              <span className="mt-1 block text-sm text-zinc-600">
                Update content or images for an existing post.
              </span>
            </button>
          </div>
          {list.length === 0 ? (
            <p className="text-sm text-amber-800">
              No posts in storage yet. Use <strong>Add post</strong> to create
              the first one (data saves to{" "}
              <code className="rounded bg-amber-100 px-1 text-xs">
                data/blogs.json
              </code>
              ).
            </p>
          ) : null}
        </div>
      ) : null}

      {phase === "add" ? (
        <div className="space-y-4">
          <p className="text-sm text-zinc-600">
            Set a unique URL slug and hero image, then write the article. Save
            with <strong>Create post</strong>.
          </p>
          <InitiativeRecordForm
            draft={addDraft}
            updateDraft={updateAddDraft}
            pending={pending}
            keyPrefix="blog-new"
            slugMode="editable"
            uploadPath={BLOG_UPLOAD}
            storageHint={BLOG_STORAGE}
          />
          <button
            type="button"
            onClick={() => onCreate()}
            disabled={pending}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {pending ? "Creating…" : "Create post"}
          </button>
        </div>
      ) : null}

      {phase === "edit" ? (
        <div className="space-y-4">
          {!draft ? (
            <p className="text-zinc-600">No post selected.</p>
          ) : (
            <>
              <label className="block text-sm font-medium">
                Post to edit
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2"
                >
                  {list.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title || r.id} ({r.id})
                    </option>
                  ))}
                </select>
              </label>
              <InitiativeRecordForm
                draft={draft}
                updateDraft={updateEditDraft}
                pending={pending}
                keyPrefix={selectedId}
                slugMode="readonly"
                uploadPath={BLOG_UPLOAD}
                storageHint={BLOG_STORAGE}
              />
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSaveEdit()}
                  disabled={pending}
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
                >
                  {pending ? "Saving…" : "Save changes"}
                </button>
                <button
                  type="button"
                  onClick={() => onDeletePost()}
                  disabled={pending}
                  className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  Delete post
                </button>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}
