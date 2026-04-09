"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { loginAction } from "@/app/site/admin/initiatives/actions"

export function InitiativesAdminLogin({
  title = "Initiatives admin",
}: {
  title?: string
} = {}) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setPending(true)
    const fd = new FormData(e.currentTarget)
    const res = await loginAction(fd)
    setPending(false)
    if (res.ok) {
      router.refresh()
    } else {
      setError(res.error ?? "Could not sign in.")
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-md space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
    >
      <h1 className="text-lg font-semibold text-zinc-900">{title}</h1>
      <p className="text-sm text-zinc-600">
        All three are required in <code className="text-xs">.env</code> or{" "}
        <code className="text-xs">.env.local</code>:{" "}
        <code className="rounded bg-zinc-100 px-1 text-xs">
          INITIATIVES_ADMIN_USER
        </code>
        ,{" "}
        <code className="rounded bg-zinc-100 px-1 text-xs">
          INITIATIVES_ADMIN_PASSWORD
        </code>
        , and{" "}
        <code className="rounded bg-zinc-100 px-1 text-xs">
          INITIATIVES_ADMIN_SECRET
        </code>{" "}
        (any long random string for signing the session cookie). Restart{" "}
        <code className="text-xs">npm run dev</code> after editing env.
      </p>
      <label className="block text-sm font-medium text-zinc-700">
        Username
        <input
          name="user"
          type="text"
          autoComplete="username"
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900"
        />
      </label>
      <label className="block text-sm font-medium text-zinc-700">
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900"
        />
      </label>
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}
