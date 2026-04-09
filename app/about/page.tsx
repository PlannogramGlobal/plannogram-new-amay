import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { SubpageLayout } from "@/components/subpage-layout"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "About us",
  description:
    "Plannogram is an international idea exchange on urban planning, development, and policy—connecting planners, researchers, and communities.",
}

const PILLARS = [
  {
    n: "01",
    tag: "Dialogue",
    title: "Open exchange",
    body: "We host spaces where planners, residents, and policy makers can compare notes honestly—across cities, sectors, and points of view.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=85&auto=format&fit=crop",
  },
  {
    n: "02",
    tag: "Evidence",
    title: "Grounded in practice",
    body: "Programs and writing stay tied to what places are experiencing now: data, implementation constraints, and lived experience—not slides alone.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85&auto=format&fit=crop",
  },
  {
    n: "03",
    tag: "Global & local",
    title: "From corridors to neighbourhoods",
    body: "We connect international perspective with neighbourhood-scale decisions so big ideas don’t erase local context.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e8fe450?w=800&q=85&auto=format&fit=crop",
  },
] as const

export default function AboutPage() {
  return (
    <SubpageLayout>
      <main className="mx-auto max-w-6xl px-4 pb-20 md:px-8 md:pb-28">
        <header className="mx-auto max-w-3xl pb-16 pt-4 text-center md:pb-20 md:pt-6">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-white/45">
            About
          </p>
          <h1 className="mt-5 text-[clamp(1.875rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
            The network for people who plan and live in cities.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base font-normal leading-relaxed text-white/65 md:text-lg">
            We grow thoughtful urban policy—together. Workshops, writing, and
            partnerships that bridge global ideas with local action.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {PILLARS.map((item) => (
            <li key={item.n}>
              <article
                className={cn(
                  "flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-white/[0.12]",
                  "bg-gradient-to-b from-white/[0.08] to-white/[0.02]",
                  "shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]",
                )}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-900 md:aspect-[3.5/4.2]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-[center_12%]"
                  />
                  <div
                    className={cn(
                      "absolute bottom-3 right-3 rounded-full px-3.5 py-1.5 text-[0.75rem] font-medium tracking-tight",
                      "bg-black/55 text-white shadow-lg ring-1 ring-white/15 backdrop-blur-md",
                    )}
                  >
                    {item.tag}
                  </div>
                </div>

                <div
                  className={cn(
                    "relative flex h-10 items-center px-4",
                    "bg-[#2a332f] text-white",
                    "border-y border-white/[0.08]",
                  )}
                >
                  <span className="text-base font-bold tabular-nums tracking-tight text-white/95">
                    {item.n}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6">
                  <h2 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-white md:text-[1.125rem]">
                    {item.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/65 md:text-[0.9375rem]">
                    {item.body}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-16 max-w-2xl text-center md:mt-24">
          <p className="text-sm leading-relaxed text-white/65 md:text-base">
            Explore initiatives, read the blog, or join an upcoming session—we
            welcome partners who care about inclusive, climate-smart cities.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <Link
              href="/initiatives"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-black no-underline",
                "transition-colors hover:bg-white/90 md:h-12 md:px-10 md:text-base",
              )}
            >
              Our initiatives
            </Link>
            <Link
              href="/blogs"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-full border-2 border-white/50 bg-white/5 px-8 text-sm font-semibold text-white no-underline",
                "transition-colors hover:bg-white/12 hover:text-white md:h-12 md:px-10 md:text-base",
              )}
            >
              From the blog
            </Link>
          </div>
        </div>
      </main>
    </SubpageLayout>
  )
}
