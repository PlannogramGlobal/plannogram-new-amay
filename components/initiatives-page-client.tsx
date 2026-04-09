"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useRef, useState } from "react"

import {
  ScrollMorphHero,
  type ScrollMorphHeroItem,
} from "@/components/ui/scroll-morph-hero"
import type { InitiativeCard } from "@/lib/initiative-types"
import { cn, shouldUnoptimizeImageSrc } from "@/lib/utils"

type Props = {
  scrollHeroItems: ScrollMorphHeroItem[]
  cards: InitiativeCard[]
}

export function InitiativesPageClient({ scrollHeroItems, cards }: Props) {
  const [showAll, setShowAll] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  const showGridAndScroll = useCallback(() => {
    setShowAll(true)
    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [])

  return (
    <>
      <section
        id="initiatives-explorer"
        className="relative left-1/2 mt-10 w-screen max-w-[100vw] -translate-x-1/2 bg-black md:mt-12"
        aria-label="Interactive initiatives explorer"
      >
        <ScrollMorphHero
          items={scrollHeroItems}
          className="min-h-[calc(100dvh-5.25rem)] touch-none overflow-visible rounded-none sm:min-h-[calc(100dvh-5.75rem)] md:min-h-[calc(100dvh-6rem)]"
        />
      </section>

      {showAll ? (
        <div
          ref={listRef}
          id="initiatives-all"
          className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-28 pt-12 md:px-8 md:pb-32 md:pt-16"
        >
          <h2 className="sr-only">All initiatives</h2>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
            {cards.map((c) => (
              <li key={c.id} id={c.id} className="scroll-mt-28">
                <Link
                  href={`/initiatives/${c.id}`}
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.12] no-underline",
                    "bg-gradient-to-b from-white/[0.07] to-white/[0.02]",
                    "shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]",
                    "transition hover:border-white/22",
                  )}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      unoptimized={shouldUnoptimizeImageSrc(c.image)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <p className="text-xs font-medium text-white/45">{c.date}</p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-white md:text-xl">
                      {c.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
                      {c.excerpt}
                    </p>
                    <span className="mt-4 inline-flex text-sm font-medium text-white/90">
                      View initiative
                      <span
                        className="ml-1 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div
        className={cn(
          "pointer-events-none fixed bottom-6 left-0 right-0 z-30 flex justify-center px-4 md:bottom-8",
        )}
      >
        <button
          type="button"
          onClick={showGridAndScroll}
          className={cn(
            "pointer-events-auto rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium shadow-lg backdrop-blur-md transition",
            "bg-black/75 text-white hover:border-white/35 hover:bg-black/85",
          )}
        >
          Show all initiatives
        </button>
      </div>
    </>
  )
}
