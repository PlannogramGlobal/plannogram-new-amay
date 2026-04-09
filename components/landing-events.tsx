"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { CircularTestimonials } from "@/components/ui/circular-testimonials"
import { cn } from "@/lib/utils"

type EventSource = {
  id: string
  title: string
  /** Date · time · format */
  meta: string
  /** Longer description shown beside the carousel */
  description: string
  image: string
}

const EVENT_ITEMS: EventSource[] = [
  {
    id: "cities-climate",
    title: "Cities & Climate",
    meta: "May 14, 2026 · 16:00 UTC · online",
    description:
      "A leadership roundtable on resilient cities and adaptation—flood risk, heat, and insurance—weighing where plans, budgets, and community voice align. We compare instruments from different continents and leave with practical framing for your own context.",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "regional-exchange",
    title: "Regional Exchange",
    meta: "June 3, 2026 · 10:00 UTC · hybrid",
    description:
      "Peer learning across regions and administrative scales: metros, provinces, and cross-border cooperation. Sessions mix case walks with facilitated swaps so teams can reuse ideas without copying blueprints blindly.",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "policy-labs",
    title: "Policy Labs",
    meta: "July 22, 2026 · 14:00 UTC · New Delhi",
    description:
      "An in-person lab on housing, equity, and implementation—zoning, finance, and agreements with residents. Small groups pressure-test proposals and document what would need to change back home.",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "urban-ideas-forum",
    title: "Urban Ideas Forum",
    meta: "August 8, 2026 · 18:00 UTC · online",
    description:
      "International voices on the future of planning: participation, technology, and the politics of urban change. Short provocations and breakout dialogue—designed for practitioners who want signal, not slide clutter.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80&auto=format&fit=crop",
  },
]

const CIRCULAR_ITEMS = EVENT_ITEMS.map((e) => ({
  name: e.title,
  designation: e.meta,
  quote: e.description,
  src: e.image,
}))

export function LandingEvents() {
  return (
    <section
      id="upcoming-events"
      className={cn(
        "relative isolate flex min-h-dvh shrink-0 snap-start snap-always flex-col overflow-hidden bg-black py-8 text-white md:py-12",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="container mx-auto w-full max-w-7xl shrink-0 px-4 pt-1 md:px-6 md:pt-2">
        <div className="mb-8 flex flex-col gap-5 md:mb-10 md:items-center lg:mb-12">
          <div className="flex w-full max-w-2xl flex-col items-start text-left md:mx-auto md:items-center md:text-center md:text-balance">
            <h2 className="mb-3 w-full text-3xl font-semibold tracking-tight md:mb-4 md:text-4xl lg:mb-5 lg:text-5xl">
              Upcoming events
            </h2>
            <p className="mb-4 w-full text-sm leading-relaxed text-white/60 md:text-base">
              Workshops, dialogues, and exchanges on urban planning and policy.
            </p>
            <Link
              href="/initiatives"
              className="group inline-flex items-center gap-1 text-sm font-medium text-white/90 md:text-base lg:text-lg"
            >
              View all initiatives
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-[1.125rem]" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center pb-8 md:pb-12">
        <CircularTestimonials
          testimonials={CIRCULAR_ITEMS}
          autoplay
          colors={{
            name: "#fafafa",
            designation: "#a3a3a3",
            testimony: "#e5e5e5",
            arrowBackground: "#262626",
            arrowForeground: "#fafafa",
            arrowHoverBackground: "#00a6fb",
          }}
          fontSizes={{
            name: "clamp(1.15rem, 4.2vw, 2rem)",
            designation: "clamp(0.8rem, 2.5vw, 1.1rem)",
            quote: "clamp(0.8rem, 2.8vw, 1rem)",
          }}
          className="max-w-[100%] sm:max-w-5xl md:max-w-6xl lg:max-w-7xl"
        />
      </div>
    </section>
  )
}
