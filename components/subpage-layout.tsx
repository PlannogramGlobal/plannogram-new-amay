import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"

export function SubpageLayout({
  children,
  className,
  surface = "dark",
}: {
  children: React.ReactNode
  className?: string
  /** Light pages use white background + dark text (e.g. About). */
  surface?: "dark" | "light"
}) {
  const isLight = surface === "light"

  return (
    <div
      className={cn(
        "min-h-dvh",
        isLight ? "bg-white text-zinc-900" : "bg-black text-white",
      )}
    >
      <SiteHeader />
      <div
        className={cn(
          "relative isolate min-h-dvh pt-[5.25rem] sm:pt-[5.75rem] md:pt-24",
          isLight && "text-zinc-900 [color-scheme:light]",
          className,
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent",
            isLight ? "via-zinc-200" : "via-white/15",
          )}
          aria-hidden
        />
        {children}
      </div>
      <footer
        className={cn(
          "border-t px-4 py-8 text-center md:px-8",
          isLight ? "border-zinc-200" : "border-white/[0.08]",
        )}
      >
        <Link
          href="/"
          className={cn(
            "text-sm font-medium transition-colors",
            isLight
              ? "text-zinc-600 hover:text-zinc-900"
              : "text-white/70 hover:text-white",
          )}
        >
          ← Back to home
        </Link>
      </footer>
    </div>
  )
}
