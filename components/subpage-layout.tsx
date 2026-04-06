import Link from "next/link"

import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"

export function SubpageLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="min-h-dvh bg-black text-white">
      <SiteHeader />
      <div
        className={cn(
          "relative isolate min-h-dvh pt-[5.25rem] sm:pt-[5.75rem] md:pt-24",
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          aria-hidden
        />
        {children}
      </div>
      <footer className="border-t border-white/[0.08] px-4 py-8 text-center md:px-8">
        <Link
          href="/"
          className="text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          ← Back to home
        </Link>
      </footer>
    </div>
  )
}
