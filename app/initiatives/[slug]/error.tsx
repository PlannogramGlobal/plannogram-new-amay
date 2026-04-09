"use client"

import Link from "next/link"
import { useEffect } from "react"

export default function InitiativeDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-dvh bg-white px-4 py-24 text-center text-zinc-900">
      <p className="text-sm font-medium text-zinc-500">Initiative</p>
      <h1 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
        This page could not be loaded
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-600">
        Try a hard refresh, clear the site cache, or restart the dev server. If
        you use a crypto wallet browser extension, try disabling it on
        localhost—it can block scripts and cause a blank page.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
        >
          Try again
        </button>
        <Link
          href="/initiatives"
          className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50"
        >
          All initiatives
        </Link>
      </div>
    </div>
  )
}
