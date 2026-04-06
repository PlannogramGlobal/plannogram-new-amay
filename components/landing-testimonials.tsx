"use client"

import { Testimonials3DMarquee } from "@/components/ui/3d-testimonails"
import { cn } from "@/lib/utils"

export function LandingTestimonialsSection() {
  return (
    <section
      id="testimonials"
      className={cn(
        "dark relative isolate min-h-dvh shrink-0 snap-start snap-always overflow-hidden bg-black",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center px-4 pb-16 pt-14 md:px-8 md:pb-20 md:pt-20">
        <div className="mb-8 max-w-2xl text-center md:mb-12">
          <p className="text-sm text-muted-foreground md:text-base">
            What practitioners, researchers, and partners say about learning and
            collaborating on Plannogram.
          </p>
        </div>

        <Testimonials3DMarquee className="w-full max-w-none" />
      </div>
    </section>
  )
}
