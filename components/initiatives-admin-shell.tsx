"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"

import {
  createInitiativeAction,
  deleteInitiativeAction,
  logoutAction,
  saveInitiativeAction,
} from "@/app/site/admin/initiatives/actions"
import { InitiativeRecordForm } from "@/components/initiative-record-form"
import type { InitiativeRecord } from "@/lib/initiative-types"
import { emptyInitiativeTemplate } from "@/lib/initiatives-empty-template"

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

type Phase = "menu" | "add" | "edit"

export function InitiativesAdminShell({
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
    emptyInitiativeTemplate(),
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

  async function onDeleteInitiative() {
    if (!draft) return
    const label = draft.title.trim() || draft.id
    if (
      !window.confirm(
        `Delete initiative “${label}” (${draft.id})? This removes it from the site and from data/initiatives.json.`,
      )
    ) {
      return
    }
    setPending(true)
    setFeedback(null)
    const id = draft.id
    const res = await deleteInitiativeAction(id)
    setPending(false)
    if (res.ok) {
      const rest = list.filter((r) => r.id !== id)
      setList(clone(rest))
      setFeedback({
        ok: true,
        text: "Initiative deleted. Public pages updated.",
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
    const res = await saveInitiativeAction(toSave)
    setPending(false)
    if (res.ok) {
      setFeedback({
        ok: true,
        text: "Saved. Public /initiatives and this initiative’s page updated.",
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
    const res = await createInitiativeAction(toSave)
    setPending(false)
    if (res.ok) {
      setFeedback({
        ok: true,
        text: `Created “${toSave.title || toSave.id}”. It appears on /initiatives with its primary image.`,
      })
      setSelectedId(toSave.id)
      setAddDraft(emptyInitiativeTemplate())
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
    setAddDraft(emptyInitiativeTemplate())
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
          <h1 className="text-xl font-semibold">Initiatives</h1>
          <p className="text-sm text-zinc-500">Signed in as {username}</p>
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
            Choose whether to add a new initiative or edit an existing one.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={startAdd}
              className="rounded-2xl border-2 border-zinc-900 bg-zinc-900 px-5 py-6 text-left text-white shadow-sm transition hover:bg-zinc-800"
            >
              <span className="block text-base font-semibold">
                Add initiative
              </span>
              <span className="mt-1 block text-sm text-zinc-300">
                New URL slug, copy, primary image, and detail copy. Appears on
                the public initiatives screen after you create it.
              </span>
            </button>
            <button
              type="button"
              onClick={startEdit}
              disabled={list.length === 0}
              className="rounded-2xl border-2 border-zinc-200 bg-white px-5 py-6 text-left shadow-sm transition hover:border-zinc-400 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="block text-base font-semibold text-zinc-900">
                Edit initiative
              </span>
              <span className="mt-1 block text-sm text-zinc-600">
                Pick from existing initiatives and update content or images.
              </span>
            </button>
          </div>
          {list.length === 0 ? (
            <p className="text-sm text-amber-800">
              No initiatives in storage yet. Use <strong>Add initiative</strong>{" "}
              to create the first one (data saves to{" "}
              <code className="rounded bg-amber-100 px-1 text-xs">
                data/initiatives.json
              </code>
              ).
            </p>
          ) : null}
        </div>
      ) : null}

      {phase === "add" ? (
        <div className="space-y-4">
          <p className="text-sm text-zinc-600">
            Fill in the template below, set a unique URL slug, and add a primary
            image (upload or URL). Then click <strong>Create initiative</strong>
            .
          </p>
          <InitiativeRecordForm
            draft={addDraft}
            updateDraft={updateAddDraft}
            pending={pending}
            keyPrefix="new"
            slugMode="editable"
          />
          <button
            type="button"
            onClick={() => onCreate()}
            disabled={pending}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {pending ? "Creating…" : "Create initiative"}
          </button>
        </div>
      ) : null}

      {phase === "edit" ? (
        <div className="space-y-4">
          {!draft ? (
            <p className="text-zinc-600">No initiative selected.</p>
          ) : (
            <>
              <label className="block text-sm font-medium">
                Initiative to edit
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
                  onClick={() => onDeleteInitiative()}
                  disabled={pending}
                  className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  Delete initiative
                </button>
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}
