"use client"

import { FooterColumnGrid, FooterLegalRow } from "@/components/ui/footer-column"
import { cn } from "@/lib/utils"

export default function FooterGlow() {
  return (
    <footer
      className={cn(
        "relative z-10 mt-8 w-full shrink-0 snap-start snap-always overflow-hidden px-4 pb-10 pt-14 md:px-6 md:pb-12 md:pt-20",
      )}
    >
      <div
        className={cn(
          "relative z-[1] mx-auto max-w-6xl rounded-2xl px-5 py-10 md:px-10 md:py-12",
          "border border-white/[0.14]",
          "bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-white/[0.03]",
          "backdrop-blur-2xl backdrop-saturate-150",
          "shadow-[0_24px_80px_-20px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
        )}
      >
        <FooterColumnGrid />
        <FooterLegalRow year={2026} />
      </div>
    </footer>
  )
}
