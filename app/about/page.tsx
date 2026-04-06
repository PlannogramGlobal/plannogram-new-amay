import type { Metadata } from "next"
import Link from "next/link"

import { SubpageLayout } from "@/components/subpage-layout"
import { cn } from "@/lib/utils"

const btnPrimary =
  "inline-flex h-11 min-h-11 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-black no-underline transition-colors hover:bg-white/90 md:h-12 md:min-h-12 md:px-10 md:text-lg"

const btnOutline =
  "inline-flex h-11 min-h-11 items-center justify-center rounded-full border-2 border-white/50 bg-white/5 px-8 text-base font-semibold text-white no-underline transition-colors hover:bg-white/12 hover:text-white md:h-12 md:min-h-12 md:px-10 md:text-lg"

export const metadata: Metadata = {
  title: "About us",
  description:
    "Plannogram is an international idea exchange on urban planning, development, and policy—connecting planners, researchers, and communities.",
}

const pillars = [
  {
    title: "Open dialogue",
    body: "We make space for honest exchange across disciplines, regions, and levels of government.",
  },
  {
    title: "Practice & evidence",
    body: "Conversations are grounded in what cities are living through—not only theory.",
  },
  {
    title: "Global & local",
    body: "We connect international perspective with neighbourhood-scale action.",
  },
] as const

export default function AboutPage() {
  return (
    <SubpageLayout>
      <main className="mx-auto max-w-3xl px-4 pb-16 md:px-8 md:pb-24">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
          Plannogram
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          About us
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/75 md:text-xl">
          We are an international idea exchange on urban planning, development,
          and public policy—built for people who shape and live in cities.
        </p>

        <div className="mt-12 space-y-8 text-white/80">
          <section>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              What we do
            </h2>
            <p className="mt-3 leading-relaxed">
              Plannogram hosts workshops, dialogues, and written pieces that link
              planners, researchers, civil society, and city leaders. We focus on
              sharing lessons that travel—on climate, housing, mobility, and
              inclusion—without flattening local context.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              How we work
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-1 md:gap-5">
              {pillars.map((p) => (
                <li
                  key={p.title}
                  className={cn(
                    "rounded-2xl border border-white/[0.12] p-5",
                    "bg-gradient-to-b from-white/[0.08] to-white/[0.02]",
                  )}
                >
                  <p className="font-medium text-white">{p.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              Get involved
            </h2>
            <p className="mt-3 leading-relaxed text-white/75">
              Explore our initiatives, read the blog, or join an upcoming
              session—we are always looking for thoughtful partners and voices.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/initiatives" className={btnPrimary}>
                Our initiatives
              </Link>
              <Link href="/blogs" className={btnOutline}>
                From the blog
              </Link>
            </div>
          </section>
        </div>
      </main>
    </SubpageLayout>
  )
}
