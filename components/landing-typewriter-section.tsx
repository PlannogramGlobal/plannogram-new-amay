"use client"

import { LandingStatsGrid, useSectionActivated } from "@/components/landing-stats"
import { Typewriter } from "@/components/ui/typewriter"
import { cn } from "@/lib/utils"

const ROTATING_LINES = [
  "exchange ideas on urban planning and policy.",
  "connect planners, researchers, and practitioners worldwide.",
  "turn dialogue into action for better cities.",
  "share knowledge across borders and disciplines.",
  "build bridges between communities and institutions.",
] as const

export function LandingTypewriterSection() {
  const { ref, active } = useSectionActivated()

  return (
    <section
      ref={ref}
      className={cn(
        "relative isolate min-h-dvh shrink-0 snap-start snap-always overflow-hidden bg-black",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 40%, rgba(0,207,255,0.12), transparent 55%), radial-gradient(ellipse 70% 50% at 80% 60%, rgba(166,0,255,0.1), transparent 50%), radial-gradient(ellipse 60% 45% at 20% 70%, rgba(255,136,0,0.08), transparent 50%)",
          }}
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "relative z-10 flex min-h-dvh flex-col items-center justify-center gap-12 px-3 py-16 sm:gap-14 sm:px-8 md:gap-16 md:px-12 md:py-20",
        )}
      >
        <div
          className={cn(
            "mx-auto w-full max-w-[min(100%,52rem)] px-2 text-center font-medium tracking-[-0.02em] text-white/85",
            "text-[clamp(1rem,4.5vw,2.75rem)] sm:text-[clamp(1.05rem,3.8vw,2.85rem)] md:text-[clamp(0.875rem,1.55vw+0.4rem,3.35rem)]",
          )}
          aria-live="polite"
        >
          <span className="text-white/90 max-sm:block sm:inline">
            Plannogram is a space to{" "}
          </span>
          <span className="max-sm:block sm:inline">
            <Typewriter
              text={ROTATING_LINES}
              speed={48}
              initialDelay={400}
              waitTime={2200}
              deleteSpeed={32}
              loop
              cursorChar="_"
              cursorClassName="ml-1 translate-y-px text-[1em] text-white/45 sm:ml-1"
              className={cn(
                "bg-gradient-to-r from-[#00cfff] via-[#a600ff] to-[#ff8800] bg-clip-text font-bold text-transparent",
              )}
            />
          </span>
        </div>

        <div className="relative w-full max-w-7xl pb-4 md:pb-6">
          <LandingStatsGrid active={active} />
        </div>
      </div>
    </section>
  )
}
