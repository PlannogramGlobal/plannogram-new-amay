import type { Metadata } from "next"
import Link from "next/link"

import { SubpageLayout } from "@/components/subpage-layout"
import { cn } from "@/lib/utils"

const btnOutlineLg =
  "inline-flex h-11 min-h-11 items-center justify-center rounded-full border-2 border-white/50 bg-transparent px-8 text-base font-semibold text-white no-underline transition-colors hover:bg-white/10 md:h-12 md:min-h-12 md:px-10 md:text-lg"

export const metadata: Metadata = {
  title: "Initiatives",
  description:
    "Plannogram initiatives: dialogues, exchanges, and programs on urban planning, climate, housing, and regional collaboration.",
}

const INITIATIVES = [
  {
    id: "cities-climate",
    title: "Cities & Climate",
    tag: "Climate",
    when: "May 14, 2026 · online",
    blurb:
      "Roundtables on resilient cities, adaptation finance, and how planners align long-term land use with a warming world.",
  },
  {
    id: "regional-exchange",
    title: "Regional Exchange",
    tag: "Regions",
    when: "Ongoing · hybrid",
    blurb:
      "Peer learning across regions and administrative scales—from metro governance to cross-border corridors.",
  },
  {
    id: "policy-labs",
    title: "Policy Labs",
    tag: "Housing",
    when: "July 22, 2026 · New Delhi",
    blurb:
      "Hands-on sessions on housing, equity, and implementation: from zoning reform to community agreements.",
  },
  {
    id: "urban-ideas-forum",
    title: "Urban Ideas Forum",
    tag: "Forum",
    when: "August 8, 2026 · online",
    blurb:
      "International voices on the future of planning: technology, participation, and the politics of urban change.",
  },
] as const

export default function InitiativesPage() {
  return (
    <SubpageLayout>
      <main className="mx-auto max-w-3xl px-4 pb-16 md:max-w-5xl md:px-8 md:pb-24">
        <header className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Our initiatives
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            Programs, dialogues, and exchanges where our community shares
            knowledge and turns conversation into action — online, in person, and
            hybrid.
          </p>
        </header>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
          {INITIATIVES.map((item) => (
            <li
              key={item.id}
              id={item.id}
              className={cn(
                "scroll-mt-28 rounded-2xl border border-white/[0.12] p-6 md:p-7",
                "bg-gradient-to-b from-white/[0.08] to-white/[0.02]",
                "shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]",
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-white/85">
                  {item.tag}
                </span>
                <span className="text-xs text-white/50">{item.when}</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white md:text-2xl">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                {item.blurb}
              </p>
              <Link
                href="/#upcoming-events"
                className={cn(
                  "mt-5 inline-flex text-sm font-medium text-white/90 underline-offset-4 hover:underline",
                )}
              >
                See dates on the home page →
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-2xl border border-white/[0.1] bg-white/[0.04] p-6 text-center md:p-8">
          <p className="text-sm text-white/75 md:text-base">
            Want to collaborate or propose a session? Reach out—we are always
            looking for partners.
          </p>
          <Link href="/about" className={cn(btnOutlineLg, "mt-5")}>
            About Plannogram
          </Link>
        </div>
      </main>
    </SubpageLayout>
  )
}
