"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

const STATS = [
  { value: 10000, suffix: "+", label: "Engagements" },
  { value: 30, suffix: "+", label: "Countries" },
  { value: 50, suffix: "+", label: "Collaborations" },
  {
    value: 45,
    suffix: "+",
    label: "National & International Initiatives",
  },
  {
    value: 50,
    suffix: "+",
    label: "National & International Experts",
  },
] as const

function useCountUp(target: number, active: boolean, duration: number) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return

    let startTime: number | null = null
    let raf = 0
    let cancelled = false

    const tick = (now: number) => {
      if (cancelled) return
      if (startTime === null) startTime = now
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - (1 - t) ** 3
      setCount(Math.round(eased * target))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setCount(target)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [active, target, duration])

  return count
}

export function useSectionActivated(threshold = 0.18) {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || active) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true)
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [active, threshold])

  return { ref, active }
}

type StatCardProps = {
  value: number
  suffix: string
  label: string
  index: number
  active: boolean
}

function StatCard({ value, suffix, label, index, active }: StatCardProps) {
  const duration = value >= 5000 ? 1700 : 1100
  const count = useCountUp(value, active, duration)

  return (
    <div
      className={cn(
        "group relative flex h-full min-h-[7.5rem] flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/[0.14] px-5 py-7 text-center sm:min-h-[8rem] sm:px-6 sm:py-8 md:min-h-[9rem] md:px-8 md:py-10",
        "bg-gradient-to-b from-white/[0.1] via-white/[0.04] to-white/[0.02]",
        "shadow-[0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)]",
        "backdrop-blur-2xl backdrop-saturate-150",
        "transition-[opacity,transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:border-white/25 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]",
        active ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
      )}
      style={{ transitionDelay: `${80 + index * 95}ms` }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, transparent 45%, transparent 55%, rgba(255,255,255,0.06) 100%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.12),transparent_55%)]" />

      <div className="relative flex flex-col items-center justify-center gap-2 md:gap-2.5">
        <p
          className={cn(
            "font-semibold tabular-nums tracking-tight text-white",
            "text-[clamp(1.85rem,5vw,3rem)] leading-none lg:text-[clamp(2rem,3.8vw,3.25rem)]",
          )}
        >
          {count.toLocaleString("en-US")}
          {suffix}
        </p>
        <p
          className={cn(
            "max-w-[18rem] text-pretty text-[0.9375rem] font-medium leading-snug text-white/75 sm:text-base md:max-w-[22rem] md:text-lg",
          )}
        >
          {label}
        </p>
      </div>
    </div>
  )
}

export function LandingStatsGrid({ active }: { active: boolean }) {
  return (
    <div
      className={cn(
        "grid grid-cols-6 gap-3 sm:gap-4 md:gap-5",
      )}
    >
      {STATS.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            index < 3 ? "col-span-2" : "col-span-3",
          )}
        >
          <StatCard
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            index={index}
            active={active}
          />
        </div>
      ))}
    </div>
  )
}

export function LandingStats() {
  const { ref, active } = useSectionActivated()

  return (
    <section
      ref={ref}
      className={cn(
        "relative isolate shrink-0 snap-start snap-always overflow-hidden bg-black px-4 pb-12 pt-12 md:px-8 md:pb-16 md:pt-16",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl pt-1 md:pt-2">
        <LandingStatsGrid active={active} />
      </div>
    </section>
  )
}
