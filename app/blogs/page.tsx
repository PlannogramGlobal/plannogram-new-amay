import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { SubpageLayout } from "@/components/subpage-layout"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas, case studies, and conversations on urban planning, policy, and inclusive cities from Plannogram.",
}

const POSTS = [
  {
    slug: "inclusive-streets",
    title: "Inclusive streets, safer neighbourhoods",
    excerpt:
      "How small design shifts reshape mobility and trust in dense urban cores.",
    date: "Mar 12, 2026",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "green-corridors",
    title: "Green corridors as city infrastructure",
    excerpt:
      "Linking ecology, heat resilience, and long-term planning decisions.",
    date: "Feb 28, 2026",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "participatory-budgeting",
    title: "Participatory budgeting at scale",
    excerpt:
      "Lessons from cities that put residents in the room where priorities are set.",
    date: "Feb 2, 2026",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop",
  },
  {
    slug: "housing-and-equity",
    title: "Housing policy as equity policy",
    excerpt:
      "Why supply, tenure, and neighbourhood amenities have to move together.",
    date: "Jan 18, 2026",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80&auto=format&fit=crop",
  },
] as const

export default function BlogsPage() {
  return (
    <SubpageLayout>
      <main className="mx-auto max-w-6xl px-4 pb-16 md:px-8 md:pb-24">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            From the blog
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-base">
            Ideas, case studies, and conversations on planning and urban policy.
            New pieces are added as our community publishes.
          </p>
        </header>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
          {POSTS.map((post) => (
            <li key={post.slug} id={post.slug} className="scroll-mt-28">
              <Link
                href={`/blogs#${post.slug}`}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.12] no-underline",
                  "bg-gradient-to-b from-white/[0.07] to-white/[0.02]",
                  "shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]",
                  "transition hover:border-white/22",
                )}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <time
                    dateTime={post.date}
                    className="text-xs font-medium text-white/45"
                  >
                    {post.date}
                  </time>
                  <h2 className="mt-2 text-lg font-semibold tracking-tight text-white md:text-xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex text-sm font-medium text-white/90">
                    Read article
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
      </main>
    </SubpageLayout>
  )
}
